import React, { Component} from 'react';
import {View,Keyboard,TouchableWithoutFeedback,Text,Platform} from 'react-native';
import PincodePress from '../components/pincode/PincodePress';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { NavigationActions } from 'react-navigation';
import store from 'react-native-simple-store';
import DeviceInfo from 'react-native-device-info';
import {authen} from '../api';
import Loading from '../components/loading';
import TimerMixin from 'react-timer-mixin';
import FCM from "react-native-fcm";
import Constans from '../constants/Constants';
import app  from '../stores/app';
import I18n from '../utils/i18n';
import {disbackButton} from '../utils/staffioUtils'

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

@inject('userStore')
@observer
export default class AuthenPincodeScreen extends Component {
	componentWillMount(){
		disbackButton();
	}
	constructor(props) {
      super(props);
      this.onDonePress = this.onDonePress.bind(this);
	  this.state = {pincode:"",loading:false};
	  this.app = app;
	  this.init();
 	}

	async init(){
		const userData = await store.get("USER");
		this.setState({pincode:userData.pincode});
		this.forceUpdate();
    }
	async onDonePress() {
		this.setState({loading:true});

		const userData = await store.get("USER");
		if(!userData.deviceId){
			userData.deviceId = await FCM.getFCMToken();
		}
		const uuid = DeviceInfo.getUniqueID();
		let user = {};
		user.pin_code = userData.pincode;
		user.user_name = userData.USER_NAME;
		user.device_id = userData.deviceId;
		user.password = "";
		user.u_id = uuid;
		user.tokenType = "M"
		user.versionNew = Constans.version;
		user.platform = `${Platform.OS}_${DeviceInfo.getSystemVersion()}`;
		
		const response =  await authen("checkLogin", user);
		if(response){
			console.log(response);
			await store.update('USER', {token: response.data.userProfile.Token});
			response.data.userProfile.pin_code = userData.pincode;
			response.data.userProfile.device_id = userData.deviceId;
			response.data.userProfile.u_id = uuid;
			await store.update('USER', response.data.userProfile);
			this.app.login();
		}else{
			 TimerMixin.setTimeout( () => { 
              this.setState({loading:false});
            });
		}
		
	}

	render() {
		return (
                <View style={{flex:1,backgroundColor:"#ffff"}}>
					{this.state.loading && <Loading visible={this.state.loading} mini={true}/>}
					{!this.state.loading && <PincodePress pincode={this.state.pincode}  navigation={this.props.navigator} 
					isAuthen={true} titileTxt={I18n.t('EnterPassword')} onDonePress={this.onDonePress}/>}
					{!this.state.loading && <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"transparent"}}>
						<Text style={{marginTop:responsiveHeight(10),color:"#F7BC65"}}>
							{`V.0.1.0-R${Constans.version}`}
						</Text>
					</View>}
                </View>
				
		);
	}
}
