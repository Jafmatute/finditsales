import React, {useRef} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import Toast from 'react-native-easy-toast';

//componentes
import LoginForm from '../../components/auth/LoginForm';

//custom
import AuthStyle from '../../customs/AuthScreenStyles';

export default function SingIn({navigation}) {
  const toasRef = useRef();

  return (
    <KeyboardAvoidingView behavior="height" style={AuthStyle.container}>
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
    </KeyboardAvoidingView>
  );
}
