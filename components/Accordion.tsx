import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { ListItem } from "@rneui/themed";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function Accordion({
  title,
  details,
}: {
  title: string;
  details: string;
}) {
  const [opened, setOpened] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const heightAnimationInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 180],
  });

  function toggleAccordion() {
    if (!opened) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
    setOpened(!opened);
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleAccordion}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <AntDesign
            style={{ color: "white" }}
            name={opened ? "caretright" : "caretdown"}
            size={16}
          />
        </View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={[styles.content, { height: heightAnimationInterpolation }]}
      >         <View style={styles.wrapper}>
                  {/* {Table Container} */}
                  <View style={styles.table}>
                    {/* {Table Head} */}
                    <View style={styles.table_head}>
                      {/* {Single Row} */}
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_caption}>Day</Text>
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_caption}>Time</Text>
                      </View>
                    </View>
                    {/* {Table Body} */}
                    <View style={styles.table_body}>
                      {/* {Single Row} */}
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_data}>Monday</Text>
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_data}>24 hours</Text>
                      </View>
                    </View>
                    <View style={styles.table_body}>
                      {/* {Single Row} */}
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_data}>Tuesday</Text>
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_data}>24 hours</Text>
                      </View>
                    </View>
                    <View style={styles.table_body}>
                      {/* {Single Row} */}
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_data}>Wednesday</Text>
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_data}>24 hours</Text>
                      </View>
                    </View>
                    <View style={styles.table_body}>
                      {/* {Single Row} */}
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_data}>Thursday</Text>
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_data}>24 hours</Text>
                      </View>
                    </View>
                    <View style={styles.table_body}>
                      {/* {Single Row} */}
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_data}>Friday</Text>
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_data}>24 hours</Text>
                      </View>
                    </View>
                    <View style={styles.table_body}>
                      {/* {Single Row} */}
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_data}>Saturday</Text>
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_data}>24 hours</Text>
                      </View>
                    </View>
                    <View style={styles.table_body}>
                      {/* {Single Row} */}
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_data}>Sunday</Text>
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text style={styles.table_data}>24 hours</Text>
                      </View>
                    </View>
                  </View>
                </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    margin: 10,
    padding: 15,
    backgroundColor: "#1E998D",
    borderRadius: 10,
  },
  content: {
    marginTop: 8,
  },
  details: {
    opacity: 0.65,
    color: "white",
  },
  title: {
    fontWeight: "bold",
    color: "white",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
 
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
  },
  table_body: {
    flexDirection: "row",
  },
  table_data: {
    color: "#fff",
    padding: 3
  },
});
