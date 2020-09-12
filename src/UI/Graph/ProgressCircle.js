import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import Colors from '../Colors'

export default function (props) {
    // console.log(props})
    const { children, flex, value = .8,styleGraph,color} = props
    return (
        <ProgressCircle
            style={[flex && { flex: 1 },{ height: 200 }, styleGraph&&styleGraph]} progress={value} progressColor={color?color:Colors.Tertiary} cornerRadius={10} strokeWidth={12}>
            {children && <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {children}
            </View>}
        </ProgressCircle>
    )
}
