import React, { useEffect, useState, useContext } from 'react'
import { View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import styled from 'styled-components/native'
import { Image } from 'react-native'
import { Texto } from './Texto'
import { Block } from './Block'
import Colors from './Colors'
import { useAPI } from '../Hooks/useAPI'
import { DataContext } from '../Context/Datos.Context'


const StyledItemUser = styled.View`
background-color:rgb(255,255,255);
flex:1;
flex-direction:row;
border-radius:12px;
margin:5px 10px 5px 10px;
/* width:${({ width }) => width ? width : '340px'}; */
height:${({ height }) => height ? height : '48.75px'};
padding:2px;
min-height:0px;
margin-bottom:10px;
`
export function ItemUser({ data, height, Enter, style }) {
    const { setSaveImgUser, saveImgUser } = useContext(DataContext)
    const API = useAPI()
    const [img, setImg] = useState()
    const { uuid, type } = data

    if (type === 'Contact') {
        useEffect(() => {
            if (data.match) {
                API.GetAPI.getAvatar(setImg, uuid)
            }
        }, [data.match])
        useEffect(() => {
            if (img)
                setSaveImgUser([...saveImgUser, { uuid, img }])
        }, [img])

        return (<StyledItemUser  height={height} style={[style,{paddingLeft:12,paddingRight:12}]}>
            <Block flexDirection="row" style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                <View flexDirection="row" style={{ alignItems: 'center'}}>
                    <Image style={{ width: 28, height: 28 }} borderRadius={50} source={data.match ? { uri: `${img && img}` } : require('./../Assets/ImageDefault.png')} />
                    <Texto style={{marginLeft:12}} size={12} colorLabel={data.match && Colors.Primary}> {data.name}</Texto>
                </View>
                <View style={{flex:0,flexDirection:'row',alignItems:'center'}}>
                <Image style={{ width: 28, height: 28 }} borderRadius={50} source={data.match && require('./../Assets/AP2.png')} />
                {Enter && <Entypo name="chevron-right" color={Colors.Texto3} size={15} />}
                </View>
                
            </Block>
        </StyledItemUser>
        )
    }
    if (type !== 'Contact') {
        useEffect(() => {
            searchImage()
        }, [data])

        const searchImage = () => {
            saveImgUser.filter(item => item.uuid === data.uuid ? setImg(item.img) : setImg())
        }

        return (<StyledItemUser style={[style,{flex: 1, display: 'flex', flexDirection: 'row', paddingLeft:12,paddingRight:12,height:48.75}]} >
            <Block flexDirection="row" style={{ alignItems: 'center' }}>
                <Image style={{ width: 32, height: 32 }}
                    borderRadius={50}
                    source={img ? { uri: `${img && img}` } : require('./../Assets/ImageDefault.png')} />
                <Texto style={{marginLeft:12}} size={12}>{data.first_name} {data.last_name}</Texto>
            </Block>
            <Block style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                {/* <Texto size={12} colorLabel={Colors.Primary}>+${data.earned}</Texto> */}
            </Block>
        </StyledItemUser>)
    }
    return null
}