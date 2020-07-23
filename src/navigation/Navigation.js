import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'react-native-paper';

const Stack = createStackNavigator();

//screens
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';

const Navigation = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, //IOS
          elevation: 0, //Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: '#007dd7',
        },
      }}>
      <Stack.Screen
        name="signin"
        options={{title: 'Findit'}}
        component={SignIn}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: 'Findit',
          headerBackTitle: 'Atras',
        }}
        component={SignUp}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
