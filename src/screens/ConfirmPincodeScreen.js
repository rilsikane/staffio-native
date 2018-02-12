import React, { Component, PropTypes } from 'react';
import {View,Keyboard,TouchableWithoutFeedback,Text,Alert} from 'react-native';
import PincodePress from '../components/pincode/PincodePress';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { NavigationActions } from 'react-navigation'
import store from 'react-native-simple-store';
import axios from 'axios';
import {authen} from '../api';
import DeviceInfo from 'react-native-device-info';
import Loading from '../components/loading';
import FCM from "react-native-fcm";
import app  from '../stores/app';
import I18n from 'react-native-i18n';


@inject('userStore')
@observer
export default class ConfirmPincodeScreen extends Component {
	
	constructor(props) {
      super(props);
      this.onDonePress = this.onDonePress.bind(this);
	  this.reset = this.reset.bind(this);
      this.state = {loading:false};
	  this.app = app;
 	}
	reset(){
		this.props.navigator.pop({
		animated: true, // does the pop have transition animation or does it happen immediately (optional)
		animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
		});
	}
	async onDonePress () {
		await this.updateUser();
	}
	async updateUser (){
		this.setState({loading:true});
		const userData = await store.get("USER");
		if(!userData.deviceId){
			userData.deviceId = await FCM.getFCMToken();
		}
		const uuid = DeviceInfo.getUniqueID();
		let user = {};
		user.user_name = userData.USER_NAME;
      	user.device_id = userData.deviceId;
		user.pin_code = this.props.userStore.pincode;
		user.token = userData.token;
		user.u_id = uuid;
		console.log(JSON.stringify(user));
		const response =  await authen("updatePincode",user);
		if(response){
			
			 await store.update('USER', {pincode: this.props.userStore.pincode});
			 this.app.login();
			 this.setState({loading:false});
		}
	}

	render() {
		return (
                <View style={{flex:1,backgroundColor:"#ffff"}}>
					{this.state.loading && <Loading visible={this.state.loading} mini={true}/>}
                    {!this.state.loading && <PincodePress pincode={this.props.userStore.pincode} reset={this.reset} 
					navigation={this.props.navigator} isConfirm={true} titileTxt={I18n.t('SetPass')} 
					onDonePress={this.onDonePress}/>}
                </View>
				
		);
	}
}
I18n.fallbacks = true;

I18n.translations = {
  en: {
	SetPass: 'Confirm Password'
  },
  th: {
	SetPass: 'ยืนยันรหัสผ่าน'
  },
};