import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { Block } from './Block'
import { Texto } from './Texto'
import Colors from './Colors'
import * as RootNavigation from '../Navigations/RootNavigation'


export function Header({ Return, Enter, color,onPressBack }) {
    return (<View style={{ height: 35, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <Block style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* <Texto size={12}>Cuenta</Texto> */}
            {Return &&
                <TouchableOpacity onPress={() => onPressBack?onPressBack():RootNavigation.navigationRef.current.goBack()}>
                    <Entypo name="chevron-left" color={color ? color : Colors.Texto3} size={30} style={{ right: 5 }} />
                </TouchableOpacity>}
            {Enter&&Enter === true ? <Entypo name="chevron-right" color={color ? color : Colors.Texto3} size={30} /> :Enter&&Enter()}
        </Block>
    </View>)
}