import React from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  View,
  Text,
  AppState,NativeAppEventEmitter,DeviceEventEmitter,ScrollView,Image
} from 'react-native';
import {Card,CardItem,Thumbnail,Button}from 'native-base'
import {Agenda} from '../components/staffioCalendar';
import { NavigationActions } from'react-navigation';
import store from 'react-native-simple-store';
import {post} from '../api';
import Spinner from 'react-native-loading-spinner-overlay';
import TimerMixin from 'react-timer-mixin';
var SpinnerKit = require('react-native-spinkit');
import moment from 'moment';
import {convertDate} from '../utils/staffioUtils';
import Loading from '../components/loading';
import {LocaleConfig} from 'react-native-calendars';
import app  from '../stores/app';
import BackgroundTimer from 'react-native-background-timer';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Provacypolicy from '../components/privacypolicy';
// const customData = require('../api/shiftData.json');
// const customData2 = require('../api/shiftHistory.json');
let intervalId = null;
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      items: {},
      user:{},
      shiftData:{},isLoading:false,
      agreen:true
    };
   LocaleConfig.locales['th'] = {
    monthNames: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฏาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
    monthNamesShort: ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'],
    dayNames: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'],
    dayNamesShort: ['อา.','จ.','อ.','พ.','พฤ.','ศ.','ส.']
    };

    LocaleConfig.defaultLocale = 'th';
    this.app = app;
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.closeDialog = this.closeDialog.bind(this);
    this.gotoInbox = this.gotoInbox.bind(this);
    this.watchID = navigator.geolocation.watchPosition((position) => {
      
    });
  }
  static navigationOptions = {
    header: null,
  };

  async getagreen(){
    const agreen = await store.get("agreen");
    if(agreen && agreen == 'Y' ){
      this.setState({agreen:false,selectItem:{}});
    }else{
     this.setState({agreen:true});
     this.props.navigator.showModal({
        screen: "staffio.PrivacyScreen", // unique ID registered with Navigation.registerScreen
        title: "Modal", // title of the screen as appears in the nav bar (optional)
        passProps: {close:this.closeDialog}, // simple serializable object that will pass as props to the modal (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
      });
    }
  }
  

  async closeDialog(){
    this.setState({agreen:false,selectItem:{}});
    const agreen = await store.save('agreen','Y');
    this.init();
    this.props.navigator.dismissModal({
      animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });

  }
  gotoInbox(status){
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();
    //  this.props.navigator.switchToTab({
    //   tabIndex: 1 // (optional) if missing, this screen's tab will become selected
    // });
    this.props.navigator.push({
			screen: 'staffio.InqInboxScreen', // unique ID registered with Navigation.registerScreen
			title: undefined, // navigation bar title of the pushed screen (optional)
			titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
			passProps: {statusForm:status,startDateFrom:startOfMonth,endDateFrom:endOfMonth}, // Object that will be passed as props to the pushed screen (optional)
			animated: false, // does the push have transition animation or does it happen immediately (optional)
			backButtonTitle: undefined, // override the back button title (optional)
			backButtonHidden: false, // hide the back button altogether (optional)
		});
   
  }

  
  
  render() {
    return (
       
       <View style={styles.container}>
         {this.state.isLoading && <Loading visible={true}/>}
         {(!this.state.isLoading && !this.state.agreen) && <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            selected={moment().format().split('T')[0]}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            punchPress={this.punchPress.bind(this)}
            user={this.state.user}
            shiftData={this.state.shiftData}
            shiftList={this.state.shiftList}
            holidays={this.state.holidays}
            statusAmount={this.state.statusAmount}
            hideCalendar={this.state.hideCalendar}
            gotoInbox={this.gotoInbox}
            // monthFormat={'yyyy'}
            // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
            //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          />}
          
          
      </View>
     
      
    )
   
  }
  async loadItems(day) {

    const userData = await store.get("USER");
    const startOfMonth = moment(day.dateString).startOf('month').toDate();
    const endOfMonth = moment(day.dateString).endOf('month').toDate();
    const shiftPattern =  await this.getShiftPatternByPersonal(userData,startOfMonth,endOfMonth);
    if(shiftPattern && shiftPattern.length>0){
       for (let i = 0; i < shiftPattern.length; i++) {
        let strTime = shiftPattern[i].DAY_DATE.split("T")[0];
        if (!this.state.items[strTime]) {
            this.state.items[strTime] = [];
            this.state.items[strTime].push({
              textColor : "green",
              textLabel : shiftPattern[i].SHFT_NAME_TH
            })
        }else{
          if(!this.state.items[strTime][0].textLabel.includes(shiftPattern[i].SHFT_NAME_TH)){
            this.state.items[strTime][0].textLabel += ","+shiftPattern[i].SHFT_NAME_TH
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
      
    }

  }
  punchPress(){
    // this.props.navigator.resetTo({
    //   screen: 'staffio.CameraScreen', // unique ID registered with Navigation.registerScreen
    //   title: undefined, // navigation bar title of the pushed screen (optional)
    //   passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
    //   animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
    //   animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
    //   navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
    //   navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
    // });
    this.app.punchIn();
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
   async componentDidMount(){
        await this.getagreen();
        if(!this.state.agreen){
        this.setState({isLoading:true});
        this.userData = await store.get("USER");
        
        
        let shiftData =  await this.getShiftForTimeRecord( this.userData);
        
        // const startOfWeek = moment().subtract(7,'days').toDate();
        // const endOfWeek = moment().endOf('week').toDate();
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();

        const shiftHistory = await this.getShiftHistory( this.userData,startOfMonth,endOfMonth)
       
       if(!shiftData){
         shiftData = {};
       }
       if(shiftHistory){
       
        const shiftList = shiftHistory.ResultDatas;
        const holidays = shiftHistory.Holidays;
        const statusAmount = shiftHistory.StatusAmount;
        this.setState({ user: this.userData,shiftData:shiftData,shiftList:shiftList,holidays:holidays,statusAmount:statusAmount});
        if(this.userData && shiftData && shiftList){ 
          TimerMixin.setTimeout( () => { 
              this.setState({isLoading:false});
            }, 1000);
        }
       }else{
          this.setState({isLoading:false});
       }
      }
       //console.log(startOfWeek,endOfWeek);
       AppState.addEventListener('change', this._handleAppStateChange);
  }
  async init(){
     this.setState({isLoading:true});
        this.userData = await store.get("USER");
        
        
        let shiftData =  await this.getShiftForTimeRecord( this.userData);
        
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();
        const shiftHistory = await this.getShiftHistory( this.userData,startOfMonth,endOfMonth)
       
       if(!shiftData){
         shiftData = {};
       }
       if(shiftHistory){
       
        const shiftList = shiftHistory.ResultDatas;
        const holidays = shiftHistory.Holidays;
        const statusAmount = shiftHistory.StatusAmount;
        this.setState({ user: this.userData,shiftData:shiftData,shiftList:shiftList,holidays:holidays,statusAmount:statusAmount});
        if(this.userData && shiftData && shiftList){ 
          TimerMixin.setTimeout( () => { 
              this.setState({isLoading:false});
            }, 1000);
        }
       }else{
          this.setState({isLoading:false});
       }
    
  }
  getShiftPatternByPersonal = async (user,startDate,endDate)=>{
    let params  = {};
    params.EmpCode = user.EMP_CODE;
    params.startDate = convertDate(startDate);
    params.endDate = convertDate(endDate);
    params.orgCode = user.ORG_CODE;
    params.pagesize = 100;
    params.page=1;
    const response = await post("GetShiftPatternByPersonal",params);
    // const response = customData2;
    return response.data;
  }
  
  getShiftForTimeRecord = async (user)=>{
    let params  = {};
    params.empCode = user.EMP_CODE;
    params.orgCode = "";//user.ORG_CODE;
    const response = await post("GetShiftForTimeRecord",params);
    if(response){
      return response.shiftData;
    }else{
      return false;
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
  
  onNavigatorEvent(event) {
    
    if (event.id === 'bottomTabSelected') {
      if(!this.state.agreen){
        this.init();
      }
    }
    if (event.id === 'willDisappear') {
     console.log("willDisappear");
    }
    if (event.id === 'didDisappear') {
     console.log("didDisappear");
    }
  }
 
  componentWillUnmount() {
    console.log("componentWillUnmount");
    AppState.removeEventListener('change', this._handleAppStateChange);
    navigator.geolocation.clearWatch(this.watchID);
  }
   _handleAppStateChange = async (nextAppState) => {
    console.log("_handleAppStateChange",nextAppState);
    // if(intervalId==null){
    //   intervalId = BackgroundTimer.setTimeout(() => {
    //         BackgroundTimer.clearTimeout(intervalId);
    //         intervalId = null;
    //          this.app.authePinCode();
    //     }, 200000);
    // }
     if("background"==nextAppState){
        intervalId = BackgroundTimer.setTimeout(() => {
             this.app.authePinCode();
        }, 10000);
     }else if("active"==nextAppState){
            BackgroundTimer.clearTimeout(intervalId);
            intervalId = null;
     }
  } 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6EBD6',
  }
});
export default HomeScreen