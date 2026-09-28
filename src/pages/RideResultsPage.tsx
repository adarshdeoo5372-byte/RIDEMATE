import React from 'react';
import { Search, MapPin, Navigation, Clock, ShieldCheck, Star, ArrowRight, Zap, Filter, Sparkles, Bike } from 'lucide-react';
import { useRideContext } from '../context/RideContext';

export const RideResultsPage: React.FC = () => {
  const { filteredRides, searchParams, setSearchParams, navigateTo } = useRideContext();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Search Query Summary Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Results for</span>
            <span>·</span>
            <span className="text-slate-800">{searchParams.date || 'Today'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900">
            <span>{searchParams.pickup || 'All Pickup Locations'}</span>
            <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{searchParams.destination || 'All Destinations'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => navigateTo('find')}
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Edit Search & Filters</span>
          </button>
          <button
            onClick={() => navigateTo('offer')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
          >
            <Bike className="w-3.5 h-3.5 text-emerald-400" />
            <span>Offer Instead</span>
          </button>
        </div>
      </div>

      {/* Sorting bar & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <p className="font-semibold text-slate-600">
          Showing <strong className="text-slate-900">{filteredRides.length}</strong> matching rides with available pillion seats
        </p>

        {/* Quick Sorting Tabs */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setSearchParams({ sortBy: 'earliest' })}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              searchParams.sortBy === 'earliest' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Earliest Time
          </button>
          <button
            onClick={() => setSearchParams({ sortBy: 'price' })}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              searchParams.sortBy === 'price' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lowest Fuel Split
          </button>
          <button
            onClick={() => setSearchParams({ sortBy: 'rating' })}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              searchParams.sortBy === 'rating' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Top Rated Rider
          </button>
        </div>
      </div>

      {/* Rides List */}
      {filteredRides.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-900 font-heading">No matching rides found</h3>
            <p className="text-xs text-slate-500">
              Try broadening your pickup or dropoff keywords, or remove the strict helmet/electric filters.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => setSearchParams({ pickup: '', destination: '', helmetOnly: false, electricOnly: false })}
              className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-500 transition-colors"
            >
              Reset Filters & Show All
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRides.map((ride) => (
            <div
              key={ride.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              {/* Row 1: Rider Profile & Pricing */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={ride.rider.avatar}
                    alt={ride.rider.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-900 text-sm">{ride.rider.name}</h3>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-[11px] text-slate-400">·</span>
                      <span className="text-[11px] text-slate-500 font-medium truncate max-w-[200px]">
                        {ride.rider.universityOrWork}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-800">{ride.rider.rating}</span>
                        <span>({ride.rider.reviewCount})</span>
                      </div>
                      <span>·</span>
                      <span>{ride.rider.totalRidesAsRider} rides completed</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="sm:text-right">
                    <span className="text-xl font-black text-slate-900">${ride.price.toFixed(2)}</span>
                    <p className="text-[10px] text-slate-400">per pillion passenger</p>
                  </div>
                  <button
                    onClick={() => navigateTo('details', ride.id)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>View & Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Row 2: Route Timeline & Stops */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-4 items-center text-xs">
                {/* Pickup */}
                <div className="md:col-span-5 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-bold text-slate-900 truncate">{ride.origin.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-4.5 truncate">{ride.origin.address}</p>
                  <p className="text-[11px] font-semibold text-emerald-700 pl-4.5">
                    Departs {ride.departureTime} ({ride.departureDate})
                  </p>
                </div>

                {/* Duration & Transit Middle */}
                <div className="md:col-span-2 text-center border-y md:border-y-0 md:border-x border-slate-200/80 py-2 md:py-0">
                  <span className="font-bold text-slate-700">{ride.estimatedDurationMins} mins</span>
                  <p className="text-[10px] text-slate-400">{ride.distanceKm} km ride</p>
                </div>

                {/* Dropoff */}
                <div className="md:col-span-5 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                    <span className="font-bold text-slate-900 truncate">{ride.destination.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-4.5 truncate">{ride.destination.address}</p>
                  <p className="text-[11px] font-semibold text-indigo-700 pl-4.5">
                    Est. Arrival {ride.destination.estimatedTime || 'On time'}
                  </p>
                </div>
              </div>

              {/* Row 3: Bike Specs & Pillion Perks */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                <div className="flex flex-wrap items-center gap-3 text-slate-600">
                  <span className="font-semibold text-slate-800">
                    🏍️ {ride.bikeDetails.make} {ride.bikeDetails.model} ({ride.bikeDetails.color})
                  </span>
                  <span>·</span>
                  <span className="font-mono text-slate-700 text-[11px]">Plate {ride.bikeDetails.plateNumber}</span>
                  {ride.bikeDetails.isElectric && (
                    <>
                      <span>·</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Eco Electric
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="text-emerald-700 font-semibold">✓ 1 Pillion Seat Available</span>
                  {ride.bikeDetails.helmetProvided && <span>✓ Spare Helmet Included</span>}
                  {ride.passengerRules.smallBackpackAllowed && <span>✓ Small Backpack OK</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
