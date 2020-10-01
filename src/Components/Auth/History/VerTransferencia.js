import React, { useEffect, useState, useRef,useContext } from 'react'
import { View, StyleSheet, StatusBar, Platform, Dimensions, BackHandler, Pressable } from 'react-native'
import { ScreenContainer } from '../../ScreenContainer'
import { Header } from '../../../UI/Header'
import Colors from '../../../UI/Colors'
import { Texto } from '../../../UI/Texto'
import { DataContext } from '../../../Context/Datos.Context'
import { HistorialTransferencias } from './Transferencias'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import Animated, { multiply, divide, interpolate, Extrapolate } from "react-native-reanimated";
import AntDesign from "react-native-vector-icons/AntDesign"
import {
    useValue,
    onScrollEvent,
    interpolateColor,
    useScrollHandler,
} from "react-native-redash";

const { width, height } = Dimensions.get("window");
const SLIDE_HEIGHT = 0.61 * height;

export function VerTransferencia(props) {
    const {state}=useContext(DataContext)
    
    const { navigation } = props
    const { scrollHandler, x } = useScrollHandler();
    const scroll = React.useRef(new Animated.Value(0));
    const color = Colors.Primary
    StatusBar.setBackgroundColor(Colors.Primary)

    const { ItemTransferencia: DataTransacciones,index } = props.route.params

    
    const backgroundColor = DataTransacciones && interpolateColor(x, {
        inputRange: DataTransacciones.map((_, i) => i * width),
        outputRange: DataTransacciones.map((data) => data.color),
    });
    useEffect(() => {
        const backAction = () => {
            navigation.pop()
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [])

    useEffect(() => {
        if (scroll.current) {
            scroll.current
                ?.getNode()
                .scrollTo({ x: width * (index), animated: true });
        }
    }, [])
    // console.log(DataTransacciones,'propsa sver Dtas')
    // return null
    return (
        <ScreenContainer backgroundColor={'transparent'} barBackgroundColor={color} >
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={{ backgroundColor: color, paddingLeft: 12, paddingRight: 12 }}>
                    <Header Return color={Colors.Secondary} onPressBack={() => navigation.pop()} />
                    <View style={{ paddingBottom: 12 }}>
                        <Texto size={13} colorLabel={Colors.Secondary} style={{ marginBottom: 0, textAlign: 'center' }}>
                            Historial con {props.route.params?.user}
                        </Texto>
                        <AntDesign color={Colors.Secondary} name="infocirlceo" size={30} style={{ position: 'absolute', right: 0, bottom: 10 }} />
                    </View>
                </View>
                <View style={[styles.container, { flexDirection: 'column-reverse' }]}>
                    <Animated.View style={[{ flex: 1 }]}>
                        <Animated.ScrollView
                            ref={scroll}
                            horizontal
                            snapToInterval={width}
                            decelerationRate="fast"
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            scrollEventThrottle={1}
                            {...scrollHandler}
                        >
                            {DataTransacciones.map((item, index) => {
                                return (
                                    <View style={[{ width: width, backgroundColor: Colors.Secondary }]} key={index}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                                                if (scroll.current) {
                                                    scroll.current
                                                        ?.getNode()
                                                        .scrollTo({ x: width * (index - 1), animated: true });
                                                }
                                            }}>
                                                <AntDesign color={Colors.Primary} name="left" size={40} />

                                            </Pressable>
                                            <View style={{ flex: 1 }}>
                                                <ItemTransaccion {...{ item }} />
                                            </View>
                                            <Pressable style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                                                if (scroll.current) {
                                                    scroll.current
                                                        ?.getNode()
                                                        .scrollTo({ x: width * (index + 1), animated: true });
                                                }
                                            }}>
                                                <AntDesign color={Colors.Primary} name="right" size={40} />
                                            </Pressable>
                                        </View>
                                    </View>
                                )
                            }
                            )}
                        </Animated.ScrollView>
                    </Animated.View>
                    <View style={styles.footer}>
                        <Animated.View
                            style={{ ...StyleSheet.absoluteFillObject, backgroundColor: Colors.Secondary }}
                        >
                            <View style={styles.footerContent}>

                                <Animated.View
                                    style={{
                                        // width: width * slides.length,
                                        flex: 1,
                                        flexDirection: "row",
                                        width: width * DataTransacciones.length,
                                        transform: [
                                            {
                                                translateX: multiply(x, -1),
                                            },
                                        ],
                                    }}
                                >
                                    {DataTransacciones.map((item, index) => {
                                        const opacity = interpolate(x, {
                                            inputRange: [(index - 0.5) * width, index * width, (index + 0.5) * width],
                                            outputRange: [0, 1, 0],
                                            extrapolate: Extrapolate.CLAMP,
                                        })
                                        return (
                                            <Animated.View style={[{
                                                flex: 1,
                                                paddingTop: 12,
                                                paddingBottom: 12,
                                            }, { opacity }]} key={index}>
                                                <Texto size={14} colorLabel={Colors.midnightblue} style={{ paddingLeft: 12 }}>Participantes</Texto>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 12, marginBottom: 12 }}>
                                                    <View style={{ backgroundColor: 'white', padding: 12, borderRadius: 8, flexDirection: 'row-reverse' }}>
                                                        <View>
                                                            <Texto size={13}>{props.route.params?.user}</Texto>
                                                            <Texto size={11}>Hash cuenta:</Texto>
                                                            <Texto size={11}>{item.Tx}</Texto>
                                                        </View>
                                                        <View style={{ borderRightColor: Colors.Primary, borderRightWidth: 2, flex: 0, left: 5, height: '100%' }} />
                                                    </View>
                                                    <View style={{ justifyContent: "flex-end" }}>
                                                        <Texto colorLabel={Colors.Primary} size={13}>{'Recibió'}</Texto>
                                                        <Texto colorLabel={Colors.Primary} size={13}>{"Transferencia"}</Texto>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-around' }}>
                                                    <View style={{ backgroundColor: 'white', padding: 12, borderRadius: 8, flexDirection: 'row' }}>
                                                        <View>
                                                            <Texto size={13}>{state?.user.profile.first_name} {state?.user.profile.last_name}</Texto>
                                                            <Texto size={11}>Hash cuenta:</Texto>
                                                            <Texto size={11}>{item.Tx}</Texto>
                                                        </View>
                                                        <View style={{ borderRightColor: Colors.Primary, borderRightWidth: 2, flex: 0, left: 5, height: '100%' }} />
                                                    </View>
                                                    <View style={{ justifyContent: "flex-end" }}>
                                                        <Texto colorLabel={Colors.Primary} size={13}>{'Envió'}</Texto>
                                                        <Texto colorLabel={Colors.Primary} size={13}>{"Transferencia"}</Texto>
                                                    </View>


                                                </View>
                                            </Animated.View>
                                        )
                                    })}
                                </Animated.View>
                            </View>

                        </Animated.View>
                    </View>

                </View>
            </ScrollView>
            <View style={{ flex: 0, flexDirection: 'row' }}>
                <RectButton style={{ flex: 1, backgroundColor: Colors.Primary, marginLeft: 5, marginRight: 5, marginTop: 5, marginBottom: 5, borderRadius: 12 }}>
                    <Texto colorLabel={Colors.Secondary} size={15} style={{ paddingTop: 5, paddingBottom: 9 }} textAlign="center">Nueva Transferencia</Texto>
                </RectButton>
                <RectButton style={{ flex: 1, backgroundColor: Colors.Primary, marginLeft: 5, marginRight: 5, marginTop: 5, marginBottom: 5, borderRadius: 12 }}>
                    <Texto colorLabel={Colors.Secondary} size={15} style={{ paddingTop: 5, paddingBottom: 9 }} textAlign="center">Volver al Inicio</Texto>
                </RectButton>
            </View>
        </ScreenContainer >
    )
}

