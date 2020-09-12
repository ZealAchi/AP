/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useState, useContext, useEffect } from 'react'
import { View, FlatList, Switch, Image, TouchableOpacity, StatusBar } from 'react-native'
import { Texto } from '../../UI/Texto'
import { ScreenContainer } from '../ScreenContainer'

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontistof from 'react-native-vector-icons/Fontisto'
import Colors from '../../UI/Colors'
import { ItemSetting } from '../../UI/ItemSetting'
import { DataContext } from '../../Context/Datos.Context'
import { useLocalStorage } from '../../Hooks/useLocalStorage'
import { useAPI } from '../../Hooks/useAPI'
import { Modal } from '../Modal'
import { ModalContext } from '../../Context/Modal.Context'
import { Huellero } from '../../Util/Finger'

export function Perfil({ navigation }) {
    const { changeStatus } = useContext(ModalContext)
    const API = useAPI()
    const localStorage = useLocalStorage()
    const { withFinger, setWithFinger, state, avatar, getAvatar, updateNewPassword } = useContext(DataContext)
    const { profile = [] } = state.user
    // const [isEnabled, setIsEnabled] = useState(false);

    const [image, setImage] = useState();
    const [type, setType] = useState()

    const noSave = () => {
        localStorage.removeItem('@App:withFinger')
        setWithFinger(!withFinger)
        setType('')
    }
    const toggleSwitch = () => {
        // Abrir el huellero 
        if (withFinger) {
            noSave()

        } else {
            setType('activar')
            setWithFinger(!withFinger)
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor(Colors.Secondary)
            StatusBar.setBarStyle('dark-content')
        });
        return unsubscribe;
    }, [navigation])

    useEffect(() => {
        const uuid = state?.user?.profile?.uuid
        API.GetAPI.getAvatar(setImage, uuid)
    }, [])

    useEffect(() => {
        getAvatar(image)
    }, [image])

    const ItemsSettings = [
        {
            titulo: "Cuenta",
            items: [
                { icon: () => <FontAwesome5 name="wallet" size={20} color={Colors.Primary} />, label: 'Tus bancos', onPress: () => { navigation.navigate('MyAccounts') }, arrow: true },
                { icon: () => <FontAwesome5 name="credit-card" size={20} color={Colors.Primary} />, label: 'Tus tarjetas', onPress: () => { navigation.navigate('Wallet') }, arrow: true },
                { icon: () => <Fontistof name="line-chart" size={20} color={Colors.Primary} />, label: 'Ver movimientos', onPress: () => { navigation.navigate('Analysis') }, arrow: true },
                { icon: () => <Octicons name="settings" size={20} color={Colors.Primary} />, label: 'Ajustes', onPress: () => { }, arrow: true },
                { icon: () => <FontAwesome5 name="heart" color="#000" size={20} color={Colors.Primary} />, label: 'Invita a tus amigos', onPress: () => { navigation.navigate('InvitaGana') }, arrow: true },
            ]
        },
        {
            titulo: "Seguridad",
            items: [
                { icon: () => <FontAwesome5 name="key" size={18} color={Colors.Primary} />, label: 'Cambiar PIN de Seguridad', onPress: () => { updateNewPassword(true); navigation.push('EnterYourPin') },arrow: true},
                {
                    icon: () => <MaterialCommunityIcons name="fingerprint" size={20} color={Colors.Primary} />, label: 'Autenticar con huella', onPress: () => {}
                    , switch: <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={withFinger ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={JSON.parse(withFinger)}
                    />, check: true
                },
            ]
        },
        {
            titulo: "Ayuda",
            items: [
                { icon: () => <Ionicons name="md-help-circle" size={20} color={Colors.Primary} />, label: 'Soporte y ayuda', onPress: () => { changeStatus(true); setType('') }, arrow: true },
                { icon: () => <MaterialCommunityIcons name="file-document" size={20} color={Colors.Primary} />, label: 'Términos y condiciones', onPress: () => { changeStatus(true); setType('') }, arrow: true },
            ]
        },
    ]
    return (<ScreenContainer padding scrollView backgroundColor={'transparent'}>
        <Texto Bold>Mi Perfil</Texto>
        <TouchableOpacity style={{marginTop:12}} onPress={() => navigation.navigate('UpdatePerfil')}>
            <View style={{ backgroundColor: 'white', height: 51, padding: 12 }}>
                <View style={{ flex: 1, height: 51, justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 30, height: 30, backgroundColor: 'red' }} borderRadius={10} source={{ uri: `${avatar}` }} />
                        <View style={{ flexDirection: 'column', marginLeft: 12 }}>
                            <Texto size={12}>{profile.first_name} {profile.last_name}</Texto>
                            <Texto size={10}>{profile.email}</Texto>
                        </View>
                    </View>
                    <View>
                        <Ionicons name="ios-arrow-forward" color={Colors.Primary} size={23} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        {ItemsSettings.map((item, i) => {
            return (<View>
                <Texto Bold>{item.titulo}</Texto>
                <View style={{ marginBottom: 10,marginTop:0 }}>
                    <FlatList
                        data={item.items}
                        renderItem={({ item }) => <ItemSetting item={item} />}
                    />
                </View>
            </View>
            )
        })}
        {/* <Modal type={type} /> */}
        {type === 'activar' && <Huellero type={type} returnValue={() => setType('')} noSave={noSave} />}
    </ScreenContainer>)
}
