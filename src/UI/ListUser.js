import React from 'react'
import styled from 'styled-components/native'
import { ItemUser } from './ItemUser'
import { FlatList,View } from 'react-native'
import { FooterList } from './LoadingFlatList'


const StyledListUser = styled.View`
flex:1;
width:100%;
`
export function ListUser({data,nostyle}) {
    return (<StyledListUser>
        <FlatList
            data={data}
            renderItem={({ item }) => <ItemUser  data={item} />}
            onEndReachedThreshold={0.5}
            contentContainerStyle={{marginBottom:40}}
        //     ListFooterComponent={<FooterList type='referidos' />   
        // }
        />
    </StyledListUser>)
}