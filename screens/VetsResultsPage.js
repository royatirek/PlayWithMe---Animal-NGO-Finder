import React, { Component } from 'react';
import { ScrollView, Platform, Text, View, StyleSheet, Button, TouchableOpacity, Image, Linking} from 'react-native';



import Card from "../components/Card"
import Colors from '../constants/Colors';
import sheltersService from '../services/sheltersService';

class VetsResultsPage extends Component {
  static navigationOptions = {
    title: 'Vets Nearby',
    headerLeft: null,
    headerStyle: {
      backgroundColor: Colors.headerGrey
      },
  };
  state = {
    sheltersNearby: "{}"
  };

  
  componentWillMount() {

    sheltersService()
      .then(response=>{
        if(JSON.stringify(response)!=="{}"){
        arrD = this.getSortedArray(response);
        this.setState({sheltersNearby:arrD});

        }
      
      });
  }

  getSortedArray(response) {

    const { navigation } = this.props;
    const curr_lat = navigation.getParam('lat');
    const curr_long = navigation.getParam('long');
    arrD = response;
    if(arrD!="{}"){
      for(ob in arrD){
        arrD[ob]["dist"] = this.getDistanceFromLatLonInKm(curr_lat,curr_long,arrD[ob]["lat"],arrD[ob]["long"]);
      }
          arrD.sort(function(a,b){
            if(a.dist==b.dist)
              return 0;
            else if(a.dist<b.dist)
              return -1;
            else
              return 1;
          })
    }
    return arrD;

  }

  navigateToDetails=()=>{
    this.props.navigation.navigate('Details');
  }


  getDistanceFromLatLonInKm(lat2,lon2,lat1,lon1) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d.toFixed(1);
  }
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }


  // whenever state is set, render is called
  render() {

    const { navigation } = this.props;
    const curr_lat = navigation.getParam('lat');
    const curr_long = navigation.getParam('long');
   




    console.log('results curr_lat, curr_long: ', curr_lat, curr_long);
    return (
      <View style={styles.mainScreen}>
        <ScrollView>
          {this.state.sheltersNearby!="{}" && this.state.sheltersNearby.map(
            (list)=>
                  <Card name = {list["name"]} lat = {list["lat"]} long={list["long"]} dist = {list["dist"]}
                    navigateToDetails={()=>this.navigateToDetails()}/>
          )}
        </ScrollView>
      </View>
    );
  }
}



// export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({

  mainScreen: {
    flex: 1,
    backgroundColor : Colors.backgroundGrey,
  }
});
//createAppContainer returns a react component
export default VetsResultsPage;
