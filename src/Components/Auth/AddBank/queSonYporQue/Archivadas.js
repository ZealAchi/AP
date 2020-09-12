import React from 'react'
import { View, Image, } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { dp } from '../../../../UI/dist/Responsive.dev'
import { Title } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import Colors from '../../../../UI/Colors'


export function Archivadas() {
    return (<View style={{ display: 'flex', backgroundColor: Colors.Primary, flex: 1 }}>
        <ScrollView >
            <View style={{ paddingLeft: 18, paddingRight: 18 }}>
                <Title style={{ fontSize: 12, fontWeight: "bold", color: 'white' }}>Seguridad de nuestra plataforma</Title>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome5 color={Colors.Secondary} name="shield-alt" size={30} style={{ marginLeft: 18, marginRight: 12 }} />
                    <View style={{ width: dp(0.7) }}>
                        <Title style={{ fontSize: 12, lineHeight: 18, textAlign: 'justify', color: 'white' }}>Cumplimos con las exigencias de seguridad de la
                        <Title style={{ fontSize: 12, fontWeight: "bold", color: 'white' }}> Directiva Europea PSD2</Title></Title>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginBottom:12 }}>
                    <FontAwesome5 color={Colors.Secondary} name="fingerprint" size={30} style={{ marginLeft: 18, marginRight: 12 }} />
                    <View style={{ width: dp(0.7) }}>
                        <Title style={{ fontSize: 12, color: 'white', textAlign: 'left', lineHeight: 18 }}>Tu información está cifrada con la misma tecnología que los bancos más avanzados</Title>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginBottom:12 }}>
                    <FontAwesome5 color={Colors.Secondary} name="user-shield" size={30} style={{ marginLeft: 18, marginRight: 12 }} />
                    <View style={{ width: dp(0.7) }}>
                        <Title style={{ fontSize: 12, color: 'white', textAlign: 'left', lineHeight: 18 }}>Tus datos personales están protegidos y son estrictamente confidenciales</Title>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginBottom:12 }}>
                    <FontAwesome5 color={Colors.Secondary} name="user-lock" size={30} style={{ marginLeft: 18, marginRight: 12 }} />
                    <View style={{ width: dp(0.7) }}>
                        <Title style={{ fontSize: 12, color: 'white', textAlign: 'left', lineHeight: 18 }}>Auditada por expertos en seguridad y privacidad digital</Title>
                    </View>
                </View>
            </View></ScrollView>
    </View>)
}