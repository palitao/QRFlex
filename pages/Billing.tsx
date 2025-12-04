import React from 'react';
import { mockSubscription } from '../services/mockData';
import { CheckCircle2, AlertCircle, CreditCard } from 'lucide-react';

export const Billing = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-blue-400 font-bold tracking-wider text-sm uppercase">Plano Atual</span>
              {mockSubscription.status === 'active' && (
                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-xs font-bold border border-emerald-500/30">ATIVO</span>
              )}
            </div>
            <h2 className="text-3xl font-bold mb-1 capitalize">{mockSubscription.plano} Plan</h2>
            <p className="text-slate-400 text-sm">Renova em {new Date(mockSubscription.data_fim).toLocaleDateString()}</p>
          </div>
          
          <div className="text-right">
             <div className="text-3xl font-bold">${mockSubscription.amount}</div>
             <div className="text-slate-400 text-sm">/ mês</div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700 pt-6 flex flex-wrap gap-4">
           <button className="bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-slate-100 transition-colors">
             Gerenciar Assinatura (Stripe)
           </button>
           <button className="text-slate-300 px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors">
             Alterar Plano
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-slate-400" /> Método de Pagamento
            </h3>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-white text-[10px] font-bold tracking-widest">VISA</div>
                 <div className="text-sm">
                    <p className="font-bold text-slate-900">•••• 4242</p>
                    <p className="text-xs text-slate-500">Expira em 12/2025</p>
                 </div>
               </div>
               <button className="text-sm text-blue-600 hover:underline">Editar</button>
            </div>
         </div>

         <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-800 mb-4">Uso do Plano</h3>
            <div className="space-y-4">
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="text-slate-600">QR Codes Dinâmicos</span>
                   <span className="font-bold text-slate-900">12 / 50</span>
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[24%]"></div>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span className="text-slate-600">Scans Mensais</span>
                   <span className="font-bold text-slate-900">14k / 50k</span>
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[28%]"></div>
                 </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
