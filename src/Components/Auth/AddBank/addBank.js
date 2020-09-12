import React,{useEffect, useState, useContext} from 'react'
import { Block } from '../../../UI/Block'
import { Texto } from '../../../UI/Texto'
import { View } from 'react-native'
import { ListBank } from '../../../UI/ListBank'
import Colors from '../../../UI/Colors'
import { useAPI } from '../../../Hooks/useAPI'
import { ScreenContainer } from '../../ScreenContainer'
import { Header } from '../../../UI/Header'
import { DataContext } from '../../../Context/Datos.Context'

export function AddBank({navigation}){
    const {state}=useContext(DataContext)
    const data = [{ nombre: 'Santarder', img: undefined }]
    const [listBank,setListBank]=useState([])
    const [selectBank,setSelectBank]=useState()
    const API=useAPI()
    // useEffect(()=>{
    //     API.GetAPI.getListBanks(setListBank)
    // },[])
    const select=(value)=>{
        setSelectBank(value)
        // navigation.pop()
    }
    const {banks}=state
    
    return(<ScreenContainer backgroundColor={Colors.Secondary} >
        
        <View style={{marginLeft:12,marginRight:12}}>
        <Header Return />
            <Texto size={13} labelColor={Colors.midnightblue}>Agregar Banco</Texto>
        </View>
        <Block>
            <ListBank setSelect={select} type="AddBank" data={banks} nostyle styleItem={{ paddingLeft: 12, paddingRight: 12, height: 60, backgroundColor: 'transparent', justifyContent: 'center', borderTopWidth: .7, borderTopColor: Colors.darkgray, borderBottomWidth: .5, borderBottomColor: Colors.darkgray }} />
        </Block>
    </ScreenContainer>)
}