
import React from 'react';
import { QrCode, Shield, Zap, BarChart3, Globe, Smartphone, Check, ArrowRight, Menu, X } from 'lucide-react';

export const LandingPage = ({ onLogin }: { onLogin: () => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <img src="https://i.imgur.com/8QhW5gS.png" alt="QRFlex" className="h-8 w-auto" />
              <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">QRFlex</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Funcionalidades</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Planos</a>
              <a href="#developers" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">API</a>
              <button onClick={onLogin} className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                Entrar
              </button>
              <button onClick={onLogin} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95">
                Começar Grátis
              </button>
            </div>

            <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 p-4 space-y-4">
             <a href="#features" className="block text-sm font-medium text-slate-600">Funcionalidades</a>
             <a href="#pricing" className="block text-sm font-medium text-slate-600">Planos</a>
             <button onClick={onLogin} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Entrar / Cadastrar</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 rounded-l-[100px] -z-10 transform translate-x-1/3"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Novo: Pagamentos M-Pesa & e-Mola
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              QR Codes Dinâmicos para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Negócios Reais.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Crie, gerencie e rastreie QR Codes com design profissional. A plataforma completa para marketing, pagamentos e conexões digitais.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button onClick={onLogin} className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:-translate-y-1">
                Gerar QR Code Agora
              </button>
              <button onClick={onLogin} className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                Ver Planos <ArrowRight size={18} />
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
               <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => <img key={i} src={`https://picsum.photos/32/32?random=${i}`} className="w-8 h-8 rounded-full border-2 border-white" alt="User" />)}
               </div>
               <p>Usado por +10.000 empresas</p>
            </div>
          </div>
          
          <div className="flex-1 relative">
             <div className="relative z-10 bg-white p-2 rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1595079676614-79f041325419?auto=format&fit=crop&q=80&w=800" alt="Dashboard Preview" className="rounded-2xl w-full" />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce duration-[3000ms]">
                   <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
                     <Zap size={24} fill="currentColor" />
                   </div>
                   <div>
                      <p className="text-xs text-slate-500 font-bold uppercase">Scans Hoje</p>
                      <p className="text-2xl font-bold text-slate-900">14,203</p>
                   </div>
                </div>
             </div>
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full blur-[120px] opacity-20 -z-10"></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Por que QRFlex?</h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Tudo o que você precisa em um só lugar.</h3>
            <p className="text-slate-600">Deixe os QR Codes estáticos no passado. Nossa plataforma oferece controle total, branding e inteligência de dados.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: QrCode, title: "Design Personalizado", desc: "Cores, logotipos, molduras e formatos. Crie códigos que combinam com sua marca." },
              { icon: Zap, title: "QR Dinâmicos", desc: "Edite o destino do link a qualquer momento, mesmo após a impressão do material." },
              { icon: BarChart3, title: "Analytics Avançado", desc: "Saiba quem escaneou, onde, quando e qual dispositivo foi usado." },
              { icon: Shield, title: "Segurança Enterprise", desc: "Proteção por senha, expiração programada e domínio personalizado." },
              { icon: Smartphone, title: "Pagamentos Locais", desc: "Integração nativa com M-Pesa e e-Mola para receber pagamentos via QR." },
              { icon: Globe, title: "API Robusta", desc: "Gere milhares de códigos programaticamente com nossa API para desenvolvedores." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <feature.icon size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Planos Flexíveis</h2>
            <p className="text-slate-500 mt-2">Pague em USD ou Moeda Local (MT).</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
             {/* Free */}
             <div className="p-8 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Gratuito</h3>
                <div className="text-3xl font-bold mt-4 mb-2">$0</div>
                <p className="text-sm text-slate-500 mb-6">Para uso pessoal básico.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-slate-600"><Check size={16} className="text-blue-500"/> 10 QR Codes</li>
                  <li className="flex items-center gap-2 text-sm text-slate-600"><Check size={16} className="text-blue-500"/> Estáticos Apenas</li>
                  <li className="flex items-center gap-2 text-sm text-slate-600"><Check size={16} className="text-blue-500"/> Download PNG</li>
                </ul>
                <button onClick={onLogin} className="w-full py-3 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition-colors">Criar Conta</button>
             </div>

             {/* Premium */}
             <div className="p-8 rounded-2xl border-2 border-blue-600 relative bg-slate-900 text-white shadow-2xl scale-105 transform">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Mais Popular</div>
                <h3 className="text-lg font-bold">Premium</h3>
                <div className="text-3xl font-bold mt-4 mb-1">$7.99</div>
                <div className="text-sm text-blue-200 mb-6">ou 740 MT / mês</div>
                <p className="text-sm text-slate-400 mb-6">Para negócios em crescimento.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-blue-400"/> QR Codes Dinâmicos</li>
                  <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-blue-400"/> Analytics Completo</li>
                  <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-blue-400"/> Upload de Logo</li>
                  <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-blue-400"/> M-Pesa & e-Mola</li>
                </ul>
                <button onClick={onLogin} className="w-full py-3 rounded-xl bg-blue-600 font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/50">Assinar Agora</button>
             </div>

             {/* Enterprise */}
             <div className="p-8 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Enterprise</h3>
                <div className="text-3xl font-bold mt-4 mb-1">$14.99</div>
                <div className="text-sm text-slate-400 mb-6">ou 1350 MT / mês</div>
                <p className="text-sm text-slate-500 mb-6">Poder total e API.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-slate-600"><Check size={16} className="text-blue-500"/> QR Ilimitados</li>
                  <li className="flex items-center gap-2 text-sm text-slate-600"><Check size={16} className="text-blue-500"/> API Access</li>
                  <li className="flex items-center gap-2 text-sm text-slate-600"><Check size={16} className="text-blue-500"/> Suporte Prioritário</li>
                </ul>
                <button onClick={onLogin} className="w-full py-3 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition-colors">Contatar Vendas</button>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src="https://i.imgur.com/8QhW5gS.png" alt="QRFlex" className="h-6 w-auto" />
                <span className="font-bold text-lg text-slate-900">QRFlex</span>
              </div>
              <p className="text-sm text-slate-500">
                A plataforma líder em gestão de QR Codes em Moçambique e no mundo.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-blue-600">Gerador QR</a></li>
                <li><a href="#" className="hover:text-blue-600">Preços</a></li>
                <li><a href="#" className="hover:text-blue-600">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-blue-600">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-blue-600">Tutoriais</a></li>
                <li><a href="#" className="hover:text-blue-600">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-blue-600">Privacidade</a></li>
                <li><a href="#" className="hover:text-blue-600">Termos</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center text-sm text-slate-400">
            © {new Date().getFullYear()} QRFlex. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};
