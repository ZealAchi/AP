/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { View, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions, Image, Pressable } from 'react-native';
import Colors from '../Colors';
import { Texto } from '../Texto';

const { width } = Dimensions.get('window');



export default function StaticTabbar(props) {
    const [values, setValues] = useState([])
    // const [bandera,setBandera] =useState([])//
    const { tabs, value, navigation,state, descriptors } = props;
    useEffect(() => {
        setValues(tabs.map((tab, index) => new Animated.Value(index === 0 ? 1 : 0)));
    }, [props.key])
    
  useFocusEffect(
    React.useCallback(() => {
        setValues(tabs.map((tab, index) => new Animated.Value(index === 0 ? 1 : 0)));
    }, [props.key])
  );

    useEffect(() => {
        if (JSON.stringify(values) !== '[]') {
            const tabWidth = width / tabs.length;
            Animated.sequence([
                Animated.parallel(
                    values.map(v => Animated.timing(v, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: true,
                    })),
                ),
                Animated.parallel([
                    Animated.spring(value, {
                        toValue: tabWidth * 2,
                        useNativeDriver: true,
                    }),
                    Animated.spring(values[2], {
                        toValue: 1,
                        useNativeDriver: true,
                    }),
                ]),
            ]).start();
        }
    }, [values])
    

    const onPress = (index) => {
        const tabWidth = width / tabs.length;
        Animated.sequence([
            Animated.parallel(
                values.map(v => Animated.timing(v, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                })),
            ),
            Animated.parallel([
                Animated.spring(value, {
                    toValue: tabWidth * index,
                    useNativeDriver: true,
                }),
                Animated.spring(values[index], {
                    toValue: 1,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }
    if (JSON.stringify(values) === '[]') return null
    return (
        <View style={styles.container}>
            {
                tabs.map((tab, key) => {
                    const tabWidth = width / tabs.length;
                    const cursor = tabWidth * key;
                    const opacity = value.interpolate({
                        inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
                        outputRange: [1, 0, 1],
                        extrapolate: 'clamp',
                    });
                    const translateY = values[key].interpolate({
                        inputRange: [0, 1],
                        outputRange: [64, 0],
                        extrapolate: 'clamp',
                    });
                    const opacity1 = values[key].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolate: 'clamp',
                    });
                    return (
                        <React.Fragment {...{ key }}>
                            <TouchableWithoutFeedback onPress={() =>{/* onPress(key)*/}}>
                                <Animated.View style={[styles.tab, { opacity }]}>
                                    {/* <Icon name={tab.name} color="black" size={25} /> */}
                                    {tab.name === 'Transferir' &&
                                        <Pressable
                                            onPress={() => {
                                                navigation.navigate('PagarHome', {top:true, monto: undefined, message: undefined, account:undefined})
                                            }}
                                        ><Image source={require('./icons/Pagar.png')} style={{ height: 30, width: 32 }} /></Pressable>}
                                    {tab.name === 'Mis Bancos' &&
                                        <Pressable
                                            onPress={() => {
                                                navigation.navigate('MyAccounts')
                                            }}
                                        >
                                            
                                            <FontAwesome5 name="wallet" size={26} color={Colors.darkgray} style={{}} />
                                            {/* <Image source={require('./icons/Cobrar.png')} style={{ height: 30, width: 32 }} /> */}
                                            </Pressable>}
                                    {/* {tab.name==='Tarjetas'&&<Image source={require('./icons/Default.png')} style={{ height: 32, width: 32 }} />} */}
                                    {tab.name === 'Compartir Tarjeta' &&
                                        <Pressable
                                            onPress={() => {
                                                navigation.navigate('Compartir Tarjeta')
                                            }}
                                        ><Image source={require('./icons/Compartir.png')} style={{ height: 30, width: 32 }} /></Pressable>}
                                    {tab.name === 'Más' &&
                                        <Pressable
                                            onPress={() => {
                                                navigation.navigate('Más')
                                            }}
                                        ><Image source={require('./icons/Mas.png')} style={{
                                            height: 32, width: 9
                                        }} /></Pressable>}
                                    {/* <Texto size={9} colorLabel={Colors.darkgray}>{(tab.name!=='Tarjetas'||tab.name!=='Cobrar')&&tab.name}</Texto> */}
                                    <Texto size={9} colorLabel={Colors.darkgray}>{(tab.name!==('Tarjetas'))&&tab.name}</Texto>

                                </Animated.View>
                            </TouchableWithoutFeedback>
                            <Animated.View
                                style={{
                                    position: 'absolute',
                                    top: -20,
                                    left: tabWidth * key,
                                    width: tabWidth,
                                    height: 64,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    opacity: opacity1,
                                    transform: [{ translateY }],
                                }}
                            >
                                <View style={styles.activeIcon}>
                                    {/* <Icon name={tab.name} color="black" size={35} /> */}
                                    {/* {tab.name==='Tarjetas'&&<Image source={require('./icons/Eleccion.png')} style={{ height: 32, width: 32 }} />} */}
                                    {tab.name === 'Tarjetas' && <Pressable
                                        onPress={() => {
                                            navigation.navigate('Wallet')
                                        }}
                                        style={{alignItems:'center'}}
                                    >
                                        <Image source={require('./icons/Eleccion.png')} style={{ height: 75, width: 75,zIndex:1}} />
                                        <Image source={require('./icons/Default1.png')} style={{ height: 25, width: 32,top:-52,zIndex:2}} /></Pressable>}
                                    
                                    {/* {tab.name==='Pagar'&&<Image source={require('./icons/Pagar.png')} style={{ height: 32, width: 32 }} />} */}
                                    {/* {tab.name==='Cobrar'&&<Image source={require('./icons/Cobrar.png')} style={{ height: 32, width: 32 }} />} */}
                                    {/* {tab.name==='Compartir Tarjeta'&&<Image source={require('./icons/Compartir.png')} style={{ height: 32, width: 32 }} />} */}
                                    {/* {tab.name==='Más'&&<Image source={require('./icons/Mas.png')} style={{ height: 32, width: 32 }} />} */}
                                </View>
                            </Animated.View>
                        </React.Fragment>
                    );
                })
            }
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 64,
    },
    activeIcon: {
        // backgroundColor: Colors.Primary,
        // width: 45,
        // height: 45,
        // borderRadius: 45,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
});
