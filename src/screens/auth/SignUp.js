import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native';
import Toast from 'react-native-easy-toast';

//componentes
import RegisterForm from '../../components/auth/RegisterForm';
import {Logo} from '../../components/Logo';
//custom
import AuthStyle from '../../customs/AuthScreenStyles';

export default function SignUp({navigation}) {
  const toasRef = useRef();
  return (
    <SafeAreaView style={AuthStyle.container}>
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
