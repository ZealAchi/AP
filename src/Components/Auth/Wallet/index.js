import React from 'react'
import { TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native'
import { Block } from '../../../UI/Block'
import { Texto } from '../../../UI/Texto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScreenContainer } from '../../ScreenContainer'
import Colors from '../../../UI/Colors'
import { TabsNavigationWallet } from '../../../Navigations/TabsNavigationWallet'
import { Header } from '../../../UI/Header'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export function Wallet() {
    return <ScreenContainer backgroundColor={Colors.Secondary} >
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <View style={{ marginTop: 12, width: '98%', height: 73, display: 'flex', padding: 12, marginBottom: 12 }}>
            <Header color={Colors.Tertiary} Return 
        //      Enter={() => <TouchableOpacity onPress={() => {}}>
        //      <FontAwesome name="magnet" color={Colors.Tertiary} size={23} />
        //  </TouchableOpacity>}
            />
            <Texto size={Colors.midnightblue} size={13}>Wallet</Texto>
        </View>
        </View>
        <View style={{ flex: 1 }}>
            <TabsNavigationWallet></TabsNavigationWallet>
        </View>
    </ScreenContainer>
}