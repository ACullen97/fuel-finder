
import { Image, View, StyleSheet, Platform } from "react-native"
import Map from "@/components/Map"
import Header from "../../components/Header"


export default function HomeScreen() {
  return (
      <View style={styles.container}>
        <Header title="" />
        <Map />
      </View>
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
