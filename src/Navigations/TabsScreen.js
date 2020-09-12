/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable-next-line react/prefer-stateless-function */
import React, { useEffect, useContext,useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
// import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import posed from "react-native-pose";
// import Colors from '../UI/Colors';
// import { HomeStackScreen } from './HomeStackScreen';
// import { CobrarStackScreen } from './CobrarStackScreen';
// import { Analysis } from '../Components/Auth/Analisis';
import { CompartirTarjeta } from '../Components/Auth/CompartirTarjeta';
import { PagarHome } from '../Components/Auth/Pagar';
import { CobrarHome } from '../Components/Auth/Cobrar';
import { HomeClip } from '../Components/Auth/HomeClip';
import { MyTabBar } from '../UI/TabBar/Tabbar';
import { Perfil } from '../Components/Auth/Perfil';

const Tab = createBottomTabNavigator();


export function TabsScreen() {
    const [key,setKey]=useState()
    useFocusEffect(
        React.useCallback(() => {
          return () => {
            setKey(JSON.stringify(new Date()))
          };
        }, [])
      );
    
    return (
        <Tab.Navigator initialRouteName="Home" tabBar={props => <MyTabBar {...props} key={key}/>}>
            <Tab.Screen name="PagarHome" component={PagarHome} options={{title:'Transferir'}}/>
            <Tab.Screen name="CobrarHome" component={CobrarHome}  options={{title:"Cobrar"}}/>
            <Tab.Screen options={{ tabBarVisible: false }} name="Home" component={HomeClip} />
            <Tab.Screen name="Compartir Tarjeta" component={CompartirTarjeta} />
            <Tab.Screen name="Más" component={Perfil} />
        </Tab.Navigator>
    );
}