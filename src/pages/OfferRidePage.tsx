import React, { useState } from 'react';
import { Bike, MapPin, Navigation, Clock, ShieldCheck, DollarSign, Plus, Check, ArrowRight, Zap } from 'lucide-react';
import { useRideContext } from '../context/RideContext';
import { POPULAR_LOCATIONS } from '../data/mockData';

export const OfferRidePage: React.FC = () => {
  const { currentUser, offerRide, navigateTo } = useRideContext();

  const userBike = currentUser.bike || {
    make: 'Yamaha',
    model: 'MT-15 V2',
    year: 2023,
    color: 'Matte Gunmetal',
    plateNumber: '7KRM92',
    type: 'Sport',
    helmetProvided: true,
  };

  const [originName, setOriginName] = useState('Metro Center Hub');
  const [originAddress, setOriginAddress] = useState('4th & Market St, Financial District');
  const [destName, setDestName] = useState('Silicon Innovation Tech Park');
  const [destAddress, setDestAddress] = useState('Building 4, Innovation Way, South Bay');
  const [waypoint1, setWaypoint1] = useState('Mission Bay Transit Plaza');
  const [departureDate, setDepartureDate] = useState('2026-09-29');
  const [departureTime, setDepartureTime] = useState('08:30');
  const [estimatedDuration, setEstimatedDuration] = useState(35);
  const [distanceKm, setDistanceKm] = useState(14.2);
  const [price, setPrice] = useState(4.50);
  const [availableSeats] = useState(1); // One available pillion seat by default
  const [spareHelmetProvided, setSpareHelmetProvided] = useState(true);
  const [smallBackpackAllowed, setSmallBackpackAllowed] = useState(true);
  const [rainJacketProvided, setRainJacketProvided] = useState(false);
  const [isElectric, setIsElectric] = useState(userBike.type === 'EV Scooter');
  const [bikeMake, setBikeMake] = useState(userBike.make);
  const [bikeModel, setBikeModel] = useState(userBike.model);
  const [plateNumber, setPlateNumber] = useState(userBike.plateNumber);
  const [bikeColor, setBikeColor] = useState(userBike.color);
  const [notes, setNotes] = useState('Daily morning commuter ride. Splitting gas cost. Clean sanitized helmet ready for pillion passenger!');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    offerRide({
      origin: {
        name: originName,
        address: originAddress,
        lat: 37.7885,
        lng: -122.4015,
        estimatedTime: departureTime,
      },
      destination: {
        name: destName,
        address: destAddress,
        lat: 37.7510,
        lng: -122.3890,
      },
      waypoints: waypoint1 ? [{ name: waypoint1, address: waypoint1, lat: 37.7680, lng: -122.3920 }] : [],
      departureDate,
      departureTime,
      estimatedDurationMins: Number(estimatedDuration),
      distanceKm: Number(distanceKm),
      price: Number(price),
      availableSeats: 1,
      totalSeats: 1,
      bikeDetails: {
        make: bikeMake,
        model: bikeModel,
        plateNumber: plateNumber.toUpperCase(),
        color: bikeColor,
        helmetProvided: spareHelmetProvided,
        isElectric,
      },
      genderPreference: 'any',
      passengerRules: {
        spareHelmetProvided,
        smallBackpackAllowed,
        rainJacketProvided,
        nonSmoker: true,
      },
      notes,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
          <Bike className="w-3.5 h-3.5 text-emerald-600" />
          <span>Share Your Pillion Seat</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
          Offer a Bike Ride
        </h1>
        <p className="text-sm text-slate-500">
          Already riding somewhere? Share your pillion seat, split fuel costs, and meet verified co-commuters.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Route & Timings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
              1
            </div>
            <h2 className="text-base font-bold text-slate-900 font-heading">Route & Departure</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Origin */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Starting Point (Pickup Hub)</span>
              </label>
              <input
                type="text"
                required
                value={originName}
                onChange={(e) => setOriginName(e.target.value)}
                placeholder="e.g. Metro Center Hub"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              <input
                type="text"
                value={originAddress}
                onChange={(e) => setOriginAddress(e.target.value)}
                placeholder="Street address or exact landmark"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span>Destination (Dropoff Point)</span>
              </label>
              <input
                type="text"
                required
                value={destName}
                onChange={(e) => setDestName(e.target.value)}
                placeholder="e.g. Silicon Innovation Tech Park"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              <input
                type="text"
                value={destAddress}
                onChange={(e) => setDestAddress(e.target.value)}
                placeholder="Street address or campus gate"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Optional Waypoint */}
          <div className="space-y-1 pt-1">
            <label className="text-xs font-semibold text-slate-600">
              Intermediate Stop / Corridor Waypoint (Optional)
            </label>
            <input
              type="text"
              value={waypoint1}
              onChange={(e) => setWaypoint1(e.target.value)}
              placeholder="e.g. Mission Bay Transit Plaza (passengers can request pickups here)"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Date, Time, Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Date</label>
              <input
                type="date"
                required
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Departure Time</label>
              <div className="relative">
                <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="time"
                  required
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Estimated Duration</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="5"
                  max="180"
                  value={estimatedDuration}
                  onChange={(e) => setEstimatedDuration(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none"
                />
                <span className="text-xs text-slate-500 font-medium">mins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Bike Details & Pillion Seat Setup */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
              2
            </div>
            <h2 className="text-base font-bold text-slate-900 font-heading">Bike Details & Pillion Capacity</h2>
          </div>

          {/* Seat Capacity Card - Spec: One available pillion seat by default */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">1 Available Pillion Seat</p>
                <p className="text-xs text-slate-600">Standard two-wheeler seating safety policy: 1 passenger per ride</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg">
              Locked to 1 Pillion
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Make / Brand</label>
              <input
                type="text"
                required
                value={bikeMake}
                onChange={(e) => setBikeMake(e.target.value)}
                placeholder="e.g. Yamaha"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Model</label>
              <input
                type="text"
                required
                value={bikeModel}
                onChange={(e) => setBikeModel(e.target.value)}
                placeholder="e.g. MT-15 V2"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Color</label>
              <input
                type="text"
                required
                value={bikeColor}
                onChange={(e) => setBikeColor(e.target.value)}
                placeholder="e.g. Matte Gunmetal"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">License Plate</label>
              <input
                type="text"
                required
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                placeholder="e.g. 7KRM92"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono uppercase text-slate-900"
              />
            </div>
          </div>

          {/* Passenger Safety Checkboxes */}
          <div className="pt-2 space-y-2">
            <span className="text-xs font-bold text-slate-700">Pillion Passenger Amenities</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 flex items-center gap-2 cursor-pointer bg-slate-50/50">
                <input
                  type="checkbox"
                  checked={spareHelmetProvided}
                  onChange={(e) => setSpareHelmetProvided(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-xs font-semibold text-slate-800">Clean Spare Helmet</span>
              </label>

              <label className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 flex items-center gap-2 cursor-pointer bg-slate-50/50">
                <input
                  type="checkbox"
                  checked={smallBackpackAllowed}
                  onChange={(e) => setSmallBackpackAllowed(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-xs font-semibold text-slate-800">Small Backpack Allowed</span>
              </label>

              <label className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 flex items-center gap-2 cursor-pointer bg-slate-50/50">
                <input
                  type="checkbox"
                  checked={isElectric}
                  onChange={(e) => setIsElectric(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-xs font-semibold text-slate-800">Electric Vehicle (EV)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Step 3: Fair Cost Contribution & Notes */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
              3
            </div>
            <h2 className="text-base font-bold text-slate-900 font-heading">Fair Cost Contribution</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">
                Suggested Passenger Fuel Contribution
              </label>
              <div className="relative max-w-xs">
                <DollarSign className="w-4 h-4 text-emerald-600 absolute left-3 top-3.5" />
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="20"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-slate-900 focus:bg-white focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Recommended fair rate for {distanceKm} km: <strong>$3.50 – $5.00</strong>. Keeps it affordable for co-commuters while covering your fuel.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-600 font-semibold">
                <span>Distance:</span>
                <span className="text-slate-900 font-bold">{distanceKm} km</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 font-semibold">
                <span>Estimated Time:</span>
                <span className="text-slate-900 font-bold">{estimatedDuration} mins</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 font-semibold">
                <span>Pillion Capacity:</span>
                <span className="text-emerald-700 font-bold">1 Passenger</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-semibold text-slate-700">Trip Notes for Passenger</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Please wait near the coffee shop entrance. I have a matte black helmet for you."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-xs font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Bike className="w-4 h-4 text-emerald-400" />
              <span>Publish Ride Offer</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
