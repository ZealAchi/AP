import React, { useContext } from 'react'
import { View } from 'react-native'
import ProgressCircle from '../../../UI/Graph/ProgressCircle'
import { Texto } from '../../../UI/Texto'
import Colors from '../../../UI/Colors'
import { ItemAnalysis } from '../../../UI/ItemAnalysis'
import { StyledContext } from '../../../Context/Styled.Context'

export function ContentAnalisis(props) {
    const Data=props.Gastos||props.Ingresos||props.NoComput
    
    const { themeCurrent } = useContext(StyledContext)
    return (
        <View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white', height: 117.97, alignItems: 'center' }}>
                <ProgressCircle styleGraph={{ width: 82.21, height: 82.21 }} color={themeCurrent.color1} />
                <View style={{ marginLeft: 12, justifyContent: 'center' }}>
                    <Texto size={12} colorLabel={themeCurrent.color1}>{Data?.percentage}%</Texto>
                    <Texto size={12} colorLabel={Colors.darkgray}>{Data?.type} de tu previsto de</Texto>
                    <Texto size={12} colorLabel={Colors.midnightblue}>${Data?.cantidad}</Texto>
                </View>
            </View>
            <View style={{ marginTop: 12 }}>
                {Data?.Items.map((item,i)=>{
                    return(<ItemAnalysis {...{item}} key={i} color={themeCurrent.color1} />)
                })}
            </View>
        </View>
    )
}