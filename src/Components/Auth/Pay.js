import React from "react"
import { View, Image, StatusBar, Pressable } from "react-native"
import Colors from "../../UI/Colors"
import { dp } from "../../UI/dist/Responsive.dev"
import { Header } from "../../UI/Header"
import { Texto } from "../../UI/Texto"
import EvilIcons from "react-native-vector-icons/EvilIcons"
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
import { Button } from "../../UI/Button"
export function Pay({navigation}) {


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

    const item = {
        img: require("../../Assets/logos/s.png"),
        label: "Santander Platinum LATAM Pass Visa",
        type: "Visa",
        typeColor: 'Plata',
        costoMensual: "UF 0,23",
        ComisionInternacional: "2,50%",
        Nota: "5/5 en acumulación de puntos",
        rentaMinima: "$1.000.000",
    }
    StatusBar.setBackgroundColor(Colors.Primary)
    return (<View style={{ flex: 1, backgroundColor: Colors.Primary }}>

        <View style={{ backgroundColor: Colors.Primary, height: "42%" }}>
            <View style={{ marginTop: 12, paddingLeft: 12, paddingRight: 12, height: dp(0.1) }}>
                <Header Return color={Colors.Secondary} />
            </View>
            <View style={{ flex: 1 }}>
                <Texto Bold size={13} colorLabel={Colors.Secondary} style={{ textAlign: "center", marginBottom: 12 }}>Pagar NFC</Texto>
                <Texto Bold size={12} colorLabel={Colors.Secondary} style={{ textAlign: "center" }}>¿Qué tarjeta deseas usar?</Texto>
                <View style={{alignItems:"center",marginTop:12}}>

                    <Pressable style={{ zIndex:99,height: 82 }}   onPress={()=>navigation.goBack()}>
                        <View  style={{ width: 320, height: 82, display: 'flex', flex: 1, borderRadius: 25, elevation: 1, marginLeft: 7, marginRight: 7 }} >
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
                                        />
                                    </Svg>
                                </View></View>
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={{ width: 243, height: 43, alignItems: 'center', flexDirection: 'row' }}>
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
                                    <Image source={item.img} style={{
                                        right: item.label === "Itaú MasterCard Gold" ? 0 : 40,
                                        height: item.label === "Itaú MasterCard Gold" ? 45 : 50,
                                        width: item.label === "Itaú MasterCard Gold" ? 30 : 80
                                    }} resizeMode="contain" />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            display: 'flex', borderRadius: 8, flexDirection: 'column', elevation: 2, backgroundColor: 'white', width: 335, height: 58.36, padding: 12,
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
                            <View style={{ flex: 1, borderRadius: 6, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Texto size={10} Bold colorLabel={Colors.midnightblue}>MasterCard Platinum</Texto>
                                    <Texto size={10} Bold colorLabel={Colors.dimgray}>Banco Santander</Texto>
                                    <Texto size={10} colorLabel={Colors.dimgray}>Hector Sánchez</Texto>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                        <View>
                                            <Texto size={10} colorLabel={Colors.dimgray} style={{textAlign:"right"}}>Costo de uso</Texto>
                                            <Texto size={10} Bold colorLabel={Colors.midnightblue} style={{textAlign:"right"}}>$5.000</Texto>
                                            <Texto size={10} Bold colorLabel={Colors.midnightblue} style={{textAlign:"right"}}>5%</Texto>
                                        </View>
                                    </View>
                                    
                                    <EvilIcons size={30} color={Colors.Primary} name="pencil" />
                                    
                                </View>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
            <View style={{ height: "40%", flexDirection: 'column-reverse', backgroundColor: Colors.Secondary }}>
                <Texto Bold size={14} colorLabel={Colors.Primary} style={{ textAlign: "center", paddingBottom: 30 }}>Acerque su teléfono al dispositivo</Texto>
            </View>
        </View>
        <Image source={require("../../Assets/Pagar.png")} style={{ width: "100%", height: "58%", bottom: 0, position: 'absolute' }} />
    </View>)
}