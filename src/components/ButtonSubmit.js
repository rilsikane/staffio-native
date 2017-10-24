import React, { Component} from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Animated,
	Easing,
	Image,
	Alert,
	View
} from 'react-native';
var Spinner = require('react-native-spinkit');


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;


export default class ButtonSubmit extends Component {
	constructor() {
		super();

		this.state = {
			isLoading: false,
		};

		this.buttonAnimated = new Animated.Value(0);
		this.growAnimated = new Animated.Value(0);
		this._onPress = this._onPress.bind(this);
	}

	async _onPress() {
		if (this.state.isLoading) return;

		this.setState({ isLoading: true });
		Animated.timing(
			this.buttonAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();

		// setTimeout(() => {
		// 	this._onGrow();
		// }, 2000);

        const result = await this.props.onPress();
        if(result==true){
            this.setState({ isLoading: false });
			this.buttonAnimated.setValue(0);
			this.growAnimated.setValue(0);
        }else{
            this.setState({ isLoading: false });
            this.buttonAnimated.setValue(0);
        }

	}
	

	_onGrow() {
		Animated.timing(
			this.growAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();
	}

	render() {
		const changeWidth = this.buttonAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [DEVICE_WIDTH - MARGIN, 0]
	  });
	  const changeScale = this.growAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [1, MARGIN]
	  });

		return (
			<View style={styles.container}>
				<Animated.View style={{width: changeWidth}}>
					<TouchableOpacity style={styles.button}
						onPress={this._onPress}
						activeOpacity={1} >
							{this.state.isLoading ?
								<Spinner style={{marginBottom:5,marginRight:5}} isVisible={true} size={45} type={"WanderingCubes"} color="#f58020"/>
								:
								<Text allowFontScaling={false}style={styles.text}>LOGIN</Text>
							}
                           
					</TouchableOpacity>
					{this.state.isLoading ?
					<Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />:null
					}
				</Animated.View>
                
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
        marginTop:10
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.7)',
		height: MARGIN,
		zIndex: 100,
	},
	circle: {
		height: 5,
		width: 5,
		marginTop: -MARGIN,
		borderWidth: 1,
		borderColor: 'transparent',
		alignSelf: 'center',
		zIndex: 99,
		backgroundColor: 'transparent',
	},
	text: {
		fontFamily: "Kanit",
		fontSize: 12.5,
		fontWeight: "500",
		letterSpacing: 0.31,
		color: "#ffffff"

	},
	image: {
		width: 24,
		height: 24,
	},
});
