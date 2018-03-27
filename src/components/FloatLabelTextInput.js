import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';
import { responsiveHeight } from 'react-native-responsive-dimensions';

class FloatingLabel extends Component {
  constructor(props) {
    super(props);

    let initialPadding = 9;
    let initialOpacity = 0;

    if (this.props.visible) {
      initialPadding = 5;
      initialOpacity = 1;
    }

    this.state = {
      paddingAnim: new Animated.Value(initialPadding),
      opacityAnim: new Animated.Value(initialOpacity)
    }
  }

  componentWillReceiveProps(newProps) {
    Animated.timing(this.state.paddingAnim, {
      toValue: newProps.visible ? 5 : 9,
      duration: 230
    }).start();

    return Animated.timing(this.state.opacityAnim, {
      toValue: newProps.visible ? 1 : 0,
      duration: 230
    }).start();
  }

  render() {
    return (
      <Animated.View style={[styles.floatingLabel, { paddingTop: this.state.paddingAnim, opacity: this.state.opacityAnim }]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

class TextFieldHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marginAnim: new Animated.Value(this.props.withValue ? 10 : 0)
    }
  }

  componentWillReceiveProps(newProps) {
    return Animated.timing(this.state.marginAnim, {
      toValue: newProps.withValue ? 5 : 0,
      duration: 230
    }).start();
  }

  render() {
    return (
      <Animated.View style={{ marginTop: this.state.marginAnim }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

class FloatLabelTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      text: this.props.value
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange (value) {
		this.props.onChangeText(this.props.name,value);
	}
  componentWillReceiveProps(newProps) {
    if (newProps.hasOwnProperty('value') && newProps.value !== this.state.text) {
      this.setState({ text: newProps.value })
    }
  }

  leftPadding() {
    return { width: this.props.leftPadding || 0 }
  }

  withBorder() {
    if (!this.props.noBorder) {
      return styles.withBorder;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={[styles.paddingView, this.leftPadding()]} />
          <View style={[styles.fieldContainer, this.withBorder()]}>
            <FloatingLabel visible={this.state.text}>
              <Text allowFontScaling={false}style={[styles.fieldLabel, this.labelStyle()]}>{this.placeholderValue()}</Text>
            </FloatingLabel>
            <TextFieldHolder withValue={this.state.text}>
              <TextInput {...this.props}
                name={this.props.name}
                ref='input'
                underlineColorAndroid="transparent"
                style={[styles.valueText]}
                defaultValue={this.props.defaultValue}
                value={this.props.value}
                maxLength={this.props.maxLength}
                onFocus={() => this.setFocus()}
                onBlur={() => this.unsetFocus()}
                onChangeText={this.onChange}
                placeholderTextColor="#b6b2b2"
                secureTextEntry={this.props.secureTextEntry}
                autoCorrect={this.props.autoCorrect}
                autoCapitalize={this.props.autoCapitalize}
                returnKeyType={this.props.returnKeyType}
                />
                <Icon style={styles.inlineImg}  name={this.props.icon} size={20}/>
            </TextFieldHolder>
          </View>
        </View>
      </View>
    );
  }

  inputRef() {
    return this.refs.input;
  }

  focus() {
    this.inputRef().focus();
  }

  blur() {
    this.inputRef().blur();
  }

  isFocused() {
    return this.inputRef().isFocused();
  }

  clear() {
    this.inputRef().clear();
  }

  setFocus() {
    this.setState({
      focused: true
    });
    try {
      return this.props.onFocus();
    } catch (_error) { }
  }

  unsetFocus() {
    this.setState({
      focused: false
    });
    try {
      return this.props.onBlur();
    } catch (_error) { }
  }

  labelStyle() {
    if (this.state.focused) {
      return styles.focused;
    }
  }

  placeholderValue() {
    if (this.state.text) {
      return this.props.placeholder;
    }
  }

  setText(value) {
    this.setState({
      text: value
    });
    try {
      return this.props.onChangeTextValue(value);
    } catch (_error) { }
  }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height:DEVICE_HEIGHT*0.08,
		width: DEVICE_WIDTH - 40,
		marginTop: 15,
		paddingLeft: 5
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  paddingView: {
    width: 15
  },
  floatingLabel: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  fieldLabel: {
    height: 15,
    fontSize: 12,
    color: '#ffff'
  },
  fieldContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative'
  },
  withBorder: {
    borderBottomWidth: 0.8,
    borderColor: '#C8C7CC',
  },
  valueText: {
    top:10,
    height: (Platform.OS == 'ios' ? 20 : 60),
    fontFamily: "Kanit",
    color: "#ffff",
    lineHeight: 1.2,
    fontSize:14
  },
  focused: {
    color: "#ffff"
  },
  inlineImg: {
    position:'absolute',
    marginTop:(Platform.OS == 'ios' ? responsiveHeight(1.2) : 30),
    justifyContent:'flex-end',
		marginLeft:DEVICE_WIDTH - 75,
		alignItems:'flex-end',
		zIndex: 99,
        color:"#ffff",
        backgroundColor:"transparent",
		width:50,
		height:50
	},
});

export default FloatLabelTextField;
