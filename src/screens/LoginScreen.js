import React, { Component} from 'react';
import {View,Keyboard,TouchableWithoutFeedback,Text} from 'react-native';
import Logo from '../components/login/Logo';
 import LoginForm from '../components/login/LoginForm';
import Wallpaper from '../components/Wallpaper';
 import ButtonSubmit from '../components/ButtonSubmit';
 import SignupSection from '../components/login/SignupSection';

import bgSrc from '../../img/background.jpg';
export default class LoginScreen extends Component {
	

	

	render() {
		const dismissKeyboard = require('dismissKeyboard');
		return (
			 <TouchableWithoutFeedback 
                onPress={dismissKeyboard}>
					<View style={{flex:1}}>
					<Wallpaper bgSrc={bgSrc}>
						<Logo />
						<LoginForm navigator={this.props.navigator}/>
						{/*<SignupSection/>*/}
					</Wallpaper>
					</View>
				</TouchableWithoutFeedback>
				
		);
	}
}
