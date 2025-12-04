import React from 'react';
import { LayoutDashboard, QrCode, BarChart3, CreditCard, Code, FileText, Menu, X, Bell } from 'lucide-react';
import { currentUser } from '../services/mockData';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

const SidebarItem = ({ icon: Icon, label, id, active, onClick }: any) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      active 
        ? 'bg-blue-50 text-blue-700' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <Icon size={18} />
    {label}
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-10">
        <div className="p-6 border-b border-slate-100 flex items-center justify-start">
          <img 
            src="https://i.imgur.com/8QhW5gS.png" 
            alt="QRFlex Logo" 
            className="h-8 w-auto object-contain" 
          />
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4 mt-2">Platform</div>
          <SidebarItem icon={LayoutDashboard} label="Visão Geral" id="overview" active={activePage === 'overview'} onClick={onNavigate} />
          <SidebarItem icon={QrCode} label="Meus QR Codes" id="qrcodes" active={activePage === 'qrcodes'} onClick={onNavigate} />
          <SidebarItem icon={BarChart3} label="Analytics" id="analytics" active={activePage === 'analytics'} onClick={onNavigate} />
          
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4 mt-6">Admin</div>
          <SidebarItem icon={CreditCard} label="Financeiro" id="billing" active={activePage === 'billing'} onClick={onNavigate} />
          <SidebarItem icon={Code} label="API Developers" id="api" active={activePage === 'api'} onClick={onNavigate} />
          
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4 mt-6">Technical</div>
          <SidebarItem icon={FileText} label="Arquitetura Docs" id="docs" active={activePage === 'docs'} onClick={onNavigate} />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2">
            <img src={currentUser.foto_perfil} alt="User" className="w-9 h-9 rounded-full bg-slate-200" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{currentUser.nome}</p>
              <p className="text-xs text-slate-500 truncate capitalize">{currentUser.plano} Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        {/* Topbar */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200 h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button 
                className="md:hidden p-2 text-slate-600" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             >
                <Menu size={20} />
             </button>
             <h1 className="text-lg font-semibold text-slate-800 capitalize">
                {activePage === 'qrcodes' ? 'QR Code Manager' : activePage.replace('_', ' ')}
             </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm shadow-blue-200">
              + Novo QR Code
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-64 bg-white h-full shadow-xl flex flex-col">
            <div className="p-4 flex justify-between items-center border-b border-slate-100">
              <img 
                src="https://i.imgur.com/8QhW5gS.png" 
                alt="QRFlex Logo" 
                className="h-6 w-auto object-contain" 
              />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-500"><X size={20} /></button>
            </div>
            <nav className="p-4 space-y-1">
              <SidebarItem icon={LayoutDashboard} label="Overview" id="overview" active={activePage === 'overview'} onClick={(p: string) => { onNavigate(p); setMobileMenuOpen(false); }} />
              <SidebarItem icon={QrCode} label="My QR Codes" id="qrcodes" active={activePage === 'qrcodes'} onClick={(p: string) => { onNavigate(p); setMobileMenuOpen(false); }} />
              <SidebarItem icon={BarChart3} label="Analytics" id="analytics" active={activePage === 'analytics'} onClick={(p: string) => { onNavigate(p); setMobileMenuOpen(false); }} />
              <div className="my-2 border-t border-slate-100" />
              <SidebarItem icon={CreditCard} label="Billing" id="billing" active={activePage === 'billing'} onClick={(p: string) => { onNavigate(p); setMobileMenuOpen(false); }} />
              <SidebarItem icon={Code} label="API" id="api" active={activePage === 'api'} onClick={(p: string) => { onNavigate(p); setMobileMenuOpen(false); }} />
              <SidebarItem icon={FileText} label="Architecture" id="docs" active={activePage === 'docs'} onClick={(p: string) => { onNavigate(p); setMobileMenuOpen(false); }} />
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};