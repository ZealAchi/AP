import React, { useRef, useState, useEffect } from 'react'
import { vh, vw } from 'react-native-css-vh-vw'

import { TextInput, View } from 'react-native'
import { Texto } from './Texto'
import Colors from './Colors'
export const InputCoordinates = ({setCoordenadas}) => {
    // console.log(setCoordenadas,'setCoordenadas')
    const textInput1 = useRef()
    const textInput2 = useRef()
    const textInput3 = useRef()

    const [input1, setInput1] = useState("")
    const [input2, setInput2] = useState("")
    const [input3, setInput3] = useState("")
    const [label1, setLabel1] = useState()
    const [label2, setLabel2] = useState()
    const [label3, setLabel3] = useState()


    useEffect(() => {
        let findLetra = Math.floor(Math.random() * (9 - 0)) + 0;//0=a,9=j
        let letra = String.fromCharCode(97 + findLetra)
        
        let Numero =Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        
        setLabel1(`${letra.toUpperCase()}${Numero}`)
    }, [])
    useEffect(() => {
        let findLetra = Math.floor(Math.random() * (9 - 0)) + 0;//0=a,9=j
        let letra = String.fromCharCode(97 + findLetra)
        
        let Numero =Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        
        setLabel2(`${letra.toUpperCase()}${Numero}`)
    }, [])
    useEffect(() => {
        let findLetra = Math.floor(Math.random() * (9 - 0)) + 0;//0=a,9=j
        let letra = String.fromCharCode(97 + findLetra)

        let Numero =Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        
        setLabel3(`${letra.toUpperCase()}${Numero}`)
    }, [])

    useEffect(()=>{
        console.log(input1,'input1')
        setCoordenadas(`${input1}${input2}${input3}`)
    },[input1,input2,input3])

    return (
        <View style={{ backgroundColor: 'white', height: vh(22), width: vw(80), borderRadius: 12, alignItems: 'center',display:'flex'}}>
            <Texto style={{ textAlign: 'center', }}>{"Ingresa tus coordenadas"}</Texto>
            <View style={{ flexDirection: 'row' , justifyContent:'space-evenly',flex:1,alignItems:"center"}}>
                <View style={{flex:1}}>
                    <Texto style={{ textAlign: 'center', }} colorLabel={Colors.darkgray}>{label1 && label1}</Texto>
                    <TextInput
                    secureTextEntry
                        ref={textInput1}
                        onChangeText={(e) => {
                            setInput1(e.replace(/\D/g, ''));
                            e && e.length === 2 && textInput2.current.focus();
                        }}
                        style={{
                            backgroundColor: "#f5f4f2",
                            fontWeight: "600", alignSelf: "center", padding: 10,
                            fontSize: 20, height: 45, borderRadius: 2,
                            borderWidth: 0.5, borderColor: "grey", justifyContent: 'center'
                        }}
                        value={input1}
                        maxLength={2}
                        returnKeyType="done"
                        keyboardType="numeric"
                    />
                </View>
                <View style={{flex:1}}>
                    <Texto style={{ textAlign: 'center' }} colorLabel={Colors.darkgray}>{label2 && label2}</Texto>
                    <TextInput
                    secureTextEntry
                        ref={textInput2}
                        onChangeText={(e) => {
                            setInput2(e.replace(/\D/g, ''));
                            e && e.length === 2 && textInput3.current.focus();
                        }}
                        style={{
                            backgroundColor: "#f5f4f2",
                            fontWeight: "600", alignSelf: "center", padding: 10,
                            fontSize: 20, height: 45, borderRadius: 2,
                            borderWidth: 0.5, borderColor: "grey"
                        }}
                        value={input2}
                        maxLength={2}
                        returnKeyType="done"
                        keyboardType="numeric"
                    />
                </View>
                <View style={{flex:1}}>
                    <Texto style={{ textAlign: 'center' }} colorLabel={Colors.darkgray}>{label3 && label3}</Texto>
                    <TextInput
                    secureTextEntry
                        ref={textInput3}
                        onChangeText={(e) => { setInput3(e.replace(/\D/g, '')) }}
                        style={{
                            backgroundColor: "#f5f4f2",
                            fontWeight: "600", alignSelf: "center", padding: 10,
                            fontSize: 20, height: 45, borderRadius: 2,
                            borderWidth: 0.5, borderColor: "grey"
                        }}
                        value={input3}
                        maxLength={2}
                        returnKeyType="done"
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </View>
    )
}