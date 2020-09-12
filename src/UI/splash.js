import React,{useEffect} from 'react'
import {StatusBar} from 'react-native'
import styled from 'styled-components/native'
import Colors from './Colors'
import { Texto } from './Texto'

const StyledSplash=styled.View`
background-color:${Colors.Primary};
flex:1;
align-items:center;
justify-content:center;
`

export function Splash(){
    useEffect(() => {
        const unsubscribe = () => {
            StatusBar.setBackgroundColor(Colors.Primary)
            StatusBar.setBarStyle('dark-content')
        };
        return unsubscribe;
    }, [])
    return(<StyledSplash>
            <Texto size={44} colorLabel="white">ALL<Texto size={44} colorLabel="white" Bold>PAY</Texto></Texto>
    </StyledSplash>
    )
}