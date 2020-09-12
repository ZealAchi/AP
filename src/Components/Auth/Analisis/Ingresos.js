/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useContext, useEffect } from 'react'

import { ScreenContainer } from '../../ScreenContainer'
import Colors from '../../../UI/Colors'
import { StyledContext } from '../../../Context/Styled.Context'
import { ContentAnalisis } from './ContentAnalisis'

export function Ingresos({ navigation }) {
    const { changeThemePrimaryLight } = useContext(StyledContext);
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            changeThemePrimaryLight();
        });
        return unsubscribe;
    }, [navigation])
    

    return (<ScreenContainer NoMyStatusBar scrollView backgroundColor={Colors.Secondary}>
        <ContentAnalisis />

    </ScreenContainer>)
}