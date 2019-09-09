import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity,Linking,Platform} from 'react-native';




const Card = ({day, idex,name,lat,long,dist,navigateToDetails}) => {
    // console.log(`http://maps.apple.com/maps?daddr=${lat},${long}`);
    // console.log("key is on card "+ idex);
    return (
      <TouchableOpacity onPress={()=>navigateToDetails(idex)}>
      <View  style={styles.shadowOffset} >
            <View style={{flex:7}}>
                <Text style = {styles.textTitle}>{name}
                </Text>
                <Text>{dist} Kms away</Text>
                <Text>{day}</Text>
            </View>
 
                <TouchableOpacity style={{flex:1}} onPress={()=>Linking.openURL(`http://maps.google.com/maps?daddr=${lat},${long}`)}>
                    <Image style = {{width:32, height:32,resizeMode:'contain',position:'absolute',top:0,right:0, padding:8}} 
                          source={require('../images/location.png')}>
                    </Image>
                </TouchableOpacity>

                  <Text style = {{position:'absolute', bottom : 8, right :8 }}>
                    See More
                  </Text>           
       </View>
       </TouchableOpacity>


    );
  };


const styles = StyleSheet.create({

shadowOffset: {
    flex:1,
    height:120,
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
  fontWeight : '400',
  fontSize : 18
}
});

export default Card;
