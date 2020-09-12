import React from 'react'
import {  View} from 'react-native'
import { Texto } from '../../../UI/Texto'
import { ScreenContainer } from '../../ScreenContainer'
import Colors from '../../../UI/Colors'
import { TabsNavigationNotifications } from '../../../Navigations/TabsNavigationNotifications'
import { Header } from '../../../UI/Header'
export function Notifications() {
    return <ScreenContainer backgroundColor={Colors.Secondary} >
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <View style={{ backgroundColor: 'white', width: '98%', height: 73, display: 'flex', padding: 12 }}>
            <Header Return/>
            <Texto Bold size={Colors.midnightblue} size={13}>Notificaciones</Texto>
        </View>
        </View>
        <View style={{ flex: 1 }}>
            <TabsNavigationNotifications></TabsNavigationNotifications>
        </View>
    </ScreenContainer>
}