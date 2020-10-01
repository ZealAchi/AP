/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useState, useContext, useEffect } from 'react';
import { View,StyleSheet } from 'react-native';
import { ScreenContainer } from '../ScreenContainer';
import { Header } from '../../UI/Header';
import Colors from '../../UI/Colors';
import { Texto } from '../../UI/Texto';
import { ItemBank2, ItemBank } from '../../UI/ItemBank';
import { TextInput } from '../../UI/Input'
// import { Block } from '../../UI/Block';
import { Button } from '../../UI/Button';
import { AlertMessage } from '../Alert';
import { DataContext } from '../../Context/Datos.Context';
import * as RootNavigation from '../../Navigations/RootNavigation';

import { useAPI } from '../../Hooks/useAPI';
import { formatNumber } from '../../Util/FormatNumber';
import { LoadingContext } from '../../Context/Load.Context';
import { InputCoordinates } from '../../UI/InputCoordinates';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { dp } from '../../UI/dist/Responsive.dev';
export function SaldoAllPay(props) {
    const { navigation, route } = props
    const { params } = route

    const API = useAPI()
    const { balances } = useContext(DataContext)
    const [monto, setMonto] = useState();
    const [account, setAccount] = useState(0);
    const [message, setMessage] = useState();
    const [coordenadas, setCoordenadas] = useState()
    useEffect(() => {
        if (route?.params?.amount)
            setMonto(route?.params?.amount)
    }, [route?.params?.amount])



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
                navigation.navigate('MessagesT', { kindOfAnswer: 2 });

            }, 5000)
        } else { AlertMessage({ message: "Debes ingresar las coordenadas para realizar la transferencia." }) }
    }


    return (<View style={{ display: 'flex', flex: 1, backgroundColor: Colors.Secondary }}>
        <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollContainer} //style changed to contentContainerStyle
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
        <View style={{ height: 70, marginLeft: 5, marginTop: 12, borderBottomColor: Colors.lavender, borderBottomWidth: 1 }}>
            <Header Return />
            <View style={{ justifyContent: 'center' }}>
                <Texto colorLabel={Colors.midnightblue} size={13} Bold>Agregar saldo AllPay</Texto>
            </View>
        </View>
        <View style={{ height: 65, justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
            <ItemBank2 nocuenta style={{ backgroundColor: 'transparent' }} allpay data={{ img: require('../../Assets/AP.png'), balance: balances?.AllPay?.amount }} />
        </View>
        <View style={{ height: 195, backgroundColor: Colors.Primary, alignItems: 'center' }}>
            <Texto style={{ marginTop: 12 }} size={13} colorLabel="white">¿Cuánto dinero deseas cargar?</Texto>
            <View style={{ width: 265, height: 80, flex: 1 }}>
                <View style={{ borderBottomColor: Colors.lavender, borderBottomWidth: 1, alignItems: 'baseline' }}>
                    <TextInput placeholderTextColor="white" left sizeIcon={35}
                        icon={{ type: 'Foundation', name: 'dollar', color: 'white' }}
                        keyboardType="numeric"
                        maxLength={13}
                        styleText={[monto ?
                            //    { fontSize: 30, right: 12, fontWeight: '700' } : { right: 8, fontSize: dp(0.06) },
                            { fontSize: 30, right: 12, fontWeight: '700' } : { fontSize: 22.8, right: 12, fontWeight: '700' },
                        { textAlign: 'center', color: 'white' }]} style={{ backgroundColor: 'transparent' }}
                        value={monto} onChangeText={(e) => setMonto(
                            formatNumber.new(e.replace(/\D/g, '')))
                        } placeholder="Ingresa el monto" />
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 45 }}>
                    <Texto size={13} colorLabel="white">¿Desde qué cuenta deseas cargar?</Texto>
                </View>
            </View>
            <View style={{ position: 'absolute', height: 90, width: '100%', backgroundColor: 'transparent', bottom: -45, alignItems: 'flex-end', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ItemBank onPress={() => {
                    navigation.push('MyAccounts', { setSelect: setAccount, type: 'addBalance', monto })
                }} style={{ zIndex: 1, elevation: 2, width: '95%', height: 62, borderRadius: 12 }} data={{
                    withBanlance: ((account === 0) || (account === 3) || (account === 4) || (account === 5) || (account === 6) || (account === 7)) ?false:true,
                    nombre: account === 0 ? "Webpay" : account === 2 ? "Itaú" :
                        account === 1 ? "Santander" :
                            account === 4 ? "Paypal" :
                                account === 5 ? "Crypto" :
                                    account === 6 ? "Servipag" :
                                        account === 7 ? "Caja Vecina" : "Webpay",
                    img:
                        account === 2 ? require('../../Assets/logos/BancoItau.jpg') :
                            account === 1 ? require('../../Assets/logos/Santanderx.png') :
                                account === 4 ? require('../../Assets/PayPal.png') :
                                    account === 5 ? require('../../Assets/Crypto.png') :
                                        account === 6 ? require('../../Assets/Servipag.png') :
                                            account === 7 ? require('../../Assets/CajaVecina.png')
                                                : require('../../Assets/AP.png')
                    , balance: account === 0 ? balances?.AllPay?.amount :
                        account === 1 ? balances?.Santander?.amount :
                            account === 2 ? balances?.Itau?.amount
                                : balances?.AllPay?.amount,
                    // withBanlance:true//((account === 0) || (account === 3) || (account === 4) || (account === 5) || (account === 6) || (account === 7)) ?fasle:true
                }} />
            </View>
        </View>

        <View style={{ flex: 1, backgroundColor: Colors.Secondary, flexDirection: 'column-reverse', zIndex: -12, alignItems: 'center' }}>

            <Button onPress={() => {
                if (monto) {
                    const newMonto = (monto[0] === '0' ? monto.substring(1) : monto).replace(/\D/g, '')
                    if (account === 4 || account === 5 || account === 6 || account === 7) {
                    } else if (account === 1 || account === 2) {
                        fakepay()
                    } else {
                        API.PostAPI.AddSaldoWebPay({ amount: JSON.parse(`${newMonto}00`) }, (link, token) => {
                            RootNavigation.navigate('WebView', {
                                link, token, type: 1
                            });
                        })
                    }

                }
                if (!monto) AlertMessage({ message: 'Debes Ingresar un monto' });
            }} styleButton={{ marginBottom: 25, width: 218, borderRadius: 18 }} label="AGREGAR SALDO" />

            {(account === 1 || account === 2) && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <InputCoordinates setCoordenadas={setCoordenadas} />
                </View>
            )}
        </View>
        </KeyboardAwareScrollView>
    </View>)
}


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