import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import CarouselItem from './CarouselItem'
import { dp } from '../dist/Responsive.dev'


const { width, heigth } = Dimensions.get('window')

const Carousel = ({ data, typeDotView,height:heightP }) => {
    const refFlatList = useRef(null)
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)


    if (data && data.length) {
        return (
                <FlatList data={data}
                style={{flex:1,display:'flex'}}
                    ref={refFlatList}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <CarouselItem item={item} height={heightP}>
                            <View style={styles.dotView}>
                                {data.map((_, i) => {
                                    let opacity = position.interpolate({
                                        inputRange: [i - 1, i, i + 1],
                                        outputRange: [0.3, 1, 0.3],
                                        extrapolate: 'clamp'
                                    })
                                    return (
                                        <Animated.View
                                            key={i}
                                            style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 5,marginTop:8, borderRadius: 5 }}
                                        />
                                    )
                                })}
                            </View>
                        </CarouselItem>
                    }}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: scrollX}}}],
                        {useNativeDriver: false}
                        )}
                />
        )
    }

    console.log('Please provide Images')
    return null
}

const styles = StyleSheet.create({
    dotView: { flexDirection: 'row', justifyContent: 'center',display:'flex',flex:.8,bottom:20}
})

export default Carousel