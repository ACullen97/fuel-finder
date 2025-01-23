import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native"
import { ListItem } from "@rneui/themed"
import React, { useState } from "react"
import { AntDesign } from "@expo/vector-icons"

const Accordion = ({ title, details }) => {
  const [expanded, setExpanded] = useState(false)
  const [animation] = useState(new Animated.Value(0))
  const [contentHeight, setContentHeight] = useState(0)

  const toggleAccordion = () => {
    const initialValue = expanded ? 1 : 0
    const finalValue = expanded ? 0 : 1

    setExpanded(!expanded)
    Animated.timing(animation, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  const setMaxHeight = (event) => {
    if (contentHeight === 0) {
      setContentHeight(event.nativeEvent.layout.height)
    }
  }

  const heightAnimationInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Adjust this value based on your content height
  })

  return (
    <View>
      <TouchableWithoutFeedback onPress={toggleAccordion}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={[styles.content, { height: heightAnimationInterpolation }]}
      >
        <View onLayout={setMaxHeight} style={styles.wrapper}>
          <View style={styles.table}>
            <View style={styles.table_head}>
              <View style={{ width: "100%" }}>
                <Text style={styles.table_caption}>Opening Times</Text>
              </View>
            </View>
            <View style={styles.table_body}>
              <View style={{ width: "100%" }}>
                <Text style={styles.table_data}>{details}</Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1E998D",
    padding: 10,
    borderRadius: 5,
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    overflow: "hidden",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E998D",
    borderRadius: 10,
    padding: 10,
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

export default Accordion
