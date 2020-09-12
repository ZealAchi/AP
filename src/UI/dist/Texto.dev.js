"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Texto = void 0;

var _reactNative = require("react-native");

var _native = _interopRequireDefault(require("styled-components/native"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\nfont-size:", ";\ntext-align:", ";\nfont-weight: 300;\nfont-family: ", ";\ncolor:", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Texto = (0, _native["default"])(_reactNative.Text)(_templateObject(), function (_ref) {
  var size = _ref.size;
  return size ? "".concat(size, "px") : "".concat(20, "px");
}, function (_ref2) {
  var textAlign = _ref2.textAlign;
  return textAlign ? textAlign : 'left';
}, function (props) {
  if (props.typeFamily) {
    return props.typeFamily;
  } else if (props.Bold) {
    return 'latoBold';
  } else {
    return 'latoRegular';
  }
}, function (_ref3) {
  var colorLabel = _ref3.colorLabel;
  return colorLabel ? colorLabel : '#000';
});
exports.Texto = Texto;