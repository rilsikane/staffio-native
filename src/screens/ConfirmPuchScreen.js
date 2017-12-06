import React ,{DeviceEventEmitter} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,Alert,
  NavigatorIOS,ScrollView
} from 'react-native';
// import LeaveCalendar from '../components/LeaveCalendar'
import StampPunch from '../components/punchCard/stampPunch'
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { NavigationActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import TimerMixin from 'react-timer-mixin';
var SpinnerKit = require('react-native-spinkit');
import store from 'react-native-simple-store';
import {post} from '../api';
import {convertDate} from '../utils/staffioUtils';
import app  from '../stores/app';



@inject('punchStore')
@observer
export default class ConfirmPunchScreen extends React.Component {
  
  constructor(props) {
      super(props);
	    this.goBack = this.goBack.bind(this);
      this.donePress = this.donePress.bind(this);
      this.state = {isLoading:true,showRemark:true,remark:"",latRecord:"",longRecord:""};
      this.onChangeText = this.onChangeText.bind(this);
      this.cancel = this.cancel.bind(this);
      this.okPress = this.okPress.bind(this);
      this.app = app;
 	}
  static navigationOptions = {
    header: null,
  };
   async componentDidMount(){
       const userData = await store.get("USER");
       const response =  await this.getShiftForTimeRecord(userData);
       const shiftData = response.shiftData;
       this.setState({shiftData:shiftData,userData:userData,lateCondition:response.lateCondition})
      //  TimerMixin.setTimeout( () => { 
      //        this.setState({isLoading:false});
      //     }, 1000);
      this.setState({isLoading:false});
      this.watchID = navigator.geolocation.watchPosition((position) => {
        var lastPosition = JSON.stringify(position);
        console.log("dataPosition   "+ shiftData.LocationLat,shiftData.LocationLong);
        console.log("lastPosition   "+ lastPosition);
        const loactionDistance = this.distance(Number(shiftData.LocationLat)
        ,Number(shiftData.LocationLong),position.coords.latitude,position.coords.longitude)
        this.setState({latRecord:position.coords.latitude,longRecord:position.coords.longitude});
        console.log("distance  "+loactionDistance);
        if(loactionDistance > Number(shiftData.Accuracy)){
          this.setState({showRemark:true})
        }else{
           if(this.state.shiftData.timeRecordType =="O" && this.state.lateCondition){
            this.setState({showRemark:true});
           }else{
            this.setState({showRemark:false});
           }
        }
      },(error)=>{
         Alert.alert(
            'แจ้งเตือน',
            'คุณไม่ได้ทำการเปิด Location ระบบจะทำการระบุว่าคุณได้บันทึกเวลานอกถสานที่',
            [
              {text: 'ตกลง'},
            ],
          )
      });

  }
  // componentDidMount() {
    
  // }

  goBack(){
    this.setState({isLoading:true});    
    this.props.navigator.pop({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
	
	}
  cancel(){
    // this.props.navigator.resetTo({
    //   screen: 'staffio.HomeScreen', // unique ID registered with Navigation.registerScreen
    //   title: undefined, // navigation bar title of the pushed screen (optional)
    //   passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
    //   animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
    //   animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
    //   navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
    //   navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
    // });
    this.app.login();
  }
  onChangeText (value) {
   this.setState({remark:value});
 }
 okPress(){
  if(this.state.lateCondition &&  this.state.shiftData.timeRecordType !="I"){
     Alert.alert(
        'คำเตือน',
        'คุณลงเวลาออกงานก่อนเวลา คุณต้องการยืนยันที่จะลงเวลา ใช่หรือไม่ ?',
        [
          {text: 'ยืนยัน', onPress: () => this.donePress()},
          {text: 'ยกเลิก'},
        ],
        { cancelable: false }
      )
  }else{
    this.donePress();
  }
 }
  async donePress(){
    const userData = await store.get("USER");
    this.setState({isLoading:true});
    let d = new Date();
    let h = d.getHours()<10 ? "0"+d.getHours():d.getHours();
    let m = d.getMinutes()<10 ? "0"+d.getMinutes():d.getMinutes();
     let param = {}
     let TempMobile = {};
     TempMobile.empId = this.state.shiftData.empCode;
     TempMobile.date = convertDate(new Date());
     TempMobile.time = `${h}:${m}`
     TempMobile.shift_code = this.state.shiftData.SHFT_CODE;
     TempMobile.projectcode = this.state.shiftData.PROJECT_CODE;
     let status = "NM";
     if(this.state.lateCondition){
        status = this.state.shiftData.timeRecordType =="I" ? "LT":"EL";
     }
     TempMobile.status = status;
     TempMobile.timerecordType = `${this.state.shiftData.timeRecordType}1`;
     TempMobile.BRANCH_ID = this.state.shiftData.BRANCH_CODE;
     TempMobile.CREATED_BY = userData.UserName;
     TempMobile.UPDATED_BY = userData.UserName;
     TempMobile.latRecord = this.state.latRecord;
     TempMobile.longRecord = this.state.longRecord;
     TempMobile.orgCode = this.state.shiftData.ORG_CODE;
     TempMobile.stringBase64 = this.props.punchStore.selfiePath;
     if(this.state.showRemark){
       TempMobile.area_flag = "N"
      
     }else{
       TempMobile.area_flag = "Y"
     }
    TempMobile.remark = this.state.remark;
     
     param.TempMobile = TempMobile
     const response = await post("InsertTempMobile",param);
     if(response){
        this.setState({isLoading:false});
        TimerMixin.setTimeout( () => { 
          Alert.alert(
            'ลงเวลา',
            'ลงเวลาสำเร็จ',
            [
              {text: 'ตกลง', onPress: () => this.success()},
            ],
            { cancelable: false }
          )
        }, 100);
      
         
     }
 
  }
  success(){
   
    // this.props.navigator.resetTo({
    //   screen: 'staffio.HomeScreen', // unique ID registered with Navigation.registerScreen
    //   title: undefined, // navigation bar title of the pushed screen (optional)
    //   passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
    //   animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
    //   animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
    //   navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
    //   navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
    // });
    this.app.login();
  }
  getShiftForTimeRecord = async (user)=>{
    let params  = {};
    params.empCode = user.EMP_CODE;
    params.orgCode = "";//user.ORG_CODE;
    const response = await post("GetShiftForTimeRecord",params);
    return response;
  }


  loading(){
    if(this.state.isLoading)
    return  ( <Spinner animation="fade" visible={this.state.isLoading} overlayColor="rgba(255, 255, 255, 1)">
          <View style={{flex:1,justifyContent:"center",alignItems:"center",marginTop:-50}}>
            <SpinnerKit size={80} type={"WanderingCubes"} color="#f58020" />
           </View>
        </Spinner>);
    else
    return  <StampPunch imgPath={this.props.punchStore.selfiePath} shiftData={this.state.shiftData} remark={this.state.remark}
         cancel={this.cancel} retry={this.goBack} donePress={this.okPress} user={this.state.userData} showRemark={this.state.showRemark} 
         onChangeText={this.onChangeText} lateCondition={this.state.lateCondition!==null}></StampPunch>
  }
  distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return (12742 * Math.asin(Math.sqrt(a)))*100; // 2 * R; R = 6371 km
}

  
  render() {
    return (
       <View style={{flex:1}}>
          {this.loading()}
      </View>
    );
  }
  componentWillUnmount(){
   navigator.geolocation.clearWatch(this.watchID);
 }

}


