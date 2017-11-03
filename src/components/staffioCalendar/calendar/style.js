import {StyleSheet} from 'react-native';
import * as defaultStyle from '../style';
import {em} from '../../../constants/Layout'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import DeviceInfo from 'react-native-device-info';

export default function getStyle(theme={}) {
  const model = DeviceInfo.getDeviceId();
  const marginTop = model.indexOf("iPhone5")>=0 ? 2:1.1
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
      marginTop:responsiveHeight(marginTop),
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
  });
}

