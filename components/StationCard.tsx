import { View, Text, StyleSheet } from "react-native";

export default function StationCard({ station }) {
  console.log(station);

  if (Object.keys(station).length === 0) {
    return (<Text></Text>);
  } else
    return (
      <View style={styles.card}>
        <Text>{station.name}</Text>
        <Text>{station.price}p</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 50,
    left: 10,
    right: 10,
  },
});
