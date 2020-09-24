import React, { useContext, useState, useEffect } from 'react'
import { View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Block } from '../../UI/Block'
import { Texto } from '../../UI/Texto'
import Colors from '../../UI/Colors'
import { TextInput } from '../../UI/Input'
import { Button } from '../../UI/Button'
import { DataContext } from '../../Context/Datos.Context'
// const { validate, clean, format } = require('rut.js')
// import { validate } from 'rut.js'
import { AlertMessage } from '../../Components/Alert'
import { useAPI } from '../../Hooks/useAPI'
import { ScreenContainer } from '../../Components/ScreenContainer'
import { Header } from '../../UI/Header'
export function IngresaTusDocumentos({ navigation }) {
    const API = useAPI()
    const { state, setState } = useContext(DataContext)
    const [disabled, setDisabled] = useState(false)
    const [rut_number, setRut_number] = useState()
    const [rut_serial, setRut_serial] = useState()
    const HandleSubmit = () => {
        if (!rut_serial) {
            AlertMessage({message:"Ingresa tu N° documento"})
        }
        if (!rut_number) {
            AlertMessage({message:"Ingresa tu Rut"})
        } else {
            // const EsValido = validate(rut_number)
            // if (EsValido) {
                if (rut_number, rut_serial) {
                    var re = /\./g;
                    // var re2 = /\-/g;
                    var rutx=formateaRut(state.NewUser[0].rut_number).replace(re,'')
                    const NewArray=state.NewUser
                    NewArray[0].rut_number=rutx
                    setDisabled(true)
                    API.PostAPI.newUser({ ...NewArray }, (props) => {
                        if (props === false) { setDisabled(false) } else navigation.navigate('EnterYourPin')
                    })
                }
            // } else {
                // AlertMessage({ message: 'Ingresa un rut valido' })
            // }
        }
        
    }

    useEffect(() => {
        if (rut_number === '') {
            setRut_number(undefined)
        } else {
            setState({ ...state, NewUser: [{ ...state.NewUser[0], rut_number }] })
        }
    }, [rut_number])

    useEffect(() => {
        if (rut_serial === '') {
            setRut_serial(undefined)
        } else {
            setState({ ...state, NewUser: [{ ...state.NewUser[0], rut_serial }] })
        }

    }, [rut_serial])

    return (<ScreenContainer backgroundColor={'transparent'} barBackgroundColor={'transparent'} padding>
        <Block >
        <Header Return/>
            <Texto size={13} Bold color="#000">Ingresa tus datos de documento</Texto>
            <View style={{ alignItems: 'center', marginBottom: 12, marginTop: 12 }}>
                <FontAwesome5 size={80} color={Colors.Primary} name="id-card-alt" />
            </View>
            <View>
                <Texto size={12}>RUT</Texto>
                <TextInput keyboardType="visible-password" borderBottomWidth backgroundColor={'transparent'} value={formateaRut(rut_number)} onChangeText={(e) =>{ 
                    setRut_number(e)
                    }} placeholder="Ingresa tu RUT"/>
            </View>
            <View>
                <Texto size={12}>N° documento</Texto>
                <TextInput borderBottomWidth maxLength={10} backgroundColor={'transparent'} value={rut_serial} onChangeText={(e) => setRut_serial(e)} placeholder="Ingresa tu N° documento" />
            </View>
            <Button size={14} backgroundColor={'transparent'} styleButton={{ borderRadius: 18,marginTop:20 }} color={Colors.Primary} label="¿Dónde veo mi n° de documento?" />
            <Button  disabled={disabled} onPress={() => HandleSubmit()} styleButton={{ position: 'absolute', bottom: 20, right: 50, left: 50, borderRadius: 18 }} label="CREAR CUENTA" />
            </Block>
        </ScreenContainer>)
}

export function formateaRut(rut) {

    try {
        
    var actual = rut.replace(/^0+/, "");
    if (actual != '' && actual.length > 1) {
        var sinPuntos = actual.replace(/\./g, "");
        var actualLimpio = sinPuntos.replace(/-/g, "");
        var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
        var rutPuntos = "";
        var i = 0;
        var j = 1;
        for (i = inicio.length - 1; i >= 0; i--) {
            var letra = inicio.charAt(i);
            rutPuntos = letra + rutPuntos;
            if (j % 3 == 0 && j <= inicio.length - 1) {
                rutPuntos = "." + rutPuntos;
            }
            j++;
        }
        var dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = rutPuntos + "-" + dv;
    }
    return rutPuntos;
    } catch (error) {
        return ''
    }
}