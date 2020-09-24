/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useRef ,useState, useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'
import Colors from '../../../UI/Colors'
import { Texto } from '../../../UI/Texto'
import Ionicons from 'react-native-vector-icons/Ionicons'


import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { View, TouchableOpacity, Linking, ScrollView } from 'react-native'
import { ScreenContainer } from '../../ScreenContainer'
import { ContactsM } from '../../../UI/Contacts'
import { TextInput } from '../../../UI/Input'
import { Header } from '../../../UI/Header'
import { search } from '../../../UI/contacts/searchContact'
import { ContactsContext } from '../../../Context/Contacts.Context'

import { DataContext } from '../../../Context/Datos.Context'

export function PagarHome(props) {

    const scrollRef = useRef(); 

    const { state: stateContext } = useContext(ContactsContext);
    const  Context=useContext(DataContext)
    const [buscarContacto, setBuscarContacto] = useState([])

    const { navigation } = props
    
    
        useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                StatusBar.setBackgroundColor(Colors.Primary);
                // if(props?.route?.params?.top===true){
                    // console.log(scrollRef,'scrollRef')
                    scrollRef.current?.scrollTo({
                        y: 0,
                        animated: true,
                    });
                // }else{
                    // console.log(false)
                // }
            });
            return unsubscribe;
        }, [navigation])

       
       
    
    // console.log(props?.route?.params,'props?.route?.params')
    // StatusBar.setBackgroundColor(Colors.Primary)
    const Options = [
        { label: 'Recibir plata por WhatsApp', icon: <FontAwesome name="whatsapp" color={Colors.Primary} size={23} />, onPress: () => navigation.navigate('CobrarQR',{wt:true}) },
        { label: 'Crear un código QR para recibir plata', icon: <FontAwesome name="qrcode" color={Colors.Primary} size={23} />, onPress: () => navigation.navigate('CobrarQR') },
        { label: 'Escanear código QR para transferir plata', icon: <MaterialCommunityIcons name="qrcode-scan" color={Colors.Primary} size={23} />, onPress: () => navigation.navigate('PagarQR') },
        { label: 'Invita a amigos y gana premios', icon: <Ionicons name="md-person-add" color={Colors.Primary} size={23} />, onPress: () => navigation.navigate('InvitaGana') },
        { label: 'Transferir plata por NFC', icon: <MaterialCommunityIcons name="nfc" color={Colors.Primary} size={23} />, onPress: () => {/* navigation.navigate('InvitaGana') */alert('Función no disponible') } },
    ]
    return (<ScreenContainer barBackgroundColor={Colors.Primary} backgroundColor={Colors.Secondary}>
        <ScrollView ref={scrollRef}>
            <SafeAreaView style={{ backgroundColor: Colors.Primary }}>
                <View style={{ display: 'flex', paddingLeft: 12, paddingRight: 12 }}>
                    <Header color={Colors.Secondary} Return Enter={() => <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesome name="magnet" color={Colors.Secondary} size={23} />
                    </TouchableOpacity>} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 12, paddingRight: 12 }}>
                    </View>
                    <Texto size={13} colorLabel="white" style={{ textAlign: 'center' }}>¿A quién deseas transferir?</Texto>
                    <View style={{ margin: 8, marginTop: 35 }}>
                        <TextInput onChangeText={text => search(stateContext.contacts ? stateContext.contacts : [], text, setBuscarContacto)} borderRadius left icon={{ type: '', name: 'search', color: Colors.Primary }} style={{ width: 343, height: 38, fontSize: 12, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: Colors.lavender }} placeholder="Buscar Amigos" />
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: Colors.Secondary, marginTop: 30 }}>
                    {Options.map((item) => {
                        return (<TouchableOpacity onPress={() => item.onPress()} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 51, borderBottomColor: Colors.darkgray, borderBottomWidth: 1 }}>
                            <View style={{ marginLeft: 12, width: 25, alignItems: 'center' }}>{item.icon}</View>
                            <View style={{ marginLeft: 12 }}><Texto size={14} colorLabel={Colors.Primary}>{item.label}</Texto></View>
                        </TouchableOpacity>)
                    })}
                    <View style={{ margin: 10, marginBottom: 18 }}>
                        <ContactsM type="Pagar" searchContact={buscarContacto} params={{ ...props?.route?.params }} />
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    </ScreenContainer>)
}