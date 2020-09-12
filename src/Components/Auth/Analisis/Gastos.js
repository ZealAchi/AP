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
    return (<ScreenContainer NoMyStatusBar scrollView backgroundColor={Colors.Secondary}>
        <ContentAnalisis />

    </ScreenContainer>)
}