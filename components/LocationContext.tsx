import React, { createContext, useState, useContext, ReactNode } from "react";

type Location = {
  latitude: number;
  longitude: number;
} | null;

type LocationContextValue = {
  location: Location;
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
};

const LocationContext = createContext<LocationContextValue | undefined>(
  undefined
);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

// Custom hook to consume LocationContext
export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider"
    );
  }
  return context;
}