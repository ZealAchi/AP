import React,{useEffect} from 'react'
import { TouchableOpacity, View, ScrollView, SafeAreaView,StatusBar } from 'react-native'
import { Texto } from '../../../UI/Texto'
// import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScreenContainer } from '../../ScreenContainer'
import Colors from '../../../UI/Colors'
import { TabsNavigationWallet } from '../../../Navigations/TabsNavigationWallet'
import { Header } from '../../../UI/Header'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export function Wallet({navigation}) {

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor(Colors.Primary)
            StatusBar.setBarStyle('dark-content')
        });
        return unsubscribe;
    }, [navigation])
    StatusBar.setBackgroundColor(Colors.Primary)
    return <ScreenContainer backgroundColor={Colors.Secondary} >
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <View style={{ marginTop: 12, width: '98%', height: 73, display: 'flex', padding: 12, marginBottom: 12 }}>
            <Header color={Colors.Primary} Return 
        //      Enter={() => <TouchableOpacity onPress={() => {}}>
        //      <FontAwesome name="magnet" color={Colors.Primary} size={23} />
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