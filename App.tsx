
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Overview } from './pages/Overview';
import { QrGenerator } from './pages/QrGenerator';
import { Analytics } from './pages/Analytics';
import { Billing } from './pages/Billing';
import { ApiDashboard } from './pages/ApiDashboard';
import { ArchitectureDocs } from './pages/ArchitectureDocs';
import { LandingPage } from './pages/LandingPage';
import { Settings } from './pages/Settings';
import { Support } from './pages/Support';

const App = () => {
  // State to simulate authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('overview');

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('overview');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
  };

  // If not authenticated, show Landing Page
  if (!isAuthenticated) {
    return <LandingPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'overview': return <Overview />;
      case 'qrcodes': return <QrGenerator />;
      case 'analytics': return <Analytics />;
      case 'billing': return <Billing />;
      case 'api': return <ApiDashboard />;
      case 'docs': return <ArchitectureDocs />;
      case 'settings': return <Settings />;
      case 'support': return <Support />;
      default: return <Overview />;
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout}>
      {renderPage()}
    </Layout>
  );
};

export default App;
