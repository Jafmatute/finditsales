import React from 'react';
import color from 'color';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from 'react-native-paper';

//animaciones
import overlay from '../context/overlay';

//Screens
import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Sales from '../screens/Sales';

const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
  const theme = useTheme();

  const tabBarColor = theme.dark
    ? overlay(6, theme.colors.surface)
    : theme.colors.surface;
  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="home"
        backBehavior="initialRoute"
        shifting={true}
        activeColor={theme.colors.primary}
        inactiveColor={color(theme.colors.text).alpha(0.6).rgb().string()}
        sceneAnimationEnabled={false}>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: 'home-account',
            tabBarColor,
          }}
        />

        <Tab.Screen
          name="notification"
          component={Notification}
          options={{
            tabBarIcon: 'bell-outline',
            tabBarColor,
          }}
        />
        <Tab.Screen
          name="sale"
          component={Sales}
          options={{
            tabBarIcon: 'shopping-outline',
            tabBarColor,
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
};

export default BottomTab;
