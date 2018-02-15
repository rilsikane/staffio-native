
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Button } from 'native-base';
import I18n from '../../utils/i18n';

export default class Modal extends Component {
  constructor(props){
    super(props);
    this.cancelPress = this.cancelPress.bind(this);
    this.okPress = this.okPress.bind(this);
  }
  cancelPress(){
    this.props.cancel();
  }
  okPress(){
    this.props.ok();
  }
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={{fontSize: responsiveFontSize(2.5),fontFamily:'Kanit-Regular',color:'#fbaa3e'}}>{this.props.title}</Text> 
            </View>
            <View style={styles.content}>
              {this.props.children}
            </View>
            <View style={styles.bottom}>
              <View style={styles.buttonContent}>
                <Button transparent  onPress={this.okPress}>
                  <Text style={styles.buttonstyle}>{I18n.t('OkModal')}</Text>
                </Button>
              </View>
              {this.props.cancel && <View style={styles.buttonContent}>
                <Button transparent onPress={this.cancelPress}>
                  <Text style={styles.buttonstyle}>{I18n.t('CancelModal')}</Text>
                </Button>
              </View>}
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: responsiveWidth(3),
    backgroundColor:"#FFF"
  },
  header: {
    height: responsiveHeight(7),
    borderBottomWidth: responsiveWidth(0.2),
    justifyContent: 'center',
    marginLeft: responsiveWidth(6),
    marginRight: responsiveWidth(6),
    marginTop: responsiveWidth(2),
    marginBottom: responsiveWidth(2),
    borderColor: 'gray',
    width:responsiveWidth(70)
  },
  content: {
    marginLeft: responsiveWidth(6),
    marginRight: responsiveWidth(6),
    marginTop: responsiveHeight(2),
    
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: responsiveWidth(5)
  },
  buttonContent: {
    marginLeft: responsiveWidth(10),
    marginTop: responsiveWidth(2)
  },
  buttonstyle: {
    fontSize: responsiveFontSize(2.5),
    fontFamily:'Kanit-Regular',
    color:'#fbaa3e'
  }
  
});
