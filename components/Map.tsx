import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import PetrolStations from "@/assets/data/PetrolStation.json";
import React, { useState, useCallback, useMemo, useRef } from "react";
import StationCard from "./StationCard";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function Map() {

    const [selectedStation, setSelectedStation] = useState({});
    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
      }, []);

      const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

      const handleOpenPress = () => bottomSheetRef.current?.collapse();
      const handleClosePress = () => bottomSheetRef.current?.close();

  return (
    <>
   <GestureHandlerRootView style={styles.container}>
      <MapView
      onPress={() => handleClosePress()}
        style={styles.map}
        initialRegion={{
          latitude: 51.5072,
          longitude: 0.1276,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/*TODO: FIX MERKERS GETTING CUT OFF */}
        {PetrolStations.map((petrolStation) => (
          <Marker
            onPress={() => {setSelectedStation(petrolStation);
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
              <Text style={styles.whiteText}>{petrolStation.price}p</Text>
            </View>
          </Marker>
        ))}
      </MapView>
<BottomSheet
  ref={bottomSheetRef}
  onChange={handleSheetChanges}
  snapPoints={snapPoints}
  enablePanDownToClose={true}
  backgroundStyle={ {backgroundColor: '#48AAAD' }}
  handleIndicatorStyle={{backgroundColor: '#fff'}}
>
  <BottomSheetView style={styles.contentContainer}>
    <Text style={{color: '#fff'}}>Awesome 🎉</Text>
    <StationCard station={selectedStation}/>
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
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});


  
