"use strict";

var _reactNative = require("react-native");

var _App = _interopRequireDefault(require("./src/App"));

var _app = require("./app.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_reactNative.AppRegistry.registerComponent(_app.name, function () {
  return _App["default"];
});