import React, {useRef} from 'react';
import {StyleSheet, KeyboardAvoidingView} from 'react-native';
import Toast from 'react-native-easy-toast';
//component
import OffertForm from '../../components/offerts/OffertForm';

export default function Offert({navigation, route}) {
  const toasRef = useRef();
  const toasRefSuccess = useRef();
  const {id, uidClient} = route.params;

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <OffertForm
        toasRef={toasRef}
        toasRefSuccess={toasRefSuccess}
        id={id}
        uidClient={uidClient}
        navigation={navigation}
      />
      <Toast
        ref={toasRef}
        style={{backgroundColor: 'red'}}
        position="top"
        positionValue={300}
        fadeInDuration={500}
        fadeOutDuration={700}
        opacity={0.8}
      />
      <Toast
        ref={toasRefSuccess}
        style={{backgroundColor: 'green'}}
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
