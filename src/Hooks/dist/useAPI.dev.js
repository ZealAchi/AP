"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAPI = useAPI;

var _react = require("react");

var _rnFetchBlob = _interopRequireDefault(require("rn-fetch-blob"));

var _Variables = require("../Context/Variables.Context");

var _Alert = require("../Components/Alert");

var _Datos = require("../Context/Datos.Context");

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _useLocalStorage = require("./useLocalStorage");

var _Load = require("../Context/Load.Context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useAPI() {
  var LoadingCtx = (0, _react.useContext)(_Load.LoadingContext);

  var _useContext = (0, _react.useContext)(_Variables.VariablesContext),
      uri = _useContext.uri;

  var _useContext2 = (0, _react.useContext)(_Datos.DataContext),
      getAvatarContext = _useContext2.getAvatar,
      setStateContext = _useContext2.setState,
      setBalancesContext = _useContext2.setBalances,
      state = _useContext2.state,
      password = _useContext2.password,
      setToken = _useContext2.setToken,
      token = _useContext2.token,
      setContactsMatch = _useContext2.setContactsMatch,
      setUsersReferences = _useContext2.setUsersReferences;

  function postDataAPI(props) {
    var UrlC, nextAction, identificador, header, Finger, Vurl, Data, localStorage, _Data$pin, pin, onlyFinger;

    return regeneratorRuntime.async(function postDataAPI$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              LoadingCtx.LoadingIconTrue(); ///Loading?

              UrlC = props.UrlC, nextAction = props.nextAction, identificador = props.identificador, header = props.header, Finger = props.Finger;
              Vurl = "".concat(uri, "/").concat(UrlC);
              Data = props.data;
              localStorage = (0, _useLocalStorage.useLocalStorage)();
              _Data$pin = Data.pin, pin = _Data$pin === void 0 ? password : _Data$pin;
              onlyFinger = undefined;
              if (Finger) onlyFinger = {
                rut_number: state.usuarioRUT,
                pin: pin
              };

              _rnFetchBlob["default"].config({
                trusty: true
              }).fetch('post', Vurl, header ? {
                Authorization: "Bearer ".concat(token)
              } : {}, JSON.stringify(!onlyFinger ? _objectSpread({}, Data) : _objectSpread({}, onlyFinger))).then(function (res) {
                var data = JSON.parse(res.data);

                switch (identificador) {
                  case 'newUser':
                    console.log(props, 'props ');

                    if (data.token) {
                      var message = {
                        message: "Tu pin es ".concat(pin, ", No lo pierdas")
                      };
                      localStorage.setData('@App:RUT', Data.rut_number);
                      localStorage.setData('@App:Password', pin);
                      setToken(data.token);
                      setStateContext(_objectSpread({}, state, {
                        user: {
                          token: data.token,
                          decodeUser: (0, _jwtDecode["default"])(data.token)
                        }
                      }));
                      var uploadImg = state.NewUser[0].uploadImg;
                      var decodeUser = (0, _jwtDecode["default"])(data.token);
                      PostAPI.SubirAvatar(_objectSpread({}, uploadImg, {
                        token: data.token,
                        uuid: decodeUser.UUID
                      }));
                      (0, _Alert.AlertMessage)(message);
                      GetAPI.getAvatar(getAvatarContext, data.uuid);
                      nextAction(true);
                    } else {
                      (0, _Alert.AlertMessage)(data.errors);
                      nextAction(false);
                    }

                    break;

                  case 'login':
                    if (data.token) {
                      localStorage.setData('@App:RUT', Data.rut_number);
                      localStorage.setData('@App:Password', pin);
                      setToken(data.token);
                      setStateContext(_objectSpread({}, state, {
                        user: {
                          token: data.token,
                          decodeUser: (0, _jwtDecode["default"])(data.token)
                        }
                      }));
                      nextAction(true);
                    } else {
                      (0, _Alert.AlertMessage)(data.errors);
                      nextAction(false);
                    }

                    break;

                  case 'CreateANewUserAssociationwithAnyBank':
                    ///Falta reoptener los bancos mis bancos
                    if (JSON.stringify(res.data) === JSON.stringify('""\n')) {
                      nextAction();
                    } else {
                      nextAction(false);
                      (0, _Alert.AlertMessage)(res.data.errors);
                    }

                    break;

                  case 'updateProfile':
                    if (data.profile) {
                      (0, _Alert.AlertMessage)({
                        message: 'Usuario Actualizado.'
                      });
                    } else {
                      (0, _Alert.AlertMessage)({
                        message: 'Error al Actualizar.'
                      });
                    }

                    GetAPI.getCurrentUserLogged();
                    break;

                  case 'checkContacts':
                    // console.log(data.contacts, 'checkContacts')
                    setContactsMatch(data.contacts);
                    break;

                  case 'ChangePin':
                    if (data.success) {
                      localStorage.setData('@App:Password', Data.pin);
                      (0, _Alert.AlertMessage)({
                        message: "Tu nuevo pin es ".concat(pin, ".")
                      });
                      (0, _Alert.AlertMessage)({
                        message: 'Tu PIN ha cambiado.'
                      });
                      nextAction(true);
                    } else {
                      (0, _Alert.AlertMessage)(data.errors);
                      nextAction(false);
                    }

                    break;

                  case 'AddSaldoWebPay':
                    console.log(data, 'data addSaldoWep');
                    console.log(props, 'props');
                    nextAction("".concat(data.url, "?token_ws=").concat(data.token_ws), data.token_ws);
                    break;

                  case 'CallbackWebPay':
                    nextAction(_objectSpread({}, data));
                    PostAPI.getBalance();
                    break;

                  case 'WalletSend':
                    if (data.errors) {
                      (0, _Alert.AlertMessage)(data.errors);
                    } else {
                      if (props.typePay === 'payUser') {
                        console.log(res, 'res');
                        (0, _Alert.AlertMessage)({
                          messages: 'Pago Realizado'
                        });
                      }
                    }

                    break;

                  case 'getBalance':
                    if (data.errors) {// console.log(getBalance,'getBalance')
                      // AlertMessage(data.errors);
                      // console.log(res,'res',{...data});
                    } else {
                      // console.log(res,'res getBalance');
                      setBalancesContext({
                        AllPay: data
                      });
                    }

                    break;

                  default:
                    console.log('Descozco esta api :D', res);
                    break;
                }

                LoadingCtx.LoadingFalse();
              })["catch"](function (e) {
                LoadingCtx.LoadingFalse();
                (0, _Alert.AlertMessage)({
                  message: 'El servidor no se encuentra disponible.'
                });
                console.log(e, 'error');
              });
            } catch (error) {
              LoadingCtx.LoadingFalse();
              console.log(error, 'error'); // Si ocurre el error cambiar el loading
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  }

  function getImage(props) {
    var UrlC, setState, Vurl;
    return regeneratorRuntime.async(function getImage$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              UrlC = props.UrlC, setState = props.setState;
              Vurl = "".concat(uri, "/").concat(UrlC);

              _rnFetchBlob["default"].config({
                trusty: true
              }).fetch('GET', Vurl, {
                Authorization: "Bearer ".concat(token)
              }).then(function (res) {
                var base64Str = res.base64();
                setState("data:image/png;base64,".concat(base64Str));
              });
            } catch (error) {
              console.log(error);
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  }

  function postImage(props) {
    var UrlC, Data, Vurl;
    return regeneratorRuntime.async(function postImage$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            try {
              LoadingCtx.LoadingIconTrue();
              UrlC = props.UrlC, Data = props.data;
              Vurl = "".concat(uri, "/").concat(UrlC);

              _rnFetchBlob["default"].config({
                trusty: true
              }).fetch('POST', Vurl, {
                Authorization: "Bearer ".concat(Data.token ? Data.token : token),
                'Content-Type': 'multipart/form-data'
              }, [{
                name: 'upload',
                filename: 'avatar.png',
                type: Data.type,
                data: Data.data
              }]).then(function (res) {
                var data = JSON.parse(res.data);
                var uuid = state.user.profile.uuid;

                if (data.success) {
                  if (Data.token) {
                    GetAPI.getAvatar(getAvatarContext, uuid);
                  } else {
                    var message = {
                      message: "Imagen guardada."
                    };
                    GetAPI.getAvatar(getAvatarContext, uuid);
                    (0, _Alert.AlertMessage)(message);
                  }
                } else {
                  (0, _Alert.AlertMessage)(data.errors);
                }
              });

              LoadingCtx.LoadingFalse();
            } catch (e) {
              console.log(e);
              LoadingCtx.LoadingFalse();
            }

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  }

  function getDataAPI(props) {
    var UrlC, nextAction, identificador, setState, data, Vurl;
    return regeneratorRuntime.async(function getDataAPI$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            LoadingCtx.LoadingIconTrue();

            try {
              UrlC = props.UrlC, nextAction = props.nextAction, identificador = props.identificador, setState = props.setState, data = props.data;
              Vurl = "".concat(uri, "/").concat(UrlC);

              _rnFetchBlob["default"].config({
                trusty: true
              }).fetch('GET', Vurl, {
                Authorization: "Bearer ".concat(token)
              }, JSON.stringify(data && _objectSpread({}, data))).then(function (res) {
                var data = identificador !== 'userAvatar' ? JSON.parse(res.data) : '';

                switch (identificador) {
                  case 'getCurrentUserLogged':
                    setStateContext(_objectSpread({}, state, {
                      user: _objectSpread({}, state.user, {}, data)
                    }));
                    break;

                  case 'ListBanks':
                    setState(data.banks);
                    break;

                  case 'ListUserBanks':
                    setState(data.banks);
                    break;

                  case 'UsersCurrentReferences':
                    setUsersReferences(_toConsumableArray(data.references));
                    break;

                  default:
                    alert('API no conocida C:');
                    break;
                }

                LoadingCtx.LoadingFalse();
              })["catch"](function () {
                LoadingCtx.LoadingFalse();
              });
            } catch (error) {
              console.log(error);
              LoadingCtx.LoadingFalse(); // Si ocurre el error cambiar el loading
            }

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  }

  var GetAPI = (0, _react.useMemo)(function () {
    return {
      ping: function ping() {
        return regeneratorRuntime.async(function ping$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return regeneratorRuntime.awrap(getDataAPI({
                  UrlC: 'ping',
                  identificador: 'ping'
                }));

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        });
      },
      GetByIDImage: function GetByIDImage() {
        return regeneratorRuntime.async(function GetByIDImage$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return regeneratorRuntime.awrap(getDataAPI({
                  UrlC: "images/".concat(id),
                  identificador: 'ping'
                }));

              case 2:
                return _context6.abrupt("return", _context6.sent);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        });
      },
      getCurrentUserLogged: function getCurrentUserLogged() {
        return regeneratorRuntime.async(function getCurrentUserLogged$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return regeneratorRuntime.awrap(getDataAPI({
                  UrlC: 'user/profile',
                  identificador: 'getCurrentUserLogged'
                }));

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        });
      },
      getUsersCurrentReferences: function getUsersCurrentReferences() {
        return regeneratorRuntime.async(function getUsersCurrentReferences$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return regeneratorRuntime.awrap(getDataAPI({
                  UrlC: 'user/references',
                  identificador: 'UsersCurrentReferences'
                }));

              case 2:
                return _context8.abrupt("return", _context8.sent);

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        });
      },
      getListBanks: function getListBanks(setState) {
        return regeneratorRuntime.async(function getListBanks$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return regeneratorRuntime.awrap(getDataAPI({
                  UrlC: 'banks',
                  identificador: 'ListBanks',
                  setState: setState
                }));

              case 2:
                return _context9.abrupt("return", _context9.sent);

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        });
      },
      getListUserBanks: function getListUserBanks(setState) {
        return regeneratorRuntime.async(function getListUserBanks$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return regeneratorRuntime.awrap(getDataAPI({
                  UrlC: 'banks/current',
                  identificador: 'ListUserBanks',
                  setState: setState
                }));

              case 2:
                return _context10.abrupt("return", _context10.sent);

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        });
      },
      getAvatar: function getAvatar(setState, id) {
        return regeneratorRuntime.async(function getAvatar$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return regeneratorRuntime.awrap(getImage({
                  UrlC: "user/avatar/".concat(id ? id : '0'),
                  identificador: 'userAvatar',
                  setState: setState
                }));

              case 2:
              case "end":
                return _context11.stop();
            }
          }
        });
      }
    };
  });
  var PostAPI = (0, _react.useMemo)(function () {
    return {
      newUser: function newUser(data, nextAction) {
        var NewPin, pin, Data;
        return regeneratorRuntime.async(function newUser$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                NewPin = [];
                NewPin.push(Math.floor(Math.random() * (9 - 0 + 1)) + 0);
                NewPin.push(Math.floor(Math.random() * (9 - 0 + 1)) + 0);
                NewPin.push(Math.floor(Math.random() * (9 - 0 + 1)) + 0);
                NewPin.push(Math.floor(Math.random() * (9 - 0 + 1)) + 0);
                pin = "".concat(NewPin[0]).concat(NewPin[1]).concat(NewPin[2]).concat(NewPin[3]);
                Data = _objectSpread({}, data[0], {
                  pin: pin
                });
                _context12.next = 9;
                return regeneratorRuntime.awrap(postDataAPI({
                  UrlC: 'user/register',
                  identificador: 'newUser',
                  data: Data,
                  nextAction: nextAction
                }));

              case 9:
              case "end":
                return _context12.stop();
            }
          }
        });
      },
      login: function login(data, nextAction, Finger) {
        var pin, _data$rut_number, rut_number;

        return regeneratorRuntime.async(function login$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                pin = data.pin, _data$rut_number = data.rut_number, rut_number = _data$rut_number === void 0 ? '' : _data$rut_number;
                _context13.next = 3;
                return regeneratorRuntime.awrap(postDataAPI({
                  UrlC: 'user/login',
                  identificador: 'login',
                  data: {
                    pin: pin,
                    rut_number: rut_number !== '' ? rut_number : state.usuarioRUT
                  },
                  Finger: Finger,
                  nextAction: nextAction
                }));

              case 3:
              case "end":
                return _context13.stop();
            }
          }
        });
      },
      SubirAvatar: function SubirAvatar(state) {
        return regeneratorRuntime.async(function SubirAvatar$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return regeneratorRuntime.awrap(postImage({
                  UrlC: 'user/avatar',
                  identificador: 'SubirAvatar',
                  data: state
                }));

              case 2:
                return _context14.abrupt("return", _context14.sent);

              case 3:
              case "end":
                return _context14.stop();
            }
          }
        });
      },
      CreateANewUserAssociationwithAnyBank: function CreateANewUserAssociationwithAnyBank(state) {
        return regeneratorRuntime.async(function CreateANewUserAssociationwithAnyBank$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return regeneratorRuntime.awrap(postDataAPI({
                  UrlC: 'banks/current',
                  identificador: 'CreateANewUserAssociationwithAnyBank',
                  data: state,
                  header: true
                }));

              case 2:
                return _context15.abrupt("return", _context15.sent);

              case 3:
              case "end":
                return _context15.stop();
            }
          }
        });
      },
      UpdateProfile: function UpdateProfile(state) {
        return regeneratorRuntime.async(function UpdateProfile$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.next = 2;
                return regeneratorRuntime.awrap(postDataAPI({
                  UrlC: 'user/profile',
                  identificador: 'updateProfile',
                  data: state,
                  header: true
                }));

              case 2:
                return _context16.abrupt("return", _context16.sent);

              case 3:
              case "end":
                return _context16.stop();
            }
          }
        });
      },
      checkContacts: function checkContacts(state) {
        return regeneratorRuntime.async(function checkContacts$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return regeneratorRuntime.awrap(postDataAPI({
                  UrlC: "user/contacts",
                  identificador: 'checkContacts',
                  data: state,
                  header: true
                }));

              case 2:
                return _context17.abrupt("return", _context17.sent);

              case 3:
              case "end":
                return _context17.stop();
            }
          }
        });
      },
      ChangePin: function ChangePin(state, nextAction) {
        return regeneratorRuntime.async(function ChangePin$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return regeneratorRuntime.awrap(postDataAPI({
                  UrlC: "user/pin",
                  identificador: 'ChangePin',
                  data: state,
                  header: true,
                  nextAction: nextAction
                }));

              case 2:
                return _context18.abrupt("return", _context18.sent);

              case 3:
              case "end":
                return _context18.stop();
            }
          }
        });
      },
      AddSaldoWebPay: function AddSaldoWebPay(state, nextAction) {
        return regeneratorRuntime.async(function AddSaldoWebPay$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return regeneratorRuntime.awrap(postDataAPI({
                  UrlC: 'wallet/add',
                  identificador: 'AddSaldoWebPay',
                  data: state,
                  header: true,
                  nextAction: nextAction
                }));

              case 2:
                return _context19.abrupt("return", _context19.sent);

              case 3:
              case "end":
                return _context19.stop();
            }
          }
        });
      },
      CallbackWebPay: function CallbackWebPay(state, nextAction) {
        return regeneratorRuntime.async(function CallbackWebPay$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return regeneratorRuntime.awrap(postDataAPI({
                  UrlC: 'callback/webpay',
                  identificador: 'CallbackWebPay',
                  data: state,
                  header: true,
                  nextAction: nextAction
                }));

              case 2:
                return _context20.abrupt("return", _context20.sent);

              case 3:
              case "end":
                return _context20.stop();
            }
          }
        });
      },
      WalletSend: function WalletSend(state, nextAction, typePay) {
        return regeneratorRuntime.async(function WalletSend$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return regeneratorRuntime.awrap(postDataAPI({
                  UrlC: 'wallet/send',
                  identificador: 'WalletSend',
                  data: state,
                  header: true,
                  nextAction: nextAction,
                  typePay: typePay
                }));

              case 2:
                return _context21.abrupt("return", _context21.sent);

              case 3:
              case "end":
                return _context21.stop();
            }
          }
        });
      },
      getBalance: function getBalance() {
        return regeneratorRuntime.async(function getBalance$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return regeneratorRuntime.awrap(postDataAPI({
                  UrlC: 'wallet',
                  identificador: 'getBalance',
                  data: {
                    "currency": 152
                  },
                  header: true
                }));

              case 2:
              case "end":
                return _context22.stop();
            }
          }
        });
      }
    };
  });
  return {
    PostAPI: PostAPI,
    GetAPI: GetAPI
  };
}