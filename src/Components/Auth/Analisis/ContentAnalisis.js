import React, { useContext } from 'react'
import { View } from 'react-native'
import ProgressCircle from '../../../UI/Graph/ProgressCircle'
import { Texto } from '../../../UI/Texto'
import Colors from '../../../UI/Colors'
import { ItemAnalysis } from '../../../UI/ItemAnalysis'
import { StyledContext } from '../../../Context/Styled.Context'

export function ContentAnalisis() {
    const { themeCurrent } = useContext(StyledContext)
    return (
        <View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white', height: 117.97, alignItems: 'center' }}>
                <ProgressCircle styleGraph={{ width: 82.21, height: 82.21 }} color={themeCurrent.color1} />
                <View style={{ marginLeft: 12, justifyContent: 'center' }}>
                    <Texto size={12} colorLabel={themeCurrent.color1}>80%</Texto>
                    <Texto size={12} colorLabel={Colors.darkgray}>Gastado de tu previsto de</Texto>
                    <Texto size={12} colorLabel={Colors.midnightblue}>$1.055.194</Texto>
                </View>
            </View>
            <View style={{ marginTop: 12 }}>
                <ItemAnalysis color={themeCurrent.color1} />
                <ItemAnalysis color={themeCurrent.color1} />
                <ItemAnalysis color={themeCurrent.color1} />
                <ItemAnalysis color={themeCurrent.color1} />
            </View>
        </View>
    )
}