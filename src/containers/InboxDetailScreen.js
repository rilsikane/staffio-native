import React from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Modal
} from 'react-native';
import {Grid,Col,Header,Body,Left,Button,Title,Right} from 'native-base';
// import LeaveCalendar from '../components/LeaveCalendar'
import IdName from '../components/status/IdName';
import ImageStatus from '../components/status/ImageStatus';
import TimeIn from '../components/status/TimeIn';
import {em,x,y} from '../constants/Layout';
import { NavigationActions } from 'react-navigation'
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import CardHeader from '../components/cardHeader';
import PuchResultScreen from './PuchResultScreen';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {post} from '../api';
import Loading from '../components/loading';
import store from 'react-native-simple-store';

@inject('punchStore')
@observer
export default class InboxDetailScreen extends React.Component {
  constructor(props){
    super(props);
     this.goBack = this.goBack.bind(this);
     this.state = {listDetails:[],modalVisible:false,selectItem:{},isLoading:false,userName:{}};
     this.onPressItem = this.onPressItem.bind(this);
     this.closeDialog =this.closeDialog.bind(this);
     this.commentComplete = this.commentComplete.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  onPressItem(data){
    this.setState({modalVisible:true,selectItem:data});
  }
  closeDialog(){
    this.setState({modalVisible:false,selectItem:{}});
  }
  goBack(){
		this.props.navigation.goBack();
  }
  async commentComplete(){
     const response = await this.GetTimeRecordHistory(this.props.punchStore.puchRecordData);
      if(response){
        this.setState({listDetails:response,modalVisible:false,selectItem:{}});
      }
  }
  async componentWillMount(){
    const userData = await store.get("USER");
    this.setState({isLoading:true,empCode:userData.EMP_CODE})
    const response = await this.GetTimeRecordHistory(this.props.punchStore.puchRecordData);
    if(response){
      this.setState({listDetails:response,isLoading:false});
    }else{

    }
  }
  getShiftDetail = async (record)=>{
    let params  = {};
    params.EmpCode = record.empCode;
    params.startDate = record.dateRecord;
    params.ShiftCode = record.shiftCode;
    const response = await post("GetDetail",params);
    // const response = customData2;
    return response;
  }
  GetTimeRecordHistory = async (record)=>{
    let params  = {};
    
    params.EmpCode = [record.empCode];
    params.StartDate = record.dateRecord;
    params.EndDate = record.dateRecord;
    params.Pagesize = 100;
    params.Page=1;
    params.flag="m";
    const response = await post("ESSServices/GetTimeRecordHistory",params);
    // const response = customData2;
    return response.ListTimeReocords;
  }

  render() {
    let DateToday = new Date().toDateString().split(' ');
    return (
       <View style={{flex:1,backgroundColor:"#fee2c8"}}>
            <CardHeader title="ประวัติ" goBack={this.goBack}/>
            <Loading visible={this.state.isLoading}/>
             <ScrollView style={{flex:1}}>
              <View style={styles.ViewStyle}>
                  <IdName record={this.props.punchStore.puchRecordData}/>
              </View>
              <View style={styles.ViewStyle}>
                  <ImageStatus record={this.props.punchStore.puchRecordData}/>
              </View>
              <View style={styles.ViewStyle}>
                  <Grid>
                  <Col size={75}>
                      <Text allowFontScaling={false}style={styles.TextStyle2}>{moment(this.props.punchStore.puchRecordData.dateRecord).format("Do MMM YYYY")}</Text>
                  </Col>
                  </Grid>
              </View>
              <View style={styles.ViewStyle2}>
                   { this.state.listDetails.map((val) => {
                    return ( 
                      <TimeIn punchRecord={this.props.punchStore.puchRecordData} record={val} key={val.temp_mobile_id} onPressItem={this.onPressItem}/>);
                  })}
                 
              
              </View>
             </ScrollView>
              <Modal animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}>
                <PuchResultScreen puchRecordData={this.state.selectItem} empCode={this.state.empCode}
                close={this.closeDialog} complete={this.commentComplete}></PuchResultScreen>
              </Modal>
       </View>
    );
  }

}
const styles={
  HeaderFont:{
    color:"#FFFF",
    fontFamily:"Kanit"
  },
  ViewStyle:{
    marginTop:responsiveHeight(1),
    marginLeft:responsiveWidth(2.5),
    marginRight:responsiveWidth(2.5)
  },
  ViewStyle2:{
    marginLeft:responsiveWidth(2.5),
    marginRight:responsiveWidth(2.5)
  },
  TextStyle2:{
    color:'#ff7f50',
    fontSize: responsiveFontSize(2.5),
    fontWeight:"bold",
    fontFamily:'Kanit'
  },
}

