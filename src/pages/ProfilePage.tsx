import React, { useState } from 'react';
import { 
  User, ShieldCheck, Star, Bike, Check, Clock, Phone, Mail, 
  MapPin, Award, MessageSquare, Plus, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { useRideContext } from '../context/RideContext';

export const ProfilePage: React.FC = () => {
  const { currentUser, updateCurrentUser, reviews, addReview, rides, navigateTo } = useRideContext();
  const [activeTab, setActiveTab] = useState<'profile' | 'bike' | 'reviews'>('profile');

  // Review submission simulation state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [selectedTag, setSelectedTag] = useState('Smooth Riding');

  const userReviews = reviews.filter((r) => r.toUserId === currentUser.id);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    addReview({
      fromUserId: 'u-4',
      fromUserName: 'Pooja Iyer',
      fromUserAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      toUserId: currentUser.id,
      rating: newReviewRating,
      role: 'passenger_reviewing_rider',
      comment: newReviewComment.trim(),
      tags: [selectedTag, 'Verified Commuter', 'Punctual'],
    });

    setNewReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Profile Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-emerald-500/20 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
                  {currentUser.name}
                </h1>
                <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-lg border border-emerald-100 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>ID Verified</span>
                </span>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                {currentUser.universityOrWork}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 pt-0.5">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-900">{currentUser.rating}</span>
                  <span>({currentUser.reviewCount} reviews)</span>
                </div>
                <span>·</span>
                <span>Member since {currentUser.joinedDate}</span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center justify-center sm:items-end gap-2 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Commute Profile:</span>
            <span className="text-xs font-bold text-slate-900 px-3 py-1.5 bg-slate-100 rounded-xl capitalize">
              {currentUser.role === 'both' ? 'Rider & Passenger' : currentUser.role}
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
          "{currentUser.bio}"
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-2xl font-black text-slate-900 font-heading">
              {currentUser.totalRidesAsRider}
            </span>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1">Rides Offered</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-2xl font-black text-slate-900 font-heading">
              {currentUser.totalRidesAsPassenger}
            </span>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1">Pillion Rides Taken</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-2xl font-black text-emerald-700 font-heading">
              100%
            </span>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1">Safety Record</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <span className="text-2xl font-black text-indigo-700 font-heading">
              4.9★
            </span>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1">Trust Score</p>
          </div>
        </div>
      </div>

      {/* Tabs: Credentials & Info, Registered Bike, Reviews */}
      <div className="inline-flex p-1 bg-slate-100 rounded-2xl text-xs font-semibold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'profile' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Verification Badges
        </button>
        <button
          onClick={() => setActiveTab('bike')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'bike' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Bike Garage
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'reviews' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Ratings & Reviews ({userReviews.length})
        </button>
      </div>

      {/* Tab 1: Profile & Credentials */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Verification Checklist */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading">
              Community Identity Verifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentUser.verifiedBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 text-emerald-950 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{badge}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold uppercase">Verified</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 font-heading">
              Designated Emergency Contact
            </h3>
            <p className="text-xs text-slate-500">
              This contact receives live SMS alerts and your real-time GPS coordinate link if you trigger the One-Tap SOS button.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">
                  {currentUser.emergencyContact.name} ({currentUser.emergencyContact.relationship})
                </p>
                <p className="text-slate-500">{currentUser.emergencyContact.phone}</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg font-bold text-[11px]">
                Linked & Active
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Bike Garage */}
      {activeTab === 'bike' && (
        <div className="space-y-6">
          {currentUser.bike ? (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Bike className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      {currentUser.bike.make} {currentUser.bike.model} ({currentUser.bike.year})
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Registered Commuter Motorcycle · {currentUser.bike.type}
                  </p>
                </div>

                <div className="px-3 py-1.5 bg-slate-900 text-emerald-400 font-mono font-bold text-xs rounded-xl self-start sm:self-auto">
                  {currentUser.bike.plateNumber}
                </div>
              </div>

              {currentUser.bike.photoUrl && (
                <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-slate-100 shadow-xs max-h-64">
                  <img
                    src={currentUser.bike.photoUrl}
                    alt={currentUser.bike.model}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] block">Body Color</span>
                  <span className="font-bold text-slate-800">{currentUser.bike.color}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] block">Pillion Provision</span>
                  <span className="font-bold text-emerald-700">1 Seat with Grab Rail</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[10px] block">Spare Helmet</span>
                  <span className="font-bold text-emerald-700">Sanitized ISI Ready</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => navigateTo('offer')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Create Ride With This Bike
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Bike className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No Bike Registered</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You are currently browsing primarily as a pillion passenger. Register your two-wheeler to offer rides.
              </p>
              <button
                onClick={() => navigateTo('offer')}
                className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-500"
              >
                Register a Bike
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Ratings & Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 font-heading">
              Ratings Received from Co-Riders
            </h3>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simulate Co-Rider Review</span>
            </button>
          </div>

          {/* Simulated Review Submission Form */}
          {showReviewForm && (
            <form
              onSubmit={handleAddReview}
              className="bg-white rounded-3xl p-6 border border-emerald-300 shadow-sm space-y-4 text-xs animate-in fade-in"
            >
              <h4 className="font-bold text-slate-900 text-sm">Write Review as Co-Rider</h4>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newReviewRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-bold text-slate-700 ml-2">{newReviewRating} / 5 Stars</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Compliment Tag</label>
                <div className="flex flex-wrap gap-1.5">
                  {['Smooth Riding', 'Clean Helmet Provided', 'Punctual Arrival', 'Polite & Friendly', 'Great Pillion Balance'].map(
                    (tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                          selectedTag === tag
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Detailed Feedback</label>
                <textarea
                  rows={3}
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share details about the commute: punctuality, smoothness, safety precautions..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-sm"
                >
                  Post Review
                </button>
              </div>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {userReviews.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center text-xs text-slate-400 border border-slate-200">
                No reviews yet for this user persona. Click "Simulate Co-Rider Review" above to test.
              </div>
            ) : (
              userReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.fromUserAvatar}
                        alt={rev.fromUserName}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/20"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{rev.fromUserName}</p>
                        <p className="text-[11px] text-slate-400">{rev.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-700 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                    "{rev.comment}"
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rev.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
