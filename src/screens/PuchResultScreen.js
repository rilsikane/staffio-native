import React from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert
} from 'react-native';
import {Grid,Col,Header,Body,Left,Button,Title,Right} from 'native-base';
// import LeaveCalendar from '../components/LeaveCalendar'
import StampResult from '../components/punchCard/stampResult';
import {em,x,y} from '../constants/Layout';
import { NavigationActions } from 'react-navigation'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import CardHeader from '../components/cardHeader';
import store from 'react-native-simple-store';
import {post} from '../api';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';

export default class PunchResultScreen extends React.Component {
  constructor(props){
    super(props);
     this.goBack = this.goBack.bind(this);
     this.onChangeText = this.onChangeText.bind(this);
     this.state = {comment:""};
     this.donePress = this.donePress.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  async donePress(){
    const userData = await store.get("USER");
    let params = {};
    params.TempMobileData = {};
    params.TempMobileData.empCode = this.props.puchRecordData.empCode;;
    params.TempMobileData.tempMobileNo = this.props.puchRecordData.temp_mobile_id;
    params.TempMobileData.comment = this.state.comment;
    params.TempMobileData.commentBy = userData.UserName;
    params.TempMobileData.remark = this.props.puchRecordData.remark;
    params.TempMobileData.updateBy = userData.UserName;
    try{
      const response = await post("UpdateComment",params);
      if(response.Success){
          this.setState({isLoading:false});
            Alert.alert(
              `${I18n.t('Comment')}`,
              `${I18n.t('CommentSuccess')}`,
              [
                {text: `${I18n.t('OK')}`, onPress: () => this.complete()},
              ],
              { cancelable: false }
            )
      }else{
        Alert.alert(
              `${I18n.t('Mistake')}`,
              response.Msg,
              [
                {text: `${I18n.t('OK')}`},
              ],
              { cancelable: false }
            )
      }
    }catch(ex){
       Alert.alert(
        `${I18n.t('Mistake')}`,
        response.Msg,
        [
          {text: `${I18n.t('OK')}`},
        ],
        { cancelable: false }
      )
    }
  }
  
  goBack(){
		this.props.close();
  }
  complete(){
    this.props.complete();
  }
 
  onChangeText (value) {
   this.setState({comment:value});
 }

  render() {
    return (
       <View style={{flex:1,backgroundColor:"#fee2c8"}}>
             <ScrollView style={{flex:1}}>
                <StampResult punch={this.props.puchRecordData} onChangeText={this.onChangeText} 
                goBack={this.goBack} donePress={this.donePress} empCode={this.props.empCode}></StampResult>
             </ScrollView>
       </View>
    );
  }

}
const styles={
  HeaderFont:{
    color:"#FFFF",
    fontFamily:"Kanit",
    backgroundColor:'transparent'
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
    fontSize: responsiveFontSize(1.5),
    fontWeight:"bold",
    fontFamily:'Kanit',
    backgroundColor:'transparent'
  },
}

I18n.fallbacks = true;

I18n.translations = {
  en: {
	Comment: 'Comment',
	CommentSuccess: 'Commented successfully',
	OK: 'OK',
	Mistake: 'Mistake'
  },
  th: {
	Comment: 'คอมเมนท์',
	CommentSuccess: 'คอมเมนท์เรียบร้อย',
	OK: 'ตกลง',
	Mistake: 'เกิดข้อผิดพลาด'
  },
};