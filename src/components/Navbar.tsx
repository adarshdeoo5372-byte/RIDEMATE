import React, { useState } from 'react';
import { Bike, Shield, PlusCircle, UserCircle, Bell, Search, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useRideContext } from '../context/RideContext';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    allUsers,
    currentPage,
    navigateTo,
    switchUser,
    incomingRequestsForCurrentRider,
    myRequestsAsPassenger,
    setSafetySheetOpen,
    setAuthModalOpen,
  } = useRideContext();

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Pending count badge
  const pendingCount = incomingRequestsForCurrentRider.filter((r) => r.status === 'pending').length;
  const activeBookingsCount = myRequestsAsPassenger.filter((r) => r.status === 'accepted' || r.status === 'pending').length;
  const totalAlerts = pendingCount + (activeBookingsCount > 0 ? 1 : 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 group text-left focus:outline-none"
            aria-label="RideMate Home"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Bike className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 font-heading">
              Ride<span className="text-emerald-600">Mate</span>
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button
            onClick={() => navigateTo('home')}
            className={`transition-colors hover:text-slate-900 whitespace-nowrap ${
              currentPage === 'home' ? 'text-emerald-600 font-bold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigateTo('find')}
            className={`transition-colors hover:text-slate-900 whitespace-nowrap flex items-center gap-1.5 ${
              currentPage === 'find' || currentPage === 'results' ? 'text-emerald-600 font-bold' : ''
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Find a Ride</span>
          </button>
          <button
            onClick={() => navigateTo('offer')}
            className={`transition-colors hover:text-slate-900 whitespace-nowrap flex items-center gap-1.5 ${
              currentPage === 'offer' ? 'text-emerald-600 font-bold' : ''
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Offer a Ride</span>
          </button>
          <button
            onClick={() => navigateTo('requests')}
            className={`transition-colors hover:text-slate-900 whitespace-nowrap relative flex items-center gap-1.5 ${
              currentPage === 'requests' ? 'text-emerald-600 font-bold' : ''
            }`}
          >
            <span>My Rides</span>
            {totalAlerts > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setSafetySheetOpen(true)}
            className="transition-colors hover:text-slate-900 whitespace-nowrap flex items-center gap-1 text-slate-500 hover:text-emerald-600"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Safety</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Quick Offer CTA for desktop */}
          <button
            onClick={() => navigateTo('offer')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 active:scale-95 transition-all shadow-sm whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Share My Bike</span>
          </button>

          {/* User Account / Role Switcher Popover */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white shadow-sm transition-all focus:outline-none"
              aria-label="User Account"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-emerald-500/30"
              />
              <div className="hidden lg:block text-left text-xs pr-1">
                <p className="font-bold text-slate-800 truncate max-w-[90px]">{currentUser.name.split(' ')[0]}</p>
                <p className="text-[10px] text-slate-500 capitalize">{currentUser.role === 'both' ? 'Rider / Pillion' : currentUser.role}</p>
              </div>
              <RefreshCw className="w-3 h-3 text-slate-400" />
            </button>

            {/* Dropdown for instant role/user switching */}
            {showUserDropdown && (
              <div
                className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs"
                onMouseLeave={() => setShowUserDropdown(false)}
              >
                <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-slate-700">Switch Demo Persona</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono">Prototype</span>
                </div>
                <div className="py-1">
                  {allUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        switchUser(user.id);
                        setShowUserDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between gap-2.5 transition-colors ${
                        user.id === currentUser.id ? 'bg-emerald-50 text-emerald-950 font-bold' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-lg object-cover" />
                        <div className="truncate">
                          <p className="truncate font-semibold text-slate-900">{user.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">
                            {user.bike ? `Rider: ${user.bike.make} ${user.bike.model}` : 'Passenger / Commuter'}
                          </p>
                        </div>
                      </div>
                      {user.id === currentUser.id && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex gap-1">
                  <button
                    onClick={() => {
                      navigateTo('profile');
                      setShowUserDropdown(false);
                    }}
                    className="flex-1 py-1.5 text-center font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      setAuthModalOpen(true);
                      setShowUserDropdown(false);
                    }}
                    className="flex-1 py-1.5 text-center font-semibold text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    Sign In UI
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
