import React from 'react';
import {Text,View} from 'react-native';
import {Grid,Row,Col,Body} from 'native-base';
import { Icon } from 'react-native-vector-icons/FontAwesome';
const TimeIn =() => {
  return(
      <View style={styles.ContainerStyle}>
          <Grid style={{height:40}}>
            <Col size={10}>
              <Text allowFontScaling={false}style={styles.TextColor}>Shift No.</Text>
            </Col>
            <Col size={10}>
              <Text allowFontScaling={false}style={styles.TextColor2}>103</Text>
            </Col>
            <Col size={20}>
              <View style={{ flexDirection: 'row',marginTop:15}}>
                  <Icon name='near-me' size={15} color='red'/>
                  <Text allowFontScaling={false}style={styles.TextColor1}> อาคารปัญจธาณี </Text>
              </View>
            </Col>
            <Col size={20}>

              <Row size={50}>
                <Body>
                  <View>
                    <Text allowFontScaling={false}style={styles.TextColor3}> 11:05 </Text>
                  </View>
                </Body>
              </Row><Row size={40}>
                <Body>
                  <View style={styles.ViewStyle}>
                      <Icon name='arrow-drop-down' size={20}/>
                      <Text allowFontScaling={false}note style={{fontSize:10}}>11:00</Text>
                  </View>
                </Body>
              </Row>
            </Col>
            <Col size={15}>
              <View style={styles.fromStatus}>
              <Text allowFontScaling={false}style={styles.fromStatus1}>•</Text>
              <Text allowFontScaling={false}style={styles.fromStatus2}> Late</Text>
              </View>
            </Col>
            <Col size={8}>
              <Icon name='mode-edit' size={23} color='#ff7f50' style={{marginTop:5,marginLeft:5}}/>
            </Col>
            <Col size={8}>
              <Icon name='insert-comment' size={23} color='#ff7f50' style={{marginTop:5}}/>
            </Col>
          </Grid>
      </View>

    );
}
const styles={
  ContainerStyle:{
      backgroundColor: '#FFF',
      flexDirection: 'row',
      paddingTop: 3,
      paddingBottom: 3,
      backgroundColor: '#F9F9F9',
  },
  TextColor:{
    fontSize:10,
    marginLeft:5,
    marginTop:15
  },
  TextColor1:{
    fontSize:12,
    color:'#ff7f50'
  },
  TextColor2:{
    fontSize:25,
    color:'#a9a9a9'
  },
  TextColor3:{
    fontSize:25,
  },
  ViewStyle:{
    flexDirection: 'row',
  },
  fromStatus:{
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 15,
    marginTop: 5
  },
  fromStatus1:{
    flex: 1,
    fontSize: 20,
    textAlign: 'right',
    bottom: 1,
    color: 'white',
  },
  fromStatus2:{
    flex: 2,
    color: 'white',
    bottom: 1
  },
}
export default TimeIn;
