import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {Feather} from '@expo/vector-icons';
import mapMarker from '../images/map-marker.png';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';


interface Orphanage{
  name: string;
  latitude: number;
  longitude: number;
  id: number;
}


export default function OrphanagesMaps(){

    const [orphanages, setOrphanages] = useState<Orphanage[]>([])
    const navigation = useNavigation();


    useEffect(() => {
      api.get('orphanages').then(response => {
        setOrphanages(response.data)
      })
    });



    function navigateToOrphanageDetails(id: number){
        navigation.navigate('OrphanageDetails', { id });
    }

    function navigateToSelectPosition(){
      navigation.navigate('SelectPosition');
    }

    function navigateToLogin(){
      navigation.navigate('Login');
    }


    return(
        <View style={styles.container}>
            <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
                latitude:-25.4319843,
                longitude:-49.2711309,
                latitudeDelta: 0.08,
                longitudeDelta: 0.08

            }}>
                {orphanages.map((orphanage) => {
                  return(
                    <Marker
                      key={orphanage.id}
                      icon={mapMarker}
                      calloutAnchor={{
                          x:3.0,
                          y:0.9,
                      }}
                      coordinate={{
                          latitude:orphanage.latitude,
                          longitude:orphanage.longitude            
                    }}>
      
                          <Callout tooltip={true} onPress={() => navigateToOrphanageDetails(orphanage.id)}>
                          <View  style={styles.calloutContainer}>
                              <Text  style={styles.calloutText}>{orphanage.name}
                              </Text>
                          </View>
      
                          
                          </Callout>
                    </Marker>
                  )
                  
                })}
                
            </MapView>

            <View style={styles.footer}>
                <RectButton style={styles.loginButton} onPress={ navigateToLogin }>
                  <Feather name="key" size={20} color="#FFF" />
                </RectButton>

                <Text style={styles.footerText}> {orphanages.length} orfanatos encontrados </Text>

                <RectButton style={styles.createOphanageButton} onPress={ navigateToSelectPosition }>
                  <Feather name="plus" size={20} color="#FFF" />
                </RectButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
  
    },
  
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    },
  
    calloutContainer:{
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 16,
      justifyContent:'center',
  
    },
  
    calloutText:{
      color: '#0089a5',
      fontSize: 14,    
      fontFamily: 'Nunito_700Bold',
    },
  
    footer:{
      position: "absolute",
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: "#FFF",
      borderRadius: 20,
      height: 56,
      paddingLeft:0,
      marginLeft:0,
      
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation:3,
    },
  
    footerText:{
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3'
    },
  
    createOphanageButton:{
      width:56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
      justifyContent:'center',
      alignItems:'center'
      
    },

    loginButton:{
      width:56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
      justifyContent:'center',
      alignItems:'center'
      
    }
  
  
  });
  