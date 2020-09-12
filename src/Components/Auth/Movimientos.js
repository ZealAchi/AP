/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React from 'react'
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { Header } from '../../UI/Header'
import Colors from '../../UI/Colors'
import { ScreenContainer } from '../ScreenContainer'
import { Texto } from '../../UI/Texto'
import BarChart from '../../UI/Graph/BarChart';
import { ItemMovements } from '../../UI/itemMovements'

export function Movements() {
    const data = [
        { activo: false, label: 'Ene', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: false, label: 'Feb', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: false, label: 'Mar', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: false, label: 'Abr', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: false, label: 'May', ingresos: { value: 50 }, gastos: { value: 80 } },
        { activo: false, label: 'Jun', ingresos: { value: 50 }, gastos: { value: 10 } },
        { activo: false, label: 'Jul', ingresos: { value: 50 }, gastos: { value: 10 } },
        { activo: false, label: 'Ago', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: true, label: 'Sept', ingresos: { value: 50 }, gastos: { value: 9 } },
        { activo: false, label: 'Oct', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: false, label: 'Nov', ingresos: { value: 50 }, gastos: { value: 10 } },
        { activo: false, label: 'Dic', ingresos: { value: 50 }, gastos: { value: 8 } },
    ]
    const width = Dimensions.get('window').width

    return (<ScreenContainer barBackgroundColor={Colors.Secondary} backgroundColor={Colors.Secondary} scrollView >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ marginTop: 12, width: '98%', height: 73, display: 'flex', padding: 12, marginBottom: 12 }}>
                <Header color={Colors.Tertiary} Return />
                <Texto Bold size={Colors.midnightblue} size={13}>Movimientos</Texto>
                <Texto Bold size={Colors.midnightblue} size={13}>
                            
                    1 Sep. - 30 Sep. 2020</Texto>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', marginLeft: 8, marginRight: 8 }}>
                <BarChart data={data} round={100} unit="€" />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'red', borderBottomWidth: 1, width: width - 8 }}>
                <View >
                    <Texto size={Colors.midnightblue} size={13}>Ahorro Joven (4335)</Texto>
                    <Texto size={Colors.dimgray} size={13}>Cuenta</Texto>
                </View>
                <Texto Bold size={Colors.midnightblue} size={13}>$2.150.000</Texto>
            </View>
            {/* Item Movimientos */}
            <View style={{ marginTop: 12, marginBottom: 2, flex: 1, width: '95%' }}>
                <ItemMovements />
            </View>
            <View style={{ marginTop: 12, marginBottom: 2, flex: 1, width: '95%' }}>
                <ItemMovements />
            </View>
            <View style={{ marginTop: 12, marginBottom: 2, flex: 1, width: '95%' }}>
                <ItemMovements />
            </View>
        </View>
    </ScreenContainer>)
}
