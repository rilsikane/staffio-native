import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Animated,
  ViewPropTypes,
  TouchableOpacity
} from 'react-native';
import XDate from 'xdate';

import {parseDate, xdateToData} from '../interface';
import dateutils from '../dateutils';
import CalendarList from '../calendar-list';
import ReservationsList from './reservation-list';
import styleConstructor from './style';
import { VelocityTracker } from '../input';
import {em} from '../../../constants/Layout';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {Badge,Button} from 'native-base';
import Home from '../../home'
import Iocon from 'react-native-vector-icons/Ionicons';
import colors from '../../../constants/Colors'


const HEADER_HEIGHT = responsiveHeight(13);
const KNOB_HEIGHT = responsiveHeight(3.5);

//Fallback when RN version is < 0.44
const viewPropTypes = ViewPropTypes || View.propTypes;


export default class AgendaView extends Component {
  
  constructor(props) {
    super(props);
    this.styles = styleConstructor(props.theme);
    const windowSize = Dimensions.get('window');
    this.viewHeight = windowSize.height;
    this.viewWidth = windowSize.width;
    this.scrollTimeout = undefined;
    this.headerState = 'idle';
    this.state = {
      scrollY: new Animated.Value(0),
      calendarScrollable: false,
      firstResevationLoad: false,
      selectedDay: parseDate(this.props.selected) || XDate(true),
      topDay: parseDate(this.props.selected) || XDate(true),
    };
    this.currentMonth = this.state.selectedDay.clone();
    this.onLayout = this.onLayout.bind(this);
    this.onScrollPadLayout = this.onScrollPadLayout.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onSnapAfterDrag = this.onSnapAfterDrag.bind(this);
    this.knobTracker = new VelocityTracker();
    this.state.scrollY.addListener(({value}) => this.knobTracker.add(value));
    this.closeCalendar = this.closeCalendar.bind(this);
    console.log(this.props);
  }

  calendarOffset() {
    return responsiveHeight(14) - (this.viewHeight / 2);
  }

  initialScrollPadPosition() {
    return Math.max(0, this.viewHeight - HEADER_HEIGHT);
  }

  setScrollPadPosition(y, animated) {
    this.scrollPad._component.scrollTo({x: 0, y, animated});
  }

  onScrollPadLayout() {
    // When user touches knob, the actual component that receives touch events is a ScrollView.
    // It needs to be scrolled to the bottom, so that when user moves finger downwards,
    // scroll position actually changes (it would stay at 0, when scrolled to the top).
    this.setScrollPadPosition(this.initialScrollPadPosition(), false);
  }

  onLayout(event) {
    this.viewHeight = event.nativeEvent.layout.height;
    this.viewWidth = event.nativeEvent.layout.width;
    this.calendar.scrollToDay(this.state.selectedDay.clone(), this.calendarOffset(), false);
    this.forceUpdate();
  }

  onTouchStart() {
    this.headerState = 'touched';
    if (this.knob) {
      this.knob.setNativeProps({style: { opacity: 0.5 }});
    }
  }

  onTouchEnd() {
    if (this.knob) {
      this.knob.setNativeProps({style: { opacity: 1 }});
    }

    if (this.headerState === 'touched') {
      this.setScrollPadPosition(0, true);
      this.enableCalendarScrolling();
    }
    this.headerState = 'idle';
  }

  onStartDrag() {
    this.headerState = 'dragged';
    this.knobTracker.reset();
  }

  onSnapAfterDrag(e) {
    // on Android onTouchEnd is not called if dragging was started
    this.onTouchEnd();
    const currentY = e.nativeEvent.contentOffset.y;
    this.knobTracker.add(currentY);
    const projectedY = currentY + this.knobTracker.estimateSpeed() * 250/*ms*/;
    const maxY = this.initialScrollPadPosition();
    const snapY = (projectedY > maxY / 2) ? maxY : 0;
    this.setScrollPadPosition(snapY, true);
    if (snapY === 0) {
      this.enableCalendarScrolling();
    }
  }

