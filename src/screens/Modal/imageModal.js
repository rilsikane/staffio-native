
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,Image,Platform
} from 'react-native';
import { Header,Left, Right, Button,Body,Title}  from 'native-base';
import Colors from '../../constants/Colors'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ImageModal extends Component {
  constructor(props){
    super(props);
    this.cancelPress = this.cancelPress.bind(this);
    this.state = {remark:"",error:false};
  }
  cancelPress(){
    this.props.navigator.dismissModal({
      animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }


  render() {
    return (
      <View style={styles.container}>
            <View style={{backgroundColor:Colors.baseColor,height:responsiveHeight(10),width:responsiveWidth(100)}}>
                {/* <Button style={{backgroundColor:"transparent",flexDirection:"column",flex:1,justifyContent:"flex-end"}} transparent onPress={()=>this.props.next()}>
                  {!this.props.titleNext ? <Icon style={styles.HeaderRightIcon} name='chevron-right'/>
                  : <Text style={styles.HeaderFontRight}>{this.props.titleNext}</Text>}
              </Button> */}
                <View style={{justifyContent:"flex-end",flex:1,flexDirection:"row"}}>
                  <Button style={{backgroundColor:"transparent",flexDirection:"column",flex:1,justifyContent:"flex-end",alignItems:"flex-end"}} transparent onPress={()=>this.cancelPress()}>
                    <Icon style={styles.HeaderRightIcon} name='times'/>
                  </Button>
                </View>
            </View>
            <View style={styles.content}>
              <Image source={{uri:this.props.imgUri}} style={{width: responsiveWidth(100),height:responsiveHeight(90)}} />
            </View>
          
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  HeaderFont:{
    color:"#FFFF",
    fontFamily:"Kanit",
    fontSize:responsiveFontSize(3),
    backgroundColor:'transparent',
    fontWeight:'400',
    flex:1,
    justifyContent:'center',alignItems:'center',alignContent:'center',
  },
  HeaderIcon:{
    color:"#FFFF",
    fontFamily:"Kanit",
    fontSize:responsiveFontSize(3),
    backgroundColor:'transparent',
    fontWeight:'400',
    flex:1,
    justifyContent:'center',alignItems:'center',alignContent:'center',
    marginTop: Platform.OS === 'android' ? 1 : 5,
  },
  HeaderRightIcon:{
    color:"#FFFF",
    fontFamily:"Kanit",
    fontSize:responsiveFontSize(4),
    backgroundColor:'transparent',
    fontWeight:'400',
    flex:1,
    justifyContent:'center',alignItems:'center',alignContent:'center',
    marginTop: Platform.OS === 'android' ? 1 : 8,
    paddingRight:10
  },
  HeaderFontRight:{
    color:"#FFFF",
    fontFamily:"Kanit",
    fontSize:responsiveFontSize(2.4),
    backgroundColor:'transparent',
    fontWeight:'400',
    flex:1,
    justifyContent:'center',alignItems:'center',alignContent:'center',
    marginTop:5,
    marginLeft:responsiveWidth(4)
  }
  
});
