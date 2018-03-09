import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,Alert
} from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Text } from 'native-base';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react';
import {post,get} from '../api';
import Loading from '../components/loading';
import CardHeader from '../components/cardHeader';
import store from 'react-native-simple-store';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {convertByFormatShort, disbackButton} from '../utils/staffioUtils';
import CardNone from '../components/cardProgress/cardNone';
import PTRView from 'react-native-pull-to-refresh';
import I18n from '../utils/i18n';
import ActionButton from '../components/stffioActionButton/ActionButton';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/fonts/config.json'
import Swipeable from 'react-native-swipeable';
import app from '../stores/app'
import moment from 'moment';
import OTPersonalCard from '../components/ot/OTPersonalCard'
import OTTimeRecord from '../components/ot/OTTimeRecord'
const IconTello = createIconSetFromFontello(fontelloConfig);
@inject('leaveStore')
@observer

export default class OTScreen extends React.Component {
  componentWillMount(){
		disbackButton();
	}
  constructor(props){
    super(props);
    this.openOTDetail = this.openOTDetail.bind(this);
    this.state={isLoading:false,isFocus:false,userData:{}, leaveList:[],loading:true,leaveBalances:[],isCancel:false}
    this._refresh = this._refresh.bind(this);
    this.onSwitch = this.onSwitch.bind(this);
    this.filterBalance = this.filterBalance.bind(this);
    this.app = app
    if(this.app.locale && moment){
      moment().locale(this.app.locale);
      }
  }
  static navigationOptions = {
    header: null,
  };
  async componentDidMount(){
   
     const userData = await store.get("USER");
     this.getLeaveList(userData);
     this.setState({userData:userData});
   
  }
  async getLeaveList(user,leaveTypeCode){
    try{
    let params  = {};
    params.param = {};
    params.param.EMP_CODE = user.EMP_CODE;
    params.param.PAGE = 1;
    params.param.PAGE_SIZE =  1000;
    // params.param.ReqStatus= "01";
    params.param.LEAVE_TYPE_CODE = leaveTypeCode;

    // params.user = {};
    // params.user.LOGIN_CUSTOMER_CODE = user.CUSTOMER_CODE;
    // params.user.LOGIN_ORG_CODE = user.ORG_CODE;
    // params.user.LOGIN_UNIT_CODE = user.UNIT_CODE;
    // params.user.LOGIN_USER_NAME = user.USER_NAME;
    // params.user.LOGIN_USER_ID = user.USER_ID;
    // params.user.LOGIN_EMP_CODE = user.EMP_CODE;

    const response = await post("ESSServices/SearchLeaveListforEmp",params);
    const infos = this.transformToInfos(response.objData);
    const leaveBalances = await this.getLeaveBalance(user);

    this.setState({leaveList:infos,leaveBalances:this.transFormStatHis(leaveBalances),loading:false});
      }catch(e){
        console.log(e);
        Alert.alert(
          `${I18n.t('Error')}`,
          `${I18n.t('notconnect')}`,
          [
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
          ]
        )
    }
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
  openOTDetail(data){
    this.props.leaveStore.leaveData = data;
     this.props.navigator.push({
        screen: 'staffio.OTDetailScreen', // unique ID registered with Navigation.registerScreen
        title: undefined, // navigation bar title of the pushed screen (optional)
        passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
        animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
        navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
        navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
      });
  }

  openCreateOT(){
     this.props.navigator.push({
        screen: 'staffio.CreateLeave', // unique ID registered with Navigation.registerScreen
        title: undefined, // navigation bar title of the pushed screen (optional)
        passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
        animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
        animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
        navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
        navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
      });
  }
   onCancelModal(data){
    this.setState({loading:true});
    this.props.navigator.showLightBox({
      screen: "staffio.InputCancelModal", // unique ID registered with Navigation.registerScreen
      passProps: {title:`${I18n.t('specifycauseTitle')}`,remark1:`${I18n.t('otherCause')}`,label:`${I18n.t('causeOfcanncel')}`,remark2:`(${I18n.t('specifymo')})`
      ,cancel:this.cancelModal
      ,ok:this.returnLeave,data:data}, // simple serializable object that will pass as props to the lightbox (optional)
      style: styleInputModal,
      adjustSoftInput: "nothing", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
     });
  }
  onEditModal(data){
   
  }

   renderList(){
    if(this.state.leaveList && this.state.leaveList.length >0){
      return this.state.leaveList.map(info =>
      (!this.state.isCancel && (info.requestStatusCode != '06' && info.requestStatusCode != '05') 
      || this.state.isCancel && (info.requestStatusCode == '06' || info.requestStatusCode == '05')) && 
      <Swipeable  key={info.requestLeaveNo} rightButtons={[
        <TouchableOpacity onPress={()=>this.onEditModal(info)}>
          <View style={[styles.rightSwipeItem]}>
            <Icon name="pencil-alt" size={responsiveFontSize(2)} style={{ color: 'white' ,backgroundColor:'transparent'}} />
          </View>
          {this.app && this.app.locale=='en'?<Text style={{marginLeft:responsiveWidth(5),fontFamily:'Kanit',fontSize:responsiveFontSize(1.5),color:'#7e6560'}}>{I18n.t('editReq')}</Text>:<Text style={{marginLeft:responsiveWidth(2),fontFamily:'Kanit',fontSize:responsiveFontSize(1.5),color:'#7e6560'}}>{I18n.t('editReq')}</Text>}
        </TouchableOpacity>,

        <TouchableOpacity onPress={()=>this.onCancelModal(info)}>
          <View style={[styles.rightSwipeItem]}>
            <Icon name="times" size={responsiveFontSize(2)} style={{ color: 'white',backgroundColor:'transparent' }} />
          </View>
          {this.app && this.app.locale=='en'?<Text style={{marginLeft:responsiveWidth(3.5),fontFamily:'Kanit',fontSize:responsiveFontSize(1.5),color:'#7e6560'}}>{I18n.t('canreq')}</Text>:<Text style={{marginLeft:responsiveWidth(1),fontFamily:'Kanit',fontSize:responsiveFontSize(1.5),color:'#7e6560'}}>{I18n.t('canreq')}</Text>}
        </TouchableOpacity>,  
      ]}>
      <TouchableOpacity  key={info.requestLeaveNo} onPress={(e) => this.openOTDetail(info)}>  
       <OTPersonalCard info={info} />
      </TouchableOpacity>
      </Swipeable>
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

            <PTRView onRefresh={this._refresh}>
              
              {!this.state.loading  ? (<View style={{paddingTop:5}}><OTTimeRecord/></View>)
              :(<View style={{flex:1,alignItems:"center",justifyContent:"center",marginTop:100}}><Loading mini={true}/></View>)}
              {!this.state.loading  && this.renderList()}
          </PTRView>
          <ActionButton IconButton={<IconTello name="hhmm-29" size={25} style={{ color: 'white' }} />} size={responsiveWidth(17)} buttonColor="#fbaa3e" offsetX={0}>
             <ActionButton.Item marginRight={responsiveWidth(5)} marginBottom={-responsiveHeight(1)} buttonColor='transparent' onPress={(e) => this.openCreateOT()}>
              <Icon name="clock-o" style={[styles.actionButtonIcon]} />
              <Text style={{fontFamily: 'Kanit-Medium', color:'white', fontSize:responsiveFontSize(1.5)}}>ขอ OT</Text>
            </ActionButton.Item>
           <ActionButton.Item marginRight={responsiveWidth(25)} marginBottom={-(responsiveHeight(15))} buttonColor='transparent' onPress={(e) => console.log()}>
              <Icon name="search" style={styles.actionButtonIcon} />
             <Text style={{fontFamily: 'Kanit-Medium', color:'white', fontSize:responsiveFontSize(1.5)}}>ค้นหา OT</Text>
            </ActionButton.Item>
          </ActionButton>
      </Container>
    );
  }

}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: responsiveFontSize(3),
    height: 22,
    color: 'white',
  },
  rightSwipeItem: {
    justifyContent: 'center',
    backgroundColor: '#fbaa3e',
    borderWidth:responsiveWidth(1),
    borderColor: 'white',
    borderRadius:responsiveWidth(7.5),
    alignItems: 'center',
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    marginTop:responsiveHeight(1.5),
  },
});