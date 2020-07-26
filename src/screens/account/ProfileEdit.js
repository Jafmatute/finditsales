import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

//Component
import EditForm from '../../components/account/EditForm';

export default function ProfileEdit({navigation, route}) {
  const {email, userInfo} = route.params;
  //console.log('MAIL', email);
  //console.log('USER_INFO', JSON.parse(userInfo));
  return (
    <SafeAreaView style={styles.container}>
      <EditForm email={email} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
