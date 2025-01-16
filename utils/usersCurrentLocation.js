  const getLocationPermission = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted'){
      alert('permission to access location was denied');
      return;
    }
  
    let currentLocation = await Location.getCurrentPositionAsync({});
        setCurrentLocation(currentLocation);
        let lat = currentLocation.coords.latitude;
        let long = currentLocation.coords.longitude;
        setLatitude(lat);
        setLongitude(long);
        console.log('Location: ' + JSON.stringify(currentLocation) + " Latitude: " + currentLocation.coords.latitude + "Longitude: " + currentLocation.coords.longitude);
        
        // console.log('latitude: ', lat)//debugging*****
        // console.log('longitude: ', long)//debugging*****
  };

  module.exports = getLocationPermission;