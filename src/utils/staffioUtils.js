import moment from 'moment';
import localization from 'moment/locale/th'
import I18n from './i18n'
import {BackHandler,Platform} from 'react-native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import store from 'react-native-simple-store';
import app  from '../stores/app';

var dateFormat = require('dateformat');
var localeTmp = 'en';

store.get('locale')
.then((res) =>
  {localeTmp = res;}
)

export function convertDate(tmpDate) {

    return dateFormat(tmpDate,"dd/mm/yyyy");
}
export function convertByFormatShort(tmpDate,format) {
  store.get('locale')
  .then((res) =>
    {localeTmp = res;}
  )
   let dayMonth = moment(tmpDate).locale(localeTmp, localization).format(format);
   let year = moment(tmpDate).locale(localeTmp, localization).format("YYYY");
  // return dateFormat(tmpDate,format);
  return dayMonth+((parseInt(year)+(localeTmp=='th'? 543:0))+"").substr(2,4);
}
export function convertByFormat(tmpDate,format) {
    store.get('locale')
    .then((res) =>
      {localeTmp = res;}
    )
     let dayMonth = moment(tmpDate).locale(localeTmp, localization).format(format);
     let year = moment(tmpDate).locale(localeTmp, localization).format("YYYY");
    // return dateFormat(tmpDate,format);
    return dayMonth+(parseInt(year)+(localeTmp=='th'? 543:0));
}
export function convertPunch(tmpDate) {
    localeTmp = app.locale;
     let day = moment(tmpDate).locale(localeTmp, localization).format("dd");
     let date = moment(tmpDate).locale(localeTmp, localization).format("DD");
     let month = moment(tmpDate).locale(localeTmp, localization).format("MMM");
     let year = parseInt(moment(tmpDate).locale(localeTmp, localization).format("YYYY"))+(localeTmp=='th'?543:0)
    // return dateFormat(tmpDate,format);
    return day+" "+month+" "+date+" "+year;
}
export function convertForTag(tmpDate,format) {
    store.get('locale')
    .then((res) =>
      {localeTmp = res;}
    )
     let dayMonth = moment(tmpDate).locale(localeTmp, localization).format(format);
     let year = moment(tmpDate).locale(localeTmp, localization).format("YYYY");
    // return dateFormat(tmpDate,format);
    return dayMonth+((parseInt(year)+(localeTmp=='th'?543:0))+"").substr(2,2);
}
export function convertDateThai(strDate) {
    moment.locale('th');
    return moment(strDate.split("+")[0]).format('dd MMMM yyyy');
}
export function convertDateDB(time){
   return moment(time).format();
}
export function getyear() {
    var year = Date("YYYY");
        year =  year.substring(11,15)
         year = parseInt(year)
         year = year + (localeTmp=='th'? 543 :0)
        return year
  }
  

export function getmonth(){
    var date = new Date();
    var month = date.getMonth();
    var month =  month + 1
    if(month == 1){
      return localeTmp=='th'?'มกราคม':'January'
    }else if (month == 2){
      return localeTmp=='th'?'กุมภาพันธ์':'February'
    }else if (month == 3){
      return localeTmp=='th'?'มีนาคม':'March'
    }else if (month == 4){
      return localeTmp=='th'?'เมษายน':'April'
    }else if (month == 5){
      return localeTmp=='th'?'พฤษภาคม':'May'
    }else if (month == 6){
      return localeTmp=='th'?'มิถุนายน':'June'
    }else if (month == 7){
      return localeTmp=='th'?'กรกฏาคม':'July'
    }else if (month == 8){
      return  localeTmp=='th'?'สิงหาคม':'August'
    }else if (month == 9){
      return  localeTmp=='th'?'กันยายน':'September'
    }else if (month == 10){
      return  localeTmp=='th'?'ตุลาคม':'October'
    }else if (month == 11){
      return  localeTmp=='th'? 'พฤศจิกายน':'November'
    }else if (month == 12){
      return  localeTmp=='th'?'ธันวาคม':'December'
    }
  }
export const styleConfirmModal = {
  backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
  backgroundColor: "rgba(0,0,0,0.6)", // tint color for the background, you can specify alpha here (optional)
  height:responsiveHeight(70),
  width:responsiveWidth(90)
}
export const styleInputModal ={
  backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
  backgroundColor: "rgba(0,0,0,0.6)", // tint color for the background, you can specify alpha here (optional)
  height:responsiveHeight(70),
  width:responsiveWidth(90)
}
export function getConfirmModal(okFunc,cancelFunc,Data,navigators){
  navigators.showLightBox({
    screen: "staffio.ConfirmModalScreen", // unique ID registered with Navigation.registerScreen
    passProps: {title:`${I18n.t('ConfirmApprove')} : ${Data.type}`,msg: `${I18n.t('approveLeave')}`
    ,msg2: `${Data.name}` ,cancel:(cancelFunc,navigators)=> this.cancelModal
    ,ok:okModal(okFunc,navigators),data:Data}, // simple serializable object that will pass as props to the lightbox (optional)
    style: {
      backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
      backgroundColor: "rgba(0,0,0,0.6)", // tint color for the background, you can specify alpha here (optional)
    },
    adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
   });
}

export function getInputModal(Title,okFunc,cancelFunc,Data,AdjustSoftInput,navigators){
  navigators.showLightBox({
    screen: "staffio.InputModalScreen", // unique ID registered with Navigation.registerScreen
    passProps: {title:`${Title} : ${Data.type}`,remark:`${I18n.t('Cause')}`
    ,cancel:cancelModal(cancelFunc,navigators),placeholder:`${I18n.t('SpecifyCause')}`
    ,ok:okModal(okFunc,navigators),data:Data}, // simple serializable object that will pass as props to the lightbox (optional)
    style: {
      backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
      backgroundColor: "rgba(0,0,0,0.6)", // tint color for the background, you can specify alpha here (optional)
      height:responsiveHeight(70),
      width:responsiveWidth(90)
    },
    adjustSoftInput: AdjustSoftInput, // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
   });
}

function cancelModal(func,navi){
  if(func){
    func();
  }
  navi.dismissLightBox();    
}
function okModal(func,navi){
  if(func){
    func();
  }
  navi.dismissLightBox();    
}

export function disbackButton(){
  if(Platform.OS=='android'){
    BackHandler.addEventListener('hardwareBackPress', function() {
    return true;
  });
}
}