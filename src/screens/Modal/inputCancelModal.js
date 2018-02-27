
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
import { Dropdown } from 'react-native-material-dropdown';

export default class inputCancelModal extends Component {
  constructor(props){
    super(props);
    this.cancelPress = this.cancelPress.bind(this);
    this.okPress = this.okPress.bind(this);
    this.state = {remark:"",error:false};
    this.onChange = this.onChange.bind(this);
  }
  cancelPress(){
    this.props.cancel();
  }
  okPress(){
    if(this.state.remark.trim() != ""){
      this.props.data.Remark = this.state.remark;
      this.props.ok(this.props.data);
    }else{
        this.setState({error:true});
        this.refs.view.bounce(800);
    }
  }
  onChange (value) {
    this.setState({remark:value,error:false});
  }

  render() {
    let data = [{
      value: 'ตัวอย่าง1',
    }, {
      value: 'ตัวอย่าง2',
    }, {
      value: 'ตัวอย่าง3',
    }];
    return (
        <Modal title={this.props.title} cancel={this.cancelPress} ok={this.okPress}>
            <View style={styles.container}>
              <Dropdown label={this.props.label} data={data}/>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontFamily: 'Kanit', color: '#fbaa3e', fontSize: responsiveFontSize(2)}}>{this.props.remark1}</Text>
                <Text style={{fontFamily: 'Kanit', color: '#5f504b', fontSize: responsiveFontSize(2)}}> {this.props.remark2}:</Text>
              </View>
              <Animatable.View ref="view"> 
                <Item style={[{paddingTop:responsiveFontSize(0.5)},!this.state.error ? {borderColor:"#D9D5DC"}:{borderColor:"red"}]} fixedLabel>
                  <Input style={[{color:'#b2bec3', fontSize: responsiveFontSize(1.8)}]} 
                    name="remark" value={this.state.remark} onChangeText={this.onChange}/>
                </Item>
              </Animatable.View>
            </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
 
  
});
