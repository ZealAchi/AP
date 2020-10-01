import React from 'react'
import { View } from 'react-native'
import { Texto } from '../../../UI/Texto'
import Colors from '../../../UI/Colors'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { RectButton } from 'react-native-gesture-handler'
import * as RootNavigation from "../../../Navigations/RootNavigation"
export function HistorialTransferencias(props) {
    const { item,ItemTransferencia,index,user } = props
    return (
        
        <RectButton onPress={()=>{
            RootNavigation.navigate('VerTransferencia', {
            ...{item},
            ...{ItemTransferencia},
            ...{user},
            index
        })}} style={{ backgroundColor: 'white', height: 83.9, elevation: 2, marginLeft: 12, paddingLeft: 12, marginBottom: 12, marginRight: 12, paddingRight: 12, borderRadius: 12, display: 'flex', flexDirection: item.tipo === "Enviastes" ? 'row-reverse' : "row", justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, display: 'flex' }}>
                <View style={{ paddingBottom: 6, marginBottom: 6, marginTop: 6, borderBottomColor: Colors.lavender, borderBottomWidth: 1 }}>
                    <View style={{ display: 'flex', flexDirection: item.tipo === "Enviastes" ? 'row' : "row-reverse", justifyContent: 'space-between' }}>
                        <Texto Bold size={12} colorLabel={Colors.midnightblue}> {item.tipo === "Enviastes" ? "Realizastes una transferencia" : "Recibistes una transferencia"}</Texto>
                        <Texto size={10} colorLabel={Colors.dimgray}>{item.time}</Texto>
                    </View>
                    <View style={{ display: 'flex', flexDirection: item.tipo === "Enviastes" ? 'row' : "row-reverse", justifyContent: 'space-between', paddingLeft: 35, paddingRight: 35 }}>
                        <Texto size={12} colorLabel={Colors.Primary} Bold>${item.cantidad}</Texto>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Texto size={12} colorLabel={Colors.midnightblue}>{item.concepto}</Texto>
                    <FontAwesome size={20} color={Colors.Primary} name="chain" />
                </View>

            </View>
            <View style={{ borderRightColor: Colors.Primary, borderRightWidth: 2, flex: 0, left: 5, height: '80%' }} />
        </RectButton>)
}