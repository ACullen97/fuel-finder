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

export default function AccordionFacilities({
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
    outputRange: [0, 100],
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
      >
        <Text style={styles.details}>{details}</Text>
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
});
