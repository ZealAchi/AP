/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '../../ScreenContainer'
import { View } from 'react-native'
import { Texto } from '../../../UI/Texto'

// import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input-fullpage";///CardView error

import Colors from '../../../UI/Colors';
import { Header } from '../../../UI/Header';
import { CreditCard } from '../../../UI/CreditCard';
import { Button } from '../../../UI/Button';
import { ItemBank, ItemBank2 } from '../../../UI/ItemBank';
import { dp } from '../../../UI/dist/Responsive.dev';


export function AddCard({ navigation }) {
    const _onChange = () => form => {
        console.log(form)
    };
    const [selectBank, setSelectBank] = useState()
    return (
        <ScreenContainer backgroundColor={'transparent'} margin scrollView>

            <Header Return />
            <View style={{ height: dp(0.2) }}>
                <Texto size={13} Bold>Agregar tarjeta</Texto>
                {/* <ItemBank onPress={() => { }} style={{ width: '95%', backgroundColor: 'transparent' }} data={{ img: require('../../../Assets/Santander.png'), nombre: 'Banco Santander' }} /> */}
                <View style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                <ItemBank2 noSaldo style={{ width: '95%', backgroundColor: 'transparent' }}  onlyname data={{ nombre: 'Santarder', img: require('../../../Assets/Santander.png') }} />
                </View>
            </View>
            <View style={{ height: dp(1.2) }}>
                <Texto size={12}>Introduce los datos de tu tarjeta</Texto>
                <View style={{ flex: 1, top: 12 }}>
                    <CreditCard write img={require('../../../Assets/Santander.png')} />
                 </View>
            </View>
            <View style={{ height: dp(0.2),paddingLeft:24,paddingRight:24 }}>
                <Button label="Agregar Tarjeta" styleButton={{borderRadius:18}}/>
            </View>
        </ScreenContainer>
    )
}
