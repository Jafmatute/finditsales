import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native';
import Toast from 'react-native-easy-toast';
//component
import {Logo} from '../../components/Logo';
import SubscribeForm from '../../components/auth/SubscribeForm';
//custom
import AuthStyle from '../../customs/AuthScreenStyles';

export default function Subscription() {
  const toasRef = useRef();
  return (
    <SafeAreaView style={AuthStyle.container}>
      <Logo />
      <SubscribeForm toasRef={toasRef} />
      <Toast
        ref={toasRef}
        position="top"
        positionValue={300}
        fadeInDuration={500}
        fadeOutDuration={700}
        opacity={0.8}
      />
    </SafeAreaView>
  );
}
