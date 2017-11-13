import React from 'react';
import { StyleSheet, View, Image,Platform } from 'react-native';
import { Container, Header, Content, Thumbnail, Text, Left, Right, Button, Icon, Title, Body, Card, CardItem,Badge} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Dimensions from 'Dimensions';
import {em,x} from '../../constants/Layout';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
//import ProgressCircle from 'react-native-progress-circle'

export default class CardTimeRecord extends React.Component {

    render() {
        const {amount_ab,amount_lt,amount_el} = this.props.record;
        return(
            <Card style={[this.props.style,styles.cardContainer]}>
                    <CardItem style={styles.cardContainer2}>
                    <Text allowFontScaling={false}style={styles.titleText}>ประวัติการลงเวลา</Text>
                    <Text allowFontScaling={false}style={styles.noteText}>  (ช่วงเดือน กันยายน 2560)</Text>
                    </CardItem>
                    <CardItem >
                    <View style={styles.card}>
                    <View style={styles.circle3}>
                    <View style={styles.circle2}>   
                    <View style={styles.circle}>
                         <Text allowFontScaling={false}style={styles.noteText2}>{amount_ab||0}</Text>
                         <Text allowFontScaling={false}style={styles.litelText}>ขาด  </Text>  
                    </View>
                    </View>
                    </View>
                    <View style={styles.square}/>
                    <View style={styles.square2}/>
                    </View>
                    <View style={styles.card}>
                    <View style={styles.circle3}>
                    <View style={styles.circle2}>   
                    <View style={styles.circle}>                                         
                         <Text allowFontScaling={false}style={styles.noteText2} >{amount_lt||0}</Text>
                         <Text allowFontScaling={false}style={styles.litelText}>สาย  </Text>                  
                    </View>
                    </View>
                    </View>
                    <View style={styles.square}/>
                    <View style={styles.square2}/>
                    </View>
                    <View style={styles.card}>
                    <View style={styles.circle3}>
                    <View style={styles.circle2}>  
                    <View style={styles.circle}>          
                         <Text allowFontScaling={false}style={styles.noteText2}>{amount_el||0}</Text>
                         <Text allowFontScaling={false}style={styles.litelText}>กลับก่อน  </Text>                      
                    </View>
                    </View>
                    </View>
                    <View style={styles.square}/>
                    <View style={styles.square2}/>
                    </View>
                    </CardItem>
                </Card>
        )
    }

}

const styles = StyleSheet.create({
 badge:{
   width: responsiveWidth(8), 
   height: responsiveHeight(3), 
   backgroundColor:'#737373'
 },
 container: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingTop:24.6,
  },
  titleText: {
    fontFamily:"Kanit",
    color: '#663300',
    fontSize: responsiveFontSize(2)
  },
  noteText: {
    fontFamily:"Kanit",
    fontSize: responsiveFontSize(1.5),
    backgroundColor:'transparent',
    color: '#E5E5E5',
  },
  noteText2: {
    fontFamily:"Kanit",
    fontSize: responsiveFontSize(2),
    backgroundColor:'transparent',
    lineHeight:responsiveFontSize(4),
    color: '#FBAB3E',
    alignItems: 'center'
  },
  litelText: {
    fontFamily:"Kanit",
    fontSize: responsiveFontSize(2),
    paddingLeft:5,
    alignItems: 'center',
    color :'#744C36'
   
  },
  content:{
    alignItems: 'flex-start'
  },
  cardContainer:{
      marginRight:5,
      marginLeft:5,
      backgroundColor:'#ffff',
      height:responsiveHeight(21),
      width:x-10,
      flex:null
  },
  cardContainer2:{
    marginRight:5,
    marginLeft:5,
    backgroundColor:'#ffff',
    height:responsiveHeight(0),
    width:x-10,
    flex:null
},
  square: {
    height: 2,
    width: 35,
    backgroundColor:'#ffff',
    alignItems: 'center',
    flex:null,
    justifyContent: 'center'
  },
  square2: {
    height: 3,
    width: 30,
    backgroundColor:'#E5E5E5',
    alignItems: 'center',
    flex:null,
    justifyContent: 'center'
  },
  circle: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    backgroundColor:'#ffff',
    alignItems: 'center',
    flex:null,
    marginRight:5,
    marginLeft:5,
  },
  circle2: {
    height: 77,
    width: 77,
    borderRadius: 77 / 2,
    backgroundColor:'#F3F3F4',
    alignItems: 'center',
    flex:null,
    marginRight:5,
    marginLeft:5,
    justifyContent: 'center'
  },
  circle3: {
    height: 82,
    width: 82,
    borderRadius: 82 / 2,
    backgroundColor:'#E5E5E5',
    alignItems: 'center',
    flex:null,
    marginRight:5,
    marginLeft:5,
    justifyContent: 'center'
  },
  card:{
    marginRight:5,
    marginLeft:5,
    backgroundColor:'#ffff',
    height:responsiveHeight(13),
    width:115,
    flex:null,
    alignItems: 'center'
},
})