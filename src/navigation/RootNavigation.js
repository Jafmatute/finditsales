import React, {useEffect, useMemo, useReducer} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
//Drawer content
import DrawerContent from './DrawerContent';
import StackNavigation from './StackNavigation';

//screens
import Navigation from '../navigation/Navigation';

//Context
import {AuthContext} from '../context/authContext';

const Drawer = createDrawerNavigator();

const RootNavigation = () => {
  const initialLoginState = {
    isLoading: false,
    userToken: null,
    email: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
        break;
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          email: action.uid,
          isLoading: false,
        };
        break;
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          email: null,
          isLoading: false,
        };
        break;
      case 'REGISTER':
        return {
          ...prevState,
          userToken: action.token,
          email: action.uid,
          isLoading: false,
        };
        break;
      default:
        break;
    }
  };
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (userInfo) => {
      //const {additionalUserInfo, credential, operationType, user} = userInfo;
      const {user} = userInfo;
      const userToken = String(user.uid);
      const email = user.email;
      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('email', email);
      } catch (error) {
        console.log('error asyncStorage_signIn', error);
      }
      console.log('user token', userToken);
      dispatch({type: 'LOGIN', uid: email, token: userToken});
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('email');
      } catch (error) {
        console.log('error AsyncStorage_singOut', error);
      }
      dispatch({type: 'LOGOUT'});
    },
    signUp: async (userInfo) => {
      const {user} = userInfo;
      const userToken = user.uid;
      const email = user.email;
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (error) {
        console.log('error asyncStorage_signIn', error);
      }
      dispatch({type: 'REGISTER', uid: email, token: userToken});
    },
  }));

  useEffect(() => {
    (async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (error) {
        console.log('error AsyncStorage_useEffect', error);
      }
      console.log('user token useEffect', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    })();
  }, []);

  if (loginState.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#08d4c4" />
      </View>
    );
  }
  console.log('My token', loginState.userToken);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="signin" component={StackNavigation} />
          </Drawer.Navigator>
        ) : (
          <Navigation />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export default RootNavigation;
