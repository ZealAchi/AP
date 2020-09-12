import React, { useState, useContext, useEffect } from 'react'
import Clipboard from "@react-native-community/clipboard";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { View, Image, SafeAreaView,StatusBar } from 'react-native'
import Share from 'react-native-share';

import { Block } from '../../UI/Block'
import { Texto } from '../../UI/Texto'
import Colors from '../../UI/Colors'
import { ListUser } from '../../UI/ListUser'
import { Button } from '../../UI/Button'
import { TextInput } from '../../UI/Input'
import { ScreenContainer } from '../ScreenContainer'

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { DataContext } from '../../Context/Datos.Context';
import { AlertMessage } from '../Alert';

import { useAPI } from '../../Hooks/useAPI';
import { Header } from '../../UI/Header';
export function InvitaGana({ navigation }) {
    const [result, setResult] = useState('');
    const { state, usersReferences } = useContext(DataContext)
    const [copiedText, setCopiedText] = useState('')


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor(Colors.Primary)
            StatusBar.setBarStyle('dark-content')
        });
        return unsubscribe;
    }, [navigation])


    const copyToClipboard = () => {
        Clipboard.setString(`${state.user.profile.reference_code}`)
        AlertMessage({ message: "¡Codigo copiado!" })
    }

    function getErrorString(error, defaultValue) {
        let e = defaultValue || 'Something went wrong. Please try again';
        if (typeof error === 'string') {
            e = error;
        } else if (error && error.message) {
            e = error.message;
        } else if (error && error.props) {
            e = error.props;
        }
        return e;
    }

    const shareSingleImage = async () => {
        const shareOptions = {
            title: 'Invita y Gana',
            url: `${state.user.profile.reference_code}`,
            failOnCancel: false,
        };

        try {
            const ShareResponse = await Share.open(shareOptions);
            setResult(JSON.stringify(ShareResponse, null, 2));
        } catch (error) {
            console.log('Error =>', error);
            setResult('error: '.concat(getErrorString(error)));
        }
    };
    return (<ScreenContainer barBackgroundColor={Colors.Primary} backgroundColor={Colors.Secondary} >
        <ScrollView removeClippedSubviews={true}>
            <SafeAreaView style={{ backgroundColor: Colors.Primary }}>
                <View style={{ display: 'flex', paddingLeft: 12, paddingRight: 12 }}>
                    <Header color={Colors.Secondary} Return Enter={() => <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesome name="magnet" color={Colors.Secondary} size={23} />
                    </TouchableOpacity>} />
                </View>

                <View style={{ display: 'flex', backgroundColor: Colors.Primary }}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                        <Texto style={{ textAlign: 'center' }} colorLabel="white" size={19} >Invita a tus amigos y gana entre $1.000 y $1.000.000</Texto>
                        <Texto style={{ textAlign: 'center' }} size={12} colorLabel="white" >Tu invitado debe cargar una tarjeta válida.</Texto>
                        <View style={{ marginTop: 20 }}>
                            <Image style={{ width: 138, height: 162 }} source={require('../../Assets/ImgInvitayGana.png')} />
                        </View>
                        <Texto style={{ marginTop: 20 }} colorLabel="white" size={12}>Haz click debajo para copiar el código </Texto>
                    </View>
                    <TouchableOpacity onPress={() => copyToClipboard()}>
                        <View pointerEvents='none' style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                            <TextInput borderRadius editable={false} selectTextOnFocus={false} disable value={state.user.profile.reference_code} right icon={{ type: 'FontAwesome5', name: 'copy' }} placeholder="" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: Colors.Secondary, padding: 1 }}>
                    <ObtenerReferidos data={usersReferences} />
                </View>

            </SafeAreaView></ScrollView>
        <Button onPress={() => shareSingleImage()} styleButton={{ position: 'absolute', bottom: 20, right: 50, left: 50, borderRadius: 18 }} label="INVITA Y GANA" />
    </ScreenContainer>)
}
const ObtenerReferidos = ({ data = [] }) => {
    return (<SafeAreaView style={{ marginBottom: 14, flex: 1,display:'flex' }}>
        <Texto colorLabel={Colors.Primary} size={12}>Referidos</Texto>
        <View style={{ alignItems: 'center',flex:1}}>
            <ListUser data={data} nostyle />
        </View>
    </SafeAreaView>
    )
}