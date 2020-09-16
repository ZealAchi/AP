/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useContext } from 'react'
import { NavigationContainer, useLinking } from '@react-navigation/native';
import { LogBox, Text } from 'react-native'
import { RootStackScreen } from './Navigations';
import { Context } from './Context';
import { navigationRef } from './Navigations/RootNavigation';
import { LoaderScreen, LoaderIcon } from './UI/Loader';
import { useLocalStorage } from './Hooks/useLocalStorage';
import { Button } from './UI/Button';
import { CreditCard } from './UI/CreditCard';
import * as RootNavigation from './Navigations/RootNavigation'

import { IngresaTusDocumentos } from './NoAuth/CreateAccount/IngresaTusDocumentos';
import { DataContext } from './Context/Datos.Context';
import { LoadingContext } from './Context/Load.Context';
import { useEffect } from 'react';




export function App() {
  return (
    <Context>
      <ContentApp />
    </Context>
  )
}
export default App


const ContentApp = () => {

  // const ref = React.useRef();

  const { pagarWhats, setPagarWhats, tokenX } = useContext(DataContext)

  const LoadingCtx = useContext(LoadingContext)
  // useEffect(() => {
  //   setTimeout(function () {
  //     if (LoadingCtx.Loading === true) {
  //       LoadingCtx.LoadingFalse()
  //     }
  //   }, 1000)
  // }, [])


  const { getInitialState } = useLinking(navigationRef, {
    prefixes: ['https://www.allpay.com', 'allpay://'],
    config: {
      screens: {
        EnterYourPin: 'EnterYourPin/:amount',
      },
    },
    getStateFromPath: (path, options) => {

      console.log(path, options, 'path,options')
      console.log("sa")
      // const data = { amount: JSON.parse(`${newMonto}00`), currency: JSON.parse(Currency), to_uuid: user.uuid }
      var datos = path.split('/')
      datos.shift()
      if ("EnterYourPin" == datos[0]) {
        const data = { amount: JSON.parse(`${datos[4]}`), currency: JSON.parse(`${datos[1]}`), to_uuid: datos[2], user: datos[3].replace('_', ' ') }
        if (data?.to_uuid) {
          setPagarWhats({
            type: 'transferWT', data, nextFunction: () => setPagarWhats()
          })
          RootNavigation.navigate('EnterYourPin', {
            type: 'transferWT',
            data: { ...data },
            nextAction: () => {
            }
          })
        }
      }
      // RootNavigation.navigate('EnterYourPin')
      // Return a state object here
      // You can also reuse the default logic by importing `getStateFromPath` from `@react-navigation/native`
    },
    getPathFromState(state, config) {

      console.log(state, config, 'state, config')
      // Return a path string here
      // You can also reuse the default logic by importing `getPathFromState` from `@react-navigation/native`
    },
  });


  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();


  React.useEffect(() => {
    getInitialState()
      .catch(() => { })
      .then(state => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

  // const linking = {
  //   prefixes: ['https://www.allpay.com', 'allpay://'],
  //   config: {
  //     screens: {
  //       EnterYourPin: 'EnterYourPin/:amount',
  //     },
  //   },
  //   getStateFromPath: (path, options) => {

  //     console.log(path,options,'path,options')
  //     console.log("sa")
  //     // const data = { amount: JSON.parse(`${newMonto}00`), currency: JSON.parse(Currency), to_uuid: user.uuid }
  //     var datos = path.split('/')
  //     datos.shift()
  //     if ("EnterYourPin" == datos[0]) {
  //       const data = { amount: JSON.parse(`${datos[4]}`), currency: JSON.parse(`${datos[1]}`), to_uuid: datos[2], user: datos[3].replace('_', ' ') }
  //       if (data?.to_uuid) {
  //         setPagarWhats({
  //           type: 'transferWT', data,nextFunction:()=>setPagarWhats()
  //         })
  //         RootNavigation.navigate('EnterYourPin', {
  //           type: 'transferWT',
  //           data: { ...data },
  //           nextAction: () => {
  //           }
  //         })
  //       }
  //     }
  //     // RootNavigation.navigate('EnterYourPin')
  //     // Return a state object here
  //     // You can also reuse the default logic by importing `getStateFromPath` from `@react-navigation/native`
  //   },
  //   getPathFromState(state, config) {

  //     console.log(state, config, 'state, config')
  //     // Return a path string here
  //     // You can also reuse the default logic by importing `getPathFromState` from `@react-navigation/native`
  //   },
  // };

  const localStorage = useLocalStorage();
  LogBox.ignoreAllLogs()
  // return <Button onPress={() => {
  //     localStorage.removeItem('@App:RUT');
  //     localStorage.removeItem('@App:Password');
  //     localStorage.removeItem('@App:token');
  //     localStorage.removeItem('@App:isNewUser');
  // }} borderRadius={50} styleButton={{ flex: 1, margin: 12 }} size={15} backgroundColor="red" label="Removew" />
  // 6703839-8 
  // 12755701-2
  // 20087742-k	1133
  // 22873662-7   1133
  // 14507101-1   1133 usuario sin fondos
  // 24589477-5	salir salir sin guardar el pin
  // 8564092-5    1133   segvsd sd
  // 14215340-8   1133 //usuario que cobrara Cobrar 8.000.000
  // 21556333-2	
  // 1133
  return (
    <NavigationContainer
      initialState={initialState}
      // ref={ref}
      // linking={linking} 
      ref={navigationRef}
      fallback={<Text>Loading...</Text>}>
      <RootStackScreen />
      <LoaderIcon animationType="fade" />
      <LoaderScreen />
    </NavigationContainer>
  )
}