import React,{useEffect}from 'react'
import { View,StatusBar,BackHandler} from 'react-native'
import { ScreenContainer } from '../../ScreenContainer'
import { Header } from '../../../UI/Header'
import Colors from '../../../UI/Colors'
import { Texto } from '../../../UI/Texto'
import { HistorialPagos } from './Pagos'
import { HistorialCobros } from './Cobros'
import { DataContext } from '../../../Context/Datos.Context'
// import { useContext } from 'react'

export function History(props) {
    const { type, } = props.route.params
    const {navigation}=props
    const color = type === "pagar" ? Colors.Primary : Colors.Primary;
    // const {state} =useContext(DataContext)
    StatusBar.setBackgroundColor(Colors.Primary)
    
    useEffect(()=>{
        const backAction = () => {
            navigation.replace('App')
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    },[])
    
    return (
        <ScreenContainer backgroundColor={'transparent'} barBackgroundColor={color} scrollView>
            <View style={{ backgroundColor: color,paddingLeft:12,paddingRight:12 }}>
                <Header Return color={Colors.Secondary} onPressBack={()=>navigation.replace('App')} />
                <Texto size={13} colorLabel={Colors.Secondary} style={{ textAlign: 'center', marginBottom: 16 }}>Marthe Armani</Texto>
            </View>
            <View style={{marginLeft:12,marginRight:12}}>
            <View style={{ alignItems: 'center', flex: 1 }}>
            <Texto size={13} style={{ marginTop: 8, marginBottom: 8 }}>1/09/20</Texto>
                <HistorialCobros />
                <Texto size={13} style={{ marginTop: 8, marginBottom: 8 }}>1/09/20</Texto>
                <HistorialPagos />
                <Texto size={13} style={{ marginTop: 8, marginBottom: 8 }}>1/09/20</Texto>
                <HistorialCobros />
                <Texto size={13} style={{ marginTop: 8, marginBottom: 8 }}>1/09/20</Texto>
                <HistorialPagos />
                <Texto size={13} style={{ marginTop: 8, marginBottom: 8 }}>1/09/20</Texto>
                <HistorialCobros />
                <Texto size={13} style={{ marginTop: 8, marginBottom: 8 }}>1/09/20</Texto>
                <HistorialCobros />
            </View>
            </View>


        </ScreenContainer>
    )
}