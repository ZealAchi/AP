import React from 'react'
import { View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Colors from './Colors'
import { Texto } from './Texto'

export function ItemAnalysis(props) {
    const { color } = props
    return (<View style={{ flexDirection: 'row',flex:1,padding:8,marginTop:6,backgroundColor:'white',borderRadius:10}}>
        <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flex:0}}><Entypo name="right" color={color ? color : Colors.Texto3} size={30} /></View>
        <View style={{flex:1,marginLeft:12}}>
            <Texto size={12}>Transferencias</Texto>
            <Texto size={10}>6 movimientos</Texto>
        </View>
        </View>
        <View style={{ flexDirection: 'row-reverse',flex:1}}>
            <Entypo name="chevron-right" color={color ? color : Colors.Texto3} size={30} />
            <View style={{alignSelf:'center'}}>
                <Texto size={10}>-$500.500</Texto>
            </View>
        </View>
    </View>)
}