import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers/index'

import AppNavigator from './navigators/AppNavigator';

const store = createStore(rootReducer,{json:'{}', lat:null,long:null});



class App extends Component {
// whenever state is set, render is called
  render() {
    console.log('App.js');
    return (
      <Provider store={store}>
          <AppNavigator/>
      </Provider>

    );
  }
}
export default App;