import {Navigation,ScreenVisibilityListener} from 'react-native-navigation';
import Provider from '../lib/MobxRnnProvider';
import Store from '../stores/store';

import LoginScreen from './LoginScreen';
import PincodeScreen from './PincodeScreen';
import ConfirmPincodeScreen from './ConfirmPincodeScreen';
import ConfirmPunchScreen from './ConfirmPuchScreen';
import AuthenPinCodeScreen from './AuthenPincodeScreen';
import CameraScreen from '../components/staffioCamera';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import InqInboxScreen from './InqInboxScreen'
import InboxDetailScreen from './InboxDetailScreen'
import FindFriendScreen from './FindFriendsScreen'
import FriendListScreen from './FriendListScreen'
import PrivacyScreen from './PrivacyScreen'
import InqInboxCriteria from './InqInboxCriteria'


// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('staffio.LoginScreen', () => LoginScreen, Store, Provider);
  Navigation.registerComponent('staffio.PincodeScreen', () => PincodeScreen, Store, Provider);
  Navigation.registerComponent('staffio.ConfirmPincodeScreen', () => ConfirmPincodeScreen, Store, Provider);
  Navigation.registerComponent('staffio.AuthenPinCodeScreen', () => AuthenPinCodeScreen, Store, Provider);
  Navigation.registerComponent('staffio.HomeScreen', () => HomeScreen, Store, Provider);
  Navigation.registerComponent('staffio.CameraScreen', () => CameraScreen, Store, Provider);
  Navigation.registerComponent('staffio.ConfirmPunchScreen', () => ConfirmPunchScreen, Store, Provider);
  Navigation.registerComponent('staffio.ProfileScreen', () => ProfileScreen, Store, Provider);
  Navigation.registerComponent('staffio.InqInboxScreen', () => InqInboxScreen, Store, Provider);
  Navigation.registerComponent('staffio.InboxDetailScreen', () => InboxDetailScreen, Store, Provider);
  Navigation.registerComponent('staffio.FindFriendScreen', () => FindFriendScreen, Store, Provider);
  Navigation.registerComponent('staffio.FriendListScreen', () => FriendListScreen, Store, Provider);
  Navigation.registerComponent('staffio.PrivacyScreen', () => PrivacyScreen, Store, Provider);
  Navigation.registerComponent('staffio.InqInboxCriteria', () => InqInboxCriteria, Store, Provider);

}
export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) =>{ 
      console.log(`Displaying screen ${screen}`)
    },
    didAppear: ({screen, startTime, endTime, commandType}) => {
      console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`)
    },
    willDisappear: ({screen}) => {
      console.log(`Screen will disappear ${screen}`)
    },
    didDisappear: ({screen}) => {
      console.log(`Screen disappeared ${screen}`)
    }
  }).register();
}
