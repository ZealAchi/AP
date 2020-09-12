/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useState, useContext, useEffect } from 'react';
import { View } from 'react-native';
import { ScreenContainer } from '../ScreenContainer';
import { Header } from '../../UI/Header';
import Colors from '../../UI/Colors';
import { Texto } from '../../UI/Texto';
import { ItemBank2, ItemBank } from '../../UI/ItemBank';
import { TextInput } from '../../UI/Input'
import { Block } from '../../UI/Block';
import { Button } from '../../UI/Button';
import { AlertMessage } from '../Alert';
import { DataContext } from '../../Context/Datos.Context';
import * as RootNavigation from '../../Navigations/RootNavigation';

import { useAPI } from '../../Hooks/useAPI';
import { formatNumber } from '../../Util/FormatNumber';
import { dp } from '../../UI/dist/Responsive.dev';
export function SaldoAllPay(props) {
    const { navigation, route } = props
    const API = useAPI()
    const { balances } = useContext(DataContext)
    const [monto, setMonto] = useState();
    const [type, setType] = useState()
    const [account, setAccount] = useState();
    const [message, setMessage] = useState('');
    useEffect(() => {
        if (route?.params?.amount)
            setMonto(route?.params?.amount)
    }, [route?.params?.amount])

    return (<View style={{ display: 'flex', flex: 1, backgroundColor: Colors.Secondary }}>
        
            <View style={{height: 70, marginLeft: 5, marginTop: 12, borderBottomColor: Colors.lavender, borderBottomWidth: 1 }}>
                <Header Return />
                <View style={{ justifyContent: 'center' }}>
                    <Texto colorLabel={Colors.midnightblue} size={13} Bold>Agregar saldo AllPay</Texto>
        
            </View>
        </View>
        <View style={{ height: 65, justifyContent: 'center' }}>
            <ItemBank2 style={{ backgroundColor: 'transparent' }} allpay data={{ img: require('../../Assets/AP.png'), balance: balances?.AllPay?.amount }} />
        </View>
        <View style={{ height: 220, backgroundColor: Colors.Primary, alignItems: 'center' }}>
            <Texto size={13} colorLabel="white">¿Cuánto dinero deseas cargar?</Texto>
            <View style={{ width: 256, height: 80, flex: 1 }}>
                <View style={{ borderBottomColor: Colors.lavender, borderBottomWidth: 1, alignItems: 'baseline' }}>
                    <TextInput placeholderTextColor="white" left sizeIcon={35}
                        icon={{ type: 'Foundation', name: 'dollar', color: 'white' }}
                        keyboardType="numeric"
                        maxLength={13}
                        styleText={[monto ? { fontSize: 30, right: 12, fontWeight: '700' } : { fontSize: 22.8, right: 12, fontWeight: '700' },
                        { textAlign: 'center', color: 'white' }]} style={{ backgroundColor: 'transparent' }}
                        value={monto} onChangeText={(e) => setMonto(
                            formatNumber.new(e.replace(/\D/g, '')))
                        } placeholder="Ingresa el monto" />
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 24 }}>
                    <Texto size={13} colorLabel="white">¿Desde qué cuenta deseas cargar?</Texto>
                </View>
            </View>
            <View style={{ position: 'absolute', height: 90, width: '100%', backgroundColor: 'transparent', bottom: -45, alignItems: 'flex-end', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ItemBank onPress={() => {
                    navigation.push('MyAccounts', { setSelect: setAccount, type: 'addBalance', monto })
                }} style={{ zIndex: 1, elevation: 2, width: '95%', height: 62, borderRadius: 12 }} data={{ nombre: 'WebPay' }} noSaldo />
            </View>
        </View>
        <View style={{ flex: 1, backgroundColor: Colors.Secondary, flexDirection: 'column-reverse', zIndex: -12, alignItems: 'center' }}>
            <Button onPress={() => {
                if (monto) {
                    const newMonto = (monto[0] === '0' ? monto.substring(1) : monto).replace(/\D/g, '')
                    API.PostAPI.AddSaldoWebPay({ amount: JSON.parse(`${newMonto}00`) }, (link, token) => {
                        RootNavigation.navigate('WebView', {
                            link, token, type: 1
                        });
                    })
                }
                if (!monto) AlertMessage({ message: 'Debes Ingresar un monto' });
            }} styleButton={{ marginBottom: 25, width: 218, borderRadius: 18 }} label="AGREGAR SALDO" />
        </View>
    </View>)
    return (

        <ScreenContainer backgroundColor={Colors.Secondary} scrollView >
            <View style={{ marginLeft: 5, marginTop: 12, paddingBottom: 12, borderBottomColor: Colors.lavender, borderBottomWidth: 1 }}>
                <Header Return />
                <Texto colorLabel={Colors.midnightblue} size={13} Bold>Agregar saldo AllPay</Texto>
            </View>

            <ItemBank2 style={{ backgroundColor: 'transparent' }} allpay data={{ img: require('../../Assets/AP.png'), balance: balances?.AllPay?.amount }} />

            <View style={{ height: 191.97, display: 'flex', alignItems: 'center', backgroundColor: Colors.Primary, paddingTop: 15 }}>
                <Texto size={13} colorLabel="white">¿Cuánto dinero deseas cargar?</Texto>
                <View style={{ width: 256, height: 80, flex: 1 }}>
                    <View style={{ borderBottomColor: Colors.lavender, borderBottomWidth: 1, alignItems: 'baseline' }}>
                        <TextInput placeholderTextColor="white" left sizeIcon={35}
                            icon={{ type: 'Foundation', name: 'dollar', color: 'white' }}
                            keyboardType="numeric"
                            maxLength={13}
                            styleText={[monto ? { fontSize: 30, right: 12, fontWeight: '700' } : { fontSize: 22.8, right: 12, fontWeight: '700' },
                            { textAlign: 'center', color: 'white' }]} style={{ backgroundColor: 'transparent' }}
                            value={monto} onChangeText={(e) => setMonto(
                                formatNumber.new(e.replace(/\D/g, '')))
                            } placeholder="Ingresa el monto" />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Texto size={13} colorLabel="white">¿Desde qué cuenta deseas cargar?</Texto>
                    </View>
                </View>
            </View>
            <Block style={{ backgroundColor: Colors.Secondary }}>
                <View style={{ height: 90, width: '100%', backgroundColor: 'transparent', marginTop: -45, alignItems: 'flex-end', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ItemBank onPress={() => {
                        navigation.push('MyAccounts', { setSelect: setAccount, type: 'addBalance', monto })
                    }} style={{ zIndex: 1, elevation: 2, width: '95%', height: 62, borderRadius: 12 }} data={{ nombre: 'WebPay' }} noSaldo />
                </View>

                <View style={{ display: 'flex', bottom: 12, justifyContent: 'center', alignItems: 'center', marginTop: '70%' }}>
                    <Button onPress={() => {
                        if (monto) {
                            const newMonto = (monto[0] === '0' ? monto.substring(1) : monto).replace(/\D/g, '')
                            API.PostAPI.AddSaldoWebPay({ amount: JSON.parse(`${newMonto}00`) }, (link, token) => {
                                RootNavigation.navigate('WebView', {
                                    link, token, type: 1
                                });
                            })
                        }
                        if (!monto) AlertMessage({ message: 'Debes Ingresar un monto' });
                    }} styleButton={{ width: 218, borderRadius: 18 }} label="AGREGAR SALDO" />
                </View>
            </Block>

        </ScreenContainer>
    );
}
