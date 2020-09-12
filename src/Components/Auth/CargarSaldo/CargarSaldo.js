import React from 'react'
import { Texto } from '../../../UI/Texto'
import { View } from 'react-native'
import { TextInput } from '../../../UI/Input'
import { ItemBank } from '../../../UI/ItemBank'
import { Block } from '../../../UI/Block'
import Colors from '../../../UI/Colors'
import { Button } from '../../../UI/Button'

export function CargarSaldo() {

    
    return (
        <Block>
            <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1 }}>
                <Texto>Agregar saldo AllPay</Texto>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Texto>AP</Texto>
                    <View>
                        <View>
                            <Texto>Saldo AllPay</Texto>
                            <Texto>Hoy,10:30h</Texto>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                    <Texto>$2,450.000</Texto>
                </View>
            </View>
            <View style={{ flexDirection: 'column', backgroundColor: Colors.Primary }}>
                <Texto>¿Cuánto dinero deseas cargar?</Texto>
                <View style={{ right: 50, left: 50 }}>
                    {/* <TextInput style={{ borderRadius: 0, backgroundColor: 'transparent', color: 'white' }} placeholder="Ingresa la cantidad" /> */}
                    
                </View>
                <Texto>¿Desde qué cuenta deseas cargar?</Texto>
                <View style={{ marginTop: -40, paddingTop: 55, zIndex: -1, dispay: 'flex' }}>

                    {[{ nombre: 'Santander Rio' }].map((data) => {
                        return (<View style={{ backgroundColor: 'white' }}>
                            <Texto>Cuentas</Texto>
                            <ItemBank data={data} />
                        </View>)
                    })}
                </View>
            </View>
            <Button styleButton={{ position: 'absolute', bottom: 20, right: 50, left: 50, borderRadius: 18 }} label="Agregar Saldo" />

        </Block>
    )
}