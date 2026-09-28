import React, { useState } from 'react';
import { Search, MapPin, Navigation, Clock, ShieldCheck, Zap, ArrowRight, Compass } from 'lucide-react';
import { useRideContext } from '../context/RideContext';
import { POPULAR_LOCATIONS } from '../data/mockData';

export const FindRidePage: React.FC = () => {
  const { searchParams, setSearchParams, navigateTo } = useRideContext();
  const [pickup, setPickup] = useState(searchParams.pickup);
  const [destination, setDestination] = useState(searchParams.destination);
  const [date, setDate] = useState(searchParams.date);
  const [time, setTime] = useState(searchParams.time || '08:30');
  const [helmetOnly, setHelmetOnly] = useState(searchParams.helmetOnly);
  const [electricOnly, setElectricOnly] = useState(searchParams.electricOnly);
  const [genderFilter, setGenderFilter] = useState(searchParams.genderFilter);
  const [sortBy, setSortBy] = useState(searchParams.sortBy);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({
      pickup,
      destination,
      date,
      time,
      helmetOnly,
      electricOnly,
      genderFilter,
      sortBy,
    });
    navigateTo('results');
  };

  const handleSelectPopularPickup = (loc: string) => {
    setPickup(loc);
  };

  const handleSelectPopularDest = (loc: string) => {
    setDestination(loc);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
          Find a Bike Ride
        </h1>
        <p className="text-sm text-slate-500">
          Match with bike owners heading in your direction. Pillion seat guaranteed.
        </p>
      </div>

      {/* Main Search Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Origin & Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Pickup Location / Area</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="e.g. Metro Center Hub"
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              {/* Popular pick chips */}
              <div className="pt-1 flex flex-wrap gap-1">
                {POPULAR_LOCATIONS.slice(0, 3).map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => handleSelectPopularPickup(loc)}
                    className="text-[10px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 font-medium px-2 py-0.5 rounded-md transition-colors"
                  >
                    + {loc}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span>Destination / Dropoff</span>
              </label>
              <div className="relative">
                <Navigation className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Silicon Innovation Tech Park"
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              {/* Popular dest chips */}
              <div className="pt-1 flex flex-wrap gap-1">
                {POPULAR_LOCATIONS.slice(1, 4).map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => handleSelectPopularDest(loc)}
                    className="text-[10px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-800 text-slate-600 font-medium px-2 py-0.5 rounded-md transition-colors"
                  >
                    + {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Date, Time, and Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Date of Travel</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Preferred Time</label>
              <div className="relative">
                <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Sort Results By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              >
                <option value="earliest">Earliest Departure</option>
                <option value="price">Lowest Fuel Split</option>
                <option value="rating">Highest Rated Rider</option>
              </select>
            </div>
          </div>

          {/* Preferences Filters */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-700">Trip Preferences</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setHelmetOnly(!helmetOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  helmetOnly
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Spare Helmet Provided</span>
              </button>

              <button
                type="button"
                onClick={() => setElectricOnly(!electricOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  electricOnly
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Electric Scooter Only</span>
              </button>

              <button
                type="button"
                onClick={() => setGenderFilter(genderFilter === 'women-only' ? 'any' : 'women-only')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  genderFilter === 'women-only'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-indigo-500" />
                <span>Women-Only Preferred</span>
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search Matching Rides</span>
            </button>
          </div>
        </form>
      </div>

      {/* Safety Note */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <p>
          <strong>All rides include:</strong> 1 designated pillion seat, 4-digit pickup OTP verification, and live route tracking for family/friends.
        </p>
      </div>
    </div>
  );
};
