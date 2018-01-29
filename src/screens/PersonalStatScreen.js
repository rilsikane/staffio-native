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
import LeaveCard from '../components/leave/LeaveCard';
import store from 'react-native-simple-store';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {convertByFormat} from '../utils/staffioUtils';

@inject('leaveStore')
@observer
export default class PersonalStatScreen extends React.Component {
  constructor(props){
    super(props);
    this.openLeaveDetail = this.openLeaveDetail.bind(this);
    this.state={isLoading:false,isFocus:false,userData:{}, leaveList:[]}
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
    params.param = {};
    params.param.EMP_CODE = user.EMP_CODE;
    params.param.PAGE = 1;
    params.param.PAGE_SIZE =  100;
    
    const response = await post("ESSServices/SearchLeaveListforEmp",params);
    const infos = this.transformToInfos(response.objData);
    this.setState({leaveList:infos});
  }
  transformToInfos(list){
    let infos = [];
    for(let i=0;i<list.length;i++){
      let info = {};
      info.name = list[i].FULL_NAME_TH;
      info.empId = list[i].EMP_CODE;
      info.positions = list[i].PositionNameEN;
      info.type = list[i].LEAVE_TYPE_NAME;
      info.startDate = convertByFormat(new Date(list[i].START_DATE).getTime(),"DD MMM ");
      info.endDate = convertByFormat(new Date(list[i].END_DATE).getTime(),"DD MMM ");
      info.total = list[i].TOTAL_LEAVEDAY;
      info.requestLeaveNo = list[i].REQUEST_LEAVE_NO;
      info.reasonName = list[i].REASON_NAME;
      infos.push(info);
  }
    return infos;
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
    return this.state.leaveList.map(info =>  <LeaveCard key={info.requestLeaveNo} info={info} openDetail={this.openLeaveDetail}/>);
  }
  render() {
    return (
      <Container style={{backgroundColor: '#ffe9d4'}}>
        <Header style={{backgroundColor : '#fbaa3e'}}>
          <Left>
            <Button transparent>
              <Icon name="sliders" size={18} style={{ color: 'white' }} />
            </Button>
          </Left>
          <Body>
           <Text style={{ fontFamily:'Kanit', color:'white', fontSize:responsiveFontSize(2.5),backgroundColor:"transparent"}}>
            สถิติการลา
           </Text>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="list" size={18} style={{ color: 'white' }} />
            </Button>
          </Right>
        </Header>
        <Content>
          {<Profile name={this.state.userData.FULL_NAME_TH} positions={this.state.userData.POSITION_NAME} 
          img={{uri:`data:image/jpeg;base64,${this.state.userData.IMG_BASE}`}}/>}
          {this.renderList()}
        </Content>
      </Container>
    );
  }

}


