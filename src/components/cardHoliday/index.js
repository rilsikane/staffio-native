import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Container, Header, Content, Thumbnail, Text, Left, Right, Button, Icon, Title, Body, Card, CardItem} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Dimensions from 'Dimensions';
import {convertByFormat} from '../../utils/staffioUtils';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';

export default class CardHoliday extends React.Component {
    render() {
        I18n.locale = 'en';        
        return(
            <Card style={[this.props.style,styles.cardContainer]}>
                <CardItem style={[styles.cardItemContainer,{paddingTop:5,paddingBottom:5}]}>
                    <Left>
                        <Body>
                        <Text allowFontScaling={false}style={styles.titleText}>{I18n.t('DateHoliday')}</Text>
                        {/*<Text allowFontScaling={false}style={styles.weekText} note>สุดสัปด</Text>*/}
                        <View style={styles.buttonTxt}>
                            <Icon style={{backgroundColor:"transparent",color:"#ffff",fontSize:responsiveFontSize(2)}} name='calendar' />
                            <Text allowFontScaling={false}style={styles.noteText}>  {convertByFormat(new Date(this.props.holiday.holiday_date_unix||0),"DD MMMM ")}</Text>
                        </View>
                        </Body>
                    </Left>                            
                    <Right style={{flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                        <Text allowFontScaling={false}style={styles.totalText}>{`${I18n.t('Total')}  `}</Text>
                        <Text allowFontScaling={false}style={styles.numberText}>{this.props.holiday.sum_holiday}</Text>
                        <Text allowFontScaling={false}style={styles.totalText}>{` ${I18n.t('Day')}`}</Text>
                    </Right>
                </CardItem>
            </Card>
        )
    }

}

const styles = StyleSheet.create({
  noteText:{
      paddingLeft:responsiveWidth(1),
      fontSize:responsiveFontSize(2),
      color:"#ffff",
      fontFamily:"Kanit",
      backgroundColor:"transparent",
      width:responsiveWidth(40)
  },
  buttonTxt:{
    height:responsiveHeight(3.5),
    backgroundColor:'#f58020',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft:responsiveWidth(1),
    borderRadius:responsiveWidth(2),
    marginTop:responsiveHeight(1)
  },
  totalText: {
    fontFamily:"Kanit",
    fontSize: responsiveFontSize(3),
    color: '#ffff',
    backgroundColor:'transparent'
  },
  titleText: {
    fontFamily:"Kanit",
    color: '#ffff',
    fontSize: responsiveFontSize(2),
    justifyContent:"center",
    alignItems:"center",
    marginRight:responsiveWidth(1),
    backgroundColor:'transparent'
    
  },
  weekText: {
    fontFamily:"Kanit",
    color: '#ffff',
    fontSize: responsiveFontSize(1),
    marginTop:-responsiveHeight(1),
    backgroundColor:'transparent'
  },
  numberText: {
    fontFamily:"Kanit",
    fontSize: responsiveFontSize(4),
    marginRight:responsiveWidth(1),
     color: '#f58020',
     backgroundColor:'transparent'
   
  },
  cardContainer:{
      marginRight:5,
      marginLeft:5,
      backgroundColor:  "rgba(109, 110, 113, 1)",
      opacity:0.8,
      height:responsiveHeight(11),
      width:responsiveWidth(97),
      flex:null
  },
  cardItemContainer:{
      backgroundColor:'transparent',
  }
})
I18n.fallbacks = true;

I18n.translations = {
  en: {
    DateHoliday:'Your holiday since',
    Total:'Total',
    Day:'Day(s)', 
  },
  th: {
    DateHoliday:'วันหยุดของคุณตั้งแต่วันที่',
    Total:'รวม',
    Day:'วัน', 
  },
};