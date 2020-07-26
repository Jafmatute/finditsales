import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

export default function AvatarText(props) {
  const {size} = props;
  const [avatar, setAvatar] = useState('');
  useEffect(() => {
    (async () => {
      let mail;
      mail = null;
      try {
        mail = await AsyncStorage.getItem('email');
        setAvatar(mail);
      } catch (error) {}
    })();
  }, []);
  return (
    <Avatar.Text size={size} label={avatar.substr(0, 2).toLocaleUpperCase()} />
  );
}

const styles = StyleSheet.create({});
