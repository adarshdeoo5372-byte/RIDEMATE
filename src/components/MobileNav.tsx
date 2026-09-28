import React from 'react';
import { Home, Search, PlusCircle, BookmarkCheck, User } from 'lucide-react';
import { useRideContext } from '../context/RideContext';
import { PageView } from '../types';

export const MobileNav: React.FC = () => {
  const { currentPage, navigateTo, incomingRequestsForCurrentRider, myRequestsAsPassenger } = useRideContext();

  const pendingCount = incomingRequestsForCurrentRider.filter((r) => r.status === 'pending').length;
  const activeBookingsCount = myRequestsAsPassenger.filter((r) => r.status === 'accepted' || r.status === 'pending').length;
  const totalAlerts = pendingCount + (activeBookingsCount > 0 ? 1 : 0);

  const tabs: { id: PageView; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'find', label: 'Find', icon: Search },
    { id: 'offer', label: 'Offer', icon: PlusCircle },
    { id: 'requests', label: 'Rides', icon: BookmarkCheck },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 py-1 shadow-lg"
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-5 items-center h-14">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            currentPage === tab.id ||
            (tab.id === 'find' && currentPage === 'results') ||
            (tab.id === 'requests' && currentPage === 'details');

          return (
            <button
              key={tab.id}
              onClick={() => navigateTo(tab.id)}
              className={`relative flex flex-col items-center justify-center h-full w-full transition-colors active:scale-95 ${
                isActive ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {tab.id === 'requests' && totalAlerts > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
              </div>
              <span className={`text-[10px] font-semibold mt-1 tracking-tight ${isActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-emerald-600 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
