import moment from 'moment';
import localization from 'moment/locale/th'
import I18n from './i18n'
import {BackHandler,Platform} from 'react-native'

var dateFormat = require('dateformat');

export function convertDate(tmpDate) {

    return dateFormat(tmpDate,"dd/mm/yyyy");
}
export function convertByFormat(tmpDate,format) {
     let dayMonth = moment(tmpDate).locale("th", localization).format(format);
     let year = moment(tmpDate).locale("th", localization).format("YYYY");
    // return dateFormat(tmpDate,format);
    return dayMonth+(parseInt(year)+543);
}
export function convertPunch(tmpDate) {
     let day = moment(tmpDate).locale("th", localization).format("dd");
     let date = moment(tmpDate).locale("th", localization).format("DD");
     let month = moment(tmpDate).locale("th", localization).format("MMM");
     let year = parseInt(moment(tmpDate).locale("th", localization).format("YYYY"))+543
    // return dateFormat(tmpDate,format);
    return day+" "+month+" "+date+" "+year;
}
export function convertForTag(tmpDate,format) {
     let dayMonth = moment(tmpDate).locale("th", localization).format(format);
     let year = moment(tmpDate).locale("th", localization).format("YYYY");
    // return dateFormat(tmpDate,format);
    return dayMonth+((parseInt(year)+543)+"").substr(2,2);
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
         year = year + 543
        return year
  }
export function getmonth(){
    var date = new Date();
    var month = date.getMonth();
    var month =  month + 1
    if(month == 1){
      return 'มกราคม'
    }else if (month == 2){
      return 'กุมภาพันธ์'
    }else if (month == 3){
      return 'มีนาคม'
    }else if (month == 4){
      return 'เมษายน'
    }else if (month == 5){
      return 'พฤษภาคม'
    }else if (month == 6){
      return 'มิถุนายน'
    }else if (month == 7){
      return 'กรกฏาคม'
    }else if (month == 8){
      return 'สิงหาคม'
    }else if (month == 9){
      return 'กันยายน'
    }else if (month == 10){
      return 'ตุลาคม'
    }else if (month == 11){
      return 'พฤศจิกายน'
    }else if (month == 12){
      return 'ธันวาคม'
    }
  }

export function getConfirmModal(okFunc,cancelFunc,Data){
  this.props.navigator.showLightBox({
    screen: "staffio.ConfirmModalScreen", // unique ID registered with Navigation.registerScreen
    passProps: {title:`${I18n.t('ConfirmApprove')} : ${Data.type}`,msg: `${I18n.t('approveLeave')}`
    ,msg2: `${Data.name}` ,cancel:cancelModal(cancelFunc)
    ,ok:okModal(okFunc),data:Data}, // simple serializable object that will pass as props to the lightbox (optional)
    style: {
      backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
      backgroundColor: "transparent", // tint color for the background, you can specify alpha here (optional)
    },
    adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
   });
}

export function getInputModal(Title,okFunc,cancelFunc,Data,AdjustSoftInput){
  
  this.props.navigator.showLightBox({
    screen: "staffio.InputModalScreen", // unique ID registered with Navigation.registerScreen
    passProps: {title:`${Title} : ${Data.type}`,remark:`${I18n.t('Cause')}`
    ,cancel:cancelModal(cancelFunc),placeholder:`${I18n.t('SpecifyCause')}`
    ,ok:okModal(okFunc),data:Data}, // simple serializable object that will pass as props to the lightbox (optional)
    style: {
      backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
      backgroundColor: "transparent", // tint color for the background, you can specify alpha here (optional)
      height:responsiveHeight(70),
      width:responsiveWidth(90)
    },
    adjustSoftInput: AdjustSoftInput, // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
   });
}

function cancelModal(func){
  if(func){
    func();
  }
  this.props.navigator.dismissLightBox();    
}
function okModal(func){
  if(func){
    func();
  }
  this.props.navigator.dismissLightBox();    
}

export function disbackButton(){
  if(Platform.OS='android'){
    BackHandler.addEventListener('hardwareBackPress', function() {
    return true;
  });
}
}