import React, { Component, useContext } from "react";
import PropTypes from "prop-types";
import {
  View,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";

import defaultIcons from "./../Icons";
import FlipCard from "react-native-flip-card";
import { CreditCardContext } from "./CreditCardContext";

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
  baseText: {
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
    top: 100,

    left: 28,
  },
  name: {
    fontSize: 16,
    position: "absolute",
    bottom: 15,
    left: 25,
    right: 100,
  },
  expiryLabel: {
    fontSize: 9,
    position: "absolute",
    bottom: 40,
    left: 218,
  },
  expiryLabel2: {
    fontSize: 9,
    position: "absolute",
    bottom: 54,
    left: 25,
  },
  expiry: {
    fontSize: 16,
    position: "absolute",
    bottom: 35,
    left: 25,
  },
  expiry2: {
    fontSize: 16,
    position: "absolute",
    bottom: 15,
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

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class CardView extends Component {
  static propTypes = {
    focused: PropTypes.string,
    imgBank: PropTypes.number,
    brand: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
    expiry: PropTypes.string,
    cvc: PropTypes.string,
    placeholder: PropTypes.object,
    write: PropTypes.any,

    scale: PropTypes.number,
    fontFamily: PropTypes.string,
    imageFront: PropTypes.number,
    imageBack: PropTypes.number,
    customIcons: PropTypes.object,
  };

  static defaultProps = {
    name: "",
    placeholder: {
      number: "•••• •••• •••• ••••",
      name: "Nombre del titular de la tarjeta",
      expiry: "••/••",
      cvc: "•••",
    },
    write: undefined,
    scale: 1,
    fontFamily: Platform.select({ ios: "Courier", android: "monospace" }),
    imageFront: require("../images/card-front.png"),
    imageBack: require("../images/card-back.png"),
  };
  static contextType = CreditCardContext
  render() {

    // const asx=useContext(CreditCardContext)
    const { focused,
      brand, name, number, expiry, cvc, customIcons, imgBank,
      placeholder, imageFront, imageBack, scale, fontFamily, write } = this.props;

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
    // console.log(write, 'write')

    return (

      <View style={[s.cardContainer, containerSize]}>
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
            <Text onPress={() => { write && this.context.setOnFocus('number') }} style={[s.baseText, { fontFamily }, s.number, !number && s.placeholder, focused === "number" && s.focused]}>
              {!number ? placeholder.number : number}
            </Text>
            {/*  */}
            <Text style={[s.baseText, { fontFamily }, s.expiryLabel2, s.placeholder, focused === "expiry" && s.focused]}>
              VALID THRU
              </Text>
            <Text onPress={() => { write && this.context.setOnFocus('expiry') }} style={[s.baseText, { fontFamily }, s.expiry, !expiry && s.placeholder, focused === "expiry" && s.focused]}>
              {!expiry ? placeholder.expiry : expiry}
            </Text>
            {/*  */}
            <Text onPress={() => { write && this.context.setOnFocus('name') }} style={[s.baseText, { fontFamily }, s.name, !name && s.placeholder, focused === "name" && s.focused]}
              numberOfLines={1}>
              {!name ? placeholder.name : name.toUpperCase()}
            </Text>
            {/* <Text style={[s.baseText, { fontFamily }, s.expiryLabel, s.placeholder, focused === "expiry" && s.focused]}>
              Vence hasta
              </Text>
            <Text onPress={() => { write && this.context.setOnFocus('expiry') }} style={[s.baseText, { fontFamily }, s.expiry, !expiry && s.placeholder, focused === "expiry" && s.focused]}>
              {!expiry ? placeholder.expiry : expiry}
            </Text> */}
            {isAmex &&
              <Text onPress={() => { write && this.context.setOnFocus('cvc') }} style={[s.baseText, { fontFamily }, s.amexCVC, !cvc && s.placeholder, focused === "cvc" && s.focused]}>
                {!cvc ? placeholder.cvc : cvc}
              </Text>}
          </ImageBackground>
          <ImageBackground style={[BASE_SIZE, s.cardFace, transform]}
            source={imageBack}
          >
            <View style={{ width: '100%', height: 35, backgroundColor: '#000', position: 'absolute', top: 20 }} />
            <Text onPress={() => { write && this.context.setOnFocus('cvc') }} style={[s.baseText, s.cvc, !cvc && s.placeholder, focused === "cvc" && s.focused]}>
              {!cvc ? placeholder.cvc : cvc}
            </Text>
          </ImageBackground>
        </FlipCard>
      </View>
    );
  }
}
