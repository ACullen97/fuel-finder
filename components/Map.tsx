import { View, Text, StyleSheet } from "react-native"
import MapView, { Marker } from "react-native-maps"
import PetrolStations from "@/assets/data/PetrolStation.json"
import React, { useState, useCallback, useMemo, useRef, useEffect } from "react"
import StationCard from "./StationCard"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { getPricesRadius } from "@/api/fetchFuelPrices"

export default function Map() {
  const [selectedStation, setSelectedStation] = useState({})
  const [petrolStations, setPetrolStations] = useState<any[]>([])

  const [loading, setLoading] = useState(true);
  const bottomSheetRef = useRef<BottomSheet>(null)
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);


  const snapPoints = useMemo(() => ["25%", "50%", "90%"], [])
  const handleOpenPress = () => bottomSheetRef.current?.collapse()
  const handleClosePress = () => bottomSheetRef.current?.close()

  const initialRegion = {
    latitude: 51.5072,
    longitude: 0.1276,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  useEffect(() => {
    const radius = 10

    getPricesRadius(initialRegion.latitude, initialRegion.longitude, radius)
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
      })
  }, [])

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <MapView
          onPress={handleClosePress}
          style={styles.map}
          initialRegion={initialRegion}
        >
          {petrolStations.map((petrolStation) => (
            <Marker
              onPress={() => {
                setSelectedStation(petrolStation);
                handleOpenPress();
              }}
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
                  {petrolStation.priceE10}
                </Text>
              </View>
            </Marker>
          ))}
        </MapView>
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={snapPoints}
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
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  whiteText: {
    color: "white",
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
});
