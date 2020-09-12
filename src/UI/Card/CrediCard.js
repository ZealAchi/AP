import React, { useRef, useState } from 'react'
import { View, KeyboardAvoidingView, StyleSheet, ImageBackground } from 'react-native'
import FlipCard from "react-native-flip-card";
import { Title } from 'react-native-paper';
import defaultIcons from "./../CreditCard/Icons";
import { Image } from 'react-native-svg';


const BASE_SIZE = { width: 300, height: 190 };

const s = StyleSheet.create({
    cardContainer: {},
    cardFace: {},
    iconBank: {
        position: "absolute",
        top: 15,
        left: 15,
        width: 60,
        height: 40,
        resizeMode: "contain",
    },
    icon: {
        position: "absolute",
        top: 15,
        right: 15,
        width: 60,
        height: 40,
        resizeMode: "contain",
    },
    baseTitle: {
        color: "rgba(255, 255, 255, 0.8)",
        backgroundColor: "transparent",
    },
    placeholder: {
        color: "rgba(255, 255, 255, 0.5)",
    },
    focused: {
        fontWeight: "bold",
        color: "rgba(255, 255, 255, 1)",
    },
    number: {
        fontSize: 21,
        position: "absolute",
        top: 95,
        left: 28,
    },
    name: {
        fontSize: 16,
        position: "absolute",
        bottom: 20,
        left: 25,
        right: 100,
    },
    expiryLabel: {
        fontSize: 9,
        position: "absolute",
        bottom: 40,
        left: 218,
    },
    expiry: {
        fontSize: 16,
        position: "absolute",
        bottom: 20,
        left: 220,
    },
    amexCVC: {
        fontSize: 16,
        position: "absolute",
        top: 73,
        right: 30,
    },
    cvc: {
        fontSize: 16,
        position: "absolute",
        top: 80,
        right: 30,
    },
});

export default function CrediCard(props) {
    const { focused,
        brand, name = "", number, expiry, cvc, customIcons, imgBank,
        placeholder = {
            number: "•••• •••• •••• ••••",
            name: "NOMBRE COMPLETO",
            expiry: "••/••",
            cvc: "•••",
        }, imageFront = require("../CreditCard/images/card-front.png"),
        imageBack = require("../CreditCard/images/card-back.png"), scale = 1, fontFamily = Platform.select({ ios: "Courier", android: "monospace" }),
    } = props;

    const Icons = { ...defaultIcons, ...customIcons };
    const isAmex = brand === "american-express";
    const shouldFlip = !isAmex && focused === "cvc";

    const containerSize = { ...BASE_SIZE, height: BASE_SIZE.height * scale };
    const transform = {
        transform: [
            { scale },
            { translateY: ((BASE_SIZE.height * (scale - 1) / 2)) },
        ]
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={s.container}>
            <View>
                <FlipCard style={{ borderWidth: 0 }}
                    flipHorizontal
                    flipVertical={false}
                    friction={10}
                    perspective={2000}
                    clickable={false}
                    flip={shouldFlip}>
                    <ImageBackground style={[BASE_SIZE, s.cardFace, transform]}
                        source={imageFront}>
                        <Image style={[s.iconBank]}
                            source={imgBank} />

                        <Image style={[s.icon]}
                            source={Icons[brand]} />
                        <Title style={[s.baseTitle, { fontFamily }, s.number, !number && s.placeholder, focused === "number" && s.focused]}>
                            {!number ? placeholder.number : number}
                        </Title>
                        <Title style={[s.baseTitle, { fontFamily }, s.name, !name && s.placeholder, focused === "name" && s.focused]}
                            numberOfLines={1}>
                            {!name ? placeholder.name : name.toUpperCase()}
                        </Title>
                        <Title style={[s.baseTitle, { fontFamily }, s.expiryLabel, s.placeholder, focused === "expiry" && s.focused]}>
                            Vence hasta</Title>
                        <Title style={[s.baseTitle, { fontFamily }, s.expiry, !expiry && s.placeholder, focused === "expiry" && s.focused]}>
                            {!expiry ? placeholder.expiry : expiry}
                        </Title>
                        {isAmex &&
                            <Title style={[s.baseTitle, { fontFamily }, s.amexCVC, !cvc && s.placeholder, focused === "cvc" && s.focused]}>
                                {!cvc ? placeholder.cvc : cvc}
                            </Title>}
                    </ImageBackground>
                    <ImageBackground style={[BASE_SIZE, s.cardFace, transform]}
                        source={imageBack}>
                        <View style={{ width: '100%', height: 35, backgroundColor: '#000', position: 'absolute', top: 20 }} />
                        <View style={{ width: '75%', height: 35, backgroundColor: '#fff', position: 'absolute', top: 75, left: '2%' }} />
                        <Title style={[s.baseTitle, s.cvc, !cvc && s.placeholder, focused === "cvc" && s.focused]}>
                            {!cvc ? placeholder.cvc : cvc}
                        </Title>
                    </ImageBackground>
                </FlipCard>

            </View>
        </KeyboardAvoidingView>
    )
}