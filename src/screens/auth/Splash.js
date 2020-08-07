import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LogoSplash} from '../../components/Logo';
export default function Splash({navigation}) {
  console.log('SPLASH', navigation);
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('signin');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <LogoSplash />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 10,
  },
});
