/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useState, useEffect, useContext } from 'react'
import { Text, View, Alert } from 'react-native';

import { RNCamera } from 'react-native-camera';
import { ScreenContainer } from '../../ScreenContainer'
import Colors from '../../../UI/Colors'

import { Texto } from '../../../UI/Texto';
import { Button } from '../../../UI/Button';
import { Header } from '../../../UI/Header';
import { ItemBank, ItemBank2 } from '../../../UI/ItemBank';
import { Block } from '../../../UI/Block';
import Base64 from '../../../Util/Base64';
import { useAPI } from '../../../Hooks/useAPI';
import { DataContext } from '../../../Context/Datos.Context';
import { AlertMessage } from '../../Alert';
export function PagarQR(props) {
    const { balances } = useContext(DataContext)
    const { navigation } = props
    const API = useAPI()
    const [selectBank, setSelectBank] = useState()
    const [state, setState] = useState()
    const [scanned, setScanned] = useState(false)
    // const WalletSend = (data) => {
    //     API.PostAPI.WalletSend(data, (isTrue) => {
    //         if (isTrue) {
    //             navigation.replace('History', {
    //                 type: 'pagar',
    //             })
    //         } else {
    //             navigation.pop()
    //             setTimeout(() => {
    //                 setScanned(false)
    //                 setState();
    //             }, 5500)
    //         }
    //     }, 'payUser')
    // }
    useEffect(() => {
        if (state) {
            try {
                const Arrayv = JSON.parse(state)

                const oldMonto = Arrayv.amount
                const oldArray = { ...Arrayv, amount: JSON.parse(`${Arrayv.amount}`) }
                console.log(oldArray)
                if (oldArray?.to_uuid) {
                    if (parseInt(oldMonto) > parseInt(balances?.AllPay?.amount.replace(/\D/g, ''))) {
                        AlertMessage({ message: "No tienes saldo suficiente." })
                        setScanned(false)
                    } else {
                        if (oldMonto < 1000) {
                            AlertMessage({ message: "El monto mínimo a transferir es de $1.000." })
                        } else {
                            navigation.push('EnterYourPin', {
                                type: 'transfer',
                                data: { ...oldArray },
                                cancel: () => {
                                    setScanned(false)
                                    setState();
                                    navigation.pop();
                                },
                                nextAction: (isTrue) => {
                                    if (!isTrue) {
                                        navigation.pop()
                                        setTimeout(() => {
                                            setScanned(false)
                                            setState();
                                        }, 5500)
                                    }
                                }
                            })
                        }
                    }
                }
                else {
                    alert("Codigo qr no valido")
                    setScanned(false)
                }
            } catch (error) {
                console.log(error, 'error')
                alert("Codigo qr no valido")
                setScanned(false)
            }


        }
    }, [state])
    const PendingView = () => (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Texto>Cargando...</Texto>
        </View>
    );

    const user = {
        first_name: "Jose Antonio",
        last_name: "Padre Garcia",
        earned: '213'
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setScanned(false)
        });
        return unsubscribe;
    }, [navigation])

    return (
        <ScreenContainer barBackgroundColor={Colors.Primary} backgroundColor={Colors.Primary}>
            <View style={{ marginTop: 12, paddingLeft: 12, paddingRight: 12 }}>
                <Header Return color={Colors.Secondary} />
            </View>
            <View style={{ flex: 0.25, display: 'flex', alignItems: 'center' }}>
                <Texto size={13} colorLabel="white">¿Desde qué cuenta deseas transferir?</Texto>
            </View>
            <Block>
                <View style={{ height: 90, width: '100%', backgroundColor: 'transparent', position: 'absolute', marginTop: -55, alignItems: 'flex-end', zIndex: 1, elevation: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <ItemBank2 /*onPress={() => navigation.navigate('MyAccounts', { setSelect: setAccount, type })}*/ allpay style={{ position: 'absolute', marginBottom: -70, zIndex: 99, elevation: 2, width: '95%', height: 75, borderRadius: 12 }} title={'cuentas'} data={{ img: require('../../../Assets/AP.png'), balance: balances?.AllPay?.amount }} />
                </View>
                <RNCamera googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.DATA_MATRIX} style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}

                    onBarCodeRead={(e) => {
                        if (scanned === false) {
                            setScanned(true)
                            setState(e.data)
                        }
                    }}

                    androidCameraPermissionOptions={{
                        title: 'Permiso para usar la cámara',
                        message: 'Necesitamos su permiso para usar su cámara',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                >
                    {({ camera, status }) => {
                        if (status !== 'READY') return <PendingView />;
                        return (<></>);
                    }}
                </RNCamera>
            </Block>
        </ScreenContainer>
    )
}