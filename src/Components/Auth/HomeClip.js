/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useEffect, useContext, useState } from 'react'

import { ProgressCircle } from 'react-native-svg-charts'
import { View, Image, ScrollView, TouchableOpacity, Pressable, StatusBar, StyleSheet, RefreshControl } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { Block } from '../../UI/Block'
import Colors from '../../UI/Colors'
import { Texto } from '../../UI/Texto'
import { Button } from '../../UI/Button'
import { TextInput } from '../../UI/Input'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ItemBank2 } from '../../UI/ItemBank'
import { DataContext } from '../../Context/Datos.Context'
import { useAPI } from '../../Hooks/useAPI'
// import { ContactsM } from '../../UI/Contacts'
import { ScreenContainer } from '../ScreenContainer'
import Carousel from '../../UI/Carousel'
import * as RootNavigation from '../../Navigations/RootNavigation'
// import { search } from '../../UI/contacts/searchContact'
// import { ContactsContext } from '../../Context/Contacts.Context'
// import { MyStatusBar } from '../../UI/MyStatusBar'
import { Header } from '../../UI/Header';
export function HomeClip({ navigation }) {
    const API = useAPI()
    // const { state: stateContext } = useContext(ContactsContext);
    const { token, setUser, state, getAvatar, balances, contactsMatch, obtenerPin, setState } = useContext(DataContext)
    const [buscarContacto, setBuscarContacto] = useState([])
    useEffect(() => {
        if (token !== undefined)
            try {
                API.GetAPI.getCurrentUserLogged()
            } catch (error) {
                console.log(error)
            }
    }, [token]);

    useEffect(() => {
        const uuid = state?.user?.profile?.uuid ? state.user.profile.uuid : undefined
        if (uuid) {
            API.PostAPI.getBalance()
            API.GetAPI.getAvatar(getAvatar, uuid)
            API.GetAPI.getListBanks(setState)

        }
    }, [state?.user?.profile?.uuid])

    const [imageBanks, setImageBanks] = useState([])
    
    const saveKImgBanks = (e,bank) => {
        setImageBanks([...imageBanks,{ ...bank, source: e}]);
    }
    
    


    useEffect(() => {
        API.GetAPI.getUsersCurrentReferences()
        obtenerPin()
    }, [])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor(Colors.Secondary)
            StatusBar.setBarStyle('dark-content')
            API.PostAPI.getBalance()
        });
        return unsubscribe;
    }, [navigation])

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        // setRefreshing(true);
        const as = API.PostAPI.getBalance();
        // wait(2000).then(() => setRefreshing(false));
    }, []);

    const Options = [
        { label: 'Crear un código QR para recibir plata', icon: <FontAwesome name="qrcode" color={Colors.Primary} size={23} />, onPress: () => navigation.navigate('CobrarQR') },
        { label: 'Invita a amigos y gana premios', icon: <Ionicons name="md-person-add" color={Colors.Primary} size={23} />, onPress: () => navigation.navigate('InvitaGana') },
    ]
    return (
        <ScrollView
            style={styles.scrollView}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <ScreenContainer NoMyStatusBar backgroundColor={Colors.Secondary} padding scrollView backgroundColorScrollView="white">
                <SafeAreaView style={{}}>
                    <Header />
                    <View style={{ backgroundColor: 'white', display: 'flex', marginBottom: 12, marginTop: -15 }}>
                        <Carousel data={Carousel1} height={73} />
                    </View>
                    <View style={{ width: '98%', marginBottom: 12, backgroundColor: 'white' }}>
                        <Carousel data={Carousel2} height={100} />
                    </View>

                    <View style={{ width: '98%', marginBottom: 12, backgroundColor: 'white' }}>
                        <Carousel data={Carousel3} height={110} />
                    </View>
                    <View style={{ width: '98%', display: 'flex', flexDirection: 'row', height: 101, backgroundColor: 'white', marginBottom: 12 }}>
                        <Carousel data={Carousel4} height={101} />
                    </View>
                    <View style={{ display: 'flex', flex: 0, flexDirection: 'row', marginTop: 8,marginBottom: 8 }}>

                        <Block style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                            <Button styleButton={{ borderRadius: 29, width: 151, height: 41 }} size={15} label="Movimientos" onPress={() => {
                                navigation.navigate('Movements')
                            }} />
                        </Block>
                        <Block style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                            <Button styleButton={{ borderRadius: 29, width: 151, height: 41 }} size={15} label="Notificaciones" onPress={() => {
                                navigation.navigate('Notifications')
                            }} />
                        </Block>
                    </View>
                    <Block flexDirection="column">
                        {/* <View style={{ flex: 0, flexDirection: 'row', marginBottom: 8, marginTop: 18 }}> */}
                        {/* <Block style={{ borderBottomColor: Colors.darkgray, borderBottomWidth: 2 }} /> */}
                        {/* <Block style={{ borderBottomColor: Colors.Primary, borderBottomWidth: 2 }}> */}
                        {/* <Texto size={13} Bold colorLabel={Colors.midnightblue} style={{ textAlign: 'center' }}>Contactos</Texto> */}
                        {/* </Block> */}
                        {/* <Block style={{ borderBottomColor: Colors.darkgray, borderBottomWidth: 2 }} /> */}
                        {/* </View> */}
                        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 1, marginBottom: 8 }}>
                            {/* <TextInput onChangeText={text => search(contactsMatch, text, setBuscarContacto)} borderRadius left icon={{ type: '', name: 'search' }} style={{ width: 343, height: 38, fontSize: 12, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: Colors.lavender }} placeholder="Buscar Amigos" /> */}
                        </View>
                        {/* <View style={{ display: 'flex', flex: 1, borderTopWidth: 1, borderTopColor: Colors.darkgray }}>
                            {Options.map((item, i) => {
                                return (<TouchableOpacity key={i} onPress={() => item.onPress()} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 51, borderBottomColor: Colors.darkgray, borderBottomWidth: 1 }}>
                                    <View style={{ marginLeft: 12 }}>{item.icon}</View>
                                    <View style={{ marginLeft: 12 }}><Texto size={14} colorLabel={Colors.Primary}>{item.label}</Texto></View>
                                </TouchableOpacity>)
                            })}
                        </View> */}
                        <View style={{ marginBottom: 50 }}>
                            {/* <ContactsM searchContact={buscarContacto} type={'History'} home /> */}
                        </View>
                    </Block>
                </SafeAreaView>

            </ScreenContainer>
        </ScrollView>
    )
}

