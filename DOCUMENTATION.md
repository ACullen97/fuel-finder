# Fuel Finder Documentation

## Core Concepts

### **LocationContext**
- **Purpose**: 
  - Manages the user's location as global state.
  - Ensures that components across the app can access and update the user's location seamlessly.
- **How It Works**:
  - `LocationProvider`: Wraps the app, providing location (`latitude` and `longitude`) to all child components.
  - `useLocationContext`: A custom hook that allows easy consumption of the location context by components.

### **LocationSearch**
- **Purpose**: 
  - Enables users to search for locations, get autocomplete suggestions, and fetch coordinates for selected locations.
- **Key Features**:
  - Fetches location suggestions using the Google Places API.
  - Updates the global location state via `LocationContext`.
  - Provides a fallback to retrieve the user's current location with permissions using `expo-location`.

---

## Workflow Overview

1. **Search or Fetch Location**:
   - The user types a location into the `LocationSearch` component or allows geolocation permissions.
   - Autocomplete suggestions are fetched using the Google Places API.

2. **Update Location State**:
   - When a location is selected or the user enables geolocation, the app updates the global state (`LocationContext`) with the latitude and longitude.

3. **Fetch Nearby Fuel Stations**:
   - The app calls the `fetchFuelPrices.tsx` backend API with the user's location and a specified radius to retrieve nearby fuel station data.

4. **Display on Map**:
   - The `Map` component renders a map centered on the user's location, displaying markers for nearby fuel stations.

---

## Critical Files

### **fetchFuelPrices.tsx**
- **Purpose**: Communicates with the backend to fetch nearby fuel stations.
- **Function**:
  - `getPricesRadius(lat, long, radius)`: Takes latitude, longitude, and radius as parameters to return fuel station data.
- **Usage**:
  ```javascript
  getPricesRadius(52.63, -1.13, 5).then(stations => console.log(stations));


