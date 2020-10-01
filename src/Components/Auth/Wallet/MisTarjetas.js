/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useContext,useState, useRef } from 'react';
import { interpolate, Extrapolate } from "react-native-reanimated";
import { vh, vw } from 'react-native-css-vh-vw'
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    Animated,
    Platform,
    Modal
} from 'react-native';
import { DataContext } from "../../../Context/Datos.Context";
import { CardView } from "../../../UI/CreditCard/type";
import { Texto } from "../../../UI/Texto";
import { Button } from "../../../UI/Button";
import Colors from "../../../UI/Colors";
import { getTypeCreditCardImg } from "../../../Util/BackgroundCard";
import AntDesign from "react-native-vector-icons/AntDesign"
import { RectButton } from 'react-native-gesture-handler';
import { useScrollHandler } from 'react-native-redash';
import ModalMisTarjetas from './ModalMisTarjetas';


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

export function MisTarjetas({ navigation }) {
    const [openOptions,setOpenOptions]=useState(false)
    const [infoCard,setInfoCard]=useState()
    const { state } = useContext(DataContext)
    const first_name = state?.user?.profile?.first_name
    const last_name = state?.user?.profile?.last_name
    const scroll = React.useRef(new Animated.Value(0));
    const { scrollHandler, x } = useScrollHandler();
    const flatRef = useRef(null)
    
    return (
        <View style={[styles.container, { backgroundColor: 'white' }]}>
            <ModalMisTarjetas openOptions={openOptions} infoCard={infoCard} setOpenOptions={setOpenOptions} MisTarjetas/>
            <Animated.FlatList
                showsHorizontalScrollIndicator={false}
                data={slides}
                ref={flatRef}
                // ref={ref => {flatRef = ref}}
                keyExtractor={(item) => item.key}
                horizontal
                bounces={false}
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                renderToHardwareTextureAndroid
                contentContainerStyle={{ alignItems: 'flex-start' }}
                style={{ flex: 1,  marginTop: -42, marginBottom: -40 }}
                snapToInterval={ITEM_SIZE}
                snapToAlignment='start'
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scroll.current } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                    const positionItem=index
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
                    // console.log(translateY,'translateY')

                    return (
                        <View style={{ width: ITEM_SIZE, }}>
                            <Animated.View
                                style={[{
                                    marginHorizontal: SPACING,
                                    padding: SPACING * 2 - 20,
                                    alignItems: 'center',
                                    transform: [{ translateY }],
                                    // backgroundColor: 'red',
                                    borderRadius: 34,
                                    // padding:12

                                }]}
                            >
                                <RectButton onPress={()=>{setOpenOptions(true);setInfoCard(item)}}>
                                <CardView
                                    name={`${first_name?.toUpperCase()} ${last_name?.toUpperCase()}`}
                                    number={`**** **** **** ${item.DatosCard.number}`}
                                    expiry={item.DatosCard.fecha}
                                    imageFront={getTypeCreditCardImg(item.TipoTarjeta)}
                                    imageBack={getTypeCreditCardImg('rosa')}
                                    scale={.8} />
                                </RectButton>
                                
                            </Animated.View>
                            <View style={{ justifyConten: 'center', alignItems: 'center', marginTop: 90 }}>
                                {slides.map(({ }, index, items) => {
                                    const opacity = scroll.current.interpolate({
                                        inputRange: [(index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE],
                                        outputRange: [-1, 1.1, -1],
                                        extrapolate: Extrapolate.CLAMP,
                                    })
                                    const i = index + 1
                                    const last = index === slides.length - 1
                                    // console.log((index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE,'(index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE')
                                    return (
                                        <Animated.View
                                            style={[{
                                                opacity,
                                                marginHorizontal: SPACING,
                                                padding: SPACING * 2,
                                                alignItems: 'center',
                                                position: 'absolute',
                                                // transform: [{ translateY }],
                                                // backgroundColor: 'cyan',
                                                borderRadius: 34,
                                            }]}
                                        >
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <View style={{ flex: 0, justifyContent: 'center' }}>
                                                    {/* <RectButton onPress={() => {
                                                        if (scroll) {
                                                            flatRef.current.scrollToIndex({animated: true, index: 2})
                                                            // const back = i-1
                                                            // console.log(back,'back')
                                                            // if (next === slides.length - 1) {
                                                            // flatRef.current.scrollToIndex({ animated: true, index: 0 })
                                                            // } else {
                                                            // console.log(positionItem-1, 'flatRef.current')
                                                            // flatRef.current.scrollToIndex({ animated: true, index: positionItem - 1 })
                                                            // }
                                                        }
                                                    }}>
                                                        <AntDesign name="left" size={40} color="blue" />
                                                    </RectButton> */}
                                                </View>
                                                <View style={{ alignItems: 'center' }}>
                                                    <Image source={items[i]?.imgBack} style={{ height: 80, width: 80, marginTop: -50 }} borderRadius={8} />
                                                    <Texto colorLabel={Colors.midnightblue} size={12}>{items[i]?.bank}</Texto>
                                                    <Texto colorLabel={Colors.midnightblue} size={14}>{items[i]?.TipoTarjeta}</Texto>
                                                    <Texto size={10} >{`${first_name?.toUpperCase()} ${last_name?.toUpperCase()}`}</Texto>
                                                    <Texto size={12} colorLabel={Colors.darkgray}>{items[i]?.status}</Texto>
                                                    <Texto size={25} colorLabel={Colors.midnightblue}>${items[i]?.balance}</Texto>
                                                    <Texto size={12} colorLabel={Colors.midnightblue}>USD {items[i]?.USD}</Texto>
                                                </View>
                                                <View style={{ flex: 0, justifyContent: 'center' }}>
                                                    {/* <RectButton onPress={() => {
                                                        if (scroll) {
                                                            
                                                            // if (next === slides.length - 1) {
                                                                // flatRef.current.scrollToIndex({ animated: true, index: 0 })
                                                            // } else {
                                                                // flatRef.current.scrollToIndex({animated: true,viewPosition: 0.5, index: 2})
                                                                // const currentStepIndex = positionItem + 1;
                                                                // flatRef.current.scrollToIndex({index: currentStepIndex, animated: true});
                                                                console.log(flatRef.current,'inputRange Global')
                                                                // {Animated.event(
                                                                //     [{ nativeEvent: { contentOffset: { x: scroll.current } } }],
                                                                //     { useNativeDriver: false }
                                                                // )}

                                                                console.log(scroll,'scroll')
                                                                console.log(flatRef.current.props.onScroll({x:150,y:150, useNativeDriver: true,nativeEvent: { contentOffset: { x:inputRange[2],y:inputRange[2]} } }),'inputRange Global')

                                                                console.log(inputRange[2],'inputRange 2')
                                                                console.log(inputRange,'inputRange All')
                                                                // flatRef.current.scrollToIndex({
                                                                //     animated: true,
                                                                //     // viewPosition: 0.5,
                                                                //     // viewPosition : 0.75,
                                                                //     index:3+.1,
                                                                //     // viewOffset:12
                                                                //     })
                                                                                                    // Animated.event(
                                                                                                    //     [{ nativeEvent: { contentOffset: { x:inputRange[2]} } }],
                                                                                                    //     { useNativeDriver: false }
                                                                                                    // )
                                                                    // animated?: boolean | null;
                                                                    // index: number;
                                                                    // viewOffset?: number;
                                                                    // viewPosition?: number;
                                                                // console.log(positionItem)
                                                                // console.log(positionItem-1)
                                                                // flatRef.current.scrollToIndex({ index: (index + 1), animated: true });
                                                                // flatRef.current.scrollToIndex({ animated: true,index: positionItem})
                                                            // }
                                                        }
                                                    }}>
                                                        <AntDesign name="right" size={40} color="blue" />
                                                    </RectButton> */}
                                                </View>
                                            </View>
                                        </Animated.View>
                                    )
                                })}
                            </View>
                        </View>
                    );
                }}
            />
            <View style={{ flex: 0, marginTop: vh(2) }}>

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

