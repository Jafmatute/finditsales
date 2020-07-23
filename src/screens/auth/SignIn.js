import React, {useRef} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Toast from 'react-native-easy-toast';

//componentes
import LoginForm from '../../components/auth/LoginForm';
import {Logo} from '../../components/Logo';

export default function SingIn({navigation}) {
  const toasRef = useRef();
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <LoginForm toasRef={toasRef} navigation={navigation} />
      <Toast
        ref={toasRef}
        style={{backgroundColor: 'red'}}
        position="top"
        positionValue={300}
        fadeInDuration={500}
        fadeOutDuration={700}
        opacity={0.8}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginVertical: 180,
  },
});
