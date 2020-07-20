import React from 'react';
import color from 'color';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme, Portal, FAB} from 'react-native-paper';
import {useSafeArea} from 'react-native-safe-area-context';
import {useIsFocused, RouteProp} from '@react-navigation/native';

//animaciones
import overlay from '../context/overlay';

//Screens
import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Sales from '../screens/Sales';

const Tab = createMaterialBottomTabNavigator();

function BottomTab() {
  const theme = useTheme();
  const safeArea = useSafeArea();
  const isFocused = useIsFocused();

  const tabBarColor = theme.dark
    ? overlay(6, theme.colors.surface)
    : theme.colors.surface;
  return (
    <>
      <Tab.Navigator
        initialRouteName="home"
        backBehavior="initialRoute"
        shifting={true}
        activeColor={theme.colors.primary}
        inactiveColor={color(theme.colors.text).alpha(0.6).rgb().string()}
        sceneAnimationEnabled={true}>
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
    </>
  );
}

export default BottomTab;
