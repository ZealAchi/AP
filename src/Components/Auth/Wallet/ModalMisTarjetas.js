import React, { useState,useEffect} from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Pressable
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Colors from "../../../UI/Colors";
import { TextInput } from "../../../UI/Input";
import { Texto } from "../../../UI/Texto";
import * as RootNavigation from "../../../Navigations/RootNavigation"

const ModalMisTarjetas = ({ MisTarjetas = true, Compartido = true,openOptions=false,setOpenOptions,infoCard={} }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [compartir, setCompartir] = useState(false);
    
    // console.log(openOptions,'openOptions desde adentro')
    useEffect(()=>{
        setModalVisible(openOptions)
    },[openOptions])
    
    const ItemsMisTarjetas = [
        { label: "Transformar en tarjeta física" },
        { label: "Verificar" },
        { label: "Activar NFC", icon: () => { return <></> } },
        { label: "Compartir tarjeta/Dejar de compartir", onPress: () => { console.log("s "); setCompartir(true) } },
        { label: "Elegir como default", disable: true },
        { label: "Borrar", color: Colors.Primary },
    ]
    const ItemsCompartirTarjeta = [{
        children: () => {
            return <View style={{ width:'100%',marginTop:12 }}>
                <Texto size={12} colorLabel={Colors.dimgray} style={{textAlign:'center'}}>Pin Tarjeta</Texto>
                <TextInput value="1234" secureTextEntry maxLength={4} keyboardType={"decimal-pad"} styleText={{ borderTopColor: '#ddd', borderTopWidth: 1, textAlign:"center"}} label="Ingresa tu Pin"></TextInput>
            </View>
        }
    }, {
        children: () => {
            return <View style={{ width:'100%'}}>
                <Texto size={12} colorLabel={Colors.dimgray} style={{textAlign:'center'}}>Costo de uso</Texto>
                <TextInput value="$5.000/5%" styleText={{ borderTopColor: '#ddd', borderTopWidth: 1,  textAlign:"center"}} label="Ingresa tu Pin"></TextInput>
            </View>
        }
    }, {
        children: () => {
            return <View style={{ width:'100%', }}>
                <Texto size={12} colorLabel={Colors.dimgray} style={{textAlign:'center'}}>Privacidad</Texto>
                <TextInput value="Público" styleText={{borderTopColor: '#ddd', borderTopWidth: 1,  textAlign:"center"}} label="Ingresa tu Pin"></TextInput>
            </View>
        }
    }, {
        children: () => {
            return (<Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? 'rgb(210, 230, 255)'
                            : 'white',
                        borderRadius: 12,
                        marginTop: 7, marginBottom: 5,
                        //  paddingLeft: 12, paddingRight: 12,
                          borderTopWidth: 1,
                        borderTopColor: Colors.lavender
                    },
                    styles.wrapperCustom
                ]}
                onPress={()=>{
                    RootNavigation.navigationRef.current.goBack()
                    RootNavigation.navigationRef.current.goBack()
                    RootNavigation.navigate('Compartir Tarjeta')
                    // console.log(RootNavigation.navigationRef.current.reset,'RootNavigation')
                }}
            >
                <Texto size={12} Bold colorLabel={Colors.Primary} style={styles.modalText}>{"Compartir"}</Texto>
            </Pressable>)
        }
    }]
    return (
        <View style={{}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setOpenOptions(false)
                    // setModalVisible(false)
                    // Alert.alert("Modal has been closed.");
                }}
            >
                <View style={[styles.centeredView, {
                    felx: 1, borderRadius: 0, position: 'absolute',
                    width: '100%',
                    height: '100%', backgroundColor: 'rgba(0,0,0,0.6)',
                }]}>
                    <View style={[styles.modalView, { borderRadius: 12 }]}>
                        <View style={{  borderTopLeftRadius:12,borderTopRightRadius:12,paddingTop: 4, paddingBottom: 4 }}>
                            <Text style={[{ color: 'white', textAlign: 'center' }]}>{infoCard?.TipoTarjeta} {`۰${infoCard?.DatosCard?.number}`}</Text>
                            <Text style={[{ color: 'white', textAlign: 'center' }]}>{infoCard?.bank}</Text>
                        </View>
                        {!compartir && MisTarjetas && <View style={{ backgroundColor: 'white', borderBottomRightRadius: 12, borderBottomLeftRadius: 12 }}>
                            {ItemsMisTarjetas.map((item, i) => {
                                return (
                                    <Pressable disabled={item.disable} onPress={item?.onPress}
                                        style={({ pressed }) => [
                                            {
                                                borderRadius: 12,
                                                marginTop: 7, marginBottom: i === 5 ? 5 : 5, paddingLeft: 12, paddingRight: 12, borderBottomWidth: i === 5 ? 0 : 1,
                                                borderBottomColor: Colors.lavender
                                            },
                                            styles.wrapperCustom
                                        ]}
                                    >
                                        <Texto size={12} Bold colorLabel={item.disable ? "#ddd" : item.color && item.color} style={styles.modalText}>{item.label}</Texto>
                                    </Pressable>)
                            })}
                            {/* <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableHighlight> */}
                        </View>}
                        {compartir && MisTarjetas &&<View style={{backgroundColor:"white",width:266.74,borderRadius: 12,}}>
                        {ItemsCompartirTarjeta.map((item, i) => {
                                return (<item.children />
                                )
                            })}
                        </View>}
                        
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        // position: 'absolute',
        zIndex: 12,
        ...StyleSheet.absoluteFillObject
    },
    modalView: {
        // margin: 20,

        backgroundColor: Colors.Primary,
        borderRadius: 20,
        // padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 7,
        marginTop: 7,
        textAlign: "center"
    }
});


export default ModalMisTarjetas
