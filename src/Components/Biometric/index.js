/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import {
    AppState,
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { FingerprintPopup } from './FingerprintPopup';
// import { Button } from '../../UI/Button';

const StyledFingerPrint = styled.View`
/* margin:120px; */
`

export function FingerPrint() {
    const [state, setState] = useState({
        popupShowed: true,
        errorMessage: undefined,
        biometric: undefined
    })

    // const handleFingerprintShowed = () => {
    //     setState({...state, popupShowed: true });
    // };

    const handleFingerprintDismissed = () => {
        setState({ ...state, popupShowed: false });
    };

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        detectFingerprintAvailable();

        return () => { AppState.removeEventListener('change', handleAppStateChange) }
    }, [])


    const detectFingerprintAvailable = () => {
        const qw = FingerprintScanner
            .isSensorAvailable()
            .catch(error => setState({ errorMessage: error.message, biometric: error.biometric }));
    }

    const handleAppStateChange = (nextAppState) => {
        if (state.appState && state.appState.match(/inactive|background/) && nextAppState === 'active') {
            FingerprintScanner.release();
            detectFingerprintAvailable();
        }
        setState({ appState: nextAppState });
    }

    return (<StyledFingerPrint>
        {/* <Button label="Presiona" onPress={() =>handleFingerprintShowed()} /> */}
        {state.popupShowed && <FingerprintPopup state={state}
            handlePopupDismissed={handleFingerprintDismissed}
        />}
    </StyledFingerPrint>)
}