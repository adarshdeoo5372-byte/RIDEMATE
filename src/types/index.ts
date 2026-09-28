export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  role: 'rider' | 'passenger' | 'both';
  universityOrWork: string;
  verifiedBadges: string[];
  bio: string;
  joinedDate: string;
  totalRidesAsRider: number;
  totalRidesAsPassenger: number;
  bike?: {
    make: string;
    model: string;
    year: number;
    color: string;
    plateNumber: string;
    type: 'Sport' | 'Cruiser' | 'Commuter' | 'EV Scooter' | 'Adventure';
    helmetProvided: boolean;
    photoUrl?: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface RoutePoint {
  name: string;
  address: string;
  lat: number;
  lng: number;
  estimatedTime?: string;
}

export interface Ride {
  id: string;
  riderId: string;
  rider: User;
  origin: RoutePoint;
  destination: RoutePoint;
  waypoints?: RoutePoint[];
  departureDate: string; // YYYY-MM-DD
  departureTime: string; // HH:mm
  estimatedDurationMins: number;
  distanceKm: number;
  price: number; // cost share per passenger in USD
  availableSeats: number; // typically 1 for bike pillion
  totalSeats: number;
  bikeDetails: {
    make: string;
    model: string;
    plateNumber: string;
    color: string;
    helmetProvided: boolean;
    isElectric: boolean;
  };
  genderPreference: 'any' | 'women-only' | 'men-only';
  passengerRules: {
    spareHelmetProvided: boolean;
    smallBackpackAllowed: boolean;
    rainJacketProvided: boolean;
    nonSmoker: boolean;
  };
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  notes?: string;
}

export interface RideRequest {
  id: string;
  rideId: string;
  passengerId: string;
  passenger: User;
  pickupLocation: string;
  dropoffLocation: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  requestedAt: string;
  message?: string;
  safetyOtp: string; // 4-digit code given to rider before trip starts
}

export interface Review {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar: string;
  toUserId: string;
  rating: number;
  date: string;
  role: 'passenger_reviewing_rider' | 'rider_reviewing_passenger';
  comment: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  rideId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export type PageView = 'home' | 'find' | 'results' | 'offer' | 'details' | 'requests' | 'profile';
