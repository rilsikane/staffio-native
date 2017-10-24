import {Platform} from 'react-native';
import {em} from '../../constants/Layout'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export const foregroundColor = '#ffffff';
export const backgroundColor = '#f4f4f4';
export const separatorColor = '#e8e9ec';

export const processedColor = '#a7e0a3';
export const processingColor = '#ffce5c';
export const failedColor = 'rgba(246, 126, 126,1)';

export const textDefaultColor = '#2d4150';
export const textColor = '#43515c';
export const textLinkColor = '#f58020';
export const textSecondaryColor = '#7a92a5';

export const textDayFontFamily = 'Kanit';
export const textMonthFontFamily = 'Kanit';
export const textDayHeaderFontFamily = 'Kanit';

export const textDayFontSize = responsiveFontSize(2);
export const textMonthFontSize = responsiveFontSize(2);
export const textDayHeaderFontSize = responsiveFontSize(1.5);

export const calendarBackground = foregroundColor;
export const textSectionTitleColor = '#b6c1cd';
export const selectedDayBackgroundColor = textLinkColor;
export const selectedDayTextColor = foregroundColor;
export const todayTextColor = textLinkColor;
export const dayTextColor = textDefaultColor;
export const textDisabledColor = '#d9e1e8';
export const dotColor = textLinkColor;
export const selectedDotColor = foregroundColor;
export const arrowColor = textLinkColor;
export const monthTextColor = textDefaultColor;
export const agendaDayTextColor = '#7a92a5';
export const agendaDayNumColor = '#7a92a5';
export const agendaTodayColor = textLinkColor;
export const agendaKnobColor = Platform.OS === 'ios' ? '#f2F4f5' : '#4ac4f7';
