import React, { useContext } from 'react';
import { interpolate, Extrapolate } from "react-native-reanimated";
import { vh, vw } from 'react-native-css-vh-vw'
import {
    View,
    FlatList,
    Image,
    Dimensions,
    Animated,
    Platform,
} from 'react-native';
import { DataContext } from "../../../Context/Datos.Context";

import { ScreenContainer } from '../../ScreenContainer'

import { Block } from '../../../UI/Block'
import { Texto } from '../../../UI/Texto'
import { Button } from '../../../UI/Button'
import Colors from '../../../UI/Colors'
import { CardView } from '../../../UI/CreditCard/type'
import BarChart from '../../../UI/Graph/BarChart'
import { ItemMovements } from '../../../UI/itemMovements'
import { getTypeCreditCardImg } from "../../../Util/BackgroundCard";
import { ScrollView } from 'react-native-gesture-handler';
import { ItemViewTransaccion } from '../Analisis/ViewTransacciones';


const { width, height } = Dimensions.get('window');

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const slides = [
    { key: 'empty-left' },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        imgBack: require("../../../Assets/logos/BancoItau.jpg"),
        bank: "Itaú",
        TipoTarjeta: "MasterCard Gold",
        status: "Disponible",
        balance: "1.050.000",
        USD: "1.375",
        DatosCard: {
            number: "1547",
            fecha: "12/22",
        }
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        imgBack: require("../../../Assets/logos/Santanderx.png"),
        bank: "Santander",
        TipoTarjeta: "Visa Platinum",
        status: "Disponible",
        balance: "2.454.322",
        USD: "3.215",
        DatosCard: {
            number: "1222",
            fecha: "01/23",
        }
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd9s1aa97f63',
        imgBack: require("../../../Assets/logos/Santanderx.png"),
        bank: "Santander",
        TipoTarjeta: "Mastercard Black",
        status: "Disponible",
        balance: "64.897.552",
        USD: "85.022",
        DatosCard: {
            number: "1472",
            fecha: "02/22",
        }
    },
    { key: 'empty-right' }
];


const ItemTransferencia = [
    { Tx: "SHA256-XM131", fecha: "Hoy", tipo: "Enviastes", cantidad: "4.000", concepto: "El pago de la última compra.", time: "19:50", color: "transparent" },
    { Tx: "SHA256-XM332", fecha: "Ayer", tipo: "Enviastes", cantidad: "5.000", concepto: "El pago de la última compra.", time: "22:01", color: "transparent" },
    { Tx: "SHA256-XMl33", fecha: "23/09/2020", tipo: "Recibistes", cantidad: "5.000", concepto: "El pago de la última compra.", time: "11:25", color: "transparent" },
    { Tx: "SHA256-XA134", fecha: "21/09/2020", tipo: "Enviastes", cantidad: "10.200", concepto: "El pago de la última compra.", time: "09:50", color: "transparent" },
    { Tx: "SHA256-XA135", fecha: "20/09/2020", tipo: "Enviastes", cantidad: "10.200", concepto: "El pago de la última compra.", time: "09:10", color: "transparent" },
]

