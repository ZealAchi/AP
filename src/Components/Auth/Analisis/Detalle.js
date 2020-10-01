import React from "react"
import { Image, View } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import Colors from "../../../UI/Colors"
import { Header } from "../../../UI/Header"
import { Texto } from "../../../UI/Texto"
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import { CardView } from "../../../UI/CreditCard/type"
import { DataContext } from "../../../Context/Datos.Context"
import { getTypeCreditCardImg } from "../../../Util/BackgroundCard"
import * as RootNavigation from "../../../Navigations/RootNavigation"
import { useContext } from "react"

export function DetalleMovimiento(props) {

    const { item } = props.route.params
    const OptionIntems = [
        { icon: "pencil", label: "Modificar", FontAwesome: true, onPress: () => { RootNavigation.navigate("MovimientoEditar", { item: props.route.params?.item }) } },
        { Image: true, label: "Agregar recibo", source: require("../../../Assets/agregarRecibo.png") },
        { icon: "sticky-note", label: "Agregar nota", FontAwesome: true },
        { icon: "banckward", label: "Time Machine", AntDesign: true,onPress:()=>{RootNavigation.navigate("TimeMachine",{ item: props.route.params?.item})} },
    ]
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ paddingLeft: 12, paddingRight: 12 }}>
                <Header Return />
            </View>
            <View>
                <View style={{ alignItems: 'center' }}>
                    <CardView
                        name={"Pedro Montana"}
                        number={`**** **** **** ${item.tarjeta.DatosCard.number}`}
                        expiry={item.tarjeta.DatosCard.fecha}
                        imageFront={getTypeCreditCardImg(item.tarjeta.TipoTarjeta)}
                        imageBack={getTypeCreditCardImg('rosa')}
                        scale={.8} />
                    <View style={{ alignItems: 'center', marginTop: 12 }}>
                        <Texto size={12} Bold>{item.nombre}</Texto>
                        <Texto size={25} Bold>${item.monto}</Texto>
                        <Texto size={12}>{item.otherData.dia}, {item.otherData.d} {item.otherData.m}, {item.otherData.time}</Texto>
                    </View>
                </View>
                <View style={{ borderBottomColor: Colors.lavender, borderBottomWidth: 1, paddingTop: 8, paddingBottom: 8 }}>

                    <Texto size={12} Bold style={{ left: 8 }}>{"Opciones"}</Texto>

                </View>
                {OptionIntems.map((item) => {

                    return (
                        <View style={{ borderBottomColor: Colors.lavender, borderBottomWidth: 1 }}>
                            <RectButton key={item.label} style={{ paddingTop: 8, paddingBottom: 8, flexDirection: 'row', paddingLeft: 12, paddingRight: 12, alignItems: "center", justifyContent: "space-between" }} onPress={() => { item.onPress && item.onPress() }}>
                                <View style={{ flexDirection: 'row' }}>
                                    {item.FontAwesome && <FontAwesome color={Colors.Primary} name={item.icon} size={20} />}
                                    {item.AntDesign && <AntDesign color={Colors.Primary} name={item.icon} size={20} />}
                                    {item.Image && <Image source={item.source} style={{ height: 20, width: 20 }} />}
                                    <Texto size={12} style={{ left: 8 }}>
                                        {item.label}
                                    </Texto>
                                </View>
                                <View>
                                    <Entypo name="chevron-right" size={18} color={Colors.Primary} />
                                </View>
                            </RectButton>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}