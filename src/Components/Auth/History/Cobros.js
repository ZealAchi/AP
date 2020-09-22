import React from 'react'
import { View } from 'react-native'
import { Texto } from '../../../UI/Texto'
import Colors from '../../../UI/Colors'

export function HistorialCobros() {
    return (<View style={{ backgroundColor: 'white', height: 83.9, elevation: 2, paddingLeft: 12, paddingRight: 12, borderRadius: 12, display: 'flex',flexDirection:'row',justifyContent:'center',alignItems:'center' }}>
        <View style={{flex:1,display:'flex'}}>
        <View style={{ paddingBottom: 6, marginBottom: 6, marginTop: 6, borderBottomColor: Colors.lavender, borderBottomWidth: 1 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Texto size={10} colorLabel={Colors.dimgray}>19:35</Texto>
                </View>
                <View>
                    <Texto Bold size={12} colorLabel={Colors.midnightblue}>Recibistes un cobro por</Texto>
                </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Texto Bold size={12} colorLabel={Colors.midnightblue}>RECHAZADO</Texto>
                <Texto size={12} colorLabel={Colors.dimgray}>$3000.000</Texto>
            </View>
        </View>
        <Texto size={12} colorLabel={Colors.midnightblue}>El cobro por el auto.</Texto>
        </View>
        <View style={{borderRightColor:Colors.Primary,borderRightWidth: 2, flex: 0,left:5,height:'80%'}}/>
    </View>)
}