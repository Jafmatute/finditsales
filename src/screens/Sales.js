import React, {useState, useEffect} from 'react';
import color from 'color';
import {StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useTheme} from 'react-native-paper';
import overlay from '../context/overlay';

//screen
import Active from './offerts/Active';
import History from './offerts/History';

const initialLayout = {width: Dimensions.get('window').width};

export default function Sales() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'active', title: 'ACTIVOS'},
    {key: 'history', title: 'HISTORIAL'},
  ]);

  const theme = useTheme();

  const renderScene = SceneMap({
    active: Active,
    history: History,
  });
  const tabBarColor = theme.dark
    ? overlay(4, theme.colors.surface)
    : theme.colors.surface;

  const rippleColor = theme.dark
    ? color(tabBarColor).lighten(0.5)
    : color(tabBarColor).darken(0.2);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: theme.colors.primary}}
      style={{backgroundColor: tabBarColor, shadowColor: theme.colors.text}}
      labelStyle={{color: theme.colors.primary}}
      pressColor={rippleColor}
    />
  );

  return (
    <React.Fragment>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
