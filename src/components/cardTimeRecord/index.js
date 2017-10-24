import React from 'react';
import { StyleSheet, View, Image,Platform } from 'react-native';
import { Container, Header, Content, Thumbnail, Text, Left, Right, Button, Icon, Title, Body, Card, CardItem,Badge} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Dimensions from 'Dimensions';
import {em,x} from '../../constants/Layout';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class CardTimeRecord extends React.Component {

    render() {
        const {amount_ab,amount_lt,amount_el} = this.props.record;
        return(
            <Card style={[this.props.style,styles.cardContainer]}>
                    <CardItem header style={{backgroundColor:'transparent',paddingTop:5,paddingBottom:5,flex:1}}>
                    <Text allowFontScaling={false}style={styles.titleText}>ประวัติการลงเวลา</Text>
                    </CardItem>
                    <CardItem style={{alignItems: 'center', backgroundColor:'transparent'
                    ,flex:1,paddingTop:0,paddingBottom:5,justifyContent:'flex-start'}}>
                         <Text allowFontScaling={false}style={[styles.litelText,{fontSize:responsiveFontSize(4)}]}>•</Text>
                         <Text allowFontScaling={false}style={styles.litelText}>ขาด  </Text>
                         <Badge style={styles.badge} ><Text allowFontScaling={false}style={styles.noteText}>{amount_ab||0}</Text></Badge>
                         <Text allowFontScaling={false}style={[styles.litelText,{fontSize:responsiveFontSize(4),paddingLeft:5}]}>•</Text>
                         <Text allowFontScaling={false}style={styles.litelText}>สาย  </Text>
                         <Badge style={styles.badge} ><Text allowFontScaling={false}style={styles.noteText}>{amount_lt||0}</Text></Badge>
                         <Text allowFontScaling={false}style={[styles.litelText,{fontSize:responsiveFontSize(4),paddingLeft:5}]}>•</Text>
                         <Text allowFontScaling={false}style={styles.litelText}>กลับก่อน  </Text>
                         <Badge style={styles.badge} ><Text allowFontScaling={false}style={styles.noteText}>{amount_el||0}</Text></Badge>
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
    color: '#f58020',
    fontSize: responsiveFontSize(2)
  },
  noteText: {
    fontFamily:"Kanit",
    fontSize: responsiveFontSize(1.5),
    backgroundColor:'transparent',
    lineHeight:responsiveFontSize(2)
  },
  litelText: {
    fontFamily:"Kanit",
    fontSize: responsiveFontSize(2),
    color: '#f58020',
    paddingLeft:5,
    marginTop:-10
  },
  content:{
    alignItems: 'flex-start'
  },
  cardContainer:{
      marginRight:5,
      marginLeft:5,
      backgroundColor:'#ffff',
      height:responsiveHeight(10),
      width:x-10,
      flex:null
  },
})