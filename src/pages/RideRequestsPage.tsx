import React, { useState } from 'react';
import { 
  Check, X, Clock, MapPin, ShieldCheck, Bike, ArrowRight, 
  MessageSquare, KeyRound, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { useRideContext } from '../context/RideContext';
import { ChatModal } from '../components/ChatModal';

export const RideRequestsPage: React.FC = () => {
  const {
    currentUser,
    incomingRequestsForCurrentRider,
    myRequestsAsPassenger,
    rides,
    acceptRequest,
    rejectRequest,
    cancelRequest,
    completeRide,
    navigateTo,
  } = useRideContext();

  const [activeTab, setActiveTab] = useState<'incoming' | 'outgoing'>('incoming');
  const [activeChatRideId, setActiveChatRideId] = useState<string | null>(null);
  const [chatPartner, setChatPartner] = useState<{ name: string; avatar: string }>({
    name: 'Co-Rider',
    avatar: '',
  });

  const openChat = (rideId: string, partnerName: string, partnerAvatar: string) => {
    setActiveChatRideId(rideId);
    setChatPartner({ name: partnerName, avatar: partnerAvatar });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page Title & Tab Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            My Rides & Requests
          </h1>
          <p className="text-xs text-slate-500">
            Accept or decline incoming passenger requests and track your booked commutes.
          </p>
        </div>

        {/* Segmented Tab Controls */}
        <div className="inline-flex p-1 bg-slate-100 rounded-2xl self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('incoming')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'incoming'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Rider Inbox</span>
            {incomingRequestsForCurrentRider.filter((r) => r.status === 'pending').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('outgoing')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'outgoing'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Passenger Bookings</span>
            <span className="text-[10px] text-slate-400">({myRequestsAsPassenger.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Incoming Requests for Rides Offered by Current User */}
      {activeTab === 'incoming' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-slate-800">Rider Control Center</p>
              <p className="text-slate-500">
                You have {incomingRequestsForCurrentRider.length} total request(s) across your offered bike rides.
              </p>
            </div>
            <button
              onClick={() => navigateTo('offer')}
              className="px-3.5 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Bike className="w-3.5 h-3.5 text-emerald-400" />
              <span>Offer Another Route</span>
            </button>
          </div>

          {incomingRequestsForCurrentRider.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Bike className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 font-heading">No Incoming Passenger Requests</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                When commuters search for your corridor and request your pillion seat, their applications appear here with one-click Accept/Decline.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {incomingRequestsForCurrentRider.map((req) => {
                const parentRide = rides.find((r) => r.id === req.rideId);
                return (
                  <div
                    key={req.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4"
                  >
                    {/* Top Row: Parent Ride Context & Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          Corridor: {parentRide?.origin.name} → {parentRide?.destination.name}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500">{parentRide?.departureTime} departure</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase ${
                          req.status === 'accepted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : req.status === 'rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : req.status === 'completed'
                            ? 'bg-slate-100 text-slate-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>

                    {/* Passenger Profile & Message */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={req.passenger.avatar}
                          alt={req.passenger.name}
                          className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900 text-sm">{req.passenger.name}</h3>
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-[11px] text-slate-500">
                              ★ {req.passenger.rating} ({req.passenger.reviewCount})
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">{req.passenger.universityOrWork}</p>
                          <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-w-xl">
                            "{req.message || 'Would love to join your pillion ride along this route.'}"
                          </p>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0 space-y-1 text-xs">
                        <span className="text-base font-black text-slate-900">
                          +${parentRide?.price.toFixed(2) || '4.00'}
                        </span>
                        <p className="text-[10px] text-slate-400">Fuel contribution</p>
                        <p className="text-[10px] text-slate-400">{req.requestedAt}</p>
                      </div>
                    </div>

                    {/* Pickup & Dropoff Specifics */}
                    <div className="p-3 bg-slate-50/70 rounded-2xl border border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-700">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Pickup Point: <strong>{req.pickupLocation}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>Dropoff: <strong>{req.dropoffLocation}</strong></span>
                      </div>
                    </div>

                    {/* Actions: Accept / Reject / Chat */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openChat(req.rideId, req.passenger.name, req.passenger.avatar)}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Chat Passenger</span>
                        </button>

                        {req.status === 'accepted' && (
                          <div className="flex items-center gap-1 text-xs text-emerald-700 font-semibold px-2">
                            <KeyRound className="w-3.5 h-3.5" />
                            <span>Verify 4-Digit OTP upon pickup</span>
                          </div>
                        )}
                      </div>

                      {req.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => rejectRequest(req.id)}
                            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => acceptRequest(req.id)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Accept Request</span>
                          </button>
                        </div>
                      )}

                      {req.status === 'accepted' && (
                        <button
                          onClick={() => completeRide(req.rideId)}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                        >
                          Complete Commute
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Outgoing Requests Placed As Passenger */}
      {activeTab === 'outgoing' && (
        <div className="space-y-4">
          {myRequestsAsPassenger.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Bike className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 font-heading">No Active Bookings Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Search available bike rides heading your way and request a pillion seat to start carpooling.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('find')}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                >
                  Find a Ride Now
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {myRequestsAsPassenger.map((req) => {
                const targetRide = rides.find((r) => r.id === req.rideId);
                return (
                  <div
                    key={req.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-bold text-slate-900">
                          {targetRide?.departureDate} at {targetRide?.departureTime}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase ${
                          req.status === 'accepted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : req.status === 'rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : req.status === 'completed'
                            ? 'bg-slate-100 text-slate-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {req.status === 'accepted' ? 'Confirmed & Active' : req.status}
                      </span>
                    </div>

                    {/* Rider Info & Bike */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {targetRide && (
                        <div className="flex items-center gap-3.5">
                          <img
                            src={targetRide.rider.avatar}
                            alt={targetRide.rider.name}
                            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-bold text-slate-900 text-sm">{targetRide.rider.name}</h3>
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            </div>
                            <p className="text-xs text-slate-600 font-medium">
                              🏍️ {targetRide.bikeDetails.make} {targetRide.bikeDetails.model} ({targetRide.bikeDetails.color})
                            </p>
                            <p className="text-[11px] font-mono text-slate-500">Plate: {targetRide.bikeDetails.plateNumber}</p>
                          </div>
                        </div>
                      )}

                      <div className="sm:text-right space-y-1 text-xs">
                        <span className="text-lg font-black text-slate-900 font-heading">
                          ${targetRide?.price.toFixed(2) || '4.50'}
                        </span>
                        <p className="text-[10px] text-slate-400">Total fuel split</p>
                      </div>
                    </div>

                    {/* Safety OTP Display for Accepted Bookings */}
                    {req.status === 'accepted' && (
                      <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <KeyRound className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-slate-100">Boarding Safety OTP</span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Provide this verbally to {targetRide?.rider.name.split(' ')[0]} at pickup
                          </p>
                        </div>
                        <div className="px-4 py-1.5 bg-slate-800 rounded-xl border border-slate-700 text-center font-mono text-2xl font-black text-emerald-400 tracking-wider">
                          {req.safetyOtp}
                        </div>
                      </div>
                    )}

                    {/* Route Details */}
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs flex flex-wrap items-center justify-between gap-2">
                      <span>Pickup: <strong>{req.pickupLocation}</strong></span>
                      <span>Dropoff: <strong>{req.dropoffLocation}</strong></span>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <div className="flex gap-2">
                        {targetRide && (
                          <button
                            onClick={() => openChat(req.rideId, targetRide.rider.name, targetRide.rider.avatar)}
                            className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Chat Rider</span>
                          </button>
                        )}
                        <button
                          onClick={() => navigateTo('details', req.rideId)}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
                        >
                          View Live Map
                        </button>
                      </div>

                      {req.status === 'pending' && (
                        <button
                          onClick={() => cancelRequest(req.id)}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-2 py-1"
                        >
                          Cancel Request
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Chat Modal */}
      {activeChatRideId && (
        <ChatModal
          rideId={activeChatRideId}
          isOpen={!!activeChatRideId}
          onClose={() => setActiveChatRideId(null)}
          otherPartyName={chatPartner.name}
          otherPartyAvatar={chatPartner.avatar}
        />
      )}
    </div>
  );
};
