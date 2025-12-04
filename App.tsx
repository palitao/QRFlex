import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Overview } from './pages/Overview';
import { QrGenerator } from './pages/QrGenerator';
import { Analytics } from './pages/Analytics';
import { Billing } from './pages/Billing';
import { ApiDashboard } from './pages/ApiDashboard';
import { ArchitectureDocs } from './pages/ArchitectureDocs';

const App = () => {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderPage = () => {
    switch (currentPage) {
      case 'overview': return <Overview />;
      case 'qrcodes': return <QrGenerator />;
      case 'analytics': return <Analytics />;
      case 'billing': return <Billing />;
      case 'api': return <ApiDashboard />;
      case 'docs': return <ArchitectureDocs />;
      default: return <Overview />;
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
