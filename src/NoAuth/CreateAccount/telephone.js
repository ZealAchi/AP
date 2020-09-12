import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import PhoneInput from "react-native-phone-input";
import { Texto } from "../../UI/Texto";
import { TextInput } from "../../UI/Input";

class Telephone extends Component {
    constructor(props) {
        super(props);

        this.state = {
          valid: "",
          type: "",
          value: ""
        };
        this.updatenumber=this.updatenumber.bind(this)
        this.updateInfo = this.updateInfo.bind(this);
        this.renderInfo = this.renderInfo.bind(this);
    }
    updatenumber(e){
        this.setState({
            ...this.state,
            value:e
        })
        
    }

    updateInfo() {
        this.props.setState({
            ...this.props.state,
            valid: this.phone.isValidNumber(),
            type: this.phone.getNumberType(),
            value: this.phone.getValue()
        });
    }
    renderInfo() {
        // if (this.props.value) {
        return (
            <View style={styles.info}>
                <Text>
                    Is Valid:{" "}
                    <Text style={{ fontWeight: "bold" }}>
                        {/* {this.props.valid.toString()} */}
                        {JSON.stringify(this.props)}
                    </Text>
                </Text>
                <Text>
                    Type: <Text style={{ fontWeight: "bold" }}>{this.props.type}</Text>
                </Text>
                <Text>
                    Value:{" "}
                    <Text style={{ fontWeight: "bold" }}>{this.props.value}</Text>
                </Text>
            </View>
        );
        // }
    }

    render() {
        return (
            <View style={styles.container}>
                <PhoneInput
                    ref={ref => {
                        this.phone = ref;
                    }}
                    onChangePhoneNumber={(e)=>{this.updatenumber(e);this.updateInfo()}}
                    initialCountry="cl"
                    cancelText="Cancelar"
                    confirmText="Confirmar"
                    style={{
                        height: 35,
                        zIndex:2,
                        top:3
                    }}
                />
                <TextInput style={{ zIndex:1,width: '100%', height: 35, bottom: 15,}} autoCapitalize="none" borderBottomWidth backgroundColor={'transparent'} styleText={{marginLeft:34,marginTop:2}} placeholder={this.state.value===''?'Ingresa tu Telefono':''} />
                </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        // padding: 20,
        paddingTop: 12
    },
    info: {
        // width: 200,
        borderRadius: 5,
        backgroundColor: "#f0f0f0",
        padding: 10,
        marginTop: 20
    },
    button: {
        marginTop: 20,
        padding: 10
    }
});
export default Telephone;