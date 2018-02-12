import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView
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
import I18n from '../utils/i18n';

@inject('leaveStore')
@observer
export default class LeaveDetailScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={userData:{}, leaveBalance:{},leaveData:{},loading:true}
    this.goBack = this.goBack.bind(this);
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
    
    params.EmpCode = user.EMP_CODE;
    params.LeaveTypeCode = this.props.leaveStore.leaveData.typeCode;
    params.flag =  "M";
    
    const response = await get("ESSServices/GetLeaveRemainByEmpCode",params);
    const info = response.objData;
    this.setState({leaveBalance:info[0],loading:false});
  }
  goBack(){
    this.props.navigator.pop({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
  }

  render() {
    return (
      <Container style={{backgroundColor: '#ffe9d4'}}>
        <CardHeader title={`${I18n.t('LeaveInformation')}`} goBack={this.goBack}/>
        <Content>
          <Profile name={this.state.userData.FULL_NAME_TH} positions={this.state.userData.POSITION_NAME} 
          img={{ uri: `${this.props.leaveStore.leaveData.EmpImg}` }}/>
          {!this.state.loading ? <DetailCard type={this.props.leaveStore.leaveData.type} cause={this.props.leaveStore.leaveData.reasonName} 
          start={this.props.leaveStore.leaveData.startDate} end={this.props.leaveStore.leaveData.endDate}  
          total={this.props.leaveStore.leaveData.total} total={this.props.leaveStore.leaveData.total} 
          remain = {this.state.leaveBalance.REMAIN} max={this.state.leaveBalance.MAX_DAY+this.state.leaveBalance.BRING_FORWARD} docRef={'ทดสอบ'} typedoc={'ทดสอบ'}/>
          :<View style={{flex:1,alignItems:"center",justifyContent:"center",marginTop:100}}><Loading mini={true}/></View>
          }

        </Content>
      </Container>
    );
  }

}


