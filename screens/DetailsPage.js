import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Picker,Image, Linking} from 'react-native';
import Carousel from '../components/Carousel';
import Colors  from '../constants/Colors';

import {connect} from 'react-redux';

import {ScrollView} from 'react-native-gesture-handler';



class DetailsPage extends Component{
    // index of the array on which user clicked 
    idex = this.props.navigation.getParam('idex');

    static navigationOptions = ({ navigation }) => {
        return({
        title: navigation.getParam('pageTitle'),
        headerStyle: {
          backgroundColor: Colors.headerGrey
          }
        })};

    state = {
        day: 'Monday'
    }

    componentDidMount(){
            let d  = new Date();
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let day = days[d.getDay()];
            this.setState({day: day})

            this.props.navigation.setParams({
            pageTitle: this.props.json[this.idex]["name"],
          });
        }
    
 

    render(){
        // console.log("card clicked " + this.props.json[this.idex]["name"]);
        // debugger;
        let arr = this.props.json[this.idex];
        let name = arr["name"];
        let dist = arr["dist"];
        let lat  = arr["lat"];
        let long = arr["long"];
        let address = arr["address"];
        let phone = arr["phone"];
        let operation = arr["operation"];
        let folder = arr["folder"];


        return (
        <View style={{flex:1 }}>
        <ScrollView style ={{ backgroundColor : Colors.backgroundGrey}}>
                <Carousel folder={folder}/>
                <View style={{padding:8}}>
                        <View style={{flexDirection:'row', justifyContent: 'space-between',paddingBottom:8}}>    
                            <View style={{flex:7}}>       
                            <Text style = {styles.textTitle}>{name}</Text>
                            <Text>{dist} Kms away</Text>
                           
                            </View>    
                            {/* <View style={{flexDirection:'row'}}>
                                <Image style={{width:'100%', height:'100%',resizeMode:'contain',flex:1,left:0}} source={require('../images/phone.png')}/>
                                <Text style={{flex:10}}>9876543210</Text>
                            </View> */}
                           <TouchableOpacity style={{justifyContent: 'center',flex:1}} 
                                             onPress={()=>Linking.openURL(`http://maps.google.com/maps?daddr=${lat},${long}`)}>
                              <Image style={{width: 50, height: 50, resizeMode:'contain'}}
                                     source={require('../images/location.png')}/>
                           </TouchableOpacity>     

                        </View>
                        <View style={{width:'100%', height: 50, borderWidth: 2, borderColor: 'white'}}>
                            <Picker
                            selectedValue={this.state.day}
                            style={{width:'100%', height: 50,borderRadius:10, }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({day: itemValue})
                            }>

                            {operation.map((item)=>
                            <Picker.Item key = {item} label={item} value={item.substr(0,item.indexOf(' '))}/>)}

                            </Picker>
                        </View>
                         

                        <View  style={{paddingTop:16}}>
                            <Text style ={{fontWeight:'600'}}>Address</Text>
                            <Text>{address}</Text>
                            <Text/>
                            <Text style ={{fontWeight : '500'}}>Travel by </Text>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={()=>{Linking.openURL(`https://m.uber.com/ul/?client_id=TqC5OlyxiV1dG6GH7hnJPSuceRp9A5fM&action=setPickup&pickup[latitude]=${this.props.curr_lat}&pickup[longitude]=${this.props.curr_long}&pickup[nickname]=You&pickup[formatted_address]=You&dropoff[latitude]=${lat}&dropoff[longitude]=${long}&dropoff[nickname]=${name}&dropoff[formatted_address]=${name}`);}}>
                                <Text style ={{fontSize:32, paddingRight:24}}>Uber</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{paddingTop:16}}>
                            <Text style ={{fontWeight:'600'}}>Phone</Text>
                            <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${phone}`);}}>
                            <Text style ={{fontSize:32}}>{phone}</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{height:160}}>

                        </View>
                        
                        
                </View>
               
               
              
        </ScrollView>
        {/* <TouchableOpacity style ={{backgroundColor:'#2f95dc', position:'absolute',bottom:0,right:0, left:0, padding:8}}>
            <Text style ={{textAlign: 'center',fontSize:20, color:'white', fontWeight:'400'}}>DONATE</Text>
        </TouchableOpacity> */}

        </View>
        )}
}


const styles = StyleSheet.create({
    shadowOffset: {
        flex:1,
        height:12,
        shadowColor: '#FFF',
        shadowOpacity: 0.35,
        shadowRadius: 1.5,
        elevation: 2,
        backgroundColor: 'white',
        padding: 8,
        marginTop: 8,
        marginLeft :8,
        marginRight :8,
        flexDirection:'row'
    },
    textTitle : {
      fontWeight : '800',
      fontSize : 18
    }
});



function mapStateToProps(state){
    //return the thing that you want to the expose
    return {json:state.json,curr_lat:state.lat,curr_long:state.long}
}
    

export default connect(mapStateToProps)(DetailsPage);

// export default DetailsPage;
