import React, { Component} from 'react';
import {View,Keyboard,TouchableWithoutFeedback,Text} from 'react-native';
import PincodePress from '../components/pincode/PincodePress';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { NavigationActions } from'react-navigation';
import I18n from '../utils/i18n';

@inject('userStore')
@observer
export default class PincodeScreen extends Component {
	
	constructor(props) {
      super(props);
      this.onDonePress = this.onDonePress.bind(this);
      
 	}
	 
	onDonePress(pincode) {
		this.props.userStore.pincode = pincode;
		this.props.navigator.push({
			screen: 'staffio.ConfirmPincodeScreen', // unique ID registered with Navigation.registerScreen
			title: undefined, // navigation bar title of the pushed screen (optional)
			titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
			passProps: {}, // Object that will be passed as props to the pushed screen (optional)
			animated: false, // does the push have transition animation or does it happen immediately (optional)
			backButtonTitle: undefined, // override the back button title (optional)
			backButtonHidden: false, // hide the back button altogether (optional)
		});
		
	}

	render() {
		return (
                <View style={{flex:1,backgroundColor:"#ffff"}}>
                    <PincodePress  titileTxt={I18n.t('SetPass')} onDonePress={this.onDonePress}/>
                </View>
				
		);
	}
}
