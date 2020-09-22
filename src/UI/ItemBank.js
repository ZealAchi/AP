/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React,{memo,useState,useEffect} from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import { Texto } from './Texto';
import { Block } from './Block';
import Colors from './Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as RootNavigation from '../Navigations/RootNavigation';
import { dateDiff } from '../Util/CalcularDiasMesAños';
import { SvgUri } from 'react-native-svg';
import { useAPI } from '../Hooks/useAPI';
import { useContext } from 'react';
import { DataContext } from '../Context/Datos.Context';

const StyledItemBank = styled.TouchableOpacity`
${({ nostyle }) => !nostyle ? `
            background-color: rgb(255, 255, 255);
            width: '98%';
            flex: 1;
            display: flex;
            flex-direction: column;
            border-radius: 12px;
            border-color: transparent;
            border-width: 1px;
            margin: 5px 10px 5px 10px;
            padding: 3px 10px;
            `: ''
    };

`
export const  ItemBank=memo((props)=> {
    const { nostyle, data, title, type, style, setSelect, onPress = () => { } } =props
    const { ganancia, img, nombre, name, updated_at,withBanlance,balance,bid} = data
    const [imagen,setImagen]=useState()
    const API=useAPI()
    const SelectBank = () => {
        if (!setSelect) { alert('Ups, te falta declarar algo para seleccionar') } else {
            RootNavigation.navigate('AddBank2', {
                bid: data.bid,
                imagen,
                name
            });
        }
    }
    const SelectMyAccounts = () => {
        if (data.nombre === 'AllPay'&&type!==('Pagar'||'Cobrar')) {
            // console.log('RootNavigation',RootNavigation.navigationRef.current)
            RootNavigation.navigate('SaldoAllPay');
        } else if (!setSelect) { 
            console.log(':D')
            /*alert('Ups, te falta declarar algo para seleccionar una cuenta') */
        } else {
            setSelect(data.bid)
            RootNavigation.navigationRef.current.goBack()
        }
    }
    const SeeType = () => {
        switch (type) {
            case 'addBalance':
                RootNavigation.navigate('SaldoAllPay',{amount:props.data.amount})
                break;
            case 'AddBank':
                SelectBank();
                break;
            case 'MyAccounts':
                SelectMyAccounts();
                break;
            case 'Pagar':
                // console.log(props,'props')
                SelectMyAccounts();
                break;
            default:
                onPress()
                break;
        }
    }
    const ShowDayTime = (type !== 'ConectBank' || type !== 'AddBank') ? updated_at ? true : false : true
    const date = updated_at ? new Date(updated_at * 1000) : undefined
    const diaUpdated = date && `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    
    useEffect(()=>{
        if(!img)
        API.GetAPI.getImageBank(setImagen,bid)
    },[bid])
    
    return (<StyledItemBank nostyle={nostyle} style={[style, { zIndex: 2 }]} onPress={() => SeeType()}>
        {title && <View style={{ flex: 0.5, }}>
            <Texto>{title}</Texto>
        </View>}
        <View style={{ flexDirection: 'row', flex: 1, }}>
            <Block flexDirection="row" style={{ alignItems: 'center' }}>
            {data.nombre==='WebPay'?<SvgUri width="40.65px" height="40.65px" uri="https://webpay3gint.transbank.cl/webpayserver/imagenes/webpayplus.svg"/>:
            <Image style={{ width: 40.65, height: 40.65 }} source={img?(
                data.nombre === 'AllPay'||data.nombre === 'Santander'||data.nombre === 'Itaú'
                )?img:{uri:img}:{uri:imagen}} />
            }
                <View style={{ paddingLeft: 8 }}>
                    <Texto size={12}>{nombre || name}</Texto>
                    {ShowDayTime && <Texto size={12} colorLabel={Colors.dimgray}>
                        {`${dateDiff(`${diaUpdated}`).days === 0 && dateDiff(`${diaUpdated}`).years === 0 && dateDiff(`${diaUpdated}`).months === 0 ?
                            'hoy' :
                            dateDiff(`${diaUpdated}`).years === 0 ?
                                dateDiff(`${diaUpdated}`).months === 0 ?
                                    `hace ${dateDiff(`${diaUpdated}`).days}${dateDiff(`${diaUpdated}`).days === 1 ? ' dia' : ' dias'}` :
                                    `hace ${dateDiff(`${diaUpdated}`).months}${dateDiff(`${diaUpdated}`).months === 1 ? ' mes' : ' meses'}` :
                                `hace ${dateDiff(`${diaUpdated}`).years}${dateDiff(`${diaUpdated}`).years === 1 ? ' año' : ' años'}`
                            }
                            `}</Texto>}
                </View>
            </Block>
            <Block style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                {!type === 'MyAccounts' && <Texto colorLabel={Colors.dimgray} size={13} colorLabel={Colors.dimgray}>{'saldo'}</Texto>}
                {withBanlance &&balance&&<Texto size={13} colorLabel={Colors.Primary}>${balance}</Texto>}
            </Block>
        </View>
    </StyledItemBank>)
})
export function ItemBank2({nocuenta,cuenta,onlyname,noSaldo, allpay,general, data, title, type, style, onPress = () => { } }) {
    
    const {balances}=useContext(DataContext)
    const { ganancia, img, nombre,balance=nombre==='Itaú'?balances?.Itau?.amount:nombre==='Santander'?balances?.Santander?.amount:undefined} = data
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    
    if(hours<10){hours='0'+hours}
    if(minutes<10){minutes='0'+minutes}
    var hoy = `${hours}:${minutes}`;


    console.log(type,'type')
    return (
        <StyledItemBank onPress={onPress} nostyle style={[{ width: '98%', padding: 10, backgroundColor: 'white', marginBottom: 12 },style]}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                { (!onlyname||allpay) && <Block style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {!nocuenta&&<><Texto Bold size={12}>Cuentas</Texto>
                    <Ionicons name="ios-arrow-forward" color={Colors.Texto3} size={23} /></>}
                </Block>}
            </View>
            <View style={{ flex: 5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Block flexDirection="row">
                    <Image style={{ width: 40.65, height: 40.65 }} source={img} />
                    
                    {onlyname?<Block style={{ marginLeft: 8,justifyContent:'center'}}>
                        <Texto size={12} colorLabel={Colors.midnightblue}>{!allpay ? nombre?nombre:'Itaú' : <Texto Texto size={12} colorLabel={Colors.midnightblue}>
                            Saldo All<Texto Bold size={12} colorLabel={Colors.midnightblue}>Pay</Texto></Texto>}</Texto>
                    </Block>
                :<Block style={{ marginLeft: 8 }}>
                <Texto size={12} colorLabel={Colors.midnightblue}>{!allpay ? nombre?nombre:'Itaú' : <Texto Texto size={12} colorLabel={Colors.midnightblue}>
                    Saldo All<Texto Bold size={12} colorLabel={Colors.midnightblue}>Pay</Texto></Texto>}</Texto>
                <Texto size={12} colorLabel={Colors.dimgray}>Hoy, {hoy}</Texto>
            </Block>
                }
                </Block>
                <Block style={{ flexDirection: 'row-reverse' }}>
                {!noSaldo&&<View>
                        {!allpay||balance && <Texto colorLabel={Colors.Texto4} size={12}>Saldo{general&&' general'}</Texto>}
                        <Texto colorLabel={Colors.Texto3} size={12}>{`$ ${balance?balance:'15.131.495'}`}</Texto>
                    </View>}
                </Block>
            </View>
        </StyledItemBank>
    )
}