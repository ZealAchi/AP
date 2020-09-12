import React from 'react'

import  {View} from 'react-native'
import { Texto } from '../../../UI/Texto'
import { ItemMovements } from '../../../UI/itemMovements'
import Colors from '../../../UI/Colors'

export function Archivadas() {
    return (<View style={{margin:10,flex:1}}>
    <Texto size={12} colorLabel={Colors.midnightblue}>Septiembre 2020</Texto>
    <View style={{marginTop:12,marginBottom:2}}>
    <ItemMovements/>
    </View>
    <View style={{marginTop:12,marginBottom:2}}>
    <ItemMovements/>
    </View>
    <View style={{marginTop:12,marginBottom:2}}>
    <ItemMovements/>
    </View>
    <View style={{marginTop:12,marginBottom:2}}>
    <ItemMovements/>
    </View>
</View>)
}