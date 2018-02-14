import React from "react-native";
import Dimensions from 'Dimensions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

// Precalculate Device Dimensions for better performance
const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1 ;
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1 ;

// We set our base font size value
const base_unit = 16;

// We're simulating EM by changing font size according to Ratio
const unit = base_unit * ratioX;

// We add an em() shortcut function 
function em(value) {
  return unit * value;
}
export default  styles = {
  textHeader:{
     fontFamily:'Kanit',
     fontSize: responsiveFontSize(3),
     color: "#ffff",
     backgroundColor:"transparent"
  },
  pinCodeContainer:{
    backgroundColor:"#FCBA66"
  },
  rowStyle: {
    marginTop:responsiveHeight(13),
    
  },
  colStyle :{
    alignItems: 'center',
  },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewHeader:{
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(30),
    backgroundColor:'transparent',
    backgroundColor:"#FCAB3F"
  },
  textStyle: {
    fontFamily: "Kanit",
    fontSize: responsiveFontSize(4),
    color: "#ffff",
    backgroundColor:'transparent',
    textAlign: 'center'
  },
  textCaptionStyle:{
    width: responsiveWidth(10),
    fontFamily: "Kanit",
    fontSize: responsiveFontSize(3),
    backgroundColor:'transparent',
    color: "#ffff",
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginLeft:responsiveWidth(3)
   
  },
  iconStyle:{
    width: responsiveWidth(10),
    fontFamily: "Kanit",
    fontSize: responsiveFontSize(3),
    backgroundColor:'transparent',
    color: "#ffff",
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginLeft:responsiveWidth(5)
   
  },
  iconStyleTouch:{
    width: responsiveWidth(10),
    fontFamily: "Kanit",
    fontSize:responsiveFontSize(5.5),
    backgroundColor:'transparent',
    color: "#fff",
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginLeft:responsiveWidth(0)
   
  },
  buttonView:{
    // borderRadius:responsiveWidth(18/2),
    marginRight: 0,
    marginLeft: 0,
    height: responsiveHeight(10),
    width: responsiveWidth(18),
    backgroundColor: "#FCBA66",
    borderColor:"#FCBA66",
    // borderBottomWidth: 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.6,
    // shadowRadius: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  TextPut:{
    //backgroundColor:"red",
    marginLeft: responsiveWidth(1),
    fontSize: responsiveFontSize(3.3),
    // height: em(2.8),
    width: responsiveFontSize(4),
    color:"#ffff",
    justifyContent:'center',
    alignItems:'center'
  },
  passText:{
      flex:0,
      flexDirection: 'row',
      borderColor:"#FCAB3F",
      borderBottomWidth:2,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#FCAB3F"
      
  },
  gridStyles:{
    flex:0,
    marginTop:responsiveHeight(2),
    marginLeft:responsiveWidth(10),
    backgroundColor:"#FCBA66",
    justifyContent:'center',
    alignItems:'center'
  },
  thumbnailStyle: {
    marginTop: responsiveHeight(4),
    marginBottom: responsiveHeight(5),
    height: responsiveHeight(18),
    width: responsiveWidth(33),
  }
};