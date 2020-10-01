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
import { ItemViewTransaccion } from './Analisis/ViewTransacciones'

export function Movements(props) {

    
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
    
    const ItemTransferencia = [
        { Tx: "SHA256-XM131", fecha: "Hoy", tipo: "Enviastes", cantidad: "4.000", concepto: "El pago de la última compra.", time: "19:50", color: "transparent" },
        { Tx: "SHA256-XM332", fecha: "Ayer", tipo: "Enviastes", cantidad: "5.000", concepto: "El pago de la última compra.", time: "22:01", color: "transparent" },
        { Tx: "SHA256-XMl33", fecha: "23/09/2020", tipo: "Recibistes", cantidad: "5.000", concepto: "El pago de la última compra.", time: "11:25", color: "transparent" },
        { Tx: "SHA256-XA134", fecha: "21/09/2020", tipo: "Enviastes", cantidad: "10.200", concepto: "El pago de la última compra.", time: "09:50", color: "transparent" },
        { Tx: "SHA256-XA135", fecha: "20/09/2020", tipo: "Enviastes", cantidad: "10.200", concepto: "El pago de la última compra.", time: "09:10", color: "transparent" },
    ]

    const Items = [
        {
            otherData: { dia: "Jueves", d: "27", m: "Junio", a: "2020", time: "20:00", ItemTransferencia },
            lugar: "Wallmart", nombre: "Roberto Sanchez", monto: "150.000", ingreso: false, tarjeta: {
                id: '3ac68afc-c605-48d3-a4f8-fbd9s1aa97f63',
                imgBack: require("../../Assets/logos/Santanderx.png"),
                bank: "Santander",
                TipoTarjeta: "Mastercard Black",
                status: "Disponible",
                balance: "64.897.552",
                USD: "85.022",
                DatosCard: {
                    number: "1472",
                    fecha: "02/22",
                }
            }
        },
        {
            otherData: { dia: "Jueves", d: "27", m: "Junio", a: "2020", time: "20:00", ItemTransferencia },
            lugar: "Falabella", nombre: "Martín Ures", monto: "350.000", ingreso: false, tarjeta: {
                id: '3ac68afc-c605-48d3-a4f8-fbd9s1aa97f63',
                imgBack: require("../../Assets/logos/Santanderx.png"),
                bank: "Santander",
                TipoTarjeta: "Mastercard Black",
                status: "Disponible",
                balance: "64.897.552",
                USD: "85.022",
                DatosCard: {
                    number: "1472",
                    fecha: "02/22",
                }
            }
        },
        {
            otherData: { dia: "Jueves", d: "27", m: "Junio", a: "2020", time: "20:00", ItemTransferencia },
            lugar: "Sony", nombre: "Alfonso Suarez", monto: "500.000", ingreso: false, tarjeta: {
                id: '3ac68afc-c605-48d3-a4f8-fbd9s1aa97f63',
                imgBack: require("../../Assets/logos/Santanderx.png"),
                bank: "Santander",
                TipoTarjeta: "Mastercard Black",
                status: "Disponible",
                balance: "64.897.552",
                USD: "85.022",
                DatosCard: {
                    number: "1472",
                    fecha: "02/22",
                }
            }
        },
    ]

    const width = Dimensions.get('window').width

    return (<ScreenContainer barBackgroundColor={Colors.Secondary} backgroundColor={Colors.Secondary} scrollView >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '98%', height: 73, display: 'flex', padding: 12, marginBottom: 12 }}>
                <Header color={Colors.Primary} Return />
                <Texto Bold size={Colors.midnightblue} size={13}>Movimientos</Texto>
                <Texto Bold size={Colors.midnightblue} size={13}>
                    1 Sep. - 30 Sep. 2020</Texto>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', marginLeft: 8, marginRight: 8 }}>
                <BarChart data={data} round={100} unit="€" />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: Colors.Primary, borderBottomWidth: 1, width: width - 8 }}>
                <View >
                    <Texto size={Colors.midnightblue} size={13}>{props.route.params?.type?props.route.params?.type:"Todas las cuentas"}</Texto>
                    <Texto size={Colors.dimgray} size={13}>Cuenta</Texto>
                </View>
                <Texto Bold size={Colors.midnightblue} size={13}>-$1.000.000</Texto>
            </View>
            {Items.map((item,i)=>{
                return(<ItemViewTransaccion key={i} {...{ item, title: "Supermercado" }} />)
            })}

        </View>
    </ScreenContainer>)
}
