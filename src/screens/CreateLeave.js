import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Text } from 'native-base';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react';
import {post,get} from '../api';
import Loading from '../components/loading';
import CardHeader from '../components/cardHeader';
import store from 'react-native-simple-store';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {convertByFormatShort, disbackButton} from '../utils/staffioUtils';
import PTRView from 'react-native-pull-to-refresh';
import I18n from '../utils/i18n';
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';

@inject('leaveStore')
@observer

export default class CreateLeave extends React.Component {

  constructor(props){
    super(props);
    this.state={color:'#ED5565',markeds:{},color:"sickL",dayList:[],leaveType:{},listLeaveType:[],loading:false};
    this.color ={sickL:'#ED5565',errandL:'#23c6c8',vacationL:'#8BC34A',otherL:'#F5DC0B'};
    this.onDayPress = this.onDayPress.bind(this);
    this.dayList = [];
    this.oneMask = {startingDay: true,endingDay: true, color: this.color[this.state.color],textColor:"#fff"};
    this.firstMask = {startingDay: true, color: this.color[this.state.color],textColor:"#fff"};
    this.betwMask = {color: this.color[this.state.color],textColor:"#fff"};
    this.endMask = {endingDay: true,color: this.color[this.state.color],textColor:"#fff"};
    this.submitDate = this.submitDate.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  async componentDidMount(){
    this.dayList = [];
    this.setState({loading:true});
    const userData = await store.get("USER");
    const params = {};
    let login = {};
    login.LOGIN_EMP_CODE = userData.EMP_CODE;
    login.LOGIN_ORG_CODE = userData.ORG_CODE;
    login.LOGIN_UNIT_CODE = userData.UNIT_CODE;
    login.LOGIN_USER_NAME = userData.UserName;
    login.LOGIN_CUSTOMER_CODE = userData.CUSTOMER_CODE;
    login.LOGIN_USER_ID = userData.USER_ID
    let response = await post("ESSServices/GetListLeaveTypeForMobile",login);
    if(response.objData && response.objData.length > 0){
      let leaveType = response.objData.filter(lp=>lp.LEAVE_TYPE_CODE=='SC_1');
      this.setState({listLeaveType:response.objData,leaveType:leaveType[0],loading:false});
    }else{
      this.setState({loading:false});
    }
  }
  
  onPressButton(obj){
    let color = obj.color;
    this.dayList = [];
    this.oneMask = {startingDay: true,endingDay: true, color: color,textColor:"#fff"};
    this.firstMask = {startingDay: true, color: color,textColor:"#fff"};
    this.betwMask = {color: color,textColor:"#fff"};
    this.endMask = {endingDay: true,color: color, textColor:"#fff"};
    let leaveType = this.state.listLeaveType.filter(lp=>lp.LEAVE_TYPE_CODE==obj.id);
    this.setState({color:color,dayList:this.dayList,markeds:{},leaveType:leaveType[0]});
  }
  onDayPress(day) {
    // this.setState({
    //   selected: day.dateString
    // });
    if(this.dayList.length ==0){
      this.setState({markeds:{[day.dateString]:this.oneMask}});
      this.dayList.push(day);
      this.setState({dayList:this.dayList});
    }else{
      if(this.state.markeds[day.dateString]){
          this.dayList = [];
          this.dayList.push(day);
          this.setState({markeds:{[day.dateString]:this.oneMask},dayList:this.dayList});
      }else{
        let countDay = this.calculateDay(this.dayList[0],day);
        if(countDay>0){
          if(this.state.dayList.length ==1){
            let markeds = {};
            let firstDay = this.dayList[0];
            for(let i=0;i<=countDay;i++){
              if(i==0){
                markeds[firstDay.dateString] = this.firstMask;
              }else{ 
                let dayAdd = moment(firstDay.timestamp).add(i,'day');
                let dayFormat = dayAdd.format().split('T')[0];
                if(i<countDay){
                  markeds[dayFormat] = this.betwMask;
                }else{
                  markeds[dayFormat] = this.endMask;
                }
                
              }
            }
           let tmpDaylist = this.dayList[0];
            this.dayList = [];
            this.dayList.push(tmpDaylist);  
            this.dayList.push(day);
            this.setState({markeds:markeds,dayList:this.dayList});
          }else{
            this.dayList = [];
            this.dayList.push(day);
            this.setState({markeds:{[day.dateString]:this.oneMask},dayList:this.dayList});
          }
        }else{
          this.dayList = [];
          this.dayList.push(day);
          this.setState({markeds:{[day.dateString]:this.oneMask},dayList:this.dayList});
        }
      }
    }
  }
  calculateDay(firstDate,secondDate){
    var oneDay = 24*60*60*1000;
    var diffDays = Math.round((secondDate.timestamp- firstDate.timestamp)/(oneDay));
    return diffDays;
  }
  submitDate(){
    this.props.leaveStore.leaveReqLeaveType = this.state.leaveType;
    this.props.navigator.push({
      screen: 'staffio.LeaveWorkShiftScreen', // unique ID registered with Navigation.registerScreen
      title: undefined, // navigation bar title of the pushed screen (optional)
      passProps: {dayList:this.state.dayList},
      animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
      navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
      navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
    });
  }

  render() {
    return !this.state.loading ? (
      <Container style={{backgroundColor: '#ffe9d4'}}>
          <CardHeader title={`${I18n.t('titleCreate')}`}/>
          <View style={{flexDirection: 'row', alignItems:'center', height:responsiveHeight(10),marginBottom:responsiveHeight(2),marginTop:responsiveHeight(1)}}>
            <TouchableOpacity style={{flex:1}} onPress={(e) => this.onPressButton({color:this.color.sickL,id:"SC_1"})}>
              <View style={[styles.buttonstyle,this.state.leaveType.LEAVE_TYPE_CODE=="SC_1"&&{borderColor:this.color.sickL,borderBottomWidth:responsiveHeight(1)}]}>
                <Text style={[styles.textStyle,{color:this.color.sickL}]}>{I18n.t('sickLeave')}</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={{flex:1}} onPress={(e) => this.onPressButton({color:this.color.vacationL,id:"VC"})}>
            <View style={[styles.buttonstyle,this.state.leaveType.LEAVE_TYPE_CODE=="VC"&&{borderColor:this.color.vacationL,borderBottomWidth:responsiveHeight(1)}]}>
                <Text style={[styles.textStyle,{color:this.color.vacationL}]}>{I18n.t('vacationLeave')}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex:1}} onPress={(e) => this.onPressButton({color:this.color.errandL,id:"PERS-01"})}>
            <View style={[styles.buttonstyle,this.state.leaveType.LEAVE_TYPE_CODE=="PERS-01"&&{borderColor:this.color.errandL,borderBottomWidth:responsiveHeight(1)}]}>
                <Text style={[styles.textStyle,{color:this.color.errandL}]}>{I18n.t('errandLeave')}</Text>
              </View>
            </TouchableOpacity>
          
            {/* <TouchableOpacity style={{flex:1}} onPress={(e) => this.onPressButton(this.color.otherL)}>
              <View style={[styles.buttonstyle,{borderColor:this.color.otherL}]}>
                <Text style={[styles.textStyle,{color:this.color.otherL}]}>{I18n.t('otherLeave')}</Text>
              </View>
            </TouchableOpacity> */}
          </View>
          {this.state.dayList.length > 0 && 
            (<View style={{flexDirection: 'row', alignItems:'center',position:'absolute',bottom:0,zIndex:99999}}>
            <TouchableOpacity style={{flex:1}} onPress={(e) => this.submitDate()}>
              <View style={[styles.btn,{backgroundColor:Colors.baseColor}]}>
                <Text style={[styles.textStyle,{fontSize:responsiveFontSize(2.2)}]}>
                {this.state.dayList.length==1 ? I18n.t('selectOne') : I18n.t('nextCreate')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>)}
          <View>
            <CalendarList markingType={'period'} 
            onDayPress={this.onDayPress} 
            markedDates={this.state.markeds}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              monthTextColor: Colors.baseColor,
              textDayFontFamily: 'kanit',
              textMonthFontFamily: 'kanit',
              textDayHeaderFontFamily: 'kanit',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}/>
          </View>
      </Container>
    ):<Loading visible={true}/>;
  }

}
const styles = StyleSheet.create({
  buttonstyle: {
    flex:1,
    backgroundColor:'white',
    height:responsiveHeight(10),
    margin:2.5,
    // borderRadius: responsiveWidth(1),
    // borderBottomWidth:responsiveHeight(1),
    justifyContent: 'center',
  },
  textStyle: {
    textAlign:'center',
    fontFamily:'Kanit-Medium',
    color:"#fff"
  },
  btn: {
    borderWidth:responsiveWidth(1),
    borderColor: Colors.baseColor,
    height: responsiveHeight(9),
    justifyContent: 'center',
  }
});
