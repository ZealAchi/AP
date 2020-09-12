/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import { useAPI } from '../Hooks/useAPI';

export default function (props) {
  const {params} = props.route;
  const {link = 'https://www.google.com',token='', type} = params;
  function getLink() {
    switch (type) {
      default:
        return link;
    }
  }
  console.log(props,'props')
const API=useAPI()
  return (
    <WebView
      source={{uri: getLink()}}
      startInLoadingState={true}
      renderLoading={() => (
        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
      onNavigationStateChange={({url}) => {
        if (url === 'https://186.64.122.181/callback/webpay') {
          console.log(url,'url')
          props.navigation.pop()
          props.navigation.pop()
          API.PostAPI.CallbackWebPay({token_ws:token},({status})=>{
            props.navigation.navigate('MyAccounts')
            props.navigation.navigate('Messages',{kindOfAnswer:status});
          })
          
        }
      }}
    />
  );
}
