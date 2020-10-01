import React, { useContext, useEffect } from 'react'
import { ScreenContainer } from '../../ScreenContainer'
import Colors from '../../../UI/Colors'
import { StyledContext } from '../../../Context/Styled.Context'
import { ContentAnalisis } from './ContentAnalisis'

export function Gastos({ navigation }) {
    const { changeThemeSecondLight } = useContext(StyledContext)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            changeThemeSecondLight();
        });
        return unsubscribe;
    }, [navigation])
    const grafica = [
        { activo: false, label: 'Ene', gastos: { value: 100 } },
        { activo: false, label: 'Feb', gastos: { value: 100 } },
        { activo: false, label: 'Mar', gastos: { value: 100 } },
        { activo: false, label: 'Abr', gastos: { value: 100 } },
        { activo: false, label: 'May', gastos: { value: 80 } },
        { activo: false, label: 'Jun', gastos: { value: 70 } },
        { activo: false, label: 'Jul', gastos: { value: 100 } },
        { activo: false, label: 'Ago', gastos: { value: 100 } },
        { activo: true, label: 'Sept', gastos: { value: 90 } },
        { activo: false, label: 'Oct', gastos: { value: 100 } },
        { activo: false, label: 'Nov', gastos: { value: 10 } },
        { activo: false, label: 'Dic', gastos: { value: 80 } },
    ]

    const diaMesAño = {
        inicioFin: "1 Sep. - 30 sep. 2020",
        mesAño: "Sep 2020"
    }

    const ItemTransferencia=[
    {Tx: "SHA256-XM131",fecha:"Hoy",tipo:"Enviastes",cantidad:"4.000",concepto:"El pago de la última compra.",time:"19:50",color: "transparent" },
    {Tx: "SHA256-XM332",fecha:"Ayer",tipo:"Enviastes",cantidad:"5.000",concepto:"El pago de la última compra.",time:"22:01",color: "transparent" },
    ]

    const Gastos = {
        type: "Gastos",
        percentage: "80",
        cantidad: "963.957",
        Items: [
            {
                Image: true,
                source: require("../../../Assets/Pagar2.png"),
                title: "Transferencias",
                amount: "500.500",
                movements: true,
                numberMovements: 2,
                grafica,
                total: "500.500",
                diaMesAño,
                Items: [
                    {
                        index:1,
                        otherData: { dia: "Jueves", d: "27", m: "Septiembre", a: "2020", time: "20:00",ItemTransferencia },
                        lugar: "Santiago", nombre: "Transferencia", monto: "45.798", ingreso: true, tarjeta: {
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
                    {index:2,
                        otherData: { dia: "Jueves", d: "27", m: "Septiembre", a: "2020", time: "20:00",ItemTransferencia },
                        lugar: "Santiago", nombre: "Transferencia", monto: "24.659", ingreso: true, tarjeta: {
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
                ]
            },
            {
                Entypo: true,
                icon: "shopping-cart",
                title: "Supermercado",
                amount: "225.000",
                movements: true,
                numberMovements: 2,
                grafica,
                total: "500.500",
                diaMesAño,
                Items: [
                    {
                        otherData: { dia: "Jueves", d: "27", m: "Septiembre", a: "2020", time: "20:00" },
                        lugar: "Santiago", nombre: "Jumbo", categoria: "Supermercado", monto: "45.798", ingreso: true, tarjeta: {
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
                        otherData: { dia: "Jueves", d: "27", m: "Septiembre", a: "2020", time: "20:00" },
                        lugar: "Santiago", nombre: "Walmart", categoria: "Supermercado", monto: "24.659", ingreso: true, tarjeta:{
                            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                            imgBack: require("../../../Assets/logos/BancoItau.jpg"),
                            bank: "Itaú",
                            TipoTarjeta: "MasterCard Gold",
                            status: "Disponible",
                            balance: "1.050.000",
                            USD: "1.375",
                            DatosCard: {
                                number: "1547",
                                fecha: "12/22",
                            },
                        }
                    },
                ]
            }, {
                FontAwesome5: true,
                icon: "money-bill-wave",
                title: "Efectivo",
                amount: "155.500",
                movements: true,
                numberMovements: 6
            }, {
                FontAwesome: true,
                icon: "bank",
                title: "Cargos bancarios",
                amount: "42.500",
                movements: true,
                numberMovements: 23
            }, {
                FontAwesome5: true,
                icon: "wifi",
                title: "Servicios y productos",
                amount: "40.457",
                online: true
            }
        ]
    }
    return (<ScreenContainer NoMyStatusBar scrollView backgroundColor={Colors.Secondary}>
        <ContentAnalisis {...{ Gastos }} />

    </ScreenContainer>)
}