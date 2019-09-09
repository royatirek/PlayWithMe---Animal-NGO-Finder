import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TarIconResult';
import SheltersScreen from '../screens/SheltersResultsPage';
import VetsScreen from '../screens/VetsResultsPage'
import DetailsPage from '../screens/DetailsPage';

const SheltersStack = createStackNavigator({
  Shelters: SheltersScreen,
  Details : DetailsPage,
});



SheltersStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if ( routeName == 'Details' ) {
      tabBarVisible = false
  }

  return {
      tabBarVisible,
      tabBarLabel: 'Shelters',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
        focused={focused}
        name={'ios-navigate'}
        />
  ),
  }
}

const VetsStack = createStackNavigator({
  Vets: VetsScreen,
});

VetsStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if ( routeName == 'Details' ) {
      tabBarVisible = false
  }

  return {
      tabBarVisible,
      tabBarLabel: 'Vets',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-medkit' : 'md-medkit'}
        />
      ),
  }
}




export default createBottomTabNavigator({
  SheltersStack,
  VetsStack,
});
