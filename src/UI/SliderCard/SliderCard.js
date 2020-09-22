// import { multiply, divide, interpolate, Extrapolate } from "react-native-reanimated";
// import { vh, vw } from 'react-native-css-vh-vw'

// import Colors from "../Colors"
// import { Texto } from "../Texto";
// import { CardView } from "../CreditCard/type";
// import { getTypeCreditCardImg } from "../../Util/BackgroundCard";
// import * as React from 'react';
// import {
//     View,
//     StyleSheet,
//     FlatList,
//     Image,
//     Dimensions,
//     Animated,
//     TouchableOpacity,
//     Platform,
// } from 'react-native';
// import { Button } from "../Button";
// import { useContext } from "react";
// import { DataContext } from "../../Context/Datos.Context";
// const { width, height } = Dimensions.get('window');

// const SPACING = 10;
// const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
// const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
// const BACKDROP_HEIGHT = height * 0.65;
// const slides = [
//     { key: 'empty-left' },
//     {
//         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//         imgBack: require("../../Assets/logos/BancoItau.jpg"),
//         bank: "Itaú",
//         TipoTarjeta: "MasterCard Gold",
//         status: "Disponible",
//         balance: "1.050.000",
//         USD: "1.375",
//         DatosCard: {
//             number: "1547",
//             fecha: "12/22",
//         }
//     },
//     {
//         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//         imgBack: require("../../Assets/logos/Santanderx.png"),
//         bank: "Santander",
//         TipoTarjeta: "Visa Platinum",
//         status: "Disponible",
//         balance: "2.454.322",
//         USD: "3.215",
//         DatosCard: {
//             number: "1222",
//             fecha: "01/23",
//         }
//     },
//     {
//         id: '3ac68afc-c605-48d3-a4f8-fbd9s1aa97f63',
//         imgBack: require("../../Assets/logos/Santanderx.png"),
//         bank: "Santander",
//         TipoTarjeta: "Mastercard Black",
//         status: "Disponible",
//         balance: "64.897.552",
//         USD: "85.022",
//         DatosCard: {
//             number: "1472",
//             fecha: "02/22",
//         }
//     },
//     { key: 'empty-right' }
// ];
// const SliderCard = ({navigation}) => {
//     const { state } = useContext(DataContext)
//     const first_name = state?.user?.profile?.first_name
//     const last_name = state?.user?.profile?.last_name
//     const scrollX = React.useRef(new Animated.Value(0)).current;

//     return (
//         <View style={[styles.container, { backgroundColor: 'white' }]}>

//             <Animated.FlatList
//                 showsHorizontalScrollIndicator={false}
//                 data={slides}
//                 keyExtractor={(item) => item.key}
//                 horizontal
//                 bounces={false}
//                 decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
//                 renderToHardwareTextureAndroid
//                 contentContainerStyle={{ alignItems: 'flex-start' }}
//                 style={{ flex: .4, /*backgroundColor: 'blue',*/ marginTop: -42, marginBottom: -50 }}
//                 snapToInterval={ITEM_SIZE}
//                 snapToAlignment='start'
//                 onScroll={Animated.event(
//                     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//                     { useNativeDriver: false }
//                 )}
//                 scrollEventThrottle={16}
//                 renderItem={({ item, index }) => {
//                     if (!item.id) {
//                         return <View style={{ width: EMPTY_ITEM_SIZE }} />;
//                     }

//                     const inputRange = [
//                         (index - 2) * ITEM_SIZE,
//                         (index - 1) * ITEM_SIZE,
//                         index * ITEM_SIZE,
//                     ];

//                     const translateY = scrollX.interpolate({
//                         inputRange,
//                         outputRange: [100, 50, 100],
//                         extrapolate: 'clamp',
//                     });

//                     return (
//                         <View style={{ width: ITEM_SIZE }}>
//                             <Animated.View
//                                 style={[{
//                                     marginHorizontal: SPACING,
//                                     padding: SPACING * 2 - 20,
//                                     alignItems: 'center',
//                                     transform: [{ translateY }],
//                                     backgroundColor: 'white',
//                                     borderRadius: 34,

