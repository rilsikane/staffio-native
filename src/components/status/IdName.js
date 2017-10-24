import React from 'react';
import {View,Text} from 'react-native';
import {Grid,Col,Row,Body} from 'native-base';
import {em} from '../../constants/Layout'
import Colors from '../../constants/Colors'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
const IdName = ({record}) => {
  console.log(record);
  return(
    <View style={styles.workShiftContainerStyle}>
    <Grid style={{height:responsiveHeight(6.7)}}>
        <Col size={20} style={{marginTop:-6}}>
           <Image  indicator={Progress.Circle}  source={{ uri: `${record.imagepath_personal}` }}
            indicatorProps={{
              size: 20,
              borderWidth: 0,
              color: Colors.baseColor,
              unfilledColor: 'rgba(200, 200, 200, 0.2)'
            }} style={styles.bodyImage}  
            />
        </Col>
        <Col size={80} style={{marginTop:-6}}>
          <Row size={40}>
              <Text allowFontScaling={false}style={{fontSize:responsiveFontSize(1.6),fontFamily:'Kanit',marginTop:1}}>{record.fullNameTH}</Text>
          </Row>
           <Row size={30}>
            <Col size={100}>
                <Text allowFontScaling={false}style={styles.TextStyle}>รหัส  :{record.empCode}</Text>
            </Col>
          </Row>
          <Row size={25}>
           <Col size={100} style={{backgroundColor:"transparent"}}>
              <Text allowFontScaling={false}style={styles.TextStyle} numberOfLines={1}>ตำแหน่ง: {record.positionName}</Text>
            </Col>
          </Row>
        </Col>
    </Grid>
    </View>
  );
}
const styles={
  workShiftContainerStyle:{
      backgroundColor: '#FFF',
      flexDirection: 'row',
      paddingTop: responsiveHeight(1),
      paddingBottom: responsiveHeight(1),
      backgroundColor: 'white',

  },
  bodyImage:{
    height:responsiveHeight(7.5),
    width: responsiveWidth(10),
    borderRadius:responsiveWidth(5.5),
    marginLeft:10,
    borderColor:'#d3d3d3'
  },
  TextStyle:{
    fontSize:responsiveFontSize(1.5),
    color:'#a9a9a9',
    fontFamily:'Kanit'
  }
}
export default IdName;
