import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native';
// import LeaveCalendar from '../components/LeaveCalendar'
import HomeScreen from './HomeScreen'
import FindFriendScreen from './FindFriendsScreen'
import FriendListScreen from './FriendListScreen'
import { StackNavigator } from 'react-navigation';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import { NavigationActions } from 'react-navigation';


let SearchStackNavigator = StackNavigator(
 
  {
   FindFriendScreen:{screen:FindFriendScreen},
   FriendListScreen: {screen:FriendListScreen},
   
  },
  {
    initialRouteName:"FindFriendScreen",
    navigationOptions: () => ({
      header: null,
    }),
  }
);
class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  componentWillReceiveProps(nextProps) {
    // if (nextProps.isFocused) { // Focused
    //   const navigateAction = NavigationActions.navigate({

    //     routeName: 'Main',

    //     params: {},

    //     action: NavigationActions.navigate({ routeName: 'Search'})
    //   })
    //   nextProps.navigation.dispatch(navigateAction);
    // }
    if (!nextProps.isFocused) { 
      this.componentDidFocus();
    }
  }
  async componentDidFocus(){
    SearchStackNavigator = StackNavigator(
      {
      FindFriendScreen:{screen:FindFriendScreen},
      FriendListScreen: {screen:FriendListScreen},
      
      },
      {
        initialRouteName:"FindFriendScreen",
        navigationOptions: () => ({
          header: null,
        }),
      }
    );
  }

  render() {
    return (
       <SearchStackNavigator />
    );
  }

}

export default withNavigationFocus(SearchScreen, 'Search')
