/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, { useState, useContext, useEffect } from 'react'
import { vh, vw } from 'react-native-css-vh-vw'
import { View, Pressable, BackHandler, Alert, Dimensions, StatusBar } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Texto } from '../UI/Texto'
import { ScreenContainer } from '../Components/ScreenContainer'
import { DataContext } from '../Context/Datos.Context'
import { useAPI } from '../Hooks/useAPI'
import { FingerPrint } from '../Components/Biometric'
import Colors from '../UI/Colors'
// import { useLocalStorage } from '../Hooks/useLocalStorage'
import { Modal } from '../Components/Modal'
import { ModalContext } from '../Context/Modal.Context'
import { Huellero } from '../Util/Finger'
import { LoadingContext } from '../Context/Load.Context'
import { AlertMessage } from '../Components/Alert'
import { formatNumber } from '../Util/dist/formatNumber.dev'
import { dp } from '../UI/dist/Responsive.dev'
import AsyncStorage from '@react-native-community/async-storage'



export function EnterYourPin(props) {
    const { navigation, route } = props

    const { changeStatus } = useContext(ModalContext)
    // const { state, withFinger, newPassword, updateNewPassword, getNewUser, isNewUser, password, token } = useContext(DataContext)
    const { state, withFinger, newPassword, updateNewPassword, getNewUser, isNewUser, password, pagarWhats, setPagarWhats, token } = useContext(DataContext)

    const Numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [showFinger,setShowFinger]=useState(false)
    const API = useAPI()
    const [pin, setPin] = useState([])
    const [pin_old, set_Pin_old] = useState()
    const [pinNewUser, setPinNewUser] = useState()
    const LoadingCtx = useContext(LoadingContext)

    const type = pagarWhats?.type ? pagarWhats?.type : route?.params?.type
    const data = pagarWhats?.data ? pagarWhats?.data : route.params?.data
    const nextFunction = pagarWhats?.nextFunction
    
    const getTokenX = async () => {
        let token = await AsyncStorage.getItem('@App:tokenX');
        return token
    }


    useEffect(() => {
        setTimeout(function () {
            if (LoadingCtx.Loading === true) {
                LoadingCtx.LoadingFalse()
                setShowFinger(true)
            }
        }, 1000)
    }, [])
    const sendArrayOnlyFinger = () => {
        WalletSend({ ...data, amount: JSON.parse(`${data.amount}00`) })
    }

    function addToPing(value) {
        if (pin.length === 4) { } else {
            setPin([...pin, { value, key: Date.now() }])
        }
    }
    // nextAction
    const WalletSend = async (data) => {
        const token = await getTokenX()

        API.PostAPI.login({ pin: password }, (props) => {
            if (props === true) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'History',params:{type: 'pagar'}}],
                });
            }
            setPin([])
        })
        API.PostAPI.WalletSend(data, (isTrue) => {
           
            if (isTrue) {
                nextFunction()
                // navigation.navigate('History', {
                //     type: 'pagar',
                // })
            } else {
                setTimeout(() => {
                }, 5500)
            }
        }, 'payUser', JSON.parse(token))
    }

    useEffect(() => {

        if (pin.length == 4) {
            const NewData = { pin: `${pin[0].value}${pin[1].value}${pin[2].value}${pin[3].value}` }
            const pinUpdate = `${pin[0].value}${pin[1].value}${pin[2].value}${pin[3].value}`

            if (type === "transfer" || type === "transferWT") {
                if (pinUpdate === password) {
                    if ("transferWT" === type) {
                        WalletSend({ ...data, amount: JSON.parse(`${data.amount}00`) })
                    } else {
                        route.params.nextAction()
                        console.log('rik')
                    }
                } else {
                    AlertMessage({ message: "Tu Pin es incorrecto." })
                }
            }
            else
                if (isNewUser === true) {
                    if (pinNewUser) {
                        if (pinUpdate === pinNewUser) {
                            API.PostAPI.ChangePin({ pin_old: password, pin: pinNewUser }, (props) => {
                                if (props === true) {
                                    getNewUser(false)
                                    // navigation.navigate('App')
                                    navigation.replace('App')
                                } else {
                                    setPin([])
                                    set_Pin_old()
                                }
                            }, token)
                        } else {
                            AlertMessage({ message: "Tu Pin no coincide." })
                            setPinNewUser()
                            setPin([])
                        }
                    } else {
                        setPinNewUser(`${pin[0].value}${pin[1].value}${pin[2].value}${pin[3].value}`)
                        setPin([])
                    }
                }
                else if (newPassword === false) {
                    if (state.usuarioRUT === null) {
                        changeStatus(true)
                    }
                    else
                        API.PostAPI.login({ ...NewData }, (props) => {
                            if (props === true) {
                                navigation.replace('App')
                            }
                            setPin([])
                        })
                } else {
                    if (pin_old) {
                        API.PostAPI.ChangePin({ pin_old, pin: pinUpdate }, (props) => {
                            if (props === true) {
                                navigation.pop()
                                navigation.replace('App')
                            } else {
                                setPin([])
                                set_Pin_old()
                            }
                        })
                    } else {
                        set_Pin_old(pinUpdate)
                        setPin([])
                    }
                }
        }
    }, [pin])

    function borrar() {
        let Newdata = pin
        Newdata.pop()
        setPin([...Newdata])
    }

    useEffect(() => {

        if (type === "transfer"||type === "transferWT" ) {

            const backAction = () => {
                Alert.alert("AllPay", " ¿Estás seguro que quieres cancelar la tranferencia?", [
                    {
                        text: "Cancelar",
                        onPress: () => null,
                        style: "cancel"
                    },
                    {
                        text: "SI", onPress: () => {
                            navigation.pop();
                            nextFunction&&nextFunction()
                            // route.params?.cancel();
                        }
                    }
                ]);
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
            return () => backHandler.remove();
        } else
            if (newPassword) {
            } else {
                const backAction = () => {
                    Alert.alert("AllPay", " ¿Estás seguro que quieres salir de la app?", [
                        {
                            text: "Cancel",
                            onPress: () => null,
                            style: "cancel"
                        },
                        { text: "YES", onPress: () => BackHandler.exitApp() }
                    ]);
                    return true;
                };

                const backHandler = BackHandler.addEventListener(
                    "hardwareBackPress",
                    backAction
                );

                return () => backHandler.remove();
            }
    }, [pagarWhats]);
    var re = /\_/g;
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor(Colors.Primary)
            StatusBar.setBarStyle('dark-content')
        });
        return unsubscribe;
    }, [navigation])

    return (
        <ScreenContainer backgroundColor={Colors.Primary} barBackgroundColor={Colors.Secondary} >
            {state.usuarioRUT !== null ?
                newPassword === false && withFinger &&showFinger&& <Huellero type={
                    type === "transfer" || type === "transferWT" ? 'transfer' : 'login'} nextAction={type === "transferWT" ? sendArrayOnlyFinger : route.params?.nextAction} />
                : <Modal data={{ pin, setPin: () => setPin([]) }} type='login' />}
            <View style={{ alignItems: 'center', height: dp(.8545) }}>
                <View style={{ display: 'flex', flex: 0.3, flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}><Ionicons onPress={() =>{nextFunction&&nextFunction(); navigation.pop()}} style={{ marginLeft: 12 }} name="ios-arrow-back" size={dp(0.08)} color="white" /></View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <Texto style={{ fontWeight: '300', lineHeight: 70, letterSpacing: 0.828029 }} typeFamily="latoLightItalic" colorLabel="white" size={dp(.07)}>ALL<Texto colorLabel="white" style={{ fontWeight: '900', letterSpacing: 0.828029 }} Bold size={dp(.07)}>PAY</Texto></Texto>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
                {type === "transfer" || type === "transferWT" && <Texto style={{ marginBottom: 12 }} colorLabel="white" size={dp(.045)}>{data?.amount && `Estas a punto de transferir`}</Texto>}
                {type === "transfer" || type === "transferWT" && <Texto style={{ marginBottom: 12 }} colorLabel="white" size={dp(.065)}>{data?.amount && `$${formatNumber.new(data?.amount)}`}</Texto>}
                {type === "transfer" || type === "transferWT" && <Texto style={{ marginBottom: 50 }} colorLabel="white" size={dp(.045)}>{data?.user && `a ${data?.user.replace(re, ' ')}`}</Texto>}
                <Texto colorLabel="white" size={dp(0.05)}>
                    {isNewUser !== true && pin_old ? 'Ingresa tu nuevo PIN' : isNewUser !== true && 'Ingresa tu PIN'}
                    {isNewUser && !pinNewUser ? 'Ingresa un  PIN para AllPay' : isNewUser && 'Confirma tu PIN'}
                </Texto>
                {type === "transfer" || type === "transferWT" && !data?.amount && <Texto colorLabel="white" size={19}>{'para confirmar la transferencia'}</Texto>}
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 12 }}>
                    {[1, 2, 3, 4].map((value, i) => {
                        return <View key={i} style={{ backgroundColor: (pin.length) >= value ? 'white' : 'transparent', borderColor: 'white', width: 20, height: 20, borderRadius: 40, borderWidth: 1, marginRight: 8, marginLeft: 8 }} />
                    })}
                    <View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1.2, height: dp(.97) }}>
                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', marginBottom: 12 }}>
                    {Numbers.map((value) => {
                        return (
                            <View key={value} style={{ position: 'relative', width: '30.3%', height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <Pressable onPress={() => addToPing(value)} style={{ width: 60, height: 60, borderRadius: 50, justifyContent: 'center' }}>
                                    <Texto size={dp(0.15)} colorLabel="white" style={{ textAlign: 'center' }}>{value}</Texto>
                                </Pressable>
                            </View>
                        )
                    })}
                </View>
                <View style={{ flex: .9, display: 'flex' }}>
                    <View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                        <View style={{ display: 'flex', flex: 1, alignItems: 'flex-end' }}>
                            <Pressable
                                onPress={() => borrar()}>
                                <FontAwesome5 name={'backspace'} size={dp(0.15)} color="#FFF" />
                            </Pressable>
                        </View>
                        <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                            <Pressable onPress={() => addToPing(0)} style={{ width: 60, height: 60, borderRadius: 50, justifyContent: 'center' }}>
                                <Texto colorLabel="white" size={dp(0.15)} style={{ textAlign: 'center' }}>0</Texto>
                            </Pressable>
                        </View>
                        <View style={{ flex: 1 }}></View>
                    </View>
                    <View style={{ flex: 1 }}>
                        {!(newPassword || isNewUser) && <Texto colorLabel="white" size={dp(0.055)} style={{ textAlign: 'center' }}>{type === "transfer" || type === "transferWT" ? 'Cancelar' : 'Olvidé mi PIN'}</Texto>}
                    </View>
                </View>
            </View>
        </ScreenContainer>
    )
}