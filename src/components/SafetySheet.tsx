import React, { useState } from 'react';
import { X, ShieldCheck, AlertTriangle, PhoneCall, Check, HeartHandshake, Eye } from 'lucide-react';
import { useRideContext } from '../context/RideContext';

export const SafetySheet: React.FC = () => {
  const { isSafetySheetOpen, setSafetySheetOpen, currentUser, showNotification } = useRideContext();
  const [sosTriggered, setSosTriggered] = useState(false);

  if (!isSafetySheetOpen) return null;

  const handleTriggerSOS = () => {
    setSosTriggered(true);
    showNotification(
      'Emergency Alert Sent (Simulated)',
      `Live GPS coordinates and ride details dispatched to ${currentUser.emergencyContact.name} (${currentUser.emergencyContact.phone}).`,
      'warning'
    );
    setTimeout(() => setSosTriggered(false), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">RideMate Safety Standards</h3>
              <p className="text-xs text-slate-500">Every journey verified, tracked, and insured</p>
            </div>
          </div>
          <button
            onClick={() => setSafetySheetOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600">
          {/* Active Emergency Section */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>One-Tap Emergency SOS Assistance</span>
              </div>
              <p className="text-xs text-amber-800/90 leading-relaxed">
                Emergency contact: <strong className="text-amber-950">{currentUser.emergencyContact.name}</strong> ({currentUser.emergencyContact.relationship}) · {currentUser.emergencyContact.phone}
              </p>
            </div>
            <button
              onClick={handleTriggerSOS}
              disabled={sosTriggered}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-sm shrink-0 flex items-center justify-center gap-1.5 ${
                sosTriggered
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-600 hover:bg-rose-700 text-white active:scale-95'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{sosTriggered ? 'Alert Dispatched' : 'Simulate SOS'}</span>
            </button>
          </div>

          {/* 4 Pillars of Two-Wheeler Safety */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Two-Wheeler Community Safety Protocols
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Mandatory Helmets</span>
                </div>
                <p className="text-xs text-slate-500">
                  Riders must offer a sanitized ISI/DOT certified spare helmet. Passengers cannot board without one.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>4-Digit Pickup OTP</span>
                </div>
                <p className="text-xs text-slate-500">
                  Passenger provides a generated one-time code to the rider before starting the ignition.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-emerald-600" />
                  <span>Live GPS Trip Sharing</span>
                </div>
                <p className="text-xs text-slate-500">
                  Routes are monitored in real time. Loved ones can view live map coordinates via share link.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-emerald-600" />
                  <span>Verified Identities</span>
                </div>
                <p className="text-xs text-slate-500">
                  Every user must submit government ID, driving license, and campus/workplace verification.
                </p>
              </div>
            </div>
          </div>

          {/* Pillion Etiquette Guide */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Pillion Rider Etiquette & Riding Tips
            </h4>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>Wait for the rider to firmly plant both feet on the asphalt before mounting or dismounting.</li>
              <li>Hold on to the rear pillion grab rail or comfortably around the rider’s waist sides.</li>
              <li>Lean naturally with the rider when turning corners; never resist the bike's banking angle.</li>
              <li>Keep both feet on the passenger footpegs at all times, even when stopping at traffic lights.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={() => setSafetySheetOpen(false)}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
          >
            I Understand & Pledge Safety
          </button>
        </div>
      </div>
    </div>
  );
};
