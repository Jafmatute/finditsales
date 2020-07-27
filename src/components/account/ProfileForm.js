import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  Subheading,
  Badge,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import firebase
import firebase from '../../utils/firebase';

import AvatarText from './AvatarText';

//Logic
export default function ProfileForm() {
  const navigation = useNavigation();
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  });

  //console.log(user);
  return (
    <>
      {/*Información de inicio de sesión*/}
      <View style={[styles.userInfoSection]}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <AvatarText size={70} />
          <View style={{marginLeft: 20}}>
            <Title style={styles.title}>
              {user.displayName ? user.displayName : ''}
            </Title>
            <Caption style={styles.caption}>{user.email}</Caption>
          </View>
        </View>

        <TouchableRipple
          style={styles.btnEdit}
          onPress={() =>
            navigation.navigate('profileedit', {
              email: user.email,
              userInfo: JSON.stringify(user),
            })
          }>
          <Subheading style={{fontWeight: 'bold'}}>Editar Perfil</Subheading>
        </TouchableRipple>
      </View>

      {/*Informaciòn usuario*/}
      <View
        style={[
          styles.userInfoSection,
          {borderBottomColor: '#dddddd', borderBottomWidth: 1},
        ]}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={{color: '#777777', marginLeft: 20}}>Ciudad</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{color: '#777777', marginLeft: 20}}>
            {user.phoneNumber ? user.phoneNumber : '----'}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{color: '#777777', marginLeft: 20}}>{user.email}</Text>
        </View>
      </View>

      {/* Información usuario y servicios de la app */}
      <ScrollView>
        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="credit-card" color="#8e459e" size={25} />
              <Text style={styles.menuItemText}>Pagos</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="share-outline" color="#8e459e" size={25} />
              <Text style={styles.menuItemText}>Compartir</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="account-check-outline" color="#8e459e" size={25} />
              <Text style={styles.menuItemText}>Soporte</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="cogs" color="#8e459e" size={25} />
              <Text style={styles.menuItemText}>Configuraciones</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
  },
  btnEdit: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 10,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 2,
    borderTopColor: '#dddddd',
    borderTopWidth: 2,
  },
  accountTitle: {
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: -10,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingTop: 10,
  },

  menuWrapper: {
    marginTop: -20,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
