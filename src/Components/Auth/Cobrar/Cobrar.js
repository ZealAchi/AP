/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { ScreenContainer } from '../../ScreenContainer'
import { Texto } from '../../../UI/Texto'
import { TextInput } from '../../../UI/Input'
import Colors from '../../../UI/Colors'
import {vh} from 'react-native-css-vh-vw'
import { Block } from '../../../UI/Block'
import { Button } from '../../../UI/Button'
import { ItemBank } from '../../../UI/ItemBank'
import { Header } from '../../../UI/Header'
import { AlertMessage } from '../../Alert'
import { ItemUser } from '../../../UI/ItemUser'
import { formatNumber } from '../../../Util/FormatNumber'
export function Cobrar(props) {
    const { navigation ,route} = props
    const [monto, setMonto] = useState()
    const [account, setAccount] = useState()
    const Currency = 'CLP'
    const [message, setMessage] = useState('')
    const [selectBank, setSelectBank] = useState()
    


const {data}=route.params
const user={
    first_name:data.givenName,
    last_name:data.familyName,
    earned:'213'
}


    return (
        <ScreenContainer barBackgroundColor={Colors.Tertiary} backgroundColor={Colors.Primary} scrollView>
            <View style={{ marginTop: 12, paddingLeft: 12, paddingRight: 12 }}>
                <Header Return color={Colors.Secondary} />
            </View>
            <View style={{ height: 191.97, display: 'flex', alignItems: 'center', backgroundColor: Colors.Primary ,paddingTop:15}}>
                    <Texto size={13} colorLabel="white">¿Cuánto  deseas cobrar?</Texto>
                    <View style={{ width: 256, height: 85, flex: 1 }}>
                        <View style={{ borderBottomColor: Colors.lavender, borderBottomWidth: 1, alignItems: 'baseline' }}>
                            <TextInput placeholderTextColor="white" left sizeIcon={35}
                                icon={{ type: 'Foundation', name: 'dollar', color: 'white' }}
                                keyboardType="numeric"
                                maxLength={13}
                                styleText={[monto ? { fontSize: 30, right: 12,fontWeight:'700' } : {fontSize: 22.8,right:12,fontWeight:'700'  },
                                { textAlign: 'center', color: 'white' }]} style={{ backgroundColor: 'transparent' }}
                                value={monto} onChangeText={(e) => 
                                    setMonto(
                                        formatNumber.new(e.replace(/\D/g, '')))
                                } placeholder="Ingresa el monto" />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1,marginBottom:12 }}>
                            <Texto size={13} colorLabel="white">¿En qué cuenta quieres recibir?</Texto>
                        </View>
                    </View>
            </View>
            <Block style={{ backgroundColor: Colors.Secondary,height:vh(72)}}>
                <View style={{ height: 90, width: '100%', backgroundColor: 'transparent', top: -45, alignItems: 'flex-end', zIndex: 1, elevation: 2 }}>
                    <ItemBank /*onPress={() => navigation.navigate('MyAccounts', { setSelect: setSelectBank })}*/ style={{ width: '95%' }} title={'cuentas'} data={{ img: require('../../../Assets/Santander.png'), nombre: 'Banco de Chile' }} />
                </View>
                <View style={{marginTop:-35,height:50}}>
                    <ItemUser height={45} data={user}/>
                </View>
                <Block style={{ margin: 18, alignItems: 'center', marginTop: '30%' }}>
                    <View style={{ display: 'flex', flex: 1, width: '95%' }}>
                        <TextInput style={{
                            width: '9%', height: 115.48, textAlignVertical: 'top',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 2,
                            borderRadius: 12
                        }} multiline={true} value={message} onChangeText={(e) => setMessage(e)} numberOfLines={12} placeholder="Motivo" />
                    </View>
                    <Button onPress={() => {
                        if (monto){
                            payUser()
                        }
                        if (!monto) AlertMessage({ message: "Debes Ingresar un monto" })
                    }} styleButton={{ width: 218, borderRadius: 18,marginBottom:25 }} label="PAGAR" />
                </Block>
            </Block>
        </ScreenContainer>
    )
}