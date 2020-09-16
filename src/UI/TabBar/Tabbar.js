/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable-next-line react/prefer-stateless-function */
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View, Animated, Image } from 'react-native';
import * as shape from 'd3-shape';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Text, TouchableOpacity } from "react-native";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import posed from "react-native-pose";

import StaticTabbar from './StaticTabbar';

import Svg, {
    Path,
} from 'react-native-svg';
import Colors from '../Colors';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const { width } = Dimensions.get('window');
const height = 64;
const tabs = [
    {
        name: 'Transferir',
    },
    {
        name: 'Mis Bancos',
    },
    {
        name: 'Tarjetas',
    },
    {
        name: 'Compartir Tarjeta',
    },
    {
        name: 'Más',
    },
];
const tabWidth = width / tabs.length;
const backgroundColor = 'white';

const getPath = () => {
    const left = shape.line().x(d => d.x).y(d => d.y)([
        { x: 0, y: 0 },
        { x: width, y: 0 },
    ]);
    const tab = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasis)([
        { x: width, y: 0 },
        { x: width + 5, y: 0 },
        { x: width + 8, y: 5 },
        { x: width + 20, y: height-37},
        { x: width + tabWidth - 22, y: height-37},
        { x: width + tabWidth - 10, y: 10 },
        { x: width + tabWidth - 5, y: 2 },
        { x: width + tabWidth, y: 0 },
    ]);
    const right = shape.line().x(d => d.x).y(d => d.y)([
        { x: width + tabWidth, y: 0 },
        { x: width * 2, y: 0 },
        { x: width * 2, y: height },
        { x: 0, y: height },
        { x: 0, y: 0 },
    ]);
    return `${left} ${tab} ${right}`;
};
const d = getPath();
export default function Tabbar({ state, descriptors, navigation,key }) {
    let value = new Animated.Value(0);
    const activeRouteIndex = state.index
    const translateX = value.interpolate({
        inputRange: [0, width],
        outputRange: [-width, 0],
    });
    if(activeRouteIndex!==2) return null
    return (
        <>  
            <View {...{ height, width }} style={{ bottom: 0, position: 'absolute', display: 'none' }}>
                <AnimatedSvg width={width * 2} {...{ height }} style={{ transform: [{ translateX }] }}>
                    <Path {...{ d }} fill={backgroundColor} />
                </AnimatedSvg>
                <View style={StyleSheet.absoluteFill}>
                    <StaticTabbar {...{ tabs, value,state, descriptors,key}} navigation={navigation}/>
                </View>
            </View>
            <SafeAreaView style={styles.container} />
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor
    },
});

export function MyTabBar(props) {
    const { state, descriptors, navigation,key } = props
    return <Tabbar navigation={navigation} key={`key+1`} state={state} descriptors={descriptors}/>
   
}

