import {StyleSheet, Platform} from 'react-native';
import * as defaultStyle from '../../../style';
import {em} from '../../../../../constants/Layout'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default function styleConstructor(theme={}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    base: {
      width: responsiveWidth(7),
      height: responsiveHeight(6),
      alignItems: 'center'
    },
    text: {
      marginTop: responsiveHeight(1.5),
      fontSize: responsiveFontSize(1.7),
      fontFamily: appStyle.textDayFontFamily,
      fontWeight: '300',
      color: appStyle.dayTextColor,
      backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    alignedText: {
      marginTop: Platform.OS === 'android' ? 4 : 6
    },
    selected: {
      backgroundColor: appStyle.selectedDayBackgroundColor,
      borderRadius: responsiveHeight(4),
      height: responsiveHeight(4),
      marginTop:5
    },
    todayText: {
      color: appStyle.todayTextColor
    },
    selectedText: {
      marginTop:1.5,
      color: appStyle.selectedDayTextColor
    },
    disabledText: {
      color: appStyle.textDisabledColor
    },
    dot: {
      backgroundColor:'red',
      marginTop: -2,
      borderRadius: 2,
      opacity: 0,
      color:'#f58020',
      fontSize:responsiveFontSize(1),
      height:responsiveHeight(2)
    },
    visibleDot: {
      opacity: 1,
      backgroundColor: "transparent"
    },
    selectedDot: {
      marginTop: 5,
      color:'#ffff',
      backgroundColor: "transparent"
      
    }
  });
}
