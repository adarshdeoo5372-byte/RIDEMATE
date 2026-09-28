import React, { useState } from 'react';
import { X, Lock, Mail, Phone, User, CheckCircle2, Bike } from 'lucide-react';
import { useRideContext } from '../context/RideContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setAuthModalOpen, allUsers, switchUser, showNotification } = useRideContext();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<'rider' | 'passenger' | 'both'>('both');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      showNotification('Account Created!', `Welcome to RideMate, ${fullName || 'Rider'}! Verified badge activated.`);
    } else {
      showNotification('Welcome Back!', 'Logged in successfully with active profile credentials.');
    }
    setAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                {mode === 'login' ? 'Sign In to RideMate' : 'Join the Community'}
              </h3>
              <p className="text-xs text-slate-500">Urban bike ride-sharing & daily commutes</p>
            </div>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setMode('login')}
              className={`py-2 rounded-lg transition-all ${
                mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`py-2 rounded-lg transition-all ${
                mode === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">How will you use RideMate?</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'rider', label: 'Bike Owner (Rider)' },
                    { id: 'passenger', label: 'Passenger (Pillion)' },
                    { id: 'both', label: 'Both' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setRole(item.id as any)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        role === item.id
                          ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Work / Student Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu or @company.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Campus and workplace emails get instant verification badges.</p>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Phone Number (for SMS & OTP)</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                defaultValue="secretpass"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold rounded-xl shadow-md transition-all mt-2"
          >
            {mode === 'login' ? 'Sign In' : 'Create Verified Account'}
          </button>
        </form>

        {/* Demo Fast Switcher */}
        <div className="px-6 pb-6 pt-2 bg-slate-50/70 border-t border-slate-100 text-xs">
          <p className="font-semibold text-slate-600 mb-2">Or log in instantly as a pre-configured demo account:</p>
          <div className="space-y-1.5">
            {allUsers.slice(0, 3).map((user) => (
              <button
                type="button"
                key={user.id}
                onClick={() => {
                  switchUser(user.id);
                  setAuthModalOpen(false);
                }}
                className="w-full p-2 bg-white hover:bg-emerald-50/50 border border-slate-200 rounded-xl flex items-center justify-between text-left transition-colors"
              >
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-md object-cover" />
                  <div>
                    <span className="font-bold text-slate-800">{user.name}</span>
                    <span className="text-[10px] text-slate-400 ml-1.5">({user.role})</span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
