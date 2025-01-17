import { View, Text, StyleSheet, Button } from "react-native";
import Accordion from "@/components/Accordion";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import AccordionFacilities from "./AccordionFacilities";
import { Linking } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

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
        <View style={styles.main}>
          <Text style={styles.Title}>{station.name}</Text>
          <Text style={{ color: "#fff", fontSize: 14, top: -15 }}>
            Address:{" "}
          </Text>
          <Text style={{ color: "#fff", fontSize: 14, top: -10 }}>
            Status:{" "}
          </Text>
          <Text style={{ color: "#fff", fontSize: 14, top: -5 }}>
            Overall Rating:{" "}
          </Text>
          <Text />
        </View>
        <View>
          {" "}
          <Button

            title="Open in Maps"
            onPress={() => Linking.openURL(`https://www.google.com/maps/?q=${station.latitude},${station.longitude}`)}
            
          />
          <Text/>
          <Button
            title="Navigate"
            onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`)}
          />
          <Text/>
        </View>
        <View style={styles.wrapper}>
          {/* {Table Container} */}
          <View style={styles.table}>
            {/* {Table Head} */}
            <View style={styles.table_head}>
              {/* {Single Row} */}
              <View style={{ width: "50%" }}>
                <Text style={styles.table_caption}>Fuel Type</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.table_caption}>Price</Text>
              </View>
            </View>
            {/* {Table Body} */}
            <View style={styles.table_body}>
              {/* {Single Row} */}
              <View style={{ width: "50%" }}>
                <Text style={styles.table_data}>Unleaded</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.table_data}>131.9</Text>
              </View>
            </View>
            <View style={styles.table_body}>
              {/* {Single Row} */}
              <View style={{ width: "50%" }}>
                <Text style={styles.table_data}>Super Unleaded</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.table_data}>145.3</Text>
              </View>
            </View>
            <View style={styles.table_body}>
              {/* {Single Row} */}
              <View style={{ width: "50%" }}>
                <Text style={styles.table_data}>Diesel</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.table_data}>145.9</Text>
              </View>
            </View>
            <View style={styles.table_body}>
              {/* {Single Row} */}
              <View style={{ width: "50%" }}>
                <Text style={styles.table_data}>Premium Diesel</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.table_data}>155.5</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text />
          <Accordion
            title="Opening Times"
            details={"Hello from Opening Times"}
          ></Accordion>
          <AccordionFacilities
            title="Facilities"
            details={"Hello from Facilities"}
          ></AccordionFacilities>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  Title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    top: -25,
  },
  main: {},

  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E998D",
    borderRadius: 10,
    padding: 0,
  },
  table: {
    margin: 15,
  },
  table_head: {
    flexDirection: "row",
  },
  table_caption: {
    color: "#fff",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  table_body: {
    flexDirection: "row",
  },
  table_data: {
    color: "#fff",
    padding: 3,
    paddingLeft: 5,
  },
});
