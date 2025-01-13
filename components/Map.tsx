import{View, Text, StyleSheet} from 'react-native'
import MapView, {Marker}  from 'react-native-maps'
import PetrolStations from '@/assets/data/PetrolStation.json'




export default function Map(){
    return (<View>
        <MapView style={styles.map} initialRegion={{
    latitude: 51.5072,
    longitude: 0.1276,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}>
   
 {/*TODO: FIX MERKERS GETTING CUT OFF */}
    {PetrolStations.map((petrolStation) =>(
         <Marker key={petrolStation.id} coordinate={{ latitude: petrolStation.latitude,
    longitude: petrolStation.longitude}} title={petrolStation.name}>
        <View style={{backgroundColor: '#1E998D', padding: 5, paddingHorizontal: 3, borderWidth: 1, borderColor:'#C7F5F2', borderRadius: 20}} >
        <Text style={styles.whiteText}>{petrolStation.price}p</Text></View>
    </Marker>
    ))}


            
        </MapView>

    
        </View>);
}

const styles = StyleSheet.create({
    map: {
        width: '100%', 
        height: '100%',
    },
    whiteText:{
        color: 'white'
    }
    
})