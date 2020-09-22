/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useContext } from 'react';
import { multiply, divide, interpolate, Extrapolate } from "react-native-reanimated";
import { vh, vw } from 'react-native-css-vh-vw'
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    Animated,
    Platform,
} from 'react-native';
import { DataContext } from "../../../Context/Datos.Context";
import { CardView } from "../../../UI/CreditCard/type";
import { Texto } from "../../../UI/Texto";
import { Button } from "../../../UI/Button";
import Colors from "../../../UI/Colors";
import { getTypeCreditCardImg } from "../../../Util/BackgroundCard";


const { width, height } = Dimensions.get('window');

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;
// Sección Compartidas conmigo. Primera tarjeta: Visa Signature Banco BCI. 
// Costo de uso $8.990 + 5% Compra Tarjeta finaliza en 1331 Vencimiento 08/24 Nombre Yerko Folch.
const slides = [
    { key: 'empty-left' },
    {
        imgBack: require("../../../Assets/logos/BancoBCI.jpg"),
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        bank: "BCI",
        TipoTarjeta: "Visa Signature",
        costoUso:"8.990 + 5%",
        DatosCard: {
            number: "1331",
            nombreUser:"Yerko Folch",
            fecha: "08/24",
        }
    },
    {
        imgBack: require("../../../Assets/logos/BancoChile.jpg"),
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        bank: "Banco de Chile",
        TipoTarjeta: "Mastercard Platinum",
        costoUso:"6.990 + 3%",
        DatosCard: {
            number: "1923",
            nombreUser:"Gonzalo Polanco",
            fecha: "03/23",
        }
    },
    { key: 'empty-right' }
];

export function CompartidasConmigo({ navigation }) {
    const { state } = useContext(DataContext)
    const first_name = state?.user?.profile?.first_name
    const last_name = state?.user?.profile?.last_name
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={[styles.container, { backgroundColor: 'white' }]}>

            <Animated.FlatList
                showsHorizontalScrollIndicator={false}
                data={slides}
                keyExtractor={(item) => item.key}
                horizontal
                bounces={false}
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                renderToHardwareTextureAndroid
                contentContainerStyle={{ alignItems: 'flex-start' }}
                style={{ flex: .4, /*backgroundColor: 'blue',*/ marginTop: -42, marginBottom: -50 }}
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
                                    name={item.DatosCard.nombreUser}
                                    number={`**** **** **** ${item.DatosCard.number}`}
                                    expiry={item.DatosCard.fecha}
                                    imageFront={getTypeCreditCardImg(item.TipoTarjeta)}
                                    imageBack={getTypeCreditCardImg('rosa')}
                                    scale={.8} />
                            </Animated.View>
                            <View style={{ flex: 1, justifyConten: 'center', alignItems: 'center',marginTop:90}}>
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
                                <Image source={items[i]?.imgBack} style={{ height: 80, width: 80, marginTop: -50 }} borderRadius={8} />
                                <Texto colorLabel={Colors.midnightblue} size={12}>{items[i]?.bank}</Texto>
                                <Texto colorLabel={Colors.midnightblue} size={14}>{items[i]?.TipoTarjeta}</Texto>
                                <Texto size={10} >{items[i]?.DatosCard?.nombreUser}</Texto>
                                <Texto size={10}>Costo de uso: ${items[i]?.costoUso}</Texto>
                            </Animated.View>
                        )
                    })}
                </View>
                        </View>
                    );
                }}
            />
            <View style={{ flex: /*1*/0,/*backgroundColor:'red',*/marginTop: vh(2) }}>
                {/* <View style={{ flex: 1, justifyConten: 'center', alignItems: 'center' }}>
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
                                <Image source={items[i]?.imgBack} style={{ height: 80, width: 80, marginTop: -50 }} borderRadius={8} />
                                <Texto colorLabel={Colors.midnightblue} size={12}>{items[i]?.bank}</Texto>
                                <Texto colorLabel={Colors.midnightblue} size={14}>{items[i]?.TipoTarjeta}</Texto>
                                <Texto size={10} >{items[i]?.DatosCard?.nombreUser}</Texto>
                                <Texto size={10}>Costo de uso: ${items[i]?.costoUso}</Texto>
                            </Animated.View>
                        )
                    })}
                </View> */}
                <View style={{ flex: 0, bottom: 10, paddingLeft: '20%', paddingRight: '20%' }}>
                    <Button onPress={() => { navigation.navigate('AddCard') }} styleButton={{ marginBottom: 12, borderRadius: 45 }} size={20} backgroundColor={'transparent'} color={Colors.Primary} label="Añadir tarjetas"></Button>
                    <Button onPress={() => { navigation.navigate('Pay') }} styleButton={{ marginBottom: 12, borderRadius: 45 }} size={15} backgroundColor={Colors.Primary} label="Pagar"></Button>
                </View>
            </View>
        </View>
    );


}


const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: Colors.Primary,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    posterImage: {
        width: '100%',
        height: ITEM_SIZE * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    },
    underlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "flex-end",
        borderBottomRightRadius: 12,
        overflow: "hidden"
    },
});