import React from 'react';
import {View,Text,Image,KeyboardAvoidingView,ScrollView} from 'react-native';
import {Grid,Col,Body,Button,CheckBox,StyleProvider,Item,Label,Input} from 'native-base';
import IdName from './status/IdName';
import ImageStatus from './status/ImageStatus';
import TimeIn from './status/TimeIn';
import Icon from 'react-native-vector-icons/FontAwesome';
import TimerMixin from 'react-timer-mixin';
import {em} from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import {convertPunch} from '../../utils/staffioUtils';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18N from '../../utils/i18n'
class StampPunch extends React.Component {
  constructor(props) {
      super(props);
    this.retry = this.retry.bind(this);
    this.cancel = this.cancel.bind(this);
    this.ok = this.ok.bind(this);
    this.state = {DateTime:"",punchInTime: "",timeCount:0,remark:"",error:false};
    this.onChange = this.onChange.bind(this);  
  }
  retry(){
      this.props.retry();
  }
  cancel(){
      this.props.cancel();
  }
  ok(){
      if(this.validateForm()){
        this.props.donePress();
      }else{
        this.setState({error:true});
        this.refs.view.bounce(800);
      }
  }
  validateForm (){
   if(this.props.showRemark){
     return  this.state.remark.trim() != ""; 
   }else{
     return true;
   }
 }
//  renderError(){
//      if(this.state.error)
//      return <Label style={{color:"red",fontFamily:'Kanit',fontSize:em(0.8),paddingLeft:20}}>  กรุณาระบุหมายเหตุ</Label>
//  }
 componentDidMount() {
     if(this.props.shiftData && this.props.shiftData.WORK_START_TM){
       this.timer = TimerMixin.setInterval( async () => {
            await this.countTime();
          }, 10000);
       const work_start_tm = this.props.shiftData.WORK_START_TM.split(":");
       const work_end_tm = this.props.shiftData.WORK_END_TM.split(":")

      let d = new Date(this.props.shiftData.msec);
      let h = d.getHours()<10 ? "0"+d.getHours():d.getHours();
      let m = d.getMinutes()<10 ? "0"+d.getMinutes():d.getMinutes();
      let work_tm = this.props.shiftData.WORK_START_TM.split(":");
      let tempD = convertPunch(d.getTime());

      if(this.props.shiftData.timeRecordType=="O"){
        work_tm = this.props.shiftData.WORK_END_TM.split(":");
      }

      this.setState({DateTime:tempD.split(' '),punchInTime: `${h}:${m}`,timeCount:d.getTime(),work_tm:work_tm[0]+":"+work_tm[1]})

      this.refs.scroll.scrollToEnd({animated: true});
      //   this.forceUpdate()
       
    }
 }
 async countTime(){
  let timeCount = this.state.timeCount + 10000; 
      let d = new Date(timeCount);
      let h = d.getHours()<10 ? "0"+d.getHours():d.getHours();
      let m = d.getMinutes()<10 ? "0"+d.getMinutes():d.getMinutes();
    this.setState({
        punchInTime: `${h}:${m}`,
        timeCount:timeCount
    })
 }
 onChange (value) {
     this.props.onChangeText(value);
     this.setState({remark:value,error:false});
 }
 renderLocation(){
     if(!this.props.showRemark) 
        return (<View style={{marginTop:5,alignItems:"center"}}>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",zIndex:9999}}>
                        <Icon style={styles.label} name='location-arrow' size={20} color='#f58020'/>
                        <Text allowFontScaling={false}style={{fontSize:responsiveFontSize(2),color:"#f58020",fontFamily:'Kanit'}}> {this.props.shiftData.branch_name} </Text>
                    </View>
                </View>)
    else
     return (<View style={{marginTop:5,alignItems:"center"}}>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",zIndex:9999}}>
                       <CheckBox checked={true}/>
                        <Text allowFontScaling={false}style={{marginLeft:10,fontSize:responsiveFontSize(2),color:"#9a9c9e",fontFamily:'Kanit'}}> 
                            {this.props.area_flag ? this.props.shiftData.branch_name :`${I18N.t('saveoutsideStampPunch')}`} </Text>
                </View>
               
             </View>)
 }
 renderPunchTime(){
     let fontcolor = "#737373";
     if(this.props.lateCondition){
        fontcolor = "red";
     }
     return  (<Text allowFontScaling={false}style={{fontSize:responsiveFontSize(6),fontFamily:'Kanit',color:fontcolor,marginTop:-responsiveHeight(3)}}> {this.state.punchInTime}</Text>)
 } 

