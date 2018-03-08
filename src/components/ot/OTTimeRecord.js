import React from 'react';
import { StyleSheet, View, Image,Platform,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Thumbnail, Text, Left, Right, Button, Icon, Title, Body, Card, CardItem,Badge} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Dimensions from 'Dimensions';
import {em,x} from '../../constants/Layout';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {getmonth,getyear} from '../../utils/staffioUtils';
//import ProgressCircle from 'react-native-progress-circle'
import I18n from '../../utils/i18n';

export default class OTTimeRecord extends React.Component {

    render() {
        return(
            <Card style={[styles.cardContainer]}>
                    <CardItem style={styles.cardContainer2}>
                    <Text style={styles.titleText}>ประวัติการขอ OT.</Text>
                    <Text style={styles.noteText}>(ช่วงเดือน กันยายน 2560)</Text>
                    </CardItem>
                    <CardItem style={styles.cardContainer3}>
                    
                    <TouchableOpacity style={styles.card}>
                    <Text style={styles.noteText3}>Summary</Text>
                        <View style={styles.circle3}>
                      <View style={styles.circle2}>    
                        <View style={styles.circle}>
                            <Text style={styles.noteText2}>10</Text>
                            <Text style={styles.litelText}>แรง</Text>  
                        </View>
                        </View>
                        </View>
                        <View style={styles.square}/>
                        <View style={styles.square2}/>
                    </TouchableOpacity> 

                   <TouchableOpacity style={styles.card}>
                   <Text style={styles.noteText3}>ทำไปแล้ว</Text>
                      <View style={styles.circle3}>
                    <View style={styles.circle2}> 
                      <View style={styles.circle}>                                         
                          <Text style={styles.noteText2} >5</Text>
                          <Text style={styles.litelText}>แรง</Text>                    
                      </View>
                      </View>
                      </View>
                      <View style={styles.square}/>
                      <View style={styles.square2}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                    <Text style={styles.noteText3}>ยังไม่ทำ</Text>
                      <View style={styles.circle3}>
                    <View style={styles.circle2}>
                      <View  style={styles.circle}>          
                          <Text style={styles.noteText2}>5</Text>
                          <Text style={styles.litelText}>แรง</Text>                        
                      </View>
                      </View>
                      </View>
                      <View style={styles.square}/>
                      <View style={styles.square2}/>
                    </TouchableOpacity>
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
    fontSize: responsiveFontSize(2),
    backgroundColor:'transparent',
    paddingRight: responsiveWidth(2),
    paddingTop: responsiveHeight(1)
  },
  noteText: {
    fontFamily:"Kanit",
    fontSize: responsiveFontSize(1.5),
    backgroundColor:'transparent',
    color: '#808285',
    paddingTop: responsiveHeight(1)
  },
  noteText2: {
    marginTop:responsiveHeight(1),
    fontFamily:"Kanit",
    fontSize: responsiveFontSize(4),
    backgroundColor:'transparent',
    lineHeight:responsiveFontSize(5),
    color: '#FBAB3E',
    alignItems: 'center'
  },
  noteText3: {
    marginTop:responsiveHeight(1),
    fontFamily:"Kanit",
    fontSize: responsiveFontSize(1.5),
    backgroundColor:'transparent',
    paddingBottom: responsiveHeight(1),
    color: '#FBAB3E',
    alignItems: 'center'
  },
  litelText: {
    fontFamily:"Kanit",
    fontSize: responsiveFontSize(1.2),
    paddingLeft:responsiveWidth(1),
    alignItems: 'center',
    color :'#744C36',
    backgroundColor:'transparent'
   
  },
  content:{
    alignItems: 'flex-start'
  },
  cardContainer:{
      marginRight:5,
      marginLeft:5,
      backgroundColor:'#ffff',
      height:responsiveHeight(25),
      width:responsiveWidth(97),
      flex:null
  },
  cardContainer2:{
    marginRight:5,
    marginLeft:5,
    backgroundColor:'#ffff',
    height:responsiveHeight(0),
    width:responsiveWidth(95),
    flex:null
},
cardContainer3:{
    marginRight:5,
    backgroundColor:'transparent',
    width:responsiveWidth(95),
    flex:null
},
  square: {
    height: responsiveHeight(0.5),
    width:responsiveWidth(21),
    backgroundColor:'#ffff',
    alignItems: 'center',
    flex:null,
    justifyContent: 'center'
  },
  square2: {
    height: responsiveHeight(0.5),
    width: responsiveWidth(10),
    backgroundColor: '#F3F3F4',
    alignItems: 'center',
    flex:null,
    justifyContent: 'center'
  },
  circle: {
    height:  responsiveHeight(10),
    width: responsiveWidth(18),
    borderRadius: responsiveWidth(18/2),
    backgroundColor:'#ffff',
    alignItems: 'center',
    flex:null,
    marginRight:responsiveWidth(5),
    marginLeft:responsiveWidth(5),
  },
  circle2: {
    height:   responsiveHeight(11),
    width: responsiveWidth(20),
    borderRadius:responsiveWidth(20/2),
    backgroundColor:'#F3F3F4',
    alignItems: 'center',
    flex:null,
    marginRight:responsiveWidth(5),
    marginLeft:responsiveWidth(5),
    justifyContent: 'center'
  },
  circle3: {
    height: responsiveHeight(12),
    width: responsiveWidth(21),
    borderRadius: responsiveWidth(21/2),
    backgroundColor:'#E5E5E5',
    alignItems: 'center',
    flex:null,
    marginRight:responsiveWidth(0),
    marginLeft:responsiveWidth(0),
    justifyContent: 'center'
  },
  card:{
    marginRight:responsiveWidth(2),
    marginLeft:responsiveWidth(2),
    backgroundColor:'#ffff',
    height:responsiveHeight(20),
    width:responsiveWidth(27),
    flex:null,
    alignItems: 'center'
},
cardItem:{
  marginRight:responsiveWidth(0),
  marginLeft:responsiveWidth(0),
  backgroundColor:'#ffff',
  height:responsiveHeight(13),
  width:responsiveHeight(97),
  flex:null,
  alignItems: 'center'
},
})
