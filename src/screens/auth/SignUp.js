import React, {useRef} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Toast from 'react-native-easy-toast';

//componentes
import RegisterForm from '../../components/auth/RegisterForm';
import {Logo} from '../../components/Logo';

export default function SignUp({navigation}) {
  const toasRef = useRef();
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <RegisterForm toasRef={toasRef} />
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
    marginVertical: 190,
  },
});