  render(){
    return(
        <KeyboardAwareScrollView
            style={{ backgroundColor: Colors.backgroundColor }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}>
            <ScrollView ref="scroll" behavior='padding' style={styles.ViewStyle} scrollToEnd={true}>
                <View style={styles.workShiftContainerStyle}>
                        <Image source={{uri:`data:image/jpeg;base64,${this.props.imgPath}`}} style={{width: responsiveWidth(60),height:responsiveHeight(45)}} />
                </View>
                <View style={{marginTop:responsiveHeight(0.5),alignItems:"center"}}>
                        <Text allowFontScaling={false}style={{fontSize:responsiveFontSize(2.5),fontFamily:'Kanit'}}>{this.props.user.FULL_NAME_TH}</Text>
                        <Text allowFontScaling={false}style={{fontSize:responsiveFontSize(2),fontFamily:'Kanit',color:"#9a9c9e"}}>{`ID:${this.props.shiftData.empCode}  ${this.props.user.POSITION_NAME}`}</Text>
                </View>
                <View style={{marginTop:responsiveHeight(0.2),alignItems:"center",backgroundColor:"#f6f6f6",marginLeft:5,marginRight:5}}>
                        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",zIndex:9999}}>
                            <Icon style={{fontSize:responsiveFontSize(2),fontFamily:'Kanit',color:"#737373"}} name='calendar'/>
                            <Text allowFontScaling={false}style={{fontSize:responsiveFontSize(2.5),fontFamily:'Kanit',color:"#737373"}}> {`${this.state.DateTime[2]} ${this.state.DateTime[1]} ${this.state.DateTime[3]}`}</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"baseline"}}>
                           {this.renderPunchTime()}
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center",marginTop:-responsiveHeight(2),marginLeft:10}}>
                            <Icon style={{fontSize:responsiveFontSize(2),color:"#c6c8c9"}} name='caret-down'/>
                            <Text allowFontScaling={false}note style={{fontSize:responsiveFontSize(2),color:"#c6c8c9",fontFamily:'Kanit'}}> {this.state.work_tm}</Text>
                            <Text allowFontScaling={false}note style={{fontSize:responsiveFontSize(2),color:"#737373",fontFamily:'Kanit'}}> {`(${this.props.shiftData.shift_name})`}</Text>
                        </View>
                </View>
                {this.renderLocation()}
                <Animatable.View ref="view" style={{marginTop:responsiveHeight(0.2),marginLeft:10,marginRight:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between",zIndex:9999}}>
                       <Item style={!this.state.error ? {borderColor:"#D9D5DC"}:{borderColor:"red"}} floatingLabel={true}>
                            <Label style={{color:"#f58020",fontFamily:'Kanit',fontSize:em(0.8)}}>{I18N.t('RemarkStampPunch')} {this.props.showRemark && <Text allowFontScaling={false}style={{color:"red",fontFamily:'Kanit',fontSize:responsiveFontSize(1),paddingLeft:20}}>*</Text>}</Label>
                            {/*{this.renderError()}*/}
                            <Input style={{color:"#9a9c9e",fontFamily:'Kanit',height:responsiveHeight(8),fontSize:responsiveFontSize(1.5),lineHeight:responsiveFontSize(1.5)}} name="remark" value={this.state.remark} onChangeText={this.onChange}/>
                        </Item>
                </Animatable.View>
                
                <View style={{marginTop:responsiveHeight(3),marginLeft:5,marginRight:5,marginBottom:responsiveHeight(1)
                ,alignItems:"flex-end",borderTopWidth:1,borderTopColor:"#737373"}}>
                     <View style={{flexDirection:"row",alignItems:"flex-end",zIndex:9999,}}>
                         <Button transparent onPress={this.retry}>
                            <Text allowFontScaling={false} style={{color:"#f58020",fontSize:responsiveFontSize(2),fontFamily:"Kanit"}}>{I18N.t('RetakeStampPunch')}</Text>
                        </Button>
                        <Button transparent onPress={this.cancel}>
                            <Text allowFontScaling={false} style={{color:"#f58020",fontSize:responsiveFontSize(2),fontFamily:"Kanit"}}>{I18N.t('cancelStampPunch')}</Text>
                        </Button>
                        <Button transparent onPress={this.ok}>
                            <Text allowFontScaling={false} style={{color:"#f58020",fontSize:responsiveFontSize(2),fontFamily:"Kanit"}}>{I18N.t('okStampPunch')}</Text>
                        </Button>
                    </View>
                </View>
         </ScrollView>
     </KeyboardAwareScrollView>
    );
  }
  componentWillUnmount(){
   TimerMixin.clearInterval(this.timer);
 }
}
const styles={
  ViewStyle:{
    marginTop:em(1.2),
    marginLeft:em(1.2),
    marginRight:em(1.2),
    backgroundColor:"#ffff",
    borderRadius:10,
    height:responsiveHeight(93)
  },
  workShiftContainerStyle:{
    paddingTop: responsiveHeight(1.2),
    paddingBottom: 5,
    alignItems:"center"
  }
}
const customTheme = {
  'NativeBase.CheckBox': {
      checkboxBgColor:"#f58020"
  }
};
export default StampPunch;
