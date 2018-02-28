import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert
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
import LeaveApprover from '../components/leave/LeaveApproverCardGreen';
import CardHeader from '../components/cardHeader';
import store from 'react-native-simple-store';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {convertByFormatShort, disbackButton, styleConfirmModal, styleInputModal} from '../utils/staffioUtils';
import CardNone from '../components/cardProgress/cardNone';
import PTRView from 'react-native-pull-to-refresh';
import Swipeable from 'react-native-swipeable';
import ActionButton from '../components/stffioActionButton/ActionButton';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/fonts/config.json'
import I18n from '../utils/i18n';
import ToggleLeave from '../components/leave/ToggleLeave';

const IconTello = createIconSetFromFontello(fontelloConfig);

@inject('leaveStore')
@observer
export default class LeaveApprScreen extends React.Component {
  componentWillMount(){
		disbackButton();
	}
  constructor(props){
    super(props);
    this.openLeaveDetail = this.openLeaveDetail.bind(this);
    this.state={isLoading:false,isFocus:false,userData:{}, leaveList:[],loading:true,leaveBalances:[],isCancel:false,checkSelect:false,selected:false}
    this._refresh = this._refresh.bind(this);
    this.approveLeave = this.approveLeave.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.rejectLeave = this.rejectLeave.bind(this);
    this.returnLeave = this.returnLeave.bind(this);
    this.onReturnPress = this.onReturnPress.bind(this);
    this.onApprovePress = this.onApprovePress.bind(this);
    this.onRejectPress = this.onRejectPress.bind(this);
    this.onSwitch = this.onSwitch.bind(this);
    this.onSelected = this.onSelected.bind(this);
    this.approveLeaveAll = this.approveLeaveAll.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
    this.navigator = this.props.navigator
  }
  static navigationOptions = {
    header: null,
  };
  async componentWillMount(){
     const userData = await store.get("USER");
     this.getLeaveList(userData);
     this.setState({userData:userData});
  }
  async getLeaveList(user){
    let params  = {};
    params.ApproveBy = user.EMP_CODE;
    params.LeaveGroupCode = "ALL";
    params.PAGE = 1;
    params.PAGE_SIZE =  1000;
    const response = await post("ESSServices/GetListApproveLeaveByApprover",params);
    infos = this.transformToInfos(response.objData);
    

    this.setState({leaveList:infos,loading:false});
   
  }
  async _refresh(){
    this.setState({loading:true});
    const userData = await store.get("USER");
    // const userData = await store.get("USER");
    // const response = await this.GetTimeRecordHistory(userData,null,null);
    // this.setState({listTimeReocords:response,isLoading:false})
    await this.getLeaveList(userData);
  }
  
