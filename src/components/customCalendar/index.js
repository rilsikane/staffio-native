import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,ScrollView
} from 'react-native';
// import LeaveCalendar from '../components/LeaveCalendar'
import Colors from '../../constants/Colors'
import {em} from '../../constants/Layout'
import {Content,Tabs,Tab,TabHeading} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import CardPunchInfo from '../cardPunchInfo'
import Calendar from '../staffioCalendar/calendar'
import {LocaleConfig} from 'react-native-calendars';
import I18n from '../../utils/i18n'
export default class CustomCalendar extends Calendar {
  constructor(props){
      super(props)
      LocaleConfig.locales['th'] = {
        monthNames: [`${I18n.t('January')}`,`${I18n.t('February')}`,`${I18n.t('March')}`,`${I18n.t('April')}`,`${I18n.t('May')}`,`${I18n.t('June')}`,`${I18n.t('July')}`,`${I18n.t('August')}`,`${I18n.t('September')}`,`${I18n.t('October')}`,`${I18n.t('November')}`,`${I18n.t('December')}`],
        monthNamesShort: [`${I18n.t('Jan')}`,`${I18n.t('Feb')}`,`${I18n.t('Mar')}`,`${I18n.t('Apr')}`,`${I18n.t('May')}`,`${I18n.t('Jun')}`,`${I18n.t('Jul')}`,`${I18n.t('Aug')}`,`${I18n.t('Sep')}`,`${I18n.t('Oct')}`,`${I18n.t('Nov')}`,`${I18n.t('Dec')}`],
        dayNames: [`${I18n.t('Sunday')}`,`${I18n.t('Monday')}`,`${I18n.t('Tuesday')}`,`${I18n.t('Wednesday')}`,`${I18n.t('Thursday')}`,`${I18n.t('Friday')}`,`${I18n.t('Saturday')}`],
        dayNamesShort: [`${I18n.t('Sun')}`,`${I18n.t('Mon')}`,`${I18n.t('Tue')}`,`${I18n.t('Wed')}`,`${I18n.t('Thu')}`,`${I18n.t('Fri')}`,`${I18n.t('Sat')}`]
        };

    LocaleConfig.defaultLocale = 'th';
  }
  static navigationOptions = {
    header: null,
  };

}


