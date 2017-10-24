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
@inject('userStore')
@observer
export default class ConfirmPincodeScreen extends Component {
	
	constructor(props) {
      super(props);
      this.onDonePress = this.onDonePress.bind(this);
	  this.reset = this.reset.bind(this);
      this.state = {loading:false};
 	}
	reset(){
		//this.props.navigation.goBack();
		//this.props.navigation.navigate("Pincode");
		const resetAction = NavigationActions.reset({
		index: 0,
		actions: [
			NavigationActions.navigate({ routeName: 'Pincode'})
		]
		})
		this.props.navigation.dispatch(resetAction)
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
			 	const resetAction = NavigationActions.navigate({
				routeName: 'Main'
				})
				this.props.navigation.dispatch(resetAction)
				this.setState({loading:false});
		}
	}

	render() {
		return (
                <View style={{flex:1,backgroundColor:"#ffff"}}>
					{this.state.loading && <Loading visible={this.state.loading} mini={true}/>}
                    {!this.state.loading && <PincodePress pincode={this.props.userStore.pincode} reset={this.reset} 
					navigation={this.props.navigation} isConfirm={true} titileTxt="ยืนยันรหัสผ่าน" 
					onDonePress={this.onDonePress}/>}
                </View>
				
		);
	}
}
