import React, { useContext } from 'react'
import { View, Image, StyleSheet } from 'react-native';
import { LoadingContext } from '../Context/Load.Context';
import { Splash } from './splash';
import { ScreenContainer } from '../Components/ScreenContainer';
import Colors from './Colors';


export function LoaderIcon({ animationType }) {
    const { Loading, type } = useContext(LoadingContext)
    if (Loading && type === 'Icon')
        return (
            <View style={styles.wrapper}>
                <View style={styles.loaderContainer}>
                    <Image
                        style={styles.loaderImage}
                        source={require('../Assets/Loader.gif')}
                    />
                </View>
            </View>
        )
    return null
}
export function LoaderScreen() {
    const { Loading, type } = useContext(LoadingContext)
    if (Loading && type === 'Screen')
        return (
            <View style={styles.wrapper}>
                <ScreenContainer backgroundColor={Colors.Primary} barBackgroundColor={Colors.Primary}>
                    <Splash />
                </ScreenContainer>

            </View>)
    return null
}

const styles = StyleSheet.create({
    wrapper: {
        zIndex: 9,
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    loaderContainer2: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'white',
        // borderRadius: 15,
        // position: 'absolute',
        left: '0',
        top: '0',


    },
    loaderContainer: {
        width: 90,
        height: 90,
        backgroundColor: 'white',
        borderRadius: 15,
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -45,
        marginTop: -45,
    },
    loaderImage: {
        width: 70,
        height: 70,
        borderRadius: 15,
        position: 'relative',
        left: '50%',
        marginLeft: -35,
        top: '50%',
        marginTop: -35,
    },
});