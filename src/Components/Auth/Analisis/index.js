/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React from 'react'
import { View } from 'react-native'
import { ScreenContainer } from '../../ScreenContainer'
import { Header } from '../../../UI/Header'
import Colors from '../../../UI/Colors'
import { Button } from '../../../UI/Button'
import { Texto } from '../../../UI/Texto'
import { TabsNavigationAnalysis } from '../../../Navigations/TabsNavigationAnalisis'
import BarChart from '../../../UI/Graph/BarChart'

export function Analysis() {
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
    return (<ScreenContainer backgroundColor={Colors.Secondary} padding scrollView>
        <Header Return color={Colors.Tertiary} />
        <View style={{ flex: 1 }}>
            <View style={{ display: 'flex', flex: 0, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Texto Bold size={13} colorLabel={Colors.midnightblue}>Análisis</Texto>
                    <Texto Bold size={12} colorLabel={Colors.darkgray}>1 Sep. - 30 Sep. 2020</Texto>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Button label="Gráfico" styleButton={{ flex: 1, height: 24, borderRadius: 25 }} />
                    <Button label="Mes" styleButton={{ flex: 1, height: 24, borderRadius: 25 }} />
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', marginLeft: 8, marginRight: 8 }}>
                <BarChart data={data} round={100} unit="€" />
            </View>
            <View style={{display: 'flex', height: 94, backgroundColor: 'white', padding: 12, margin: 12, elevation: 1 }}>
                <View style={{ flex: 1 }}>
                    <Texto size={12} Bold colorLabel={Colors.midnightblue}>Gastos e ingresos</Texto>
                    <Texto size={12} colorLabel={Colors.darkgray}>Sep 2020</Texto></View>
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, paddingLeft:12 }}>
                        <Texto size={12} Bold colorLabel={Colors.Primary}>Ingresos</Texto>
                        <Texto size={12} Bold>$1.455.194</Texto>
                    </View>
                    <View style={{ flex: 1, borderLeftColor: Colors.darkgray, borderLeftWidth: 1,paddingLeft:12 }}>
                        <Texto size={12} Bold colorLabel={Colors.Tertiary}>Gastos</Texto>
                        <Texto size={12} Bold>$855.194</Texto>
                    </View>
                    <View style={{ flex: 1, borderLeftColor: Colors.darkgray, borderLeftWidth: 1,paddingLeft:12 }}>
                        <Texto size={12} Bold colorLabel={Colors.Primary}>Neto</Texto>
                        <Texto size={12} Bold>+$600.000</Texto>
                    </View>
                </View>
            </View>
            <TabsNavigationAnalysis/>
            
        </View>
    </ScreenContainer>)
}