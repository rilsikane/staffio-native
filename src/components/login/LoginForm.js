import React, { Component} from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	KeyboardAvoidingView,
	View,
	ActivityIndicator,
	TouchableOpacity,
	Image,Keyboard,
	TouchableWithoutFeedback,
    Alert
} from 'react-native';

import UserInput from '../UserInput';

// import usernameImg from '../../assets/images/username.png';
// import passwordImg from '../../assets/images/password.png';
// import eyeImg  from '../../assets/images/eye_black.png';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonSubmit from '../ButtonSubmit';
import axios from 'axios';
import FloatLabelTextInput from '../FloatLabelTextInput';
import { NavigationActions } from'react-navigation';
import store from 'react-native-simple-store';
import {authen} from '../../api';
import Constans from '../../constants/Constants';

@inject('userStore')
@observer
export default class LoginForm extends Component {
	constructor(props) {
    super(props);
    this.state = {
			showPass: true,
			press: false,
		};
		this.showPass = this.showPass.bind(this);
		this.updateProperty = this.updateProperty.bind(this);
        this.onPress = this.onPress.bind(this);
		
	}

	showPass() {
        this.state.press === false ? this.setState({ showPass: false, press: true }) :this.setState({ showPass: true, press: false });
    }
	
	updateProperty (key, value) {
    	this.props.userStore.userLogin[key] = value
	}
    async onPress() {

		let user = {};
		user.user_name = this.props.userStore.userLogin.username;
      	user.password = this.props.userStore.userLogin.password;
		user.tokenType = "M";
		user.version = Constans.version;
		const response = await authen("checkLogin", user);
		if(response){
			 this.saveUser(response.data.userProfile);
                const resetAction = NavigationActions.navigate({
				routeName: 'Pincode'
				})
			this.props.navigation.dispatch(resetAction)
		}
		
	}
	saveUser = async (data) => {
		try {
			const deviceId = await store.get("DEVICEID");
			data.deviceId = deviceId;
			data.USER_NAME =  this.props.userStore.userLogin.username;
			await store.save('USER',data);
		}catch(ex){
			console.error(ex)
		}
	}
	
	render() {
		return (
			
			<KeyboardAvoidingView behavior='padding'
				style={styles.container}>
					<FloatLabelTextInput
                        icon='user' 
						placeholder='Username'
						autoCapitalize={'none'}
						returnKeyType={'done'}
						autoCorrect={false}  
						onChangeText={this.updateProperty} name="username" value={this.props.userStore.userLogin.username}/>
						
					<FloatLabelTextInput
                        icon='lock' 
						secureTextEntry={this.state.showPass}
						placeholder='Password'
						returnKeyType={'done'}
						autoCapitalize={'none'}
						autoCorrect={false}
						onChangeText={this.updateProperty} name="password" value={this.props.userStore.userLogin.password}/>
						{/*<TouchableOpacity
							activeOpacity={0.7}
							style={styles.btnEye}
							onPress={this.showPass}
						>
							<Icon
                                name="eye"
                                size={28}
                                style={styles.iconEye}
                            />
						</TouchableOpacity>*/}
                        <View style={{marginTop:2,flex:1}}>
						<ButtonSubmit onPress={this.onPress}/>
                        </View>
				</KeyboardAvoidingView>
			
		);
	}
}
 
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
  iconEye: {
     backgroundColor:"transparent",
     color:"rgba(0,0,0,0.2)",
    // width: 25,
    // height: 25,
    // tintColor: 'rgba(0,0,0,0.2)',
  },
});
