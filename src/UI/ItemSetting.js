import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Texto } from './Texto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from './Colors'


export function ItemSetting(props) {
    const { item } = props
    return (
        <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center', borderBottomColor:Colors.lavender,borderBottomWidth:1}} onPress={() => item.onPress()}>
            <View style={{marginLeft:8, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'row' ,flex:1, justifyContent:'space-between'}}>
                    <View style={{flex:0.2,justifyContent: 'center',alignItems:'center'}}>
                        <item.icon />
                    </View>
                    <View style={{flex:1}}>
                    <Texto size={12}>{item.label}</Texto>
                    </View>
                </View>
                <View style={{flex:0.5,flexDirection:'row-reverse',margin:12}}>
                    {item.switch&&item.switch}
                    {item.arrow&&<Ionicons name="ios-arrow-forward" color={Colors.Primary} size={23} />}
                </View>
            </View>
        </TouchableOpacity>
    )
}