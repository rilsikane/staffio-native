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

export default styles={
  workShiftContainerStyle:{
      flexDirection: 'row',
      paddingTop: 3,
      paddingBottom: 3,
      marginLeft:5,
      marginRight:5,
      backgroundColor:  "rgba(109, 110, 113, 1)",
      opacity:0.8,
      marginTop:responsiveHeight(1)
  },
  RowStyle1:{
     borderRightWidth: 1,
     borderColor:'#dcdcdc',
  },
  RowStyle2:{
    borderTopWidth:1,
    borderColor:'#dcdcdc',
    marginRight:10,
    marginLeft:5,
    marginTop:10,
    zIndex:999
  },
  RowStyle3:{
    borderTopWidth:1,
    borderColor:'#dcdcdc',
    marginRight:10,
    marginLeft:10
  },
  TextDateStyle1:{
    fontFamily:"Kanit",
    fontSize:em(1.1),
    color:'#ffff',
    zIndex:999
  },
  TextDateStyle2:{
    marginTop:-16,
    fontFamily:"Kanit",  
    fontSize:em(3),
    color:'#f58020',
    
  },
  TextDateStyle3:{
    fontFamily:"Kanit",
    fontSize:em(1.2),
    color:'#f58020',
    marginTop:-18,
  },
  TextDateStyle4:{
    fontFamily:"Kanit",
    fontSize:em(1.2),
    color:'#ffff',
  },
  TextNameStyle1:{
    fontFamily:"Kanit",
    fontSize:em(1.2),
    marginTop : 1,
    marginLeft:5,
    color:'#ffff',
    
  },
  TextNameStyle1EN:{
    fontFamily:"Kanit",
    fontSize:em(1),
    marginTop : 1,
    marginLeft:5,
    color:'#ffff',
    
  },
  TextNameStyle2:{
    fontFamily:"Kanit",
    fontSize:em(0.8),
    color:'#ffff',
    marginLeft:5
    
  },
  TextDateTimeStyle:{
    fontFamily:"Kanit",
    fontSize:em(2),
    color:'#ffff',
    marginLeft:10,
    width:em(6)
  },
  TextTimeLateStyle:{
    fontFamily:"Kanit",
    fontSize:em(2),
    color:'red',
    marginLeft:10,
    width:em(6)
  },
  TextDateTimeCountStyle:{
    fontFamily:"Kanit",
    fontSize:em(2),
    color:'#d6d6d6',
    marginLeft:10,
    width:em(6)
  },
   TextDateTimeStyleNotValid:{
    fontFamily:"Kanit",
    fontSize:em(1),
    color:'red',
    marginLeft:10,
    paddingTop:10,
    width:em(6)
  },TextDateTimeHoliday:{
    fontFamily:"Kanit",
    fontSize:em(1),
    color:'#ffff',
    paddingTop:10,
    width:em(10)
  },
  TextTimeStyle1:{
    fontFamily:"Kanit",  
    fontSize:em(1.2),
    marginLeft:25,
    color:'#f58020',
    
  },
  TextTimeStyle2:{
     fontFamily:"Kanit",
    fontSize:em(0.8),
    marginLeft:26,
    color:'#ffff',
    
  },
  TextTimeStyle3:{
    width:em(5),
    fontFamily:"Kanit",
    fontSize:em(1.2),
    marginLeft:40,
    color:'#f58020',
    
  },
  TextTimeStyle4:{
     fontFamily:"Kanit",
    fontSize:em(0.8),
    marginLeft:41,
    color:'#ffff',
    width:em(5)
    
  },
  TextTimeStyle5:{
    marginTop:-5,
    fontFamily:"Kanit",
    fontSize:em(1.5),
    marginLeft:em(2),
    color:'#ffff',
    backgroundColor:"transparent"
    
  },
  TextTimeStyle6:{
     fontFamily:"Kanit",
    fontSize:em(0.8),
    marginLeft:em(2),
    color:'#ffff',
    
  },
  TextColor1:{
    marginTop:2,
    fontFamily:"Kanit",
    fontSize:em(0.8),
    color:'#ffff',
    
  },
  TextColor2:{
     fontFamily:"Kanit",
    fontSize:em(1),
    color:'#f58020',
    
  },
  bodyImage:{
    height: responsiveWidth(13.5),
    width: responsiveWidth(13.5),
    marginTop : responsiveHeight(1),
    marginLeft:responsiveWidth(1.5),
    borderRadius:responsiveWidth(13.5/2)

  },
  gridStyle:{
     backgroundColor:"transparent",
     height:em(12)
  }
}