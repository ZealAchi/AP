/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useContext } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { ItemBank } from './ItemBank'
import { FlatList } from 'react-native'
import { DataContext } from '../Context/Datos.Context'
import { Texto } from './Texto'
import Colors from './Colors'


const StyledListBank = styled.View`flex:1;`
export function ListBank(props) {
    const { horizontal, title, type, nostyle, styleItem, data = [], setSelect, withBanlance } = props
    const data2 = []
    const { balances } = useContext(DataContext)
    if (type === 'AddBank') {

    }
    else
        if (type === 'addBalance') {
            data.push({ img: require('../Assets/Santander.png'), nombre: 'Santander', balance: balances?.Santander?.amount, bid: 1 });
            data.push({ img: require('../Assets/HomeItau.png'), nombre: 'Itaú', balance: balances?.Itau?.amount, bid: 2 });
            data2.push({ img: require('../Assets/PayPal.png'), nombre: 'Paypal', withBanlance: false, bid: 4 });
            data2.push({ img: require('../Assets/AP.png'), nombre: 'WebPay',withBanlance: false,bid: 0 });
            data2.push({ img: require('../Assets/Crypto.png'), nombre: 'Crypto', withBanlance: false, bid: 5 });
            data2.push({ img: require('../Assets/Servipag.png'), nombre: 'Servipag', withBanlance: false, bid: 6 });
            data2.push({ img: require('../Assets/CajaVecina.png'), nombre: 'Caja Vecina', withBanlance: false, bid: 7 });
        } else if(type === "onlyBanks"){
            data.push({ img: require('../Assets/AP.png'), nombre: 'AllPay', balance: balances?.AllPay?.amount, bid: 0 });
            data.push({ img: require('../Assets/Santander.png'), nombre: 'Santander', balance: balances?.Santander?.amount, bid: 1 });
            data.push({ img: require('../Assets/HomeItau.png'), nombre: 'Itaú', balance: balances?.Itau?.amount, bid: 2 });
        }else {
            data.push({ img: require('../Assets/AP.png'), nombre: 'AllPay', balance: balances?.AllPay?.amount, bid: 0 });
            data.push({ img: require('../Assets/Santander.png'), nombre: 'Santander', balance: balances?.Santander?.amount, bid: 1 });
            data.push({ img: require('../Assets/HomeItau.png'), nombre: 'Itaú', balance: balances?.Itau?.amount, bid: 2 });
            data2.push({ img: require('../Assets/AP.png'), nombre: 'Webpay', withBanlance: false, bid: 3 });
            data2.push({ img: require('../Assets/PayPal.png'), nombre: 'Paypal', withBanlance: false, bid: 4 });
            data2.push({ img: require('../Assets/Crypto.png'), nombre: 'Crypto', withBanlance: false, bid: 5 });
            data2.push({ img: require('../Assets/Servipag.png'), nombre: 'Servipag', withBanlance: false, bid: 6 });
            data2.push({ img: require('../Assets/CajaVecina.png'), nombre: 'Caja Vecina', withBanlance: false, bid: 7 });
        }
    if (!data)
        return null
    return (<StyledListBank>
        <FlatList
            horizontal={horizontal}
            data={data ? data : [{ img: require('../Assets/Santander.png'), nombre: 'Banco de Chile' }]}
            renderItem={({ item }) => <ItemBank style={styleItem} nostyle={nostyle} title={title} data={{ ...item, amount: props?.amount, withBanlance }} setSelect={setSelect} type={type} />}
        />
        {JSON.stringify(data2) !== "[]" && <>
            <View style={{ paddingLeft: 12, paddingRight: 12, paddingBottom: 4, borderBottomWidth: .5, borderBottomColor: Colors.darkgray }}>
                <Texto size={13}>Otras opciones</Texto></View>
            <FlatList
                horizontal={horizontal}
                data={data2 ? data2 : [{ img: require('../Assets/Santander.png'), nombre: 'Banco de Chile' }]}
                renderItem={({ item }) => <ItemBank style={styleItem} nostyle={nostyle} title={title} data={{ ...item, amount: props?.amount, withBanlance }} setSelect={setSelect} type={type} />}
            /></>}
    </StyledListBank>)
}