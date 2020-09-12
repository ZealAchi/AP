import { Alert } from 'react-native';
export const AlertMessage = (props) => {
    const { data,name, message, nextAction } = props
    let message2="";
    switch (name) {
        case 'email_taken':
            message2 = 'El Correo Electronico ya esta en uso.'
            break;
        case 'phone_taken':
            message2="Este numero ya se encuentra registrado."
            break;
        case 'pinrut_incorrect':
            message2="Pin/Rut Incorrecto."
            break;
        case 'invalid_pin':
            message2="Pin invalido."
            break
        case 'invalid_rut':
            message2="Rut No valido."
            break
        case 'insufficient_balance':
            message2="Saldo insuficiente."
            break
        case 'invalid_uuid':
            message2="Usuario inválido."
            break
        default:
            message2=message
            break;
    }
    // console.log(message2,'mensaje2')
    Alert.alert(
        'AllPay',
        `${message2}`,
        [
            {
                text: 'OK', onPress: data && data.result === 1 ? () => {
                    () => { nextAction && nextAction() }
                } : null
            },
        ],
        { cancelable: false },
    )
}
