
import { Image, View, StyleSheet, Platform } from "react-native"
import { LocationProvider } from "../../components/LocationContext"; // your file path here
import List from "@/components/List"
import Header from "../../components/Header"


export default function exloreScreen() {
  return (
    <LocationProvider>
      <View style={styles.container}>
        <Header title="List of Stations" />
        <List />
      </View>
    </LocationProvider>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
})
