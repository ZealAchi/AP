import React, { useState, useEffect, useContext} from 'react'
import { Block } from '../../UI/Block'
import { Texto } from '../../UI/Texto'
import { TextInput } from '../../UI/Input'
import Colors from '../../UI/Colors'
import IntlPhoneInput from 'react-native-intl-phone-input';
import { View,Text } from 'react-native'
import PhoneInput from "react-native-phone-input";
// react-phone-number-input
import { isValidPhoneNumber } from 'react-phone-number-input'
import { MyStatusBar } from '../../UI/MyStatusBar'
import { Button } from '../../UI/Button'
import { DataContext } from '../../Context/Datos.Context'
import { ScreenContainer } from '../../Components/ScreenContainer'
import { Header } from '../../UI/Header'
// import Telephone from './telephone'

import { SafeAreaView } from 'react-native-safe-area-context'

export function CualEsTuMail({ navigation }) {
    const { state, setState } = useContext(DataContext)
    const [email, setEmail] = useState(null)
    const [isVerifiedPhone, setIsVerifiedPhone]=useState(false)
    const [phone, setPhone] = useState(null)
    const Next = () => {
        const emailCheckRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/;
        if (!emailCheckRegex.test(email)) {
            alert('Ingresa un email valido')
        } else {
            if(isVerifiedPhone){
                setState({ ...state, NewUser: [{...state.NewUser[0], email,phone}] })
                navigation.navigate('FotoPerfil')
            }else{
                alert('Tu número no es valido')
            }
        } 
    }

    const onChangeText = ({dialCode, unmaskedPhoneNumber, phoneNumber, isVerified}) => {
        const phone=`${dialCode}${unmaskedPhoneNumber}`
        setIsVerifiedPhone(isValidPhoneNumber(phone)===true)
        setPhone(phone)
      };
    return (<ScreenContainer backgroundColor={'transparent'} barBackgroundColor={'transparent'} padding>
        <Block>
        <SafeAreaView>
            <Header Return />
            <Texto Bold size={13}>Dinos, ¿Cuál es tu mail y telefono?</Texto>
            <View style={{ marginTop: 20 }}>
                <Texto size={12}>Correo</Texto>
                <TextInput autoCapitalize="none" borderBottomWidth backgroundColor={'transparent'} keyboardType="email-address" onChangeText={(e) => setEmail(e)} placeholder="Ingresa tu Correo" value={email} />
            </View>
            <View style={{ marginTop: 20 }}>
                <Texto size={12}>Telefono</Texto>
                {/* <Telephone state={state} setState={setState}/> */}
                <IntlPhoneInput 
                modalContainer={{backgroundColor: 'transparent'}}
                phoneInputStyle={{backgroundColor:'transparent'}}
                containerStyle={{backgroundColor:'transparent',borderBottomWidth:1,borderBottomColor:"#E8E9EC" }}
                flagStyle={{fontSize:20}}
                onChangeText={onChangeText} defaultCountry="CL" filterText="Filtrar" closeText="Cerrar"/>
                </View>
            
            </SafeAreaView>
            <Button onPress={() => Next()} styleButton={{ position: 'absolute', bottom: 20, right: 50, left: 50, borderRadius: 18 }} label="CONTINUAR" />
        </Block>
    </ScreenContainer>)
}