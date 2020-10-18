import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';


export default function Login(){
    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleFormSubmition(){
        const data = {
            email: email,
            password: password
        }    
        
        try {
            await api.post('login', data).then(async (res) => {
                const token = res.data
                
                try {
                    await api.get('me', {headers: {
                        'Authorization': `Bearer ${token.token}`
                      }}).then((res) => {
                          const { permission } = res.data
                          console.log(permission)
                          
                          if(permission){
                            navigation.navigate('Admin',{ user: token.user, token: token.token });
                          }
                                              
                        })  
                } catch (error) {
                    alert('Could not use token')
                    navigation.navigate('OrphanagesMap');
                }
                      
    
            });
        } catch (error) {
            alert('Could not login')
            navigation.navigate('OrphanagesMap');
        }
        

        
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
          <Text style={styles.title}>Login</Text>
    
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
    
          <Text style={styles.label}>Senha</Text>
          <TextInput
            secureTextEntry
            style={styles.input}            
            value={password}
            onChangeText={setPassword}
          />
    
              
          <RectButton style={styles.nextButton} onPress={handleFormSubmition}>
            <Text style={styles.nextButtonText}>Entrar</Text>
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
    
      label: {
        color: '#8fa7b3',
        fontFamily: 'Nunito_600SemiBold',
        marginBottom: 8,
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