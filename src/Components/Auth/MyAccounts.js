/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Block } from '../../UI/Block'
import { Texto } from '../../UI/Texto'
import { ItemBank } from '../../UI/ItemBank'
import Colors from '../../UI/Colors'
import { View } from 'react-native'
import { ListBank } from '../../UI/ListBank'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button } from '../../UI/Button'
import { useAPI } from '../../Hooks/useAPI'
import { Header } from '../../UI/Header'
import { ScreenContainer } from '../ScreenContainer'

export function MyAccounts(props) {
    const { navigation, route }=props;
    const { params } = route;
    const [ListBanks, setListBanks] = useState();
    const [selectBank, setSelectBank] = useState();
    const API = useAPI();    
    
    // useEffect(() => {
    //     API.GetAPI.getListUserBanks(setListBanks);
    // }, []);
    useEffect(() => {
        if (params)
        params?.setSelect&&params?.setSelect(selectBank);
    }, [selectBank]);
    const amount=route?.params?.monto;
    // const withBanlance=route?.params?.withBanlance;
    return (
        <ScreenContainer backgroundColor={Colors.Secondary} >
            <View style={{ display: 'flex', paddingLeft: 12, paddingRight: 12 }}>
                <Header Return />
            </View>
            <View style={{ paddingLeft: 12, paddingRight: 12,paddingBottom:4, borderBottomWidth: .5, borderBottomColor: Colors.darkgray}}>
                <Texto size={13}>Mis Cuentas</Texto>
            </View>
            <ListBank setSelect={params && setSelectBank} withBanlance amount={amount} data={ListBanks} nostyle type={params?.type?params?.type:'MyAccounts'}
            styleItem={{ paddingLeft: 12, paddingRight: 12, height: 60,
            backgroundColor: 'transparent', justifyContent: 'center',
            borderBottomWidth: .5, borderBottomColor: Colors.darkgray }}/>
            <View style={{ style: 'flex', alignItems: 'center', margin: 12 }}>
                <Button size={15} onPress={() => { navigation.navigate('AddBank') }} styleButton={{ bottom: 0, borderRadius: 18, width: 218 }} label="AÑADIR BANCOS" />
            </View>
        </ScreenContainer>
    )
}