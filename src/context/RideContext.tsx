import React, { createContext, useContext, useState, useMemo } from 'react';
import { User, Ride, RideRequest, Review, ChatMessage, PageView } from '../types';
import { MOCK_USERS, MOCK_RIDES, MOCK_REQUESTS, MOCK_REVIEWS, MOCK_CHAT } from '../data/mockData';

export interface SearchParams {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  helmetOnly: boolean;
  electricOnly: boolean;
  genderFilter: 'any' | 'women-only';
  sortBy: 'earliest' | 'price' | 'rating';
}

interface NotificationState {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface RideContextType {
  currentUser: User;
  allUsers: User[];
  rides: Ride[];
  requests: RideRequest[];
  reviews: Review[];
  currentPage: PageView;
  selectedRideId: string | null;
  selectedRide: Ride | null;
  searchParams: SearchParams;
  filteredRides: Ride[];
  incomingRequestsForCurrentRider: RideRequest[];
  myRequestsAsPassenger: RideRequest[];
  chatMessages: Record<string, ChatMessage[]>;
  isAuthModalOpen: boolean;
  isSafetySheetOpen: boolean;
  notification: NotificationState | null;
  
  // Navigation & UI controls
  navigateTo: (page: PageView, rideId?: string) => void;
  setSearchParams: (params: Partial<SearchParams>) => void;
  setAuthModalOpen: (open: boolean) => void;
  setSafetySheetOpen: (open: boolean) => void;
  dismissNotification: () => void;
  showNotification: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  
  // Actions
  switchUser: (userId: string) => void;
  offerRide: (rideData: Omit<Ride, 'id' | 'riderId' | 'rider' | 'status'>) => Ride;
  requestRide: (rideId: string, pickup: string, dropoff: string, message: string) => RideRequest;
  acceptRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
  cancelRequest: (requestId: string) => void;
  completeRide: (rideId: string) => void;
  sendChatMessage: (rideId: string, text: string) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  updateCurrentUser: (data: Partial<User>) => void;
}

const RideContext = createContext<RideContextType | undefined>(undefined);

export const RideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]); // Alex Rivera
  const [allUsers, setAllUsers] = useState<User[]>(MOCK_USERS);
  const [rides, setRides] = useState<Ride[]>(MOCK_RIDES);
  const [requests, setRequests] = useState<RideRequest[]>(MOCK_REQUESTS);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedRideId, setSelectedRideId] = useState<string | null>('ride-101');
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isSafetySheetOpen, setSafetySheetOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({
    'ride-101': MOCK_CHAT,
  });

  const [searchParams, setSearchParamsState] = useState<SearchParams>({
    pickup: '',
    destination: '',
    date: '2026-09-29',
    time: '',
    helmetOnly: false,
    electricOnly: false,
    genderFilter: 'any',
    sortBy: 'earliest',
  });

  const showNotification = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setNotification({ id, title, message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.id === id ? null : curr));
    }, 4500);
  };

  const dismissNotification = () => setNotification(null);

  const navigateTo = (page: PageView, rideId?: string) => {
    if (rideId) {
      setSelectedRideId(rideId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setSearchParams = (params: Partial<SearchParams>) => {
    setSearchParamsState((prev) => ({ ...prev, ...params }));
  };

  const switchUser = (userId: string) => {
    const found = allUsers.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      showNotification('Account Switched', `Now browsing as ${found.name} (${found.role})`, 'info');
    }
  };

  const updateCurrentUser = (data: Partial<User>) => {
    setCurrentUser((prev) => ({ ...prev, ...data }));
    setAllUsers((prev) => prev.map((u) => (u.id === currentUser.id ? { ...u, ...data } : u)));
    showNotification('Profile Updated', 'Your profile details have been saved.');
  };

  // Filtered rides
  const filteredRides = useMemo(() => {
    return rides.filter((ride) => {
      if (ride.status === 'completed' || ride.status === 'cancelled') return false;

      // Pickup match
      if (searchParams.pickup.trim()) {
        const query = searchParams.pickup.toLowerCase();
        const matchesOrigin = ride.origin.name.toLowerCase().includes(query) || ride.origin.address.toLowerCase().includes(query);
        const matchesWaypoints = ride.waypoints?.some(
          (wp) => wp.name.toLowerCase().includes(query) || wp.address.toLowerCase().includes(query)
        );
        if (!matchesOrigin && !matchesWaypoints) return false;
      }

      // Destination match
      if (searchParams.destination.trim()) {
        const query = searchParams.destination.toLowerCase();
        const matchesDest = ride.destination.name.toLowerCase().includes(query) || ride.destination.address.toLowerCase().includes(query);
        const matchesWaypoints = ride.waypoints?.some(
          (wp) => wp.name.toLowerCase().includes(query) || wp.address.toLowerCase().includes(query)
        );
        if (!matchesDest && !matchesWaypoints) return false;
      }

      // Helmet filter
      if (searchParams.helmetOnly && !ride.bikeDetails.helmetProvided) {
        return false;
      }

      // Electric bike filter
      if (searchParams.electricOnly && !ride.bikeDetails.isElectric) {
        return false;
      }

      // Gender preference filter
      if (searchParams.genderFilter === 'women-only' && ride.genderPreference !== 'women-only') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (searchParams.sortBy === 'price') return a.price - b.price;
      if (searchParams.sortBy === 'rating') return b.rider.rating - a.rider.rating;
      // Default: departure time
      return a.departureTime.localeCompare(b.departureTime);
    });
  }, [rides, searchParams]);

  const selectedRide = useMemo(() => {
    return rides.find((r) => r.id === selectedRideId) || rides[0] || null;
  }, [rides, selectedRideId]);

  // Incoming requests for current user (when acting as rider)
  const incomingRequestsForCurrentRider = useMemo(() => {
    const userRideIds = new Set(rides.filter((r) => r.riderId === currentUser.id).map((r) => r.id));
    return requests.filter((req) => userRideIds.has(req.rideId));
  }, [requests, rides, currentUser.id]);

  // My requests as passenger
  const myRequestsAsPassenger = useMemo(() => {
    return requests.filter((req) => req.passengerId === currentUser.id);
  }, [requests, currentUser.id]);

  const offerRide = (rideData: Omit<Ride, 'id' | 'riderId' | 'rider' | 'status'>): Ride => {
    const newRide: Ride = {
      ...rideData,
      id: `ride-${Date.now()}`,
      riderId: currentUser.id,
      rider: currentUser,
      status: 'scheduled',
    };

    setRides((prev) => [newRide, ...prev]);
    showNotification('Ride Published!', `Your ride to ${rideData.destination.name} is now live and bookable.`);
    navigateTo('details', newRide.id);
    return newRide;
  };

  const requestRide = (rideId: string, pickup: string, dropoff: string, message: string): RideRequest => {
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const newRequest: RideRequest = {
      id: `req-${Date.now()}`,
      rideId,
      passengerId: currentUser.id,
      passenger: currentUser,
      pickupLocation: pickup,
      dropoffLocation: dropoff,
      status: 'pending',
      requestedAt: 'Just now',
      message,
      safetyOtp: randomOtp,
    };

    setRequests((prev) => [newRequest, ...prev]);
    showNotification('Ride Requested!', 'The rider has been notified. You will see status updates in My Rides.');
    return newRequest;
  };

  const acceptRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          return { ...req, status: 'accepted' };
        }
        return req;
      })
    );
    showNotification('Request Accepted', 'The passenger has been notified. Safety OTP will be required upon pickup.');
  };

  const rejectRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          return { ...req, status: 'rejected' };
        }
        return req;
      })
    );
    showNotification('Request Declined', 'The request was politely declined.', 'info');
  };

  const cancelRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          return { ...req, status: 'cancelled' };
        }
        return req;
      })
    );
    showNotification('Request Cancelled', 'Your ride request has been cancelled.', 'warning');
  };

  const completeRide = (rideId: string) => {
    setRides((prev) =>
      prev.map((r) => (r.id === rideId ? { ...r, status: 'completed' } : r))
    );
    setRequests((prev) =>
      prev.map((req) => (req.rideId === rideId ? { ...req, status: 'completed' } : req))
    );
    showNotification('Ride Completed!', 'Thank you for sharing the ride! Leave a review for your co-rider.');
  };

  const sendChatMessage = (rideId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      rideId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => ({
      ...prev,
      [rideId]: [...(prev[rideId] || []), newMsg],
    }));
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };
    setReviews((prev) => [newReview, ...prev]);
    showNotification('Review Submitted', 'Thank you for keeping the RideMate community safe and transparent!');
  };

  return (
    <RideContext.Provider
      value={{
        currentUser,
        allUsers,
        rides,
        requests,
        reviews,
        currentPage,
        selectedRideId,
        selectedRide,
        searchParams,
        filteredRides,
        incomingRequestsForCurrentRider,
        myRequestsAsPassenger,
        chatMessages,
        isAuthModalOpen,
        isSafetySheetOpen,
        notification,
        navigateTo,
        setSearchParams,
        setAuthModalOpen,
        setSafetySheetOpen,
        dismissNotification,
        showNotification,
        switchUser,
        offerRide,
        requestRide,
        acceptRequest,
        rejectRequest,
        cancelRequest,
        completeRide,
        sendChatMessage,
        addReview,
        updateCurrentUser,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export const useRideContext = () => {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error('useRideContext must be used within a RideProvider');
  }
  return context;
};
