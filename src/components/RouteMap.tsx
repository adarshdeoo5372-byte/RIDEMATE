import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Navigation, Compass, ShieldCheck } from 'lucide-react';
import { RoutePoint } from '../types';

interface RouteMapProps {
  origin: RoutePoint;
  destination: RoutePoint;
  waypoints?: RoutePoint[];
  riderName?: string;
  bikeModel?: string;
  isLiveTracking?: boolean;
}

export const RouteMap: React.FC<RouteMapProps> = ({
  origin,
  destination,
  waypoints = [],
  riderName = 'Adarsh',
  bikeModel = 'Yamaha MT-15',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0.2); // 0 to 1
  const [activeWaypoint, setActiveWaypoint] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            setIsPlaying(false);
            return 1;
          }
          return Math.min(1, prev + 0.015);
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Cubic Bezier path calculation for realistic winding urban route
  // Path: Start (60, 260) -> C1(140, 220), C2(200, 150) -> Waypoint1 (270, 180) -> C3(340, 210), C4(420, 110) -> Waypoint2 (480, 130) -> C5(550, 150), C6(600, 80) -> End (660, 70)
  const pathD = "M 70 270 C 130 250, 180 180, 260 190 C 340 200, 390 130, 470 140 C 550 150, 590 90, 650 70";

  // Interpolate position along the approximate path for the animated bike marker
  const getBikeCoordinates = (t: number) => {
    // 4 sample points along the cubic curve
    const p0 = { x: 70, y: 270 };
    const p1 = { x: 260, y: 190 };
    const p2 = { x: 470, y: 140 };
    const p3 = { x: 650, y: 70 };

    if (t <= 0.33) {
      const localT = t / 0.33;
      return {
        x: p0.x + (p1.x - p0.x) * localT,
        y: p0.y + (p1.y - p0.y) * localT,
        angle: -20,
      };
    } else if (t <= 0.66) {
      const localT = (t - 0.33) / 0.33;
      return {
        x: p1.x + (p2.x - p1.x) * localT,
        y: p1.y + (p2.y - p1.y) * localT,
        angle: -15,
      };
    } else {
      const localT = (t - 0.66) / 0.34;
      return {
        x: p2.x + (p3.x - p2.x) * localT,
        y: p2.y + (p3.y - p2.y) * localT,
        angle: -25,
      };
    }
  };

  const bikePos = getBikeCoordinates(progress);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 text-slate-100 shadow-sm select-none">
      {/* Map Header / Telemetry Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-slate-900/85 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-1.5 flex items-center gap-2.5 text-xs shadow-md">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200">Express Corridor Route</span>
          <span className="text-slate-400">·</span>
          <span className="text-emerald-400 font-medium">Optimal Traffic (-18 min)</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1.5">
          <button
            onClick={() => {
              if (progress >= 1) setProgress(0);
              setIsPlaying(!isPlaying);
            }}
            aria-label={isPlaying ? "Pause simulation" : "Play live simulation"}
            className="h-8 px-2.5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{progress >= 1 ? 'Replay' : 'Simulate'}</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setProgress(0);
              setIsPlaying(false);
            }}
            aria-label="Reset simulation"
            className="w-8 h-8 bg-slate-800/90 hover:bg-slate-700 active:scale-95 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative w-full h-[280px] sm:h-[340px] overflow-hidden bg-[#0d1520]">
        <svg
          viewBox="0 0 720 340"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Background city street grid pattern */}
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#1e293b" strokeWidth="0.8" opacity="0.6" />
            </pattern>

            {/* Glowing route gradient */}
            <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* City Grid Background */}
          <rect width="100%" height="100%" fill="#0a0f18" />
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Secondary streets and arterial avenues */}
          <g stroke="#1a2538" strokeWidth="6" opacity="0.7">
            <path d="M 0 100 L 720 100" />
            <path d="M 0 220 L 720 220" />
            <path d="M 200 0 L 200 340" />
            <path d="M 400 0 L 400 340" />
            <path d="M 580 0 L 580 340" />
          </g>

          <g stroke="#1e2d42" strokeWidth="2.5" opacity="0.5">
            <path d="M 50 340 L 220 0" />
            <path d="M 300 340 L 520 0" />
            <path d="M 0 160 L 720 160" strokeDasharray="6 6" />
          </g>

          {/* Transit Corridor Overlay Label */}
          <text x="35" y="320" fill="#475569" fontSize="11" fontWeight="600" letterSpacing="0.05em">
            BAY HARBOR TRANSIT CORRIDOR · BIKE BUS-LANE ACTIVE
          </text>

          {/* Route Underglow (halo) */}
          <path
            d={pathD}
            fill="none"
            stroke="#10b981"
            strokeWidth="12"
            opacity="0.25"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Main Primary Route Line */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Dashed animated flow line */}
          <path
            d={pathD}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="8 12"
            strokeDashoffset={-progress * 200}
            opacity="0.8"
            strokeLinecap="round"
          />

          {/* Waypoints along route */}
          {waypoints.length > 0 && (
            <>
              {/* Waypoint 1 */}
              <g
                className="cursor-pointer"
                onClick={() => setActiveWaypoint(waypoints[0].name)}
              >
                <circle cx="260" cy="190" r="10" fill="#0f172a" stroke="#06b6d4" strokeWidth="2.5" />
                <circle cx="260" cy="190" r="4" fill="#06b6d4" />
                <text x="260" y="218" fill="#94a3b8" fontSize="10" fontWeight="600" textAnchor="middle">
                  {waypoints[0].name.split(' ')[0]} Hub
                </text>
              </g>

              {/* Waypoint 2 (if exists) */}
              {waypoints.length > 1 && (
                <g
                  className="cursor-pointer"
                  onClick={() => setActiveWaypoint(waypoints[1].name)}
                >
                  <circle cx="470" cy="140" r="10" fill="#0f172a" stroke="#06b6d4" strokeWidth="2.5" />
                  <circle cx="470" cy="140" r="4" fill="#06b6d4" />
                  <text x="470" y="125" fill="#94a3b8" fontSize="10" fontWeight="600" textAnchor="middle">
                    {waypoints[1].name.split(' ')[0]} St
                  </text>
                </g>
              )}
            </>
          )}

          {/* Origin Marker (Pickup Point) */}
          <g>
            {/* Pulsing ring */}
            <circle cx="70" cy="270" r="14" fill="#10b981" opacity="0.3" className="animate-ping" />
            <circle cx="70" cy="270" r="10" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="70" cy="270" r="4" fill="#ffffff" />
            {/* Origin Tooltip Pin */}
            <g transform="translate(70, 240)">
              <rect x="-45" y="-18" width="90" height="20" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="0" y="-4" fill="#34d399" fontSize="10" fontWeight="700" textAnchor="middle">
                PICKUP (08:30)
              </text>
            </g>
          </g>

          {/* Destination Marker (Dropoff Point) */}
          <g>
            <circle cx="650" cy="70" r="12" fill="#6366f1" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="650" cy="70" r="5" fill="#ffffff" />
            {/* Destination Tooltip Pin */}
            <g transform="translate(650, 42)">
              <rect x="-50" y="-18" width="100" height="20" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <text x="0" y="-4" fill="#a5b4fc" fontSize="10" fontWeight="700" textAnchor="middle">
                DESTINATION
              </text>
            </g>
          </g>

          {/* Live Moving Bike Position Marker */}
          <g
            transform={`translate(${bikePos.x}, ${bikePos.y})`}
            className="transition-transform duration-75"
          >
            {/* Radar ping effect */}
            <circle r="18" fill="#38bdf8" opacity="0.25" className="animate-ping" />
            {/* Bike icon container */}
            <circle r="13" fill="#0284c7" stroke="#ffffff" strokeWidth="2" filter="url(#glow)" />
            {/* Direction pointer */}
            <path
              d="M -3 -4 L 4 0 L -3 4 Z"
              fill="#ffffff"
              transform={`rotate(${bikePos.angle})`}
            />
          </g>
        </svg>

        {/* Floating Active Info Overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-2 flex items-center gap-3 text-xs shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-100">{riderName}'s {bikeModel}</p>
                <p className="text-[11px] text-slate-400">
                  {Math.round(progress * 100)}% along route · 42 km/h
                </p>
              </div>
            </div>
          </div>

          <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-2 flex items-center gap-2 text-xs shadow-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300 font-medium">GPS Live Safety Tracked</span>
          </div>
        </div>
      </div>

      {/* Waypoint Inspector Drawer if clicked */}
      {activeWaypoint && (
        <div className="px-4 py-2.5 bg-slate-800/95 border-t border-slate-700 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Intermediate Stop: <strong className="text-slate-100">{activeWaypoint}</strong></span>
          </div>
          <button
            onClick={() => setActiveWaypoint(null)}
            className="text-slate-400 hover:text-slate-200 font-medium"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
