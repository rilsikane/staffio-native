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
import {post} from '../api';
import Loading from '../components/loading';
import Profile from '../components/leave/Profile';
import DetailCard from '../components/leave/DetailCard';
import store from 'react-native-simple-store';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {convertByFormat} from '../utils/staffioUtils';

@inject('leaveStore')
@observer
export default class LeaveDetailScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={userData:{}, leaveList:[],leaveData:{}}
    this.goBack = this.goBack.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  async componentWillMount(){
     const userData = await store.get("USER");
    //  const leaveData = this.props.leaveStore.leaveData;
    this.setState({userData:userData});
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
        <Header style={{backgroundColor : '#fbaa3e'}}>
          <Left style={{flex:1}}>
            <Button transparent onPress={this.goBack}>
              <Icon name="chevron-left" size={18} style={{ color: 'white' }} />
            </Button>
          </Left>
          <Body style={{flex:2,alignItems:"center"}}>
           <Text style={{ fontFamily:'Kanit', color:'white', fontSize:responsiveFontSize(2.2),backgroundColor:"transparent"}}>
             รายละเอียดการลา
           </Text>
          </Body>
          <Right style={{flex:1}}>
            {/*<Button transparent>
              <Icon name="list" size={18} style={{ color: 'white' }} />
            </Button>*/}
          </Right>
        </Header>
        <Content>
          <Profile name={this.state.userData.FULL_NAME_TH} positions={this.state.userData.POSITION_NAME} 
          img={{uri:`data:image/jpeg;base64,${this.state.userData.IMG_BASE}`}}/>
          <DetailCard type={this.props.leaveStore.leaveData.type} cause={this.props.leaveStore.leaveData.reasonName} 
          start={this.props.leaveStore.leaveData.startDate} end={this.props.leaveStore.leaveData.endDate}  
          total={this.props.leaveStore.leaveData.total} total={this.props.leaveStore.leaveData.total} 
          balance = {'0'} docRef={'ทดสอบ'} typedoc={'ทดสอบ'}/>
        </Content>
      </Container>
    );
  }

}