  onVisibleMonthsChange(months) {
    if (this.props.items && !this.state.firstResevationLoad) {
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        if (this.props.loadItemsForMonth) {
          this.props.loadItemsForMonth(months[0]);
        }
      }, 200);
    }
  }

  loadReservations(props) {
    if ((!props.items || !Object.keys(props.items).length) && !this.state.firstResevationLoad) {
      this.setState({
        firstResevationLoad: true
      }, () => {
        if (this.props.loadItemsForMonth) {
          this.props.loadItemsForMonth(xdateToData(this.state.selectedDay));
        }
      });
    }
  }

  componentDidMount() {
    this.loadReservations(this.props);
  }

  componentWillReceiveProps(props) {
    if (props.items) {
      this.setState({
        firstResevationLoad: false
      });
    } else {
      this.loadReservations(props);
    }
  }

  enableCalendarScrolling() {
    this.setState({
      calendarScrollable: true
    });
    // Enlarge calendarOffset here as a workaround on iOS to force repaint.
    // Otherwise the month after current one or before current one remains invisible.
    // The problem is caused by overflow: 'hidden' style, which we need for dragging
    // to be performant.
    // Another working solution for this bug would be to set removeClippedSubviews={false}
    // in CalendarList listView, but that might impact performance when scrolling
    // month list in expanded CalendarList.
    // Further info https://github.com/facebook/react-native/issues/1831
    this.calendar.scrollToDay(this.state.selectedDay, this.calendarOffset() + 1, true);
  }

  _chooseDayFromCalendar(d) {
    this.chooseDay(d, !this.state.calendarScrollable);
  }

  chooseDay(d, optimisticScroll) {
    const day = parseDate(this.props.selected);
    this.setState({
      calendarScrollable: false,
      selectedDay: day.clone()
    });
    if (!optimisticScroll) {
      this.setState({
        topDay: day.clone()
      });
    }
    this.setScrollPadPosition(this.initialScrollPadPosition(), true);
    this.calendar.scrollToDay(day, this.calendarOffset(), true);
    if (this.props.loadItemsForMonth) {
      this.props.loadItemsForMonth(xdateToData(day));
    }
    if (this.props.onDayPress) {
      this.props.onDayPress(xdateToData(day));
    }
  }

  renderReservations() {
    return (
       <Home punchPress={this.props.punchPress} gotoInbox={this.props.gotoInbox}
       user={this.props.user} holidays={this.props.holidays} statusAmount={this.props.statusAmount}
       shiftData={this.props.shiftData} shiftList={this.props.shiftList} app={this.props.app}/>
    );
  }

  onDayChange(day) {
    const newDate = parseDate(day);
    const withAnimation = dateutils.sameMonth(newDate, this.state.selectedDay);
    this.calendar.scrollToDay(day, this.calendarOffset(), withAnimation);
    this.setState({
      selectedDay: parseDate(day)
    });

    if (this.props.onDayChange) {
      this.props.onDayChange(xdateToData(newDate));
    }
  }
  closeCalendar() {
        //this.setState({calendarScrollable:false});
        //this.setScrollPadPosition(this.initialScrollPadPosition(), true);
         this.chooseDay(null, !this.state.calendarScrollable);
  }

  render() {
    const agendaHeight = Math.max(0, this.viewHeight - HEADER_HEIGHT);
    const weekDaysNames = dateutils.weekDayNames(this.props.firstDay);
    const weekdaysStyle = [this.styles.weekdays, {
      opacity: this.state.scrollY.interpolate({
        inputRange: [agendaHeight - HEADER_HEIGHT, agendaHeight],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [{ translateY: this.state.scrollY.interpolate({
        inputRange: [Math.max(0, agendaHeight - HEADER_HEIGHT), agendaHeight],
        outputRange: [-HEADER_HEIGHT, 0],
        extrapolate: 'clamp',
      })}]
    }];

    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, agendaHeight],
      outputRange: [agendaHeight, 0],
      extrapolate: 'clamp',
    });

    const contentTranslate = this.state.scrollY.interpolate({
      inputRange: [0, agendaHeight],
      outputRange: [0, agendaHeight/2],
      extrapolate: 'clamp',
    });

    const headerStyle = [
      this.styles.header,
      { bottom: agendaHeight, transform: [{ translateY: headerTranslate }] },
    ];

    const shouldAllowDragging = !this.props.hideKnob && !this.state.calendarScrollable;
    const scrollPadPosition = ((shouldAllowDragging ? HEADER_HEIGHT  : 0) - KNOB_HEIGHT);

    const scrollPadStyle = {
      position: 'absolute',
      width: 80,
      height: KNOB_HEIGHT,
      top: scrollPadPosition,
      left: (this.viewWidth - 80) / 2,
    };

    let knob = (<View style={this.styles.knobContainer}/>);

    if (!this.props.hideKnob) {
      const knobView = this.props.renderKnob ? this.props.renderKnob() : (
       <View style={{backgroundColor:"#f58020",height:responsiveHeight(1.2),borderRadius:responsiveHeight(1.5)
       ,width:responsiveWidth(15),alignItems:"center",justifyContent:"center",alignItems:"center"}}>
        <Text allowFontScaling={false}style={{fontSize:responsiveFontSize(1.2),backgroundColor:"transparent",color:"#fff",justifyContent:"center",alignItems:"center"}}>•••</Text>
      </View>);
      knob = this.state.calendarScrollable ? null : (
        <View style={this.styles.knobContainer}>
          <View ref={(c) => this.knob = c}>{knobView}</View>
        </View>
      );
    }
    
   
    return (
      <View onLayout={this.onLayout} style={[this.props.style, {flex: 1, overflow: 'hidden'}]}>
        <View style={this.styles.reservations}>
          {this.renderReservations()}
        </View>
         {this.state.calendarScrollable && <TouchableOpacity onPress={this.closeCalendar}
         style={{ position: 'absolute',height: 50, top: this.viewHeight - 40, width: this.viewWidth,zIndex:99999,justifyContent:"center",alignItems:"center"}}>
             <View style={{backgroundColor:"#f58020",height:responsiveHeight(1.5),borderRadius:responsiveHeight(2)
              ,width:responsiveWidth(15),alignItems:"center"}}>
                <Text allowFontScaling={false}style={{fontSize:responsiveFontSize(1.2),backgroundColor:"transparent",color:"#fff",justifyContent:"center",alignItems:"center"}}>•••</Text>
              </View>
          </TouchableOpacity>}
        <Animated.View style={headerStyle}>
          <Animated.View style={{flex:1, transform: [{ translateY: contentTranslate }]}}>
            <CalendarList
              theme={this.props.theme}
              onVisibleMonthsChange={this.onVisibleMonthsChange.bind(this)}
              ref={(c) => this.calendar = c}
              minDate={this.props.minDate} 
              maxDate={this.props.maxDate}
              selected={[this.state.selectedDay]}
              current={this.currentMonth}
              markedDates={this.props.items}
              onDayPress={this._chooseDayFromCalendar.bind(this)}
              scrollingEnabled={this.state.calendarScrollable}
              hideExtraDays={this.state.calendarScrollable}
              firstDay={this.props.firstDay}
              monthFormat={this.props.monthFormat}
            />
          </Animated.View>
          {knob}
        </Animated.View>
        <Animated.View style={weekdaysStyle}>
          {weekDaysNames.map((day) => (
            <Text allowFontScaling={false}key={day} style={this.styles.weekday} numberOfLines={1}>{day}</Text>
          ))}
        </Animated.View>
        <Animated.ScrollView
          ref={c => this.scrollPad = c}
          overScrollMode='never'
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={scrollPadStyle}
          scrollEventThrottle={1}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          onScrollBeginDrag={this.onStartDrag}
          onScrollEndDrag={this.onSnapAfterDrag}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: (this.state.scrollY) } } }],
            { useNativeDriver: true },
          )}
        >
          <View style={{height: (agendaHeight + KNOB_HEIGHT)+responsiveHeight(8)}} onLayout={this.onScrollPadLayout} />
        </Animated.ScrollView>
      </View>
    );
  }
}
