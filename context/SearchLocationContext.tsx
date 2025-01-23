import { createContext, useState, useEffect } from "react"
import {
  Image,
  StyleSheet,
  Platform,
  TextInput,
  Button,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native"
import "react-native-get-random-values"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import { getCoords } from "../api/geocodeApi"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import * as Location from "expo-location" //for the users location and permission
import { validateLocation } from "../utils/locationValidation" //validates the typed location
import { checkConnection } from "../utils/networkValidation" //validates user network
import debounce from "lodash/debounce"
import axios from "axios"

export const SearchBarContext = createContext(undefined)

export const SearchBarProvider = ({ children }) => {
  const [typedLocation, setTypedLocation] = useState("") //location that the user types in
  const [response, setResponse] = useState<any>(null) //fir the api response
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject | null>(null) //must location object
  const [latitude, setLatitude] = useState<number>()
  const [longitude, setLongitude] = useState<number>()
  const [placeId, setPlaceId] = useState<any>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])

  //sends users typed location and triggers getCoords, which gets the coordinates from google api
  const sendToApi = async (query) => {
    let params
    // const isConnected = await checkConnection()

    // if (!isConnected) {
    //   alert("No internet connection. Check your connection and try again")
    //   return
    // }

    if (typeof query === "string") {
      const error = validateLocation(query)
      if (error) {
        console.error(error)
        return
      }
      params = { address: query } //for the location typed by the user
    } else if (query.place_id) {
      params = { place_id: query.place_id } //for the location selected from teh suggestions
    } else {
      throw new Error("Invalid query: Must be a string or object")
    }

    try {
      const result = await getCoords(params)
      setResponse(result)
      console.log("Coordinates in sendToApi:", result)
      setTypedLocation("")
      return result
    } catch (error) {
      console.error("Error fetching coordinates:", error)
    }
  }

  //gets the users current location
  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      alert("permission to access location was denied")
      return
    }

    let currentLocation = await Location.getCurrentPositionAsync({})
    setCurrentLocation(currentLocation)
    let lat = currentLocation.coords.latitude
    let long = currentLocation.coords.longitude
    setLatitude(lat)
    setLongitude(long)
    console.log(
      "Location: " +
        JSON.stringify(currentLocation) +
        " Latitude: " +
        currentLocation.coords.latitude +
        "Longitude: " +
        currentLocation.coords.longitude
    )
  }
  //The code below will get the users current location automatically when component is loaded
  // if we want to use it we can just uncomment this code(don't need to add anything else as it works!)

  // useEffect(() => {
  //  getLocationPermission()
  // },[]);

  //gets the suggestions from google api
  const fetchSuggestions = async (input: any) => {
    console.log(input, "<<<input in fetch suggestions") //debug******

    if (!input.trim()) {
      console.log("empty input") //debug*****
      setSuggestions([])
      return
    }

    const apiKey = "AIzaSyBU7GTmJQR1xJO4fbz08ew1AJ1HBa1brG4" //will need to go in a .env
    const proxy = "https://cors-anywhere.herokuapp.com/" //temp proxy for CORS errors
    const endpoint = `${proxy}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&components=country:GB&key=${apiKey}` //this endpoint is correct
    //const endpoint = `http://localhost:3001/api/autocomplete?input=${input}`;  ---This should work when running a server but there is a problem

    //retrieves the predicted locations and the maps them
    //and stores them in the state variable(setSuggestions)
    try {
      const response = await axios.get(endpoint)
      const predictions = response.data.predictions

      if (response.data.status === "OK") {
        console.log(
          "Results inside fetchSuggetions:",
          response.data.predictions
        ) //debug******
        setSuggestions(
          predictions.map((p) => ({
            description: p.description,
            place_id: p.place_id,
          }))
        )
      } else {
        console.log("Error Status:", response.data.status) //debug*****
      }
      //console.log(predictions)
      console.log("Full prediction object:", predictions[0]) // debug*****
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error)
    }
  }

  //code for location autocomplete
  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300) //prevenst the api being called after each keypress- gives it a delay

  //gets the debounced suggestions when the user types the location
  const handleInputChange = (text: any) => {
    //problem in here
    setTypedLocation(text)
    console.log(text, "<<<text in handleInputChange")
    debouncedFetchSuggestions(text)
  }

  //this allows the user to select from the suggestions dropdown container
  const handleSuggestionSelect = async ({ description, place_id }) => {
    console.log("Selected place:", description, "Place ID:", place_id)

    try {
      // Fetch lat and long using the place_id
      const coords = await sendToApi({ place_id })
      console.log("Coordinates for selected place:", coords)
      setTypedLocation("")
      setSuggestions([])
    } catch (error) {
      console.error("Error fetching coordinates:", error)
    }

    //console.log(item, '<<<suggestion inside handleSuggestionSelect')

    console.log(description, "<<<suggestion in handleSuggestionSelect")
    console.log("Suggestions length:", suggestions.length)
    console.log("Suggestions:", suggestions)

    return (
      <SearchBarContext.Provider value={{ searchQuery, setSearchQuery }}>
        {children}
      </SearchBarContext.Provider>
    )
  }
}
