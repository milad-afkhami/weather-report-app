import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import homeScreen from './screens/homeScreen.js';
import searchScreen from './screens/searchScreen.js';

const MainNavigator = createBottomTabNavigator({
  Home: { screen: homeScreen },
  Search: { screen: searchScreen }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  },
  tabBarOptions: {
    style: {
      paddingBottom: 15
    }
  }
});

const App = createAppContainer(MainNavigator);

export default App;