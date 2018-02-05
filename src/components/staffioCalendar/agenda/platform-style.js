// export default function platformStyles(appStyle) {
//   return {
//     knob: {
//       width: 38,
//       height: 7,
//       marginTop: 10,
//       borderRadius: 3,
//       backgroundColor: appStyle.agendaKnobColor
//     },
//     weekdays: {
//       position: 'absolute',
//       left: 0,
//       right: 0,
//       top: 0,
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       paddingTop: 15,
//       paddingBottom: 7,
//       backgroundColor: "#f58020"
//     },
//   };
// }
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export default function platformStyles(appStyle) {
  return {
    knob: {
      width: responsiveWidth(2),
      height: 7,
      marginTop: 15,
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
      paddingTop: responsiveHeight(0.5),
      paddingBottom: responsiveHeight(1.1),
      backgroundColor: "#754C36",
      shadowOpacity: 0.75,
      shadowRadius: 3,
      shadowColor: '#000',
      shadowOffset: { height: 0, width: 0 }
    },
  };
}
