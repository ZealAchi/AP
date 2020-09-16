/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useRef, useEffect, useContext, useState } from 'react'
import { AlertMessage } from '../Components/Alert'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import FingerprintScanner from 'react-native-fingerprint-scanner';
import * as RootNavigation from '../Navigations/RootNavigation'
import { AppState, Platform, View } from 'react-native';
import { Modalize } from 'react-native-modalize'
import { Texto } from '../UI/Texto'
import { ModalContext } from '../Context/Modal.Context'
import { Block } from '../UI/Block'
import { Button } from '../UI/Button'
import Colors from '../UI/Colors'

import FingerprintScanner from 'react-native-fingerprint-scanner'
import { FingerprintPopup } from '../Components/Biometric/FingerprintPopup';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import { useAPI } from '../Hooks/useAPI';
import { DataContext } from '../Context/Datos.Context';


export function Huellero(props) {
    const localStorage = useLocalStorage()
    const API = useAPI()
    // const { tokenX } = useContext(DataContext)
    const { type, returnValue, noSave,setShowFinger } = props
    const [state, setState] = useState({
        // popupShowed: false,
        errorMessage: undefined,
        biometric: undefined
    })

    const [error, setError] = useState()
    useEffect(() => {
        FingerprintScanner
            .isSensorAvailable()
            .then(biometryType => {
            })
            .catch(error => {
                returnValue()
                setError(error)
            });
    }, [])
    function requiresLegacyAuthentication() {
        return Platform.Version < 23;
    }

    useEffect(() => {

        if ('activar' === type || 'login' === type || 'transfer' === type) {
            if (requiresLegacyAuthentication()) {
                authLegacy();
            } else {
                authCurrent();
            }
            return () => {
                FingerprintScanner.release();
            }
        }
    }, [])
    function authCurrent() {
        console.log(type, 'type')
        FingerprintScanner
            .authenticate({
                description:
                    'activar' === type ?
                        'Puedes usar tu huella para entrar a AllPay y confirmar movimientos de dinero.'
                        : 'transfer' === type ?
                            'Ingresa tu huella para confirmar la transferencia.'
                            : 'Toque el sensor',

                cancelButton: 'activar' === type ?'NO POR AHORA' : 'USAR CONTRASEÑA', title: 'AllPay'
            })
            .then(() => {
                if (type === 'transfer') {
                    props?.nextAction()
                } else
                    if (type === 'login') {
                        API.PostAPI.login({}, (valido) => {
                            if (valido) RootNavigation.navigate('App')
                        }, true)
                    } else {
                        returnValue()
                        localStorage.setData('@App:withFinger', JSON.stringify(true))
                    }
            })
            // setShowFinger
            .catch((error) => {
                
                // console.log(' asdjas j jk kjs ')
                setShowFinger&&setShowFinger(false)
                returnValue()
                if (error.message == 'Authentication was canceled because the user tapped the fallback button (Enter Password).') {
                    noSave()
                } else {
                    alert(error.message);
                    noSave && noSave()
                }

            });
    }

    function authLegacy() {
        FingerprintScanner
            .authenticate({ onAttempt: handleAuthenticationAttemptedLegacy })
            .then(() => {
                console.log('raios :v')
                props.handlePopupDismissed();
                // Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
            })
            .catch((error) => {
                returnValue()
                setState({ errorMessageLegacy: error.message, biometricLegacy: error.biometric });

                description.shake();
            });
    }
    const handleAuthenticationAttemptedLegacy = (error) => {
        setState({ errorMessageLegacy: error.message });
        description.shake();
    };
    return null

}
