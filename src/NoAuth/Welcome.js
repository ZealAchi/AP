import React, { useContext, useEffect } from 'react'
import { View, StatusBar } from 'react-native'
import { ScreenContainer } from '../Components/ScreenContainer'
import Colors from '../UI/Colors'
import { Block } from '../UI/Block'
import { Texto } from '../UI/Texto'
import { Button } from '../UI/Button'
import { useLocalStorage } from '../Hooks/useLocalStorage'
import { LoadingContext } from '../Context/Load.Context';
import { DataContext } from '../Context/Datos.Context'

export function Welcome({ navigation }) {
    const localStorage = useLocalStorage()
    const {getPassword,password,getNewUser,getToken}=useContext(DataContext)
    const LoadingCtx = useContext(LoadingContext)
    useEffect(() => {
        setTimeout(function () {
            if (LoadingCtx.Loading === true) {
                LoadingCtx.LoadingFalse()
            }
        }, 1000)
    }, [])
    
// useEffect(()=> {
//     console.log(password,'password')
// },[password])

// const addPIN=()=>{
//     getPassword('3311')
//     // localStorage.setData('@App:Password', '1223')
//     getNewUser(true)
//     getToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVVUlEIjoiN2ZhZGE2MDgtYWYwMS00NWE4LWFiZjgtMjQwNTMxYzRkZmY2IiwiZW1haWwiOiJqb2huQGdtYS5jb20iLCJleHAiOjE2MDIyMzAzMTYsImlhdCI6MTU5ODU0MzkxNn0.Py3mgFfRVU7UT3yNGTRaEqn9AoCpA7IswpcVvZIvOTA')
//     // localStorage.setData('@App:isNewUser', 'true')
//     navigation.navigate('EnterYourPin')
//     // console.log('ree')
// }

useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        StatusBar.setBackgroundColor(Colors.Primary)
        StatusBar.setBarStyle('dark-content')
    });
    return unsubscribe;
}, [navigation])
    return (
        <ScreenContainer backgroundColor={Colors.Primary} barBackgroundColor={Colors.Primary}>

            <Block style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Texto style={{ textAlign: 'center', fontWeight: '300', lineHeight: 70, letterSpacing: 0.828029 }} typeFamily="latoLightItalic" colorLabel="white" size={48}>ALL<Texto colorLabel="white" style={{ fontWeight: '900', letterSpacing: 0.828029 }} Bold size={48}>PAY</Texto></Texto>
                <Texto style={{ textAlign: 'center' }} colorLabel="white">Cobra y paga a traves de tu telefono</Texto>

                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button styleText={{ textAlign: 'center' }} onPress={() => navigation.navigate('RutAndPin')} colorLabel={Colors.Primary} styleButton={{ flex: 1, margin: 12 }} label="Ya tengo cuenta" />
                    <Button onPress={() => navigation.navigate('IngresaNombreApellido')} borderRadius={50} styleButton={{ flex: 1, margin: 12 }} size={15} backgroundColor="white" color={Colors.Primary} label="SOY NUEVO" />
                </View>
                {/* <Button onPress={() => {
                    addPIN()
                    // localStorage.setData('@App:RUT', '22108511-6')
                    }} borderRadius={50} styleButton={{ flex: 1, margin: 12 }} size={15} backgroundColor="white" color={Colors.Primary} label="Agregar pin" /> */}
                {/* <Button onPress={() => {localStorage.setData('@App:RUT', '22108511-6') }} borderRadius={50} styleButton={{ flex: 1, margin: 12 }} size={15} backgroundColor="white" color={Colors.Primary} label="usuario POSTJOSE" /> */}
                {/* <Button onPress={() => {
                    localStorage.removeItem('@App:RUT');
                    0370
                }} borderRadius={50} styleButton={{ flex: 1, margin: 12 }} size={15} backgroundColor="white" color={Colors.Primary} label="Remove" /> */}
            </Block>
        </ScreenContainer>)
}