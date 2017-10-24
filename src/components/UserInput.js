import React, { Component} from 'react';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Item, Input, Label } from 'native-base';
import {
	StyleSheet,
	View,
	TextInput,
	Image,
} from 'react-native';
import FloatLabelTextInput from './FloatLabelTextInput';


export default class UserInput extends Component {
	constructor (props) {
		super(props)
		this.onChange = this.onChange.bind(this)
	}
	onChange (value) {
		this.props.onChangeText(this.props.name,value);
	}

	render() {
		return (
			<View style={styles.inputWrapper}>
					{/*<Item floatingLabel>
						<Label style={{color: '#ffff',fontSize:12}}>{this.props.placeholder}</Label>
						<Input style={styles.inputStyle}
						secureTextEntry={this.props.secureTextEntry}
						autoCorrect={this.props.autoCorrect}
						autoCapitalize={this.props.autoCapitalize}
						returnKeyType={this.props.returnKeyType}
						onChangeText={this.onChange}
						underlineColorAndroid='transparent' 
						name={this.props.name}
						value={this.props.value} />
					</Item>
					<Icon  name={this.props.icon} style={styles.inlineImg} size={20}/>*/}
					 <FloatLabelTextInput style={{backgroundColor:'transparent'}}
						placeholder={this.props.placeholder} icon={this.props.icon} 
						secureTextEntry={this.props.secureTextEntry}
						autoCorrect={this.props.autoCorrect}
						autoCapitalize={this.props.autoCapitalize}
						returnKeyType={this.props.returnKeyType}
						onChangeText={this.onChange} name={this.props.name}
						value={this.props.value}
						/>
			</View>
		);
	}
}


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	labelInput :{
		color: '#ffff',
		fontSize:12,
		paddingTop:15
	},
	inputStyle: {
		color: '#ffff',
		lineHeight:20,
		paddingTop:15
	},
	inputWrapper: {
        height:DEVICE_HEIGHT*0.08,
		width: DEVICE_WIDTH - 40,
		marginTop: 15,
		paddingLeft: 5,
		
	},

});
