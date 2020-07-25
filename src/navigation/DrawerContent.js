import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

//context
import {AuthContext} from '../context/authContext';

export default function DrawerContent(props) {
  const {navigation} = props;
  const {signOut} = useContext(AuthContext);

  const onchangeScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri: 'https://api.adorable.io/avatars/285/abott@adorable.png',
                }}
                size={50}
              />
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'column',
                }}>
                <Title style={styles.title}>Josue A. Flores </Title>
                <Caption style={styles.caption}>jafmatute@gmail.com</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Inicio"
              icon={({color, size}) => (
                <Icon name="home" color={color} size={size} />
              )}
              onPress={() => onchangeScreen('home')}
            />
            <DrawerItem
              label="Perfil"
              icon={({color, size}) => (
                <Icon name="user" color={color} size={size} />
              )}
              onPress={() => onchangeScreen('profile')}
            />

            <DrawerItem
              label="Ubicaciones"
              icon={({color, size}) => (
                <Icon name="bookmark" color={color} size={size} />
              )}
              onPress={() => {}}
            />
            <DrawerItem
              label="Configuraciones"
              icon={({color, size}) => (
                <Icon name="cogs" color={color} size={size} />
              )}
              onPress={() => onchangeScreen('setting')}
            />
            <DrawerItem
              label="Soporte"
              icon={({color, size}) => (
                <Icon name="support" color={color} size={size} />
              )}
              onPress={() => onchangeScreen('support')}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={() => {}}>
              <View style={styles.preference}>
                <Text>Tema</Text>
                <View pointerEvents="none">
                  <Switch value={true} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Sing Up"
          onPress={() => signOut()}
          icon={({color, size}) => (
            <Icon name="sign-in" color={color} size={size} />
          )}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