export function CardShared({ navigation }) {

    const { state } = useContext(DataContext)
    const first_name = state?.user?.profile?.first_name
    const last_name = state?.user?.profile?.last_name
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const data = [
        { activo: false, label: 'Ene', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: false, label: 'Feb', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: false, label: 'Mar', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: false, label: 'Abr', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: false, label: 'May', ingresos: { value: 50 }, gastos: { value: 80 } },
        { activo: false, label: 'Jun', ingresos: { value: 50 }, gastos: { value: 10 } },
        { activo: false, label: 'Jul', ingresos: { value: 50 }, gastos: { value: 10 } },
        { activo: false, label: 'Ago', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: true, label: 'Sept', ingresos: { value: 50 }, gastos: { value: 9 } },
        { activo: false, label: 'Oct', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: false, label: 'Nov', ingresos: { value: 50 }, gastos: { value: 10 } },
        { activo: false, label: 'Dic', ingresos: { value: 50 }, gastos: { value: 8 } },
    ]
    const Items = [
        {
            otherData: { dia: "Jueves", d: "27", m: "Junio", a: "2020", time: "20:00", ItemTransferencia },
            lugar: "Wallmart", nombre: "Roberto Sanchez", monto: "10.000", ingreso: true, tarjeta: {
                id: '3ac68afc-c605-48d3-a4f8-fbd9s1aa97f63',
                imgBack: require("../../../Assets/logos/Santanderx.png"),
                bank: "Santander",
                TipoTarjeta: "Mastercard Black",
                status: "Disponible",
                balance: "64.897.552",
                USD: "85.022",
                DatosCard: {
                    number: "1472",
                    fecha: "02/22",
                }
            }
        },
        {
            otherData: { dia: "Jueves", d: "27", m: "Junio", a: "2020", time: "20:00", ItemTransferencia },
            lugar: "Falabella", nombre: "Martín Ures", monto: "10.000", ingreso: true, tarjeta: {
                id: '3ac68afc-c605-48d3-a4f8-fbd9s1aa97f63',
                imgBack: require("../../../Assets/logos/Santanderx.png"),
                bank: "Santander",
                TipoTarjeta: "Mastercard Black",
                status: "Disponible",
                balance: "64.897.552",
                USD: "85.022",
                DatosCard: {
                    number: "1472",
                    fecha: "02/22",
                }
            }
        },
        {
            otherData: { dia: "Jueves", d: "27", m: "Junio", a: "2020", time: "20:00", ItemTransferencia },
            lugar: "Sony", nombre: "Alfonso Suarez", monto: "7.000", ingreso: true, tarjeta: {
                id: '3ac68afc-c605-48d3-a4f8-fbd9s1aa97f63',
                imgBack: require("../../../Assets/logos/Santanderx.png"),
                bank: "Santander",
                TipoTarjeta: "Mastercard Black",
                status: "Disponible",
                balance: "64.897.552",
                USD: "85.022",
                DatosCard: {
                    number: "1472",
                    fecha: "02/22",
                }
            }
        },
        {
            otherData: { dia: "Jueves", d: "27", m: "Junio", a: "2020", time: "20:00", ItemTransferencia },
            lugar: "Falabella", nombre: "Martina Dominguez", monto: "3.000", ingreso: true, tarjeta: {
                id: '3ac68afc-c605-48d3-a4f8-fbd9s1aa97f63',
                imgBack: require("../../../Assets/logos/Santanderx.png"),
                bank: "Santander",
                TipoTarjeta: "Mastercard Black",
                status: "Disponible",
                balance: "64.897.552",
                USD: "85.022",
                DatosCard: {
                    number: "1472",
                    fecha: "02/22",
                }
            }
        }
    ]

    return (
        <ScreenContainer backgroundColor={'transparent'}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ height: (height / 2) + 30 }}>
                    <Animated.FlatList
                        showsHorizontalScrollIndicator={false}
                        data={slides}
                        keyExtractor={(item) => item.key}
                        horizontal
                        bounces={false}
                        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                        renderToHardwareTextureAndroid
                        contentContainerStyle={{ alignItems: 'flex-start' }}
                        style={{ flex: .4, marginTop: -40, marginBottom: -50 }}
                        snapToInterval={ITEM_SIZE}
                        snapToAlignment='start'
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false }
                        )}
                        scrollEventThrottle={16}
                        renderItem={({ item, index }) => {
                            if (!item.id) {
                                return <View style={{ width: EMPTY_ITEM_SIZE }} />;
                            }

                            const inputRange = [
                                (index - 2) * ITEM_SIZE,
                                (index - 1) * ITEM_SIZE,
                                index * ITEM_SIZE,
                            ];

                            const translateY = scrollX.interpolate({
                                inputRange,
                                outputRange: [100, 50, 100],
                                extrapolate: 'clamp',
                            });

                            return (
                                <View style={{ width: ITEM_SIZE }}>
                                    <Animated.View
                                        style={[{
                                            marginHorizontal: SPACING,
                                            padding: SPACING * 2 - 20,
                                            alignItems: 'center',
                                            transform: [{ translateY }],
                                            backgroundColor: 'transparent',
                                            borderRadius: 34,

                                        }]}
                                    >
                                        <CardView
                                            name={`${first_name?.toUpperCase()} ${last_name?.toUpperCase()}`}
                                            number={`**** **** **** ${item.DatosCard.number}`}
                                            expiry={item.DatosCard.fecha}
                                            imageFront={getTypeCreditCardImg(item.TipoTarjeta)}
                                            imageBack={getTypeCreditCardImg('rosa')}
                                            scale={.8} />
                                    </Animated.View>
                                </View>
                            );
                        }}
                    />
                    <View style={{ flex: 1, marginBottom: -50 }}>
                        <View style={{ flex: 1, justifyConten: 'center', alignItems: 'center' }}>
                            {slides.map(({ }, index, items) => {
                                const opacity = scrollX.interpolate({
                                    inputRange: [(index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE],
                                    outputRange: [-1, 1.1, -1],
                                    extrapolate: Extrapolate.CLAMP,
                                })
                                const i = index + 1
                                return (
                                    <Animated.View
                                        style={[{
                                            opacity,
                                            marginHorizontal: SPACING,
                                            padding: SPACING * 2,
                                            alignItems: 'center',
                                            position: 'absolute',
                                            borderRadius: 34,
                                        }]}
                                    >
                                        <Texto colorLabel={Colors.midnightblue} size={12}>{items[i]?.bank}</Texto>
                                        <Texto colorLabel={Colors.midnightblue} size={14}>{items[i]?.TipoTarjeta}</Texto>
                                        {/* <Texto size={10} >{`${first_name?.toUpperCase()} ${last_name?.toUpperCase()}`}</Texto> */}
                                        <Texto size={12} colorLabel={Colors.darkgray}>{"Cupo disponible"}</Texto>
                                        <Texto size={25} colorLabel={Colors.midnightblue}>${items[i]?.balance}</Texto>
                                    </Animated.View>
                                )
                            })}
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', marginLeft: 8, marginRight: 8 }}>
                    <BarChart data={data} round={100} unit="€" />
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-between', marginLeft: 8, marginRight: 8 }}>
                    <View>
                        <Texto colorLabel={Colors.midnightblue} size={12}>Dinero obtenido</Texto>
                        <Texto size={12} colorLabel={Colors.darkgray}>Sep 2020</Texto>
                    </View>
                    <Texto size={12} colorLabel={Colors.Primary}>30.000</Texto>
                </View>
                <View style={{ marginBottom: 12 , alignItems: "center", marginTop: 8}}>
                    {Items.map((item, i) => {
                        return (
                            <ItemViewTransaccion {...{ item, title: "Supermercado" }} />
                        )
                    })}
                </View>
            </ScrollView>
        </ScreenContainer>
    )
}