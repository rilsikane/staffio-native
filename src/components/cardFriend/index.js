import React from 'react';
import { StyleSheet, View, Image, ScrollView,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Thumbnail, Text, Left, Right, Button, Title, Body, Card, CardItem, Badge, Form, Item, Input, Label, Footer, FooterTab, ListItem, List } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
//import { SocialIcon } from 'react-native-elements';
import  Icon  from 'react-native-vector-icons/FontAwesome' ;
import {em,window} from '../../constants/Layout';
import Communications from 'react-native-communications';

export default class CardFriend extends React.Component {
    
    render() {
    const {employee} = this.props
    return(
      <View style={{height:em(5)}}>
      <Card>
        <Grid>

        <Col size={30} >
        <View style={{flex:1,alignItems: 'flex-start'}}>
        
                {employee.IMAGE_PATH =="" && <Image source={require('../../../img/employee.png')} style={ styles.imageHead }></Image>}
                {employee.IMAGE_PATH!="" && <Image source={{uri:employee.IMAGE_PATH}} style={ styles.imageHead }></Image>}
                
        </View>
        </Col>
        <Col size={75} style>
            <Row size={20} >
            <Text allowFontScaling={false}style={styles.titleText}>{employee.FULL_NAME_TH} </Text>
            </Row>
            <Row size={10} style={{zIndex:8888}}>
                <Text allowFontScaling={false}style={[styles.noteText,{ marginLeft:-5}]}> {employee.EMP_CODE} {employee.POSITION_NAME} </Text>
            </Row>
            <Row size={20} >
            
                <Col >
                <View style={{flexDirection: 'row'}}>
                    <Text allowFontScaling={false}style={styles.noteText}>Tel : </Text>
                    <Text allowFontScaling={false}style={styles.noteText}>{employee.MOBILE_PHONE}</Text>
                </View>
                </Col>
                
            </Row>
        </Col>
        <Col size={15} style={{ marginTop:25 }}>
          {/*<TouchableOpacity onPress={() => Communications.phonecall('0123456789', true)}>
            <Badge primary style={{height:35,width:35,borderRadius: 17}} ><Text allowFontScaling={false}><Icon  name="phone" color='white'/></Text></Badge>
          </TouchableOpacity>*/}
        </Col>

        <Col size={15} style={{ marginTop:25 }}>
        {/*<Badge style={{height:35,width:35,borderRadius: 17}} ><Text allowFontScaling={false}><Icon  name="google-plus" color='white'/></Text></Badge>*/}
        </Col>

            <Col size={15} style={{ marginTop:25 }} >
        {/*<Badge info style={{height:35,width:35,borderRadius: 17}} ><Text allowFontScaling={false}><Icon  name="linkedin" color='white'/></Text></Badge>*/}
            {employee.MOBILE_PHONE && <TouchableOpacity onPress={() => Communications.phonecall(employee.MOBILE_PHONE.replace(/-/g,""), true)}>
            <Badge primary style={{height:em(1.8),width:em(1.8),borderRadius: em(1.3)}} ><Text allowFontScaling={false}style={{marginTop:-em(0.2),backgroundColor:"transparent"}}><Icon name="phone" color='white'/></Text></Badge>
          </TouchableOpacity>}
        </Col>

        </Grid>
    </Card>
     </View>
      );
    }
}
const styles = StyleSheet.create({

  container: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingTop:em(5),
  },
  titleText: {
    color: '#6E6E6E',
    fontSize: em(1.2),
    fontFamily:'Kanit',
    backgroundColor:"transparent"
  },
  headText: {
    color: '#f58020',
    fontSize: em(1.2),
    fontFamily:'Kanit',
    backgroundColor:"transparent"
  },
  noteText: {
    color: '#A4A4A4',
    fontSize: em(0.8),
    marginTop:-2,
    alignItems:'flex-start',
    fontFamily:'Kanit',
    zIndex:9999,
    backgroundColor:"transparent"
  },
  litelText: {
    fontSize: em(0.5),
    color: '#f58020'
  },
  bacisText: {
    fontSize: em(0.5),
    color: '#6E6E6E',
    fontFamily:'Kanit',
    backgroundColor:"transparent"
  },
  numberText: {
    fontSize: 30,
    color: '#A4A4A4',
    fontFamily:'Kanit',
    backgroundColor:"transparent"
  },
  numText: {
    fontSize: 30,
    color: '#f58020',
    fontFamily:'Kanit',
    backgroundColor:"transparent"
  },
  imageHead: {
    height:em(2.9),
    width: em(2.9),
    borderRadius: em(1.45),
    marginTop:em(0.7),
    marginLeft:em(0.5),
    borderRightWidth: 1
   
  },
  image: {
    height:4,
    width: 4,
    borderRadius: 2
  },
  content:{
    alignItems: 'flex-start'
  }
});