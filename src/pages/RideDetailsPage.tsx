import React, { useState } from 'react';
import { 
  ArrowLeft, ShieldCheck, Star, MapPin, Navigation, Clock, Bike, 
  MessageSquare, Phone, Share2, CheckCircle2, AlertCircle, Check, 
  Users, KeyRound, Sparkles
} from 'lucide-react';
import { useRideContext } from '../context/RideContext';
import { RouteMap } from '../components/RouteMap';
import { ChatModal } from '../components/ChatModal';

export const RideDetailsPage: React.FC = () => {
  const {
    selectedRide,
    currentUser,
    requests,
    requestRide,
    acceptRequest,
    rejectRequest,
    completeRide,
    navigateTo,
    showNotification,
    setSafetySheetOpen,
  } = useRideContext();

  const [pickupSpot, setPickupSpot] = useState('');
  const [dropoffSpot, setDropoffSpot] = useState('');
  const [message, setMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedRide) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Ride not found</h2>
        <button
          onClick={() => navigateTo('find')}
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
        >
          Back to Search
        </button>
      </div>
    );
  }

  const isRiderOfThisRide = selectedRide.riderId === currentUser.id;

  // Check if current user has an active request for this ride
  const myExistingRequest = requests.find(
    (req) => req.rideId === selectedRide.id && req.passengerId === currentUser.id
  );

  // Incoming requests for this ride (if current user is the rider)
  const incomingRequestsForRide = requests.filter((req) => req.rideId === selectedRide.id);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    requestRide(
      selectedRide.id,
      pickupSpot || selectedRide.origin.name,
      dropoffSpot || selectedRide.destination.name,
      message || "Hey! I'm heading in this direction and would love to join your pillion ride."
    );
    setIsSubmitting(false);
  };

  const handleShareTrip = () => {
    if (navigator.share) {
      navigator.share({
        title: `RideMate: Commute to ${selectedRide.destination.name}`,
        text: `Tracking live bike commute with ${selectedRide.rider.name} on ${selectedRide.bikeDetails.model}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showNotification('Link Copied', 'Live ride share link copied to clipboard. Share with friends or family.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Back button & Title Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('results')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Rides</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareTrip}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share Trip</span>
          </button>
          <button
            onClick={() => setSafetySheetOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Safety Checklist</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Details / Request Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Visual Route Map & Route Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* Interactive Route Map Component */}
          <RouteMap
            origin={selectedRide.origin}
            destination={selectedRide.destination}
            waypoints={selectedRide.waypoints}
            riderName={selectedRide.rider.name}
            bikeModel={selectedRide.bikeDetails.model}
          />

          {/* Detailed Route Timeline */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900 font-heading">
              Route & Transit Waypoints
            </h3>

            <div className="space-y-4 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {/* Pickup */}
              <div className="relative pl-8">
                <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-xs">{selectedRide.origin.name}</h4>
                    <span className="text-xs font-bold text-emerald-700">{selectedRide.departureTime}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{selectedRide.origin.address}</p>
                </div>
              </div>

              {/* Waypoints */}
              {selectedRide.waypoints?.map((wp, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className="absolute left-2 top-2 w-2.5 h-2.5 rounded-full bg-cyan-500 ring-2 ring-cyan-100" />
                  <div>
                    <h4 className="font-semibold text-slate-800 text-xs">{wp.name}</h4>
                    <p className="text-[11px] text-slate-500">Corridor boarding spot available</p>
                  </div>
                </div>
              ))}

              {/* Destination */}
              <div className="relative pl-8">
                <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500 ring-4 ring-indigo-100" />
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-xs">{selectedRide.destination.name}</h4>
                    <span className="text-xs font-bold text-indigo-700">
                      {selectedRide.destination.estimatedTime || 'Arrival'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{selectedRide.destination.address}</p>
                </div>
              </div>
            </div>

            {/* Rider Trip Notes */}
            {selectedRide.notes && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <span className="font-bold text-slate-700">Rider Notes:</span>
                <p className="text-slate-600 leading-relaxed">{selectedRide.notes}</p>
              </div>
            )}
          </div>

          {/* Bike & Safety Checklist Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading">
              Vehicle & Safety Specifications
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10px] block">Motorcycle</span>
                <span className="font-bold text-slate-800">{selectedRide.bikeDetails.make} {selectedRide.bikeDetails.model}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10px] block">License Plate</span>
                <span className="font-mono font-bold text-slate-800">{selectedRide.bikeDetails.plateNumber}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10px] block">Vehicle Color</span>
                <span className="font-bold text-slate-800">{selectedRide.bikeDetails.color}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10px] block">Pillion Seats</span>
                <span className="font-bold text-emerald-700">1 Passenger Max</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div className="flex items-center gap-2 text-slate-700">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sanitized spare helmet provided by rider</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Small laptop backpack permitted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Rider Profile + Booking / Status Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Rider Profile Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <img
                  src={selectedRide.rider.avatar}
                  alt={selectedRide.rider.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-base font-heading">
                      {selectedRide.rider.name}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedRide.rider.universityOrWork}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-800">{selectedRide.rider.rating}</span>
                      <span>({selectedRide.rider.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-slate-900 font-heading">
                  ${selectedRide.price.toFixed(2)}
                </span>
                <p className="text-[10px] text-slate-400">fuel share</p>
              </div>
            </div>

            {/* Rider Bio */}
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              "{selectedRide.rider.bio}"
            </p>

            {/* Verification Badges */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Verified Credentials
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedRide.rider.verifiedBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-lg border border-emerald-100 flex items-center gap-1"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Chat Trigger if connected */}
            <button
              onClick={() => setIsChatOpen(true)}
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-800 flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Chat with {selectedRide.rider.name.split(' ')[0]}</span>
            </button>
          </div>

          {/* Ride Request / Status Controller */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading">
              {isRiderOfThisRide ? 'Your Published Ride' : 'Ride Booking Status'}
            </h3>

            {/* Case 1: User is the Rider who offered this ride */}
            {isRiderOfThisRide ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs space-y-1">
                  <p className="font-bold text-emerald-900">You are the Rider for this trip</p>
                  <p className="text-emerald-700">
                    Incoming passenger requests for your pillion seat will appear below:
                  </p>
                </div>

                {incomingRequestsForRide.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                    No requests received yet. Share your ride link to invite co-riders!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {incomingRequestsForRide.map((req) => (
                      <div
                        key={req.id}
                        className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2.5 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={req.passenger.avatar}
                              alt={req.passenger.name}
                              className="w-8 h-8 rounded-xl object-cover"
                            />
                            <div>
                              <p className="font-bold text-slate-900">{req.passenger.name}</p>
                              <p className="text-[10px] text-slate-500">
                                Rating: {req.passenger.rating} ★ · {req.requestedAt}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                              req.status === 'accepted'
                                ? 'bg-emerald-100 text-emerald-800'
                                : req.status === 'rejected'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>

                        <p className="text-slate-600 text-[11px] italic bg-white p-2 rounded-lg border border-slate-100">
                          "{req.message || 'Would love to ride along!'}"
                        </p>

                        <div className="text-[11px] text-slate-500">
                          <span>Pickup: <strong>{req.pickupLocation}</strong></span>
                        </div>

                        {req.status === 'pending' && (
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              onClick={() => acceptRequest(req.id)}
                              className="py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Accept Passenger</span>
                            </button>
                            <button
                              onClick={() => rejectRequest(req.id)}
                              className="py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-lg transition-colors"
                            >
                              Decline
                            </button>
                          </div>
                        )}

                        {req.status === 'accepted' && (
                          <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100 flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-emerald-900">Passenger OTP on arrival:</span>
                            <span className="font-mono font-bold text-emerald-700 text-xs">••••</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => completeRide(selectedRide.id)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Mark Ride as Completed
                </button>
              </div>
            ) : myExistingRequest ? (
              /* Case 2: Passenger has already requested this ride */
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    myExistingRequest.status === 'accepted'
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                      : myExistingRequest.status === 'pending'
                      ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                      : 'bg-rose-50/80 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">
                      {myExistingRequest.status === 'accepted'
                        ? 'Ride Request Confirmed!'
                        : myExistingRequest.status === 'pending'
                        ? 'Request Awaiting Rider Confirmation'
                        : 'Request Declined'}
                    </span>
                    <span className="text-[10px] font-mono uppercase font-bold">
                      {myExistingRequest.status}
                    </span>
                  </div>

                  <p className="text-[11px] leading-relaxed">
                    {myExistingRequest.status === 'accepted'
                      ? `${selectedRide.rider.name} accepted your request. Meet at the designated pickup point.`
                      : myExistingRequest.status === 'pending'
                      ? `${selectedRide.rider.name} has been notified. You can coordinate in chat below.`
                      : 'You may search for other rides traveling along your route.'}
                  </p>
                </div>

                {/* 4-digit Safety OTP Card for Passenger */}
                {myExistingRequest.status === 'accepted' && (
                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <KeyRound className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold">Your 4-Digit Pickup Safety OTP</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">Required</span>
                    </div>

                    <div className="py-2 text-center bg-slate-800/80 rounded-xl border border-slate-700">
                      <span className="font-mono text-3xl font-black tracking-widest text-emerald-400">
                        {myExistingRequest.safetyOtp}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-400 text-center">
                      Provide this OTP code verbally to {selectedRide.rider.name.split(' ')[0]} before mounting the pillion seat.
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open Rider Chat</span>
                  </button>
                  <button
                    onClick={() => navigateTo('requests')}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
                  >
                    Manage In My Rides
                  </button>
                </div>
              </div>
            ) : (
              /* Case 3: Passenger booking form to request this ride */
              <form onSubmit={handleRequestSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Your Desired Pickup Spot</label>
                  <input
                    type="text"
                    required
                    value={pickupSpot}
                    onChange={(e) => setPickupSpot(e.target.value)}
                    placeholder={`e.g. ${selectedRide.origin.name}`}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-400">
                    Along rider's corridor: {selectedRide.origin.name} → {selectedRide.destination.name}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Your Dropoff Point</label>
                  <input
                    type="text"
                    required
                    value={dropoffSpot}
                    onChange={(e) => setDropoffSpot(e.target.value)}
                    placeholder={`e.g. ${selectedRide.destination.name}`}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Message to Rider (Optional)</label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. 'I will be waiting right at the station exit with a blue backpack.'"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Fuel Contribution:</span>
                  <span className="font-bold text-slate-900 text-sm">${selectedRide.price.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Bike className="w-4 h-4" />
                  <span>Request Pillion Ride</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* In-App Chat Modal */}
      <ChatModal
        rideId={selectedRide.id}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        otherPartyName={selectedRide.rider.name}
        otherPartyAvatar={selectedRide.rider.avatar}
      />
    </div>
  );
};
