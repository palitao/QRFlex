
import React, { useState } from 'react';
import { 
  User, Lock, Bell, Shield, Smartphone, Globe, CreditCard, 
  History, AlertTriangle, Check, Zap, Trash2, Mail, Layout, 
  Monitor, LogOut, Moon, Sun, Laptop, RefreshCw 
} from 'lucide-react';
import { currentUser, mockSubscription } from '../services/mockData';

// Mock Data for Login History
const loginHistory = [
  { id: 1, device: 'MacBook Pro', os: 'macOS 14.2', location: 'Lisbon, Portugal', time: 'Active now', ip: '192.168.1.1', icon: Laptop },
  { id: 2, device: 'iPhone 15 Pro', os: 'iOS 17.3', location: 'Lisbon, Portugal', time: '2 hours ago', ip: '188.23.45.12', icon: Smartphone },
  { id: 3, device: 'Chrome on Windows', os: 'Windows 11', location: 'Porto, Portugal', time: 'Yesterday, 14:30', ip: '213.12.33.55', icon: Monitor },
];

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [twoFactor, setTwoFactor] = useState(false);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);

  // Tabs Configuration
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Bell },
    { id: 'billing', label: 'Plan & Billing', icon: CreditCard },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Configurações da Conta</h2>
        <p className="text-slate-500">Gerencie seus dados pessoais, segurança e preferências.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Plan Summary Widget */}
          <div className="mt-8 p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl text-white hidden lg:block">
            <div className="flex items-center gap-2 mb-2 text-blue-300 font-bold text-xs uppercase tracking-wider">
              <Zap size={12} /> Plano Atual
            </div>
            <p className="font-bold text-lg capitalize mb-1">{mockSubscription.plano} Plan</p>
            <p className="text-xs text-slate-400 mb-4">Renova em {new Date(mockSubscription.data_fim).toLocaleDateString()}</p>
            <button onClick={() => setActiveTab('billing')} className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors">
              Gerenciar
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
           
           {/* === PROFILE TAB === */}
           {activeTab === 'profile' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                 {/* Basic Info Card */}
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Dados Pessoais</h3>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                       <div className="relative group">
                          <img src={currentUser.foto_perfil} alt="Profile" className="w-24 h-24 rounded-full border-4 border-slate-50 shadow-sm object-cover" />
                          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                             <span className="text-white text-xs font-bold">Alterar</span>
                          </div>
                       </div>
                       <div className="flex-1 text-center sm:text-left">
                          <h4 className="font-bold text-slate-900 text-lg">{currentUser.nome}</h4>
                          <p className="text-slate-500 text-sm mb-3">Administrador</p>
                          <div className="flex gap-2 justify-center sm:justify-start">
                             <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">Remover Foto</button>
                             <button className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-medium hover:bg-blue-100">Upload Nova</button>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo</label>
                          <input type="text" defaultValue={currentUser.nome} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                          <input type="email" defaultValue={currentUser.email} disabled className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed" />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Telefone (Opcional)</label>
                          <input type="tel" placeholder="+258 84 123 4567" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Empresa</label>
                          <input type="text" placeholder="QRFlex Inc." className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                       </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                       <button onClick={handleSave} className="px-6 py-2.5 bg-slate-900 text-white font-bold text-sm rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2">
                          {loading ? <RefreshCw className="animate-spin" size={16} /> : <Check size={16} />} 
                          Salvar Alterações
                       </button>
                    </div>
                 </div>

                 {/* Danger Zone */}
                 <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                    <h3 className="text-lg font-bold text-red-800 mb-2">Zona de Perigo</h3>
                    <p className="text-sm text-red-600 mb-6">Ações irreversíveis. Tenha cuidado.</p>
                    
                    <div className="flex items-center justify-between">
                       <div>
                          <h4 className="font-bold text-slate-800 text-sm">Deletar Conta</h4>
                          <p className="text-xs text-slate-500">Excluir permanentemente seus dados e QR Codes.</p>
                       </div>
                       <button className="px-4 py-2 bg-white border border-red-200 text-red-600 text-xs font-bold rounded-lg hover:bg-red-600 hover:text-white transition-colors">
                          Deletar Conta
                       </button>
                    </div>
                 </div>
              </div>
           )}

           {/* === SECURITY TAB === */}
           {activeTab === 'security' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                 {/* Password */}
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Senha & Autenticação</h3>
                    <div className="space-y-4 max-w-lg">
                       <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Senha Atual</label>
                          <input type="password" placeholder="••••••••" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Nova Senha</label>
                          <input type="password" placeholder="••••••••" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                       </div>
                       <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50">
                          Atualizar Senha
                       </button>
                    </div>
                 </div>

                 {/* 2FA */}
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                       <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <Smartphone size={20} className="text-blue-500" />
                          Autenticação em Dois Fatores (2FA)
                       </h3>
                       <p className="text-sm text-slate-500 mt-1">Adicione uma camada extra de segurança à sua conta.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                 </div>

                 {/* Login History */}
                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                       <h3 className="font-bold text-slate-900">Histórico de Login</h3>
                       <button className="text-xs text-red-600 font-bold hover:underline flex items-center gap-1">
                          <LogOut size={12} /> Sair de todos os dispositivos
                       </button>
                    </div>
                    <div className="divide-y divide-slate-100">
                       {loginHistory.map(login => (
                          <div key={login.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                             <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                                <login.icon size={20} />
                             </div>
                             <div className="flex-1">
                                <h4 className="text-sm font-bold text-slate-900">{login.device} <span className="text-slate-400 font-normal">({login.os})</span></h4>
                                <p className="text-xs text-slate-500">{login.location} • {login.ip}</p>
                             </div>
                             <div className="text-xs font-medium text-slate-500">
                                {login.time}
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           )}

           {/* === PREFERENCES TAB === */}
           {activeTab === 'preferences' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                 {/* Appearance */}
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Aparência & Idioma</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div>
                          <label className="block text-xs font-bold text-slate-700 mb-3">Tema da Interface</label>
                          <div className="flex gap-4">
                             <button 
                                onClick={() => setTheme('light')}
                                className={`flex-1 p-3 rounded-lg border-2 flex flex-col items-center gap-2 ${theme === 'light' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:bg-slate-50 text-slate-500'}`}
                             >
                                <Sun size={24} />
                                <span className="text-xs font-bold">Claro</span>
                             </button>
                             <button 
                                onClick={() => setTheme('dark')}
                                className={`flex-1 p-3 rounded-lg border-2 flex flex-col items-center gap-2 ${theme === 'dark' ? 'border-blue-500 bg-slate-800 text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-500'}`}
                             >
                                <Moon size={24} />
                                <span className="text-xs font-bold">Escuro</span>
                             </button>
                          </div>
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-slate-700 mb-3">Idioma</label>
                          <select className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500">
                             <option>Português (Brasil)</option>
                             <option>Português (Portugal)</option>
                             <option>English (US)</option>
                             <option>Español</option>
                          </select>
                       </div>
                    </div>
                 </div>

                 {/* Notifications */}
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                       <Bell size={20} className="text-orange-500" /> Notificações
                    </h3>
                    <div className="space-y-4">
                       {[
                          'Relatórios semanais de desempenho',
                          'Alertas de segurança e novos logins',
                          'Notificações de pagamento e fatura',
                          'Novidades e atualizações da plataforma'
                       ].map((item, idx) => (
                          <label key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer">
                             <span className="text-sm text-slate-700 font-medium">{item}</span>
                             <div className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                             </div>
                          </label>
                       ))}
                    </div>
                 </div>

                 {/* Integrations Placeholder */}
                 <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                    <div className="flex items-start gap-4">
                       <div className="p-3 bg-white rounded-lg shadow-sm text-indigo-600">
                          <Layout size={24} />
                       </div>
                       <div>
                          <h3 className="text-lg font-bold text-indigo-900">Integrações (Premium)</h3>
                          <p className="text-sm text-indigo-700 mb-4">Conecte o QRFlex com suas ferramentas favoritas.</p>
                          <div className="flex gap-3">
                             <button className="px-4 py-2 bg-white text-indigo-600 text-xs font-bold rounded-lg shadow-sm hover:bg-indigo-50">
                                WhatsApp Business
                             </button>
                             <button className="px-4 py-2 bg-white text-indigo-600 text-xs font-bold rounded-lg shadow-sm hover:bg-indigo-50">
                                Configurar Webhooks
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {/* === BILLING TAB === */}
           {activeTab === 'billing' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                 <div className="bg-slate-900 rounded-xl p-8 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                       <div>
                          <span className="text-blue-400 font-bold tracking-wider text-xs uppercase bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20 mb-2 inline-block">Plano Atual</span>
                          <h2 className="text-3xl font-bold capitalize">{mockSubscription.plano} Plan</h2>
                          <p className="text-slate-400 text-sm mt-1">Próxima cobrança em {new Date(mockSubscription.data_fim).toLocaleDateString()}</p>
                       </div>
                       <div className="flex gap-3">
                          <button className="px-5 py-2.5 bg-white text-slate-900 font-bold text-sm rounded-lg hover:bg-slate-100 transition-colors">
                             Upgrade
                          </button>
                          <button className="px-5 py-2.5 bg-transparent border border-slate-600 text-white font-bold text-sm rounded-lg hover:bg-slate-800 transition-colors">
                             Cancelar
                          </button>
                       </div>
                    </div>
                 </div>

                 {/* Payment Methods */}
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Métodos de Pagamento</h3>
                    <div className="space-y-4">
                       <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-8 bg-slate-100 rounded border border-slate-200 flex items-center justify-center">
                                <CreditCard size={16} className="text-slate-500" />
                             </div>
                             <div>
                                <p className="text-sm font-bold text-slate-900">Visa terminando em 4242</p>
                                <p className="text-xs text-slate-500">Expira em 12/2025</p>
                             </div>
                          </div>
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold">Padrão</span>
                       </div>
                       <button className="w-full py-3 border border-dashed border-slate-300 text-slate-500 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-slate-700 transition-colors">
                          + Adicionar novo método
                       </button>
                    </div>
                 </div>
              </div>
           )}

        </div>
      </div>
    </div>
  );
};
