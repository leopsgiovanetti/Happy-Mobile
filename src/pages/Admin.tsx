import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';

interface AdminRouteParams{
  user: {
    id: number;
    name: string;
  }
  token:string;
}

interface Orphanage{
  name: string;
  id: number;
}

export default function Admin(){
    const navigation = useNavigation();
    const route = useRoute();
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const [deleteButtons, setDeleteButtons] = useState<Boolean[]>([]);
    let deleteId = [] as Boolean[];
    const [change, setChange] = useState(0);
    const { user, token } = route.params as AdminRouteParams;

    useEffect(() =>{
      api.get('manageOrphanages',{headers: {
        'Authorization': `Bearer ${token}`
      }}).then((res) => {
        setOrphanages(res.data)

        deleteId = [];
        for(let i = 0; i<orphanages.length; i++){
          deleteId.push(false)
        }
        
        setDeleteButtons(deleteId);
          
      })
    },[change])

    function handleOrphanageDeletion(index:number){
      deleteId[index] = true;
      setDeleteButtons(deleteId);
    }

    function confirmOrphanageDeletion(id:number, index:number){
      api.delete(`orphanages/${id}`,{headers: {
        'Authorization': `Bearer ${token}`
      }})

      console.log(`${id} ${index}`)
      let count = change + 1;

      setChange(count);
    }

    
    return (

        <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
          <Text style={styles.title}>Admin</Text>

        {orphanages.map((orphanage,index) => {
          return(
            <View style={styles.orphanageView} key={orphanage.id}>
              <Text style={styles.orphanageText} >{orphanage.name}</Text>

              {!deleteButtons[index] ? (
                <RectButton style={styles.eraseButton} onPress={() => handleOrphanageDeletion(index)}>               
                  <Feather name="trash-2" size={20} color="#FFF" /> 
                </RectButton>
              ) :(
                <RectButton style={styles.confirmButton} onPress={() => confirmOrphanageDeletion(orphanage.id, index)}>               
                  <Text style={styles.eraseText}> Apagar </Text> 
                </RectButton>
              )}
                              
              
            </View> 
          )
        })}
                  
          
     
          <RectButton style={styles.nextButton} onPress={()=>{}}>
            <Text style={styles.nextButtonText}>Cadastrar</Text>
          </RectButton>
        </ScrollView>
      )
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
    
      title: {
        color: '#5c8599',
        fontSize: 24,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 0.8,
        borderBottomColor: '#D3E2E6'
      },
    
      orphanageView: {
        backgroundColor:'#FFF',
        borderRadius:20,
        height:56,
        paddingLeft:48,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:"space-between",
        marginBottom:10,     
      },

      orphanageText:{
        color: '#8fa7b3',
        fontFamily: 'Nunito_600SemiBold',
        fontSize:18,
       
      },

      eraseButton:{
        backgroundColor:'#a01',
        borderRadius:20,
        height:56,
        width:56,
        alignItems:'center',
        justifyContent:'center'

      },

      confirmButton:{
        backgroundColor:'#a01',
        borderRadius:20,
        height:56,
        width:100,
        alignItems:'center',
        justifyContent:'center'

      },
      eraseText:{
        color:'#FFF'
      },
    
      comment: {
        fontSize: 11,
        color: '#8fa7b3',
      },
    
      input: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
      },
    
      imagesInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderStyle: 'dashed',
        borderColor: '#96D2F0',
        borderWidth: 1.4,
        borderRadius: 20,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
      },
    
      uploadedImagesContainer:{
        flexDirection:'row',
    
      },
    
      uploadedImage: {
        width: 64,
        height: 64,
        borderRadius: 20,
        marginBottom:32,
        marginRight:8,
      },
    
      switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
      },
    
      nextButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 32,
      },
    
      nextButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFF',
      }
    })