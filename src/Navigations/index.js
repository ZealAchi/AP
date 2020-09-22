/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NoAuthStackNavigation } from './NoAuthStackNavigation';
import { TabsScreen } from './TabsScreen';
// import { Modal } from '../Components/Modal';
import { InvitaGana } from '../Components/Auth/InvitaGana';
import { CargarSaldo } from '../Components/Auth/CargarSaldo/CargarSaldo';
import { CobrarQR } from '../Components/Auth/Cobrar/CobrarQR';
import { AccountsAndCards } from '../Components/Auth/AccountsAndCards';
import { MyAccounts } from '../Components/Auth/MyAccounts';
import { CobrarQR2 } from '../Components/Auth/Cobrar/CobrarQR2';
import { AddBank2 } from '../Components/Auth/AddBank/addBank2';
import { AddBank } from '../Components/Auth/AddBank/addBank';
import { Wallet } from '../Components/Auth/Wallet';
import { AddCard } from '../Components/Auth/Wallet/addCard';
import { DataContext } from '../Context/Datos.Context';
import { UpdatePerfil } from '../Components/Auth/UpdatePerfil';
import { EnterYourPin } from '../NoAuth/EnterYouPin';
import { Notifications } from '../Components/Auth/Notificaciones';
import { Movements } from '../Components/Auth/Movimientos';
import { NextCard } from '../Components/Auth/ProximaTarjeta';
import { NextAccount } from '../Components/Auth/ProximaCuenta';
import { Analysis } from '../Components/Auth/Analisis';
import { PagarQR } from '../Components/Auth/Pagar/PagarQR';
import { Cobrar } from '../Components/Auth/Cobrar/Cobrar';
import { Pagar } from '../Components/Auth/Pagar/Pagar';
import { SaldoAllPay } from '../Components/Auth/SaldoAllPay';
import WebView from '../Util/WebView';
import { Messages, MessagesT } from '../Components/Messages';
import { History } from '../Components/Auth/History';
import { RutAndPin } from '../NoAuth/RutAndPin';
import { QueSonYPorQue } from '../Components/Auth/AddBank/queSonYporQue';
import { Pay } from '../Components/Auth/Pay';

const RootStack = createStackNavigator()



export const RootStackScreen = () => {
  const { token,isNewUser} = useContext(DataContext)
  return (
  
  <RootStack.Navigator headerMode="none">
    {!token ?
      <RootStack.Screen name="Welcome" component={NoAuthStackNavigation} options={{ animationEnabled: true }} />
      :isNewUser?
      <RootStack.Screen name="EnterYourPin2" options={{header:()=>null}} component={EnterYourPin}/>
      :<RootStack.Screen name="App" component={TabsScreen} options={{ animationEnabled: false }} />
    }
    <RootStack.Screen name="RutAndPin" options={{ header: () => null }} component={RutAndPin} />
    <RootStack.Screen name="InvitaGana" options={{ header: () => null }} component={InvitaGana} />
    <RootStack.Screen name="PagarQR" options={{ header: () => null }} component={PagarQR} />
    <RootStack.Screen name="Pagar" options={{ header: () => null }} component={Pagar} />
    <RootStack.Screen name="Cobrar" options={{ header: () => null }} component={Cobrar} />
    {/* <RootStack.Screen name="PagarQR2" options={{ header: () => null }} component={PagarQR2} /> */}
    <RootStack.Screen name="CobrarQR" options={{ header: () => null }} component={CobrarQR} />
    <RootStack.Screen name="CobrarQR2" options={{ header: () => null }} component={CobrarQR2} />
    <RootStack.Screen name="AccountsAndCards" options={{ header: () => null }} component={AccountsAndCards} />
    <RootStack.Screen name="MyAccounts" options={{ header: () => null }} component={MyAccounts} />
    <RootStack.Screen name="AddBank" options={{ header: () => null }} component={AddBank} />
    <RootStack.Screen name="AddBank2" options={{ header: () => null }} component={AddBank2} />
    <RootStack.Screen name="Wallet" options={{ header: () => null }} component={Wallet} />
    <RootStack.Screen name="Notifications" options={{ header: () => null }} component={Notifications} />
    <RootStack.Screen name="Movements" options={{ header: () => null }} component={Movements} />
    <RootStack.Screen name="QueSonYPorQue" options={{ header: () => null }} component={QueSonYPorQue} />
    <RootStack.Screen name="NextCard" options={{ header: () => null }} component={NextCard} />
    <RootStack.Screen name="NextAccount" options={{ header: () => null }} component={NextAccount} />
    <RootStack.Screen name="Analysis" options={{ header: () => null }} component={Analysis} />
    <RootStack.Screen name="AddCard" options={{ header: () => null }} component={AddCard} />
    <RootStack.Screen name="UpdatePerfil" options={{header:()=>null}} component={UpdatePerfil}/>
    <RootStack.Screen name="EnterYourPin" options={{header:()=>null}} component={EnterYourPin}/>
    <RootStack.Screen name="SaldoAllPay" options={{header:()=>null}} component={SaldoAllPay}/>
    <RootStack.Screen name="WebView" options={{header:()=>null}} component={WebView}/>
    <RootStack.Screen name="Messages" options={{header:()=>null}} component={Messages}/>
    <RootStack.Screen name="MessagesT" options={{header:()=>null}} component={MessagesT}/>
    <RootStack.Screen name="History" options={{header:()=>null}} component={History}/>
    <RootStack.Screen name="Pay" options={{header:()=>null}} component={Pay}/>
    
  </RootStack.Navigator>)
}