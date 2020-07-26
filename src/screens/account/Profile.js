import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

//component
import ProfileForm from '../../components/account/ProfileForm';
export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
