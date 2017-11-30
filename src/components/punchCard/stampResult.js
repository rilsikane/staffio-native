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

class StampResult extends React.Component {
  constructor(props) {
      super(props);
    this.retry = this.retry.bind(this);
    this.cancel = this.cancel.bind(this);
    this.ok = this.ok.bind(this);
    this.state = {comment:"",isSuper:false};
    this.onChange = this.onChange.bind(this);  
  }
  componentDidMount(){
      this.setState({comment:this.props.punch.comment});
  }
  retry(){
      this.props.retry();
  }
  cancel(){
      this.props.goBack();
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
//    if(this.props.showRemark){
//      return  this.state.remark.trim() != ""; 
//    }else{
//      return true;
//    }
    return true;
 }
//  renderError(){
//      if(this.state.error)
//      return <Label style={{color:"red",fontFamily:'Kanit',fontSize:em(0.8),paddingLeft:20}}>  กรุณาระบุหมายเหตุ</Label>
//  }

 
 onChange (value) {
     this.props.onChangeText(value);
     this.setState({comment:value,error:false});
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
            style={{ backgroundColor: Colors.backgroundColor,marginTop:20}}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}>
            <KeyboardAvoidingView behavior='padding' style={styles.ViewStyle}>
                <View style={styles.workShiftContainerStyle}>
                         <Image source={{ uri: `${this.props.punch.imagepath_tempMobile}` }} style={{width: responsiveWidth(52),height:responsiveHeight(39)}} />
                         <Text allowFontScaling={false}style={{fontSize:responsiveFontSize(2.5),fontFamily:'Kanit'}}>{this.props.punch.fullNameTH}</Text>
                </View>
               
                <View style={{marginLeft:10,marginRight:10}}>
                    <Label style={{color:"#f58020",fontFamily:'Kanit',fontSize:em(1.2)}}>หมายเหตุ  :</Label>
                    <Label style={{color:"#9a9c9e",fontFamily:'Kanit',fontSize:em(1)}}>{this.props.punch.remark || "ไม่ได้ระบุ"}</Label>
                </View>

                <View style={{marginLeft:10,marginRight:10,marginTop:responsiveHeight(2),borderTopWidth:1,borderTopColor:"#f58020"}}>
                    <Label style={{color:"#f58020",fontFamily:'Kanit',fontSize:em(1.2),marginTop:responsiveHeight(2)}}>คอมเมนท์  :</Label>
                     {this.props.punch.leaderCode == this.props.empCode && <Item inlineLabel last style={{height:responsiveHeight(3)}}>
                        <Input name="comment" value={this.state.comment} onChangeText={this.onChange} returnKeyType="send" onSubmitEditing={this.ok}
                        style={{color:"#9a9c9e",fontFamily:'Kanit',height:responsiveHeight(8),fontSize:responsiveFontSize(2),lineHeight:responsiveFontSize(1.5)}}/>
                      </Item>}
                      {this.props.punch.leaderCode != this.props.empCode &&  <Label style={{color:"#9a9c9e",fontFamily:'Kanit',fontSize:em(1)}}>{this.state.comment || "ไม่ได้ระบุ"}</Label>}
                </View>
              
                <View style={{marginTop:responsiveHeight(5),marginLeft:5,marginRight:5,marginBottom:5
                ,alignItems:"flex-end",borderTopWidth:1,borderTopColor:"#737373"}}>
                     <View style={{flexDirection:"row",alignItems:"flex-end",zIndex:9999,}}>
                        <Button transparent onPress={this.ok}>
                            <Text allowFontScaling={false} style={{color:"#f58020",fontSize:responsiveFontSize(2),fontFamily:"Kanit"}}> ตกลง </Text>
                        </Button>
                        <Button transparent onPress={this.cancel}>
                            <Text allowFontScaling={false} style={{color:"#f58020",fontSize:responsiveFontSize(2),fontFamily:"Kanit"}}> ยกเลิก </Text>
                        </Button>
                    </View>
                </View>
         </KeyboardAvoidingView>
     </KeyboardAwareScrollView>
    );
  }
}
const styles={
  ViewStyle:{
    marginTop:em(1.2),
    marginLeft:em(1.2),
    marginRight:em(1.2),
    backgroundColor:"#ffff",
    borderRadius:10,
  },
  workShiftContainerStyle:{
    paddingTop: 10,
    paddingBottom: 5,
    alignItems:"center"
  }
}
const customTheme = {
  'NativeBase.CheckBox': {
      checkboxBgColor:"#f58020"
  }
};
export default StampResult;
