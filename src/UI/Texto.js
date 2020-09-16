import { Text } from 'react-native'
import { vh } from 'react-native-css-vh-vw'

import styled from 'styled-components/native'

export const Texto = styled(Text)`
font-size:${({ size }) => size ? `${size}px` : `${20}px`};
text-align:${({ textAlign }) => textAlign ? textAlign : 'left'};
font-weight: 300;
font-family: ${props => {if(props.typeFamily){ return props.typeFamily}else if (props.Bold) {return 'latoBold'} else {return 'latoRegular'}}};
color:${({ colorLabel }) => colorLabel ? colorLabel : '#000'};
`