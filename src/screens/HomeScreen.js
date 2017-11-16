import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  AppState,NativeAppEventEmitter,DeviceEventEmitter
} from 'react-native';
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
// const customData = require('../api/shiftData.json');
// const customData2 = require('../api/shiftHistory.json');
let intervalId = null;
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      user:{},
      shiftData:{},isLoading:false
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
  }
  static navigationOptions = {
    header: null,
  };
  
  render() {
    return (
       
       <View style={styles.container}>
         {this.state.isLoading && <Loading visible={true}/>}
         {!this.state.isLoading && <Agenda
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
   
    const shiftPattern =  await this.getShiftPatternByPersonal( this.userData,startOfMonth,endOfMonth);
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
        this.setState({isLoading:true});
        this.userData = await store.get("USER");
        
        
        let shiftData =  await this.getShiftForTimeRecord( this.userData);
        
        const startOfWeek = moment().subtract(7,'days').toDate();
        const endOfWeek = moment().endOf('week').toDate();
        const shiftHistory = await this.getShiftHistory( this.userData,startOfWeek,endOfWeek)
       
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
       //console.log(startOfWeek,endOfWeek);
       AppState.addEventListener('change', this._handleAppStateChange);
  }
  getShiftPatternByPersonal = async (user,startDate,endDate)=>{
    let params  = {};
    params.EmpCode = user.EMP_CODE;
    params.startDate = convertDate(startDate);
    params.endDate = convertDate(endDate);
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
      this.componentDidMount();
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
  }
   _handleAppStateChange = async (nextAppState) => {
    console.log("_handleAppStateChange");
    if(intervalId==null){
      intervalId = BackgroundTimer.setTimeout(() => {
           
            BackgroundTimer.clearTimeout(intervalId);
            intervalId = null;
             this.app.authePinCode();
        }, 40000);
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