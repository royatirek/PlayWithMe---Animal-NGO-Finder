import React, { Component } from 'react';
import { createStackNavigator, createAppContainer,createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import LandingPage from '../screens/LandingPage';
import ResultPageNavigator from './ResultPageNavigator';
import DetailsPage from '../screens/DetailsPage';
import SheltersResultsPage from '../screens/SheltersResultsPage';
const AppNavigate = createSwitchNavigator({

        Landing : LandingPage,
        HomePage:createStackNavigator({
        Shelters: SheltersResultsPage,
        Details : DetailsPage})
       
    })
 ;
    
const AppNavigator = createAppContainer(AppNavigate);

export default AppNavigator;


