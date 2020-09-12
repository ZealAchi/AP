import React from 'react'
import { View, Image, ScrollView } from 'react-native'
import { dp } from '../../../../UI/dist/Responsive.dev'
import { Title } from 'react-native-paper'
import Colors from '../../../../UI/Colors'

export function Recibidas() {
    return (<View style={{ display: 'flex', backgroundColor: Colors.Primary, flex: 1 }}>
        <ScrollView >
            <View style={{ paddingLeft: 18, paddingRight: 18 }}>
                <Title style={{ fontSize: 12, fontWeight: "bold", color: 'white' }}>Claves de acceso</Title>
                <Title style={{ fontSize: 12, lineHeight: 18, textAlign: 'justify', color: 'white' }}>Son las que usas para acceder a la web en tu entidad. Estas claves son de consulta, con ellas no se pueden realizar operaciones, sólo ver las que hayas hecho.</Title>
                <View style={{ alignItems: 'center', marginTop: 18, marginBottom: 18 }}>
                    <Image style={{ width: 280.73, height: 226.09 }} source={require("../../../../Assets/Image1.png")} />
                </View>
                <View style={{ paddingLeft: 2.5, paddingRight: 2.5 }}>
                    <Title style={{ fontSize: 12, fontWeight: "bold", color: 'white', textAlign: 'center', lineHeight: 18 }}>Es necesario que agreges un banco para ofrecerte nuestro servicio,
                    <Title style={{ fontSize: 12, lineHeight: 18, color: 'white' }}> categorización automática de transacciones, alertas de tu dinero, consejos personalizados, etc.</Title>
                    </Title>
                </View>
            </View></ScrollView>
    </View>)
}