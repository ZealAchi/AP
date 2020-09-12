import React, { useEffect } from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { HomeClip } from '../Components/Auth/HomeClip';

const HomeStack = createStackNavigator();

export function HomeStackScreen(){
        return (
          <HomeStack.Navigator screenOptions={{
            title: "HomeClip", headerTitleAlign: 'center',}}>
            <HomeStack.Screen name="Home" options={{header:()=>null}} component={HomeClip}/>
          </HomeStack.Navigator>
        )
      }