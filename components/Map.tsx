import{View, Text, StyleSheet} from 'react-native'
import MapView, {Marker}  from 'react-native-maps'




export default function Map(){
    return (<View>
        <MapView style={styles.map} initialRegion={{
    latitude: 51.5072,
    longitude: 0.1276,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}>
    <Marker coordinate={{ latitude: 51.5172,
    longitude: 0.1276}} title="petrol station1"/>
     <Marker coordinate={{ latitude: 51.5002,
    longitude: 0.1226}} title="petrol station2"/>
     <Marker coordinate={{ latitude: 51.5322,
    longitude: 0.1376}} title="petrol station3"/>
            
        </MapView>

    
        </View>);
}

const styles = StyleSheet.create({
    map: {
        width: '100%', 
        height: '100%',
    }
})