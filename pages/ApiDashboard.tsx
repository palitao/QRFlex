import React, { useState } from 'react';
import { Copy, RefreshCw, Trash2, Eye, EyeOff } from 'lucide-react';
import { mockApiKeys } from '../services/mockData';

export const ApiDashboard = () => {
  const [showKey, setShowKey] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-xl text-white shadow-lg">
        <div>
           <h2 className="text-2xl font-bold mb-2">Developer API</h2>
           <p className="text-slate-400 text-sm max-w-lg">
             Integre a geração de QR codes diretamente no seu software.
             Use a chave secreta para autenticar requests ao endpoint <code>/v1/generate</code>.
           </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-bold shadow-lg shadow-blue-900/50 transition-all">
          Ver Documentação
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
           <h3 className="font-bold text-slate-800">API Keys Ativas</h3>
           <button className="text-sm font-medium text-blue-600 border border-blue-200 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
             + Criar Nova Chave
           </button>
        </div>
        
        <div className="divide-y divide-slate-100">
          {mockApiKeys.map((key) => (
            <div key={key.key} className="p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-2">
                   <span className="font-bold text-slate-900">{key.label}</span>
                   <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Created: {key.created_at}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-3 rounded border border-slate-200 font-mono text-sm text-slate-600">
                  <span className="flex-1 truncate">
                    {showKey === key.key ? key.key : key.key.substring(0, 12) + '•'.repeat(20)}
                  </span>
                  <button onClick={() => setShowKey(showKey === key.key ? null : key.key)} className="text-slate-400 hover:text-slate-600">
                    {showKey === key.key ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button className="text-slate-400 hover:text-blue-600">
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div className="w-full md:w-64">
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-slate-500">Usage limit</span>
                   <span className="font-bold text-slate-700">{Math.round((key.uso_atual / key.limite_mensal) * 100)}%</span>
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-1">
                    <div 
                      className={`h-full rounded-full ${key.uso_atual / key.limite_mensal > 0.8 ? 'bg-amber-500' : 'bg-blue-500'}`} 
                      style={{ width: `${(key.uso_atual / key.limite_mensal) * 100}%` }}
                    ></div>
                 </div>
                 <div className="text-xs text-slate-400 text-right">
                    {key.uso_atual} / {key.limite_mensal} requests
                 </div>
              </div>

              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Roll Key">
                  <RefreshCw size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Revoke">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
