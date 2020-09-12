import React from "react";
import PropTypes from "prop-types";
import ReactNative, {
    NativeModules,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    ViewPropTypes,
    KeyboardAvoidingView,
} from "react-native";

import CreditCard from "./CrediCard";
import { getTypeCreditCardImg } from "../../Util/BackgroundCard";
import { dp } from "../dist/Responsive.dev";
import { TextInput } from "../Input";
// import CCInput from "./CCInput";
// import { InjectedProps } from "./connectToState";

const s = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        backgroundColor: 'red'
    },
    form: {
        marginTop: 20,
        flex: 1
    },
    inputContainer: {
        marginRight: 40,
    },
    inputLabel: {
        fontWeight: "bold",
    },
    input: {
        height: 40,
    },
});

const CVC_INPUT_WIDTH = 70;
const EXPIRY_INPUT_WIDTH = CVC_INPUT_WIDTH;
const CARD_NUMBER_INPUT_WIDTH_OFFSET = 40;
const CARD_NUMBER_INPUT_WIDTH = Dimensions.get("window").width - EXPIRY_INPUT_WIDTH - CARD_NUMBER_INPUT_WIDTH_OFFSET;
const NAME_INPUT_WIDTH = CARD_NUMBER_INPUT_WIDTH;
const PREVIOUS_FIELD_OFFSET = 40;
const POSTAL_CODE_INPUT_WIDTH = 120;

export default function CreditCardInput(props) {
    const {
        cardViewSize = {},
        focused,
        type,
        cardScale,
        imgBank,
        cardFontFamily,
        cardImageFront = getTypeCreditCardImg('red'),
        cardImageBack = getTypeCreditCardImg('red'),
        cardBrandIcons,
        requiresName,
        number,
        expiry,
        cvc,
        labels = {
            name: "CARDHOLDER'S NAME",
            number: "CARD NUMBER",
            expiry: "EXPIRY",
            cvc: "CVC/CCV",
            postalCode: "POSTAL CODE",
        },
        placeholders = {
            name: "Full Name",
            number: "1234 5678 1234 5678",
            expiry: "MM/YY",
            cvc: "CVC",
            postalCode: "34567",
        },
        inputContainerStyle = {
            borderBottomWidth: 1,
            borderBottomColor: "black",
        },
        validColor = "",
        invalidColor = "red",
        placeholderColor = "gray",
        allowScroll = false,
        additionalInputsProps = {},
    } = props


    const _focus = field => {
        if (!field) return;
        const scrollResponder = refs.Form.getScrollResponder();
        const nodeHandle = ReactNative.findNodeHandle(refs[field]);

        NativeModules.UIManager.measureLayoutRelativeToParent(nodeHandle,
            e => { throw e; },
            x => {
                scrollResponder.scrollTo({ x: Math.max(x - PREVIOUS_FIELD_OFFSET, 0), animated: true });
                refs[field].focus();
            });
    }

    const _inputProps = field => {
        const {
            inputStyle, labelStyle, validColor, invalidColor, placeholderColor,
            placeholders, labels, values, status,
            onFocus, onChange, onBecomeEmpty, onBecomeValid,
            additionalInputsProps,

        } = props;

        return {
            inputStyle: [s.input, inputStyle],
            labelStyle: [s.inputLabel, labelStyle],
            validColor, invalidColor, placeholderColor,
            ref: field, field,

            label: labels[field],
            placeholder: placeholders[field],
            value: values[field],
            status: status[field],

            onFocus, onChange, onBecomeEmpty, onBecomeValid,

            additionalInputProps: additionalInputsProps[field],
        };
    };

    return (
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={32}>
            <View style={{ height: 210 }}>
                <CreditCard focused={focused}
                    brand={type}
                    scale={cardScale}
                    imgBank={imgBank}
                    fontFamily={cardFontFamily}
                    imageFront={cardImageFront}
                    imageBack={cardImageBack}
                    customIcons={cardBrandIcons}
                    name={requiresName ? name : " "}
                    number={number}
                    expiry={expiry}
                    cvc={cvc} />
            </View>
            <View style={{ backgroundColor: 'red', height: 120, width: dp(100) }}>
                <TextInput  placeholder={placeholders.number} keyboardType="numeric" focus/>
                {/* <CCInput {...this._inputProps("number")}
                    keyboardType="numeric"
                    containerStyle={[s.inputContainer, inputContainerStyle, { width: CARD_NUMBER_INPUT_WIDTH }]} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                        <CCInput {...this._inputProps("expiry")}
                            keyboardType="numeric"
                            containerStyle={[s.inputContainer, inputContainerStyle, { width: EXPIRY_INPUT_WIDTH }]} />
                    </View>
                    <View style={{ flex: 1 }}>
                        {requiresCVC &&
                            <CCInput {...this._inputProps("cvc")}
                                keyboardType="numeric"
                                containerStyle={[s.inputContainer, inputContainerStyle, { width: CVC_INPUT_WIDTH }]} />}
                    </View>
                </View>
                {requiresName &&
                    <CCInput {...this._inputProps("name")}
                        containerStyle={[s.inputContainer, inputContainerStyle, { width: NAME_INPUT_WIDTH }]} />}
                {requiresPostalCode &&
                    <CCInput {...this._inputProps("postalCode")}
                        keyboardType="numeric"
                        containerStyle={[s.inputContainer, inputContainerStyle, { width: POSTAL_CODE_INPUT_WIDTH }]} />} */}
            </View>
        </KeyboardAvoidingView>
    );
}