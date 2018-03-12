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
import OTHistorycard from '../components/ot/OTHistorycard'

const IconTello = createIconSetFromFontello(fontelloConfig);
const modalStyle = {
  backgroundBlur: "dark",
  backgroundColor: "rgba(0,0,0,.5)",
  height:responsiveHeight(70),
  width:responsiveWidth(90)
}
@inject('leaveStore')
@observer
export default class OTDetailScreen extends React.Component {
  
  constructor(props){
    
    super(props);
    this.state={userData:{}, leaveBalance:{},leaveData:{},loading:true,leaveBalances:[]}
    this.goBack = this.goBack.bind(this);
    this.closeScreen = this.closeScreen.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  async componentWillMount(){
     const userData = await store.get("USER");
    this.setState({userData:userData});
    await this.getLeaveBalance(userData);
   
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
          <OTHistorycard/>
        </Content>
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
