import React, { useState } from 'react'
import { View,ScrollView } from 'react-native'
import { Block } from '../../../UI/Block'
import Colors from '../../../UI/Colors'
import { ItemBank } from '../../../UI/ItemBank'
import { TextInput } from '../../../UI/Input'
import { Texto } from '../../../UI/Texto'
import { Button } from '../../../UI/Button'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { validate } from 'rut.js'
import { AlertMessage } from '../../Alert'
import { useAPI } from '../../../Hooks/useAPI'
import { ScreenContainer } from '../../ScreenContainer'
import { Header } from '../../../UI/Header'
import { dp } from '../../../UI/dist/Responsive.dev'


export function AddBank2({ route,navigation }) {
    const API = useAPI()
    const [disabled, setDisabled] = useState(false)
    const [rut_number, setRut_number] = useState()
    const [password, setPassword] = useState()
    const bank = 'Itau'
    const { params } = route
    const data = { nombre: params.name, img:params.imagen }
    const ConectarBanco = () => {
        const EsValido = validate(rut_number)
        if (!rut_number) { AlertMessage({ message: 'Debes Ingresar una RUT' }) } else {
            if(!password) AlertMessage({ message: 'Debes Ingresar una clave' })
            if(password>8){
                AlertMessage({ message: 'La clave tiene que ser más de 8 caracteres' })
            }
            if(password<12){
                AlertMessage({ message: 'La clave tiene que ser menos de 12 caracteres' })
            }
            // if (password<12&&password>8&&EsValido) {
            //     console.log(password<12,password<8)
            //     setDisabled(true)
            //     const bid = params.bid
            //     API.PostAPI.CreateANewUserAssociationwithAnyBank({ rut_number, password, bid }, (props) => {
            //         if (props === false) { setDisabled(false) } else navigation.navigate('App')
            //     })
            // } else {
            //     AlertMessage({ message: 'Ramas' })
            // }
        }
    }
    return (
        <ScreenContainer backgroundColor={Colors.Secondary} padding scrollView>
            <Header Return/>
            <ScrollView>
                
            <View style={{ paddingLeft: 12, paddingRight: 12,height:dp(1.58) }}>
            <View style={{}}><Texto size={12} colorLabel={Colors.midnightblue} Bold style={{marginBottom:30}}>Agregar banco</Texto>
                    <ItemBank type="ConectBank" nostyle data={data} />
                </View>
                <Texto size={12} colorLabel={Colors.Texto4} style={{marginTop:30}}>{`Introduce tus claves de acceso a ${params.name}`}</Texto>
                <View>
                    <TextInput placeholder="Ingresa tu RUT" value={rut_number} onChangeText={(e) => setRut_number(e)} />
                    <Texto size={12} colorLabel={Colors.Texto2}>Sin puntos ni guión</Texto>
                </View>
                <View style={{ marginTop: 38 }}>
                    <TextInput secureTextEntry placeholder="Ingresa tu clave internet" value={password} onChangeText={(e) => setPassword(e)} />
                    {/* <Texto size={12} colorLabel={Colors.Texto2}>De 8 a 10 caracteres alfanuméricos</Texto> */}
                </View>
                <View style={{ marginTop: 40, alignItems: 'center' }}>
                    <Button onPress={()=>{navigation.navigate('QueSonYPorQue')}} backgroundColor='white' styleButton={{ display: 'flex', width: 338, elevation: 12 }} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', justifyContent:'center',alignItems: 'center'}}>
                            <Ionicons name="lock-closed" style={{ marginRight: 12 }} color={Colors.Primary} size={23} />
                            <Texto colorLabel={Colors.Texto4} size={12}>¿Qué claves son y por qué te las pedimos?</Texto>
                            <Ionicons name="ios-arrow-forward" style={{ marginLeft: 12 }} color={Colors.Primary} size={23} />
                        </View>
                    </Button>

                </View>
            </View>
            </ScrollView>
            <View style={{height:dp(.1)}}>
            <Button disabled={disabled} onPress={() => ConectarBanco()} styleButton={{ position: 'absolute', bottom: 20, right: 50, left: 50, borderRadius: 18 }} label="CONECTAR BANCO" />
            </View>
        </ScreenContainer>
    )
}