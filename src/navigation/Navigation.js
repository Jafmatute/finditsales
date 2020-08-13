import React from 'react';
import {Text, Platform, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'react-native-paper';

const Stack = createStackNavigator();

//screens
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import Subscription from '../screens/auth/Subscription';
import Splash from '../screens/auth/Splash';

const Navigation = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      //headerMode="none"
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
      <Stack.Screen name="splash" options={{title: ''}} component={Splash} />
      <Stack.Screen
        name="signin"
        options={{
          title: '',
          headerLeft: () => (
            <View style={{marginLeft: Platform.OS === 'ios' ? 150 : 120}}>
              <Text
                style={{color: '#007dd7', fontSize: 20, fontWeight: 'bold'}}>
                Iniciar Sesión
              </Text>
            </View>
          ),
        }}
        component={SignIn}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: 'Inicio de Sesión',
          headerBackTitle: 'Atras',
        }}
        component={SignUp}
      />
      <Stack.Screen
        name="subscribe"
        component={Subscription}
        options={{
          title: 'Findit',
          headerBackTitle: 'Atras',
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
