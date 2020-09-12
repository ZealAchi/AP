import React from 'react'
import styled from 'styled-components/native'

const StyledBlock = styled.View`
flex:1;
flex:${({flex}) => flex ? flex : 1};
display:${({display}) => display ? display : 'flex'};
flex-direction:${({flexDirection})=>flexDirection?flexDirection:'column'};
background-color:${({backgroundColor}) =>  backgroundColor? backgroundColor : 'transparent'};
`

export function Block(props) {
    const {style}=props
    return (
        <StyledBlock {...props} >
            {props.children}
        </StyledBlock>
    )
}

