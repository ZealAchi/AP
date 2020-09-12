/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React,{useContext} from 'react'
import styled from 'styled-components/native'
import { ItemBank } from './ItemBank'
import { FlatList } from 'react-native'
import { DataContext } from '../Context/Datos.Context'


const StyledListBank = styled.View`flex:1;`
export function ListBank(props) {
    const { horizontal, title, type, nostyle, styleItem, data = [], setSelect,withBanlance }=props
    const {balances} = useContext(DataContext)
    if(type==='AddBank'){
        
    }
    else
    if(type==='addBalance'){
        data.push({ img: require('../Assets/AP.png'), nombre: 'WebPay' });
    }else{
        data.push({ img: require('../Assets/AP.png'), nombre: 'AllPay',balance:balances?.AllPay?.amount, bid:0});
    }
    // console.log(data?data:'??')
    if(!data)
    return null
    return (<StyledListBank>
        <FlatList
            horizontal={horizontal}
            data={data ? data : [{ img: require('../Assets/Santander.png'), nombre: 'Banco de Chile' }]}
            renderItem={({ item }) => <ItemBank style={styleItem} nostyle={nostyle} title={title} data={{...item,amount:props?.amount,withBanlance:props?.withBanlance}} setSelect={setSelect} type={type} />}
        />
    </StyledListBank>)
}