import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

//screens

import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';

const Navigation = ({navigation}) => (
  <Stack.Navigator headerMode="Login">
    <Stack.Screen name="signin" component={SignIn} />
    <Stack.Screen name="signup" component={SignUp} />
  </Stack.Navigator>
);

export default Navigation;
