import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
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
import DetailCard from '../components/leave/DetailCard';
import CardHeader from '../components/cardHeader';
import store from 'react-native-simple-store';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {convertByFormat} from '../utils/staffioUtils';
import LeaveStatCard from '../components/leave/LeaveStatCard';
import ActionButton from '../components/stffioActionButton/ActionButton';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/fonts/config.json'
const IconTello = createIconSetFromFontello(fontelloConfig);

@inject('leaveStore')
@observer
export default class LeaveDetailScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={userData:{}, leaveBalance:{},leaveData:{},loading:true,leaveBalances:[]}
    this.goBack = this.goBack.bind(this);
    this.onApprovePress = this.onApprovePress.bind(this);
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
  onApprovePress(data){
    this.setState({loading:true});
    Alert.alert(
      'ยืนยันการอนุมัติ',
      `ยืนยันการอุนมัติการลาของ 
      ${data.name} ใช่หรือไม่ ?`,
      [
        {text: 'ยกเลิก' ,onPress: () => this.setState({loading:false})},
        {text: 'ยืนยัน', onPress: () => this.approveLeave(data)},
      ],
      { cancelable:  false}
    )
  }
  async approveLeave(data){
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

  render() {
    return (
      <Container style={{backgroundColor: '#ffe9d4'}}>
        <CardHeader title="ข้อมูลการลา" goBack={this.goBack}/>
        <Content>
          <Profile name={this.props.leaveStore.leaveData.name} positions={this.props.leaveStore.leaveData.positions} 
          img={{uri: 'http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png'}}/>
          {!this.state.loading ? <DetailCard type={this.props.leaveStore.leaveData.type} cause={this.props.leaveStore.leaveData.reasonName} 
          start={this.props.leaveStore.leaveData.startDate} end={this.props.leaveStore.leaveData.endDate}  
          total={this.props.leaveStore.leaveData.total} total={this.props.leaveStore.leaveData.total} 
          remain = {this.state.leaveBalance.REMAIN||0} max={this.state.leaveBalance.MAX_DAY+this.state.leaveBalance.BRING_FORWARD} docRef={'ทดสอบ'} typedoc={'ทดสอบ'}/>
          :<View style={{flex:1,alignItems:"center",justifyContent:"center",marginTop:100}}><Loading mini={true}/></View>
          }
          {(!this.state.loading && this.props.isAppr) && <LeaveStatCard title={'สถิติการลา'} date={''} data={this.state.leaveBalances}/>}

        </Content>
         {this.props.isAppr &&
          <ActionButton IconButton={<IconTello name="hhmm-29" size={25} style={{ color: 'white' }} />} size={responsiveWidth(17)} buttonColor="#fbaa3e">
            <ActionButton.Item marginRight={-responsiveWidth(10)} marginBottom={-responsiveHeight(5.8)} buttonColor='transparent'   onPress={() => this.onApprovePress()}>
              <Icon name="times" style={[styles.actionButtonIcon]} />
              <Text style={{fontFamily: 'Kanit-Medium', color:'white', fontSize:responsiveFontSize(1.5)}}>ปฏิเสธ</Text>
            </ActionButton.Item>
            <ActionButton.Item marginRight={responsiveWidth(14.9)} marginBottom={-(responsiveHeight(1))} buttonColor='transparent'  onPress={() => {}}>
              <Icon name="repeat" style={styles.actionButtonIcon} />
             <Text style={{fontFamily: 'Kanit-Medium', color:'white', fontSize:responsiveFontSize(1.5)}}>ส่งคืน</Text>
            </ActionButton.Item>
            <ActionButton.Item marginRight={responsiveWidth(24)} marginBottom={-(responsiveHeight(18))} buttonColor='transparent'  onPress={() => this.onApprovePress()}>
              <Icon name="check" style={styles.actionButtonIcon} />
              <Text style={{fontFamily: 'Kanit-Medium', color:'white', fontSize:responsiveFontSize(1.5)}}>อนุมัติ</Text>
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


