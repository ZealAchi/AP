import {View,ActivityIndicator,StyleSheet,Text} from 'react-native'
import React from 'react'
export function FooterList(props) {
    const { isLoading,type } = props;
  
    if (isLoading) {
      return (
        <View style={styles.loadingAny}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.notFound}>
          <Text>No hay más {type}.</Text>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    loadingAny: {
      marginTop: 20,
      alignItems: "center"
    },
    notFound: {
      marginTop: 10,
      marginBottom: 20,
      alignItems: "center"
    }
  });