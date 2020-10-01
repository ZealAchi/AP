import React, { useContext, useRef } from "react"
import { View, StatusBar, Image } from "react-native"
import { Button } from "../../UI/Button"
import { Header } from "../../UI/Header"
import { Texto } from "../../UI/Texto"
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import Colors from "../../UI/Colors"
import { DataContext } from "../../Context/Datos.Context"
import Fontisto from "react-native-vector-icons/Fontisto"
import Clipboard from "@react-native-community/clipboard";
import { RectButton, ScrollView } from "react-native-gesture-handler"
import { AlertMessage } from "../Alert"

export function MyAccount() {
    const Context = useContext(DataContext)
    const QrRef = useRef(null)

    const Name = `${Context?.state?.user?.profile?.first_name} ${Context?.state?.user?.profile?.last_name}`
    StatusBar.setBackgroundColor(Colors.Primary)

    const copyToClipboard = () => {
        Clipboard.setString(`2e30ed63-3900-45e7-9391-0d70a4b8b26a`)
        AlertMessage({ message: "¡Cuenta blockchain copiada!" })
    }
    const saveQRCode = () => {
        QrRef.current.toDataURL(callback)
    }
    const callback =async (dataURL) => {
        const shareOptions = {
            title: 'Comparte tu Cuenta Allpay',
            url: `data:image/png;base64,${dataURL}`,
            failOnCancel: false,
        };

        try {
            const ShareResponse = await Share.open(shareOptions);
            // setResult(JSON.stringify(ShareResponse, null, 2));
        } catch (error) {
            console.log('Error =>', error);
            // setResult('error: '.concat(getErrorString(error)));
        }
    }
    const dataQR=JSON.stringify({ amount: JSON.parse(`1000`), currency: 152, to_uuid: Context?.state?.user?.profile?.uuid, user:Name })
    console.log(dataQR,'dataqr')
    // value={JSON.stringify({ amount: JSON.parse(`${QR.Amount.replace(/\D/g, '')}`), currency: 152, to_uuid: state.user.profile.uuid, user })}
    return (<View style={{ flex: 1, backgroundColor: Colors.Primary }}>
        <View style={{ paddingLeft: 12 }}>
            <Header Return color={Colors.Secondary} />
            <Texto style={{ textAlign: "center" }} colorLabel={"white"}>Mi QR cuenta <Texto style={{ fontWeight: '300', lineHeight: 70, letterSpacing: 0.828029 }} typeFamily="latoLightItalic" colorLabel={Colors.Secondary} >ALL<Texto colorLabel={Colors.Secondary} style={{ fontWeight: '900', letterSpacing: 0.828029 }} Bold >PAY</Texto></Texto></Texto>
        </View>
        <View style={{ alignItems: "center", flex: 1 }}>
            <Image style={{ width: 110, height: 110, backgroundColor: 'red', marginTop: -4 }} borderRadius={65} source={{ uri: `${Context?.avatar}` }} />
            <View>
                <View style={{ backgroundColor: Colors.Primary, padding: 8, borderRadius: 20, alignItems: 'center' }}>
                    <Texto colorLabel="white" size={14}>QR de {Name}</Texto>
                    <View style={{ marginTop: 12, backgroundColor: "white", padding: 15, borderRadius: 15 }}>
                        <QRCode getRef={QrRef} logoBorderRadius={12} size={170} value={dataQR} />
                    </View>
                </View>
                <View>
                    <View style={{ marginTop: 12, marginBottom: 12 }}>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', borderBottomColor: Colors.lavender, borderBottomWidth: 1 }}>
                            <Texto size={12} colorLabel="white">Cuenta blockchain</Texto>
                            <View style={{ flexDirection: "row" }} >
                                <Texto size={12} colorLabel={Colors.Secondary}>Click para copiar</Texto>
                                <RectButton onPress={() => { copyToClipboard() }}>
                                    <Fontisto name="copy" style={{ marginLeft: 8, marginBottom: 2 }} color={Colors.Secondary} size={20} />
                                </RectButton>
                            </View>
                        </View>
                        <Texto size={12} colorLabel={Colors.Secondary}>2e30ed63-3900-45e7-9391-0d70a4b8b26a</Texto>
                    </View>
                </View>
            </View>
        </View>

        <Button backgroundColor={Colors.Secondary} color={Colors.Primary} onPress={() => { saveQRCode() }} styleButton={{ position: 'absolute', bottom: 20, right: 50, left: 50, borderRadius: 18 }} label="COMPARTIR" />
    </View>)
}