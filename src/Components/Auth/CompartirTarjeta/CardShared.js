import React from 'react'
import { ScreenContainer } from '../../ScreenContainer'
import { FlatList, View } from 'react-native'
import { Block } from '../../../UI/Block'
import { Texto } from '../../../UI/Texto'
import { Button } from '../../../UI/Button'
import Colors from '../../../UI/Colors'
import { CardView } from '../../../UI/CreditCard/type'
import BarChart from '../../../UI/Graph/BarChart'
import { ItemMovements } from '../../../UI/itemMovements'
import { getTypeCreditCardImg } from '../../../Util/BackgroundCard'
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
    },
];
export function CardShared({ navigation }) {
    const data = [
        { activo: false, label: 'Ene', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: false, label: 'Feb', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: false, label: 'Mar', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: false, label: 'Abr', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: false, label: 'May', ingresos: { value: 50 }, gastos: { value: 80 } },
        { activo: false, label: 'Jun', ingresos: { value: 50 }, gastos: { value: 10 } },
        { activo: false, label: 'Jul', ingresos: { value: 50 }, gastos: { value: 10 } },
        { activo: false, label: 'Ago', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: true, label: 'Sept', ingresos: { value: 50 }, gastos: { value: 9 } },
        { activo: false, label: 'Oct', ingresos: { value: 50 }, gastos: { value: 100 } },
        { activo: false, label: 'Nov', ingresos: { value: 50 }, gastos: { value: 10 } },
        { activo: false, label: 'Dic', ingresos: { value: 50 }, gastos: { value: 8 } },
    ]
    const renderItem = ({ item }) => (
        <CardView

            // brand
            name="Luis Antonio Padre Garcia"
            number="**** **** **** 1547"
            expiry="12/23"
            imageFront={getTypeCreditCardImg('verde')}
            imageBack={getTypeCreditCardImg('verde')}
            // cvc
            // imageFront
            // imageBack
            scale={0.9} />
    );
    return (
        <ScreenContainer scrollView backgroundColor={'transparent'}>
            <View style={{ flex: 1, alignItems: 'center',marginTop:12 }}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    legacyImplementation={false}
                    style={{ flex: 0 }}
                />
                <View style={{ marginTop: 18, alignItems: 'center' }}>
                    <Texto colorLabel={Colors.midnightblue} size={12}>Santander</Texto>
                    <Texto colorLabel={Colors.midnightblue} size={14}>Mastercard Platinum <Texto colorLabel={Colors.Tertiary} size={14}>Default</Texto></Texto>
                    <Texto size={12} colorLabel={Colors.darkgray}>Disponible</Texto>
                    <Texto size={25} colorLabel={Colors.midnightblue}>$1.050.000</Texto>
                    <Texto size={12} colorLabel={Colors.midnightblue}>USD 14.380</Texto>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', marginLeft: 8, marginRight: 8 }}>
                <BarChart data={data} round={100} unit="€" />
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-between', marginLeft: 8, marginRight: 8 }}>
                <View>
                    <Texto colorLabel={Colors.midnightblue} size={12}>Dinero obtenido</Texto>
                    <Texto size={12} colorLabel={Colors.darkgray}>Sep 2020</Texto>
                </View>
                <Texto size={12} colorLabel={Colors.Primary}>30.000</Texto>
            </View>
            <View style={{marginBottom:12}}>
            <View style={{ marginTop: 12, marginBottom: 2, flex: 1, width: '95%' }}>
                <ItemMovements />
            </View>
            <View style={{ marginTop: 12, marginBottom: 2, flex: 1, width: '95%' }}>
                <ItemMovements />
            </View>
            <View style={{ marginTop: 12, marginBottom: 2, flex: 1, width: '95%' }}>
                <ItemMovements />
            </View>
            <View style={{ marginTop: 12, marginBottom: 2, flex: 1, width: '95%' }}>
                <ItemMovements />
            </View>
            <View style={{ marginTop: 12, marginBottom: 2, flex: 1, width: '95%' }}>
                <ItemMovements />
            </View>
            <View style={{ marginTop: 12, marginBottom: 2, flex: 1, width: '95%' }}>
                <ItemMovements />
            </View>
            </View>
        </ScreenContainer>
    )
}