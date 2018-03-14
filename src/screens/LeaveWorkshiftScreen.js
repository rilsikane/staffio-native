import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity,Switch,TouchableHighlight,ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../utils/i18n';
import LeaveWorkshift from '../components/leave/LeaveWorkshift';
import CardHeader from '../components/cardHeader';
import {post,get} from '../api';
import store from 'react-native-simple-store';
import {convertDate, disbackButton} from '../utils/staffioUtils';
import { observer, inject } from 'mobx-react';

@inject('leaveStore')
@observer
export default class LeaveWorkshiftScreen extends React.Component {
  constructor(props) {
        super(props);
        this.state = {custom:false,pressStatus: false,leaveWorkshifts:[],startDate:"",endDate:""}
        this.onSwitch = this.onSwitch.bind(this);
        this.ok = this.ok.bind(this);
        this.switchShiftDay = this.switchShiftDay.bind(this);

  }
  onSwitch(value){  
    this.setState({custom:value});
  }
  componentDidMount(){
    this.init();
  }
  async init(){
    let startDate,endDate;
    startDate = this.props.dayList[0];
    if(this.props.dayList.length ==1){
      endDate = this.props.dayList[0];
    }else{
      endDate = this.props.dayList[this.props.dayList.length-1];
    }
    let leaveWorkshifts = await this.getShiftPatternByPersonal(startDate.timestamp,endDate.timestamp);
    let leaveList = [];
    let leaveGroup = [];
    let index = 0;
    if(leaveWorkshifts && leaveWorkshifts.length >0){
      leaveWorkshifts.map(leave =>{
        if(leaveList.indexOf(leave.DAY_DATE) ==-1){
            let shiftData = [];
            shiftData.push(leave)
            leaveGroup.push({[leave.DAY_DATE]:{shiftData :shiftData,id:leave.DAY_DATE}});
            leaveList.push(leave.DAY_DATE);
            index ++
        }else{
            // leaveGroup.push({[leave.DAY_DATE]:{shiftData : leaveGroup[leave.DAY_DATE].push(leave),leaveDate:leave.DAY_DATE}});
            let leaveG = leaveGroup[index-1];
            leaveG[leave.DAY_DATE].shiftData.push(leave);
            leaveList.push(leave.DAY_DATE);
        }
      });
    }

    this.setState({leaveWorkshifts:leaveGroup,startDate:startDate.timestamp,endDate:endDate.timestamp});
  }
  getShiftPatternByPersonal = async (startDate,endDate)=>{
    const user = await store.get("USER");
    let params  = {};
    params.EmpCode = user.EMP_CODE;
    params.startDate = convertDate(startDate);
    params.endDate = convertDate(endDate);
    params.orgCode = user.ORG_CODE;
    params.pagesize = 100;
    params.page=1;
    const response = await post("GetShiftPatternByPersonal",params);
    // const response = customData2;
    return response.data;
  }
  renderWorkShift(){
      return this.state.leaveWorkshifts.map(lw =>{
        return <LeaveWorkshift key={Object.keys(lw)} switchShiftDay={this.switchShiftDay}
        id={Object.keys(lw)} leavePattern={lw}/>
      })
    
  }
  switchShiftDay(shiftData,id){
    console.log("shiftDatashiftData"+shiftData+"----"+id);
    let leaveWorkshifts  = [... this.state.leaveWorkshifts];
    let index = leaveWorkshifts.findIndex(lw =>  Object.keys(lw) == id);
    let lwIndex = leaveWorkshifts[index][id].shiftData.findIndex(el => el.PATTERN_ID === shiftData.PATTERN_ID);
    leaveWorkshifts[index][id].shiftData[lwIndex] = shiftData;
    this.setState({leaveWorkshifts:leaveWorkshifts});
  }
  async ok(){
    const user = await store.get("USER");
    let LeaveReq = {};
    LeaveReq.EMP_CODE = user.EMP_CODE;
    LeaveReq.EMP_COMPANY_CODE = user.ORG_CODE;
    LeaveReq.EMP_UNIT_CODE = user.UNIT_CODE;
    LeaveReq.LEAVE_TYPE_CODE = this.props.leaveStore.leaveReqLeaveType.LEAVE_TYPE_CODE||"VC";
    LeaveReq.START_DATE = new Date(this.state.startDate)
    LeaveReq.END_DATE = new Date(this.state.endDate)
   
    LeaveReq.PERIOD_YEAR = `${new Date().getFullYear()}`;
    let ListLeaveRequestDetail = [];
    let sumMinute = 0;
    LeaveReq.TOTAL_LEAVEDAY = 0.0;
    this.state.leaveWorkshifts.map(lw =>{
      let  leavePattern = lw[Object.keys(lw)];
      leavePattern.shiftData.map(shiftData =>{
           let leaveReq = {};
            leaveReq.EMP_CODE = shiftData.EMP_CODE;
            leaveReq.EFFECTIVE_DATE = LeaveReq.START_DATE;
            leaveReq.START_DATE = shiftData.DAY_DATE;
            leaveReq.START_TIME = shiftData.WORK_START_TM_EDIT ?shiftData.WORK_START_TM_EDIT.substring(0,5) : shiftData.WORK_START_TM.substring(0,5);
            leaveReq.END_DATE = shiftData.DAY_DATE;
            leaveReq.END_TIME = shiftData.WORK_END_TM_EDIT ? shiftData.WORK_END_TM_EDIT.substring(0,5):shiftData.WORK_END_TM.substring(0,5);
            // leaveReq.LEAVE_ACTION = "FULLDAY";
            if(!shiftData.LEAVE_ACTION){
              shiftData.LEAVE_ACTION = "FULLDAY";
              LeaveReq.LEAVE_ACTION = "FULLDAY";
            }
            if(shiftData.LEAVE_ACTION!="FULLDAY"){
              LeaveReq.TOTAL_LEAVEDAY+=0.5
            }else{
              LeaveReq.TOTAL_LEAVEDAY+=1.0
            }
            leaveReq.LEAVE_MINUTE = this.calculateMinute(shiftData.WORK_START_TM_EDIT ? shiftData.WORK_START_TM_EDIT: shiftData.WORK_START_TM,shiftData.WORK_END_TM_EDIT ? shiftData.WORK_END_TM_EDIT :shiftData.WORK_END_TM);
            sumMinute +=  leaveReq.LEAVE_MINUTE;
            leaveReq.SHFT_CODE = shiftData.SHFT_CODE;
            ListLeaveRequestDetail.push(leaveReq);
            
      })
   
    });
    //LeaveReq.TOTAL_LEAVEDAY =  this.round51(sumMinute/(8*60));

    let login = {};
    login.LOGIN_EMP_CODE = user.EMP_CODE;
    login.LOGIN_CUSTOMER_CODE = user.CUSTOMER_CODE;
    let params = {};
    params.LeaveReq = LeaveReq;
    params.ListLeaveRequestDetail = ListLeaveRequestDetail;
    params.login = login;
    this.props.leaveStore.leaveReqData = params;
    this.props.navigator.push({
      screen: 'staffio.LeaveConfirmScreen', // unique ID registered with Navigation.registerScreen
      title: undefined, // navigation bar title of the pushed screen (optional)
      animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
      navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
      navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
    });

    // console.log(JSON.stringify(params));
    // let response = await post("ESSServices/CreateESSLeaveRequest",params);
    // console.log(response);

  }
  round51(num){
    let decimal =  num % 1;
    if(decimal > 0.50){
        return Math.ceil(num);
    }else{
         return Math.floor(num)+0.5;
    }
  }
  calculateDay(firstDate,secondDate){
    var oneDay = 24*60*60*1000;
    var diffDays = Math.round((secondDate- firstDate)/(oneDay));
    return diffDays;
  }
  calculateMinute(workStart,workEnd){
    let startSplit = workStart.split(":");
    let endSplit = workEnd.split(":");
    let hour = Number(endSplit[0]) - Number(startSplit[0]);
    let minute = Number(endSplit[1]) - Number(startSplit[1]);
    let sec = Number(endSplit[2]) - Number(startSplit[2]);
    
    let summinute =  ((hour||0) * 60) + (minute||0)

    return summinute;
  }
  render() {
    return (
        <Container style={{backgroundColor: '#ffe9d4'}}>
             <CardHeader title={this.props.leaveStore.leaveReqLeaveType.LEAVE_TYPE_NAME} goBack={()=>this.props.navigator.pop()} next={this.ok}
             title={`${I18n.t('titleCreate')}`} titleNext={`${I18n.t('next')}`}/>
                {this.state.leaveWorkshifts && 
                <ScrollView>
                  {this.renderWorkShift()}
                </ScrollView>}
        </Container>
    );
  }
}

const styles = StyleSheet.create({
   buttonTime: {
    alignItems: 'center',
    flex:1,
    borderWidth:responsiveWidth(0.5),
    borderRadius:responsiveWidth(2.3),
    borderColor:'#fbaa3e',
    height:responsiveHeight(6),
    margin:responsiveWidth(2),
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f1f2f6'
   },
   textbuttonTime: {
    fontFamily:'Kanit-Medium', 
    color:'#fbaa3e', 
    fontSize:responsiveFontSize(2),
    textAlign:'left',
   },
   
});
