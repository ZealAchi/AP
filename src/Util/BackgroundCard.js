export function getTypeCreditCardImg(colorCard) {
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
        default:
            return require('../UI/CreditCard/images/card-violeta-front.png')
    }
}