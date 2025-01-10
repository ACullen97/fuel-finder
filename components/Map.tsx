import{View, Text, StyleSheet} from 'react-native'
import MapView, {Marker}  from 'react-native-maps'




export default function Map(){
    return (<View>
        <MapView style={styles.map} >
  
    {/* <Marker coordinate={{latitude: 37.78825,
    longitude: -122.4324}} title="Petrol Station"/> */}
</MapView>;
    
        </View>);
}

const styles = StyleSheet.create({
    map: {
        width: '100%', 
        height: '100%',
    }
})