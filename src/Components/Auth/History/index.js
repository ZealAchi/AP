import React, { useEffect,useState } from 'react'
import { View, StatusBar, BackHandler } from 'react-native'
import { ScreenContainer } from '../../ScreenContainer'
import { Header } from '../../../UI/Header'
import Colors from '../../../UI/Colors'
import { Texto } from '../../../UI/Texto'
import { DataContext } from '../../../Context/Datos.Context'
import { HistorialTransferencias } from './Transferencias'
import { ScrollView } from 'react-native-gesture-handler'
// import { useContext } from 'react'

const ItemTransferencia=[
    {Tx: "SHA256-XM131",fecha:"Hoy",tipo:"Enviastes",cantidad:"4.000",concepto:"El pago de la última compra.",time:"19:50",color: "transparent" },
    {Tx: "SHA256-XM332",fecha:"Ayer",tipo:"Enviastes",cantidad:"5.000",concepto:"El pago de la última compra.",time:"22:01",color: "transparent" },
    {Tx: "SHA256-XMl33",fecha:"23/09/2020",tipo:"Recibistes",cantidad:"5.000",concepto:"El pago de la última compra.",time:"11:25",color: "transparent" },
    {Tx: "SHA256-XA134",fecha:"21/09/2020",tipo:"Enviastes",cantidad:"10.200",concepto:"El pago de la última compra.",time:"09:50",color: "transparent" },
]

export function History(props) {
    const { type,user} = props.route.params
    const {navigation}=props
    
    const color = Colors.Primary
    StatusBar.setBackgroundColor(Colors.Primary)
    useEffect(() => {
        const backAction = () => {
            navigation.replace('App')
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [])
    

    return (
        <ScreenContainer backgroundColor={'transparent'} barBackgroundColor={color} >
            <ScrollView style={{flex:1,}}>
            <View style={{ backgroundColor: color, paddingLeft: 12, paddingRight: 12 }}>
                <Header Return color={Colors.Secondary} onPressBack={() => navigation.replace('App')} />
                <View>
                    <Texto size={13} colorLabel={Colors.Secondary} style={{ marginBottom: 0 }}>
                        Movimientos totales con @{user&&user}
                </Texto>
                <Texto size={25} colorLabel={Colors.Secondary} style={{ marginBottom: 0 }}>
                <Texto size={25} colorLabel={Colors.Secondary} style={{ marginBottom: 16 }}>
                +
                </Texto>
                        $270.000
                </Texto>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 16  }}>
                    <View style={{ flex: 1 }}>
                        <Texto size={13} colorLabel={Colors.Secondary} >
                            Gastos
                </Texto>
                        <Texto size={13} colorLabel={Colors.Secondary} >
                            + $471.400
                </Texto>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Texto size={13} colorLabel={Colors.Secondary} >
                            Gastos
                </Texto>
                        <Texto size={13} colorLabel={Colors.Secondary} >
                            - $201.400
                </Texto>
                    </View>
                </View>

            </View>
            <View style={{flex:1 }}>
                <View style={{ alignItems: 'center', flex: 1 }}>
                    {ItemTransferencia.map((item,index)=>{return(
                        <React.Fragment>
                            <Texto size={13} style={{ marginTop: 8, marginBottom: 8 }}>{item.fecha}</Texto>
                            <HistorialTransferencias {...{item,ItemTransferencia,user}} index={index} />
                        </React.Fragment>
                    )})}
                
                </View>
            </View>

            </ScrollView>
        </ScreenContainer>
    )
}