import React, { useState ,useEffect} from 'react'
import { View, Image ,StatusBar} from 'react-native'
import { vh, vw } from 'react-native-css-vh-vw'
import { ScreenContainer } from '../Components/ScreenContainer';
import { Header } from '../UI/Header';
import { Texto } from '../UI/Texto';
import { TextInput } from '../UI/Input';
import { Button } from '../UI/Button';
import { Block } from '../UI/Block';
import Colors from '../UI/Colors';
import { useAPI } from '../Hooks/useAPI';
import {format} from '../Util/rut'

export function RutAndPin({navigation}) {
    const [rut_number, setRut_number] = useState('')
    const [pin, setPin] = useState('')
    const API=useAPI()
    const Login=()=>{
        API.PostAPI.login({pin, rut_number}, (props) => {
            if (props === true) {
                navigation.replace('App')
            }
            
        })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor(Colors.Secondary)
            StatusBar.setBarStyle('dark-content')
        });
        return unsubscribe;
    }, [navigation])

    return (<ScreenContainer padding backgroundColor="white">

        <View style={{ flex: 0, height: 35,  borderRadius: 10 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Texto size={44} colorLabel={Colors.midnightblue}>ALL<Texto size={44} colorLabel={Colors.midnightblue} Bold>PAY</Texto></Texto>
                {/* <Texto style={{ fontWeight: '300', lineHeight: 70, letterSpacing: 0.828029 }} typeFamily="latoLightItalic" colorLabel={Colors.midnightblue} size={24.4245}>ALL<Texto colorLabel={Colors.midnightblue} style={{ fontWeight: '900', letterSpacing: 0.828029 }} Bold size={24.4245}>PAY</Texto></Texto> */}
            </View>
        </View>
        <Block style={{ display: 'flex', flex: 1, margin: 12, borderRadius: 12,justifyContent:'center',top:-12}}>
            <View style={{justifyContent:'center'}}>
            <Image source={require('../Assets/CardHome.png')} style={{ height: 69, width: 82, top: 10, position: 'absolute', right: 0 }} />

            <View style={{ width: vw(72) }}>
                <Texto>Ingresa tu Rut</Texto>
                <TextInput keyboardType="visible-password" borderBottomWidth backgroundColor={'transparent'} value={rut_number} onChangeText={(e) =>
                {
                    const newRut =format(e)
                    setRut_number(newRut)
                }
                    } placeholder="Ingresa tu RUT"/>
            </View>
            <Texto>Ingresa tu Pin</Texto>
            <TextInput keyboardType="numeric" secureTextEntry maxLength={4} borderBottomWidth backgroundColor={'transparent'} value={pin} onChangeText={(e) => setPin(e)} placeholder="Pin" />
            </View>
        </Block>
        {/* <Block>
            <View>
                <Texto size={12} Bold>Ingresa tu RUT</Texto>
                <TextInput borderBottomWidth backgroundColor={'transparent'} value={rut_number} onChangeText={(e) => setRut_number(e)} placeholder="Ingresa tu RUT" />
            </View>
            <View>
                <Texto size={12} Bold>Ingresa tu PIN</Texto>
                <TextInput keyboardType="numeric"
                    maxLength={4}
                    borderBottomWidth backgroundColor={'transparent'} value={pin} onChangeText={(e) => setPin(e)} placeholder="Ingresa tu RUT" />
            </View>
        </Block> */}
        <Button onPress={Login} label="Entrar" styleButton={{ bottom: 0, borderRadius: 21, marginLeft: 50, marginRight: 50 }}/>
    </ScreenContainer>)

}