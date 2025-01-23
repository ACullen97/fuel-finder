import { View, Text, StyleSheet, Button } from "react-native"
import Accordion from "@/components/Accordion"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import AccordionFacilities from "./AccordionFacilities"
import { Linking } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler"
import axios from "axios"

interface Station {
  priceE5: number
  priceE10: number
  priceB7: number
  priceSDV: number
  rating?: number
  placeId?: string
  openingHours?: string[]
}

export default function StationCard({ station }: { station: Station }) {
  if (!station.priceE5 || station.priceE5 === 0) {
    station.priceE5 = "Unavailable"
  }

  if (!station.priceSDV || station.priceSDV === 0) {
    station.priceSDV = "Unavailable"
  }

  if (Object.keys(station).length === 0) {
    return <Text></Text>
  } else
    return (
      <View>
        <View style={styles.main}>
          <Text style={styles.Title}>{station.name}</Text>
          <Text style={{ color: "#fff", fontSize: 14, top: 5 }}>
            Address:{station.address}
          </Text>
          <Text style={{ color: "#fff", fontSize: 14, top: 10 }}>
            Status:{station.id}
          </Text>
          <Text style={{ color: "#fff", fontSize: 14, top: 10 }}>
            Place ID:{station.placeId}
          </Text>
          <Text style={{ color: "#fff", fontSize: 14, top: 15 }}>
            Overall Rating:
            {station.rating ? station.rating : "No rating available"}
          </Text>
          <Text />
        </View>
        <View>
          {" "}
          <Button
            title="Open in Maps"
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/?q=${station.latitude},${station.longitude}`
              )
            }
          />
          <Text />
          <Button
            title="Navigate"
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`
              )
            }
          />
          <Text />
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
                <Text style={styles.table_data}>{station.priceE10}</Text>
              </View>
            </View>
            <View style={styles.table_body}>
              {/* {Single Row} */}
              <View style={{ width: "50%" }}>
                <Text style={styles.table_data}>Super Unleaded</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.table_data}>{station.priceE5}</Text>
              </View>
            </View>
            <View style={styles.table_body}>
              {/* {Single Row} */}
              <View style={{ width: "50%" }}>
                <Text style={styles.table_data}>Diesel</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.table_data}>
                  {parseFloat(station.priceB7).toFixed(1)}
                </Text>
              </View>
            </View>
            <View style={styles.table_body}>
              {/* {Single Row} */}
              <View style={{ width: "50%" }}>
                <Text style={styles.table_data}>Premium Diesel</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.table_data}>{station.priceSDV}</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text />
          <Accordion
            title="Opening Times"
            details={
              station.openingHours
                ? station.openingHours.join("\n")
                : "No opening hours available"
            }
          ></Accordion>
          {/* <AccordionFacilities
            title="Facilities"
            details={"Hello from Facilities"}
          ></AccordionFacilities> */}
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  Title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
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
})
