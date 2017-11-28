import moment from 'moment';
import localization from 'moment/locale/th'
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