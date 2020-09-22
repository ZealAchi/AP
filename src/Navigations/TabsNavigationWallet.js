import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MisTarjetas } from '../Components/Auth/Wallet/MisTarjetas';
import { CompartidasConmigo } from '../Components/Auth/Wallet/CompartidasConmigo';

const Tab = createMaterialTopTabNavigator();

export function TabsNavigationWallet() {
  return (
    <Tab.Navigator  swipeEnabled={false}>
      <Tab.Screen name="MisTarjetas" component={MisTarjetas} options={{ title: "Mis Tarjetas" }} />
      <Tab.Screen name="CompartidasConmigo" component={CompartidasConmigo} options={{ title: "Compartidas conmigo" }} />
    </Tab.Navigator>
  );
}
