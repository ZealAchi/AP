/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useState, useEffect, useContext } from 'react'
import { View, Pressable, BackHandler } from 'react-native'
import { ScreenContainer } from '../../ScreenContainer'
import { Texto } from '../../../UI/Texto'
import { TextInput } from '../../../UI/Input'
import Colors from '../../../UI/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Block } from '../../../UI/Block'
import { ListBank } from '../../../UI/ListBank'
import { Button } from '../../../UI/Button'
import { ItemBank, ItemBank2 } from '../../../UI/ItemBank'
import { Header } from '../../../UI/Header'
import { AlertMessage } from '../../Alert'
import { ItemUser } from '../../../UI/ItemUser'
import { DataContext } from '../../../Context/Datos.Context'
import { useAPI } from '../../../Hooks/useAPI'
import { formatNumber } from '../../../Util/FormatNumber'
import { dp } from '../../../UI/dist/Responsive.dev'
import { ScrollView } from 'react-native-gesture-handler'

export function Pagar(props) {
    const API = useAPI()
    const { navigation, route } = props
    const { balances } = useContext(DataContext)
    const [disabled, setDisabled] = useState(false)
    const [monto, setMonto] = useState()
    const [account, setAccount] = useState()
    const Currency = '152'
    const [message, setMessage] = useState('')



    const { params } = route
    const { type, data, params: paramsP } = params

    const user = {
        first_name: data?.givenName,
        last_name: data?.familyName,
        earned: '213',
        uuid: data?.uuid
    }
    const disableNow = () => setDisabled(false)
    const payUser = () => {
        try {
            const newMonto = (monto[0] === '0' ? monto.substring(1) : monto).replace(/\D/g, '')
            const a = parseInt(newMonto)
            const b = parseInt(balances?.AllPay?.amount.replace(/\D/g, ''))

            if (a > b) {

                // console.log( a>b, `${a}>${b} con variables`)
                // console.log(newMonto>balances?.AllPay?.amount.replace(/\D/g, ''),'Default')
                AlertMessage({ message: "No tienes saldo suficiente." })
                disableNow()

            } else
                if (newMonto < 1000) {
                    AlertMessage({ message: "El monto mínimo a transferir es de $1.000." })
                    disableNow()
                }
                else {
                    const data = { amount: JSON.parse(`${newMonto}00`), currency: JSON.parse(Currency), to_uuid: user.uuid }
                    const WalletSend = () => {
                        API.PostAPI.WalletSend(data, (isTrue) => {
                            if (isTrue) {
                                navigation.pop()
                                navigation.pop()
                                navigation.navigate('PagarHome', { monto: undefined, message: undefined })
                                navigation.navigate('History', {
                                    type: 'pagar',
                                })
                            } else {
                                navigation.pop()
                                return disableNow()
                            }
                        }, 'payUser')
                    }
                    navigation.push('EnterYourPin', { type: 'transfer', cancel: () => { disableNow() }, nextAction: WalletSend })
                }
        } catch (error) {
            console.log(error, 'error')
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            disableNow()
        });
        return unsubscribe;
    }, [navigation])



    useEffect(() => {
        const backAction = () => {
            setMonto(undefined)
            setMessage(undefined)
            navigation.navigate('PagarHome', { monto: undefined, message: undefined })
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [])
    useEffect(() => {
        setMonto(paramsP.monto)
        setMessage(paramsP.message)
    }, [paramsP])
    return <View style={{ flex: 1, display: 'flex' }}>
        <View style={{ height: 220, backgroundColor: Colors.Tertiary }}>
            <View style={{ marginTop: 12, paddingLeft: 12, paddingRight: 12, height: dp(0.1) }}>
                <Header Return color={Colors.Secondary} onPressBack={() => { setMonto(undefined); setMessage(undefined); navigation.pop(); }} />
            </View>
            <View style={{ display: 'flex', alignItems: 'center', backgroundColor: Colors.Tertiary, flex: 1 }}>
                <Texto size={13} colorLabel="white">¿Cuánto quieres transferir?</Texto>
                <View style={{ width: dp(0.7)/*256*/, height: 85, flex: 1, }}>
                    <View style={{ borderBottomColor: Colors.lavender, borderBottomWidth: 1, alignItems: 'baseline' }}>
                        <TextInput placeholderTextColor="white" left sizeIcon={35}
                            icon={{ type: 'Foundation', name: 'dollar', color: 'white' }}
                            keyboardType="numeric"
                            maxLength={13}
                            styleText={[monto ? { fontSize: 30, right: 12, fontWeight: '700' } : { right: 8, fontSize: dp(0.06) /*25*/ },
                            { textAlign: 'center', color: 'white', }]} style={{ backgroundColor: 'transparent' }}
                            value={monto} onChangeText={(e) => setMonto(
                                formatNumber.new(e.replace(/\D/g, '')))
                            } placeholder="Ingresa el monto" />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 24 }}>
                        <Texto size={13} colorLabel="white">¿Desde qué cuenta deseas transferir?</Texto>
                    </View>
                </View>
            </View>
            <View style={{position:'absolute',height: 90, width: '100%', backgroundColor: 'transparent', bottom: -45, alignItems: 'flex-end', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ItemBank2 onPress={() => navigation.navigate('MyAccounts', { setSelect: setAccount, type })} allpay style={{ zIndex: 1, elevation: 2, width: '95%', height: 75, borderRadius: 12 }} title={'cuentas'} data={{ img: require('../../../Assets/AP.png'), balance: balances?.AllPay?.amount }} />
                </View>

        </View>

        <View style={{ flex: 1, backgroundColor: Colors.Secondary, flexDirection: 'column-reverse' ,zIndex:-12,alignItems:'center'}}>
            <Button disabled={disabled} onPress={() => {
                if (monto) {
                    setDisabled(true)
                    payUser()
                }
                if (!monto) AlertMessage({ message: "Debes Ingresar un monto" })
            }} styleButton={{ width: 218, borderRadius: 18,marginBottom:15, }} label="TRANSFERIR" />
            <TextInput style={{
                width: '9%', height: 115.48, textAlignVertical: 'top',
                marginLeft:28,
                marginRight:28,
                marginBottom:25,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 2,
                borderRadius: 12
            }} multiline={true} value={message} onChangeText={(e) => setMessage(e)} numberOfLines={10} placeholder="Motivo" />
        </View>
    </View>

}