import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native';
// import LeaveCalendar from '../components/LeaveCalendar'
import FindFriends from '../components/findFriends'
import {em,x,y} from '../constants/Layout';
import { NavigationActions } from 'react-navigation'
import {post} from '../api';
import { observer, inject } from 'mobx-react';
import Loading from '../components/loading';
@inject('searchStore')
@observer
export default class FindFriendsScreen extends React.Component {
  constructor(props){
    super(props);
     this.state = {searchtext:"",isLoading:false};
     this.onFindPress = this.onFindPress.bind(this);
     this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  async onFindPress(){
      this.setState({isLoading:true});
      const searchData = await this.searchFirends();
      if(searchData){
        this.props.searchStore.searchData = searchData;
         this.props.navigator.push({
            screen: 'staffio.FriendListScreen', // unique ID registered with Navigation.registerScreen
            title: undefined, // navigation bar title of the pushed screen (optional)
            passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
            animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
            navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
            navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
          });
        this.setState({isLoading:false});
      }
  }
  async searchFirends(){
    let params  = {};
    params.param = this.state.searchtext;
    params.page = 1;
    params.pageSize = 100;
    const response = await post("GetPersonalInfo",params);
    if(response){
      return response.ResultDatas;
    }else{
      return false;
    }
  }
  handleKeyDown(e) {
    if(e.nativeEvent.key == "Enter"){
        this.onFindPress();
    }
  }

  render() {
    return (
       <View style={{flex:1,backgroundColor:"#fee2c8"}}>
         <Loading visible={this.state.isLoading} text="กำลังค้นหาข้อมูล..."/>
        <View style={{marginTop:em(2),marginLeft:em(1),marginRight:em(1)}}>
            <FindFriends onPress={this.onFindPress}  value={this.state.searchtext} 
            onChangeText={searchtext => this.setState({ searchtext })}  onSubmitEditing={this.onFindPress.bind(this)}></FindFriends>
        </View>
       </View>
    );
  }

}


