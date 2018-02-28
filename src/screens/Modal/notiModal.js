
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
import NotificationCard from '../../components/NotificationCard'

export default class NotiModal extends Component {
  constructor(props){
    super(props);
  }



  render() {
    return (
       <View style={{flex:1,marginTop:10}}>
            <NotificationCard />
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
 
  
});
