/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useState, useEffect, useContext, useRef } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet, View, Image, TextInput as RNTextInput, ScrollView, BackHandler, Dimensions, StatusBar, KeyboardAvoidingView, Pressable } from 'react-native'
import { Texto } from '../../../UI/Texto'
import { TextInput } from '../../../UI/Input'
import Colors from '../../../UI/Colors'
import { Button } from '../../../UI/Button'
import { ItemBank, ItemBank2 } from '../../../UI/ItemBank'
import { Header } from '../../../UI/Header'
import { AlertMessage } from '../../Alert'
import { ItemUser } from '../../../UI/ItemUser'
import { DataContext } from '../../../Context/Datos.Context'
import { useAPI } from '../../../Hooks/useAPI'
import { formatNumber } from '../../../Util/FormatNumber'
import { dp } from '../../../UI/dist/Responsive.dev'
import { vh, vw } from 'react-native-css-vh-vw'
import { InputCoordinates } from '../../../UI/InputCoordinates'
import { LoadingContext } from '../../../Context/Load.Context'

export const Pagar = (props) => {
    const API = useAPI()
    const { navigation, route } = props
    const { balances } = useContext(DataContext)
    const [disabled, setDisabled] = useState(false)
    const [monto, setMonto] = useState()
    const [account, setAccount] = useState(0)
    const Currency = '152'
    const [message, setMessage] = useState('')
    const [coordenadas, setCoordenadas] = useState()

    const { params } = route
    const { type, data, params: paramsP } = params
    

    const user = {
        first_name: data?.givenName,
        last_name: data?.familyName,
        earned: '213',
        uuid: data?.uuid
    }
    console.log(user,'user')
    const disableNow = () => {
        setDisabled(false);

    }
    const payUser = () => {
        try {
            const newMonto = (monto[0] === '0' ? monto.substring(1) : monto).replace(/\D/g, '')
            const a = parseInt(newMonto)
            const b = parseInt(balances?.AllPay?.amount.replace(/\D/g, ''))

            if (a > b) {
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
                                    user:`${user.first_name} ${user.last_name}`
                                })
                            } else {
                                navigation.pop()
                                return disableNow()
                            }
                        }, 'payUser')
                    }
                    navigation.push('EnterYourPin', {
                        data:{ amount: JSON.parse(`${newMonto}`), currency: JSON.parse(Currency), to_uuid: user.uuid,user:`${user.first_name} ${user.last_name}` },
                        type: 'transfer', cancel: () => { disableNow(); navigation.pop(); },
                        pay: (sx) => { console.log('cuack', sx); WalletSend() },
                        nextAction: () => { navigation.pop(); return disableNow(); }
                    })
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

    const LoadingCtx = useContext(LoadingContext);

    const fakepay = () => {
        if (coordenadas.length === 6) {
            LoadingCtx.LoadingIconTrue();
            setTimeout(() => {
                LoadingCtx.LoadingFalse();
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'App' }],
                });
                navigation.navigate('MessagesT', { kindOfAnswer: 1 });

            }, 5000)
        } else { AlertMessage({ message: "Debes ingresar las coordenadas para realizar la transferencia." }) }
    }



    useEffect(() => {
        const backAction = () => {
            setMonto(undefined)
            setMessage(undefined)
            setAccount(undefined)
            navigation.navigate('PagarHome', { monto: undefined, message: undefined, account:undefined})
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
        setAccount(paramsP.account)
    }, [paramsP])
    StatusBar.setBackgroundColor(Colors.Primary)

    console.log(account,'account')

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollContainer} //style changed to contentContainerStyle
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        // justifyContent: "space-between",
                        // backgroundColor: "green",
                        flex: 1 //flex added
                    }}
                >
                    <View style={styles.imageContainer}>
                        <View style={{ height: vh(30), backgroundColor: Colors.Primary }}>
                            <View style={{ marginTop: 12, paddingLeft: 12, paddingRight: 12, height: dp(0.1) }}>
                                <Header Return color={Colors.Secondary} onPressBack={() => { setMonto(undefined); setMessage(undefined); navigation.pop(); }} />
                            </View>
                            <View style={{ display: 'flex', alignItems: 'center', backgroundColor: Colors.Primary, height: 148, }}>
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
                                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 45 }}>
                                        <Texto size={13} colorLabel="white">¿Desde qué cuenta deseas transferir?</Texto>
                                    </View>
                                </View>
                            </View>
                            <View style={{ position: 'absolute', height: 90, width: '100%', backgroundColor: 'transparent', bottom: -45, alignItems: 'flex-end', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ItemBank2 onPress={() => navigation.navigate('MyAccounts', { setSelect: setAccount, type })} allpay={account === 0?true:false} style={{ zIndex: 1, elevation: 2, width: '95%', height: 75, borderRadius: 12 }} title={'cuentas'}
                            data={{
                                            withBanlance: ((account === 0) || (account === 3) || (account === 4) || (account === 5) || (account === 6) || (account === 7)) ?false:true,
                                            noSaldo:((account === 0) || (account === 3) || (account === 4) || (account === 5) || (account === 6) || (account === 7)) ?true:false,
                                            nombre:
                                            account === 0?"AllPay":
                                            account === 1?"Santander":
                                            account === 3?"Webpay":
                                            account === 4?"Paypal":
                                            account === 5?"Crypto":
                                            account === 6?"Servipag":
                                            account === 7?"Caja Vecina":
                                            account === 2?"Itaú"
                                            :"AllPay",
                                            img:
                                                account === 2 ? require('../../../Assets/logos/BancoItau.jpg') :
                                                    account === 1 ? require('../../../Assets/logos/Santanderx.png') :
                                                        account === 4 ? require('../../../Assets/PayPal.png') :
                                                            account === 5 ? require('../../../Assets/Crypto.png') :
                                                                account === 6 ? require('../../../Assets/Servipag.png') :
                                                                    account === 7 ? require('../../../Assets/CajaVecina.png')
                                                                        : require('../../../Assets/AP.png')
                                            , balance:account === 0 ? balances?.AllPay?.amount :
                                            account === 1 ? balances?.Santander?.amount :
                                            account === 2 ? balances?.Itau?.amount
                                                : balances?.AllPay?.amount,
                                                // noSaldo:((account === 3)||(account === 4)||(account === 5)||(account === 6)||(account === 7))&&true 
                                        }} />
                                {/* <ItemBank2 onPress={() => navigation.navigate('MyAccounts', { setSelect: setAccount, type })} allpay style={{ zIndex: 1, elevation: 2, width: '95%', height: 75, borderRadius: 12 }} title={'cuentas'}
                                    data={{
                                        nombre:
                                        account === 1?"Santander":
                                        account === 3?"Webpay":
                                        account === 4?"Paypal":
                                        account === 5?"Crypto":
                                        account === 6?"Servipag":
                                        account === 7?"Caja Vecina":
                                        account === 2?"Itaú"
                                        :"AllPay",
                                        img: account === 0 ? require('../../../Assets/AP.png') :
                                            account === 1 ? require('../../../Assets/logos/Santanderx.png') :
                                            account === 2 ? require('../../../Assets/logos/BancoItau.jpg'):
                                                    account === 4 ? require('../../../Assets/PayPal.png'):
                                                    account === 5 ? require('../../../Assets/Crypto.png'):
                                                    account === 6 ? require('../../../Assets/Servipag.png'):
                                                    account === 7 ? require('../../../Assets/CajaVecina.png')
                                                    : require('../../../Assets/AP.png')
                                                    , balance:account === 0 ? balances?.AllPay?.amount :
                                                    account === 1 ? balances?.Santander?.amount :
                                                    account === 2 ? balances?.Itau?.amount
                                                        : balances?.AllPay?.amount,
                                                        noSaldo:((account === 3)||(account === 4)||(account === 5)||(account === 6)||(account === 7))&&true
                                    }} /> */}
                            </View>
                        </View>
                        <View style={{ flex: 1, zIndex: -12, alignItems: 'center', marginBottom: 18, backgroundColor: 'transparent' }}>
                            <Pressable onPress={()=>{
                            // navigation.navigate('PagarHome',)
                                            navigation.navigate('PagarHome', { monto, message, account})
                            }} style={{ marginTop: 35, height: 55, width: '95%', backgroundColor: 'transparent', marginTop: 45, borderRadius: 12 }}>
                            {/* <View > */}
                                <ItemUser height={45} data={user} />
                            {/* </View> */}
                            </Pressable>

                            {(account === 1 || account === 2) && (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <InputCoordinates setCoordenadas={setCoordenadas} />
                                </View>
                            )}
                        </View>

                    </View>
                    <View style={styles.formConstainer}>
                        <View style={{ flex: 1, backgroundColor: Colors.Secondary, flexDirection: 'column-reverse', zIndex: -12, alignItems: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'column-reverse', alignItems: 'center' }}>
                                <Button disabled={disabled} onPress={() => {
                                    if (monto) {
                                        setDisabled(true)
                                        //
                                        account === 0 ? payUser() :
                                            account === 1 ? fakepay() :
                                                account === 2 ? fakepay():
                                                    account === 3 ? ()=>{}:
                                                    account === 4 ?()=>{}:
                                                    account === 5 ? ()=>{}:
                                                    account === 6 ? ()=>{}:
                                                    account === 7 ? ()=>{}
                                                    : payUser()
                                    }
                                    if (!monto) AlertMessage({ message: "Debes Ingresar un monto" })
                                }} styleButton={{ width: vh(30), borderRadius: 18, marginBottom: 10, }} label="TRANSFERIR" />
                                <View style={{ alignItems: 'center' }}>
                                    <TextInput style={{
                                        width: '9%', height: 115.48, textAlignVertical: 'top',
                                        marginLeft: 28,
                                        paddingLeft: 12,
                                        paddingRight: 12,
                                        marginRight: 28,
                                        marginBottom: 18,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.8,
                                        shadowRadius: 2,
                                        elevation: 2,
                                        borderRadius: 12
                                    }} multiline={true} value={message} onChangeText={(e) => setMessage(e)} numberOfLines={10} placeholder="Motivo" />
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    scrollContainer: {
        backgroundColor: Colors.Secondary,
        flexGrow: 1 //added flexGrow
    },
    imageContainer: {
        // alignItems: "center",
        // justifyContent: "center",
        flex: 3, //flex added
        //   backgroundColor:'white'
    },
    formConstainer: {
        flex: 1, //flex added
        backgroundColor: Colors.Secondary
    },
});