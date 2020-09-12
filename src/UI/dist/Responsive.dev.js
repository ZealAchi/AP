"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dp = exports.hp = exports.wp = void 0;

var _reactNative = require("react-native");

var _Dimensions$get = _reactNative.Dimensions.get("window"),
    height = _Dimensions$get.height,
    width = _Dimensions$get.width;

var diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

var wp = function wp(percent) {
  return width * percent / 2;
};

exports.wp = wp;

var hp = function hp(percent) {
  return height * percent / 2;
};

exports.hp = hp;

var dp = function dp(percent) {
  return diagonal * percent / 2;
};

exports.dp = dp;