import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,ScrollView,TouchableWithoutFeedback,
  Modal
} from 'react-native';
// import LeaveCalendar from '../components/LeaveCalendar'
import {Button,Fab} from 'native-base'
import Colors from '../constants/Colors'
import {em,window} from '../constants/Layout'
import {Content,Tabs,Tab,TabHeading,Container,Footer} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import InboxList from '../components/inbox/inboxList'
import * as Animatable from 'react-native-animatable';
import TagInput from '../components/tagInput';
import { NavigationActions } from'react-navigation';
import store from 'react-native-simple-store';
import {post} from '../api';
import { observer, inject } from 'mobx-react';
import CardHeader from '../components/cardHeader';
import Loading from '../components/loading';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PTRView from 'react-native-pull-to-refresh';
import {convertDateDB,convertForTag} from '../utils/staffioUtils';
import ActionButton from '../components/stffioActionButton/ActionButton';
import AnimatedOverlay from 'react-native-animated-overlay';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/fonts/config.json'
import I18n from '../utils/i18n';

const IconTello = createIconSetFromFontello(fontelloConfig);


@inject('punchStore')
@observer
export default class InboxScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {showCriteria:false,tags:["All"]
    ,listTimeReocords:[],isLoading:false,users:[]
    ,modalVisible:false,locationSearch:[],locations:[],dateSearch:[]
    ,locationSelect:[],statusSelect:[],dateSelect:[],empSelect:[],page:0,total:0};
    this.toggleCriteria = this.toggleCriteria.bind(this);
     this.onCriteriaChange = this.onCriteriaChange.bind(this);
     this.onPressItem = this.onPressItem.bind(this);
     this._refresh = this._refresh.bind(this);
     this.openCriteria = this.openCriteria.bind(this);
     this.DashBorad = this.DashBorad.bind(this);
     this.onDoneDialog = this.onDoneDialog.bind(this);
     this.onLocationChange = this.onLocationChange.bind(this);
     this.cancelDialog = this.cancelDialog.bind(this);
     this.clearTags = this.clearTags.bind(this);
     this.onEndReached = this.onEndReached.bind(this);
     this.closeDialog = this.closeDialog.bind(this);
     this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  static navigationOptions = {
    header: null,
    
  };
  async componentWillMount(){
    //this.setState({isLoading:true});
     this.init();
  }
  async init(){
    this.setState({isLoading:true});
    const userData = await store.get("USER");
    let response = {};
    const master = await this.GetSearchCriteria(userData);
    if(!this.props.statusForm){
      response = await this.GetTimeRecordHistory(userData);
    }else{
      response = await this.GetTimeRecordHistory(userData,this.props.startDateFrom,this.props.endDateFrom
      ,undefined,[this.props.statusForm],[userData.EMP_CODE]);
        this.setState({tags:[master.StatusList[this.props.statusForm]]});
    }
    this.setState({listTimeReocords:response,isLoading:false,locations:master.BranchMaster
      ,users:master.EmployeeList,statuses:master.StatusList})
  }

  GetSearchCriteria = async(user)=>{
    let params  = {};
    params.SearchBy = user.EMP_CODE;
    const response = await post("GetDropDownMaster",params);
    console.log("GetDropDownMaster",response)
    let master = {};
    master.BranchMaster = await this.buildLocations(response.BranchMaster);
    master.EmployeeList = await this.buildUsers(response.EmployeeList);
    master.StatusList = await this.buildStatuses();
    
    return master;
  }
  buildStatuses = async()=>{
    let statuses = {"NM":"ปกติ","LT":"สาย","EL":"กลับก่อน","AB":"ขาด"};
    
    return statuses;
  }
  buildLocations = async(branchMaster)=>{
     let locations = {};
    if(branchMaster && branchMaster.length>0){
      let tmp = {};
      tmp["99999"] = "ลงเวลานอกสถานที่";
      for(let i=0;i<branchMaster.length;i++){
        tmp[branchMaster[i].branchID] = branchMaster[i].branchName;
        locations=tmp;
      }
    }
    return locations;
  }
   buildUsers = async(empList)=>{
     let employees = {};
    if(empList && empList.length>0){let tmp = {};
    
      for(let i=0;i<empList.length;i++){
        
        tmp[empList[i].EmpCode] = empList[i].EmpFullName;
        employees=tmp;
      }
    }
    return employees;
  }
  removeA(arr) {
    if(arr && arr.length > 0){
      
      var what, a = arguments, L = a.length, ax;
      var result = [];
      while (L > 1 && arr.length) {
          what = a[--L];
          while ((ax= arr.indexOf(what)) !== -1) {
              arr.splice(ax, 1);
          }
      }
      if(arr.length>0){
        result = arr;
      }
      return result;
    }else{
      return [];
    }
    
}
  GetTimeRecordHistory = async (user,startDate,endDate,locations,statuses,staffs)=>{
    let params  = {};

    let locationSearch = undefined;
    let area_flag = undefined;
    if(locations && locations.length > 0){
      
      if(locations.indexOf("99999")!=-1){
        area_flag = "N";
      }else{
        area_flag = "Y"
      }
      locationSearch = [...locations];
      this.removeA(locationSearch,"99999");
    }else{
      locationSearch = locations;
    }
    
    params.SearchBy = user.EMP_CODE;
    params.startDate = startDate ? convertDateDB(startDate):undefined;
    params.endDate = endDate ? convertDateDB(endDate):undefined;
    params.location = locationSearch;
    params.status = statuses && statuses.length > 0 ? statuses : undefined;
    params.EmpCode = staffs&& staffs.length >0 ? staffs:undefined;
    params.pagesize = 100;
    params.areaFlag = area_flag;
    params.page=this.state.page;
    params.flag="m";
    const response = await post("ESSServices/GetTimeRecordHistory",params);
    // const response = customData2;
    return response.ListTimeReocords;
  }

  toggleCriteria(){
    if(!this.state.showCriteria){
      this.refs.criteria.transitionTo({height: em(12)});
      this.setState({showCriteria:true});
    }else{
       this.refs.criteria.transitionTo({height: em(3)});
        this.setState({showCriteria:false});
    }
  }
  renderCriteria(){
     if(this.state.showCriteria){
            
     }
  }
  onPressItem(data){
    this.props.punchStore.puchRecordData = data;
    this.props.navigator.push({
			screen: 'staffio.InboxDetailScreen', // unique ID registered with Navigation.registerScreen
			title: undefined, // navigation bar title of the pushed screen (optional)
			titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
			passProps: {}, // Object that will be passed as props to the pushed screen (optional)
			animated: false, // does the push have transition animation or does it happen immediately (optional)
			backButtonTitle: undefined, // override the back button title (optional)
			backButtonHidden: false, // hide the back button altogether (optional)
		});
  }
  async _refresh(){
    this.setState({isLoading:true});
    // const userData = await store.get("USER");
    // const response = await this.GetTimeRecordHistory(userData,null,null);
    // this.setState({listTimeReocords:response,isLoading:false})
    await this.onDoneDialog();
  }
  openCriteria(){
    //  this.setState({isLoading:true});
    //  this.setState({modalVisible:true});
    //  setTimeout(()=>{
    //    this.setState({isLoading:false});
    //  },500);
     //this.setState({modalVisible:true});
      this.props.navigator.showModal({
        screen: "staffio.InqInboxCriteria", // unique ID registered with Navigation.registerScreen
        title: "Modal", // title of the screen as appears in the nav bar (optional)
        passProps: {cancelDialog:this.cancelDialog,onDoneDialog:this.onDoneDialog,closeDialog:this.closeDialog,
        locations:this.state.locations,statuses:this.state.statuses,users:this.state.users}, // simple serializable object that will pass as props to the modal (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
      });
  }
  DashBorad(){
    //  this.setState({isLoading:true});
    //  this.setState({modalVisible:true});
    //  setTimeout(()=>{
    //    this.setState({isLoading:false});
    //  },500);
     //this.setState({modalVisible:true});
      this.props.navigator.showModal({
        screen: "staffio.DashBoradProject", // unique ID registered with Navigation.registerScreen
        title: "Modal", // title of the screen as appears in the nav bar (optional)
        passProps: {cancelDialog:this.cancelDialog,onDoneDialog:this.onDoneDialog,closeDialog:this.closeDialog,
        navigation: this.props.navigator.setOnNavigatorEvent,locations:this.state.locations,statuses:this.state.statuses,users:this.state.users}, // simple serializable object that will pass as props to the modal (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
      });
  }


  onCriteriaChange(tag){
    console.log(tag);
  }
  buildTags(){
     let tags = [];
    if(this.props.punchStore.locationSearch && this.props.punchStore.locationSearch.length>0){
      for(let i=0;i<this.props.punchStore.locationSearch.length;i++){
        const locations = this.state.locations[this.props.punchStore.locationSearch[i]];
        if(locations){
          tags.push(locations);
        }
      }
    }
    
    if(this.props.punchStore.statusSearch && this.props.punchStore.statusSearch.length>0){
      for(let i=0;i<this.props.punchStore.statusSearch.length;i++){
        const statuses = this.state.statuses[this.props.punchStore.statusSearch[i]];
        if(statuses){
          tags.push(statuses);
        }
      }
    }
    if(this.props.punchStore.dateSearch && this.props.punchStore.dateSearch.length>0){
      //tags.push(this.props.punchStore.dateSearch[0]);
      if(this.props.punchStore.dateSearch){
        if(this.props.punchStore.dateSearch.length>1){
          const beginDate = `${convertForTag(this.props.punchStore.dateSearch[0].timestamp,"DD MMM ")}`;
          const endDate = `${convertForTag(this.props.punchStore.dateSearch[this.props.punchStore.dateSearch.length-1].timestamp,"DD MMM ")}`;
          tags.push(`${beginDate} - ${endDate}`);
        }else{
          const beginDate = `${convertForTag(this.props.punchStore.dateSearch[0].timestamp,"DD MMM ")}`;
          tags.push(`${beginDate}`);
        }
      }
    }
    if(this.props.punchStore.staffSearch && this.props.punchStore.staffSearch.length>0){
      for(let i=0;i<this.props.punchStore.staffSearch.length;i++){
        const staffs = this.state.users[this.props.punchStore.staffSearch[i]];
        if(staffs){
          tags.push(staffs);
        }
      }
    }
    if(tags.length ==0){
      tags = ["All"]
    }
    this.setState({modalVisible:false,isLoading:false,tags:tags});
  }
  cancelDialog(){
    this.props.punchStore.statusSearch = this.state.statusSelect;
    this.props.punchStore.locationSearch = this.state.locationSelect;
    this.props.punchStore.staffSearch = this.state.empSelect;
    this.props.punchStore.dateSearch =  this.state.dateSelect;
    this.props.navigator.dismissModal({
      animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }
  async clearTags(){
    this.setState({isLoading:true});
    this.setState({tags:["All"],listTimeReocords:[]});
    this.props.punchStore.statusSearch = [];
    this.props.punchStore.locationSearch = [];
    this.props.punchStore.staffSearch = [];
    this.props.punchStore.dateSearch = [];
    
    const userData = await store.get("USER");
    const response = await this.GetTimeRecordHistory(userData);
    this.setState({listTimeReocords:response,isLoading:false,statusSelect:[],locationSelect:[],empSelect:[],dateSelect:[]});
  }
  closeDialog(){
     this.props.navigator.dismissModal({
      animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
    this.setState({isLoading:true});
  }
  async onDoneDialog(){
    const userData = await store.get("USER");
    let startDate,endDate;
    if(this.props.punchStore.dateSearch.length >0){
      if(this.props.punchStore.dateSearch.length>1){
        startDate = this.props.punchStore.dateSearch[0].timestamp;
        endDate = this.props.punchStore.dateSearch[this.props.punchStore.dateSearch.length-1].timestamp;
      }else{
        startDate = this.props.punchStore.dateSearch[0].timestamp;
        endDate = this.props.punchStore.dateSearch[0].timestamp;
      }
    }
   
    const response = await this.GetTimeRecordHistory(userData,startDate,endDate
    ,this.props.punchStore.locationSearch,this.props.punchStore.statusSearch,this.props.punchStore.staffSearch);
    this.setState({listTimeReocords:response||[]})
    this.buildTags();
    
    this.setState({locationSelect:this.props.punchStore.locationSearch,statusSearch:this.props.punchStore.statusSearch,
    dateSelect:this.props.punchStore.dateSearch,empSelect: this.props.punchStore.staffSearch});
    
  }
  onLocationChange(locations){
    this.setState({locationSearch:locations});
  }

  async onEndReached(){
    if(this.state.total == 0 || this.state.listTimeReocords.length < this.state.total){
      let startDate,endDate;
      if(this.props.punchStore.dateSearch.length >0){
        if(this.props.punchStore.dateSearch.length>1){
          startDate = this.props.punchStore.dateSearch[0].timestamp;
          endDate = this.props.punchStore.dateSearch[this.props.punchStore.dateSearch.length-1].timestamp;
        }else{
          startDate = this.props.punchStore.dateSearch[0].timestamp;
          endDate = this.props.punchStore.dateSearch[0].timestamp;
        }
      }
      const userData = await store.get("USER");
      this.setState({page:this.state.page+1});
      const response = await this.GetTimeRecordHistory(userData,startDate,endDate
      ,this.props.punchStore.locationSearch,this.props.punchStore.statusSearch,this.props.punchStore.staffSearch);
      this.setState({listTimeReocords:this.state.listTimeReocords.concat(response),totla:response.total});
    }
  }
  onNavigatorEvent(event) {
    if (event.id === 'willAppear') {
     
    }
    if (event.id === 'didAppear') {
      if(this.props.statusForm){
        this.init();
      }
    }
    if(event.selectedTabIndex!==undefined){
      // switch(event.selectedTabIndex){
      //   case 0 :{
          
      //     break;
      //   }
      //    case 3 :{
      //     this.props.navigator.popToRoot({
      //       animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
      //       animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
      //     });
      //     break;
      //   }

        
      // }
      this.props.navigator.popToRoot({
        animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
      });
    }
    // if (event.id === 'bottomTabReselected') {
    //   this.componentWillMount();
    // }
  }

  render() {
    return (
      <View  style={{backgroundColor:Colors.backgroundColor,flex:1}}>
       <CardHeader title={`${I18n.t('History')}`}/>   
           <Loading visible={this.state.isLoading}/>
           <View style={{height:responsiveHeight(10),marginTop:5,flexDirection:"row",alignItems:"center",marginLeft:10}}>
                <TagInput  onChange={(tags) => this.onCriteriaChange(tags)}
                value={this.state.tags} />
            </View>
          <PTRView onRefresh={this._refresh} style={{marginTop:5}}>
              <InboxList onEndReached={this.onEndReached} onPressItem={this.onPressItem} listTimeReocords={this.state.listTimeReocords}/>
         </PTRView>
         
         {/*<Fab
            active={this.state.active}
            direction="up"
            style={{ backgroundColor: Colors.baseColor }}
            position="bottomRight" onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="filter" />
            <Button style={{ backgroundColor: '#34A34F' }} onPress={this.openCriteria}>
              <Icon name="search" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="trash" />
            </Button>
          </Fab>*/}
            {/* <ActionButton size={45}  backPress={this.closeOverlay} buttonColor={Colors.baseColor} 
            icon={<IconTello name="hhmm-29" style={{color:"#ffff", backgroundColor:'transparent'}}/>} 
            backdrop={<AnimatedOverlay
              backgroundColor='#000'
              opacity={0.8}
              duration={200}
              overlayShow={true}
            />} degrees={180}>
              <ActionButton.Item  buttonColor={Colors.baseColor} title='ค้นหา' onPress={this.openCriteria}>
                 <Icon name="search" style={{color:"#ffff",backgroundColor:'transparent'}}/>
              </ActionButton.Item>
              <ActionButton.Item  buttonColor={Colors.baseColor} title="ล้างตัวเลือก"  onPress={this.clearTags}>
               <Icon name="trash" style={{color:"#ffff",backgroundColor:'transparent'}}/>
              </ActionButton.Item>
              <ActionButton.Item  buttonColor={Colors.baseColor} title="dashbord"  onPress={this.DashBorad}>
               <IconTello name="hhmm-03" style={{color:"#ffff",backgroundColor:'transparent'}}/>
              </ActionButton.Item>
          </ActionButton> */}
          <ActionButton  IconButton={<IconTello name="hhmm-29" size={25} style={{ color: 'white' }} />} size={responsiveWidth(17)} buttonColor="#fbaa3e">
            <ActionButton.Item marginRight={-(responsiveWidth(1))} marginBottom={-(responsiveHeight(2))} buttonColor='transparent'  onPress={this.openCriteria}>
              <Icon name="search" style={styles.actionButtonIcon} />
             <Text style={{fontFamily: 'Kanit-Medium', color:'white', fontSize:responsiveFontSize(1.5)}}>ค้นหา</Text>
            </ActionButton.Item>
            <ActionButton.Item marginRight={responsiveWidth(18)} marginBottom={-(responsiveHeight(10))} buttonColor='transparent' onPress={this.clearTags}>
              <Icon name="trash" style={styles.actionButtonIcon} />
              <Text style={{fontFamily: 'Kanit-Medium', color:'white', fontSize:responsiveFontSize(1.5)}}>ล้างตัวเลือก</Text>
            </ActionButton.Item>
          </ActionButton>
           
           {/*<Modal animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}>
                
                
              </Modal>*/}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  tabIcon:{
    color:Colors.baseColor,
    fontSize:em(1.2)
  },
  tabLabel:{
    color:Colors.baseColor,
    fontFamily:'Kanit',
    fontSize:em(0.7),
    backgroundColor:'transparent'
  },
  tabHeading:{
    borderRightWidth: 1,
    borderColor:Colors.backgroundColor
  },
  HeaderFont:{
    color:"#FFFF",
    fontFamily:"Kanit",
    fontSize:responsiveFontSize(2),
    backgroundColor:'transparent',
  },
  buttonStyle: {
    position: "absolute",
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "blue"
  },
  actionButtonIcon: {
    fontSize: responsiveFontSize(3),
    height: 22,
    color: 'white',
  },
});