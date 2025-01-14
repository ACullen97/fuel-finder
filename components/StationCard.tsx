import { View, Text, StyleSheet } from "react-native";
import Accordion from "@/components/Accordion";

export default function StationCard({ station }: { station: object }) {
  console.log(station);
  const petrolStations = [
    {
      id: 1,
      name: "Shell Downtown",
      location: "123 Main St, Downtown",
      prices: {
        petrol: "$3.50",
        diesel: "$3.60",
        premium: "$3.85",
      },
    },
    {
      id: 2,
      name: "Chevron Uptown",
      location: "456 Elm St, Uptown",
      prices: {
        petrol: "$3.45",
        diesel: "$3.55",
        premium: "$3.80",
      },
    },
    {
      id: 3,
      name: "BP Suburbs",
      location: "789 Oak St, Suburbs",
      prices: {
        petrol: "$3.60",
        diesel: "$3.70",
        premium: "$3.95",
      },
    },
    {
      id: 4,
      name: "Exxon Highway",
      location: "101 Highway Rd, Outskirts",
      prices: {
        petrol: "$3.55",
        diesel: "$3.65",
        premium: "$3.90",
      },
    },
    {
      id: 5,
      name: "Mobil Central",
      location: "202 Center St, Central City",
      prices: {
        petrol: "$3.52",
        diesel: "$3.62",
        premium: "$3.87",
      },
    },
  ];

  if (Object.keys(station).length === 0) {
    return <Text></Text>;
  } else
    return (
      <View>
        <Text style={styles.Title}>{station.name}</Text>
        <Text style={{ color: "#fff", right: 70, fontSize: 14, top: -15 }}>
          Address:{" "}
        </Text>
        <Text style={{ color: "#fff", right: 70, fontSize: 14, top: -10 }}>
          Status:{" "}
        </Text>
        <Text style={{ color: "#fff", right: 70, fontSize: 14, top: -5 }}>
          Overall Rating:{" "}
        </Text>

        {petrolStations.map((petrolStation, index) => (
          <Accordion
            key={index.toString()}
            title="Prices"
            details={petrolStation.prices.diesel}
          />
        ))}
      </View>
    );
}

const styles = StyleSheet.create({
  Title: {
    color: "#fff",
    right: 70,
    fontSize: 20,
    fontWeight: "bold",
    top: -25,
  },
});
