import React from 'react'
import { Block } from '../../UI/Block'
import { Texto } from '../../UI/Texto'
import { ItemBank } from '../../UI/ItemBank'
import Colors from '../../UI/Colors'
import { View } from 'react-native'

export function AccountsAndCards() {
    const data = { nombre: 'Santarder' }
    return (
        <Block backgroundColor={Colors.Secondary}>
            <Texto>Cuentas y tarjetas</Texto>
            <View>
                <ItemBank data={data} />
            </View>
            <View>
                <Texto>Cuentas</Texto>
                {[0].map(() => {
                    return (
                        <View>
                            <View>
                                <Texto>(4353) ･ Ahorro Joven</Texto>
                                <Texto>Cuenta</Texto>
                                <Texto>Actualizado hace 1 hora</Texto>
                            </View>
                            <View>
                                <Texto>$ 2.150.000</Texto>
                            </View>
                        </View>
                    )
                })}
            </View>
            <View>
                <Texto>Tarjetas</Texto>
                {[{ name: "MasterCard Platinum ･ 0212", status: 'disponible' }].map((item,i) => {
                    return <View key={i}>
                        <View style={{display:'flex',flexDirection:'row'}}>
                            <View>
                                <Texto>{item.name}</Texto>
                                <Texto>Tarjeta de crédito</Texto>
                                <Texto>Actualizado hace 1 hora</Texto>
                            </View>
                            <View>
                                <Texto>{item.status}</Texto>
                                <Texto>$ 1.200.000</Texto>
                                <Texto>USD 14.450,70</Texto>
                            </View>
                        </View>
                    </View>
                })}
            </View>
        </Block>
    )
}