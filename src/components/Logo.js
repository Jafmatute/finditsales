import React from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';
//imagen logo
import logo from '../assets/img/findit-2.png';

export const Logo = () => {
  return (
    <View style={styles.header}>
      <Image
        animation="bounceIn"
        duration={1500}
        source={logo}
        style={styles.logo}
        resizeMode="stretch"
      />
    </View>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.12;

const styles = StyleSheet.create({
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -200,
    backgroundColor: '#fff',
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
});
