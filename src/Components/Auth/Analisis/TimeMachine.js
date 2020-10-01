import React from "react"
import { Image, Animated, View, Dimensions, BackHandler } from "react-native"
import Entypo from "react-native-vector-icons/Entypo"
import Colors from "../../../UI/Colors"
import { Texto } from "../../../UI/Texto"
import { multiply, divide, interpolate, Extrapolate } from "react-native-reanimated";
import { useState, useEffect, useContext, useRef } from "react"
import { useScrollHandler } from 'react-native-redash';
import { DataContext } from "../../../Context/Datos.Context"
import { RectButton } from "react-native-gesture-handler"
import { CardView } from "../../../UI/CreditCard/type"
import { getTypeCreditCardImg } from "../../../Util/BackgroundCard"
import { Header } from "../../../UI/Header"
import { Button } from "../../../UI/Button"
const { width, height } = Dimensions.get('window');

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

export function TimeMachine(props) {
    const { item } = props.route.params
    const { navigation } = props
    const { state } = useContext(DataContext)
    const first_name = state?.user?.profile?.first_name
    const last_name = state?.user?.profile?.last_name
    const scroll = React.useRef(new Animated.Value(0));
    const { scrollHandler, x } = useScrollHandler();
    const flatRef = useRef(null)



    const slides = [
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
            },
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
            },
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
            },
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28baX',
            imgBack: require("../../../Assets/logos/BancoItau.jpg"),
            bank: "Itaú",
            TipoTarjeta: "MasterCard Gold",
            status: "Disponible",
            balance: "1.050.000",
            USD: "1.375",
            DatosCard: {
                number: "1547",
                fecha: "12/22",
            },
        }
    ]

    let ArrayNew = []
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
    }, []);

    slides.find((slide) => {
        console.log(slide,'slideD:sñ')
        // slide.id===item?.tarjeta.id?noMatch.push(slide):match.push(slide)
        if (slide.id === item?.tarjeta.id) {
            // console.log(slide.id,'--',item?.tarjeta.id)
            // console.log(slide.id===item?.tarjeta.id)
            ArrayNew.push({ key: 'empty-left' })
            ArrayNew.push(slide)
            slides.find((slide) => {
                if (slide.id !== item?.tarjeta.id)
                    ArrayNew.push(slide)
            })
            ArrayNew.push({ key: 'empty-right' })
        }else{
            
        }
    })

    console.log(ArrayNew,'ArrayNew')

    return (<View style={{
        flex: 1,
    }}>
        <View style={{ left: 12 }}>
            <Header Return />
            <Texto size={13}>Time Machine</Texto>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 12, marginTop: 12 }}>
            <Texto size={12}>{item?.nombre}</Texto>
            <Texto size={25}>${item?.monto}</Texto>
            <Texto size={12}>{item?.otherData.dia}, {item?.otherData.d} {item?.otherData.m}, {item?.otherData.time}</Texto>
        </View>
        <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={ArrayNew}
            ref={flatRef}
            // ref={ref => {flatRef = ref}}
            keyExtractor={(item) => item.key}
            horizontal
            bounces={false}
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
            renderToHardwareTextureAndroid
            contentContainerStyle={{ alignItems: 'flex-start' }}
            style={{ flex: 0 }}
            snapToInterval={ITEM_SIZE}
            snapToAlignment='start'
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scroll.current } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
                const positionItem = index
                if (!item.id) {
                    return <View style={{ width: EMPTY_ITEM_SIZE }} />;
                }

                const inputRange = [
                    (index - 2) * ITEM_SIZE,
                    (index - 1) * ITEM_SIZE,
                    index * ITEM_SIZE,
                ];

                const translateY = scroll.current.interpolate({
                    inputRange,
                    outputRange: [100, 50, 100],
                    extrapolate: 'clamp',
                });


                return (
                    <View style={{ width: ITEM_SIZE, bottom: 45 }}>
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
        <View style={{ flex: 4, alignItems: 'center' }}>
            <View style={{ marginTop: 12, alignItems: 'center' }}>
                <Texto size={12}>Cuotas</Texto>
                <TimeMachineComponent />
            </View>
        </View>
        <Button onPress={() => { navigation.pop() }} styleButton={{ position: 'absolute', bottom: 20, right: 80, left: 80, borderRadius: 18 }} label="GUARDAR" />
    </View>)
}

function TimeMachineComponent() {
    const [beforeCuota, setBeforeCuota] = useState(1)
    const [cuota, setCuota] = useState(2)
    const [nextCuota, setNextCuota] = useState(3)
    const Ingrementar = () => {
        if (nextCuota <= 36) {
            setCuota(cuota + 1)
            setBeforeCuota(beforeCuota + 1)
            setNextCuota(nextCuota + 1)
        }

    }
    const Decrementar = () => {
        if (beforeCuota >= 1) {
            setCuota(cuota - 1)
            setBeforeCuota(beforeCuota - 1)
            setNextCuota(nextCuota - 1)
        }

    }
    useEffect(() => {

    }, [])
    return (
        <View style={{ height: 120, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', }}>
            <RectButton onPress={() => Decrementar()}>
                <Entypo name="chevron-left" size={30} />
            </RectButton>
            <View style={{ left: 8, width: 65, height: 55, backgroundColor: "rgb(0,182,255)", borderRadius: 8, alignItems: "center", justifyContent: "center" }}>
                <Texto Bold size={30} colorLabel={"white"}>{beforeCuota}</Texto>
            </View>
            <View style={{ zIndex: 9, width: 85, height: 75, backgroundColor: Colors.Primary, borderRadius: 8, alignItems: "center", justifyContent: "center" }}>
                <Texto Bold size={30} colorLabel={"white"}>{cuota}</Texto>
            </View>
            <View style={{ right: 8, width: 65, height: 55, backgroundColor: "rgb(0,182,255)", borderRadius: 8, alignItems: "center", justifyContent: "center" }}>
                <Texto Bold size={30} colorLabel={"white"}>{nextCuota}</Texto>
            </View>
            <RectButton onPress={() => Ingrementar()}>
                <Entypo name="chevron-right" size={30} />
            </RectButton>
        </View>
    )
}