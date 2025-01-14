

import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import PetrolStations from "@/assets/data/PetrolStation.json";
import React, { useState, useCallback, useMemo, useRef } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function TabTwoScreen() {

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
    }, []);

    const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

    const handleOpenPress = () => bottomSheetRef.current?.expand();


  return (
  
    <GestureHandlerRootView style={styles.container}>
<BottomSheet
  ref={bottomSheetRef}
  onChange={handleSheetChanges}
  snapPoints={snapPoints}
>
  <BottomSheetView style={styles.contentContainer}>
    <Text>Awesome 🎉</Text>
  </BottomSheetView>
</BottomSheet>
</GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
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
