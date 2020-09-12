import React, { useState, useEffect } from 'react'
import { View } from 'react-native'

export function FingerprintPopup(props) {
    const [state, setState] = useState({ errorMessageLegacy: undefined, biometricLegacy: undefined })
    const { handlePopupDismissed } = props
    const API = useAPI()
    useEffect(() => {
        if (requiresLegacyAuthentication()) {
            authLegacy();
        } else {
            authCurrent();
        }
        return () => {
            FingerprintScanner.release();
        }
    }, [])

    function requiresLegacyAuthentication() {
        return Platform.Version < 23;
    }

    function authCurrent() {
        FingerprintScanner
            .authenticate({ description: 'Toque el sensor', cancelButton: 'USAR CONTRASEÑA', title: 'AllPay' })
            .then(() => {
                handlePopupDismissed();
                API.PostAPI.login({}, (valido) => {
                    if(valido)RootNavigation.navigate('App')
                }, true)
            })
            .catch((error) => {
                handlePopupDismissed();
                alert(error.message);
            });
    }

    function authLegacy() {

        // FingerprintScanner
        //     .authenticate({ onAttempt: handleAuthenticationAttemptedLegacy })
        //     .then(() => {
        //         props.handlePopupDismissed();
        //         Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
        //     })
        //     .catch((error) => {
        //         setState({ errorMessageLegacy: error.message, biometricLegacy: error.biometric });
        //         description.shake();
        // });
    }

    const handleAuthenticationAttemptedLegacy = (error) => {
        setState({ errorMessageLegacy: error.message });
        description.shake();
    };


    function renderLegacy(props) {
        const { errorMessageLegacy, biometricLegacy } = props.state;
        const { style, handlePopupDismissed } = props;

        return (
            <View style={styles.container}>
                <View style={[styles.contentContainer, style]}>

                    <Image
                        style={styles.logo}
                        source={require('./assets/finger_print.png')}
                    />

                    <Text style={styles.heading}>
                        Biometric{'\n'}Authentication
              </Text>
                    <ShakingText
                        ref={(instance) => { description = instance; }}
                        style={styles.description(!!errorMessageLegacy)}>
                        {errorMessageLegacy || `Scan your ${biometricLegacy} on the\ndevice scanner to continue`}
                    </ShakingText>

                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={handlePopupDismissed}
                    >
                        <Text style={styles.buttonText}>
                            BACK TO MAIN
                </Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

    if (requiresLegacyAuthentication()) {
        return renderLegacy(...props);
    }
    return null;
}

import FingerprintScanner from 'react-native-fingerprint-scanner';
import styles from './FingerprintPopup.component.styles';
import ShakingText from './ShakingText.component';
import PropTypes from 'prop-types';
import {
    Alert,
    Image,
    Text,
    TouchableOpacity,
    ViewPropTypes,
    Platform,
} from 'react-native';
import { useAPI } from '../../Hooks/useAPI'
import * as RootNavigation from '../../Navigations/RootNavigation'


