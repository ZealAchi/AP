/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Dimensions,
    Animated,
    Image,
} from 'react-native';
import React, { useState } from 'react';

import Svg,{ Circle, Path } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

function TabBarItem(props){
    let child = props.children;

        if (child.length && child.length > 0) {
            throw new Error('onlyChild must be passed a children with exactly one child.');
        }

        return (
            <View style={{flex: 1}}>
                {child}
            </View>
        );
} 
export default function TabBar(props){
    if (props.children.length !== 4) {
        throw new Error('Three tab should be work.');
    }
    const [state,setState]=useState({
        selectedIndex: 1,
            defaultPage: 1,
            navFontSize: 12,
            navTextColor: 'rgb(148, 148, 148)',
            navTextColorSelected: 'rgb(51, 163, 244)',
            circleRadius: new Animated.Value(546),
            pathD: new Animated.Value(357),
            pathX: '257',
            pathY: '575',
            pathA: '589',
            pathB: '606',
            // showIcon: true,
    })
    

    // state.circleRadius.addListener( (circleRadius) => {
    //     _myCircle.setNativeProps({ cx: circleRadius.value.toString() });
    // })

    // state.pathD.addListener( a => {
    //     setState({
    //         pathX: a.value.toString(),
    //         pathY: (318 + parseInt(a.value)).toString(),
    //         pathA: (330 + parseInt(a.value)).toString(),
    //         pathB: (350 + parseInt(a.value)).toString(),
    //     });
    // })
    // }
    const { children, bgNavBar, bgNavBarSelector, stroke } = props;
        const {
            selectedIndex,
            navFontSize,
            navTextColor,
            navTextColorSelected,
            showIcon,
        } = state;

        let _d;
        if (state.pathY == '' && state.pathA == '' && state.pathB == ''){
            _d = '1c-1.1-17.2,12.7-31.7,29.9-31.7h21.3c16.6';
        } else {
            _d = `M30,60h${state.pathX}.3c17.2,0,31,14.4,30,31.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1c-1.1-17.2,12.7-31.7,29.9-31.7h21.3c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z`;
        }
        return (
            <View style={[styles.container,props.style, children[state.selectedIndex].props.screenBackgroundColor ?
                children[state.selectedIndex].props.screenBackgroundColor :
                '#008080',
            ]}>

                {children[selectedIndex]}

                <View style={[styles.content]}>
                    <View style={styles.subContent}>
                        {
                            React.Children.map(children,  (child,i) => {
                                const imgSrc = selectedIndex === i && showIcon ?
                                    <View style={styles.circle}>
                                        <Image
                                            style={styles.navImage}
                                            resizeMode="cover"
                                            source={child.props.selectedIcon}
                                        />
                                    </View>
                                :
                                    <Image
                                        style={styles.navImage}
                                        resizeMode="cover"
                                        source={child.props.icon}
                                    />;
                                return (
                                    <TouchableHighlight
                                        key={i}
                                        underlayColor={'transparent'}
                                        style={styles.navItem}
                                        onPress={() => update(i)}
                                    >
                                        {imgSrc}
                                    </TouchableHighlight>
                                );
                            })
                        }
                    </View>
                    <Svg version="1.1" id="bottom-bar" x="0px" y="0px" width="100%" height="100" viewBox="0 0 1092 260" space="preserve">
                        {/* <AnimatedPath
                            fill={bgNavBar ? bgNavBar : '#f0f0f0'}
                            stroke={stroke ? stroke : '#f0f0f0'}
                            d={ `M30,60h${state.pathX}.3c17.2,0,31,14.4,30,31.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1C${state.pathY}.7,74.5,${state.pathA}.5,60,${state.pathB}.7,60H1062c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z`
                        }/> */}
                        <AnimatedCircle
                            // ref={ ref => _myCircle = ref }
                            fill={bgNavBarSelector ? bgNavBarSelector : '#f0f0f0'}
                            stroke={stroke ? stroke : '#f0f0f0'}
                            cx="546" cy="100"
                            r="100"
                        />
                    </Svg>
                </View>
            </View>
        );
        function update(index) {
            let that = this;
            that.setState({
                selectedIndex: index,
                showIcon: false,
            });
            if (index === 0){
                Animated.spring( that.state.pathD, { toValue: 22,duration: 10, friction: 10 }).start();
                setTimeout(function() {
                    that.setState({
                        showIcon: true,
                    });
                }, 100);
                Animated.spring( that.state.circleRadius, { toValue: 211, friction: 10 } ).start();
            } else if (index === 2){
                Animated.spring( that.state.pathD, { toValue: 691,duration: 10, friction: 10 }).start();
                setTimeout(function() {
                    that.setState({
                        showIcon: true,
                    });
                }, 100);
                Animated.spring( that.state.circleRadius, { toValue: 880, friction: 10 } ).start();
            } else {
                Animated.spring( that.state.pathD, { toValue: 357,duration: 10, friction: 10 }).start();
                setTimeout(function() {
                    that.setState({
                        showIcon: true,
                    });
                }, 100);
                Animated.spring( that.state.circleRadius, { toValue: 546, friction: 10 } ).start();
            }
        }
}

TabBar.Item = TabBarItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // overflow: 'hidden',
    },
    content: {
        flexDirection:'column',
        zIndex: 0,
        width: (Dimensions.get('window').width - 30),
        marginBottom: '4%',
        left: '4%',
        right: '4%',
        position: 'absolute',
        bottom: '1%',
    },
    subContent: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        zIndex: 1,
        position: 'absolute',
        bottom: 5,
    },
    navItem: {
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
        alignItems: 'center',
        zIndex: 0,
    },
    navImage: {
        width: 45,
        height: 45,
    },
    circle: {
        bottom: 18,
    },
});


