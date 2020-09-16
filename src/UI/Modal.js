import React, { useState } from "react";
import { useEffect } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import { formatNumber } from "../Util/dist/formatNumber.dev";
import Colors from "./Colors";
import { dp } from "./dist/Responsive.dev";
import { TextInput } from "./Input";

const ModalX = ({ children, otherAmount, setOtherAmount, amount }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [monto, setMonto] = useState()

    // console.log(otherAmount, setOtherAmount, amount, 'otherAmount,setOtherAmount')
    useEffect(() => {
        setMonto(amount)
    }, [amount])
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    //   Alert.alert("Modal has been closed.");
                    setModalVisible(false)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>¿Cuánta plata deseas transferir?</Text>

                        <View style={{ width: dp(0.7), height: 85, flex: 1 }}>
                            <View style={{ borderBottomColor: Colors.lavender, borderBottomWidth: 1, alignItems: 'baseline' }}>
                                <TextInput placeholderTextColor="white" left sizeIcon={35}
                                    icon={{ type: 'Foundation', name: 'dollar', color: '#000' }}
                                    keyboardType="numeric"
                                    maxLength={13}
                                    styleText={[monto ? { fontSize: 30, right: 12, fontWeight: '700' } : { right: 8, fontSize: dp(0.06) },
                                    { textAlign: 'center', color: '#000', }]} style={{ backgroundColor: 'transparent' }}
                                    value={formatNumber.new(`${monto}`.replace(/\D/g, ''))} onChangeText={(e) => setMonto(
                                        formatNumber.new(e.replace(/\D/g, '')))
                                    } placeholder="Ingresa el monto" />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row-reverse", justifyContent: 'space-between', width: dp(0.7), height: 45 }}>
                            <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#2196F3", flex: 1 }} onPress={() => { console.log(monto,'monto');setOtherAmount(monto); setModalVisible(!modalVisible); }}>
                                <Text style={styles.textStyle}>Guardar</Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "white", flex: 1 }} onPress={() => { setModalVisible(!modalVisible); }}>
                                <Text style={[styles.textStyle, { color: '#000' }]}>Cancelar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableHighlight
                // style={styles.openButton}
                onPress={() => {
                    setModalVisible(true);
                }}
            >{children ? children : <></>}
                {/* <Text style={styles.textStyle}>Show Modal</Text> */}
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        height: 250,
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
        borderRadius: 12,
        paddingLeft: 18,
        paddingRight: 18,
        margin: 5,
        justifyContent: 'center',
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default ModalX;