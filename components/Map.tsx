import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import MapView, { Marker } from "react-native-maps"
import PetrolStations from "@/assets/data/PetrolStation.json"
import React, { useState, useCallback, useMemo, useRef, useEffect } from "react"
import StationCard from "./StationCard"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { getPricesRadius } from "@/api/fetchFuelPrices"
import { useLocationContext } from "./LocationContext"
import { getCoords, searchGasStations } from "@/api/geocodeApi"
import { getPlaceDetails } from "@/api/fetchPlaceDetails"

export default function Map() {
  const { location } = useLocationContext()
  const [region, setRegion] = useState({
    latitude: 51.5072,
    longitude: 0.1276,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const [selectedStation, setSelectedStation] = useState({})
  const [petrolStations, setPetrolStations] = useState<any[]>([])


  const [loading, setLoading] = useState(true);

  const [selectedFuelType, setSelectedFuelType] = useState<"E10" | "E5" | "B7" | "SDV">("E10");

  const bottomSheetRef = useRef<BottomSheet>(null)
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], [])
  const handleOpenPress = () => bottomSheetRef.current?.collapse()
  const handleClosePress = () => bottomSheetRef.current?.close()

  useEffect(() => {
    const radius = 10

    getPricesRadius(region.latitude, region.longitude, radius)
      .then((stationsFromApi) => {
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
        }))
        setPetrolStations(transformedStations)
        setLoading(false)
      })
      .catch((err) => {
        console.warn("Failed to fetch stations:", err)
      })
  }, [])

  useEffect(() => {
    const radius = 10
    if (location) {
      setRegion((prev) => ({
        ...prev,
        latitude: location.latitude,
        longitude: location.longitude,
      }))
      getPricesRadius(location.latitude, location.longitude, radius)
        .then((stationsFromApi) => {
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
          }))
          setPetrolStations(transformedStations)
          setLoading(false)
        })
        .catch((err) => {
          console.warn("Failed to fetch stations:", err)
        })
    }
  }, [location])

  const handleMarkerPress = async (petrolStation) => {
    try {
      const query = `${petrolStation.name} Petrol Station ${petrolStation.address}`
      console.log(`Query: ${query}`)
      const { placeId } = await getCoords({ address: query })
      console.log(`Place ID: ${placeId}`)
      const placeDetails = await getPlaceDetails(placeId)
      console.log(`Place Details:`, placeDetails)
      setSelectedStation({
        ...petrolStation,
        placeId: placeId,
        rating: placeDetails.rating,
        openingHours: placeDetails.opening_hours?.weekday_text || [],
        openNow: placeDetails.opening_hours?.open_now,
      })
      handleOpenPress()
    } catch (error) {
      console.warn("Failed to fetch place details:", error)
    }
  }, [location]);

  // Handler for the "Search this area" button
  const handleSearchThisArea = useCallback(() => {
    const radius = 10
    getPricesRadius(region.latitude, region.longitude, radius)
      .then((stationsFromApi) => {
        const transformedStations = stationsFromApi.map((station: any) => ({
          id: station.site_id,
          name: station.brand,
          latitude: station.latitude,
          longitude: station.longitude,
          priceE10: (station.E10) *100, 
          priceE5: (station.E5) *100,
          priceB7: (station.B7) *100,
          priceSDV: (station.SDV) *100,
          address: station.address,

        }))
        setPetrolStations(transformedStations)
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to fetch stations:", err)
      });
  }, [region]);

  if (loading) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      <GestureHandlerRootView style={styles.container}>

        <View style={styles.toggleContainer}>
          {(["E10", "E5", "B7", "SDV"] as const).map((fuel) => {
            const isActive = selectedFuelType === fuel;
            return (
              <TouchableOpacity
                key={fuel}
                onPress={() => setSelectedFuelType(fuel)}
                style={[
                  styles.toggleButton,
                  isActive && styles.activeToggleButton
                ]}
              >
                <Text style={styles.toggleButtonText}>{fuel}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <MapView
          onPress={handleClosePress}
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => {
            setRegion(newRegion);
          }}
        >
          {petrolStations.map((petrolStation) => {
             const markerPrice = petrolStation[`price${selectedFuelType}`];
             return(
            
            <Marker
              onPress={() => handleMarkerPress(petrolStation)}
              key={petrolStation.id}
              coordinate={{
                latitude: petrolStation.latitude,
                longitude: petrolStation.longitude,
              }}
              title={petrolStation.name}
            >
              <View
                style={{
                  backgroundColor: "#1E998D",
                  padding: 5,
                  paddingHorizontal: 3,
                  borderWidth: 1,
                  borderColor: "#C7F5F2",
                  borderRadius: 20,
                }}
              >
                <Text style={styles.whiteText}>
                {parseFloat(markerPrice).toFixed(1)}
                </Text>

              </View>
            </Marker>
          )})}
        </MapView>

        {/* Button to search in current map region */}
      <View style={styles.searchAreaContainer}>
        <TouchableOpacity style={styles.searchAreaButton} onPress={handleSearchThisArea}>
          <Text style={styles.searchAreaButtonText}>Search this area</Text>
        </TouchableOpacity>
      </View>
      
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: "#005051" }}
          handleIndicatorStyle={{ backgroundColor: "#C7F5F2" }}
        >
          <BottomSheetView style={styles.contentContainer}>
            <StationCard station={selectedStation} />
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  whiteText: {
    color: "white",
  },
  toggleContainer: {
    position: "absolute",
    top: 40,    // Adjust as needed
    left: 10,   // Adjust as needed
    flexDirection: "row",
    zIndex: 999,
  },
  toggleButton: {
    backgroundColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 5,
  },
  activeToggleButton: {
    backgroundColor: "#1E998D",
  },
  toggleButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },

  searchAreaContainer: {
    position: "absolute",
    bottom: 100, // Adjust as needed to sit above your bottom sheet or other controls
    left: 0,
    right: 0,
    alignItems: "center",
  },
  searchAreaButton: {
    backgroundColor: "#1E998D",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  searchAreaButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

