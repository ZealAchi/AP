/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ingresos } from '../Components/Auth/Analisis/Ingresos';
import { NoComput } from '../Components/Auth/Analisis/noComput';
import { Gastos } from '../Components/Auth/Analisis/Gastos';
import Colors from '../UI/Colors';
import { StyledContext } from '../Context/Styled.Context';

const Tab = createMaterialTopTabNavigator();

export function TabsNavigationAnalysis() {
    const { changeThemePrimaryLight, changeThemeSecondLight, themeCurrent } = useContext(StyledContext)
    
    return (
        <Tab.Navigator
            lazy
            initialRouteName="Gastos"
            tabBarOptions={{
                indicatorStyle: { backgroundColor: themeCurrent.color1 },
                activeBackgroundColor: { backgroundColor: themeCurrent.color1 },
                activeTintColor: themeCurrent.color1,
                inactiveTintColor: Colors.dimgray,

            }}>
            <Tab.Screen
                listeners={{
                    tabPress: e => {
                        changeThemePrimaryLight();    
                    }
                }}
                name="Ingresos" component={Ingresos} options={{ title: "Ingresos" }} />
            <Tab.Screen 
            listeners={{
                tabPress: e => {
                    changeThemeSecondLight();
                    
                }
            }}
            name="Gastos" component={Gastos} options={{ title: "Gastos" }} />
            <Tab.Screen listeners={{
                tabPress: e => {
                    changeThemeSecondLight();
                    
                }
            }}
            name="NoComput" component={NoComput} options={{ title: "No comput" }} />
        </Tab.Navigator>
    );
}
