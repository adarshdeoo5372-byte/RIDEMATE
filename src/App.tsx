import React from 'react';
import { Bike, Shield, Heart, ExternalLink, X, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { RideProvider, useRideContext } from './context/RideContext';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { AuthModal } from './components/AuthModal';
import { SafetySheet } from './components/SafetySheet';
import { HomePage } from './pages/HomePage';
import { FindRidePage } from './pages/FindRidePage';
import { RideResultsPage } from './pages/RideResultsPage';
import { OfferRidePage } from './pages/OfferRidePage';
import { RideDetailsPage } from './pages/RideDetailsPage';
import { RideRequestsPage } from './pages/RideRequestsPage';
import { ProfilePage } from './pages/ProfilePage';

const AppContent: React.FC = () => {
  const { currentPage, notification, dismissNotification, navigateTo, setSafetySheetOpen } = useRideContext();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'find':
        return <FindRidePage />;
      case 'results':
        return <RideResultsPage />;
      case 'offer':
        return <OfferRidePage />;
      case 'details':
        return <RideDetailsPage />;
      case 'requests':
        return <RideRequestsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Top Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-12">
        {renderCurrentPage()}
      </main>

      {/* Modern, Clean Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
              <Bike className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-slate-900 text-sm font-heading tracking-tight">
              Ride<span className="text-emerald-600">Mate</span>
            </span>
            <span className="text-slate-300">·</span>
            <span>Sustainable Urban Pillion Carpooling</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-slate-600">
            <button onClick={() => navigateTo('home')} className="hover:text-slate-900 transition-colors">
              Home
            </button>
            <button onClick={() => navigateTo('find')} className="hover:text-slate-900 transition-colors">
              Find Ride
            </button>
            <button onClick={() => navigateTo('offer')} className="hover:text-slate-900 transition-colors">
              Offer Ride
            </button>
            <button onClick={() => setSafetySheetOpen(true)} className="hover:text-slate-900 transition-colors">
              Safety Protocols
            </button>
            <button onClick={() => navigateTo('profile')} className="hover:text-slate-900 transition-colors">
              Verification Standards
            </button>
          </div>

          <p className="text-[11px] text-slate-400 text-center md:text-right">
            © {new Date().getFullYear()} RideMate Platform. Verified two-wheeler community transit.
          </p>
        </div>
      </footer>

      {/* Mobile Bottom Tab Bar */}
      <MobileNav />

      {/* Floating System Notification Toast */}
      {notification && (
        <div className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:max-w-md z-50 animate-in slide-in-from-bottom-4 duration-200">
          <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700 flex items-start gap-3">
            {notification.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            {notification.type === 'warning' && (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            {notification.type === 'info' && (
              <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            )}

            <div className="flex-1 space-y-0.5 text-xs">
              <p className="font-bold text-slate-100">{notification.title}</p>
              <p className="text-slate-300 leading-relaxed text-[11px]">{notification.message}</p>
            </div>

            <button
              onClick={dismissNotification}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <AuthModal />
      <SafetySheet />
    </div>
  );
};

export default function App() {
  return (
    <RideProvider>
      <AppContent />
    </RideProvider>
  );
}
