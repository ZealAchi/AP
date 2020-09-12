import React,{useState,useContext,useEffect} from 'react'
import {StatusBar} from 'react-native'
import {vh} from 'react-native-css-vh-vw'
import Colors from '../../../UI/Colors'
import { Texto } from '../../../UI/Texto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { View, TouchableOpacity, Linking, ScrollView } from 'react-native'
import { ScreenContainer } from '../../ScreenContainer'
import { ContactsM } from '../../../UI/Contacts'

import { TextInput } from '../../../UI/Input'
import { Header } from '../../../UI/Header'
import { search } from '../../../UI/contacts/searchContact'
import { ContactsContext } from '../../../Context/Contacts.Context'
export function CobrarHome(props) {
    const { state: stateContext } = useContext(ContactsContext);

    const [buscarContacto, setBuscarContacto] = useState([])

    const { navigation } = props

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor(Colors.Primary)
            console.log('???')
        });
        return unsubscribe;
    }, [navigation])

    const Options = [
        { label: 'Crear un código QR o link para cobrar', icon: <FontAwesome name="qrcode" color={Colors.Primary} size={23} />, onPress: () => navigation.navigate('CobrarQR') },
        { label: 'Cobrar por whatsapp', icon: <FontAwesome name="whatsapp" color={Colors.Primary} size={23} />, onPress: () => Linking.openURL(`whatsapp://send?text=Hola`) },
        { label: 'Invita a amigos y ganar premios', icon: <Ionicons name="md-person-add" color={Colors.Primary} size={23} />, onPress: () => navigation.navigate('InvitaGana') },
    ]
    return (<ScreenContainer barBackgroundColor={Colors.Primary} backgroundColor={Colors.Secondary}>
        <View style={{flex:1}}>
        <ScrollView>
            <SafeAreaView style={{backgroundColor:Colors.Primary}}>
                <View style={{ display: 'flex', paddingLeft: 12, paddingRight: 12}}>
                    <Header color={Colors.Secondary} Return Enter={() => <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesome name="magnet" color={Colors.Secondary} size={23} />
                    </TouchableOpacity>} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 12, paddingRight: 12 }}>
                    </View>
                    <Texto size={13} colorLabel="white" style={{ textAlign: 'center' }}>¿A quién deseas Cobrarle?</Texto>
                    <View style={{ margin: 8, marginTop: 35 }}>
                        <TextInput onChangeText={text => search(stateContext.contacts?stateContext.contacts:[], text,setBuscarContacto)} borderRadius left icon={{ type: '', name: 'search', color: Colors.Primary }} style={{ width: 343, height: 38, fontSize: 12, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: Colors.lavender }} placeholder="Buscar Amigos" />
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: Colors.Secondary, marginTop: 30 }}>
                    {Options.map((item) => {
                        return (<TouchableOpacity onPress={() => item.onPress()} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 51, borderBottomColor: Colors.darkgray, borderBottomWidth: 1 }}>
                            <View style={{ marginLeft: 12 }}>{item.icon}</View>
                            <View style={{ marginLeft: 12 }}><Texto size={14} colorLabel={Colors.Primary}>{item.label}</Texto></View>
                        </TouchableOpacity>)
                    })}
                    <View style={{ margin: 10, marginBottom: 18,flex:1 }}>
                        {/* <ContactsM type="Cobrar" searchContact={buscarContacto}/> */}
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
        </View>
    </ScreenContainer>)
}