import React, {useRef} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Toast from 'react-native-easy-toast';

//Component
import EditForm from '../../components/account/EditForm';

export default function ProfileEdit({navigation, route}) {
  const {email, userInfo} = route.params;
  const toasRef = useRef();
  //console.log('MAIL', email);
  //console.log('USER_INFO', JSON.parse(userInfo));
  return (
    <SafeAreaView style={styles.container}>
      <EditForm email={email} toasRef={toasRef} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
