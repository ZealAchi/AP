import React, { useEffect } from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { CobrarHome } from '../Components/Auth/Cobrar';


const CobrarStack = createStackNavigator();

export function CobrarStackScreen(){
        return (
          <CobrarStack.Navigator screenOptions={{
            title: "Cobrar", headerTitleAlign: 'center',}}>
            <CobrarStack.Screen name="Cobrar" options={{header:()=>null}} component={CobrarHome}/>
          </CobrarStack.Navigator>
        )
      }