/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useContext, useEffect } from 'react'

import { ScreenContainer } from '../../ScreenContainer'
import Colors from '../../../UI/Colors'
import { StyledContext } from '../../../Context/Styled.Context'
import { ContentAnalisis } from './ContentAnalisis'

export function Ingresos({ navigation }) {
    const { changeThemePrimaryLight } = useContext(StyledContext);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            changeThemePrimaryLight();
        });
        return unsubscribe;
    }, [navigation])

    const grafica = [
        { activo: false, label: 'Ene', ingresos: { value: 150 }, /*gastos: { value: 100 }*/ },
        { activo: false, label: 'Feb', ingresos: { value: 350 }, /*gastos: { value: 100 }*/ },
        { activo: false, label: 'Mar', ingresos: { value: 150 }, /*gastos: { value: 100 }*/ },
        { activo: false, label: 'Abr', ingresos: { value: 70 }, /*gastos: { value: 100 }*/ },
        { activo: false, label: 'May', ingresos: { value: 50 }, /*gastos: { value: 80 }*/ },
        { activo: false, label: 'Jun', ingresos: { value: 150 }, /*gastos: { value: 10 }*/ },
        { activo: false, label: 'Jul', ingresos: { value: 50 }, /*gastos: { value: 10 }*/ },
        { activo: false, label: 'Ago', ingresos: { value: 59 }, /*gastos: { value: 100 }*/ },
        { activo: true, label: 'Sept', ingresos: { value: 300 }, /*gastos: { value: 9 }*/ },
        { activo: false, label: 'Oct', ingresos: { value: 0 }, /*gastos: { value: 100 }*/ },
        { activo: false, label: 'Nov', ingresos: { value: 0 }, /*gastos: { value: 10 }*/ },
        { activo: false, label: 'Dic', ingresos: { value: 0 }, /*gastos: { value: 8 }*/ },
    ]

    const diaMesAño = {
        inicioFin: "1 Sep. - 30 sep. 2020",
        mesAño: "Sep 2020"
    }

    const ItemTransferencia=[
        {Tx: "SHA256-XM131",fecha:"Hoy",tipo:"Enviastes",cantidad:"4.000",concepto:"El pago de la última compra.",time:"19:50",color: "transparent" },
        {Tx: "SHA256-XM332",fecha:"Ayer",tipo:"Enviastes",cantidad:"5.000",concepto:"El pago de la última compra.",time:"22:01",color: "transparent" },
        {Tx: "SHA256-XMl33",fecha:"23/09/2020",tipo:"Recibistes",cantidad:"5.000",concepto:"El pago de la última compra.",time:"11:25",color: "transparent" },
        {Tx: "SHA256-XA134",fecha:"21/09/2020",tipo:"Enviastes",cantidad:"10.200",concepto:"El pago de la última compra.",time:"09:50",color: "transparent" },
        {Tx: "SHA256-XA135",fecha:"20/09/2020",tipo:"Enviastes",cantidad:"10.200",concepto:"El pago de la última compra.",time:"09:10",color: "transparent" },
        ]

    const Ingresos = {
        type: "Ingresos",
        percentage: "90",
        cantidad: "1.055.194",
        Items: [
            {
                type: "Ingresos",
                Image: true,
                source: require("../../../Assets/Pagar2.png"),
                title: "Transferencias",
                amount: "1.055.194",
                movements: true,
                numberMovements: 6,
                grafica,
                total: "1.055.194",
                diaMesAño,
                Items: [
                    {
                        otherData: { dia: "Jueves", d: "27", m: "Junio", a: "2020", time: "20:00",ItemTransferencia },
                        lugar: "Santiago", nombre: "Transferencia", monto: "179.400", ingreso: true, tarjeta: {
                            id: '3ac68afc-c605-48d3-a4f8-fbd9s1aa97f63',
                            imgBack: require("../../../Assets/logos/Santanderx.png"),
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
                        otherData: { dia: "Jueves", d: "27", m: "Junio", a: "2020", time: "20:00",ItemTransferencia },
                        lugar: "Santiago", nombre: "Transferencia", monto: "348.500", ingreso: true, tarjeta: {
                            id: '3ac68afc-c605-48d3-a4f8-fbd9s1aa97f63',
                            imgBack: require("../../../Assets/logos/Santanderx.png"),
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
                        otherData: { dia: "Jueves", d: "27", m: "Junio", a: "2020", time: "20:00",ItemTransferencia },
                        lugar: "Santiago", nombre: "Transferencia", monto: "232.000", ingreso: true, tarjeta: {
                            id: '3ac68afc-c605-48d3-a4f8-fbd9s1aa97f63',
                            imgBack: require("../../../Assets/logos/Santanderx.png"),
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
                        otherData: { dia: "Jueves", d: "27", m: "Junio", a: "2020", time: "20:00",ItemTransferencia },
                        lugar: "Santiago", nombre: "Transferencia", monto: "158.000", ingreso: true, tarjeta: {
                            id: '3ac68afc-c605-48d3-a4f8-fbd9s1aa97f63',
                            imgBack: require("../../../Assets/logos/Santanderx.png"),
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
                        otherData: { dia: "Jueves", d: "27", m: "Junio", a: "2020", time: "20:00",ItemTransferencia },
                        lugar: "Santiago", nombre: "Transferencia", monto: "84.194", ingreso: true, tarjeta: {
                            id: '3ac68afc-c605-48d3-a4f8-fbd9s1aa97f63',
                            imgBack: require("../../../Assets/logos/Santanderx.png"),
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
                        otherData: { dia: "Jueves", d: "27", m: "Junio", a: "2020", time: "20:00",ItemTransferencia },
                        lugar: "Santiago", nombre: "Transferencia", monto: "53.000", ingreso: true, tarjeta: {
                            id: '3ac68afc-c605-48d3-a4f8-fbd9s1aa97f63',
                            imgBack: require("../../../Assets/logos/Santanderx.png"),
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
                    }
                ]
            },
        ]
    }
    return (<ScreenContainer NoMyStatusBar scrollView backgroundColor={Colors.Secondary}>
        <ContentAnalisis {...{ Ingresos }} />

    </ScreenContainer>)
}