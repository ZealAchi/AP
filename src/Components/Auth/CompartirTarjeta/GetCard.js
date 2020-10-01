/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React from 'react'
import { Pressable, View, Image, ScrollView } from 'react-native'
import { Texto } from '../../../UI/Texto'
import Colors from '../../../UI/Colors'
import { TextInput } from '../../../UI/Input'

import Entypo from "react-native-vector-icons/Entypo"
import Svg, {
    Rect,
    Use,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    SvgUri,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';

export function GetCard() {


    const items = [{
        img: require("../../../Assets/logos/Santanderx.png"),
        imgBanner: require("../../../Assets/Cards/Mastercard_Dorada_para_banner.png"),
        imgCard: require("../../../Assets/Cards/Mastercard_Dorada.png"),
        label: "Mastercard Gold",
        type: "MC",
        typeColor: 'Gold',
        costoMensual: "UF 0,10",
        ComisionInternacional: "2,30%",
        Nota: "2/5 en múltiples beneficios",
        rentaMinima: "$600.000",
        link: "http://t.ly/Y1bP",
        nombre:"Hector Sánchez",
        bankName:"Santander"
    }, {
        img: require("../../../Assets/logos/CMRFalabella.png"),
        imgBanner: require("../../../Assets/Cards/Mastercard_Falabella_para_Banner.png"),
        imgCard: require("../../../Assets/Cards/Mastercard_Falabella_para_Banner.png"),
        label: "Mastercard Gold",
        type: "MC",
        typeColor: 'Gold',
        costoMensual: "UF 0,34",
        ComisionInternacional: "sin comisión",
        Nota: "5/5 en múltiples beneficios",
        rentaMinima: "$1.700.000",
        link: "http://t.ly/lux2",
        nombre:"Pablo Tapia",
        bankName:"Falabella"
    }, {
        img: require("../../../Assets/logos/Santanderx.png"),
        imgBanner: require("../../../Assets/Cards/Visa_Platinum_para_banner.png"),
        imgCard: require("../../../Assets/Cards/Visa_Platinum.png"),
        label: "Mastercard Platinum",
        type: "Visa",
        typeColor: 'Plata',
        costoMensual: "UF 0,23",
        ComisionInternacional: "2,50%",
        Nota: "5/5 en acumulación de puntos",
        rentaMinima: "$1.000.000",
        link: "http://t.ly/iqaI",
        nombre:"Juan Diego",
        bankName:"Santander"
    }, {
        img: require("../../../Assets/logos/Santanderx.png"),
        imgBanner: require("../../../Assets/Cards/Mastercard_Black_para_banner.png"),
        imgCard: require("../../../Assets/Cards/Mastercard_Black.png"),
        label: "Mastercard Black",
        type: "MC",
        typeColor: 'Black',
        costoMensual: "UF 0,34",
        ComisionInternacional: "sin comisión",
        Nota: "5/5 en múltiples beneficios",
        rentaMinima: "$1.700.000",
        link: "http://t.ly/lux2",
        nombre:"José González",
        bankName:"Santander"
    },]

    return (<ScrollView><View style={{ padding: 10, flex: 1, backgroundColor: Colors.Secondary }}>
        
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 1, marginBottom: 8 }}>
            <TextInput borderRadius left icon={{ type: '', name: 'search' }} style={{ width: 343, height: 38, fontSize: 12, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: Colors.lavender }} placeholder="Buscar Tarjetas" />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {items&&items.map((item,i)=>{
                    return(<View style={{ width: 335, height: 110, display: 'flex',marginTop:12,marginBottom:8}} >
                    <View style={{ position: 'absolute', flex: 1, height: 95 }}>
                        <Image source={item.imgBanner} resizeMode={"stretch"} style={{
                            flex: 1,
                            position: 'absolute',
                            top: 7,
                            left: 7.5,
                            height: 118,
                            width: 320,
                            transform: [/*{ rotateX: '20deg'}, */{ scale: 1 }]
                        }} />
                        <View style={{ backgroundColor: Colors.Secondary, flex: 1, position: "absolute", height: 90, top: 50, width: 325, left: 7.5 }} />
                    </View>
                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', top: 2.5 }}>
                        <View style={{ width: 243, height: 45, alignItems: 'center', flexDirection: 'row' }}>
                            <Image source={item.type === "MC" ? require("../../../Assets/logos/mc.png") : require("../../../Assets/logos/Visa.png")} resizeMode="contain" style={{ height: 35, width: 35, marginLeft: 12 }} />
                            <Texto colorLabel={"white"} size={16} style={{ marginLeft: 5, fontFamily: "Montserrat" }}>{
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
                                width: 30
                            }} resizeMode="contain" />
                        </View>
                    </View>
                    <View style={{
                        display: 'flex', borderRadius: 8, flexDirection: 'column',
                        backgroundColor: 'white',
                        width: 335,
                        padding: 12,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 6,
                        },
                        shadowOpacity: 0.39,
                        shadowRadius: 8.30,
                        elevation: 13,
                        position: "absolute",
                        top: 45
                    }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Texto size={10} Bold colorLabel={Colors.midnightblue}>{item.label}</Texto>
                                <Texto size={10} Bold colorLabel={Colors.dimgray}>Banco {item.bankName}</Texto>
                                <Texto size={10} colorLabel={Colors.dimgray}>{item.nombre}</Texto>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                    <View>
                                        <Texto size={10} colorLabel={Colors.dimgray} style={{ textAlign: "right" }}>Costo de uso</Texto>
                                        <Texto size={10} Bold colorLabel={Colors.midnightblue} style={{ textAlign: "right" }}>$5.000</Texto>
                                        <Texto size={10} Bold colorLabel={Colors.midnightblue} style={{ textAlign: "right" }}>5%</Texto>
                                    </View>
                                </View>
                                <Entypo size={30} color={Colors.Primary} name="plus" />
                            </View>
                        </View>
                    </View>
                </View>)
                })}
            </View>
        </View>
        
    </View></ScrollView>)
}