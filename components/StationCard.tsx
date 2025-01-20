import { View, Text, StyleSheet, Button } from "react-native";
import Accordion from "@/components/Accordion";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import AccordionFacilities from "./AccordionFacilities";
import { Linking } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

interface Station {
  priceE5: number;
  priceE10: number;
  priceB7: number;
  priceSDV: number;
}

export default function StationCard({ station }: { station: Station }) {

  const formatPrice = (price: number | undefined) => {
    if (!price && price === 0) return "Unavailable";
    return parseFloat(price);
  };

  station.priceE5 = formatPrice(station.priceE5);
  station.priceE10 = formatPrice(station.priceE10);
  station.priceB7 = formatPrice(station.priceB7);
  station.priceSDV = formatPrice(station.priceSDV);


  if (Object.keys(station).length === 0) {
    return <Text></Text>;
  } else
    return (
      <View>
        <View style={styles.main}>
          <Text style={styles.Title}>{station.name}</Text>
          <Text style={{ color: "#fff", fontSize: 14, top: 5 }}>
            Address:{station.address}
          </Text>
          <Text style={{ color: "#fff", fontSize: 14, top: 10 }}>
            Status:{" "}
          </Text>
          <Text style={{ color: "#fff", fontSize: 14, top: 15 }}>
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
                <Text style={styles.table_data}>{station.priceB7}</Text>
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
