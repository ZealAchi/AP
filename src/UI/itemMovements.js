import React from 'react'
import { View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

import { Texto } from './Texto'
import Colors from './Colors'
export function ItemMovements({ color, data }) {
    return (<View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 8 }}>
        <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
            <Texto size={Colors.dimgray} size={10}>Jue</Texto>
            <Texto Bold size={Colors.dimgray} size={10}>27</Texto>
            <Texto size={Colors.dimgray} size={10}>Sep</Texto>
        </View>
        <View style={{ flexDirection: 'row', flex: 2,justifyContent:'center',alignItems:'center' }}>
            <View style={{ flex: 0, borderLeftColor: 'red', borderLeftWidth: 3, height:'80%'}} />
            <View style={{ flex: 2, justifyContent: 'center', paddingLeft: 8, }}>

                <Texto Bold size={Colors.midnightblue} size={12}>Transferencia de fondos de internet</Texto>
                <Texto Bold size={Colors.dimgray} size={10}>Santiago(Transferencia)</Texto>
            </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: "space-around" }}>
            <Texto Bold size={Colors.midnightblue} size={10}>- $40.326</Texto>
            <Entypo name="chevron-right" color={color ? color : Colors.Texto3} size={30} style={{ right: 5 }} />
        </View>
    </View>)
}