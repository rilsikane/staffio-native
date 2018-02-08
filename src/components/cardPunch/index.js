import React from 'react';
import {Text,View,Platform} from 'react-native';
import {Grid,Row,Col,Body} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {em} from '../../constants/Layout';
import {convertDate,convertByFormat} from '../../utils/staffioUtils';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';

function getShiftTime(tmpDate){
  if(tmpDate && tmpDate!="-"){
    var times = tmpDate.split(":");
    return `${times[0]} : ${times[1]}`
  }
}
function getShiftCard(shiftTime){
  if(shiftTime && shiftTime!="-"){
    return (<Text allowFontScaling={false}style={styles.TextColor2}> {getShiftTime(shiftTime)} </Text>);
  }else{
    return (<Text allowFontScaling={false}style={styles.TextColor3}>` ${I18n.t('Not')} `</Text>);
  }
}
function renderFormStatus(status){
 switch(status){
   case "NM" :
    return null
    case "LT" :
    return (<View style={styles.fromStatus}>
                    <Text allowFontScaling={false}style={styles.fromStatus1}>•</Text>
                    <Text allowFontScaling={false}style={styles.fromStatus2}>{I18n.t('Late')}</Text>
                  </View>)
    case "EL" :
    return (<View style={styles.fromStatus}>
                    <Text allowFontScaling={false}style={styles.fromStatus1}>•</Text>
                    <Text allowFontScaling={false}style={styles.fromStatus2}>{I18n.t('Back')}</Text>
                  </View>)
    case "AB" :
    return (<View style={styles.fromStatus}>
                    <Text allowFontScaling={false}style={styles.fromStatus1}>•</Text>
                    <Text allowFontScaling={false}style={styles.fromStatus2}>{I18n.t('Absence')}</Text>
                  </View>)
    
 }
}

function changcolorborder(flagin,flagout) {
  if (flagin == 'Y' && flagout == 'Y') {
    return { color: '#ff8c00' }
  } else {
    return { color: 'red' }
  }
}

