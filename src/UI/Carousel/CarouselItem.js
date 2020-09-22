import React from 'react'
import { View, Image, Dimensions,StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Texto } from '../Texto'
import { dp } from '../dist/Responsive.dev'

const { width, height } = Dimensions.get('window')

const CarouselItem = (props) => {
    const { item,children,height:heightP }=props
    return (<StyledCarouselItem heightP={heightP}>
        {item.data(children)}
    </StyledCarouselItem>
    )
}

const StyledCarouselItem = styled.View`
flex:1;
width:${width - 35};
margin-right:12px;
height: ${({heightP})=>heightP?heightP:height};
border-radius:10;
`
const styles = StyleSheet.create({
    // cardView: {
    //     flex: 1,
    //     width: width - 20,
    //     height: height / 3,
    //     backgroundColor: 'white',
    //     margin: 10,
    //     borderRadius: 10,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0.5, height: 0.5 },
    //     shadowOpacity: 0.5,
    //     shadowRadius: 3,
    //     elevation: 5,
    // },

    textView: {
        position: 'absolute',
        bottom: 10,
        margin: 10,
        left: 5,
    },
    // image: {
    //     // width: width - 20,
    //     // height: height / 3,
    //     borderRadius: 10
    // },
    itemTitle: {
        color: 'white',
        fontSize: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5
    },
    itemDescription: {
        color: 'white',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    }
})

export default CarouselItem