import React from 'react'
import { View, StatusBar } from 'react-native'

import { dp } from '../../../../UI/dist/Responsive.dev'
import Colors from '../../../../UI/Colors'
import { Header } from '../../../../UI/Header'
import { TabsNavigationQueSonYPorQue } from '../../../../Navigations/TabsNavigationQueSonYPorQue'
import { ScrollView } from 'react-native-gesture-handler'


export function QueSonYPorQue() {
    StatusBar.setBackgroundColor(Colors.Primary)
    return (<View style={{ height: dp(2), backgroundColor: Colors.Primary, }}>
        <ScrollView>
        <View style={{paddingLeft:12,paddingRight:12}}>
        <Header Return  color={Colors.Secondary} />
        </View>
        <TabsNavigationQueSonYPorQue />
        </ScrollView>
    </View>)
}