const Carousel1 =
    [{
        data: (children, height) => {
            // console.log(RootNavigation,'RootNavigation')
            const { balances } = useContext(DataContext)
            return (<Pressable onPress={() => RootNavigation.navigate('MyAccounts', { withBanlance: true })} style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10, backgrounColor: 'red' }}>
                    <Block style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Texto Bold size={12}>Cuenta</Texto>
                        <Ionicons name="ios-arrow-forward" color={Colors.Texto3} size={23} />
                    </Block>
                </View>
                <View style={{ flex: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                    <View>
                        <Texto style={{ fontWeight: '300', lineHeight: 70, letterSpacing: 0.828029 }} typeFamily="latoLightItalic" colorLabel={Colors.midnightblue} size={24.4245}>ALL<Texto colorLabel={Colors.midnightblue} style={{ fontWeight: '900', letterSpacing: 0.828029 }} Bold size={24.4245}>PAY</Texto></Texto>
                    </View>
                    <View>
                        <Texto colorLabel={Colors.Texto4} size={12}>Saldo general</Texto>
                        <Texto colorLabel={Colors.Texto3} size={12}>{`$ ${balances?.AllPay?.amount ? balances?.AllPay?.amount : '0'}`}</Texto>
                    </View>
                </View>
                {children && children}
            </Pressable>)
        }
    }, {
        data: (children, height) => {
            return (
                <Pressable onPress={() => RootNavigation.navigate('SaldoAllPay')} style={{ flex: 1 }}>
                    <View style={{ display: 'flex', flex: 1 }}>
                        <View style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                            <View style={{ display: 'flex', flex: 1 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
                                    <Block style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Texto Bold size={12}>Cuenta</Texto>
                                    </Block>
                                </View>
                                <View style={{ flex: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                                    <View>
                                        <Texto style={{ fontWeight: '300', lineHeight: 70, letterSpacing: 0.828029 }} typeFamily="latoLightItalic" colorLabel={Colors.midnightblue} size={24.4245}>ALL<Texto colorLabel={Colors.midnightblue} style={{ fontWeight: '900', letterSpacing: 0.828029 }} Bold size={24.4245}>PAY</Texto></Texto>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Button onPress={() => RootNavigation.navigate('SaldoAllPay')} size={12} styleButton={{ borderRadius: 15, marginTop: 5, width: 111, height: 24 }} label="Agregar Saldo" />
                            </View>
                        </View>
                        <View>
                            {children && children}
                        </View>
                    </View>
                </Pressable>
            )
        }
    },
    ]



const Carousel2 =
    [{
        data: (children, height) => {
            return (<View style={{ display: 'flex', flex: 1 }}>
                <View style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                    <ItemBank2 data={{ nombre: 'Itaú', img: require('../../Assets/HomeItau.png') }} /></View>
                <View style={{ bottom: 6 }}>
                    {children && children}
                </View>
            </View>)
        }
    }, {
        data: (children, height) => {
            return (<View style={{ display: 'flex', flex: 1 }}>
                <View style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                    <ItemBank2 data={{ nombre: 'Santarder', img: require('../../Assets/Santander.png') }} /></View>
                <View style={{ bottom: 6 }}>
                    {children && children}
                </View>
            </View>)
        }
    }, {
        data: (children, height) => {
            return (
                <View style={{ display: 'flex', flex: 1, right: 10 }}>
                    <View style={{ flex: 1, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                            <Texto size={12}>Agrega y visualiza aquí cualquier banco.</Texto>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Button onPress={() => {
                                RootNavigation.navigate('AddBank')
                            }} size={12} styleButton={{ borderRadius: 15, marginTop: 5, width: 75.2, height: 24.09 }} label="Añadir" />
                        </View>
                        <Image style={{ width: 82.29, height: 107.32 }} source={require('../../Assets/CarouselCards2.png')} />
                    </View>
                    <View style={{ bottom: 6, backgroundColor: 'red', right: 10 }}>
                        {children && children}
                    </View>
                </View>
            )
        }
    },
    ]

const Carousel3 =
    [{
        data: (children, height) => {
            return (<TouchableOpacity style={{ flex: 1, }} onPress={() => {
                RootNavigation.navigate('Analysis');
            }}>
                <View style={{ display: 'flex', flex: 1, height: height ? height : 101, }}>
                    <View style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: 12, paddingRight: 12 }}>
                        <View style={{ flex: 0.8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <View>
                                <Texto colorLabel={Colors.midnightblue} size={12} Bold>Gastos e ingresos</Texto>
                                <Texto colorLabel={Colors.darkgray} size={12}>Septiembre 2020</Texto>
                            </View>
                            <View>
                                <Ionicons name="ios-arrow-forward" color={Colors.Texto3} size={23} />
                            </View>
                        </View>
                        <Block flexDirection="row">
                            <Block style={{ height: '60%', borderRightColor: Colors.darkgray, borderRightWidth: 1 }}>
                                <Texto colorLabel={Colors.Primary} size={12}>Ingresos</Texto>
                                <Texto colorLabel={Colors.midnightblue} size={12}>$14.555.412</Texto>
                            </Block>
                            <Block>
                                <View style={{ marginLeft: 10 }}>
                                    <Texto colorLabel={Colors.Tertiary} size={12}>Gastos</Texto>
                                    <Texto colorLabel={Colors.midnightblue} size={12}>$14.555.412</Texto>
                                </View>
                            </Block>
                        </Block>
                    </View>
                    <View style={{ bottom: 5 }}>
                        {children && children}
                    </View>
                </View></TouchableOpacity>)
        }
    }, {
        data: (children, height) => {
            return (<TouchableOpacity style={{ flex: 1, }} onPress={() => {
                RootNavigation.navigate('Analysis');
            }}>
                <View style={{ display: 'flex', flex: 1, height: height ? height : 101, paddingRight: 12, paddingTop: 6, paddingLeft: 5, paddingRight: 19 }}>
                    <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 0 }}>
                            <Texto size={12} >Previsto mensual</Texto>
                            <Ionicons name="ios-arrow-forward" color={Colors.Texto3} size={23} />
                        </View>
                        <View style={{ alignItems: 'center', flex: 1, display: 'flex', marginBottom: 14, flexDirection: 'row' }}>
                            <View style={{ flex: .15 }} />
                            <View style={{ flex: .5 }}>
                                <ProgressCircle
                                    style={{ flex: 1 }}
                                    progress={1}
                                    progressColor={Colors.Tertiary}
                                // startAngle={-Math.PI * 0.8}
                                // endAngle={Math.PI * 0.8}
                                // children={{data:'hola'}}
                                >
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Texto size={15.2818}>$</Texto>
                                    </View>
                                </ProgressCircle>
                            </View>
                            <View  style={{flex:1}}>
                                <Texto size={12} colorLabel={Colors.Tertiary}>
                                    145%
                                </Texto>
                                <Texto size={12} colorLabel={Colors.darkgray}>
                                    Gastado de tu previsto de
                                </Texto>
                                <Texto size={12} colorsLabel={Colors.midnightblue}>
                                    $ 1.455.194
                                </Texto>
                            </View>
                        </View>
                    </View>
                    <View style={{ bottom: 5 }}>
                        {children && children}
                    </View>
                </View></TouchableOpacity>)
        }
    },
    ]

const Carousel4 =
    [{
        data: (children, height) => {
            return (
                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', paddingLeft: 12, height: height ? height : 101, }}>
                    <View style={{ flex: 1 }}>
                        <Texto colorLabel={Colors.midnightblue} size={13} Bold>Cotizar tarjeta</Texto>
                        <Texto size={12} colorLabel={Colors.dimgray}>Revisa los requisitos y elige la tarjeta que mejor se adapte a tus condiciones.</Texto>
                        <Button size={12} styleButton={{ borderRadius: 15, marginTop: 5, width: 111, height: 24 }} label="Ver Tarjetas" onPress={() => {
                            RootNavigation.navigate('NextCard');
                        }} />
                        <View style={{ flex: 1, marginBottom: 12, top: 12, left: 30 }}>
                            {children && children}
                        </View>
                    </View>
                    <View style={{ paddingRight: 12, flex: 0.25, display: 'flex', alignContent: 'center', alignItems: 'flex-start', overflow: 'hidden', alignSelf: 'flex-end' }}>
                        <Image source={require('../../Assets/CardHome.png')} style={{ height: 69, width: 82, top: 10 }} />
                    </View>
                </View>
            )
        }
    }, {
        data: (children, height) => {
            return (
                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', height: height ? height : 101, }}>
                    <View style={{ flex: 1 }}>
                        <Texto colorLabel={Colors.midnightblue} size={13} Bold>Planes cuenta corriente</Texto>
                        <Texto size={12} colorLabel={Colors.dimgray}>Encuentra todas las ofertas y contrata el producto que mejor se adapte a ti.</Texto>
                        <Button size={12} styleButton={{ justifyContent: 'center', borderRadius: 15, marginTop: 5, width: 111, height: 24 }} label="Ver planes" onPress={() => {
                            RootNavigation.navigate('NextAccount');
                        }} />
                        <View style={{ flex: 1, marginBottom: 12, top: 12, left: 30 }}>
                            {children && children}
                        </View>
                    </View>
                    <View style={{ paddingRight: 12, flex: 0.25, display: 'flex', alignContent: 'center', alignItems: 'flex-start', overflow: 'hidden', alignSelf: 'flex-end' }}>
                        <Image style={{ width: 82.29, height: 107.32 }} source={require('../../Assets/CarouselCards2.png')} />
                    </View>

                </View>
            )
        }
    },

    ]


const styles = StyleSheet.create({

    scrollView: {
        //   flex: 1,
          backgroundColor:Colors.Secondary,
        //   alignItems: 'center',
        //   justifyContent: 'center',
    },
});