const ItemTransaccion = ({ item }) => {

    return (
        <View style={{ backgroundColor: 'white', padding: 12, borderRadius: 12 }}>
            <View>
                <Texto size={15}>Tx</Texto>
                <View style={{ borderTopColor: Colors.lavender, borderTopWidth: 1 }}>
                    <Texto size={15}>{item.Tx}</Texto>
                </View>
            </View>
            <View>
                <Texto size={15}>Concepto</Texto>
                <View style={{ borderTopColor: Colors.lavender, borderTopWidth: 1 }}>
                    <Texto size={15}>{item.concepto}</Texto>
                </View>
            </View>
            <View>
                <Texto size={15}>Monto</Texto>
                <View style={{ borderTopColor: Colors.lavender, borderTopWidth: 1 }}>
                    <Texto size={15}>{item.cantidad}</Texto>
                </View>
            </View>
            <View>
                <Texto size={15}>Fecha</Texto>
                <View style={{ borderTopColor: Colors.lavender, borderTopWidth: 1 }}>
                    <Texto size={15}>{item.fecha}</Texto>
                </View>
            </View>
            <View>
                <Texto size={15}>Hora</Texto>
                <View style={{ borderTopColor: Colors.lavender, borderTopWidth: 1 }}>
                    <Texto size={15}>{item.time}</Texto>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    underlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "flex-end",
        borderBottomRightRadius: 12,
        overflow: "hidden"
    },
    slider: {
        height: SLIDE_HEIGHT,
        flex: 1,
        backgroundColor: Colors.Secondary,
        borderBottomRightRadius: 12,
    },
    footer: {
        flex: 1,
    },
    footerContent: {
        flex: 1,
        backgroundColor: "transparent",
        borderTopLeftRadius: 12,
    },
    pagination: {
        ...StyleSheet.absoluteFillObject,
        width,
        height: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});