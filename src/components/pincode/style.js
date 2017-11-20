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
     color: "#545254"
  },
  pinCodeContainer:{
    backgroundColor:"#ffff"
  },
  rowStyle: {
    marginTop:responsiveHeight(15),
    
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
    height: responsiveHeight(10),
  },
  textStyle: {
    fontFamily: "Kanit",
    fontSize: responsiveFontSize(4),
    color: "#f58020",
    backgroundColor:'transparent',
    textAlign: 'center'
  },
  textCaptionStyle:{
    width: responsiveWidth(10),
    fontFamily: "Kanit",
    fontSize: responsiveFontSize(3),
    backgroundColor:'transparent',
    color: "#f58020",
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginLeft:responsiveWidth(3)
   
  },
  iconStyle:{
    width: responsiveWidth(10),
    fontFamily: "Kanit",
    fontSize: responsiveFontSize(3),
    backgroundColor:'transparent',
    color: "#f58020",
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginLeft:responsiveWidth(5)
   
  },
  iconStyleTouch:{
    width: responsiveWidth(10),
    fontFamily: "Kanit",
    fontSize:responsiveFontSize(3),
    backgroundColor:'transparent',
    color: "#f58020",
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginLeft:responsiveWidth(5)
   
  },
  buttonView:{
    borderRadius:responsiveWidth(18/2),
    marginRight: 0,
    marginLeft: 0,
    height: responsiveHeight(10),
    width: responsiveWidth(18),
    backgroundColor: "#f1f2f2",
    borderColor:"#f1f2f2",
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  TextPut:{
    //backgroundColor:"red",
    marginLeft: responsiveWidth(1),
    fontSize: responsiveFontSize(5),
    // height: em(2.8),
    width: responsiveWidth(10),
    color:"#f58020",
    justifyContent:'center',
    alignItems:'center'
  },
  passText:{
      flex:0,
      flexDirection: 'row',
      borderColor:"#f58020",
      borderBottomWidth:2,
     justifyContent:'center',
     alignItems:'center'
      
  },
  gridStyles:{
    flex:0,
    marginTop:responsiveHeight(7),
    marginLeft:responsiveWidth(15),
    backgroundColor:"#ffff",
    justifyContent:'center',
    alignItems:'center'

  }
};