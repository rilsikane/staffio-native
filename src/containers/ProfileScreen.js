import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,Alert
} from 'react-native';
import HeaderStatus from '../components/from_profile/HeaderStatus';
import BodyStatus from '../components/from_profile/BodyStatus';
import {CardItem,Container,Card,Content,Button} from 'native-base';
import Colors from '../constants/Colors'
import store from 'react-native-simple-store';
import {post} from '../api';
import Spinner from 'react-native-loading-spinner-overlay';
import TimerMixin from 'react-timer-mixin';
var SpinnerKit = require('react-native-spinkit');
import moment from 'moment';
import {convertDate} from '../utils/staffioUtils';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import Iocon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/Colors'
import { NavigationActions } from 'react-navigation'; 


class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {isLoading:true};
    this.logOutPress = this.logOutPress.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  

  async componentDidMount(){
       const userData = await store.get("USER");
       //const shiftData =  await this.getShiftForTimeRecord(userData);
       const startOfWeek = moment().startOf('year').toDate();
       const endOfWeek = moment().endOf('week').toDate();
       const shiftHistory = await this.getShiftHistory(userData,startOfWeek,endOfWeek)
       const shiftList = shiftHistory.ResultDatas;
       const holidays = shiftHistory.Holidays;
       const statusAmount = shiftHistory.StatusAmount;
       
       //console.log(startOfWeek,endOfWeek);

       this.setState({ user:userData,shiftList:shiftList,holidays:holidays,statusAmount:statusAmount});
       if(userData && shiftList){ 
        TimerMixin.setTimeout( () => { 
             this.setState({isLoading:false});
          }, 1000);
       }
      
  }
  getShiftHistory = async (user,startDate,endDate)=>{
    let params  = {};
    params.empID = user.EMP_CODE;
    params.startDate = convertDate(startDate);
    params.endDate = convertDate(endDate);
    params.pagesize = 30;
    params.page=1;
    const response = await post("GetHistory",params);
    // const response = customData2;
    return response;
  }

  render() {
    if(this.state.isLoading)
      return (<View style={styles.container}>{this.loading()}</View>)
    else 
    return (
      <Container style={{backgroundColor:Colors.backgroundColor}}>
        <Content style={{marginTop:10}}>
          <View style={{ alignSelf: 'flex-end',marginTop: -5,position: 'absolute',zIndex:9999}}>
                <Button onPress={this.logOutPress} iconRight transparent style={{alignSelf:"flex-end",marginLeft:25,marginTop:10}}>
                  <Iocon style={{color:colors.baseColor}}  name="ios-log-out-outline" size={30}/>
                </Button>
            </View>
          <Card style={{marginLeft:10,marginRight:10,marginTop:10}}>
            <CardItem style={{height:380}}>
              <HeaderStatus user={this.state.user} statusAmount={this.state.statusAmount}/>
            </CardItem>
          </Card>
          {/*<Card style={{height:300,marginRight:10,marginLeft:10,marginTop:0}}>
            <View style={{height:"100%"}}>
              <BodyStatus />
            </View>
          </Card>*/}
        </Content>
      </Container>
    
    );
  }

  loading(){
    if(this.state.isLoading)
    return  ( <Spinner animation="fade" visible={this.state.isLoading} overlayColor="rgba(0, 0, 0, 0.4)">
          <View style={{flex:1,justifyContent:"center",alignItems:"center",marginTop:-50}}>
            <SpinnerKit size={80} type={"WanderingCubes"} color="#f58020" />
           </View>
        </Spinner>);
  }
  logOutPress(){
     Alert.alert(
        'คำเตือน',
        'คุณต้องการยืนยันที่จะออกจากระบบ ใช่หรือไม่ ?',
        [
          {text: 'ยืนยัน', onPress: () => this.logOut()},
          {text: 'ยกเลิก'},
        ],
        { cancelable: false }
      )
 }
 logOut(){
   this.setState({loading:true});
   store.delete("USER");
   const resetAction = NavigationActions.navigate({
    routeName: 'Login'
    })
    this.props.navigation.dispatch(resetAction)
    this.setState({loading:false});
 }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6EBD6',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
export default withNavigationFocus(ProfileScreen, 'Profile')