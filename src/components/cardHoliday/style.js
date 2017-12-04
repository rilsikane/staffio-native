import React from "react-native";
import Dimensions from 'Dimensions';

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
     fontSize: em(1.2),
     color: "#545254",
     backgroundColor:"transparent"
  },
  pinCodeContainer:{
    backgroundColor:"#ffff"
  },
  rowStyle: {
    marginTop:em(7)
  },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewHeader:{
    justifyContent: 'center',
    alignItems: 'center',
    height: em(4.5),
  },
  textStyle: {
    fontFamily: "Kanit",
    fontSize: em(2.5),
    color: "#f58020",
    backgroundColor:'transparent',
    textAlign: 'center',
     marginLeft:em(0.5)
  },
  textCaptionStyle:{
    width: em(2),
    fontFamily: "Kanit",
    fontSize: em(1.25),
    backgroundColor:'transparent',
    color: "#f58020",
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginLeft:em(0.2)
   
  },
  iconStyle:{
    width: em(2),
    fontFamily: "Kanit",
    fontSize: em(1.5),
    backgroundColor:'transparent',
    color: "#f58020",
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginLeft:em(0.4)
   
  },
  iconStyleTouch:{
    width: em(2),
    fontFamily: "Kanit",
    fontSize: em(1.8),
    backgroundColor:'transparent',
    color: "#f58020",
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginLeft:em(0.4)
   
  },
  buttonView:{
    borderRadius: em(3.5),
    marginRight: 0,
    marginLeft: 0,
    height: em(4.5),
    width: em(4.5),
    backgroundColor: "#f1f2f2",
    borderColor:"#f1f2f2",
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
  },
  TextPut:{
    //backgroundColor:"red",
    marginLeft: em(0.7),
    fontSize: em(2.5),
    // height: em(2.8),
    width: em(2.2),
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
    marginTop:em(3),
    marginLeft:em(3.5),
    backgroundColor:"#ffff"
  }
};