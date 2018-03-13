
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

export default class ImageModal extends Component {
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
    return (
        <Modal title={this.props.title} ok={this.okPress}>
            <View style={styles.container}>
                {/* <Text style={{fontFamily: 'Kanit', color: '#5f504b', fontSize: responsiveFontSize(2.3)}}>{this.props.remark}:</Text> */}
                <Text style={{fontFamily: 'Kanit', color: '#5f504b'
                , fontSize: responsiveFontSize(2),textAlign:'center'}}>{this.props.msg}</Text>
                
            </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
 
  
});
