import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Appbar, Avatar, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
//Tabs navigators
import BottomTab from './BottomTab';

//Screens
import Setting from '../screens/Setting';
import Support from '../screens/Support';
import Profile from '../screens/account/Profile';

const Stack = createStackNavigator();

function StackNavigation() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="FeedList"
      headerMode="screen"
      screenOptions={{
        header: ({scene, previous, navigation}) => {
          const {options} = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          return (
            <Appbar.Header theme={{colors: {primary: theme.colors.surface}}}>
              {previous ? (
                <Appbar.BackAction
                  onPress={navigation.goBack}
                  color={theme.colors.primary}
                />
              ) : (
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() => {
                    navigation.openDrawer();
                  }}>
                  <Avatar.Image
                    size={40}
                    source={{
                      uri:
                        'https://api.adorable.io/avatars/285/abott@adorable.png',
                    }}
                  />
                </TouchableOpacity>
              )}
              <Appbar.Content
                title={
                  title === 'home' ? (
                    <Icon
                      style={{marginRight: 10}}
                      name="home"
                      size={40}
                      color={theme.colors.primary}
                    />
                  ) : (
                    title
                  )
                }
                titleStyle={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                }}
              />
            </Appbar.Header>
          );
        },
      }}>
      <Stack.Screen
        name="home"
        component={BottomTab}
        options={({route}) => {
          console.log('!@# options', {route});
          const routeName = route.state
            ? route.state.routes[route.state.index].name
            : 'Inicio';
          return {headerTitle: routeName};
        }}
      />
      <Stack.Screen name="setting" component={Setting} />
      <Stack.Screen name="support" component={Support} />
      <Stack.Screen name="profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default StackNavigation;