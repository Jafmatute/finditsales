import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
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
export const LogoSplash = () => {
  return (
    <View style={styles.headerS}>
      <Image
        animation="bounceIn"
        duration={1500}
        source={logo}
        style={styles.logoSplash}
        resizeMode="stretch"
      />
      <Text style={styles.texLogo}>Cargando...</Text>
    </View>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.12;
const height_logoS = height * 0.16;
const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    top: 50,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  headerS: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    top: 0,
  },
  logoSplash: {
    height: height_logoS,
    width: height_logoS,
    marginBottom: 10,
  },
  texLogo: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
