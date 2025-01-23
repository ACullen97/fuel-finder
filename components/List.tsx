// screens/Explore/ListViewScreen.tsx

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import Header from "./Header";
import { getPricesRadius } from "../api/fetchFuelPrices"; // adjust path
import { useLocationContext } from "./LocationContext"; // adjust path

interface PetrolStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  priceE10: number;
  priceE5: number;
  priceB7: number;
  priceSDV: number;
}

// Possible sort options
type SortOption = "E5" | "E10" | "B7" | "SDV";

const ListViewScreen: React.FC = () => {
  const { location } = useLocationContext();

  const [petrolStations, setPetrolStations] = useState<PetrolStation[]>([]);
  const [loading, setLoading] = useState(false);

  // Sort and radius state
  const [sortOption, setSortOption] = useState<SortOption>("E10");
  const [radius, setRadius] = useState<number>(10); // Default radius

  // Fetch stations from API
  const fetchStations = useCallback(async () => {
    if (!location) return;

    try {
      setLoading(true);

      // Use the selected radius
      const stationsFromApi = await getPricesRadius(
        location.latitude,
        location.longitude,
        radius
      );

      const transformedStations = stationsFromApi.map((station: any) => ({
        id: station.site_id,
        name: station.brand,
        latitude: station.latitude,
        longitude: station.longitude,
        priceE10: station.E10 * 100,
        priceE5: station.E5 * 100,
        priceB7: station.B7 * 100,
        priceSDV: station.SDV * 100,
        address: station.address,
      }));

      setPetrolStations(transformedStations);
    } catch (error) {
      console.warn("Error fetching station data:", error);
    } finally {
      setLoading(false);
    }
  }, [location, radius]);

  // Fetch stations whenever location or radius changes
  useEffect(() => {
    if (location) {
      fetchStations();
    }
  }, [location, radius, fetchStations]);

  // Compute sorted stations based on sortOption
  const sortedStations = useMemo(() => {
    const stationsCopy = [...petrolStations];

    switch (sortOption) {
      case "E5":
        return stationsCopy.sort((a, b) => a.priceE5 - b.priceE5);
      case "B7":
        return stationsCopy.sort((a, b) => a.priceB7 - b.priceB7);
      case "SDV":
        return stationsCopy.sort((a, b) => a.priceSDV - b.priceSDV);
      case "E10":
      default:
        return stationsCopy.sort((a, b) => a.priceE10 - b.priceE10);
    }
  }, [petrolStations, sortOption]);

  // No location => "Use the search bar" message
  if (!location) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Use the search bar to find a location</Text>
      </View>
    );
  }

  // Loading => show spinner
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#005051" />
        <Text style={styles.loadingText}>Loading stations...</Text>
      </View>
    );
  }

  // Render a single station
  const renderStationItem = ({ item }: { item: PetrolStation }) => (
    <TouchableOpacity style={styles.stationCard}>
      <Text style={styles.stationName}>{item.name}</Text>
      <Text style={styles.address}>{item.address}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>E10: </Text>
        <Text style={styles.priceValue}>{item.priceE10.toFixed(1)}</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>E5: </Text>
        <Text style={styles.priceValue}>{item.priceE5.toFixed(1)}</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>B7: </Text>
        <Text style={styles.priceValue}>{item.priceB7.toFixed(1)}</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>SDV: </Text>
        <Text style={styles.priceValue}>{item.priceSDV.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Sort by section */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortTitle}>Sort by:</Text>

        <TouchableOpacity
          style={[styles.sortButton, sortOption === "E10" && styles.sortButtonActive]}
          onPress={() => setSortOption("E10")}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortOption === "E10" && styles.sortButtonTextActive,
            ]}
          >
            E10
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sortButton, sortOption === "E5" && styles.sortButtonActive]}
          onPress={() => setSortOption("E5")}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortOption === "E5" && styles.sortButtonTextActive,
            ]}
          >
            E5
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sortButton, sortOption === "B7" && styles.sortButtonActive]}
          onPress={() => setSortOption("B7")}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortOption === "B7" && styles.sortButtonTextActive,
            ]}
          >
            B7
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sortButton, sortOption === "SDV" && styles.sortButtonActive]}
          onPress={() => setSortOption("SDV")}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortOption === "SDV" && styles.sortButtonTextActive,
            ]}
          >
            SDV
          </Text>
        </TouchableOpacity>
      </View>

      {/* Radius selection section */}
      <View style={styles.radiusContainer}>
        <Text style={styles.radiusTitle}>Radius:</Text>

        {/* Example radius values */}
        {[5, 10, 20].map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.radiusButton, radius === r && styles.radiusButtonActive]}
            onPress={() => setRadius(r)}
          >
            <Text
              style={[
                styles.radiusButtonText,
                radius === r && styles.radiusButtonTextActive,
              ]}
            >
              {r} km
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={sortedStations}
        keyExtractor={(item) => item.id}
        renderItem={renderStationItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default ListViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  listContent: {
    padding: 16,
  },

  // --- Sort Section ---
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  sortTitle: {
    fontWeight: "bold",
    marginRight: 8,
    fontSize: 16,
  },
  sortButton: {
    marginHorizontal: 4,
    padding: 6,
    borderRadius: 4,
    backgroundColor: "#eee",
  },
  sortButtonActive: {
    backgroundColor: "#005051",
  },
  sortButtonText: {
    fontSize: 14,
    color: "#555",
  },
  sortButtonTextActive: {
    color: "#ffffff",
    fontWeight: "600",
  },

  // --- Radius Section ---
  radiusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  radiusTitle: {
    fontWeight: "bold",
    marginRight: 8,
    fontSize: 16,
  },
  radiusButton: {
    marginHorizontal: 4,
    padding: 6,
    borderRadius: 4,
    backgroundColor: "#eee",
  },
  radiusButtonActive: {
    backgroundColor: "#005051",
  },
  radiusButtonText: {
    fontSize: 14,
    color: "#555",
  },
  radiusButtonTextActive: {
    color: "#ffffff",
    fontWeight: "600",
  },

  // --- Station Card ---
  stationCard: {
    backgroundColor: "#fff",
    padding: 14,
    marginVertical: 8,
    borderRadius: 8,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    // Android elevation
    elevation: 2,
  },
  stationName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#005051",
  },
  address: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
  priceRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  priceLabel: {
    fontWeight: "600",
    color: "#444",
    marginRight: 5,
  },
  priceValue: {
    color: "#222",
  },
});