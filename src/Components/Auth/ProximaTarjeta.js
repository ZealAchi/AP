import React from 'react'
import { View } from 'react-native'
import { ScreenContainer } from '../ScreenContainer'
import { Header } from '../../UI/Header'
import { Block } from '../../UI/Block'
import { Button } from '../../UI/Button'
import Colors from '../../UI/Colors'
import { Texto } from '../../UI/Texto'

export function NextCard() {
    return (
        <ScreenContainer backgroundColor={Colors.Secondary} padding>
            <Header Return />
            <Texto colorLabel={Colors.midnightblue} size={13} Bold>Elige tu próxima Tarjeta de Crédito</Texto>
            <Block style={{ alignItems: 'center', borderTopWidth: 1,borderTopColor :Colors.lavender,paddingTop:10,marginTop:12}}>
                
                <View style={{ backgroundColor: "transparent", width: 320, height:82 , borderRadius: 25,elevation:1 }} />
                <View style={{ display: 'flex',borderRadius:8, flexDirection: 'column',elevation:2, backgroundColor: 'white',width:343,height: 135.85 ,padding:12,bottom:40}}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View>
                            <Texto Bold size={12}>MasterCard Platinum . Santander</Texto>
                            <Texto Bold size={12}>Costo mensual: <Texto size={12}>UF 0,105</Texto></Texto>
                            <Texto Bold size={12}>Comisión internacional: <Texto size={12}>Sin comisión</Texto></Texto>
                            <Texto Bold size={12}>Nota: <Texto size={12}>5/5 en canje de puntos</Texto></Texto>
                        </View>
                        
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row',justifyContent:'space-between'}}>
                        <View>
                            <Texto size={12}>Renta minima</Texto>
                            <Texto Bold size={12}>$ 301.000</Texto>
                        </View>
                        <View>
                            <Button label="Solicitar" styleButton={{paddingLeft:12,paddingRight:12,width:89}} borderRadius={50}/>
                        </View>
                    </View>
                </View>
                
                <View style={{ backgroundColor: "transparent", width: 320, height:82 , borderRadius: 25,elevation:1 }} />
                <View style={{ display: 'flex',borderRadius:8, flexDirection: 'column',elevation:2, backgroundColor: 'white',width:343,height: 135.85 ,padding:12,bottom:40}}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View>
                            <Texto Bold size={12}>MasterCard Platinum . Santander</Texto>
                            <Texto Bold size={12}>Costo mensual: <Texto size={12}>UF 0,105</Texto></Texto>
                            <Texto Bold size={12}>Comisión internacional: <Texto size={12}>Sin comisión</Texto></Texto>
                            <Texto Bold size={12}>Nota: <Texto size={12}>5/5 en canje de puntos</Texto></Texto>
                        </View>
                        
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row',justifyContent:'space-between'}}>
                        <View>
                            <Texto size={12}>Renta minima</Texto>
                            <Texto Bold size={12}>$ 301.000</Texto>
                        </View>
                        <View>
                            <Button label="Solicitar" styleButton={{paddingLeft:12,paddingRight:12,width:89}} borderRadius={50}/>
                        </View>
                    </View>
                </View>
            </Block>
            
            
        </ScreenContainer>
    )
}