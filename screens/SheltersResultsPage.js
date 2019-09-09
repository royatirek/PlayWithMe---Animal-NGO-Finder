import React, { Component } from 'react';
import { ScrollView, View, StyleSheet} from 'react-native';



import Card from "../components/Card"
import Colors from '../constants/Colors';
import sheltersService from '../services/sheltersService';


import {saveSortedJSON} from '../actions';
import {connect} from 'react-redux';


class SheltersResultsPage extends Component {
  static navigationOptions = {
    title: 'Play With Me - Find animal NGO',
    headerLeft: null,
    headerStyle: {
      backgroundColor: Colors.headerGrey
      },
  };



  
  componentWillMount() {

    sheltersService()
      .then(response=>{
        if(JSON.stringify(response)!=="{}"){
        arrD = this.getSortedArray(response);
        this.props.saveSortedJSON(arrD);
        }
      
      });
  }

  getSortedArray(response) {

   
    const curr_lat = this.props.curr_lat;
    const curr_long = this.props.curr_long;
    arrD = response;
    if(arrD!="{}"){
      for(ob in arrD){
        arrD[ob]["dist"] = this.getDistanceFromLatLonInKm(curr_lat,curr_long,arrD[ob]["lat"],arrD[ob]["long"]);
      }
          arrD.sort(function(a,b){
            if(parseInt(a.dist)==parseInt(b.dist))
              return 0;
            else if(parseInt(a.dist)<parseInt(b.dist))
              return -1;
            else
              return 1;
          })
    }
    for(let i in  arrD){
      arrD[i]["key"]=i;
    }
    return arrD;

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

  navigateToDetails=(idex)=>{
    // console.log("key on shelters page from card "+idex)
    this.props.navigation.navigate({
        routeName: "Details",
        params: {idex:idex}
        
    }
    );
  }


  getCurrentDay(key){
    let d  = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let timings = this.props.sheltersNearby[key]["operation"];
    // console.log("timings "+timings);
    for(i in timings){
      if(timings[i].indexOf(day)!=-1)
        return timings[i];
    }
    return day;
  }
 

  // whenever state is set, render is called
  render() {

    return (
      <View style={styles.mainScreen}>
      {/* {this.props.navigation.navigate('Details')} */}
        <ScrollView>
          {this.props.sheltersNearby!="{}" && this.props.sheltersNearby.map(
            (list)=>
                
                  <Card key={list["key"]}  idex = {list["key"]} name = {list["name"]} 
                        lat = {list["lat"]} long={list["long"]} dist = {list["dist"]}
                        day= {this.getCurrentDay(list.key)} navigateToDetails={this.navigateToDetails} />
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
    paddingBottom:8
  }
});

function mapDispatchToProps(dispatch){
  return {
    saveSortedJSON : (json) => dispatch(saveSortedJSON(json))
  };
}

function mapStateToProps(state){
  //return the thing that you want to the expose
  // debugger;
  return {sheltersNearby:state.json, curr_lat:state.lat, curr_long:state.long}
}
  

export default connect(mapStateToProps, mapDispatchToProps)(SheltersResultsPage);