const TimeInOut =(shift) => {

  I18n.locale = 'en';
  
  return(

      <View style={styles.ContainerStyle}>
          <Grid style={{height:responsiveHeight(9)}}>
            <Row style={{marginTop:5}}>
              <Col size={50}>
                <Row style={styles.RowStyle1} >
                    <View style={styles.ViewStyle1}>
                        <Icon style={[styles.label,{marginTop:-2.5}]} name='calendar' size={responsiveFontSize(1.8)}/>
                        <Text allowFontScaling={false}style={styles.label2}>  {convertByFormat(shift.shift.date_unix,"DD MMM ")}</Text>
                    </View>
                </Row><Row style={styles.RowStyle2}>
                    <View style={styles.ViewStyle2}>
                        <Icon name='location-arrow' size={responsiveFontSize(2)} color='red'/>
                        <Text allowFontScaling={false}style={[styles.TextColor1,changcolorborder(shift.shift.area_flag_in,shift.shift.area_flag_out)]} numberOfLines={1}> 
                          {shift.shift.branch_name} 
                        </Text>
                    </View>
                </Row>
              </Col>
              <Col size={20} style={{borderRightWidth: 0.5,borderColor:"#737373"}}>
                <Row style={styles.ViewStyleRow}>
                  <View style={styles.ViewStyle3}>
                      {getShiftCard(shift.shift.time_in)}
                  </View>
                </Row>
                <Row style={styles.ViewStyleRow}>
                    <View style={styles.ViewStyle5}>
                      <View style={styles.ViewStyle6}>
                         <View>
                            <Icon style={styles.label} name='caret-up' style={styles.TextWorkTime}/>
                        </View>
                        <View style={{paddingLeft:5}}>
                            <Text allowFontScaling={false}note style={styles.TextWorkTime}>{`${getShiftTime(shift.shift.work_start_tm)}`}</Text>
                            <Text allowFontScaling={false}note style={styles.TextWorkTime2}> ({shift.shift.shft_name_th})</Text>
                        </View>
                       </View>
                    </View>
                </Row>
            </Col>
             <Col size={20}>
                <Row  style={styles.ViewStyleRow2}>
                  <View style={styles.ViewStyle5}>
                     {getShiftCard(shift.shift.time_out)}
                  </View>
                </Row>
                <Row >
                  <View style={styles.ViewStyle5}>
                    <View style={styles.ViewStyle6}>
                      <View>
                        <Icon style={styles.label} name='caret-down' style={styles.TextWorkTime}/>
                      </View>
                      <View>
                          <Text allowFontScaling={false}note style={styles.TextWorkTime}>{`${getShiftTime(shift.shift.work_end_tm)}`}</Text>
                          <Text allowFontScaling={false}note style={styles.TextWorkTime2}> ({shift.shift.shft_name_th})</Text>
                      </View>
                    </View>
                  </View>
                </Row>
              </Col>
              <Col size={15}>
                  {/*<View style={styles.fromStatus}>
                    <Text allowFontScaling={false}style={styles.fromStatus1}>•</Text>
                    <Text allowFontScaling={false}style={styles.fromStatus2}> Late</Text>
                  </View>*/}
                  {renderFormStatus(shift.shift.status_in)}
                  <View style={{marginTop:5}}>
                  {renderFormStatus(shift.shift.status_out)}
                   </View>
                  
              </Col>
            </Row>
          </Grid>
      </View>

    );
}
const styles={
  label2:{
      color:"#737373",
      fontSize:responsiveFontSize(1.8),
      lineHeight:responsiveFontSize(2),
      fontFamily:"Kanit",
      marginTop:Platform.OS=="ios" ? 0 : -5,
      backgroundColor:'transparent'
  },
  label:{
      color:"#737373",
      fontSize:responsiveFontSize(1.8),
      lineHeight:responsiveFontSize(2),
      fontFamily:"Kanit",
      backgroundColor:'transparent'
  },
  ContainerStyle:{
      backgroundColor: '#FFF',
      flexDirection: 'row',
      marginTop: 1,
      marginBottom: 5,
      marginLeft: 5,
      marginRight: 5,
      backgroundColor: '#F9F9F9',
      shadowColor:"#000",
      shadowOffset:{"width":0,"height":2},
      shadowRadius:1.5,
      shadowOpacity:0.1
  },
  ViewStyleRow:{
    flexDirection: 'row',
    justifyContent:'center'
  },
   ViewStyleRow2:{
    flexDirection: 'row',
    justifyContent:'flex-start'
  },
  ViewStyle1:{
    marginRight:responsiveWidth(1),
    marginLeft:responsiveWidth(1),
    flexDirection:"row",
    width:responsiveWidth(30),
    backgroundColor:'transparent'
    
  },
  ViewStyle2:{
    marginRight:5,
    marginLeft:10,
    flexDirection:"row",
    marginTop:-3,
    backgroundColor:'transparent'

  },
  ViewStyle3:{
    marginRight:0,
  },
  ViewStyle4:{
    flexDirection: 'row',
    marginRight:8,
    marginLeft:10,
    marginTop:-5,
    justifyContent:"center"
  },
  ViewStyle5:{
    // marginRight:8,
    marginLeft:1,
    paddingLeft:0,
    justifyContent:"flex-start",
    alignItems:"flex-start"
  },
  ViewStyle6:{
    flexDirection: 'row',
    marginTop:-5,
    justifyContent:"center",
    alignItems:"center"
  },
  RowStyle1:{
    flexDirection: 'row',
    marginLeft:responsiveWidth(2),
    marginTop:responsiveHeight(1.2)
  },
  RowStyle2:{
    flexDirection: 'row',
    marginLeft:10,
    justifyContent:'flex-start',
  },
  RowStyle3:{

  },
  fromStatus:{
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
    marginLeft: responsiveHeight(0.3),
    marginRight: responsiveHeight(0.3),
    borderRadius: responsiveHeight(1),
    paddingRight:responsiveHeight(0.6),
    paddingLeft:responsiveHeight(0.3),
  },
  fromStatus1:{
    fontSize: responsiveFontSize(1.6),
    textAlign: 'right',
    bottom: 1,
    color: 'white',
    backgroundColor:'transparent',
    fontFamily:"Kanit"
  },
  fromStatus2:{
    fontSize:responsiveFontSize(1.3),
    fontWeight: '400',
    color: 'white',
    bottom: 1,
    backgroundColor:'transparent',
    fontFamily:"Kanit",
     backgroundColor:'transparent'

  },
  TextColor1:{
    fontSize:responsiveFontSize(1.5),
     backgroundColor:'transparent'
    //color:'#f58020'
  },
  TextColor2:{
    fontSize:responsiveFontSize(2),
    color:'#f58020',
    fontFamily:"Kanit",
     backgroundColor:'transparent'
  },
  TextColor3:{
    fontSize:responsiveFontSize(1.5),
    color:'red',
    fontFamily:"Kanit",
     backgroundColor:'transparent'
  },
  TextWorkTime:{
    fontSize:responsiveFontSize(1.2),
    color:"#737373",
    fontFamily:"Kanit",
     backgroundColor:'transparent'
    
  },
  TextWorkTime2:{
    marginTop:3,
    fontSize:responsiveFontSize(0.9),
    color:"#737373",
    fontFamily:"Kanit",
    backgroundColor:"transparent"
  }
  
}

I18n.fallbacks = true;

I18n.translations = {
  en: {
    Not: '',
    Late: 'Late',
    Back: '',
    Absence: 'absence',  
  },
  th: {
    Not: 'ไม่ได้ลงเวลา',
    Late: 'สาย',
    Back: 'กลับก่อน',
    Absence: 'ขาด',  
  },
};
export default TimeInOut;
