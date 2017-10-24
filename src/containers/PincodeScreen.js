import React, { Component} from 'react';
import {View,Keyboard,TouchableWithoutFeedback,Text} from 'react-native';
import PincodePress from '../components/pincode/PincodePress';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { NavigationActions } from'react-navigation';
@inject('userStore')
@observer
export default class PincodeScreen extends Component {
	
	constructor(props) {
      super(props);
      this.onDonePress = this.onDonePress.bind(this);
      
 	}
	 
	onDonePress(pincode) {
		this.props.userStore.pincode = pincode;
		const navigateAction = NavigationActions.navigate({
		routeName: 'ConfirmPincode'
		})
		this.props.navigation.dispatch(navigateAction);
		// const resetAction = NavigationActions.reset({
		// index: 0,
		// actions: [ฝนฝ
		// 	NavigationActions.navigate({ routeName: 'ConfirmPincode'})
		// ]
		// })
		// this.props.navigation.dispatch(resetAction)
	}

	render() {
		return (
                <View style={{flex:1,backgroundColor:"#ffff"}}>
                    <PincodePress  titileTxt="ตั้งรหัสผ่าน" onDonePress={this.onDonePress}/>
                </View>
				
		);
	}
}
