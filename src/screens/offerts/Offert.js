import React, {useRef} from 'react';
import {StyleSheet, KeyboardAvoidingView} from 'react-native';
import Toast from 'react-native-easy-toast';
//component
import OffertForm from '../../components/offerts/OffertForm';

export default function Offert({navigation, route}) {
  const toasRef = useRef();
  const {id} = route.params;
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <OffertForm toasRef={toasRef} id={id} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
