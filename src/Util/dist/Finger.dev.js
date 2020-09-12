"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Huellero = Huellero;

var _react = _interopRequireWildcard(require("react"));

var _Alert = require("../Components/Alert");

var _MaterialCommunityIcons = _interopRequireDefault(require("react-native-vector-icons/MaterialCommunityIcons"));

var RootNavigation = _interopRequireWildcard(require("../Navigations/RootNavigation"));

var _reactNative = require("react-native");

var _reactNativeCssVhVw = require("react-native-css-vh-vw");

var _reactNativeModalize = require("react-native-modalize");

var _Texto = require("../UI/Texto");

var _Modal = require("../Context/Modal.Context");

var _Block = require("../UI/Block");

var _Button = require("../UI/Button");

var _Colors = _interopRequireDefault(require("../UI/Colors"));

var _reactNativeFingerprintScanner = _interopRequireDefault(require("react-native-fingerprint-scanner"));

var _FingerprintPopup = require("../Components/Biometric/FingerprintPopup");

var _useLocalStorage = require("../Hooks/useLocalStorage");

var _useAPI = require("../Hooks/useAPI");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Huellero(props) {
  var localStorage = (0, _useLocalStorage.useLocalStorage)();
  var API = (0, _useAPI.useAPI)();
  var type = props.type,
      returnValue = props.returnValue,
      noSave = props.noSave;

  var _useState = (0, _react.useState)({
    popupShowed: false,
    errorMessage: undefined,
    biometric: undefined
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  (0, _react.useEffect)(function () {
    _reactNativeFingerprintScanner["default"].isSensorAvailable().then(function (biometryType) {})["catch"](function (error) {
      returnValue();
      setError(error);
    });
  }, []);

  function requiresLegacyAuthentication() {
    return _reactNative.Platform.Version < 23;
  }

  (0, _react.useEffect)(function () {
    if ('activar' === type || 'login' === type || 'transfer' === type) {
      if (requiresLegacyAuthentication()) {
        authLegacy();
      } else {
        authCurrent();
      }

      return function () {
        _reactNativeFingerprintScanner["default"].release();
      };
    }
  }, []);

  function authCurrent() {
    console.log(type, 'type');

    _reactNativeFingerprintScanner["default"].authenticate({
      description: 'activar' === type ? 'Puedes usar tu huella para entrar a AllPay y confirmar movimientos de dinero.' : 'transfer' === type ? 'Ingresa tu huella para confirmar la transferencia.' : 'Toque el sensor',
      cancelButton: 'activar' === type ? 'NO POR AHORA' : 'USAR CONTRASEÑA',
      title: 'AllPay'
    }).then(function () {
      if (type === 'transfer') {
        props.nextAction();
      } else if (type === 'login') {
        API.PostAPI.login({}, function (valido) {
          if (valido) RootNavigation.navigate('App');
        }, true);
      } else {
        returnValue();
        localStorage.setData('@App:withFinger', JSON.stringify(true));
      }
    })["catch"](function (error) {
      returnValue();

      if (error.message == 'Authentication was canceled because the user tapped the fallback button (Enter Password).') {
        noSave();
      } else {
        alert(error.message);
        noSave && noSave();
      }
    });
  }

  function authLegacy() {
    _reactNativeFingerprintScanner["default"].authenticate({
      onAttempt: handleAuthenticationAttemptedLegacy
    }).then(function () {
      props.handlePopupDismissed(); // Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
    })["catch"](function (error) {
      returnValue();
      setState({
        errorMessageLegacy: error.message,
        biometricLegacy: error.biometric
      });
      description.shake();
    });
  }

  var handleAuthenticationAttemptedLegacy = function handleAuthenticationAttemptedLegacy(error) {
    setState({
      errorMessageLegacy: error.message
    });
    description.shake();
  };

  return null;
}