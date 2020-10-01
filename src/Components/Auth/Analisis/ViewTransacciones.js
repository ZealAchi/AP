import React from "react"
import { View } from "react-native"
import Entypo from "react-native-vector-icons/Entypo"
import { RectButton, ScrollView } from "react-native-gesture-handler"
import { Button } from "../../../UI/Button"
import Colors from "../../../UI/Colors"
import BarChart from "../../../UI/Graph/BarChart"
import { Header } from "../../../UI/Header"
import { Texto } from "../../../UI/Texto"
import * as RootNavigation from "../../../Navigations/RootNavigation"

export function ViewTransacciones(props) {
    const { item } = props.route.params
    console.log(props,'props ;v')
    return (
        <View style={{ backgroundColor: Colors.Secondary, flex: 1 }}>
            <ScrollView>
                <View style={{ paddingLeft: 12, paddingRight: 12 }}>
                    <Header Return color={Colors.Primary} />
                    <View style={{ display: 'flex', flex: 0, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Texto Bold size={13} colorLabel={Colors.midnightblue}>{item.title}</Texto>
                            {item.diaMesAño&&<Texto Bold size={12} colorLabel={Colors.darkgray}>{item.diaMesAño.inicioFin}</Texto>}
                        </View>
                        <View style={{ flex: .3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Button label="Mes" styleButton={{ flex: 1, height: 24, borderRadius: 25 }} />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.4, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', marginLeft: 8, marginRight: 8 }}>
                    {item?.grafica && <BarChart data={item.grafica} round={100} unit="€" />}
                </View>
                <View>

                    <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 12, paddingRight: 12, paddingTop: 12, paddingBottom: 12 }}>
                        <View>
                            <Texto size={14} Bold>{item.title}</Texto>
                            {item.diaMesAño&&<Texto size={12} colorLabel={Colors.darkgray}>{item.diaMesAño.mesAño}</Texto>}
                        </View>
                        <View>
                            <Texto colorLabel={Colors.Primary} Bold size={12}>$ {item.amount}</Texto></View>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 8}}>
                        {item?.Items && item.Items.map((item) => {
                            return (
                                <ItemViewTransaccion {...{ item,title:props.route.params.item.title}} />
                            )
                        })}

                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export const ItemViewTransaccion = ({ item,title }) => {
    return (
        <RectButton style={{ backgroundColor: "white", height: 50, flexDirection: 'row', width: "90%", borderRadius: 8, marginTop: 5, marginBottom: 6, paddingLeft: 3, paddingRight: 8 }}
            onPress={() => {
                title==="Supermercado"&&RootNavigation.navigate("DetalleMovimiento",{...{item}})
                title==="Transferencias"&&RootNavigation.navigate('VerTransferencia', {
                    ...{item},
                    ItemTransferencia:item?.otherData.ItemTransferencia,
                    user:"José Herrera",
                    index:item.index
                })
                
                }} >
            <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ width: 40, justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
                    <View>
                        <Texto size={12} textAlign="center" colorLabel={Colors.darkgray} style={{}}>{item.otherData.dia.substr(0,3)}</Texto>
                        <Texto size={12} textAlign="center" colorLabel={Colors.midnightblue} style={{}}>{item.otherData.d}</Texto>
                        <Texto size={12} textAlign="center" colorLabel={Colors.darkgray} style={{}}>{item.otherData.m.substr(0,3)}</Texto>
                    </View>
                    <View style={{ borderRightColor: Colors.Primary, borderRightWidth: 2, flex: 0, left: 5, height: '88%' }} />
                </View>
                <View style={{ justifyContent: "center" }}>
                    <Texto size={12} colorLabel={Colors.midnightblue}>{item.nombre}</Texto>
                    <Texto size={12} colorLabel={Colors.darkgray} >{item.lugar}</Texto>
                </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center"  }}>
                <Texto size={12} colorLabel={Colors.midnightblue}>{item.ingreso ? "+" : "-"}${item.monto}</Texto>
            </View>
            </View>

            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Entypo name="chevron-right" size={18} color={Colors.Primary} />
            </View>
        </RectButton>
    )
}