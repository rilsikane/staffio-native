
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Modal from './modal'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Button, Item, Label, Input } from 'native-base';
import * as Animatable from 'react-native-animatable';
import I18n from '../../utils/i18n';
import { Dropdown } from 'react-native-material-dropdown';

export default class ConfirmReasonModal extends Component {
  constructor(props){
    super(props);
    this.cancelPress = this.cancelPress.bind(this);
    this.okPress = this.okPress.bind(this);
    this.state = {remark:"",error:false};
  }
  cancelPress(){
    this.props.cancel();
  }
  okPress(){
      this.props.ok(this.props.data);
  }


  render() {

    let data = [{
      value: 'ลาผิดวัน',
    }, {
      value: 'ขอเปลี่ยนวันลา',
    }, {
      value: 'งานด่วน',
    }, {
      value: 'ไม่สามารถลาในวันดังกล่าว',
    }, {
      value: 'ไม่มีสิทธิ์ลาพักร้อน',
    }, {
      value: 'อื่นๆ',
    }];

    return (
        <Modal title={this.props.title} cancel={this.cancelPress} ok={this.okPress}>
            <View style={styles.container}>
                {/* <Text style={{fontFamily: 'Kanit', color: '#5f504b', fontSize: responsiveFontSize(2.3)}}>{this.props.remark}:</Text> */}
                <Text style={{fontFamily: 'Kanit', color: '#5f504b'
                , fontSize: responsiveFontSize(2),textAlign:'center'}}>{this.props.msg}</Text>
                {/* <Text style={{fontFamily: 'Kanit', color: '#5f504b'
                , fontSize: responsiveFontSize(2),textAlign:'center'}}>{this.props.msg2}</Text> */}
              <Dropdown label={I18n.t('causeLeaveCon')} data={data} 
              style={[{marginTop:5,textAlign:'left',fontFamily:"Kanit", color: '#5f504b', fontSize: responsiveFontSize(2)}]} />
            </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
 
  
});
