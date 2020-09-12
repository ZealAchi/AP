import React from 'react'
import { View } from 'react-native'
import { ScreenContainer } from '../ScreenContainer'
import { Header } from '../../UI/Header'
import { Texto } from '../../UI/Texto'
import { Button } from '../../UI/Button'
import Colors from '../../UI/Colors'
import { Block } from '../../UI/Block'
export function NextAccount() {
    return (<ScreenContainer backgroundColor={Colors.Secondary} padding>
        <Header Return />
        <Texto colorLabel={Colors.midnightblue} size={13} Bold>Elige tu próxima Cuenta Bancaria</Texto>
        <Block style={{ alignItems: 'center', borderTopWidth: 1,borderTopColor :Colors.lavender,paddingTop:10,marginTop:12}}>
        <View style={{height:130.91,width:343,backgroundColor:'white',padding:8,display:'flex',elevation:2,borderRadius:12}}>
            <View style={{flex:1,flexDirection:'row'}}>
                <View style={{flex:1}}>
                <Texto size={12}>Plan Cuenta Corriente Mastercard</Texto>
                <Texto Bold size={12}>Renta mìnima: <Texto size={12}>$600.000</Texto></Texto>
                <Texto Bold size={12}>TIpo de cliente: <Texto size={12}>Tradicional</Texto></Texto>
                <Texto Bold size={12}>Marca:<Texto size={12}> Mastercard</Texto></Texto>
                </View>
                <View style={{flex:0}}>
                <View style={{width:43,height:43,backgroundColor:'red'}}>

                </View>
                </View>
            </View>
            <View style={{flexDirection:'row',flex:0,justifyContent:'space-between'}}>
                <View>
            <Texto size={12} colorLabel={Colors.dimgray}>Comisiòn mensual</Texto>
                <Texto Bold size={12}>UF 0</Texto>
                </View>
                <Button label="Solicitar" styleButton={{height:24.91,width:89,borderRadius:50}} />
            </View>
        </View>
        </Block>
    </ScreenContainer>)
}