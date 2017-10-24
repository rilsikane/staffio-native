import {StyleSheet} from 'react-native';
import * as defaultStyle from '../style';
import {em} from '../../../constants/Layout'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default function getStyle(theme={}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    container: {
      paddingLeft: 5,
      paddingRight: 5,
      flex: 1,
      backgroundColor: appStyle.calendarBackground
    },
    week: {
      height:responsiveHeight(5.1),
      marginBottom: responsiveHeight(0.5),
      marginTop:responsiveHeight(1.1),
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
  });
}

