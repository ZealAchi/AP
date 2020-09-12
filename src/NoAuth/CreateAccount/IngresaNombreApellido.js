import React, { useState, useEffect, useContext } from 'react'
import { Block } from '../../UI/Block'
import { Texto } from '../../UI/Texto'
import { TextInput } from '../../UI/Input'
import Colors from '../../UI/Colors'
import { View,StatusBar } from 'react-native'
import { Button } from '../../UI/Button'
import { DataContext } from '../../Context/Datos.Context'
import { ScreenContainer } from '../../Components/ScreenContainer'
import { Header } from '../../UI/Header'
import { AlertMessage } from '../../Components/Alert'


export function IngresaNombreApellido({ navigation }) {
    const { setState, state } = useContext(DataContext)
    const [first_name, setFirst_name] = useState(null)
    const [last_name, setLast_name] = useState(null)

    const [tiempo, setTiempo] = useState()
    useEffect(() => {
        var date = new Date().getHours();
        setTiempo(date < 12 ? 'Buenos dias' : (date > 12 )?'Buenas tardes' : date > 19&& 'Buenas noches')
    }, [])
    const Next = () => {
        if (first_name && last_name) {
            setState({ ...state, NewUser: [{ first_name, last_name }] })
            navigation.navigate('CualEsTuMail')
        }
        if (!last_name) {
            AlertMessage({message:'Debes Ingresar tu apellido'})
        }
        if (!first_name) {
            AlertMessage({message:'Debes Ingresar tu nombre'})
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor(Colors.Secondary)
            StatusBar.setBarStyle('dark-content')
        });
        return unsubscribe;
    }, [navigation])
    return (
        <ScreenContainer backgroundColor={'transparent'} barBackgroundColor={'transparent'} padding>
            <Block>
            <Header Return/>
                <Texto Bold size={13}>{tiempo},</Texto>
                <Texto Bold size={13}>¿Cuál es tu nombre?</Texto>
                <View style={{marginTop:20}}>
                    <Texto size={12}>Nombre</Texto>
                    <TextInput borderBottomWidth backgroundColor={'transparent'} value={first_name} onChangeText={(e) => setFirst_name(e)} placeholder="Ingresa tu nombre" />
                </View>
                <View>
                    <Texto size={12}>Apellido</Texto>
                    <TextInput borderBottomWidth backgroundColor={'transparent'} value={last_name} onChangeText={(e) => setLast_name(e)} placeholder="Ingresa tus Apellidos" />
                </View>
                <Button onPress={() => Next()} styleButton={{ position: 'absolute', bottom: 20, right: 50, left: 50, borderRadius: 18 }} label="CONTINUAR" />
            </Block>

        </ScreenContainer>
    )
}