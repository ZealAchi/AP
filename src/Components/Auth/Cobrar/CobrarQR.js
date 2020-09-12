/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useState, useEffect, useContext } from 'react'
import { View, StatusBar, Linking, KeyboardAvoidingView } from 'react-native'
import { ScreenContainer } from '../../ScreenContainer'
import { Texto } from '../../../UI/Texto'
import { TextInput } from '../../../UI/Input'
import { vh } from 'react-native-css-vh-vw'
import Colors from '../../../UI/Colors'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'


import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Block } from '../../../UI/Block'
import { ListBank } from '../../../UI/ListBank'
import { Button } from '../../../UI/Button'
import { ItemBank, ItemBank2 } from '../../../UI/ItemBank'
import { Header } from '../../../UI/Header'
import { AlertMessage } from '../../Alert'
import { formatNumber } from '../../../Util/dist/formatNumber.dev'
import { DataContext } from '../../../Context/Datos.Context'
import { ItemUser } from '../../../UI/ItemUser'
import { dp } from '../../../UI/dist/Responsive.dev'
export function CobrarQR(props) {
    const { navigation, route } = props

    const Context = useContext(DataContext)
    const { balances } = Context
    const [monto, setMonto] = useState()
    const [account, setAccount] = useState()
    const Currency = 'CLP'
    const [message, setMessage] = useState('')
    const [selectBank, setSelectBank] = useState();
    ///FUncion de obtener el primer banco

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor(Colors.Primary)
            StatusBar.setBarStyle('dark-content')
        });
        return unsubscribe;
    }, [navigation])

    // const amount='1000'
    const currency = Context.state.user.profile.currency
    const to_uuid = Context.state.user.profile.uuid
    const user = `${Context.state.user.profile?.first_name}_${Context.state.user.profile?.last_name}`
    const montoWT = !monto ? '0' : (monto[0] === '0' ? monto.substring(1) : monto).replace(/\D/g, '')
    var re = /\ /g;
    const linkWT = `whatsapp://send?text=Usa este link para transferir $${monto} a ${Context.state.user.profile?.first_name} ${Context.state.user.profile?.last_name} https://www.allpay.com/EnterYourPin/${currency}/${to_uuid}/${user.replace(re, '_')}/${montoWT}`
    //
    return (
        <View style={{ display: "flex", flex: 1 }}>
            <View style={{ height: 220, backgroundColor: Colors.Primary }}>
                <View style={{ marginTop: 12, paddingLeft: 12, paddingRight: 12, height: dp(0.1) }}>
                    <Header Return color={Colors.Secondary} />
                </View>
                <View style={{ display: 'flex', alignItems: 'center', backgroundColor: Colors.Primary, flex: 1 }}>
                    <Texto size={13} colorLabel="white">
                        {route?.params?.wt ? 'Solicita una transferencia por WhatsApp' : 'Crea un código QR para transferir'}</Texto>
                    <View style={{ width: dp(0.7), height: 85, flex: 1 }}>
                        <View style={{ borderBottomColor: Colors.lavender, borderBottomWidth: 1, alignItems: 'baseline' }}>
                            <TextInput placeholderTextColor="white" left sizeIcon={35}
                                icon={{ type: 'Foundation', name: 'dollar', color: 'white' }}
                                keyboardType="numeric"
                                maxLength={13}
                                styleText={[monto ? { fontSize: 30, right: 12, fontWeight: '700' } : { right: 8, fontSize: dp(0.06) },
                                { textAlign: 'center', color: 'white', }]} style={{ backgroundColor: 'transparent' }}
                                value={monto} onChangeText={(e) => setMonto(
                                    formatNumber.new(e.replace(/\D/g, '')))
                                } placeholder="Ingresa el monto" />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 24 }}>
                            <Texto size={13} colorLabel="white">¿En qué cuenta deseas recibir el dinero?</Texto>
                        </View>
                    </View>
                </View>
                <View style={{ position: 'absolute', height: 90, width: '100%', backgroundColor: 'transparent', bottom: -45, alignItems: 'flex-end', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ItemBank2 onPress={() => navigation.navigate('MyAccounts', { setSelect: setAccount, type })} allpay style={{ zIndex: 1, elevation: 2, width: '95%', height: 75, borderRadius: 12 }} title={'cuentas'} data={{ img: require('../../../Assets/AP.png'), balance: balances?.AllPay?.amount }} />
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: Colors.Secondary, flexDirection: 'column-reverse' ,zIndex:-12,alignItems:'center'}}>
                <Button onPress={() => {
                    if (monto) {
                        const newMonto = (monto[0] === '0' ? monto.substring(1) : monto).replace(/\D/g, '')
                        if (newMonto < 1000) {
                            AlertMessage({ message: "El monto mínimo a transferir es de $1.000." })
                        } else {
                            if (route?.params?.wt) {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'App' }],
                                });
                                Linking.openURL(linkWT)
                            } else {
                                navigation.navigate('CobrarQR2', {
                                    data: { Amount: newMonto, ToBID: selectBank, Currency, Message: message }
                                })
                            }
                        }
                    }
                    if (!monto) AlertMessage({ message: "Debes Ingresar un monto" })
                }} styleButton={{ width: 218, borderRadius: 18,marginBottom:15, }} label=
                    {route?.params?.wt ? 'Enviar WhatsApp' : 'Generar QR'} />
                <TextInput style={{
                    width: '9%', height: 115.48, textAlignVertical: 'top',
                    marginLeft: 28,
                    marginRight: 28,
                    marginBottom: 25,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 2,
                    borderRadius: 12
                }} multiline={true} value={message} onChangeText={(e) => setMessage(e)} numberOfLines={10} placeholder="Motivo" />
            </View>

        </View>
    )
    return (
        <ScreenContainer barBackgroundColor={Colors.Primary}>
            <View style={{ marginTop: 12, paddingLeft: 12, paddingRight: 12, height: dp(0.1) }}>
                <Header Return color={Colors.Secondary} />
            </View>
            <View style={{ height: dp(0.5), display: 'flex', alignItems: 'center', backgroundColor: Colors.Primary, paddingTop: 15 }}>
                <Texto size={13} colorLabel="white">
                    {route?.params?.wt ? 'Solicita una transferencia por WhatsApp' : 'Crea un código QR para transferir'}</Texto>
                <View style={{ width: dp(0.7), height: 85, flex: 1 }}>
                    <View style={{ borderBottomColor: Colors.lavender, borderBottomWidth: 1, alignItems: 'baseline' }}>
                        <TextInput placeholderTextColor="white" left sizeIcon={35}
                            icon={{ type: 'Foundation', name: 'dollar', color: 'white' }}
                            keyboardType="numeric"
                            maxLength={13}
                            styleText={[monto ? { fontSize: 30, right: 12, fontWeight: '700' } : { right: 8, fontSize: dp(0.06) },
                            { textAlign: 'center', color: 'white', }]} style={{ backgroundColor: 'transparent' }}
                            value={monto} onChangeText={(e) => setMonto(
                                formatNumber.new(e.replace(/\D/g, '')))
                            } placeholder="Ingresa el monto" />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 12 }}>
                        <Texto size={13} colorLabel="white">¿En qué cuenta deseas recibir el dinero?</Texto>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: Colors.Secondary, height: dp(1) }}>
                <View style={{ height: 90, width: '100%', backgroundColor: 'transparent', top: -45, alignItems: 'flex-end', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ItemBank2 onPress={() => navigation.navigate('MyAccounts', { setSelect: setAccount, type })} allpay style={{ zIndex: 1, elevation: 2, width: '95%', height: 75, borderRadius: 12 }} title={'cuentas'} data={{ img: require('../../../Assets/AP.png'), balance: balances?.AllPay?.amount }} />
                </View>

                <View style={{ margin: 18, display: 'flex', flex: 1, flexDirection: 'column-reverse', }}>
                    <TextInput style={{
                        width: '9%', height: 115.48, textAlignVertical: 'top',
                        top: 27,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 2,
                        borderRadius: 12
                    }} multiline={true} value={message} onChangeText={(e) => setMessage(e)} numberOfLines={10} placeholder="Motivo" />
                </View>
            </View>
            <View style={{ paddingLeft: 18, paddingTop: 18, paddingBottom: 8, paddingRight: 18, zIndex: -2, alignItems: 'center', display: 'flex', flex: 1, backgroundColor: Colors.Secondary, flexDirection: 'column-reverse' }}>
                <Button onPress={() => {
                    if (monto) {
                        const newMonto = (monto[0] === '0' ? monto.substring(1) : monto).replace(/\D/g, '')
                        if (newMonto < 1000) {
                            AlertMessage({ message: "El monto mínimo a transferir es de $1.000." })
                        } else {
                            if (route?.params?.wt) {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'App' }],
                                });
                                Linking.openURL(linkWT)
                            } else {
                                navigation.navigate('CobrarQR2', {
                                    data: { Amount: newMonto, ToBID: selectBank, Currency, Message: message }
                                })
                            }
                        }
                    }
                    if (!monto) AlertMessage({ message: "Debes Ingresar un monto" })
                }} styleButton={{ width: 218, borderRadius: 18, bottom: 0, top: 0 }} label=
                    {route?.params?.wt ? 'Enviar WhatsApp' : 'Generar QR'} />

            </View>
        </ScreenContainer>
    )
}