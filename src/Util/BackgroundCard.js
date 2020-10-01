export function getTypeCreditCardImg(colorCard) {
    // console.log(colorCard,'colorCard')
    switch (colorCard) {
        case 'rojo':
            return require('../UI/CreditCard/images/card-rojo-front.png')
        case 'crm':
            return require('../UI/CreditCard/images/card-crm-front.png')
        case 'naranja':
            return require('../UI/CreditCard/images/card-naranja-front.png')
        case 'rosa':
            return require('../UI/CreditCard/images/card-rosa-front.png')
        case 'verde':
            return require('../UI/CreditCard/images/card-verde-front.png')
        case 'violeta':
            return require('../UI/CreditCard/images/card-violeta-front.png')
        case 'MasterCard Gold':
            return require('../Assets/Cards/Mastercard_Dorada.png')
        case "Visa Platinum":
            return require('../Assets/Cards/Visa_Platinum.png')
        case "Mastercard Black":
            return require('../Assets/Cards/Mastercard_Black.png')
        case "Mastercard Platinum":
                return require('../Assets/Cards/Mastercard_Platinum.png')
        case "Visa Signature":
            return require('../Assets/Cards/Visa_Signature.png')
        default:
            return require('../UI/CreditCard/images/card-violeta-front.png')

    }
}