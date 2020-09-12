/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React from 'react'
import { View } from 'react-native'
import { Texto } from '../../../UI/Texto'
import Colors from '../../../UI/Colors'
import { TextInput } from '../../../UI/Input'

export function GetCard() {
    return (<View style={{ margin: 10, flex: 1 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 1, marginBottom: 8 }}>
            <TextInput borderRadius left icon={{ type: '', name: 'search' }} style={{ width: 343, height: 38, fontSize: 12, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: Colors.lavender }} placeholder="Buscar Tarjetas" />
            <View style={{ marginTop: 18, alignItems: 'center' }}>
                <View style={{ backgroundColor: "transparent", width: 320, height: 82, borderRadius: 25, elevation: 1 }} />
                <View style={{ display: 'flex', borderRadius: 8, flexDirection: 'column', elevation: 2, backgroundColor: 'white', width: 343, height: 80.85, padding: 12, bottom: 40 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Texto Bold size={12}>MasterCard Platinum</Texto>
                            <Texto size={12}>Banco Santander</Texto>
                            <Texto size={12}>Hector Sanchez</Texto>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Texto size={12}>Costo de uso</Texto>
                                <Texto Bold size={12}>$5.000</Texto>
                                <Texto Bold size={12}>5%</Texto>
                            </View>
                            <Texto>+</Texto>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </View>)
}