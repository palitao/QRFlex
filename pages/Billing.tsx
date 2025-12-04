
import React, { useState } from 'react';
import { mockSubscription } from '../services/mockData';
import { CheckCircle2, AlertCircle, CreditCard, Star, Zap, Shield, Smartphone, Globe, Check, X, Download, History } from 'lucide-react';

// Configuration for Plans
const PLANS = [
  {
    id: 'free',
    name: 'Gratuito',
    priceUsd: 0,
    priceMt: 0,
    description: 'Para quem está começando.',
    features: [
      '10 QR Codes / mês',
      'Personalização básica',
      'Download PNG e SVG',
      'Estatísticas simples',
      'Anúncios na página de destino'
    ],
    highlight: false,
    icon: Star
  },
  {
    id: 'pro',
    name: 'Pro',
    priceUsd: 3.99,
    priceMt: 250,
    description: 'Perfeito para criadores e pequenos negócios.',
    features: [
      'Personalização Completa',
      'Upload de Logotipo',
      'Cores e Padrões Avançados',
      'Exportação Alta Resolução',
      'Sem anúncios'
    ],
    highlight: false,
    icon: Zap
  },
  {
    id: 'premium',
    name: 'Premium',
    priceUsd: 7.99,
    priceMt: 740,
    description: 'O mais popular para empresas em crescimento.',
    features: [
      'QR Codes Dinâmicos (Editáveis)',
      'Estatísticas Detalhadas',
      'Rastreamento de GPS/Dispositivo',
      'Exportação CSV/ZIP',
      'Templates Premium'
    ],
    highlight: true, // Most Popular
    popularLabel: 'MAIS POPULAR',
    icon: Star
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceUsd: 14.99,
    priceMt: 1350,
    description: 'Poder total e automação para grandes times.',
    features: [
      'API de Geração Ilimitada',
      'QR Codes Ilimitados',
      'Suporte VIP Prioritário',
      'Webhooks & Integrações',
      'Gestão de Equipe'
    ],
    highlight: false,
    icon: Shield
  }
];

const TRANSACTIONS = [
  { id: 'INV-001', date: '2023-10-01', amount: '$49.99', plan: 'Business Plan', status: 'Paid', method: 'VISA •••• 4242' },
  { id: 'INV-002', date: '2023-09-01', amount: '$49.99', plan: 'Business Plan', status: 'Paid', method: 'VISA •••• 4242' },
  { id: 'INV-003', date: '2023-08-01', amount: '250 MT', plan: 'Pro Plan', status: 'Paid', method: 'M-Pesa 84...123' },
];

