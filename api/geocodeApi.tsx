import axios from 'axios'
//import { apiErrors } from '../errors/api-error-handling'

//set up the api
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; 
const api = axios.create({
    baseURL: process.env.GOOGLE_GEOCODE_API_URL,
});

//gets the coordinates from the location - town/city
const getCoords = async (params) => {

      const { data } = await api.get('' , {
        params: {
            ...params, //address or place_id
            key: GOOGLE_API_KEY
        }
    });
   
    //apiErrors(api)
    
    if(data.status !== 'OK'){
        throw new Error(`API Error: ${data.error_message || data.status}`)
    }
    if(!data.results || data.results.length === 0){
        throw new Error('No data available')
    }
    return data.results[0].geometry.location;
}

  export { getCoords };