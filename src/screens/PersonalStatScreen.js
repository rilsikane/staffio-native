import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Text } from 'native-base';
// import LeaveCalendar from '../components/LeaveCalendar'
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react';
import {post,get} from '../api';
import Loading from '../components/loading';
import Profile from '../components/leave/Profile';
import LeaveCard from '../components/leave/LeaveCard';
import LeaveStatCard from '../components/leave/LeaveStatCard';
import CardHeader from '../components/cardHeader';
import LeavePersonalCard from '../components/leave/LeavePersonalCard'
import ToggleLeave from '../components/leave/ToggleLeave';
import store from 'react-native-simple-store';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {convertByFormatShort, disbackButton} from '../utils/staffioUtils';
import CardNone from '../components/cardProgress/cardNone';
import PTRView from 'react-native-pull-to-refresh';
import I18n from '../utils/i18n';
import LeavePersonalCardNew from '../components/leave/LeavePersonalCard(Fix-style)'
@inject('leaveStore')
@observer

export default class PersonalStatScreen extends React.Component {
  componentWillMount(){
		disbackButton();
	}
  constructor(props){
    super(props);
    this.openLeaveDetail = this.openLeaveDetail.bind(this);
    this.state={isLoading:false,isFocus:false,userData:{}, leaveList:[],loading:true,leaveBalances:[],isCancel:false}
    this._refresh = this._refresh.bind(this);
    this.onSwitch = this.onSwitch.bind(this);
    this.filterBalance = this.filterBalance.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  async componentWillMount(){
     const userData = await store.get("USER");
     this.getLeaveList(userData);
     this.setState({userData:userData});
    
  }
  async getLeaveList(user,leaveTypeCode){
    let params  = {};
    params.param = {};
    params.param.EMP_CODE = user.EMP_CODE;
    params.param.PAGE = 1;
    params.param.PAGE_SIZE =  100;
    params.param.ReqStatus= "01";
    params.param.LEAVE_TYPE_CODE = leaveTypeCode;
    const response = await post("ESSServices/SearchLeaveListforEmp",params);
    const infos = this.transformToInfos(response.objData);
    const leaveBalances = await this.getLeaveBalance(user);

    this.setState({leaveList:infos,leaveBalances:this.transFormStatHis(leaveBalances),loading:false});
   
  }
  async _refresh(){
    this.setState({loading:true});
    const userData = await store.get("USER");
    // const userData = await store.get("USER");
    // const response = await this.GetTimeRecordHistory(userData,null,null);
    // this.setState({listTimeReocords:response,isLoading:false})
    await this.getLeaveList(userData);
  }
  async filterBalance(leaveTypeCode){
    this.setState({loading:true});
    const userData = await store.get("USER");
    await this.getLeaveList(userData,leaveTypeCode)
  }
  async getLeaveBalance(user){
    let params  = {};
    
    params.EmpCode = user.EMP_CODE;
    params.LeaveTypeCode = '';
    params.flag =  "M";
    
    const response = await get("ESSServices/GetLeaveRemainByEmpCode",params);
    const infos = response.objData;

    return infos;
  }

  transformToInfos(list){
    let infos = [];
    for(let i=0;i<list.length;i++){
      let info = {};
      info.name = list[i].FULL_NAME_TH;
      info.empId = list[i].EMP_CODE;
      info.positions = list[i].PositionNameEN;
      info.type = list[i].LEAVE_TYPE_NAME;
      info.typeCode = list[i].LEAVE_TYPE_CODE;
      info.startDate = convertByFormatShort(new Date(list[i].START_DATE).getTime(),"DD MMM ");
      info.endDate = convertByFormatShort(new Date(list[i].END_DATE).getTime(),"DD MMM ");
      info.createDate = convertByFormatShort(new Date(list[i].CREATED_DATE).getTime(),"DD MMM ");
      info.total = list[i].TOTAL_LEAVEDAY;
      info.requestLeaveNo = list[i].REQUEST_LEAVE_NO;
      info.reasonName = list[i].REASON_NAME;
      info.color = this.getLeaveColor(list[i].LEAVE_TYPE_CODE);
      info.requestStatus = list[i].REQUEST_STATUS_SHOW;
      info.requestStatusCode = list[i].REQUEST_STATUS;
      info.flag = list[i].flag;
      info.isCancel = list[i].flag == 2;
      infos.push(info);
  }
    return infos;
  }
  transFormStatHis(list){
     let infos = [];
      for(let i=0;i<3;i++){
        let info = {};
        info.name = list[i].LEAVE_NAME;
        info.amount = list[i].USED||0;
        info.id = list[i].LEAVE_TYPE_CODE;
        infos.push(info);
    }
    return infos;
  }
  getLeaveColor(typeCode){
    switch (typeCode) {
      case 'SC_1':
        return "#fa6575";
        break;
      case 'VC':
        return "#8BC34C";
        break;
      case 'PERS-01':
        return "#1abbbd";
        break;
      default:
       return "#f5dc0f";
    }
  }
  onSwitch(value){
    this.setState({isCancel:value});
  }
  openLeaveDetail(data){
    this.props.leaveStore.leaveData = data;
     this.props.navigator.push({
        screen: 'staffio.LeaveDetailScreen', // unique ID registered with Navigation.registerScreen
        title: undefined, // navigation bar title of the pushed screen (optional)
        passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
        animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
        navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
        navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
      });
  }

   renderList(){
    if(this.state.leaveList && this.state.leaveList.length >0){
      return this.state.leaveList.map(info =>
      (!this.state.isCancel && (info.requestStatusCode != '06' && info.requestStatusCode != '05') 
      || this.state.isCancel && (info.requestStatusCode == '06' || info.requestStatusCode == '05')) && <TouchableOpacity  key={info.requestLeaveNo} onPress={(e) => this.openLeaveDetail(info)}>  
       <LeavePersonalCardNew info={info} />
      </TouchableOpacity>
      );
    }else{
      return (
        <View style={{flex:1,marginTop:10,marginLeft:2.5,marginRight:2.5}}> 
            <CardNone /> 
        </View>
      )
    }
}
  render() {
    const options = [
      {label:'ขออนุมัติ',value:'appr' },
      {label:'ขอยกเลิก',value:'cancel' }
    ];
    return (
      
      <Container style={{backgroundColor: '#ffe9d4'}}>
         
          <CardHeader title={`${I18n.t('Stat')}`}/>

            {/* <View style={{height:responsiveHeight(30)}}>
            <Profile name={this.state.userData.FULL_NAME_TH} positions={this.state.userData.POSITION_NAME} 
              img={{uri:`data:image/jpeg;base64,${this.state.userData.IMG_BASE}`}}/>
            </View> */}
            <PTRView onRefresh={this._refresh}>
              
              {!this.state.loading  ? (<View style={{paddingTop:5}}><LeaveStatCard filter={this.filterBalance}
              title={`${I18n.t('History')}`} date={''} data={this.state.leaveBalances}/></View>)
              :(<View style={{flex:1,alignItems:"center",justifyContent:"center",marginTop:100}}><Loading mini={true}/></View>)}
              {/* {!this.state.loading  && <ToggleLeave options={options} onSwitch={this.onSwitch}/>}   */}
              {!this.state.loading  && this.renderList()}
          </PTRView>
      </Container>
    );
  }

}