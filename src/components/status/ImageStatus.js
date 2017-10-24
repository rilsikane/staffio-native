import React from 'react';
import {View} from 'react-native';
import {Body} from 'native-base';
import {em} from '../../constants/Layout'
import Colors from '../../constants/Colors'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
const ImageStatus = ({record}) => {
  return(
    <View style={styles.workShiftContainerStyle}>
      <Body>
        <Image  indicator={Progress.Circle}  source={{ uri: `${record.imagepath_tempMobile}` }}
        indicatorProps={{
          size: 80,
          borderWidth: 0,
          color: Colors.baseColor,
          unfilledColor: 'rgba(200, 200, 200, 0.2)'
        }} style={{height: responsiveHeight(54),width: responsiveWidth(96)}} 
         />
      </Body>
    </View>
  );
}
const styles={
workShiftContainerStyle:{
    backgroundColor: 'transparent',
    paddingTop: 5,
    paddingBottom: 5,
    width:responsiveWidth(95),
  },
}
export default ImageStatus;