export const Billing = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'international' | 'local'>('international');
  const [processing, setProcessing] = useState(false);

  const handleSubscribe = (plan: any) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    setProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      setShowPaymentModal(false);
      alert(`Assinatura do plano ${selectedPlan.name} realizada com sucesso!`);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      
      {/* Current Subscription Header */}
      <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-blue-400 font-bold tracking-wider text-xs uppercase bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">Plano Atual</span>
              {mockSubscription.status === 'active' && (
                <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold border border-emerald-500/30">
                  <CheckCircle2 size={12} /> ATIVO
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold mb-1 capitalize">{mockSubscription.plano} Plan</h2>
            <p className="text-slate-400 text-sm">Próxima renovação em {new Date(mockSubscription.data_fim).toLocaleDateString()}</p>
          </div>
          
          <div className="text-right">
             <div className="text-4xl font-bold tracking-tight">${mockSubscription.amount}</div>
             <div className="text-slate-400 text-sm">/ mês</div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700/50 pt-6 flex flex-wrap gap-4">
           <button className="bg-white text-slate-900 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg shadow-white/10">
             Gerenciar no Stripe
           </button>
           <button className="text-slate-300 px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700">
             Ver Histórico
           </button>
        </div>
      </div>

      {/* Plans Section */}
      <div>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Escolha o plano ideal</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Desbloqueie todo o potencial do QRFlex com nossos planos premium. 
            Cancele a qualquer momento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <div 
              key={plan.id}
              className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 ${
                plan.highlight 
                  ? 'border-blue-500 bg-white shadow-xl shadow-blue-100 scale-105 z-10' 
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                  {plan.popularLabel}
                </div>
              )}

              <div className="mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${plan.highlight ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                  <plan.icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1 h-8">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900">${plan.priceUsd}</span>
                  <span className="text-sm text-slate-500">/mês</span>
                </div>
                <div className="text-xs font-semibold text-slate-400 mt-1">
                  ou {plan.priceMt} MT /mês
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={16} className={`mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-blue-500' : 'text-slate-400'}`} />
                    <span className="leading-tight">{feat}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleSubscribe(plan)}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                  plan.highlight 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {plan.priceUsd === 0 ? 'Começar Grátis' : 'Assinar Agora'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <History className="text-slate-400" />
          <h3 className="font-bold text-slate-800">Histórico de Pagamentos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500">
               <tr>
                 <th className="px-6 py-4 font-medium">Invoice ID</th>
                 <th className="px-6 py-4 font-medium">Data</th>
                 <th className="px-6 py-4 font-medium">Plano</th>
                 <th className="px-6 py-4 font-medium">Valor</th>
                 <th className="px-6 py-4 font-medium">Método</th>
                 <th className="px-6 py-4 font-medium text-right">Download</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {TRANSACTIONS.map(tx => (
                 <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                   <td className="px-6 py-4 font-mono text-slate-600">{tx.id}</td>
                   <td className="px-6 py-4 text-slate-800">{tx.date}</td>
                   <td className="px-6 py-4 text-slate-800">{tx.plan}</td>
                   <td className="px-6 py-4 font-bold text-slate-900">{tx.amount}</td>
                   <td className="px-6 py-4 text-slate-600">{tx.method}</td>
                   <td className="px-6 py-4 text-right">
                     <button className="text-blue-600 hover:text-blue-800">
                       <Download size={16} />
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowPaymentModal(false)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Checkout Seguro</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                 <div>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Você está assinando</p>
                    <h4 className="text-xl font-bold text-slate-900">Plano {selectedPlan.name}</h4>
                 </div>
                 <div className="text-right">
                    <div className="text-xl font-bold text-slate-900">${selectedPlan.priceUsd}</div>
                    <div className="text-xs text-slate-500 font-medium">{selectedPlan.priceMt} MT</div>
                 </div>
              </div>

              <h4 className="text-sm font-bold text-slate-700 mb-3">Método de Pagamento</h4>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button 
                  onClick={() => setPaymentMethod('international')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    paymentMethod === 'international' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' 
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Globe size={24} className="mb-2" />
                  <span className="text-xs font-bold">Internacional</span>
                  <span className="text-[10px] opacity-70">Stripe / PayPal</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('local')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    paymentMethod === 'local' 
                      ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm' 
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone size={24} className="mb-2" />
                  <span className="text-xs font-bold">Moçambique</span>
                  <span className="text-[10px] opacity-70">M-Pesa / e-Mola</span>
                </button>
              </div>

              {paymentMethod === 'international' ? (
                <div className="space-y-4 animate-in slide-in-from-right-2 duration-300">
                  <div className="p-3 border border-slate-200 rounded-lg flex items-center gap-3">
                    <CreditCard size={20} className="text-slate-400" />
                    <input type="text" placeholder="Número do Cartão" className="flex-1 outline-none text-sm bg-transparent" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border border-slate-200 rounded-lg">
                      <input type="text" placeholder="MM/AA" className="w-full outline-none text-sm bg-transparent" />
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg">
                      <input type="text" placeholder="CVC" className="w-full outline-none text-sm bg-transparent" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in slide-in-from-left-2 duration-300">
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 text-orange-800 text-sm">
                     <p className="mb-2">Uma notificação (push) será enviada para o seu telemóvel para confirmar o pagamento.</p>
                     <div className="flex gap-2">
                        <span className="font-bold">M-Pesa</span>
                        <span className="opacity-50">|</span>
                        <span className="font-bold">e-Mola</span>
                     </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Número de Telemóvel (+258)</label>
                    <input type="tel" placeholder="84 123 4567" className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" />
                  </div>
                </div>
              )}

              <button 
                onClick={processPayment}
                disabled={processing}
                className={`w-full mt-6 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                  paymentMethod === 'international' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-orange-600 hover:bg-orange-700 shadow-orange-200'
                }`}
              >
                {processing ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>Pagar {paymentMethod === 'international' ? `$${selectedPlan.priceUsd}` : `${selectedPlan.priceMt} MT`}</>
                )}
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <Shield size={10} />
                Pagamento processado de forma segura e criptografada (SSL).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