  transformToInfos(list){
    let infos = [];
    for(let i=0;i<list.length;i++){
      let info = {};
      info.name = `${list[i].FIRST_NAME_TH}  ${list[i].LAST_NAME_TH}`;
      info.empId = list[i].EMP_CODE;
      info.positions = list[i].PositionNameEN;
      info.type = list[i].LEAVE_TYPE_NAME_TH;
      info.typeCode = list[i].LEAVE_TYPE_CODE;
      info.startDate = convertByFormatShort(new Date(list[i].LeaveStartDate).getTime(),"DD MMM ");
      info.endDate = convertByFormatShort(new Date(list[i].LeaveEndDate).getTime(),"DD MMM ");
      info.createDate = convertByFormatShort(new Date(list[i].CreatedLeaveDate).getTime(),"DD MMM ");
      info.total = list[i].TOTAL_LEAVEDAY;
      info.requestLeaveNo = list[i].REQUEST_LEAVE_NO; 
      info.reasonName = list[i].LeaveReasonNameTH;
      info.orgCode = list[i].OrgCode;
      info.color = this.getLeaveColor(list[i].LEAVE_TYPE_CODE);
      info.requestStatus = list[i].flaq == 'L' ? I18n.t('ToggleApprove'):I18n.t('ToggleCancel');
      info.requestStatusCode = list[i].flaq;
      info.isCancel = list[i].flaq != 'L';
      info.index = i
      info.selected = '1'
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
  openLeaveDetail(data){
    this.props.leaveStore.leaveData = data;
     this.props.navigator.push({
        screen: 'staffio.LeaveDetailScreen', // unique ID registered with Navigation.registerScreen
        title: undefined, // navigation bar title of the pushed screen (optional)
        passProps: {isAppr:true,onReturnPress:this.onReturnPress,isCancel:this.state.isCancel
          ,onRejectPress:this.onRejectPress,onApprovePress:this.onApprovePress}, // simple serializable object that will pass as props to the pushed screen (optional)
        animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
        navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
        navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
      });
  }
  onApprovePress(data){
    this.setState({loading:true});
    if(data.requestStatusCode=='L'){
      this.props.navigator.showLightBox({
        screen: "staffio.ConfirmModalScreen", // unique ID registered with Navigation.registerScreen
        passProps: {title:`${I18n.t('ConfirmApprove')} : ${data.type}`,msg: `${I18n.t('ConfirmApproveLeave')}`
        ,msg2: `${data.name}` ,cancel:this.cancelModal
        ,ok:this.approveLeave,data:data}, // simple serializable object that will pass as props to the lightbox (optional)
        style: styleConfirmModal
          // backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
          // backgroundColor: "transparent", // tint color for the background, you can specify alpha here (optional)
        ,
        adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
       });
    }else{
      this.props.navigator.showLightBox({
        screen: "staffio.ConfirmModalScreen", // unique ID registered with Navigation.registerScreen
        passProps: {title:`${I18n.t('CancelApprove')} : ${data.type}`,msg: `${I18n.t('CancelapproveLeave')}`
        ,msg2: `${data.name}` ,cancel:this.cancelModal
        ,ok:this.approveLeave,data:data}, // simple serializable object that will pass as props to the lightbox (optional)
        style: styleConfirmModal
          // backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
          // backgroundColor: "transparent", // tint color for the background, you can specify alpha here (optional)
        ,
        adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
       });

    }
  }
  cancelModal(){
    this.setState({loading:false});
    this.props.navigator.dismissLightBox();
  }
  onRejectPress(data){
    this.setState({loading:true});

    this.props.navigator.showLightBox({
      screen: "staffio.InputModalScreen", // unique ID registered with Navigation.registerScreen
      passProps: {title:`${I18n.t('Reject')} : ${data.type}`,remark:`${I18n.t('Cause')}`
      ,cancel:this.cancelModal,placeholder:`${I18n.t('SpecifyCause')}`
      ,ok:this.rejectLeave,data:data}, // simple serializable object that will pass as props to the lightbox (optional)
      style: styleInputModal,
      // {
      //   // backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
      //   // backgroundColor: "transparent", // tint color for the background, you can specify alpha here (optional)
      //   // height:responsiveHeight(70),
      //   // width:responsiveWidth(90)
      // },
      adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
     });
  }
  onReturnPress(data){
    this.setState({loading:true});
    this.props.navigator.showLightBox({
      screen: "staffio.InputModalScreen", // unique ID registered with Navigation.registerScreen
      passProps: {title:`${I18n.t('ReturnLeaveDetail')} : ${data.type}`,remark:`${I18n.t('Cause')}`
      ,cancel:this.cancelModal,placeholder:`${I18n.t('SpecifyCause')}`
      ,ok:this.returnLeave,data:data}, // simple serializable object that will pass as props to the lightbox (optional)
      style: styleInputModal,
      // {
      //   backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
      //   backgroundColor: "transparent", // tint color for the background, you can specify alpha here (optional)
      //   height:responsiveHeight(70),
      //   width:responsiveWidth(90)
      // },
      adjustSoftInput: "nothing", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
     });
  }

  async onRejectPressAll(){
    let data = await this.countItemsSelected('R');
    this.setState({loading:true});
    this.props.navigator.showLightBox({
      screen: "staffio.InputModalScreen", // unique ID registered with Navigation.registerScreen
      passProps: {title:`${I18n.t('RejectAll')} : ${data.req.length} ${I18n.t('itemAppr')}`,remark:`${I18n.t('Cause')}`
      ,cancel:this.cancelModal,placeholder:`${I18n.t('SpecifyCause')}`
      ,ok:this.approveLeaveAll,data:data}, // simple serializable object that will pass as props to the lightbox (optional)
      style: styleInputModal,
      adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
     });
  }
  async onReturnPressAll(){
    let data = await this.countItemsSelected('T')
    this.setState({loading:true});
    this.props.navigator.showLightBox({
      screen: "staffio.InputModalScreen", // unique ID registered with Navigation.registerScreen
      passProps: {title:`${I18n.t('ReturnLeaveAll')} : ${data.req.length} ${I18n.t('itemAppr')}`,remark:`${I18n.t('Cause')}`
      ,cancel:this.cancelModal,placeholder:`${I18n.t('SpecifyCause')}`
      ,ok:this.approveLeaveAll,data:data}, // simple serializable object that will pass as props to the lightbox (optional)
      style: styleInputModal,
      adjustSoftInput: "nothing", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
     });
  }
  async onApprovePressAll(){
    let data = await this.countItemsSelected('A')
    this.setState({loading:true});
      this.props.navigator.showLightBox({
        screen: "staffio.ConfirmModalScreen", // unique ID registered with Navigation.registerScreen
        passProps: {title:`${I18n.t('ConfirmApproveAll')} : ${data.req.length} ${I18n.t('itemAppr')}`,msg: `${I18n.t('ConfirmApproveLeave')} ${data.req.length} ${I18n.t('itemAppr')}`
        ,msg2: `` ,cancel:this.cancelModal
        ,ok:this.approveLeaveAll,data:data}, // simple serializable object that will pass as props to the lightbox (optional)
        style: styleConfirmModal,
        adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
       });
  }

  async countItemsSelected(status,remark){
    let datas = []
    let param = {}
    const userData = await store.get("USER");
    for(let i=0;i<this.state.leaveList.length;i++){
      if(this.state.leaveList[i].selected=='2'){
        let data={}
        data.EMP_CODE = this.state.leaveList[i].empId;
        data.LEAVE_TYPE_CODE = this.state.leaveList[i].typeCode;
        data.OrgCode = this.state.leaveList[i].orgCode;
        data.REQUEST_LEAVE_NO = this.state.leaveList[i].requestLeaveNo;
        data.ApproveStatus = status
        datas.push(data);
      }
    }
    param.req= datas;
    param.ApproveBy = userData.EMP_CODE;
    param.Status = status;
    return param
  }

  onSelectAll(){
    if(this.state.checkSelect){
      this.setState({checkSelect:false});
      for(let i=0;i<infos.length;i++){
        infos[i].selected = '1'
      }
    }else{
      this.setState({checkSelect:true});
      for(let i=0;i<infos.length;i++){
        infos[i].selected = '2'
      }
    }
    
  }

  async approveLeaveAll(data){
    const userData = await store.get("USER");
    this.props.navigator.dismissLightBox();
    this.setState({loading:true});
    let response = await post("ESSServices/ApproveAllLeaveRequest",data);
    if(response){
      this.getLeaveList(userData);
    }
  }
  async approveLeave(data){
    this.props.navigator.dismissLightBox();
    this.setState({loading:true});
    const userData = await store.get("USER");
    let params = {};
    params.ApproveBy = userData.EMP_CODE;
    params.EMP_CODE = data.empId;
    params.LEAVE_TYPE_CODE = data.typeCode;
    params.OrgCode = data.orgCode;
    params.REQUEST_LEAVE_NO = data.requestLeaveNo;
    let response = await post("ESSServices/ApproveLeaveRequest",params);
    if(response){
      this.getLeaveList(userData);
    }
  }
  async rejectLeave(data){
    this.props.navigator.dismissLightBox();
    this.setState({loading:true});
    const userData = await store.get("USER");
    let params = {};
    params.ApproveBy = userData.EMP_CODE;
    params.EMP_CODE = data.empId;
    params.LEAVE_TYPE_CODE = data.typeCode;
    params.OrgCode = data.orgCode;
    params.REQUEST_LEAVE_NO = data.requestLeaveNo;
    let response = await post("ESSServices/RejectLeaveRequest",params);
    if(response){
      this.getLeaveList(userData);
    }
  }
  async returnLeave(data){
    this.props.navigator.dismissLightBox();
    this.setState({loading:true});
    const userData = await store.get("USER");
    let params = {};
    params.ApproveBy = userData.EMP_CODE;
    params.EMP_CODE = data.empId;
    params.LEAVE_TYPE_CODE = data.typeCode;
    params.OrgCode = data.orgCode;
    params.REQUEST_LEAVE_NO = data.requestLeaveNo;
    let response = await post("ESSServices/ReturnLeaveRequest",params);
    if(response){
      this.getLeaveList(userData);
    }
  }
  
  onSelected(index){
    if(infos[index].selected =='1'){
      infos[index].selected = '2'
      this.setState({selected:true})
    }else if(infos[index].selected=='2'){
      infos[index].selected = '1'
    }
    this.setState({loading:false})
  }
   renderList(){
    if(this.state.leaveList && this.state.leaveList.length >0){
      return this.state.leaveList.map(info =>
        <Swipeable  key={info.requestLeaveNo} rightButtons={[
            <TouchableOpacity onPress={()=>this.onApprovePress(info)} >
              <View style={[styles.rightSwipeItem]}>
                <Icon name="check" size={responsiveFontSize(2)} style={{ color: 'white' ,backgroundColor:'transparent'}} />
              </View>
            </TouchableOpacity>,

            info.requestStatusCode=='L'  && (<TouchableOpacity onPress={()=>this.onReturnPress(info)}>
              <View style={[styles.rightSwipeItem]}>
                <Icon name="repeat" size={responsiveFontSize(2)} style={{ color: 'white',backgroundColor:'transparent' }} />
              </View>
            </TouchableOpacity>),

            info.requestStatusCode=='L' && (<TouchableOpacity disabled={this.state.isCancel} onPress={()=>this.onRejectPress(info)}>
              <View style={[styles.rightSwipeItem]}>
                <Icon name="times" size={responsiveFontSize(2)} style={{ color: 'white',backgroundColor:'transparent' }} />
              </View>
            </TouchableOpacity>),  
          ]}>
            <LeaveApprover selected={this.state.selected}  info={info} openDetail={this.openLeaveDetail} onSelect={this.onSelected}/>
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
      
      <View style={{backgroundColor: '#ffe9d4',flex:1}}>
         
          <CardHeader title={`${I18n.t('Consider')}`} iconRight='check' funcSelectAll={this.onSelectAll}/>
            {/* <View style={{height:responsiveHeight(30)}}>
            <Profile name={this.state.userData.FULL_NAME_TH} positions={this.state.userData.POSITION_NAME} 
              img={{uri:`data:image/jpeg;base64,${this.state.userData.IMG_BASE}`}}/>
            </View> */}
           <PTRView onRefresh={this._refresh}>
              {/* {!this.state.loading  && <ToggleLeave options={options} onSwitch={this.onSwitch}/>} */}
              {!this.state.loading  ? this.renderList() 
              :(<View style={{flex:1,alignItems:"center",justifyContent:"center",marginTop:100}}>
                <Loading mini={true}/></View>)}
          </PTRView>
          <ActionButton IconButton={<IconTello name="hhmm-29" size={25} style={{ color: 'white' }} />} size={responsiveWidth(17)} buttonColor="#fbaa3e" offsetX={0}>
             <ActionButton.Item marginRight={responsiveWidth(2)} marginBottom={-responsiveHeight(8)} buttonColor='transparent' onPress={(e) => this.onRejectPressAll()}>
              <Icon name="times" style={[styles.actionButtonIcon]} />
              <Text style={{fontFamily: 'Kanit-Medium', color:'white', fontSize:responsiveFontSize(1.5)}}>{I18n.t('Reject')}</Text>
            </ActionButton.Item>
           <ActionButton.Item marginRight={responsiveWidth(20)} marginBottom={-(responsiveHeight(3.5))} buttonColor='transparent' onPress={(e)=>this.onReturnPressAll()}>
              <Icon name="repeat" style={styles.actionButtonIcon} />
             <Text style={{fontFamily: 'Kanit-Medium', color:'white', fontSize:responsiveFontSize(1.5)}}>{I18n.t('ReturnLeaveDetail')}</Text>
            </ActionButton.Item>
           <ActionButton.Item marginRight={responsiveWidth(28)} marginBottom={-(responsiveHeight(16))} buttonColor='transparent' onPress={(e)=>this.onApprovePressAll()}>
              <Icon name="check" style={styles.actionButtonIcon} />
              <Text style={{fontFamily: 'Kanit-Medium', color:'white', fontSize:responsiveFontSize(1.5)}}>{I18n.t('Approve')}</Text>
            </ActionButton.Item>
          </ActionButton>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  rightSwipeItem: {
    justifyContent: 'center',
    backgroundColor: '#fbaa3e',
    borderWidth:responsiveWidth(1),
    borderColor: 'white',
    borderRadius:responsiveWidth(9),
    alignItems: 'center',
    width: responsiveWidth(18),
    height: responsiveWidth(18),
    marginTop:responsiveHeight(2.5),
  },
  actionButtonIcon: {
    fontSize: responsiveFontSize(3),
    height: 22,
    color: 'white',
  },
});
