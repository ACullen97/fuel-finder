import axios from "axios"

const GOOGLE_API_KEY = "AIzaSyBU7GTmJQR1xJO4fbz08ew1AJ1HBa1brG4"
const api = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/place/details/json",
})

const getPlaceDetails = async (placeId) => {
  const { data } = await api.get("", {
    params: {
      place_id: placeId,
      key: GOOGLE_API_KEY,
    },
  })

  if (data.status !== "OK") {
    throw new Error(`API Error: ${data.error_message || data.status}`)
  }
  if (!data.result) {
    throw new Error("No data available")
  }
  //console.log(data.result, "<<<placeId in fetchPlaceDetails")
  return data.result
}

export { getPlaceDetails }
