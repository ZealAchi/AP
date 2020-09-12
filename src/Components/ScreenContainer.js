import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native'
import { Block } from '../UI/Block'
import Colors from '../UI/Colors'
import { MyStatusBar } from '../UI/MyStatusBar'
export const ScreenContainer = ({ scrollView, children, backgroundColor, barBackgroundColor, margin, padding, NoMyStatusBar, backgroundColorScrollView }) => {


     return (
          <>
               {scrollView ? <ScrollView overflow={'hidden'} removeClippedSubviews={true} style={{ backgroundColor: backgroundColorScrollView ? backgroundColorScrollView : Colors.Secondary }}>
                    <Block backgroundColor={backgroundColor ? backgroundColor : Colors.Primary} style={{ margin: margin ? 10 : 0, padding: padding ? 10 : 0 }}>
                         {children}
                    </Block></ScrollView> : <Block backgroundColor={backgroundColor ? backgroundColor : Colors.Primary} style={{ margin: margin ? 0 : 0, padding: padding ? 10 : 0 }}>
                         {children}
                    </Block>}
          </>
     )
}