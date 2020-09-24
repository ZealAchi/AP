import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Foundation from 'react-native-vector-icons/Foundation'
import Colors from './Colors'
const StyledTextInput = styled.TextInput`
background-color:${({ backgroundColor }) => backgroundColor ? backgroundColor : 'white'};
border-radius:${({borderRadius})=>borderRadius?borderRadius:0};
flex:1;
border-bottom-color:${({borderBottomWidth})=>borderBottomWidth?'#E8E9EC':'transparent'};
border-bottom-width:${({borderBottomWidth})=>borderBottomWidth?'1px':'0px'};
`

export function TextInput(props) {
    const { autoCorrect,secureTextEntry,autoCapitalize,placeholderTextColor,borderBottomWidth,borderRadius,borderBottomColor,backgroundColor, autoCompleteType, numberOfLines, note, sizeIcon, disable = false, placeholder, style, textContentType, keyboardType, value, onChangeText, multiline, icon, left, right = false, styleText, maxLength} = props
    return (<View  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        {icon && <Type icon={icon} left={left} right={right} sizeIcon={sizeIcon} />}
        <StyledTextInput 
        autoCapitalize={autoCapitalize?autoCapitalize:'sentences'}
        maxLength={maxLength}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        borderBottomWidth={borderBottomWidth}
        borderRadius={borderRadius&&18}
        borderBottomColor={borderBottomColor} backgroundColor={backgroundColor} note={note}
        numberOfLines={numberOfLines} autoCompleteType={autoCompleteType} placeholderTextColor={placeholderTextColor}
        editable={disable ? false : true} selectTextOnFocus={disable ? true : false}
        keyboardType={keyboardType} multiline={multiline} onChangeText={onChangeText} 
        placeholder={placeholder} style={[style, icon && { paddingLeft: 50 }, styleText]} value={value} />
    </View>)
}

function Type({ icon, right, left, style, sizeIcon }) {
    const color = icon.color ? icon.color : Colors.Primary
    switch (icon.type) {
        case 'FontAwesome5':
            return <FontAwesome5 color={color} size={18} style={[left && { left: 0 }, right && { right: 0 }, { padding: 10, margin: 5 }, style, { position: 'absolute', zIndex: 1 }]} name={icon.name} />

        case 'Foundation':
            return <Foundation color={color} size={sizeIcon ? sizeIcon : 18} style={[left && { left: 0 }, right && { right: 0 }, { padding: 10, margin: 5 }, style, { position: 'absolute', zIndex: 1 }]} name={icon.name} />
        default:
            return <FontAwesome5 color={color} size={18} style={[left && { left: 0 }, right && { right: 0 }, { padding: 10, margin: 5 }, style, { position: 'absolute', zIndex: 1 }]} name={icon.name} />
    }
}