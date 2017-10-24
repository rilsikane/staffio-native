import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native';
// import LeaveCalendar from '../components/LeaveCalendar'
import HomeScreen from './HomeScreen'
import InqInboxScreen from './InqInboxScreen'
import InboxDetailScreen from './InboxDetailScreen'
import { StackNavigator } from 'react-navigation';
import PunchResultScreen from './PuchResultScreen';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'

let InboxStackNavigator = StackNavigator(
 
  {
    PunchResultScreen:{screen:PunchResultScreen},
    InqInboxScreen:{screen:InqInboxScreen},
    InboxDetailScreen: {screen:InboxDetailScreen},
   
   
  },
  {
    initialRouteName:"InqInboxScreen",
    navigationOptions: () => ({
      header: null,
    }),
  }
);
class InboxScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  componentWillReceiveProps(nextProps) {
    if(!this.props.isFocused){
      this.componentDidFocus();
    }
    
  }
  async componentDidFocus(){
      InboxStackNavigator = StackNavigator(
  
    {
      PunchResultScreen:{screen:PunchResultScreen},
      InqInboxScreen:{screen:InqInboxScreen},
      InboxDetailScreen: {screen:InboxDetailScreen},
    
    
    },
    {
      initialRouteName:"InqInboxScreen",
      navigationOptions: () => ({
        header: null,
      }),
    }
    );
  }

  render() {
    return (
       <InboxStackNavigator />
    );
  }

}

export default withNavigationFocus(InboxScreen, 'Inbox')
