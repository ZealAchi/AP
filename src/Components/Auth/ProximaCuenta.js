import React from 'react'
import { Image, View,Linking  } from 'react-native'
import { ScreenContainer } from '../ScreenContainer'
import { Header } from '../../UI/Header'
import { Texto } from '../../UI/Texto'
import { Button } from '../../UI/Button'
import Colors from '../../UI/Colors'
import { Block } from '../../UI/Block'
import { ScrollView } from 'react-native-gesture-handler'

const ItemsNexAccount = [
    {
        img: require("../../Assets/logos/BancoChile.jpg"),
        PlanCuentaCorriente: "Básico",
        RentaMinima: "500.000",
        TipoCliente: "Tradicional",
        Marca: "Mastercard o Visa",
        CostoMensual: "UF 0,09",
        link:"http://t.ly/DBb9",
    }, {
        // IMG Banco Santander
        img: require("../../Assets/logos/Santanderx.png"),
        PlanCuentaCorriente: "Cuenta Life",
        RentaMinima: "0",
        TipoCliente: "Tradicional",
        Marca: "Mastercard",
        CostoMensual: "UF 0,08",
        link:"http://t.ly/ikbp",
    }, {
        // Bci
        img: require("../../Assets/logos/BancoBCI.jpg"),
        PlanCuentaCorriente: "Independiente",
        RentaMinima: "450.000",
        TipoCliente: "Tradicional",
        Marca: "Visa y/o Mastercard",
        CostoMensual: "UF 0,34",
        link:"http://t.ly/coAF",
    }, {
        // itaú
        img: require("../../Assets/logos/BancoItau.jpg"),
        PlanCuentaCorriente: "Mastercard Gold",
        RentaMinima: "600.000",
        TipoCliente: "Tradicional",
        Marca: "Mastercard",
        CostoMensual: "UF 0,010",
        link:"http://t.ly/dkqb",
    },
]
export function NextAccount() {
    return (<ScreenContainer backgroundColor={Colors.Secondary} padding scrollView>
        <Header Return />
        <Texto colorLabel={Colors.midnightblue} size={13} Bold>Elige tu próxima Cuenta Bancaria</Texto>
        <Block style={{ alignItems: 'center', borderTopWidth: 1, borderTopColor: Colors.lavender, paddingTop: 10, marginTop: 12 }}>
            {ItemsNexAccount.map((item, i) => {
                return (
                    <View key={item.Marca} style={{
                        marginTop:18,
                        paddingTop:12,paddingBottom:12, height: 133.91, width: 343, padding: 8, display: 'flex', elevation: 2,
                         borderRadius: 5,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.30,
                        shadowRadius: 4.65,
                        elevation: 8,
                        backgroundColor:"white"
                    }}>
                        <View style={{ flex: 2.8, flexDirection: 'row',justifyContent:"center" }}>
                            <View style={{ flex: 1 }}>
                                <Texto size={12} Bold>Plan Cuenta Corriente {item.PlanCuentaCorriente}</Texto>
                                <Texto Bold size={12}>Renta mínima: <Texto size={12}>${item.RentaMinima}</Texto></Texto>
                                <Texto Bold size={12}>Tipo de cliente: <Texto size={12}>{item.TipoCliente}</Texto></Texto>
                                <Texto Bold size={12}>Marca:<Texto size={12}> {item.Marca}</Texto></Texto>
                            </View>
                            <View style={{ flex: 0 }}>
                                <View style={{ width: 43, height: 43 }}>
                                    <Image source={item.img} style={{ height: 43, width: 43 }}  borderRadius={8}/>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', flex:1, alignItems:"flex-end",marginBottom:0,alignItems:"center"}}>
                            <View style={{flex:1}}>
                                <Texto size={12} colorLabel={Colors.dimgray}>Comisión mensual</Texto>
                                <Texto Bold size={12}>{item.CostoMensual}</Texto>
                            </View>
                            <View style={{flex:0,justifyContent:'center',alignItems:'center',}}>
                            <Button onPress={async()=>{
                                console.log(item.link)
                                 const supported = await Linking.canOpenURL(item.link);

                                 if (supported) {
                                   // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                                   // by some browser in the mobile
                                   await Linking.openURL(item.link);
                                 } else {
                                   Alert.alert(`Don't know how to open this URL: ${item.link}`);
                                 }
                            }} label="Solicitar" styleButton={{ height: 24.91, width: 89, borderRadius: 50 }} />
                            </View>
                        </View>
                    </View>
                )
            })}
        </Block>
    </ScreenContainer>)
}