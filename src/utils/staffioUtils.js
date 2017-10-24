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