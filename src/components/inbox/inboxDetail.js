import React from 'react';
import {View,Text} from 'react-native';
import {Grid,Col} from 'native-base';
import IdName from '../status/IdName';
import ImageStatus from '../status/ImageStatus';
import TimeIn from '../status/TimeIn';

const FormStatus = () => {
  let DateToday = new Date().toDateString().split(' ');
  return(
    <View>
      <View style={styles.ViewStyle}>
        <IdName />
      </View>
      <View style={{marginTop:5}}>
        <ImageStatus />
      </View>
      <View style={{height:50}}>
        <Grid style={{marginTop:5}} >
          <Col size={20}>
            <Text allowFontScaling={false}style={styles.TextStyle1}>Today</Text>
          </Col>
          <Col size={75}>
            <Text allowFontScaling={false}style={styles.TextStyle2}>{DateToday[2]} {DateToday[1]} {DateToday[3]}</Text>
          </Col>
        </Grid>
      </View>
      <View>
        <TimeIn />
      </View>
    </View>
  );
}
const styles={
  ViewStyle:{
    marginTop:10,
    marginLeft:5,
    marginRight:5
  },
  TextStyle1:{
    fontSize:25,
    marginLeft:20,
    color:'#ff7f50',
    backgroundColor:'transparent',
  },
  TextStyle2:{
    marginTop:12,
    color:'#ff7f50',
    fontSize: 13,
    backgroundColor:'transparent'
  },
}
export default FormStatus;
