import React from 'react';
import {Text,View,TouchableOpacity,Modal} from 'react-native';
import {Grid,Row,Col,Body} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

function renderFormStatus(status){
switch(status){
   case "NM" :
    return (<View style={styles.fromNormal}>
                    <Text allowFontScaling={false}style={[styles.fromStatus1]}>•</Text>
                    <Text allowFontScaling={false}style={[styles.fromStatus2,,{color:"#000"}]}>ปกติ</Text>
                  </View>)
    case "LT" :
    return (<View style={styles.fromStatus}>
                    <Text allowFontScaling={false}style={styles.fromStatus1}>•</Text>
                    <Text allowFontScaling={false}style={styles.fromStatus2}>สาย</Text>
                  </View>)
    case "EL" :
    return (<View style={styles.fromStatus}>
                    <Text allowFontScaling={false}style={styles.fromStatus1}>•</Text>
                    <Text allowFontScaling={false}style={styles.fromStatus2}>กลับก่อน</Text>
                  </View>)
    case "AB" :
    return (<View style={styles.fromStatus}>
                    <Text allowFontScaling={false}style={styles.fromStatus1}>•</Text>
                    <Text allowFontScaling={false}style={styles.fromStatus2}>ขาด</Text>
                  </View>)
    
 }
}

function changcolorborder (flag) {
  if (flag == 'Y'){
    return {color:'#ff7f50'}
  }else {
    return {color : 'red'}
  }
  }


const TimeIn =({record,punchRecord,onPressItem}) => {
  return(
      <TouchableOpacity onPress={()=> onPressItem(record)}>
      <View style={styles.ContainerStyle}>
          <Grid>
            <Col size={12} style={styles.center}>
              <Text allowFontScaling={false}style={styles.TextColor2}>{punchRecord.shiftNameTH}</Text>
            </Col>
            <Col size={27} style={styles.center}>
              <View style={{ flexDirection: 'row',alignItems:"center",justifyContent:"center"}}>
                  <Icon name='location-arrow' size={responsiveFontSize(1.5)} color='red'/>
                    <Text allowFontScaling={false} style={[styles.TextColor1,changcolorborder(record.area_flag)]} numberOfLines={1}> 
                    {record.branchName}
                    </Text>

              </View>
            </Col>
            <Col size={15} style={{justifyContent:"center",alignItems:"center"}}>

              <Row size={50}>
                <Body>
                  <View>
                    <Text allowFontScaling={false}style={styles.TextColor3}> {record.timeRecord.replace(":00","")} </Text>
                  </View>
                </Body>
              </Row>
              <Row size={40}>
                <Body style={{justifyContent:"center"}}>
                  <View style={styles.ViewStyle}>
                      <Icon name={record.timeRecordType.indexOf("I") !== -1 ? 'caret-up':'caret-down'} size={responsiveFontSize(1.5)}/>
                      <Text allowFontScaling={false}note style={{fontSize:responsiveFontSize(1)}}>{record.timeRecordType.indexOf("I") !== -1 
                        ? record.workStartTM.replace(":00","") : record.workEndTM.replace(":00","")}</Text>
                  </View>
                </Body>
              </Row>
            </Col>
            <Col size={10}  style={{justifyContent:"center"}}>
              {renderFormStatus(record.status)}
            </Col>
            <Col size={5} style={{justifyContent:"center",marginLeft:5}}>
              {'Y'==record.remark_flag && <Icon name='edit' size={responsiveFontSize(2)} color='#ff7f50' />}
            </Col>
            <Col size={5} style={{justifyContent:"center",marginLeft:5}}>
              {'Y'==record.comment_flag && <Icon name='comment' size={responsiveFontSize(2)} color='#ff7f50'/>}
            </Col>
            <Col size={5} style={{justifyContent:"center",alignItems:"flex-end"}}>
              <Icon name='chevron-right' size={responsiveFontSize(2)} color='#a9a9a9' style={{marginTop:5}}/>
            </Col>
          </Grid>
      </View>
       </TouchableOpacity>

    );
}
const styles={
  center:{
    justifyContent:"center",
    alignItems:"center"
  },
  ContainerStyle:{
      backgroundColor: '#FFF',
      flexDirection: 'row',
      marginTop: responsiveHeight(0.5),
      paddingTop: responsiveHeight(0.5),
      paddingBottom:responsiveHeight(0.5),
      backgroundColor: '#F9F9F9',
  },
  TextColor:{
    fontSize:responsiveFontSize(1.3),
    marginLeft:5,
  },
  TextColor1:{
    fontSize:responsiveFontSize(1.4),
    //color:'#ff7f50',
    fontFamily:'Kanit'
  },
  TextColor2:{
    fontSize:responsiveFontSize(1.5),
    color:'#a9a9a9',
    fontFamily:'Kanit'
  },
  TextColor3:{
    fontSize:responsiveFontSize(1.7),
    fontFamily:'Kanit'
  },
  ViewStyle:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:"center"
  },
  fromNormal:{
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffff',
    marginLeft: responsiveHeight(0.3),
    marginRight: responsiveHeight(0.3),
    borderRadius: responsiveHeight(1),
  },
  fromStatus:{
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
    marginLeft: responsiveHeight(0.3),
    marginRight: responsiveHeight(0.3),
    borderRadius: responsiveHeight(1),
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
    fontSize:responsiveFontSize(1.1),
    fontWeight: '400',
    color: 'white',
    bottom: 1,
    backgroundColor:'transparent',
    fontFamily:"Kanit"

  },
}
export default TimeIn;
