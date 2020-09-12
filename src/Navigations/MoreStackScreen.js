import React, { useEffect } from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { Perfil } from '../Components/Auth/Perfil';


const MoreStack = createStackNavigator();

export function MoreStackScreen(){
        return (
          <MoreStack.Navigator screenOptions={{
            title: "MoreClip", headerTitleAlign: 'center',}}>
            <MoreStack.Screen name="More" options={{header:()=>null}} component={Perfil}/>
          </MoreStack.Navigator>
        )
      }