import React, { PureComponent, useRef } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'

import { Svg, G, Line, Rect, Text } from 'react-native-svg'
import { ScrollView, View, Dimensions, TouchableOpacity } from 'react-native'
import * as d3 from 'd3'
import { Button } from '../../Button';
import Colors from '../../Colors';

const GRAPH_MARGIN = 20
const GRAPH_BAR_WIDTH = 8
const colors = {
    axis: '#E4E4E4',
    bars: '#15AD13',
    ingresos: '#0084ff',
    gastos: '#fa2e69',
    default: '#ddd',
}
var screenWidth = Dimensions.get('window').width;


export default class BarChart extends PureComponent {
    render() {
        // Dimensions
        const SVGHeight = 150
        const SVGWidth = 500
        const graphHeight = SVGHeight - 2 * GRAPH_MARGIN
        const graphWidth = SVGWidth - 2 * GRAPH_MARGIN
        const data = this.props.data

        // X scale point
        const xDomain = data.map(item => item.label)
        const xRange = [0, graphWidth]
        const x = d3.scalePoint()
            .domain(xDomain)
            .range(xRange)
            .padding(1)

        // Y scale linear
        const maxValue = d3.max(data, d => d.gastos.value || d.ingresos.value)
        const topValue = Math.ceil(maxValue / this.props.round) * this.props.round
        const yDomain = [0, topValue]
        const yRange = [0, graphHeight]
        const y = d3.scaleLinear()
            .domain(yDomain)
            .range(yRange)

        // top axis and middle axis
        // const middleValue = topValue / 2

        return (<View>
            <ScrollView horizontal style={{ height: '300%' }} indicatorStyle={'red'}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                ref={(node) => this.scroll = node}
            >
                <Svg width={SVGWidth - 50} height={SVGHeight}>
                    <G y={graphHeight + GRAPH_MARGIN}>
                        {/* Top value label */}
                        {/* <Text
              x={graphWidth}
              textAnchor="end"
              y={y(topValue) * -1 - 5}
              fontSize={12}
              fill="black"
              fillOpacity={0.4}>
              {topValue + ' ' + this.props.unit}
            </Text> */}

                        {data.map(item => (
                            <Text
                                key={'label' + item.label}
                                fontSize="8"
                                x={x(item.label) - 5}
                                textAnchor="middle"
                                y="10"
                                fill="black"
                                fillOpacity={0.4}
                            >{item.label}</Text>
                        ))}
                        {/* top axis */}
                        {/* <Line
            x1="0"
            y1={y(topValue) * -1}
            x2={graphWidth}
            y2={y(topValue) * -1}
            stroke={colors.axis}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
          /> */}

                        {/* middle axis */}
                        {/* <Line
            x1="0"
            y1={y(middleValue) * -1}
            x2={graphWidth}
            y2={y(middleValue) * -1}
            stroke={colors.axis}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
          /> */}

                        {/* bottom axis */}
                        {/* <Line
            x1="0"
            y1="2"
            x2={graphWidth}
            y2="2"
            stroke={colors.axis}
            strokeWidth="0.5"
          /> */}

                        {/* bars */}
                        {data.map(item => (
                            <Rect
                                key={'bar' + item.label}
                                x={x(item.label) - (GRAPH_BAR_WIDTH * 2)}
                                y={y(item.gastos.value) * -1}
                                rx={2.5}
                                width={GRAPH_BAR_WIDTH}
                                height={y(item.gastos.value)}
                                fill={item.activo === true ? colors.gastos : colors.default}
                            />
                        ))}
                        {data.map(item => (
                            <Rect
                                key={'bar' + item.label}
                                x={x(item.label) - (GRAPH_BAR_WIDTH / 2)}
                                y={y(item.ingresos.value) * -1}
                                rx={2.5}
                                width={GRAPH_BAR_WIDTH}
                                height={y(item.ingresos.value)}
                                fill={item.activo === true ? colors.ingresos : colors.default}
                            ></Rect>
                        ))}



                        {/* labels */}
                        {/* {data.map(item => (
            <Text
            key={'label' + item.label}
            fontSize="8"
            x={x(item.label)/2}
            y="9"
            textAnchor="middle">{item.label}12</Text>
          ))}
           */}
                    </G>
                </Svg>
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => { this.scroll.scrollTo({ x: 0 }) }}>
                    <Entypo name="chevron-left" color={Colors.Texto3} size={20} style={{ right: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.scroll.scrollTo({ x: screenWidth }) }} >
                    <Entypo name="chevron-right" color={Colors.Texto3} size={20} style={{ right: 5 }} />
                </TouchableOpacity>
            </View>
            {/* <Button label="Screen 3" onPress={() => { this.scroll.scrollTo({ x: screenWidth * 2 }) }} /> */}
        </View>
        )
    }
}