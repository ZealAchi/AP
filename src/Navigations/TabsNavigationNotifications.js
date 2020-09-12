import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Archivadas } from '../Components/Auth/Notificaciones/archivadas';
import {Recibidas } from '../Components/Auth/Notificaciones/recibidas';

const Tab = createMaterialTopTabNavigator();

export function TabsNavigationNotifications() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="NRecibidas" component={Recibidas} options={{ title: "Recibidas" }} />
      <Tab.Screen name="NArchivadas" component={Archivadas} options={{ title: "Archivadas" }} />
    </Tab.Navigator>
  );
}
