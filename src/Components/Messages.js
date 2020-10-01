import React, { useEffect } from 'react'
import styled from 'styled-components'
import Colors from '../UI/Colors'
import { Texto } from '../UI/Texto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { ScreenContainer } from './ScreenContainer'
const StyledMessages = styled.View`
background-color:${Colors.Primary};
flex:1;
align-items:center;
justify-content:center;
`
export function Messages(props) {
    const { kindOfAnswer=1  } = props.route.params

    useEffect(() => {
        setTimeout(() => {
            props.navigation.pop();
        }, 6500)
    }, [])
    
    return (
        <ScreenContainer barBackgroundColor={Colors.Primary}>
            <StyledMessages>
                <AntDesign name={`${kindOfAnswer}`==='1'?"checkcircle":
                `${kindOfAnswer}`==='0'?"closecircle":
                "closecircle"} size={82} color="white" />
                {/* <Entypo name="" */}
                <Texto colorLabel="white" style={{textAlign:'center',marginTop:8}}>{typeMessage({answer:`${kindOfAnswer}`})}</Texto>
            </StyledMessages>
        </ScreenContainer>
    )
}
function typeMessage({message, answer}) {
    
    if(answer){
        switch (answer) {
            case '1':
                return 'Saldo agregado con exito.'
            case '0':
                return 'Carga de Saldo anulada.'
            default:
                return 'Tu carga de saldo no pudo ser realizada.'
        }
    }
}






export function MessagesT(props) {
    const { kindOfAnswer=1  } = props.route.params

    useEffect(() => {
        setTimeout(() => {
            props.navigation.pop();
        }, 6500)
    }, [])
    
    return (
        <ScreenContainer barBackgroundColor={Colors.Primary}>
            <StyledMessages>
                <AntDesign name={((JSON.stringify(kindOfAnswer)==='2'||JSON.stringify(kindOfAnswer)==='1'))?"checkcircle":
                `${kindOfAnswer}`==='0'?"closecircle":
                "closecircle"} size={82} color="white" />
                {/* <Entypo name="" */}
                <Texto colorLabel="white" style={{textAlign:'center',marginTop:8}}>{typeMessageT({answer:`${kindOfAnswer}`})}</Texto>
            </StyledMessages>
        </ScreenContainer>
    )
}
function typeMessageT({message, answer}) {
    
    if(answer){
        switch (answer) {
            case '1':
                return 'Transferencia realizada.'
            case '2':
                    return 'Carga realizada con éxito.'
            default:
                return 'Tu Transferencia no se pudo realizada.'
        }
    }
}