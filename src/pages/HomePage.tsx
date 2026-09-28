import React, { useState } from 'react';
import { Search, PlusCircle, ShieldCheck, MapPin, Clock, ArrowRight, Star, Sparkles, Navigation, Users, Check, Flame } from 'lucide-react';
import { useRideContext } from '../context/RideContext';
import { POPULAR_LOCATIONS, ASSET_IMAGES } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { navigateTo, setSearchParams, rides, setSafetySheetOpen } = useRideContext();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('2026-09-29');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ pickup, destination, date });
    navigateTo('results');
  };

  const handleQuickRoute = (from: string, to: string) => {
    setPickup(from);
    setDestination(to);
    setSearchParams({ pickup: from, destination: to, date });
    navigateTo('results');
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 lg:pt-14 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Hero Text & Search Box */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-800">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Next-Gen Urban Two-Wheeler Carpooling</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-heading">
                Two Wheels, One Route. <span className="text-emerald-600">Share the Ride.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Connect bike owners with commuters along the same path. Beat urban congestion, split fuel costs fairly, and travel with verified fellow citizens.
              </p>

              {/* Main Quick Action & Search Widget */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200/90 space-y-4">
                <form onSubmit={handleSearchSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Pickup Input */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Pickup Location</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="text"
                          value={pickup}
                          onChange={(e) => setPickup(e.target.value)}
                          placeholder="e.g. Metro Center Hub"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Destination Input */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        <span>Destination</span>
                      </label>
                      <div className="relative">
                        <Navigation className="w-4 h-4 text-indigo-600 absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="text"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          placeholder="e.g. Silicon Tech Park"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>Travel Date</span>
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>

                    <div className="pt-5 flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <Search className="w-4 h-4" />
                        <span>Find a Ride</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateTo('offer')}
                        className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <PlusCircle className="w-4 h-4 text-emerald-400" />
                        <span>Offer a Ride</span>
                      </button>
                    </div>
                  </div>
                </form>

                {/* Popular Corridors */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 mr-2">Popular corridors:</span>
                  <div className="inline-flex flex-wrap gap-1.5 mt-1">
                    <button
                      onClick={() => handleQuickRoute('Metro Center Hub', 'Silicon Innovation Tech Park')}
                      className="text-[11px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium px-2.5 py-1 rounded-lg transition-colors"
                    >
                      Metro Center → Tech Park
                    </button>
                    <button
                      onClick={() => handleQuickRoute('North University Gate', 'Downtown Co-Working Spine')}
                      className="text-[11px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium px-2.5 py-1 rounded-lg transition-colors"
                    >
                      University → Downtown
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 font-medium pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% ID Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Sanitized Helmet Mandatory</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>1 Pillion Seat Default</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] lg:aspect-[5/4] group">
                <img
                  src={ASSET_IMAGES.hero}
                  alt="City bike commuter on modern motorcycle during sunset"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Floating Live Badge Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                        AS
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Adarsh's Yamaha MT-15</p>
                        <p className="text-[11px] text-slate-500">Departing 08:30 AM · 1 Pillion Seat</p>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-700 text-sm">$4.50</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="truncate max-w-[190px]">Metro Center → Silicon Tech Park</span>
                    <button
                      onClick={() => navigateTo('details', 'ride-101')}
                      className="font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quantitative Impact & Why Bike Sharing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Smarter, Faster, Cheaper City Commutes
          </h2>
          <p className="text-sm text-slate-600">
            Why two wheels beat four wheels for everyday urban transit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-heading">45% Faster</div>
            <p className="font-bold text-slate-800 text-sm">Bypass Peak Hour Bottlenecks</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Motorcycles and scooters utilize designated bus/bike corridors and navigate dense intersections with ease.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-heading">60% Savings</div>
            <p className="font-bold text-slate-800 text-sm">Direct Fuel Cost Sharing</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              No surge pricing or hefty platform commissions. Passengers chip in just $3 to $5 towards the rider's genuine fuel cost.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-heading">100% Verified</div>
            <p className="font-bold text-slate-800 text-sm">Verified Co-Riders Only</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every participant passes government identity, driving license, and campus/workplace verification before offering or joining.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Scheduled Rides Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Available Rides Today
            </h2>
            <p className="text-sm text-slate-500">Live bike owners with matching commute routes ready to share</p>
          </div>
          <button
            onClick={() => navigateTo('find')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Explore All Rides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rides.slice(0, 3).map((ride) => (
            <div
              key={ride.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rider Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={ride.rider.avatar}
                      alt={ride.rider.name}
                      className="w-10 h-10 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{ride.rider.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-slate-800">{ride.rider.rating}</span>
                        <span>·</span>
                        <span>{ride.rider.reviewCount} reviews</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">${ride.price.toFixed(2)}</span>
                    <p className="text-[10px] text-slate-400">fuel share</p>
                  </div>
                </div>

                {/* Route Points */}
                <div className="space-y-2 py-2 border-y border-slate-100 text-xs">
                  <div className="flex items-start gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <div className="truncate">
                      <p className="font-bold text-slate-800 truncate">{ride.origin.name}</p>
                      <p className="text-[11px] text-slate-400">{ride.origin.estimatedTime || ride.departureTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
                    <div className="truncate">
                      <p className="font-bold text-slate-800 truncate">{ride.destination.name}</p>
                      <p className="text-[11px] text-slate-400">{ride.destination.estimatedTime || 'Arrival'}</p>
                    </div>
                  </div>
                </div>

                {/* Bike & Amenities */}
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-medium text-slate-700">
                    {ride.bikeDetails.make} {ride.bikeDetails.model}
                  </span>
                  <span>1 Pillion Seat</span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 mt-2">
                <button
                  onClick={() => navigateTo('details', ride.id)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span>View Route & Request</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Protocol Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Compromise on Pillion Safety</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
                Ride with Confidence on Every Street
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                Before any ride starts, the passenger receives a unique 4-digit Safety OTP. Spare certified helmets are verified by riders before takeoff.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setSafetySheetOpen(true)}
                  className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md"
                >
                  View Safety Standards
                </button>
                <button
                  onClick={() => navigateTo('offer')}
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all"
                >
                  Register As Verified Rider
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <img
                src={ASSET_IMAGES.ridersSharing}
                alt="Two commuters standing by motorcycle holding helmets"
                className="w-full max-w-xs rounded-2xl shadow-lg ring-1 ring-white/10 object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
