import React from 'react';
import {View,Text} from 'react-native';
import {Grid,Col,Row,Body,Thumbnail} from 'native-base';
const IdName = () => {
  return(
    <View style={styles.workShiftContainerStyle}>
    <Grid style={{height:75}}>
        <Col size={20}>
          <Thumbnail large source={require('./women1.jpg')} style={styles.bodyImage} />
        </Col>
        <Col size={80}>
          <Row size={40} style={{marginTop:15}}>
              <Text allowFontScaling={false}style={{fontSize:18}}>Sasi Rasittikhetrawit</Text>
          </Row>
          <Row size={60}>
            <Col size={20}>
              <Text allowFontScaling={false}style={styles.TextStyle}>ID  :004901</Text>
            </Col>
            <Col size={80}>
              <Text allowFontScaling={false}style={styles.TextStyle}>Dept: Beauty Advisor</Text>
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
      paddingTop: 3,
      paddingBottom: 3,
      backgroundColor: 'white',

  },
  bodyImage:{
    height: 60,
    width: 60,
    marginLeft:10,
    marginTop: 5,
    borderColor:'#d3d3d3'
  },
  TextStyle:{
    fontSize:12,
    color:'#a9a9a9'
  }
}
export default IdName;
