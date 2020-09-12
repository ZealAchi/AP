import React from 'react'
import {  View} from 'react-native'
import { Texto } from '../../../UI/Texto'
import { ScreenContainer } from '../../ScreenContainer'
import Colors from '../../../UI/Colors'
import { TabsNavigationNotifications } from '../../../Navigations/TabsNavigationNotifications'
import { Header } from '../../../UI/Header'
import { TabsNavigationCardShared } from '../../../Navigations/TabsNavigationcardShared'
export function CompartirTarjeta() {
    return <ScreenContainer backgroundColor={Colors.Secondary} >
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <View style={{ backgroundColor: 'white', width: '98%', height: 73, display: 'flex', padding: 12 }}>
            <Header Return/>
            <Texto Bold size={Colors.midnightblue} size={13}>Compartir Tarjeta</Texto>
        </View>
        </View>
        <View style={{ flex: 1 }}>
            <TabsNavigationCardShared/>
        </View>
    </ScreenContainer>
}