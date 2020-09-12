/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useRef, useEffect, useContext, useState } from 'react'
import * as RootNavigation from '../Navigations/RootNavigation'
import { AlertMessage } from '../Components/Alert'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Image, AppState, Platform, View, KeyboardAvoidingView, Dimensions } from 'react-native';
import { vh, vw } from 'react-native-css-vh-vw'
import { Modalize } from 'react-native-modalize'
import { Texto } from '../UI/Texto'
import { ModalContext } from '../Context/Modal.Context'
import { Block } from '../UI/Block'
import { Button } from '../UI/Button'
import Colors from '../UI/Colors'
import { TextInput } from '../UI/Input';
import { useAPI } from '../Hooks/useAPI';

export function Modal(props) {
    const { children, type = '', data } = props
    const { status, changeStatus } = useContext(ModalContext)
    const [rut_number, setRut_number] = useState('')

    const modalizeRef = useRef(null);
    useEffect(() => {
        if (status) modalizeRef.current?.open()
    }, [status])

    return (
        <Modalize ref={modalizeRef}
            // onClosed={() => changeStatus()}
            handlePosition="outside"
            snapPoint={350}
            modalHeight={vw(180)}
            modalStyle={{ backgroundColor: Colors.Secondary, display: 'flex' }}
            HeaderComponent={
                <Header type={type} />
            }
            FooterComponent={
                <Footer type={type} data={data} otherData={type === 'login' ? {
                    rut_number,
                } : {}} />
            }
            withHandle={false}
            overlayStyle={{ backgroundColor: 'rgba(29, 33, 41, 0.2)' }}
        >
            {children ? children : <Content data={data} modalizeRef={modalizeRef} type={type}
                otherData={type === 'login' ? {
                    rut_number,
                    setRut_number
                } : {}} />}
        </Modalize>
    );
}
function Header({ type, data }) {
    switch (type) {
        case 'login':
            return (
                <View style={{ flex: 0, height: 35, backgroundColor: Colors.Primary, borderRadius: 10 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <Texto style={{ fontWeight: '300', lineHeight: 70, letterSpacing: 0.828029 }} typeFamily="latoLightItalic" colorLabel="white" size={24.4245}>ALL<Texto colorLabel="white" style={{ fontWeight: '900', letterSpacing: 0.828029 }} Bold size={24.4245}>PAY</Texto></Texto>
                    </View>
                </View>
            )
        default:
            return (
                <View style={{ marginLeft: 12, marginTop: 8 }}>
                    <Texto>hola</Texto>
                </View>)
            break
    }
}
function Footer({ type, data, otherData }) {
    const API=useAPI()
    const { rut_number } = otherData
    const pin = `${data?.pin[0].value}${data?.pin[1].value}${data?.pin[2].value}${data?.pin[3].value}`
    const HandleLogin = () => {
        API.PostAPI.login({ pin, rut_number}, (props) => {
            if (props === true){
                RootNavigation.navigate('App')
            }
        })
    }
    switch (type) {
        case 'login':
            return (
                <View style={{ flex: 0.4, marginLeft: 15, marginRight: 15, paddingLeft: 12, paddingRight: 12 }}>
                    <Button label="Entrar" onPress={() => HandleLogin()} />
                </View>
            )
        default:
            return (
                <View style={{}}>
                </View>)
            break
    }

}
function Content(props) {
    const { type, modalizeRef, haveFinger, data, otherData } = props

    switch (type) {
        case 'login':
            return (<Login data={data} otherData={otherData} />)
        default:
            return (
                <></>
            )

    }
}
function Login({ otherData }) {
    const { rut_number, setRut_number } = otherData
    return (<Block style={{ display: 'flex', flex: 1, margin: 12, borderRadius: 12}}>
        <Image source={require('../Assets/CardHome.png')} style={{ height: 69, width: 82, top: 10, position: 'absolute', right: 0 }} />
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ width: vw(72) }}>
                <Texto>Ingresa Tu Rut</Texto>
                <TextInput borderBottomWidth backgroundColor={'transparent'} value={rut_number} onChangeText={(e) => setRut_number(e)} placeholder="Ingresa tu RUT" />
            </View>
            <Texto>Password</Texto>
            <TextInput  borderBottomWidth backgroundColor={'transparent'} value={'*********'} placeholder="Password" />
        </View>
    </Block>)
}