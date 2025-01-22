import axios from "axios"
//import { apiErrors } from '../errors/api-error-handling'

//set up the api
const GOOGLE_API_KEY = "AIzaSyBU7GTmJQR1xJO4fbz08ew1AJ1HBa1brG4"
const api = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode/json",
})

//gets the coordinates from the location - town/city
const getCoords = async (params) => {
  console.log(params, "<<<params in geocodeApi")
  const { data } = await api.get("", {
    params: {
      ...params, //address or place_id
      key: GOOGLE_API_KEY,
    },
  })

  //apiErrors(api)

  if (data.status !== "OK") {
    throw new Error(`API Error: ${data.error_message || data.status}`)
  }
  if (!data.results || data.results.length === 0) {
    throw new Error("No data available")
  }
  const location = data.results[0].geometry.location
  const placeId = data.results[0].place_id
  console.log({ placeId, location }, "<<<placeId and location in getCoords")
  return { location, placeId }
}

export { getCoords }
