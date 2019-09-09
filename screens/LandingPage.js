import React, { Component } from 'react';
import {  Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import {PermissionsAndroid, Location} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';


import {saveCurrentLocation} from '../actions';
import {connect} from 'react-redux';


class LandingPage extends Component {
  static navigationOptions = {
    header:null
  };
  state = {
    // to show error message in the textview at the end of the landing page
    errorMessage: null,
    // to check the permission of the location
    isLocationEnabled: true,
  };

  componentWillMount() {

      this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await PermissionsAndroid.askAsync(PermissionsAndroid.Location);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
        isLocationEnabled: false,

      });}
    else{
      this.setState({
        isLocationEnabled: true,
        errorMessage: null
      });  
      this._getLocationAfterStatusIsTrue();

    }
    
  };

   _getLocationAfterStatusIsTrue = async () => {
      let location = await Location.getCurrentPositionAsync({});
      let long = location['coords']['longitude'];
      let lat  = location['coords']['latitude'];
      this.props.saveCurrentLocation(lat,long);
      // debugger;
      // this.setState({lat:lat, long:long});

  }



locationAccessView = () => {
    let homePageText = "Your location is needed for getting nearby locations. Click here to try again.";

    return (
      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
      justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={this._getLocationAsync}>
                <Text style={{padding:8, textAlign:"center", fontSize:16}}>
                  {!this.state.isLocationEnabled && homePageText}
                </Text>
            </TouchableOpacity>
      </View>
    );
  }


loadingScreen = () => {
    return (
    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
            justifyContent: 'center', alignItems: 'center'}}>
            
            <ActivityIndicator size="large" color="#AAAAAA" />

    </View>
    );
}




  // whenever state or props is set, render is called
  render() { 
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.props.lat && this.props.long) {
      text = "Got your location"
      styles.imageStyle.opacity = 1;

      setTimeout(() => {
        this.props.navigation.navigate({
            routeName: "Shelters"
        } 
       ); 
      }
       , 100)}


    return (
      
      <View style={styles.mainScreen}>
        <Image
            source={require('../images/dogOnLandingPage.jpg')} 
            style = {styles.imageStyle}/>
            {
              this.state.isLocationEnabled ? 
              this.loadingScreen():this.locationAccessView()
            }
            
            <View style={styles.locationText}>
                    <ScrollView>
                        <Text>{text}</Text>
                    </ScrollView>
            </View>
      </View>
    );
  }
}



function mapDispatchToProps(dispatch){
  return {
    saveCurrentLocation : (lat,long) => dispatch(saveCurrentLocation(lat,long))
  };
}

function mapStateToProps(state){
  //return the thing that you want to the expose
  // debugger;
  return {lat:state.lat,long:state.long}
}
  

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);









const styles = StyleSheet.create({

  mainScreen: {
    flex: 1,
    backgroundColor:'#E6E9F0',
  },
  locationText:{
    position : 'absolute',
    bottom : 0,
    left: 0,
    right :0,
    backgroundColor:'white',
    opacity:0.5,
    height:50,
    padding:8
 },
 notLocationService : {
  flex:1,
  textAlign: 'center', // <-- the magic
  fontWeight: 'bold',
  justifyContent: "center",
  alignItems: "center",
  
 },
imageStyle : {
  width:'100%',
  height:'100%',
  resizeMode:'cover',
  opacity:0.1
}
});

//createAppContainer returns a react component
