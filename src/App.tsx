import React from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { OverviewView } from './components/views/OverviewView';
import { RatesBenchmarkView } from './components/views/RatesBenchmarkView';
import { PriceTrendsView } from './components/views/PriceTrendsView';
import { DemandOutlookView } from './components/views/DemandOutlookView';
import { IncomingLotsView } from './components/views/IncomingLotsView';
import { HandoverPaymentsView } from './components/views/HandoverPaymentsView';
import { AnomalyReviewView } from './components/views/AnomalyReviewView';
import { ReliabilityView } from './components/views/ReliabilityView';
import { ServiceAreaView } from './components/views/ServiceAreaView';
import { CertificatesView } from './components/views/CertificatesView';
import { MatchRankingView } from './components/views/MatchRankingView';
import { HandoverModal } from './components/modals/HandoverModal';
import { CertificateModal } from './components/modals/CertificateModal';
import { FormulaExplainerModal } from './components/modals/FormulaExplainerModal';
import { CheckCircle } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { activeTab, toastMessage } = useDashboard();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'rates':
        return <RatesBenchmarkView />;
      case 'trends':
        return <PriceTrendsView />;
      case 'demand':
        return <DemandOutlookView />;
      case 'incoming':
        return <IncomingLotsView />;
      case 'payments':
        return <HandoverPaymentsView />;
      case 'anomalies':
        return <AnomalyReviewView />;
      case 'reliability':
        return <ReliabilityView />;
      case 'service-area':
        return <ServiceAreaView />;
      case 'certificates':
        return <CertificatesView />;
      case 'match-ranking':
        return <MatchRankingView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F7] text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <Header />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* View Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Modals & Overlays */}
      <HandoverModal />
      <CertificateModal />
      <FormulaExplainerModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-indigo-200 text-slate-700 shadow-xl animate-slideUp text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}

export default App;
