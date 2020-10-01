import React, { useContext, useEffect } from 'react'
import { ScreenContainer } from '../../ScreenContainer'
import Colors from '../../../UI/Colors'

import { StyledContext } from '../../../Context/Styled.Context'
import { ContentAnalisis } from './ContentAnalisis'



export function NoComput({ navigation }) {
    const { changeThemeSecondLight } = useContext(StyledContext)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            changeThemeSecondLight();
        });
        return unsubscribe;
    }, [navigation])

    const NoComput = {
        type: "Gastado",
        percentage: "80",
        cantidad: "1.055.194",
        Items: [
            // {
            //     Entypo:true,
            //     icon: "help",
            //     title: "Transferencias",
            //     amount: "225.000",
            //     movements:true,
            //     numberMovements:6
            // },
        ]
    }
    return (<ScreenContainer NoMyStatusBar scrollView backgroundColor={Colors.Secondary}>
        <ContentAnalisis {...{NoComput}}/>

    </ScreenContainer>)
}