//                                 }]}
//                             >
//                                 <CardView
//                                     name={`${first_name?.toUpperCase()} ${last_name?.toUpperCase()}`}
//                                     number={`**** **** **** ${item.DatosCard.number}`}
//                                     expiry={item.DatosCard.fecha}
//                                     imageFront={getTypeCreditCardImg(item.TipoTarjeta)}
//                                     imageBack={getTypeCreditCardImg('rosa')}
//                                     scale={.8} />
//                             </Animated.View>
//                             {/* <View style={{ height: 12, flex: 1, }}> */}


//                             {/* </View> */}
//                         </View>
//                     );
//                 }}
//             />
//             <View style={{ flex: 1,/*backgroundColor:'red',*/marginTop: vh(2) }}>
//                 <View style={{ flex: 1, justifyConten: 'center', alignItems: 'center' }}>
//                     {slides.map(({ }, index, items) => {
//                         const opacity = scrollX.interpolate({
//                             inputRange: [(index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE],
//                             outputRange: [-1, 1.1, -1],
//                             extrapolate: Extrapolate.CLAMP,
//                         })
//                         const i = index + 1
//                         return (
//                             <Animated.View
//                                 style={[{
//                                     opacity,
//                                     marginHorizontal: SPACING,
//                                     padding: SPACING * 2,
//                                     alignItems: 'center',
//                                     position: 'absolute',
//                                     // transform: [{ translateY }],
//                                     // backgroundColor: 'cyan',
//                                     borderRadius: 34,
//                                 }]}
//                             >
//                                 <Image source={items[i]?.imgBack} style={{ height: 80, width: 80, marginTop: -50 }} borderRadius={8} />
//                                 <Texto colorLabel={Colors.midnightblue} size={12}>{items[i]?.bank}</Texto>
//                                 <Texto colorLabel={Colors.midnightblue} size={14}>{items[i]?.TipoTarjeta}</Texto>
//                                 <Texto size={10} >{`${first_name?.toUpperCase()} ${last_name?.toUpperCase()}`}</Texto>
//                                 <Texto size={12} colorLabel={Colors.darkgray}>{items[i]?.status}</Texto>
//                                 <Texto size={25} colorLabel={Colors.midnightblue}>${items[i]?.balance}</Texto>
//                                 <Texto size={12} colorLabel={Colors.midnightblue}>USD {items[i]?.USD}</Texto>
//                             </Animated.View>
//                         )
//                     })}
//                 </View>
//                 <View style={{ flex: 0, bottom: 10, paddingLeft: '20%', paddingRight: '20%' }}>
//                     <Button onPress={() => navigation.navigate('AddCard') } styleButton={{ marginBottom: 12, borderRadius: 45 }} size={20} backgroundColor={'transparent'} color={Colors.Primary} label="Añadir tarjetas"></Button>
//                     <Button onPress={() => navigation.navigate('Pay') } styleButton={{ marginBottom: 12, borderRadius: 45 }} size={15} backgroundColor={Colors.Primary} label="Pagar"></Button>
//                 </View>
//             </View>
//         </View>
//     );
// }
// export default SliderCard

// const styles = StyleSheet.create({
//     loadingContainer: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     container: {
//         flex: 1,
//         backgroundColor: Colors.Primary,
//     },
//     paragraph: {
//         margin: 24,
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     posterImage: {
//         width: '100%',
//         height: ITEM_SIZE * 1.2,
//         resizeMode: 'cover',
//         borderRadius: 24,
//         margin: 0,
//         marginBottom: 10,
//     },
//     underlay: {
//         ...StyleSheet.absoluteFillObject,
//         alignItems: "center",
//         justifyContent: "flex-end",
//         borderBottomRightRadius: 12,
//         overflow: "hidden"
//     },
// });