import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  I18nManager
} from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Text } from 'native-base';
// import LeaveCalendar from '../components/LeaveCalendar'
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react';
import {post,get} from '../api';
import Loading from '../components/loading';
import Profile from '../components/leave/Profile';
import DetailCard from '../components/leave/DetailCard';
import CardHeader from '../components/cardHeader';
import store from 'react-native-simple-store';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {convertByFormat} from '../utils/staffioUtils';
import LeaveStatCard from '../components/leave/LeaveStatCard';
import ActionButton from '../components/stffioActionButton/ActionButton';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/fonts/config.json';
import I18n from '../utils/i18n';


const IconTello = createIconSetFromFontello(fontelloConfig);
const modalStyle = {
  backgroundBlur: "dark",
  backgroundColor: "rgba(0,0,0,.5)",
  height:responsiveHeight(70),
  width:responsiveWidth(90)
}
@inject('leaveStore')
@observer
export default class LeaveDetailScreen extends React.Component {
  
  constructor(props){
    
    super(props);
    this.state={userData:{}, leaveBalance:{},leaveData:{},loading:true,leaveBalances:[]}
    this.goBack = this.goBack.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.approveLeave = this.approveLeave.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.rejectLeave = this.rejectLeave.bind(this);
    this.returnLeave = this.returnLeave.bind(this);
    this.onReturnPress = this.onReturnPress.bind(this);
    this.onApprovePress = this.onApprovePress.bind(this);
    this.onRejectPress = this.onRejectPress.bind(this);
    this.closeScreen = this.closeScreen.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  async componentWillMount(){
     const userData = await store.get("USER");
    //  const leaveData = this.props.leaveStore.leaveData;
    this.setState({userData:userData});
    await this.getLeaveBalance(userData);
   
  }
  async getLeaveBalance(user){
    let params  = {};
    
    params.EmpCode = this.props.leaveStore.leaveData.empId;
    if(!this.props.isAppr){
      params.LeaveTypeCode = this.props.leaveStore.leaveData.typeCode;
    }else{
      params.LeaveTypeCode = "";
    }
    params.flag =  "M";
    const response = await get("ESSServices/GetLeaveRemainByEmpCode",params);
    const infos = response.objData;
    
    let leaveBalance = infos.filter(info => info.LEAVE_TYPE_CODE==this.props.leaveStore.leaveData.typeCode);
    let leaveBalances = [];
    if(this.props.isAppr){
      leaveBalances = this.transFormStatHis(infos);
    }
    this.setState({leaveBalance:leaveBalance[0],loading:false,leaveBalances:leaveBalances});
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
  goBack(){
    this.props.navigator.pop({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
  }
  closeScreen(){
    this.props.navigator.dismissLightBox();
    setTimeout(() => {
    this.props.navigator.resetTo({
      screen: 'staffio.LeaveApprScreen', // unique ID registered with Navigation.registerScreen
      title: undefined, // navigation bar title of the pushed screen (optional)
      animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
      navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
      navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
    });
  },500);
    
  }
  onApprovePress(data){
    //getConfirmModal(this.approveLeave,this.cancelModal,data,this.props.navigator);
    if(data.requestStatusCode=='L'){
      this.props.navigator.showLightBox({
        screen: "staffio.ConfirmModalScreen", // unique ID registered with Navigation.registerScreen
        passProps: {title:`${I18n.t('ConfirmApprove')} : ${data.type}`,msg:`${I18n.t('ConfirmApproveLeave')}`
        ,msg2: `${data.name}` ,cancel:this.cancelModal
        ,ok:this.approveLeave,data:data}, // simple serializable object that will pass as props to the lightbox (optional)
        style: modalStyle,
        adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
       });
    }else{
      this.props.navigator.showLightBox({
        screen: "staffio.ConfirmModalScreen", // unique ID registered with Navigation.registerScreen
        passProps: {title:`${I18n.t('CancelApprove')} : ${data.type}`,msg:`${I18n.t('CancelapproveLeave')}`
        ,msg2: `${data.name}` ,cancel:this.cancelModal
        ,ok:this.approveLeave,data:data}, // simple serializable object that will pass as props to the lightbox (optional)
        style: modalStyle,
        adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
       });
    }
  }
  cancelModal(){
    this.setState({loading:false});
    this.props.navigator.dismissLightBox();
  }
  onRejectPress(data){
    //getInputModal(I18n.t('Reject'),this.rejectLeave,this.cancelModal,data,"resize",this.props.navigator)    
    this.props.navigator.showLightBox({
      screen: "staffio.InputModalScreen", // unique ID registered with Navigation.registerScreen
      passProps: {title:`${I18n.t('Reject')} : ${data.type}`,remark:`${I18n.t('Cause')}`
      ,cancel:this.cancelModal,placeholder:`${I18n.t('SpecifyCause')}`
      ,ok:this.rejectLeave,data:data}, // simple serializable object that will pass as props to the lightbox (optional)
      style: modalStyle,
      adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
     });
  }
  onReturnPress(data){
    //getInputModal(I18n.t('ReturnLeaveDetail'),this.returnLeave,this.cancelModal,data,"resize",this.props.navigator)
    this.props.navigator.showLightBox({
      screen: "staffio.InputModalScreen", // unique ID registered with Navigation.registerScreen
      passProps: {title:`${I18n.t('ReturnLeaveDetail')} : ${data.type}`,remark:`${I18n.t('Cause')}`
      ,cancel:this.cancelModal,placeholder:`${I18n.t('SpecifyCause')}`
      ,ok:this.returnLeave,data:data}, // simple serializable object that will pass as props to the lightbox (optional)
      style: modalStyle,
      adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
     });
  }
  
  async approveLeave(data){
    this.props.navigator.dismissLightBox();
    const userData = await store.get("USER");
    let params = {};
    params.ApproveBy = userData.EMP_CODE;
    params.EMP_CODE = data.empId;
    params.LEAVE_TYPE_CODE = data.typeCode;
    params.OrgCode = data.orgCode;
    params.REQUEST_LEAVE_NO = data.requestLeaveNo;
    let response = await post("ESSServices/ApproveLeaveRequest",params);
    if(response){
      setTimeout(() => {
        if(data.requestStatusCode=='L'){
          this.props.navigator.showLightBox({
            screen: "staffio.MsgModalScreen", // unique ID registered with Navigation.registerScreen
            passProps: {title:`${I18n.t('Approve')} : ${data.type}`,msg:`${I18n.t('ApproveSuccess')}`
            ,ok:this.closeScreen}, // simple serializable object that will pass as props to the lightbox (optional)
            style: modalStyle,
            adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
          });
        }else{
          this.props.navigator.showLightBox({
            screen: "staffio.MsgModalScreen", // unique ID registered with Navigation.registerScreen
            passProps: {title:`${I18n.t('CancelApproveD')} : ${data.type}`,msg:`${I18n.t('CancelapproveLeaveD')}`
            ,ok:this.closeScreen}, // simple serializable object that will pass as props to the lightbox (optional)
            style: modalStyle,
            adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
          });
        }
      },500);

    }
  }
  async rejectLeave(data){
    this.props.navigator.dismissLightBox();
    const userData = await store.get("USER");
    let params = {};
    params.ApproveBy = userData.EMP_CODE;
    params.EMP_CODE = data.empId;
    params.LEAVE_TYPE_CODE = data.typeCode;
    params.OrgCode = data.orgCode;
    params.REQUEST_LEAVE_NO = data.requestLeaveNo;
    let response = await post("ESSServices/RejectLeaveRequest",params);
    if(response){
      setTimeout(() => {
      this.props.navigator.showLightBox({
        screen: "staffio.MsgModalScreen", // unique ID registered with Navigation.registerScreen
        passProps: {title:`${I18n.t('Reject')} : ${data.type}`,msg:`${I18n.t('RejectSuccess')}`
        ,ok:this.closeScreen}, // simple serializable object that will pass as props to the lightbox (optional)
        style: modalStyle,
        adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
       });
      },500);
    }
  }
  async returnLeave(data){
    this.props.navigator.dismissLightBox();
    const userData = await store.get("USER");
    let params = {};
    params.ApproveBy = userData.EMP_CODE;
    params.EMP_CODE = data.empId;
    params.LEAVE_TYPE_CODE = data.typeCode;
    params.OrgCode = data.orgCode;
    params.REQUEST_LEAVE_NO = data.requestLeaveNo;
    let response = await post("ESSServices/ReturnLeaveRequest",params);
    if(response){
      setTimeout(() => {
        this.props.navigator.showLightBox({
          screen: "staffio.MsgModalScreen", // unique ID registered with Navigation.registerScreen
          passProps: {title:`${I18n.t('ReturnLeaveDetail')} : ${data.type}`,msg:`${I18n.t('ReturnSuccess')}`
          ,ok:this.closeScreen}, // simple serializable object that will pass as props to the lightbox (optional)
          style: modalStyle,
          adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
        });
      },500);
    }
  }

  render() {
    return (
      <Container style={{backgroundColor: '#ffe9d4'}}>
        <CardHeader title={I18n.t('title')} goBack={this.goBack}/>
        <Content>
          <Profile name={this.props.leaveStore.leaveData.name} positions={this.props.leaveStore.leaveData.positions} 
          img={{uri: 'http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png'}}/>
          {!this.state.loading ? <DetailCard type={this.props.leaveStore.leaveData.type} cause={this.props.leaveStore.leaveData.reasonName} 
          start={this.props.leaveStore.leaveData.startDate} end={this.props.leaveStore.leaveData.endDate}  
          total={this.props.leaveStore.leaveData.total} total={this.props.leaveStore.leaveData.total} requestStatus={this.props.leaveStore.leaveData.requestStatus} requestStatusCode={this.props.leaveStore.leaveData.requestStatusCode}
          remain = {this.state.leaveBalance.REMAIN||0} max={this.state.leaveBalance.MAX_DAY+this.state.leaveBalance.BRING_FORWARD} docRef={'ทดสอบ'} typedoc={'ทดสอบ'} isCancel={this.props.leaveStore.leaveData.isCancel}/>
          :<View style={{flex:1,alignItems:"center",justifyContent:"center",marginTop:100}}><Loading mini={true}/></View>
          }
          {(!this.state.loading && this.props.isAppr) && <LeaveStatCard title={`${I18n.t('LeaveStatistics')}`} date={''} data={this.state.leaveBalances} readOnly={true}/>}

        </Content>
         {this.props.isAppr &&
          <ActionButton IconButton={<IconTello name="hhmm-29" size={25} style={{ color: 'white' }} />} size={responsiveWidth(17)} buttonColor="#fbaa3e" offsetX={0}>
             {this.props.leaveStore.leaveData.requestStatusCode=='L' && <ActionButton.Item marginRight={responsiveWidth(2)} marginBottom={-responsiveHeight(8)} buttonColor='transparent'   onPress={() => this.onRejectPress(this.props.leaveStore.leaveData)}>
              <Icon name="times" style={[styles.actionButtonIcon]} />
              <Text style={{fontFamily: 'Kanit-Medium', color:'white', fontSize:responsiveFontSize(1.5)}}>{I18n.t('Reject')}</Text>
            </ActionButton.Item>}
            {this.props.leaveStore.leaveData.requestStatusCode=='L' && <ActionButton.Item marginRight={responsiveWidth(20)} marginBottom={-(responsiveHeight(3.5))} buttonColor='transparent'  onPress={() => this.onReturnPress(this.props.leaveStore.leaveData)}>
              <Icon name="repeat" style={styles.actionButtonIcon} />
             <Text style={{fontFamily: 'Kanit-Medium', color:'white', fontSize:responsiveFontSize(1.5)}}>{I18n.t('ReturnLeaveDetail')}</Text>
            </ActionButton.Item>}
           <ActionButton.Item marginRight={responsiveWidth(28)} marginBottom={-(responsiveHeight(16))} buttonColor='transparent'  onPress={() => this.onApprovePress(this.props.leaveStore.leaveData)}>
              <Icon name="check" style={styles.actionButtonIcon} />
              <Text style={{fontFamily: 'Kanit-Medium', color:'white', fontSize:responsiveFontSize(1.5)}}>{I18n.t('Approve')}</Text>
            </ActionButton.Item>
          </ActionButton>
         }
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
  
});
