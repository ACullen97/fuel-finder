import React from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"
import LocationSearch from "./autocompleteSearchBar"

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.inputContainer}>
        <LocationSearch />
        {/* <TextInput style={styles.input} placeholder="Search..." /> */}
        {/* <Button title="Go" onPress={() => {}} /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 180,
    backgroundColor: "#005051",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  headerText: {
    color: "#C7F5F2",
    fontSize: 20,
    paddingBottom:10,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "#cC7F5cF2",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color: "#21130d",
    backgroundColor: "#fff",
    flex: 1,
    zIndex: 100,
  },
})

export default Header
