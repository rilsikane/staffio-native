import React from 'react';
import {Text,View} from 'react-native';
import {Body,Grid,Row,Col,Thumbnail,Button} from 'native-base';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import store from 'react-native-simple-store';
import TimerMixin from 'react-timer-mixin';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../assets/fonts/config.json'
import {em} from '../../constants/Layout'
const IconTello = createIconSetFromFontello(fontelloConfig);
import {convertPunch} from '../../utils/staffioUtils';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Bounceable from "react-native-bounceable";
import I18n from 'react-native-i18n';

class PunchIn extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {punchInTime:"00:00",DateTime:new Date().toDateString().split(' ')
    ,WORK_START_TM:"",WORK_END_TM:"",branch_name:"",punchOutTime:"",updateShift:"I",timeRecordType:""};
  }

  punchIn(){
    this.props.punchPress();
  }

  componentDidMount(nextProps) {
    if(this.props.shiftData && !this.props.isHoliDay && this.props.shiftData.WORK_START_TM){
       this.timer = TimerMixin.setInterval( async () => {
            await this.countTime();
          }, 10000);
       const work_start_tm = this.props.shiftData.WORK_START_TM.split(":");
       const work_end_tm = this.props.shiftData.WORK_END_TM.split(":");
       this.setState({WORK_START_TM:`${work_start_tm[0]}:${work_start_tm[1]}`
      ,WORK_END_TM:`${work_end_tm[0]}:${work_end_tm[1]}`,branch_name:this.props.shiftData.branch_name
      ,timeRecordType:this.props.shiftData.timeRecordType});

      let d = new Date(this.props.shiftData.msec);
      let h = d.getHours()<10 ? "0"+d.getHours():d.getHours();
      let m = d.getMinutes()<10 ? "0"+d.getMinutes():d.getMinutes();
      let punchInTime = `${h}:${m}`;
      let punchOutTime = `${h}:${m}`;

      let tempD = convertPunch(d.getTime());

      if(this.props.shiftData.timeRecordType!=""){
        if(this.props.shiftData.timeRecordType=="O"){
          if(this.props.shiftData.TimeRecordIn){
            let tmp = this.props.shiftData.TimeRecordIn.split(":")
            punchInTime =`${tmp[0]}:${tmp[1]}`
            this.setState({updateShift:"O"});
          }else{
            this.setState({updateShift:"O"});
            punchInTime =null;
          }
          if(this.props.shiftData.TimeRecordOut){
            let tmp = this.props.shiftData.TimeRecordOut.split(":")
            punchOutTime =`${tmp[0]}:${tmp[1]}`
            this.setState({updateShift:""});
          }
        }else if(this.props.shiftData.timeRecordType=="W"){
          //เช็คเวลาเข้ายังไม่มี out
          if(this.props.shiftData.TimeRecordIn){
            let tmp = this.props.shiftData.TimeRecordIn.split(":")
            punchInTime =`${tmp[0]}:${tmp[1]}`
            this.setState({updateShift:"O"});
          }else{
            this.setState({updateShift:"O"});
            punchInTime =null;
          }
        }
        else if(this.props.shiftData.timeRecordType=="N"){
            //เช็คเวลาเข้าออก
          if(this.props.shiftData.TimeRecordIn){
            let tmp = this.props.shiftData.TimeRecordIn.split(":")
            punchInTime =`${tmp[0]}:${tmp[1]}`
            this.setState({updateShift:""});
          }else{
            this.setState({updateShift:""});
            punchInTime =null;
          }
           if(this.props.shiftData.TimeRecordOut){
            let tmp = this.props.shiftData.TimeRecordOut.split(":")
            punchOutTime =`${tmp[0]}:${tmp[1]}`
            this.setState({updateShift:""});
          }else{
            this.setState({updateShift:""});
            punchOutTime =null;
          }
        }else if(this.props.shiftData.timeRecordType=="I"){
          if(this.props.shiftData.TimeRecordIn){
            let tmp = this.props.shiftData.TimeRecordIn.split(":")
            punchInTime =`${tmp[0]}:${tmp[1]}`
            this.setState({updateShift:"O"});
          }else{
            this.setState({updateShift:"I"});
            punchOutTime = "";
          }
        }
        else{
          punchOutTime = "";
        }
     }else{
        if(this.props.shiftData.TimeRecordIn){
            let tmp = this.props.shiftData.TimeRecordIn.split(":")
            punchInTime =`${tmp[0]}:${tmp[1]}`
             this.setState({updateShift:""});
          }
          if(this.props.shiftData.TimeRecordOut){
            let tmp = this.props.shiftData.TimeRecordOut.split(":")
            punchOutTime =`${tmp[0]}:${tmp[1]}`
            this.setState({updateShift:""});
          }else{
           this.setState({updateShift:"O"});
          }
     }
      
      this.setState({DateTime:tempD.split(' '),punchInTime: punchInTime,punchOutTime: punchOutTime, timeCount:d.getTime()})
      //   this.forceUpdate()
       
    }else{
      this.setState({DateTime:new Date().toDateString().split(' ')})
    }
 }
 componentWillUnmount(){
   TimerMixin.clearInterval(this.timer);
 }
 async countTime(){
  let timeCount = this.state.timeCount + 10000; 
      let d = new Date(timeCount);
      let h = d.getHours()<10 ? "0"+d.getHours():d.getHours();
      let m = d.getMinutes()<10 ? "0"+d.getMinutes():d.getMinutes();
    this.setState({
        timeCount:timeCount
    })
    if(this.state.updateShift=="I"){
      this.setState({
        punchInTime:`${h}:${m}`
      })
    }else if(this.state.updateShift=="O"){
      this.setState({
        punchOutTime:`${h}:${m}`
      })
    }
 }
 renderStyle(isStamp,isLate){
  if(isLate){
    return styles.TextTimeLateStyle;
  }else if(isStamp){
    return styles.TextDateTimeStyle;
  }else{
    return styles.TextDateTimeCountStyle;
  }
 }
 renderPunchIn(puncIn,isStamp,isLate){
    if(puncIn || puncIn==""){
      return (<Text allowFontScaling={false}style={this.renderStyle(isStamp,isLate)}>{puncIn}</Text>)
    }else{
      return (<Text allowFontScaling={false}style={styles.TextDateTimeStyleNotValid}>{I18n.t('EnterTime')}</Text>)
    }
  
 } 
 renderPunchButton(){
   if((this.state.timeRecordType=="I"&& this.props.shiftData.TimeRecordIn==null) || (this.state.timeRecordType=="O" && this.props.shiftData.TimeRecordOut==null))
   return (<Button transparent onPress={this.punchIn.bind(this)}>
                    <IconTello style={{color:"#ffff"}} size={em(3)} name="hhmm-14" />
                  </Button>)
 }
 renderPunchInfo(){
   if(!this.props.isHoliDay)
   return (   <Row style={{marginTop:responsiveHeight(2)}}>
                <Col style={{flexDirection:"row",alignItems:"center"}} size={70}>
                    {this.renderPunchIn(this.state.punchInTime,this.state.updateShift!="I")}
                    {/*<Text allowFontScaling={false}style={styles.TextDateTimeStyle}>{this.state.punchOutTime}</Text>*/}
                    {this.renderPunchIn(this.state.punchOutTime,this.state.updateShift!="O")}
                </Col>
                <Col size={30}>
                  {this.renderPunchButton()}
                </Col> 
              </Row>);
    else
    return ( <Row style={{marginTop:responsiveHeight(2),flex:1,alignItems:'center',justifyContent:'center'}}>
                <Col style={{flexDirection:"row",alignItems:"center",justifyContent:'center',flex:1}} size={100} >
                    <Text allowFontScaling={false}style={styles.TextDateTimeHoliday}>{I18n.t('DayOff')}</Text>
                </Col>
             </Row>);
 }


  render(){
  
  return(
    <View style={styles.workShiftContainerStyle}>
      <Grid style={styles.gridStyle}>
        <Row size={85}>
          <Col size={25} >
            <Row size={5}/>
              <Row size={20} style={styles.RowStyle1}>
                  <Body >
                    <Text allowFontScaling={false}style={styles.TextDateStyle1}>{this.state.DateTime[0]}</Text>
                    <Text allowFontScaling={false}style={styles.TextDateStyle2}>{this.state.DateTime[2]}</Text>
                    <Text allowFontScaling={false}style={styles.TextDateStyle3}>{this.state.DateTime[1]} {this.state.DateTime[3].substring(2, 4)}</Text>
                    <Text allowFontScaling={false}style={styles.TextDateStyle4}>{this.props.shiftData.shift_name?`(${this.props.shiftData.shift_name})`:""}</Text>
                  
                  </Body>
              </Row>
            <Row size={5}/>
          </Col>
          <Col size={75}>
            <Row style={{marginTop:2}}>
              <Col size={20} >
                <Bounceable
                  level={1.1}>
                  <Thumbnail   source={{uri:`data:image/jpeg;base64,${this.props.user.IMG_BASE}`}} style={styles.bodyImage} />
                </Bounceable>
              </Col>
              <Col size={75}>
                <Text allowFontScaling={false}style={styles.TextNameStyle1}>{this.props.user.FULL_NAME_TH}</Text>
                <Text allowFontScaling={false}style={styles.TextNameStyle2}>{this.props.user.POSITION_NAME}</Text>
              </Col>
            </Row>
            {this.renderPunchInfo()}
            <Row style={styles.RowStyle2}>
              <Col size={40}>
                <Row>
                  <Text allowFontScaling={false}note style={styles.TextTimeStyle1}>{this.state.WORK_START_TM}</Text>
                </Row>
                <Row>
                  <Text allowFontScaling={false}note style={styles.TextTimeStyle2}>{I18n.t('TimeIn')}</Text>
                </Row>
              </Col>
              <Col size={40}>
                <Row>
                  <Text allowFontScaling={false}note style={styles.TextTimeStyle3}>{this.state.WORK_END_TM}</Text>
                </Row>
                <Row>
                  <Text allowFontScaling={false}note style={styles.TextTimeStyle4}>{I18n.t('TimeOut')}</Text>
                </Row>
              </Col>
              <Col size={20}>
                <Row>
                  <Text allowFontScaling={false}note style={styles.TextTimeStyle5}>+</Text>
                </Row>
                <Row>
                  <Text allowFontScaling={false}note style={styles.TextTimeStyle6}>OT</Text>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row><Row  style={styles.RowStyle3} size={15}>
          <Body >
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight:20}}>
                <Text allowFontScaling={false}style={styles.TextColor1}>{I18n.t('PlaceWork')}</Text>
              </View>
              <View >
                  <Icon name='compass' size={20} color='#ffff'/>
              </View><View >
                  <Text allowFontScaling={false}style={styles.TextColor2}> {this.state.branch_name} </Text>
              </View>
            </View>
          </Body>
        </Row>
      </Grid>
    </View>
  );
  }
}

I18n.fallbacks = true;

I18n.translations = {
  en: {
	EnterTime: 'Not enter time',
    DayOff: 'Today is day off',
    TimeIn: 'Time in',
    TimeOut: 'Time out',
	PlaceWork: 'Place work'
  },
  th: {
	EnterTime: 'ไม่ได้ลงเวลา',
    DayOff: 'วันนี้เป็นวันหยุด',
    TimeIn: 'เวลาเข้า',
    TimeOut: 'เวลาออก',
	PlaceWork: 'สถานที่เข้างาน'
  },
};

export default PunchIn;