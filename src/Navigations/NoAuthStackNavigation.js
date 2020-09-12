import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Welcome } from '../NoAuth/Welcome'

import { EnterYourPin } from '../NoAuth/EnterYouPin'
import { IngresaNombreApellido } from '../NoAuth/CreateAccount/IngresaNombreApellido'
import { CualEsTuMail } from '../NoAuth/CreateAccount/CualEsTuMail'
import { FotoPerfil } from '../NoAuth/CreateAccount/FotoPerfil'
import { IngresaTusDocumentos } from '../NoAuth/CreateAccount/IngresaTusDocumentos'
import { DataContext } from '../Context/Datos.Context'

const NoAuthStack = createStackNavigator()

export const NoAuthStackNavigation = () => {
    const {state} = useContext(DataContext)
    if(state===null)
    return null
    return (<NoAuthStack.Navigator >
        {state?.usuarioRUT === null ? 
        <NoAuthStack.Screen name="Welcome" options={{ header: () => null }} component={Welcome} />:
        <NoAuthStack.Screen name="EnterYourPin" options={{ header: () => null }} component={EnterYourPin} />}
        <NoAuthStack.Screen name="IngresaNombreApellido" options={{ header: () => null }} component={IngresaNombreApellido} />
        <NoAuthStack.Screen name="CualEsTuMail" options={{ header: () => null }} component={CualEsTuMail} />
        <NoAuthStack.Screen name="FotoPerfil" options={{ header: () => null }} component={FotoPerfil} />
        <NoAuthStack.Screen name="IngresaTusDocumentos" options={{ header: () => null }} component={IngresaTusDocumentos} />
    </NoAuthStack.Navigator>
    )
}