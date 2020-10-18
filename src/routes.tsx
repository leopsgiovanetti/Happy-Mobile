import React from "react";
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';

import OrphanageData from './pages/createOrphanage/OrphanageData';
import SelectPosition from './pages/createOrphanage/SelectPosition';
import Header from "./components/Header";
import Login from "./pages/Login";
import Admin from "./pages/Admin";


const {Navigator, Screen } = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#f2f3f5'}}}>
                <Screen 
                    name="OrphanagesMap" 
                    component={OrphanagesMap} 

                />

                <Screen 
                    name="OrphanageDetails" 
                    component={OrphanageDetails} 
                    options={{
                        headerShown: true,
                        header: () => <Header title="Orfanato" />
                    }}
                />


                <Screen 
                    name="OrphanageData" 
                    component={OrphanageData} 
                    options={{
                        headerShown: true,
                        header: () => <Header title="Passo 2 - Preencher dados do Orfanato" xButton= {true} />
                    }}
                />

                <Screen 
                    name="SelectPosition" 
                    component={SelectPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Passo 1 - Selecionar localização do Orfanato" xButton= {true} />
                    }}
                />

                <Screen 
                    name="Login" 
                    component={Login} 
                    options={{
                        headerShown: true,
                        header: () => <Header title="Login" />
                    }}
                />


                <Screen 
                    name="Admin" 
                    component={Admin} 
                    options={{
                        headerShown: true,
                        header: () => <Header title="Admin" />
                    }}
                />

            </Navigator>
        </NavigationContainer>
    )
}