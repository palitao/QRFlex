
import React, { useState } from 'react';
import { MessageSquare, FileQuestion, ChevronDown, ChevronUp, Send } from 'lucide-react';

const FAQS = [
  { q: "Como crio um QR Code Dinâmico?", a: "Para criar um QR dinâmico, selecione 'Link' ou 'vCard' no gerador e certifique-se de estar num plano Pro ou Premium. Isso permite editar o destino depois." },
  { q: "Quais métodos de pagamento aceitam?", a: "Aceitamos cartões de crédito/débito internacionais via Stripe/PayPal e pagamentos locais em Moçambique via M-Pesa e e-Mola." },
  { q: "Posso cancelar minha assinatura a qualquer momento?", a: "Sim, pode cancelar a renovação automática no painel 'Financeiro' a qualquer momento sem custos adicionais." },
  { q: "Os QR Codes expiram?", a: "QR Codes estáticos nunca expiram. QR Codes dinâmicos funcionam enquanto sua assinatura estiver ativa." }
];

export const Support = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Como podemos ajudar?</h2>
        <p className="text-slate-500">Encontre respostas rápidas ou entre em contato com nossa equipe.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FAQ Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-fit">
           <div className="p-6 border-b border-slate-100 bg-blue-50/50">
             <h3 className="font-bold text-slate-800 flex items-center gap-2">
               <FileQuestion className="text-blue-500" size={20} /> Perguntas Frequentes
             </h3>
           </div>
           <div className="divide-y divide-slate-100">
             {FAQS.map((item, idx) => (
               <div key={idx}>
                 <button 
                   onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                   className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                 >
                   <span className="font-medium text-sm text-slate-800">{item.q}</span>
                   {activeFaq === idx ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                 </button>
                 {activeFaq === idx && (
                   <div className="p-4 pt-0 text-sm text-slate-600 bg-slate-50/50 leading-relaxed animate-in slide-in-from-top-1">
                     {item.a}
                   </div>
                 )}
               </div>
             ))}
           </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-slate-100 bg-indigo-50/50">
             <h3 className="font-bold text-slate-800 flex items-center gap-2">
               <MessageSquare className="text-indigo-500" size={20} /> Enviar Mensagem
             </h3>
           </div>
           <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assunto</label>
                <select className="w-full p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                  <option>Suporte Técnico</option>
                  <option>Pagamentos & Faturas</option>
                  <option>API Enterprise</option>
                  <option>Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mensagem</label>
                <textarea rows={5} className="w-full p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Descreva seu problema ou dúvida..."></textarea>
              </div>
              <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 flex items-center justify-center gap-2">
                <Send size={16} /> Enviar Ticket
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
