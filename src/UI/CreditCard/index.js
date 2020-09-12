/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useState,useRef } from 'react'

import { View } from 'react-native'
import { CreditCardInput } from './type';
import { getTypeCreditCardImg } from '../../Util/BackgroundCard';
import  CreditCardContext  from './others/CreditCardContext';

export function CreditCard({ img,type, colorCard = 'rojo', index = 2, page = 0 }) {
    // const _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
    // const data = {
    //     cardNumber: '1234 5567 9808 4151',
    //     typeCard: 'Visa',
    //     expiry: '01/24',
    //     bank: 'AB Bank',
    //     name: 'Luis Antonio Padre Garcia'
    // };

    // const [state, setState] = useState({
    //     cardNumber: '',
    //     expirationDate: '',
    //     cvv: '',
    //     CardholdersName: ''
    // })
    const CreditCardRef = useRef(null);

    return (<View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
            <CreditCardContext>
            <CreditCardInput
                ref={CreditCardRef}
                cardImageFront={getTypeCreditCardImg(colorCard)}
                cardImageBack={getTypeCreditCardImg(colorCard)}
                imgBank={img}
                autoFocus
                requiresName
                requiresCVC
                cardScale={1}
                allowScroll={true}
                invalidColor={"red"}
                placeholders={{ number: "1234 5678 123 5678", name: "NOMBRE COMPLETO", expiry: "MM/AA", cvc: 'CVC', iold: 'asd', placeholder: { name: "Arca" } }}
                labels={{ number: 'Número de Tarjeta', expiry: 'Expira', name: 'Nombre del titular de la tarjeta', cvc: 'cvc/ccv' }}
                inputContainerStyle={{ justifyContent: 'center', alignContent: 'center' }}
                validColor="black"
                write
                labelStyle={{ color: 'black', fontSize: 10, }}
                inputStyle={{ color: 'black', fontSize: 14 }}
                
            />
            </CreditCardContext>
        </View>
    </View>)
}