import React from 'react';
import { TextInput, TouchableOpacity, Platform,StyleSheet,Text,View} from 'react-native';
import { Button, Item, Label, Input ,Container,Header,Left,Body,Title,Right} from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../utils/i18n';
import LeaveWorkshift from '../components/leave/LeaveWorkshift';
import CardHeader from '../components/cardHeader';
import {post,get,uploadFile} from '../api';
import store from 'react-native-simple-store';
import {convertDate, disbackButton} from '../utils/staffioUtils';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import Colors from '../constants/Colors';
import { observer, inject } from 'mobx-react';
import {convertByFormatShort} from '../utils/staffioUtils';
import ImagePicker from 'react-native-image-picker'
import * as Animatable from 'react-native-animatable';
import Loading from '../components/loading';
import ImageResizer from 'react-native-image-resizer';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
var options = {
  title: 'แนบเอกสาร',
  title: 'Select',
  noData:true,
  mediaType:'mixed',
  storageOptions: {
      skipBackup: true,
      path: 'construction cloud'
  }
};
@inject('leaveStore')
@observer
export default class LeaveWorkshiftScreen extends React.Component {
  constructor(props) {
        super(props);
        this.state = {reasons:[],remark:"",reason:"",file:{},isLoading:false}
        this.submit = this.submit.bind(this);
        this.closeScreen = this.closeScreen.bind(this);
        this.selectImage = this.selectImage.bind(this);
        this.openFile = this.openFile.bind(this);
  }
  async selectImage(){
    
    ImagePicker.showImagePicker(options, async (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        const {originalRotation } = response;
        let rotation = 0
        if ( originalRotation === 90 ) {
          rotation = 90
        } else if ( originalRotation === 270 ) {
          rotation = -90
        }

        const fileResize = await ImageResizer.createResizedImage(response.uri, 720, 960, "JPEG",60,rotation);
        this.setState({file:{path:fileResize.path,origURL:fileResize.path,fileName:fileResize.name,uri:fileResize.uri}});
      
      }
    });
  }
  
  closeScreen(){
    this.props.navigator.dismissLightBox();
    setTimeout(() => {
    this.props.navigator.resetTo({
      screen: 'staffio.PersonalStatScreen', // unique ID registered with Navigation.registerScreen
      title: undefined, // navigation bar title of the pushed screen (optional)
      animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
      navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
      navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
    });
  },500);
    
  }
  async submit(){
    if(this.validateSubmit()){
      this.setState({isLoading:true});
      let params = this.props.leaveStore.leaveReqData;
      params.LeaveReq.LEAVE_REASON = this.state.reason;
      params.LeaveReq.REMARK = this.state.remark;
      if(this.state.file.fileName){
        // let files = [
        //   {name: 'file[]', filename:this.state.file.fileName,filepath:this.state.file.path,filetype:this.state.file.type}
        // ]
        let response = await uploadFile("FileManager/UploadFilesAttachment",this.state.file,params);
        if(response){
          this.setState({isLoading:false});
        setTimeout(()=>{
          this.props.navigator.showLightBox({
            screen: "staffio.MsgModalScreen", // unique ID registered with Navigation.registerScreen
            passProps: {title:'',msg:`${I18n.t('leaveSuccess')}`
            ,ok:this.closeScreen}, // simple serializable object that will pass as props to the lightbox (optional)
            style: {
              backgroundBlur: "dark",
              backgroundColor: "rgba(0,0,0,.5)",
              height:responsiveHeight(70),
              width:responsiveWidth(90)
            },
            adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
          });
        },500)  
          
        }
      }else{
        let response = await post("ESSServices/CreateESSLeaveRequest",params);
        if(response){
          //this.setState({isLoading:false});
          setTimeout(()=>{
            this.props.navigator.showLightBox({
              screen: "staffio.MsgModalScreen", // unique ID registered with Navigation.registerScreen
              passProps: {title:'',msg:`${I18n.t('leaveSuccess')}`
              ,ok:this.closeScreen}, // simple serializable object that will pass as props to the lightbox (optional)
              style: {
                backgroundBlur: "dark",
                backgroundColor: "rgba(0,0,0,.5)",
                height:responsiveHeight(70),
                width:responsiveWidth(90)
              },
              adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
            });
          },300)  
        }
      }
    }
  }
  validateSubmit(){
    let invalid = false;
    if(this.props.leaveStore.leaveReqLeaveType.REQUEST_DOCUMENT=="Y" && this.props.leaveStore.leaveReqLeaveType.DAY_OF_REQ_DOCUMENT <= this.props.leaveStore.leaveReqData.LeaveReq.TOTAL_LEAVEDAY){
      if(!this.state.file.fileName){
        this.refs.attach.bounce(800);
        invalid = true;
      }
    }
    if(this.props.leaveStore.leaveReqLeaveType.REQUEST_REASON=='Y'){
      if(this.state.reason==""){
        this.refs.reason.bounce(800);
        invalid = true;
      }
    }
    return !invalid;
  }
  async componentDidMount(){
    const user = await store.get("USER");
    let param = {};
    param.Code= "LEAVE_REASON";
    param.CustomerCode = user.CUSTOMER_CODE;
    param.orderFieldName = "CATEGORY_NAME_TH";
    
    if(this.props.leaveStore.leaveReqLeaveType.REQUEST_REASON=='Y'){
      let response = await post("DropDownListService/GetDDLCategoryByCode",param);
      // console.log("GetDDLCategoryByCode",response);
      // console.log("leaveReqLeaveType",this.props.leaveStore.leaveReqLeaveType);
      let reasons = response.filter(ddl=>ddl.DATA1 == this.props.leaveStore.leaveReqLeaveType.LEAVE_GROUP_CODE);
      this.setState({reasons:reasons});
    }
  }
  renderAttach(){
    let isReq = this.props.leaveStore.leaveReqLeaveType.REQUEST_DOCUMENT=="Y" && this.props.leaveStore.leaveReqLeaveType.DAY_OF_REQ_DOCUMENT <= this.props.leaveStore.leaveReqData.LeaveReq.TOTAL_LEAVEDAY;
    return isReq
  }
  openFile = () => {
    console.log(this.state.file.imgUri)
    this.props.navigator.showModal({
      screen: "staffio.ImageModal", // unique ID registered with Navigation.registerScreen
      title: "Modal", // title of the screen as appears in the nav bar (optional)
      passProps: {imgUri:this.state.file.uri,navigator:this.props.navigator}, // simple serializable object that will pass as props to the modal (optional)
      navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });
  }
  
  render() {
  
    return (
     
      <View style={{flex:1}}>
      <CardHeader goBack={()=>this.props.navigator.pop()} />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{marginLeft: responsiveWidth(3),marginRight: responsiveWidth(3),marginTop: responsiveWidth(2),marginBottom: responsiveWidth(2),}}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={{fontSize: responsiveFontSize(2.5),fontFamily:'Kanit-Regular',color:'#fbaa3e'}}>{`${this.props.leaveStore.leaveReqLeaveType.LEAVE_TYPE_NAME} ${I18n.t('Total')}  ${this.props.leaveStore.leaveReqData.LeaveReq.TOTAL_LEAVEDAY} ${I18n.t('Day')}`}</Text> 
              <View style={{flexDirection:'row', alignItems:'center',marginBottom:responsiveHeight(1),marginTop:10}}>
                <Text style={{flex:1,fontSize: responsiveFontSize(2.2),fontFamily:'Kanit-Regular',color:'#5f504b'}}>{I18n.t('dateOfLeave')}</Text> 
                <Text style={{flex:3,fontSize: responsiveFontSize(2),fontFamily:'Kanit-Regular',color:'#5f504b',textAlign:'center'}}>{`${convertByFormatShort(new Date(this.props.leaveStore.leaveReqData.LeaveReq.START_DATE).getTime(),"DD MMM ")} - ${convertByFormatShort(new Date(this.props.leaveStore.leaveReqData.LeaveReq.END_DATE).getTime(),"DD MMM ")}`}</Text> 
               
                {/* <Icon style={{flex:1,textAlign:'right',color:'#5f504b'}} name='angle-down' size={responsiveFontSize(2)} /> */}
              </View>
            </View>
          </View>
          <View style={{margin:responsiveHeight(3),marginTop:6}}>
            {this.state.reasons.length >0 && 
            <Animatable.View ref="reason">
              <Dropdown label={I18n.t('causeLeaveCon')} data={this.state.reasons} valueExtractor={item => item.id} labelExtractor={item => item.title}
              style={[{marginTop:5,textAlign:'left',fontFamily:"Kanit"}]} onChangeText={(value) => this.setState({reason:value})}/>
            </Animatable.View>
            }
            <Text style={{fontFamily: 'Kanit', color: '#5f504b', fontSize: responsiveFontSize(2.2)}}>{I18n.t('remarkLeaveConfirm')}</Text> 
            <View style={{backgroundColor:'#f5f6fa',borderColor: '#fbaa3e', borderWidth: 1, borderRadius:1,marginTop:responsiveHeight(2)}}>
              <TextInput style={styles.textAreaStyle} editable = {true} maxLength = {100} multiline = {true} numberOfLines = {3} 
              underlineColorAndroid='transparent' onChangeText={(text) => this.setState({remark:text})}/>
            </View>
          </View>
          {this.renderAttach() && 
          <Animatable.View ref="attach" style={{flexDirection:'row',alignItems:'center',margin:responsiveHeight(3)}}>
              <Text style={{flex:0,fontFamily: 'Kanit', color: '#5f504b', fontSize: responsiveFontSize(2.5)}}>{I18n.t('attachDoc')}</Text> 
              <TouchableOpacity style={{flex:3}} onPress={()=> this.selectImage()}>
                <View style={[styles.btn1,{backgroundColor:'#f5f6fa'}]}>
                  <Text style={[styles.textStyle1,{color:'#fbaa3e',fontSize:responsiveFontSize(2.2)}]}>{this.props.leaveStore.leaveReqLeaveType.DOCUMENT_NAME}</Text>
                </View>
              </TouchableOpacity>
              {this.state.file.fileName && <TouchableOpacity onPress={this.openFile}>
                <Icon style={{flex:0,textAlign:'right',color:'#fbaa3e',fontSize:20}} name='file-archive-o' size={responsiveFontSize(2)} />
              </TouchableOpacity>}
            </Animatable.View>}
         
        </View>
        </KeyboardAwareScrollView>
        <View style={{flexDirection: 'row', alignItems:'center',position:'absolute',bottom:0,zIndex:99999}}>
           
            <TouchableOpacity style={{flex:1}} onPress={(e) => this.submit()}>
              <View style={[styles.btn,{backgroundColor:Colors.baseColor}]}>
                <Text style={styles.textStyle1}>
                    {I18n.t('ok') }
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Loading visible={this.state.isLoading}/>
        </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: responsiveWidth(3),
    backgroundColor:"#FFF"
  },
  header: {
    borderBottomWidth: responsiveWidth(0.5),
    justifyContent: 'center',
    
    borderColor: '#5f504b',
    // width:responsiveWidth(80)
  },
  btn: {
    borderRadius: responsiveWidth(7),
    borderWidth:responsiveWidth(0.5),
    borderColor: '#fbaa3e',
    height: responsiveHeight(8),
    margin:responsiveWidth(4),
    justifyContent: 'center',
  },
  textStyle: {
    textAlign:'center',
    fontFamily:'Kanit-Medium',
  },
  btn1: {
    borderRadius: responsiveWidth(2),
    borderWidth:responsiveWidth(0.5),
    borderColor: '#fbaa3e',
    height: responsiveHeight(8),
    margin:responsiveWidth(4),
    justifyContent: 'center',
  },
  textStyle1: {
    textAlign:'center',
    fontFamily:'Kanit',
    color:"#fff",
    fontSize: responsiveFontSize(2.8),
  },
  btn: {
    borderWidth:responsiveWidth(1),
    borderColor: Colors.baseColor,
    height: responsiveHeight(9),
    justifyContent: 'center',
  },
  textAreaStyle: {
    fontFamily: "Kanit",
    fontSize: responsiveFontSize(1.8),
    height:80,
    marginTop:5,
  }
});
