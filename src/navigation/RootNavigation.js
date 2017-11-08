
import React from 'react';
import {AppState,Platform,NativeAppEventEmitter,DeviceEventEmitter} from 'react-native';
import { StackNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Login from '../containers/LoginScreen';
import Pincode from '../containers/PincodeScreen';
import ConfirmPincode from '../containers/ConfirmPincodeScreen';
import ConfirmPunchScreen from '../containers/ConfirmPuchScreen';
import AuthenPinCode from '../containers/AuthenPincodeScreen';
import SearchScreen from '../containers/SearchScreen';
import Camera from '../components/staffioCamera';
import { NavigationActions } from'react-navigation';
import store from 'react-native-simple-store';
import BackgroundTimer from 'react-native-background-timer';
import Spinner from 'react-native-loading-spinner-overlay';
var SpinnerKit = require('react-native-spinkit');
import { updateFocus } from 'react-navigation-is-focused-hoc'


//for Debug
import InboxScreen from '../containers/InboxScreen';
import FindFriendsScreen from '../containers/FindFriendsScreen';
import ProfileScreen from '../containers/ProfileScreen';

const MainStackNavigator = StackNavigator(
 
  {
  Main: {
      screen: MainTabNavigator,
  },
   Camera: {screen : Camera},
   ConfirmPunchScreen: {screen:ConfirmPunchScreen}
  },
  {
    navigationOptions: () => ({
      header: null,
    }),
  }
);
const AuthenNavigator = StackNavigator(
 
  {
  Login: {screen : Login}, 
  Pincode: {screen : Pincode},
  ConfirmPincode: {screen : ConfirmPincode},
   
  },
  {
    navigationOptions: () => ({
      header: null,
    }),
  }
);
var bgCount = 0;
let isCount = false;
let intervalId = null;


export default class RootNavigator extends React.Component {
   state = {
    appState: AppState.currentState,
    isPincodeAuthen:true,
    firstTime:true,
    isCount:false,
  }
  _onNavigationStateChange(prevState, newState, action) {
    console.debug('onNavigationStateChange action.routeName=', action.routeName)
    updateFocus(newState);
  }
  render() {
   
    const Route = () =>{
      if(!this.state.firstTime && this.state.isPincodeAuthen)
      return "AuthenPinCode"
      else if(this.state.firstTime)
      return "Login";
      else 
      return "Home";
    }
    const RootStackNavigator = StackNavigator(
      { 
        AuthenPinCode:{screen:AuthenPinCode},
        Login:{screen:AuthenNavigator},
        Home:{screen : MainStackNavigator},
        
      },
      {
          initialRouteName: Route(),
          navigationOptions: () => ({
          header: null,
          }),
      },
      
    );
   
    // if(!this.state.isPincodeAuthen||this.state.firstTime)
    // return <RootStackNavigator/>;
    // else 
    // return <AuthenPinCode donePress={() => this.authen()}/>;

     return <RootStackNavigator  screenProps={{authen:this.authen.bind(this),current: this.state.route_index}} 
     ref={nav => { this.navigator = nav; }}   onNavigationStateChange={this._onNavigationStateChange}/>
     //return <InboxScreen /> 
  }
  
  
  
  async componentWillMount() {
    const userData = await store.get("USER");

    if (userData == null || userData.pincode==null) {
      this.setState({firstTime:true});
    }else{
       this.setState({isPincodeAuthen:true});
       this.setState({firstTime:false});
    }
  }
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  authen() {
    this.setState({isPincodeAuthen:false});
  }
  

  _handleAppStateChange = async (nextAppState) => {
    const userData = await store.get("USER");
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      if (userData !== null) {
        this.setState({isPincodeAuthen:true});
        this.setState({firstTime:false});
      }else{
        this.setState({isPincodeAuthen:false});
      }
       
    }else if(nextAppState === 'active'){
      bgCount = 0;
      isCount = false;
    }else{
      isCount = true;
    }
          // if(bgCount<60000){
          if(intervalId==null){
            intervalId = BackgroundTimer.setTimeout(() => {
             if (userData !== null) {
                this.setState({isPincodeAuthen:true});
                this.setState({firstTime:false});
                isCount = true;
              }else{
                this.setState({isPincodeAuthen:false});
              }
            
          }, 10000);
              
          }
      if(!isCount){
        BackgroundTimer.clearTimeout(intervalId);
        intervalId = null;
      }
      
  }



}
