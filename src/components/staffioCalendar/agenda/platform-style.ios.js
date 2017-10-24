import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export default function platformStyles(appStyle) {
  return {
    knob: {
      width: responsiveWidth(2),
      height: responsiveHeight(1),
      marginTop: responsiveHeight(1.2),
      borderRadius: 3,
      backgroundColor: '#f58020'
    },
    weekdays: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: responsiveHeight(3.5),
      paddingBottom: 7,
      backgroundColor: "#f58020",
      shadowOpacity: 0.75,
      shadowRadius: 3,
      shadowColor: '#000',
      shadowOffset: { height: 0, width: 0 }
    },
  };
}
