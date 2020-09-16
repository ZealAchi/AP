import React from 'react'
import { View, Image } from 'react-native'
import { ScreenContainer } from '../ScreenContainer'
import { Header } from '../../UI/Header'
import { Block } from '../../UI/Block'
import { Button } from '../../UI/Button'
import Colors from '../../UI/Colors'
import { Texto } from '../../UI/Texto'
import { ScrollView } from 'react-native-gesture-handler'
import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
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


const ItemsNexCard = [
    {
        img: require("../../Assets/logos/BITAU.png"),
        label: "Itaú MasterCard Gold",
        type: "MC",
        typeColor: 'Gold',
        costoMensual: "UF 0,10",
        ComisionInternacional: "2,30%",
        Nota: "2/5 en múltiples beneficios",
        rentaMinima: "$600.000",
    }, {
        img: require("../../Assets/logos/Banco_de_Chile_Logo.png"),
        label: "Banco Estado Mastercard Gold",
        type: "MC",
        typeColor: 'Gold',
        costoMensual: "UF 0,9",
        ComisionInternacional: "1,90%",
        Nota: "4/5 en canje de puntos",
        rentaMinima: "$600.000",
    }, {
        img: require("../../Assets/logos/s.png"),
        label: "Santander Platinum LATAM Pass Visa",
        type: "Visa",
        typeColor: 'Plata',
        costoMensual: "UF 0,23",
        ComisionInternacional: "2,50%",
        Nota: "5/5 en acumulación de puntos",
        rentaMinima: "$1.000.000",
    }, {
        img: require("../../Assets/logos/s.png"),
        label: "Santander WorldMember LAAM Pass Mastercard",
        type: "MC",
        typeColor: 'Negro',
        costoMensual: "UF 0,34",
        ComisionInternacional: "sin comisión",
        Nota: "5/5 en múltiples beneficios",
        rentaMinima: "$1.700.000",
    },
]
export function NextCard() {

    const CG = {
        backgroundColor: "#b79239",
        background1: "#e1c878",
        background2: "#b79239",
    }
    const CP = {
        backgroundColor: "#dddddd",
        background1: "#9b9b9b",
        background2: "#dddddd",
    }
    const CN = {
        backgroundColor: "#3b3b3b",
        background1: "#121212",
        background2: "#3b3b3b",
    }

    return (
        <ScreenContainer backgroundColor={Colors.Secondary} padding>
            <Header Return />
            <Texto colorLabel={Colors.midnightblue} size={13} Bold>Elige tu próxima Tarjeta de Crédito</Texto>
            <Block style={{ alignItems: 'center', borderTopWidth: 1, borderTopColor: Colors.lavender, paddingTop: 10, marginTop: 12 }}>
                <ScrollView>
                    {ItemsNexCard.map((item, i) => {
                        return <>
                            <View style={{ backgroundColor: "red", width: 320, height: 82, display: 'flex', flex: 1, borderRadius: 25, elevation: 1, marginLeft: 7, marginRight: 7 }} >
                                <View style={{ position: 'absolute', display: 'flex' }}>
                                    <View id style={{
                                        height: 82, width: 320, display: 'flex', backgroundColor: item.typeColor === "Gold" ?
                                            CG.backgroundColor :
                                            item.typeColor === "Plata" ?
                                                CP.backgroundColor :
                                                CN.backgroundColor,
                                        alignContent: 'center', alignItems: 'center', justifyContent: 'center', position: 'absolute', borderRadius: 25
                                    }}>
                                        <Svg height="82" width="260" y="20">
                                            <Defs>
                                                <RadialGradient
                                                    id="grad"
                                                    cx="50%"
                                                    cy="50%"
                                                    rx="50%"
                                                    ry="50%"
                                                    fx="50%"
                                                    fy="50%"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <Stop offset="0%" stopColor={item.typeColor === "Gold" ?
                                                        CG.backgroundColor :
                                                        item.typeColor === "Plata" ?
                                                            CP.backgroundColor :
                                                            CN.backgroundColor
                                                    } stopOpacity="1" />
                                                    <Stop offset="100%" stopColor={item.typeColor === "Gold" ?
                                                        CG.backgroundColor :
                                                        item.typeColor === "Plata" ?
                                                            CP.backgroundColor :
                                                            CN.backgroundColor
                                                    } stopOpacity="1" />
                                                </RadialGradient>
                                            </Defs>
                                            <Rect
                                                x="0"
                                                y="0"
                                                width="320"
                                                height="82"
                                                fill="url(#grad)"

                                            // clipPath="url(#clip)"
                                            />
                                        </Svg>
                                    </View></View>
                                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={{ width: 243, height: 43, alignItems: 'center', flexDirection: 'row' }}>
                                        <Image source={item.type === "MC" ? require("../../Assets/logos/mc.png") : require("../../Assets/logos/Visa.png")} resizeMode="contain" style={{ height: 35, width: 35,marginLeft:12 }} />
                                        <Texto colorLabel={item.typeColor === "Plata"?"#13171b":"white"} size={16}  style={{marginLeft:5,fontFamily:"Montserrat"}}>{
                                            item.typeColor === "Gold" ?
                                                "Gold" :
                                                item.typeColor === "Plata" ?
                                                    "Platinum" :
                                                    "Black"
                                        }</Texto>

                                    </View>
                                    <View style={{ width: 43, height: 43 }}>
                                        <Image source={item.img} style={{
                                            right: item.label === "Itaú MasterCard Gold" ? 0 : 40,
                                            height: item.label === "Itaú MasterCard Gold" ? 45 : 50,
                                            width: item.label === "Itaú MasterCard Gold" ? 30 : 80
                                        }} resizeMode="contain" />
                                    </View>
                                </View>
                            </View>
                            <View style={{ display: 'flex', borderRadius: 8, flexDirection: 'column', elevation: 2, backgroundColor: 'white', width: 335, height: 135.85, padding: 12, bottom: 40 }}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <View>
                                        <Texto Bold size={12}>{item.label}</Texto>
                                        <Texto Bold size={12}>Costo mensual: <Texto size={12}>{item.costoMensual}</Texto></Texto>
                                        <Texto Bold size={12}>Comisión internacional: <Texto size={12}>{item.ComisionInternacional}</Texto></Texto>
                                        <Texto Bold size={12}>Nota: <Texto size={12}>{item.Nota}</Texto></Texto>
                                    </View>

                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Texto size={12}>Renta mínima</Texto>
                                        <Texto Bold size={12}>{item.rentaMinima}</Texto>
                                    </View>
                                    <View style={{alignItems:'center',justifyContent:'center'}}>
                                        <Button label="Solicitar" styleButton={{ paddingLeft: 12, paddingRight: 12, width: 89,height:27}} borderRadius={50} />
                                    </View>
                                </View>
                            </View>
                        </>
                    })}


                    {/* <View style={{ backgroundColor: "transparent", width: 320, height:82 , borderRadius: 25,elevation:1 }} />
                <View style={{ display: 'flex',borderRadius:8, flexDirection: 'column',elevation:2, backgroundColor: 'white',width:343,height: 135.85 ,padding:12,bottom:40}}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View>
                            <Texto Bold size={12}>MasterCard Platinum . Santander</Texto>
                            <Texto Bold size={12}>Costo mensual: <Texto size={12}>UF 0,105</Texto></Texto>
                            <Texto Bold size={12}>Comisión internacional: <Texto size={12}>Sin comisión</Texto></Texto>
                            <Texto Bold size={12}>Nota: <Texto size={12}>5/5 en canje de puntos</Texto></Texto>
                        </View>
                        
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row',justifyContent:'space-between'}}>
                        <View>
                            <Texto size={12}>Renta minima</Texto>
                            <Texto Bold size={12}>$ 301.000</Texto>
                        </View>
                        <View>
                            <Button label="Solicitar" styleButton={{paddingLeft:12,paddingRight:12,width:89}} borderRadius={50}/>
                        </View>
                    </View>
                </View> */}
                </ScrollView>
            </Block>


        </ScreenContainer>
    )
}