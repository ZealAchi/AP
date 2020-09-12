/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useContext } from 'react'
import { View } from 'react-native'
import { ScreenContainer } from '../../ScreenContainer'
import { Texto } from '../../../UI/Texto'
import { TextInput } from '../../../UI/Input'
import Colors from '../../../UI/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Block } from '../../../UI/Block'
import { ListBank } from '../../../UI/ListBank'
import { ItemBank, ItemBank2 } from '../../../UI/ItemBank'
import QRCode from 'react-native-qrcode-svg';
import Base64 from '../../../Util/Base64'
import { DataContext } from '../../../Context/Datos.Context'
import { dp } from '../../../UI/dist/Responsive.dev'
import { Header } from '../../../UI/Header'
import { formatNumber } from '../../../Util/dist/formatNumber.dev'
import { Button } from '../../../UI/Button'

export function CobrarQR2(props) {
    const { state, balances } = useContext(DataContext)
    const { navigation, route } = props
    const { data: QR } = route.params
    const { profile } = state.user
    const user = `${profile?.first_name} ${profile?.last_name}`

    return (
        <View style={{ display: "flex", flex: 1 }}>
            <View style={{ height: 220, backgroundColor: Colors.Primary }}>
                <View style={{ marginTop: 12, paddingLeft: 12, paddingRight: 12, height: dp(0.1) }}>
                    <Header Return color={Colors.Secondary} />
                </View>
                <View style={{ display: 'flex', alignItems: 'center', backgroundColor: Colors.Primary, flex: 1 }}>
                    <Texto size={13} colorLabel="white">Crea un código QR para transferir</Texto>
                    <View style={{ width: dp(0.7), height: 85, flex: 1 }}>
                        <View style={{ borderBottomColor: Colors.lavender, borderBottomWidth: 1, alignItems: 'baseline' }}>
                            <TextInput disable placeholderTextColor="white" left sizeIcon={35} icon={{ type: 'Foundation', name: 'dollar', color: 'white' }}
                                keyboardType='decimal-pad' styleText={[QR.Amount ? { fontSize: 30, right: 12 } : { fontSize: 25 }, { textAlign: 'center', color: 'white', }]}
                                style={{ backgroundColor: 'transparent' }} value={formatNumber.new(QR.Amount)} placeholder="Ingresa el monto" />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 24 }}>
                            <Texto size={13} colorLabel="white">¿En qué cuenta deseas recibir el dinero?</Texto>
                        </View>
                    </View>
                </View>
                <View style={{ position: 'absolute', height: 90, width: '100%', backgroundColor: 'transparent', bottom: -45, alignItems: 'flex-end', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ItemBank2 onPress={() => navigation.navigate('MyAccounts', { setSelect: setAccount, type })} allpay style={{ zIndex: 1, elevation: 2, width: '95%', height: 75, borderRadius: 12 }} title={'cuentas'} noSaldo data={{ img: require('../../../Assets/AP.png') }} />
                </View>
            </View>
            <View style={{ zIndex:-2,flex: 1,justifyContent:'center',alignItems:"center", backgroundColor: Colors.Secondary}}>
                <QRCode
                    color={Colors.Primary}
                    size={265}
                    value={JSON.stringify({ amount: JSON.parse(`${QR.Amount.replace(/\D/g, '')}`), currency: 152, to_uuid: state.user.profile.uuid, user })} />
            </View>
            <View style={{ flex: 0, backgroundColor: Colors.Secondary, flexDirection: 'column-reverse' ,zIndex:-12,alignItems:'center'}}>
                    <Button label="Volver al home" styleButton={{width: 218, borderRadius: 18,marginBottom:15}}/>
            </View>
        </View>

    )
    return (
        <ScreenContainer barBackgroundColor={Colors.Primary} >
            <View style={{ marginTop: 12, paddingLeft: 12, paddingRight: 12, height: dp(0.1) }}>
                <Header Return color={Colors.Secondary} />
            </View>
            <View style={{ height: dp(0.480), display: 'flex', alignItems: 'center' }}>
                <Texto size={13} colorLabel="white">Crea un código QR para transferir</Texto>
                <View style={{ width: 256, height: 80 }}>
                    <View style={{ borderBottomColor: Colors.lavender, borderBottomWidth: 1, alignItems: 'baseline' }}>
                        <TextInput disable placeholderTextColor="white" left sizeIcon={35} icon={{ type: 'Foundation', name: 'dollar', color: 'white' }}
                            keyboardType='decimal-pad' styleText={[QR.Amount ? { fontSize: 30, right: 12 } : { fontSize: 25 }, { textAlign: 'center', color: 'white', }]}
                            style={{ backgroundColor: 'transparent' }} value={formatNumber.new(QR.Amount)} placeholder="Ingresa el monto" />
                    </View>
                </View>
                <Texto size={13} colorLabel="white">¿En qué cuenta deseas recibir el dinero?</Texto>
            </View>
            <View style={{ backgroundColor: Colors.Secondary, height: dp(1), justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: 90, width: '100%', backgroundColor: 'transparent', top: 0, alignItems: 'flex-end', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ItemBank2 onPress={() => navigation.navigate('MyAccounts', { setSelect: setAccount, type })} allpay style={{ zIndex: 1, elevation: 2, width: '95%', height: 75, borderRadius: 12 }} title={'cuentas'} noSaldo data={{ img: require('../../../Assets/AP.png') }} />
                </View>
                <View style={{ width: dp(1), height: dp(1), alignItems: 'center', justifyContent: 'center' }}>
                    <QRCode
                        color={Colors.Primary}
                        size={265}
                        value={JSON.stringify({ amount: JSON.parse(`${QR.Amount.replace(/\D/g, '')}`), currency: 152, to_uuid: state.user.profile.uuid, user })} />
                </View>
            </View>
            <View style={{ padding: 18, alignItems: 'center', display: 'flex', flex: 1, backgroundColor: Colors.Secondary }} />
        </ScreenContainer>
    )
}