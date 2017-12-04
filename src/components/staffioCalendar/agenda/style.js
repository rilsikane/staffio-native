import {StyleSheet} from 'react-native';
import * as defaultStyle from '../style';
import platformStyles from './platform-style';
import {em} from '../../../constants/Layout';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export default function styleConstructor(theme = {}) {
  const appStyle = {...defaultStyle, ...theme};
  const { knob, weekdays } = platformStyles(appStyle);
  return StyleSheet.create({
    knob,
    weekdays,
    header: {
      overflow: 'hidden',
      justifyContent: 'flex-end',
      position:'absolute',
      height:'100%',
      width:'100%',
    },
    calendar: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: appStyle.separatorColor
    },
    knobContainer: {
      flex: 1,
      position: 'absolute',
      left: 0,
      right: 0,
      height: 12,
      bottom: 0,
      zIndex:9999,
      alignItems: 'center',
      backgroundColor: "transparent",
      justifyContent:"flex-end",
      marginTop:5
    },
    weekday: {
      width: responsiveWidth(6),
      textAlign: 'center',
      fontSize: responsiveFontSize(1.7),
      color: "#ffff",
      fontFamily:'Kanit',
      backgroundColor:"transparent"
    },
    reservations: {
      flex: 1,
      marginTop: responsiveHeight(13),
      backgroundColor: appStyle.backgroundColor
    },
  });
}
