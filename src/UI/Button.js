import React from 'react';
import styled  from 'styled-components/native'

import { View } from 'react-native';
import { Texto } from './Texto';
import Colors from './Colors';

const ButtonPersonal = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${({background}) => background ?background:Colors.Primary};
  border-radius:${({borderRadius})=>borderRadius? borderRadius:'5px'};
  height: 35px;
`;

export const Button = (props) => {
    const { label, color,size, Bold,borderRadius,backgroundColor,disabled=false, styleButton = {}, styleText = {}, onPress = () => { }, icon, children } = props
    return (<ButtonPersonal disabled={disabled} borderRadius={borderRadius} background={backgroundColor} style={styleButton} onPress={onPress}>
        {children ? children : (<View style={{ flexDirection: 'row', alignContent: 'space-around' }}>
            {icon && icon.position == 'left' && icon.element}
            <Texto Bold size={size?size:15} colorLabel={color?color:'white'} style={[styleText, icon?icon.position === 'left':null ? { paddingLeft: 8 } : { paddingRight: 0 }]}>
                {label}
            </Texto>
            {icon && icon.position == 'right' && icon.element}
        </View>)}
    </ButtonPersonal>)
}
