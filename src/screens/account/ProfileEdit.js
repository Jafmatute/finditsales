import React, {useRef} from 'react';
import {StyleSheet, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import Toast from 'react-native-easy-toast';

//Component
import EditForm from '../../components/account/EditForm';

export default function ProfileEdit({navigation, route}) {
  const {userInfo} = route.params;
  const toasRef = useRef();

  //console.log('USER_INFO', JSON.parse(userInfo));
  return (
    <KeyboardAvoidingView behavior="heigth" style={styles.container}>
      <EditForm toasRef={toasRef} userInfo={userInfo} />
      <Toast
        ref={toasRef}
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
