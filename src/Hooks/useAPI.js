/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import { useMemo, useContext } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import { VariablesContext } from '../Context/Variables.Context';
import { AlertMessage } from '../Components/Alert';
import { DataContext } from '../Context/Datos.Context';
import decoded from 'jwt-decode';
import { useLocalStorage } from './useLocalStorage';
import { LoadingContext } from '../Context/Load.Context';
import { formatNumber } from '../Util/FormatNumber';
import AsyncStorage from '@react-native-community/async-storage';
export function useAPI() {
  const LoadingCtx = useContext(LoadingContext);

  const { uri } = useContext(VariablesContext);
  const {
    getAvatar: getAvatarContext,
    setState: setStateContext,
    setBalances: setBalancesContext,
    state,
    password,
    setPassword,
    setToken,
    isNewUser,
    token,
    setContactsMatch,
    setUsersReferences,
    getPassword,
    getNewUser,
    getToken
  } = useContext(DataContext);


  async function postDataAPI(props) {

    const getTokenX = async () => {
      let token = await AsyncStorage.getItem('@App:tokenX');
      return token
    }
    try {
      LoadingCtx.LoadingIconTrue();
      ///Loading?
      const { UrlC, nextAction, identificador, header, Finger, token: tokenX } = props;
      const Vurl = `${uri}/${UrlC}`;
      const Data = props.data;
      const localStorage = useLocalStorage();
      var { pin = password } = Data;
      var onlyFinger = undefined;

      if (Finger) onlyFinger = { rut_number: state.usuarioRUT, pin };

      var tokenP
      if (!tokenX && !token) {
        tokenP = await getTokenX()
      }

      RNFetchBlob.config({
        trusty: true,
      })
        .fetch(
          'post',
          Vurl,
          header ? { Authorization: `Bearer ${tokenX ? tokenX : tokenP ? JSON.parse(tokenP) : token}` } : {},
          JSON.stringify(!onlyFinger ? { ...Data } : { ...onlyFinger }),
        )
        .then((res) => {
          const data = JSON.parse(res.data);
          switch (identificador) {
            case 'newUser':
              // console.log(props,'props ')
              if (data.token) {
                // const message = {message: `Tu pin es ${pin}, No lo pierdas`};
                localStorage.removeItem('@App:withFinger');
                localStorage.setData('@App:RUT', Data.rut_number);
                localStorage.setData('@App:Password', pin);
                getPassword(pin)
                getNewUser(true)
                getToken(data.token)
                localStorage.setData('@App:isNewUser', true)
                localStorage.setData('@App:token', data.token)
                localStorage.setData('@App:tokenX', data.token)
                setToken(data.token);
                setStateContext({
                  ...state,
                  user: { token: data.token, decodeUser: decoded(data.token) },
                });
                const uploadImg = state.NewUser[0].uploadImg;
                const decodeUser = decoded(data.token);
                PostAPI.SubirAvatar({
                  ...uploadImg,
                  token: data.token,
                  uuid: decodeUser.UUID,
                });
                // AlertMessage(message);
                GetAPI.getAvatar(getAvatarContext, data.uuid);
                nextAction(true);
              } else {
                AlertMessage(data.errors);
                nextAction(false);
              }
              break;
            case 'login':
              if (data.token) {
                localStorage.setData('@App:RUT', Data.rut_number);
                localStorage.setData('@App:Password', pin);
                localStorage.setData('@App:tokenX', data.token)
                setToken(data.token);
                setStateContext({
                  ...state,
                  user: { token: data.token, decodeUser: decoded(data.token) },
                });
                nextAction(true);
              } else {
                console.log(props, 'props')
                AlertMessage(data.errors);
                nextAction(false);
              }
              break;
            case 'CreateANewUserAssociationwithAnyBank':
              ///Falta reoptener los bancos mis bancos
              if (JSON.stringify(res.data) === JSON.stringify('""\n')) {
                nextAction();
              } else {
                nextAction(false);
                AlertMessage(res.data.errors);
              }
              break;
            case 'updateProfile':
              if (data.profile) {
                AlertMessage({ message: 'Usuario Actualizado.' });
              } else {
                AlertMessage({ message: 'Error al Actualizar.' });
              }
              GetAPI.getCurrentUserLogged();
              break;
            case 'checkContacts':
              // console.log(data.contacts, 'checkContacts')
              setContactsMatch(data.contacts);
              break;
            case 'ChangePin':
              if (data.success) {
                if (tokenX && isNewUser) {
                  localStorage.setData('@App:Password', Data.pin);
                  localStorage.removeItem('@App:token');
                  localStorage.removeItem('@App:isNewUser')
                  nextAction(true);
                } else {
                  localStorage.setData('@App:Password', Data.pin);
                  AlertMessage({ message: `Tu nuevo pin es ${pin}.` });
                  AlertMessage({ message: 'Tu PIN ha cambiado.' });
                  nextAction(true);
                }
              } else {
                AlertMessage(data.errors);
                nextAction(false);
              }
              break;
            case 'AddSaldoWebPay':
              nextAction(`${data.url}?token_ws=${data.token_ws}`, data.token_ws)
              break;
            case 'CallbackWebPay':
              nextAction({ ...data })
              PostAPI.getBalance()
              break;
            case 'WalletSend':
              if (data.errors) {
                AlertMessage(data.errors);
                if (props?.typePay === 'payUser') {
                  nextAction(false);
                }
              } else {
                if (props?.typePay === 'payUser') {
                  nextAction(true);
                } else {
                  nextAction(true);
                }
                PostAPI.getBalance();
              }
              break;
            case 'getBalance':
              if (data.errors) {
              } else {
                let Newbalance = data.amount
                // if(data.currency===152){
                Newbalance = (data.amount / 100)
                // }
                setBalancesContext({ AllPay: { ...data, amount: formatNumber.new(Newbalance) } });
              }
              break;
            default:
              console.log('Descozco esta api :D', res);
              break;
          }
          LoadingCtx.LoadingFalse();
        })
        .catch((e) => {
          LoadingCtx.LoadingFalse();
          AlertMessage({ message: 'El servidor no se encuentra disponible.' });
          console.log(e, 'error');
          console.log(props, 'props desde la api')
          // console.log(header ? {Authorization: `Bearer ${tokenX?tokenX:token}`} : {},'header ? {Authorization: `Bearer ${tokenX?tokenX:token}`} : {}')
        });
    } catch (error) {
      LoadingCtx.LoadingFalse();
      console.log(error, 'error');
      // Si ocurre el error cambiar el loading
    }
  }
  async function getImage(props) {
    try {
      const { UrlC, setState, identificador } = props;
      const Vurl = `${uri}/${UrlC}`;
      await RNFetchBlob.config({
        trusty: true,
      })
        .fetch('GET', Vurl, { Authorization: `Bearer ${token}` })
        .then((res) => {
          let base64Str = res.base64();
          switch (identificador) {
            case "userAvatar":
              setState(`data:image/png;base64,${base64Str}`);
              break;
            case "banks":
              setState(`data:image/png;base64,${base64Str}`)
              break;
            default:
              alert("?")
              break;
          }

        });
    } catch (error) {
      console.log(error);
    }
  }
  async function postImage(props) {
    try {
      LoadingCtx.LoadingIconTrue();
      const { UrlC, data: Data } = props;
      const Vurl = `${uri}/${UrlC}`;
      RNFetchBlob.config({
        trusty: true,
      })
        .fetch(
          'POST',
          Vurl,
          {
            Authorization: `Bearer ${Data.token ? Data.token : token}`,
            'Content-Type': 'multipart/form-data',
          },
          [
            {
              name: 'upload',
              filename: 'avatar.png',
              type: Data.type,
              data: Data.data,
            },
          ],
        )
        .then((res) => {
          const data = JSON.parse(res.data);
          const uuid = state.user.profile.uuid;
          if (data.success) {
            if (Data.token) {
              GetAPI.getAvatar(getAvatarContext, uuid);
            } else {
              const message = { message: `Imagen guardada.` };
              GetAPI.getAvatar(getAvatarContext, uuid);
              AlertMessage(message);
            }
          } else {
            AlertMessage(data.errors);
          }
        });
      LoadingCtx.LoadingFalse();
    } catch (e) {
      console.log(e);
      LoadingCtx.LoadingFalse();
    }
  }

  async function getDataAPI(props) {
    LoadingCtx.LoadingIconTrue();
    try {
      const { UrlC, nextAction, identificador, setState, data } = props;
      const Vurl = `${uri}/${UrlC}`;
      RNFetchBlob.config({
        trusty: true,
      })
        .fetch(
          'GET',
          Vurl,
          { Authorization: `Bearer ${token}` },
          JSON.stringify(data && { ...data }),
        )
        .then((res) => {
          const data =
            identificador !== 'userAvatar' ? JSON.parse(res.data) : '';
          switch (identificador) {
            case 'getCurrentUserLogged':
              setStateContext({ ...state, user: { ...state.user, ...data } });
              break;
            case 'ListBanks':
              setState({ ...state, banks: data.banks });
              break;
            case 'ListUserBanks':
              setState(data.banks);
              break;
            case 'UsersCurrentReferences':
              setUsersReferences([...data.references]);
              break;
            default:
              alert('API no conocida C:');
              break;
          }
          LoadingCtx.LoadingFalse();
        })
        .catch(() => {
          LoadingCtx.LoadingFalse();
        });
    } catch (error) {
      console.log(error);
      LoadingCtx.LoadingFalse();
      // Si ocurre el error cambiar el loading
    }
  }
  const GetAPI = useMemo(() => {
    return {
      ping: async () =>
        await getDataAPI({
          UrlC: 'ping',
          identificador: 'ping',
        }),
      GetByIDImage: async () =>
        await getDataAPI({
          UrlC: `images/${id}`,
          identificador: 'ping',
        }),
      getCurrentUserLogged: async () => {
        await getDataAPI({
          UrlC: 'user/profile',
          identificador: 'getCurrentUserLogged',
        });
      },
      getUsersCurrentReferences: async () =>
        await getDataAPI({
          UrlC: 'user/references',
          identificador: 'UsersCurrentReferences',
        }),
      getListBanks: async (setState) =>
        await getDataAPI({
          UrlC: 'banks',
          identificador: 'ListBanks',
          setState,
        }),
      getListUserBanks: async (setState) =>
        await getDataAPI({
          UrlC: 'banks/current',
          identificador: 'ListUserBanks',
          setState,
        }),
      getAvatar: async (setState, id) => {
        await getImage({
          UrlC: `user/avatar/${id ? id : '0'}`,
          identificador: 'userAvatar',
          setState: setState,
        });
      },
      getImageBank: async (setState, id) => {
        await getImage({
          UrlC: `banks/${id ? id : '0'}/image`,
          identificador: 'banks',
          setState: setState,
        });
      },
    };
  });

  const PostAPI = useMemo(() => {
    return {
      newUser: async (data, nextAction) => {
        const NewPin = [];
        NewPin.push(Math.floor(Math.random() * (9 - 0 + 1)) + 0);
        NewPin.push(Math.floor(Math.random() * (9 - 0 + 1)) + 0);
        NewPin.push(Math.floor(Math.random() * (9 - 0 + 1)) + 0);
        NewPin.push(Math.floor(Math.random() * (9 - 0 + 1)) + 0);
        const pin = `${NewPin[0]}${NewPin[1]}${NewPin[2]}${NewPin[3]}`;
        const Data = { ...data[0], pin };
        await postDataAPI({
          UrlC: 'user/register',
          identificador: 'newUser',
          data: Data,
          nextAction,
        });
      },
      login: async (data, nextAction, Finger) => {
        const { pin, rut_number = '' } = data;
        await postDataAPI({
          UrlC: 'user/login',
          identificador: 'login',
          data: {
            pin,
            rut_number: rut_number !== '' ? rut_number : state.usuarioRUT,
          },
          Finger,
          nextAction,
        });
      },
      SubirAvatar: async (state) =>
        await postImage({
          UrlC: 'user/avatar',
          identificador: 'SubirAvatar',
          data: state,
        }),
      CreateANewUserAssociationwithAnyBank: async (state) =>
        await postDataAPI({
          UrlC: 'banks/current',
          identificador: 'CreateANewUserAssociationwithAnyBank',
          data: state,
          header: true,
        }),
      UpdateProfile: async (state) =>
        await postDataAPI({
          UrlC: 'user/profile',
          identificador: 'updateProfile',
          data: state,
          header: true,
        }),
      checkContacts: async (state) =>
        await postDataAPI({
          UrlC: `user/contacts`,
          identificador: 'checkContacts',
          data: state,
          header: true,
        }),
      ChangePin: async (state, nextAction, token) =>
        await postDataAPI({
          UrlC: `user/pin`,
          identificador: 'ChangePin',
          data: state,
          header: true,
          token: token,
          nextAction: nextAction,
        }),
      AddSaldoWebPay: async (state, nextAction) =>
        await postDataAPI({
          UrlC: 'wallet/add',
          identificador: 'AddSaldoWebPay',
          data: state,
          header: true,
          nextAction: nextAction,
        }),
      CallbackWebPay: async (state, nextAction) =>
        await postDataAPI({
          UrlC: 'callback/webpay',
          identificador: 'CallbackWebPay',
          data: state,
          header: true,
          nextAction: nextAction,
        }),
      WalletSend: async (state, nextAction, typePay, token) =>
        await postDataAPI({
          UrlC: 'wallet/send',
          identificador: 'WalletSend',
          data: state,
          header: true,
          nextAction: nextAction,
          token: token,
          typePay
        }),
      getBalance: async () => {
        await postDataAPI({
          UrlC: 'wallet',
          identificador: 'getBalance',
          data: { "currency": 152 },
          header: true,
        });
      },


    };
  });
  return {
    PostAPI,
    GetAPI,
  };
}
