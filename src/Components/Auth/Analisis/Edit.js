import React from "react"
import {View} from "react-native"
import { Button } from "../../../UI/Button"
import Colors from "../../../UI/Colors"
import { Header } from "../../../UI/Header"
import { TextInput } from "../../../UI/Input"
import { Texto } from "../../../UI/Texto"

export function MovimientoEditar(props){
    const { item } = props.route.params
    console.log(item,'item')
    return(<View style={{flex:1,paddingLeft:12,paddingRight:12}}>
        <Header Return/>
        <Texto size={13}>Editar movimiento</Texto>
        <View style={{marginBottom:10,marginTop:18}}>
            <Texto size={12} colorLabel={Colors.dimgray} style={{borderBottomWidth:1,borderBottomColor:Colors.lavender}}>Nombre del movimiento</Texto>
            <TextInput styleText={{fontFamily:"latoBold",fontWeight: "300",height:40}} backgroundColor={'transparent'} placeholder="Jumno" value={item.nombre} onChangeText={(e) => { /*setState({ ...state, first_name: e }) */}}/>
        </View>
        <View style={{marginBottom:10}}>
            <Texto size={12} colorLabel={Colors.dimgray} style={{borderBottomWidth:1,borderBottomColor:Colors.lavender}}>Fecha del movimiento</Texto>
            <TextInput styleText={{fontFamily:"latoBold",fontWeight: "300",height:40}} backgroundColor={'transparent'} placeholder="Jue, 27 jun 2019" value={`${item.otherData.dia.substr(0,3)}, ${item.otherData.d} ${item.otherData.m.substr(0,3)} ${item.otherData.a}`} onChangeText={(e) => { /*setState({ ...state, first_name: e }) */}}/>
        </View>
        <View style={{marginBottom:10}}>
            <Texto size={12} colorLabel={Colors.dimgray} style={{borderBottomWidth:1,borderBottomColor:Colors.lavender}}>Categoría</Texto>
            <TextInput styleText={{fontFamily:"latoBold",fontWeight: "300",height:40}} backgroundColor={'transparent'} placeholder="Supermercado" value={item.categoria} onChangeText={(e) => { /*setState({ ...state, first_name: e }) */}}/>
        </View>
        <View style={{marginBottom:10}}>
            <Texto size={12} colorLabel={Colors.dimgray} style={{borderBottomWidth:1,borderBottomColor:Colors.lavender}}>Ubicación</Texto>
            <TextInput styleText={{fontFamily:"latoBold",fontWeight: "300",height:40}} backgroundColor={'transparent'} placeholder="Santiago" value={item.lugar} onChangeText={(e) => { /*setState({ ...state, first_name: e }) */}}/>
        </View>
        <Button onPress={() =>{}} styleButton={{ position: 'absolute', bottom: 20, right: 50, left: 50, borderRadius: 18 }} label="GUARDAR" />
    </View>)
}