import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CardShared } from '../Components/Auth/CompartirTarjeta/CardShared';
import { GetCard } from '../Components/Auth/CompartirTarjeta/GetCard';

const Tab=createMaterialTopTabNavigator();

export function TabsNavigationCardShared(){
    return(
        <Tab.Navigator  swipeEnabled={false}>
            <Tab.Screen name="CardShared" component={CardShared} options={{ title: "Tarjetas compartidas" }} />
            <Tab.Screen name="GetCard" component={GetCard} options={{ title: "Conseguir tarjetas" }} />
        </Tab.Navigator>
    )
}