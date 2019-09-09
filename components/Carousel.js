import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import SwiperFlatList from 'react-native-swiper-flatlist';
import * as images from '../images';

export default  Carousel = ({folder}) => {
    let src1=eval(`images.image${folder}_1`);
    let src2=eval(`images.image${folder}_2`);
    let src3=eval(`images.image${folder}_3`);
    let src4=eval(`images.image${folder}_4`);
   

    return (
        <SwiperFlatList
          autoplay={false}
          showPagination = {false}
          autoplayLoop
          autoplay
          autoplayDelay={5}
        >
          
           <View >
             <Image key ="1" resizeMode='stretch' resizeMethod='resize' style={styles.imageStyle} source={src1}/>
          </View> 
      
          <View >
             <Image key ="2" resizeMode='stretch' resizeMethod='resize' style={styles.imageStyle} source={src2}/>
          </View> 

          <View >
             <Image key ="3" resizeMode='stretch' resizeMethod='resize' style={styles.imageStyle} source={src3}/>
          </View> 

          <View >
             <Image key ="4" resizeMode='stretch' resizeMethod='resize' style={styles.imageStyle} source={src4}/>
          </View> 

        </SwiperFlatList>
    );

}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  imageStyle: {
    height: height*0.4,
    width:width
  }
});