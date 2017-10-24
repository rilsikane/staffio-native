import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator,TabBarBottom} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../constants/Colors';

import HomeScreen from '../containers/HomeScreen';
import InboxScreen from '../containers/InboxScreen';
import ProfileScreen from '../containers/ProfileScreen';
import SearchScreen from '../containers/SearchScreen';


export default TabNavigator(
  {
   
   
    Home: {
      screen: HomeScreen,
    },
    Inbox: {
      screen: InboxScreen,
    },
    Search: {
      screen: SearchScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
     
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: (scene, jumpToIndex) => {
              console.log('onPress:', scene.route);
              jumpToIndex(scene.index);
      },
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            // iconName = Platform.OS === 'ios'
            //   ? `ios-information-circle${focused ? '' : '-outline'}`
            //   : 'md-information-circle';
            iconName = 'home';
            break;
          case 'Inbox':
            // iconName = Platform.OS === 'ios'
            //   ? `ios-link${focused ? '' : '-outline'}`
            //   : 'md-link';
            iconName = 'inbox';
            break;
          case 'Profile':
            // iconName = Platform.OS === 'ios'
            //   ? `ios-options${focused ? '' : '-outline'}`
            //   : 'md-options';
             iconName = 'bars';
             break;
           case 'TimeSheet':
            // iconName = Platform.OS === 'ios'
            //   ? `ios-options${focused ? '' : '-outline'}`
            //   : 'md-options';
             iconName = 'user';
             break;
          case 'Search':
            // iconName = Platform.OS === 'ios'
            //   ? `ios-options${focused ? '' : '-outline'}`
            //   : 'md-options';
             iconName = 'search';
              break;
        }
        return (
          <Icon
            name={iconName}
            size={28}
            style={{ marginTop: 5,color:"#f58020"}}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
      showLabel:false
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    lazy:true,
  }
);
