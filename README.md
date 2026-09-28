# RideMate 🏍️ — Two-Wheeler Ride-Sharing Platform

> **Two Wheels, One Route. Share the Ride.**
> A modern, responsive web application connecting motorcycle and scooter owners with daily commuters traveling along the same urban corridors. Share your pillion seat, bypass traffic jams, split fuel costs fairly, and commute with verified co-riders.

---

## 🌟 Overview

Urban traffic congestion wastes hours each day, while rideshare cabs are expensive and public transit is often overcrowded. Meanwhile, millions of bike owners commute with an empty pillion (passenger) seat every single day.

**RideMate** solves this by creating a peer-to-peer bike ride-sharing network:
1. **Bike Owners (Riders)**: Offer their empty pillion seat on their regular commute routes, offset fuel expenses, and reduce urban carbon footprints.
2. **Passengers (Pillion Commuters)**: Discover verified riders heading in their direction, reach destinations up to 45% faster through traffic, and pay a fraction of taxi fares.

---

## ✨ Key Features

### 1. 🔍 Find a Ride
* **Corridor & Location Search**: Search by pickup spot, destination, date, and preferred departure time.
* **Corridor Autocomplete**: Pre-loaded with popular commuter hubs (e.g., *Metro Center Hub*, *Silicon Innovation Tech Park*, *University Campus*).
* **Smart Filters**:
  * Sanitized spare helmet provided by rider
  * Electric Vehicle (EV) / Eco-scooter rides
  * Women-only preference filter
  * Sort by *Earliest Departure*, *Lowest Fuel Split*, or *Highest Rated Rider*.

### 2. 🏍️ Offer a Ride
* **3-Step Listing Flow**:
  1. Route & Timings: Starting point, destination, corridor waypoints, date, and departure time.
  2. Bike & Pillion Capacity: Automatic 1 pillion seat safety lock, bike model, license plate number, and spare helmet confirmation.
  3. Fair Cost Contribution: Distance-based suggested fuel rate calculator ($3.00 – $5.00) and custom passenger trip notes.

### 3. 🗺️ Interactive Live Route Map
* Custom-built animated SVG canvas representing urban street grids and express transit corridors.
* **Interactive Waypoints**: Inspect intermediate boarding hubs along the route.
* **Live Commute Simulation**: Click **"Simulate"** to watch the animated bike marker travel smoothly along the route with real-time speed and progress telemetry.

### 4. 🤝 Ride Request & Accept/Reject System
* **Dual-Sided Marketplace Experience**:
  * **Rider Inbox**: Bike owners receive requests showing passenger profiles, ratings, pickup spots, and one-click **Accept** or **Decline** controls.
  * **Passenger Bookings**: Passengers track live request status (*Pending*, *Confirmed & Active*, *Completed*).
* **4-Digit Safety OTP**: Upon acceptance, passengers receive a unique one-time code to provide verbally to the rider before boarding.

### 5. 💬 In-App Co-Rider Chat
* Lightweight coordination messenger for riders and passengers to agree on curbside pickup spots and timing without exposing personal phone numbers.

### 6. 🛡️ Two-Wheeler Community Safety Standards
* **Mandatory Helmet Protocol**: ISI/DOT certified sanitized helmet required for every passenger.
* **Verified Badges**: Government ID, motorcycle driving license, and campus/corporate email verification.
* **One-Tap Emergency SOS Simulation**: Dispatches live coordinates and trip telemetry to designated emergency contacts.
* **Pillion Riding Etiquette Guide**: Practical balance tips for comfortable and safe two-wheeler journeys.

### 7. 👤 User Profiles & Bike Garage
* View commute records as both rider and pillion passenger.
* **Registered Bike Garage**: View vehicle specifications, license plate, and photo.
* **Ratings & Reviews**: Transparent community reviews with compliment tags (*Smooth Riding*, *Clean Helmet Provided*, *Punctual Arrival*).
* **Simulate Review Submission**: Test community feedback interactions directly in the app.

---

## 👥 Demo Personas (Instant Switching)

Switch between pre-configured user personas in the top navigation bar to test all sides of the application:

| Persona | Role | Details | Vehicle |
| :--- | :--- | :--- | :--- |
| **Adarsh Sharma** | Rider / Passenger | Senior UX Designer @ FinTech Hub | Yamaha MT-15 V2 (`KA-03-MR-9214`) |
| **Sneha Kulkarni** | Rider / Passenger | M.Tech Research Scholar @ University | Ather 450X Apex EV (`KA-01-EV-5011`) |
| **Vikram Malhotra** | Rider | Audio Producer @ Creative Arts Quarter | Royal Enfield Hunter 350 (`DL-01-HN-2208`) |
| **Pooja Iyer** | Passenger | Biotech Research Associate | Commuter Pillion Member |
| **Arjun Nair** | Rider / Passenger | Urban Planner @ City Infrastructure | Honda CB350 H’ness (`KA-05-CB-9088`) |

---

## 🛠️ Tech Stack

* **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Motion & Animations**: [Motion](https://motion.dev/)
* **Fonts**: Outfit (headings) & Plus Jakarta Sans (body)

---

## 📁 Project Architecture

```
ridemate/
├── index.html                  # HTML entry point with typography & meta tags
├── metadata.json               # Application metadata & capabilities
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── src/
│   ├── main.tsx                # Application root mount
│   ├── App.tsx                 # Core router, layout, and global modals
│   ├── index.css               # Tailwind CSS v4 styling & typography layers
│   ├── types/
│   │   └── index.ts            # Type definitions (User, Ride, Request, Review, etc.)
│   ├── data/
│   │   └── mockData.ts         # Pre-loaded riders, routes, reviews, and images
│   ├── context/
│   │   └── RideContext.tsx     # Centralized React state store & marketplace logic
│   ├── components/
│   │   ├── Navbar.tsx          # 3-Zone top navigation with persona switcher
│   │   ├── MobileNav.tsx       # Thumb-friendly bottom tab bar for mobile viewports
│   │   ├── RouteMap.tsx        # Interactive animated SVG route canvas
│   │   ├── AuthModal.tsx       # Sign In & Sign Up authentication UI
│   │   ├── SafetySheet.tsx     # Safety standards & Emergency SOS modal
│   │   └── ChatModal.tsx       # In-app pickup coordination chat
│   └── pages/
│       ├── HomePage.tsx        # Hero section, quick search, and impact metrics
│       ├── FindRidePage.tsx    # Detailed ride discovery and filters
│       ├── RideResultsPage.tsx # Filtered matching rides with sorting
│       ├── OfferRidePage.tsx   # 3-step listing flow for bike owners
│       ├── RideDetailsPage.tsx # Route map, vehicle specs, and booking card
│       ├── RideRequestsPage.tsx# Accept/Reject inbox & passenger bookings
│       └── ProfilePage.tsx     # User credentials, bike garage & reviews
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18 or higher recommended)
* `npm` or `yarn`

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ridemate.git
   cd ridemate
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or the port specified in terminal) in your browser.

4. **Lint and Type Check**:
   ```bash
   npm run lint
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📱 Mobile-First Responsive Design

* Built with touch-friendly targets ($\ge 44\text{px}$) and thumb-zone ergonomics.
* Fixed bottom navigation tab bar on smartphones for one-handed operation.
* Responsive desktop viewports featuring side-by-side maps, detailed route breakdowns, and split action panes.

---

## 📄 License

This project is licensed under the Apache-2.0 License. See the `LICENSE` file for details.
