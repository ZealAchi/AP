import React from 'react'
import { View, Image, Linking } from 'react-native'
import { ScreenContainer } from '../ScreenContainer'
import { Header } from '../../UI/Header'
import { Block } from '../../UI/Block'
import { Button } from '../../UI/Button'
import Colors from '../../UI/Colors'
import { Texto } from '../../UI/Texto'
import { ScrollView } from 'react-native-gesture-handler'


const ItemsNexCard = [
    {
        img: require("../../Assets/logos/BITAU.png"),
        imgBanner: require("../../Assets/Cards/Mastercard_Dorada_para_banner.png"),
        imgCard: require("../../Assets/Cards/Mastercard_Dorada.png"),
        label: "Itaú MasterCard Gold",
        type: "MC",
        typeColor: 'Gold',
        costoMensual: "UF 0,10",
        ComisionInternacional: "2,30%",
        Nota: "2/5 en múltiples beneficios",
        rentaMinima: "$600.000",
        link: "http://t.ly/Y1bP",
    },
    {
        img: require("../../Assets/logos/BancoEstado.png"),
        imgBanner: require("../../Assets/Cards/Mastercard_Dorada_para_banner.png"),
        imgCard: require("../../Assets/Cards/Mastercard_Dorada.png"),
        label: "Banco Estado Mastercard Gold",
        type: "MC",
        typeColor: 'Gold',
        costoMensual: "UF 0,9",
        ComisionInternacional: "1,90%",
        Nota: "4/5 en canje de puntos",
        rentaMinima: "$600.000",
        link: "http://t.ly/wJuq",
    }, {
        img: require("../../Assets/logos/Santanderx.png"),
        imgBanner: require("../../Assets/Cards/Visa_Platinum_para_banner.png"),
        imgCard: require("../../Assets/Cards/Visa_Platinum.png"),
        label: "Santander Platinum LATAM Pass Visa",
        type: "Visa",
        typeColor: 'Plata',
        costoMensual: "UF 0,23",
        ComisionInternacional: "2,50%",
        Nota: "5/5 en acumulación de puntos",
        rentaMinima: "$1.000.000",
        link: "http://t.ly/iqaI",
    }, {
        img: require("../../Assets/logos/Santanderx.png"),
        imgBanner: require("../../Assets/Cards/Mastercard_Black_para_banner.png"),
        imgCard: require("../../Assets/Cards/Mastercard_Black.png"),
        label: "Santander WorldMember LATAM Pass Mastercard",
        type: "MC",
        typeColor: 'Negro',
        costoMensual: "UF 0,34",
        ComisionInternacional: "sin comisión",
        Nota: "5/5 en múltiples beneficios",
        rentaMinima: "$1.700.000",
        link: "http://t.ly/lux2",
    },
]
export function NextCard() {
    return (
        <ScreenContainer backgroundColor={Colors.Secondary} padding scrollView>
            <Header Return />
            <Texto colorLabel={Colors.midnightblue} size={13} Bold>Elige tu próxima Tarjeta de Crédito</Texto>
            <Block style={{ alignItems: 'center', borderTopWidth: 1, borderTopColor: Colors.lavender, paddingTop: 10, marginTop: 12 ,backgroundColor: 'transparent'}}>
                {ItemsNexCard.map((item, i) => {
                    return <>
                        <View style={{ width: 320, height: 88, display: 'flex', flex: 1,  marginLeft: 7, marginRight: 7,borderWidth:0, backgroundColor:'transparent'}} >
                            <View style={{ position: 'absolute', flex: 1, height: 10,backgroundColor:'transparent'}}>
                                <Image source={item.imgBanner} resizeMode={"stretch"}  style={{
                                    flex: 1,
                                    position: 'absolute',
                                    transform: [{ scale: 0.88, }],
                                    top: -21,
                                    height: 140,
                                    width: 320,
                                    transform: [{ translateY: 22 }]
                                }} />
                            </View>
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: 243, height: 43, alignItems: 'center', flexDirection: 'row',backgroundColor:'transparent' }}>
                                    <Image source={item.type === "MC" ? require("../../Assets/logos/mc.png") : require("../../Assets/logos/Visa.png")} resizeMode="contain" style={{ height: 35, width: 35, marginLeft: 12 }} />
                                    <Texto colorLabel={item.typeColor === "Plata" ? "#13171b" : "white"} size={16} style={{ marginLeft: 5, fontFamily: "Montserrat" }}>{
                                        item.typeColor === "Gold" ?
                                            "Gold" :
                                            item.typeColor === "Plata" ?
                                                "Platinum" :
                                                "Black"
                                    }</Texto>

                                </View>
                                <View style={{ width: 43, height: 43 }}>
                                    <Image source={item.img} borderRadius={25} style={{
                                        height: 45,
                                        width: 30,
                                    }} resizeMode="contain" />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            display: 'flex', borderRadius: 8, flexDirection: 'column', elevation: 2, backgroundColor: 'white', width: 335, height: 135.85, padding: 12, bottom: 40,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 6,
                            },
                            shadowOpacity: 0.39,
                            shadowRadius: 8.30,

                            elevation: 13,
                        }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View>
                                    <Texto Bold size={12} colorLabel={Colors.midnightblue}>{item.label}</Texto>
                                    <Texto Bold size={12} colorLabel={Colors.midnightblue}>Costo mensual: <Texto colorLabel={Colors.midnightblue} size={12}>{item.costoMensual}</Texto></Texto>
                                    <Texto Bold size={12} colorLabel={Colors.midnightblue}>Comisión internacional: <Texto colorLabel={Colors.midnightblue} size={12}>{item.ComisionInternacional}</Texto></Texto>
                                    <Texto Bold size={12} colorLabel={Colors.midnightblue}>Nota: <Texto colorLabel={Colors.midnightblue} size={12}>{item.Nota}</Texto></Texto>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                    <Image source={item.imgCard} resizeMode={"center"} borderRadius={7} style={{
                                        top: -15,
                                        height: 80,
                                        width: 90,
                                        transform: [{ translateY: 22 }]
                                    }} />
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center',alignContent:'center'}}>
                                <View style={{top:-1}}>
                                    <Texto size={10} colorLabel={Colors.darkgray}>Renta mínima</Texto>
                                    <Texto Bold size={12} colorLabel={Colors.midnightblue}>{item.rentaMinima}</Texto>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Button onPress={async () => {
                                        console.log(item.link)
                                        const supported = await Linking.canOpenURL(item.link);

                                        if (supported) {
                                            await Linking.openURL(item.link);
                                        } else {
                                            Alert.alert(`Don't know how to open this URL: ${item.link}`);
                                        }
                                    }}
                                        label="Solicitar" styleButton={{ paddingLeft: 12, paddingRight: 12, width: 89, height: 27 }} borderRadius={50} />
                                </View>
                            </View>
                        </View>
                    </>
                })}
            </Block>
        </ScreenContainer>
    )
}