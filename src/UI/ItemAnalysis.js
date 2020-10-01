import React from 'react'
import { View, Image } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Colors from './Colors'
import { Texto } from './Texto'
import { RectButton } from 'react-native-gesture-handler'
import * as RootNavigation from "../Navigations/RootNavigation"
export function ItemAnalysis(props) {
    const { color, item } = props
    return (<RectButton style={{ flexDirection: 'row', flex: 1, padding: 8, marginTop: 6, backgroundColor: 'white', borderRadius: 10 }}
    onPress={()=>{
        item.title==="Efectivo"?()=>{}:
        item.title==="Cargos bancarios"?()=>{}:
        item.title==="Servicios y productos"?()=>{}:
        item.title&&RootNavigation.navigate("ViewTransacciones",{...{item}})
    }}
    >
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0 }}>
                {item?.Entypo && <Entypo name={item?.icon} color={color ? color : Colors.Texto3} size={26} />}
                {item?.FontAwesome5 && <FontAwesome5 name={item?.icon} color={color ? color : Colors.Texto3} size={26} />}
                {item?.FontAwesome && <FontAwesome name={item?.icon} color={color ? color : Colors.Texto3} size={26} />}
                {item?.Image && <Image source={item.source} style={{ height: 28, width: 30 }} />}
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
                <Texto size={12}>{item?.title}</Texto>
                {item?.movements && <Texto size={10}>{item?.numberMovements} movimientos</Texto>}
                {item?.online && <Texto size={10}>online</Texto>}
            </View>
        </View>
        <View style={{ flexDirection: 'row-reverse', flex: 1 }}>
            <Entypo name={"chevron-right"} color={color ? color : Colors.Texto3} size={30} />
            <View style={{ alignSelf: 'center' }}>
                <Texto size={10}>{item.type === "Ingresos" ? "+" : "-"}${item.amount && item.amount}</Texto>
            </View>
        </View>
    </RectButton>)
}