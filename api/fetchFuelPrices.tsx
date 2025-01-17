export function getPricesRadius(lat: Number, long: Number, radius: Number) {
    return fetch(`http://python-api-b73h.onrender.com/stations-within-radius?lat=${lat}&lng=${long}&radius=${radius}`)
    .then((response) => {
        return response.json();
    })
    .then(({stations}) => {
      return stations
    })
  }