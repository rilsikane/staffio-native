import { Dimensions,PixelRatio,Platform } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const window = {
    width:width,
    height:height,
};

// Precalculate Device Dimensions for better performance
export const x = Dimensions.get('window').width;
export const y = Dimensions.get('window').height;

// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1 ;
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1 ;

// We set our base font size value

let base_unit = 14;
// var val = PixelRatio.get();
// console.log(val);

// if(Platform.OS=="ios"){
//   switch( val ) {
//     case 2:
//       base_unit = 13.5;
//       break;
//     case 3:
//       base_unit = 14;
//       break;
//     default:
//       base_unit = 14;
//   }

// }
//  switch( val ) {
//     case 1:
//       base_unit = 10;
//       break;
//     case 1.5:
//       base_unit = 11;
//       break;
//     case 2:
//       base_unit = 12;
//       break;
//     case 3:
//       base_unit = 13;
//       break;
//      case 4:
//       base_unit = 14;
//       break;
//       case 5:
//       base_unit = 15;
//       break;
//     default:
//       base_unit = 16;
//   } 

// We're simulating EM by changing font size according to Ratio
const unit = base_unit * ratioX;

// We add an em() shortcut function 
export function em(value) {
  return PixelRatio.roundToNearestPixel(base_unit * value);
}
export function round(value) {
  return PixelRatio.roundToNearestPixel(value);
}
