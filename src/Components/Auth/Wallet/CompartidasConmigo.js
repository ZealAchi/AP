/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React from 'react'
import { ScreenContainer } from '../../ScreenContainer'
import { FlatList, View } from 'react-native'
import { Block } from '../../../UI/Block'
import { Texto } from '../../../UI/Texto'
import { Button } from '../../../UI/Button'
import Colors from '../../../UI/Colors'
import { vh } from 'react-native-css-vh-vw'
import { CardView } from '../../../UI/CreditCard/type'
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
export function CompartidasConmigo({ navigation }) {
    const renderItem = ({ item }) => (
        <CardView

            // brand
            name="Luis Antonio Padre Garcia"
            number="**** **** **** 1547"
            expiry="12/22"
            imageFront={getTypeCreditCardImg('rosa')}
            imageBack={getTypeCreditCardImg('rosa')}
            // cvc
            // imageFront
            // imageBack
            scale={0.9} />
    );
    const BASE_SIZE = { width: 300, height: 190 };
    const containerSize = { ...BASE_SIZE, height: BASE_SIZE.height * 0.9 };
    return (
        <ScreenContainer scrollView backgroundColor={'transparent'} NoMyStatusBar>
            <Block style={{ backgroundColor: 'transparent', flex: 1, height: vh(82), display: 'flex' }}>
                <View style={{ flex: 1, display: 'flex' }}>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            legacyImplementation={false}
                            style={containerSize, [{ position: 'absolute',marginTop:12}]}
                        />
                    </View>
                    <View style={{flex: 1.35,alignItems:'center' }}>
                    <Texto colorLabel={Colors.midnightblue} size={12}>Santander</Texto>
                    <Texto colorLabel={Colors.midnightblue} size={14}>Mastercard Platinum <Texto colorLabel={Colors.Tertiary} size={14}>Default</Texto></Texto>
                    <Texto size={12} colorLabel={Colors.darkgray}>Disponible</Texto>
                    <Texto size={25} colorLabel={Colors.midnightblue}>$1.050.000</Texto>
                    <Texto size={12} colorLabel={Colors.midnightblue}>USD 14.380</Texto>
                    </View>

                </View>
                <View style={{ flex: 0, bottom: 10, paddingLeft: '20%', paddingRight: '20%' }}>
                    <Button onPress={() => { navigation.navigate('AddCard') }} styleButton={{ marginBottom: 12, borderRadius: 45 }} size={20} backgroundColor={'transparent'} color={Colors.Tertiary} label="Añadir tarjetas"></Button>
                    <Button styleButton={{ marginBottom: 12, borderRadius: 45 }} size={15} backgroundColor={Colors.Tertiary} label="Pagar"></Button>
                </View>
            </Block>
        </ScreenContainer>
    )
}