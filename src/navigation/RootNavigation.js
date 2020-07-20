import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

//Drawer content
import DrawerContent from './DrawerContent';
import StackNavigation from './StackNavigation';

//screens
import Navigation from '../navigation/Navigation';

const Drawer = createDrawerNavigator();

const RootNavigation = () => {
  const [user, setUser] = useState(true);
  return (
    <NavigationContainer>
      {user ? (
        <Navigation />
      ) : (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}>
          <Drawer.Screen name="signin" component={StackNavigation} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
};
export default RootNavigation;
