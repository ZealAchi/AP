import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Recibidas } from '../Components/Auth/AddBank/queSonYporQue/Recibidas';
import { Archivadas } from '../Components/Auth/AddBank/queSonYporQue/Archivadas';
import Colors from '../UI/Colors';
import { dp } from '../UI/dist/Responsive.dev';

const Tab = createMaterialTopTabNavigator();

export function TabsNavigationQueSonYPorQue() {
    return (
        <Tab.Navigator
        tabBarOptions={{ 
            activeTintColor: Colors.Secondary,
            indicatorStyle: { backgroundColor: Colors.Secondary },
            indicatorContainerStyle:{backgroundColor:Colors.Primary},

        }} >
            <Tab.Screen name="NRecibidas" component={Recibidas} options={{ title: "Tus  claves",}}  />
            <Tab.Screen name="NArchivadas" component={Archivadas} options={{ title: "Nuestra seguridad" }} />
        </Tab.Navigator>
    );
}
