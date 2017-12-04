import React from 'react';
import { StyleSheet, View, Image,Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors'
import {em} from '../../constants/Layout'
import Spinner from 'react-native-loading-spinner-overlay';
var SpinnerKit = require('react-native-spinkit');
import * as Animatable from 'react-native-animatable';


export default class Loading extends React.Component {
    render() {
        if(!this.props.mini)
        return  ( <Spinner animation="fade" visible={this.props.visible} overlayColor="rgba(255, 255, 255, 1)" 
        >
          <View style={{flex:1,justifyContent:"center",alignItems:"center",marginTop:-50, backgroundColor:'transparent'}}>
            <SpinnerKit size={80} type={"WanderingCubes"} color="#f58020" />
            <Animatable.Text animation="tada" easing="ease-in" iterationCount="infinite" style={{ textAlign: 'center' }}>
                {this.props.text || "Loading..."}
            </Animatable.Text>
           </View>
        </Spinner>);
        else
        return (<View style={{flex:1,justifyContent:"center",alignItems:"center",marginTop:-50,backgroundColor:'transparent'}}>
            <SpinnerKit size={80} type={"WanderingCubes"} color="#f58020" />
            <Animatable.Text animation="tada" easing="ease-in" iterationCount="infinite" style={{ textAlign: 'center' }}>
                {this.props.text || "Loading..."}
            </Animatable.Text>
           </View>);
    }

}
const styles = StyleSheet.create({
  HeaderFont:{
    color:"#FFFF",
    fontFamily:"Kanit",
    fontSize:em(1.2),
    backgroundColor:'transparent'
  }
});