import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
// import LeaveCalendar from '../components/LeaveCalendar'
import CardFriend from '../components/cardFriend'
import {em,x,y} from '../constants/Layout';
import Colors from '../constants/Colors';
import {Item,Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react';
import {post} from '../api';
import Loading from '../components/loading';
@inject('searchStore')
@observer
export default class FindFriendsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={friendList :[],searchtext:"",isLoading:false,isFocus:false}
    this.onFindPress = this.onFindPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  componentWillMount(){
    this.setState({friendList:this.props.searchStore.searchData})
  }
  handleKeyDown(e) {
    if(e.nativeEvent.key == "Enter"){
        this.onFindPress();
    }
  }
  async onFindPress(){
      this.setState({isLoading:true});
      const searchData = await this.searchFirends();
      if(searchData){
       this.setState({friendList:searchData,isLoading:false,isFocus:false});
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


  render() {
    return (
       <View style={{flex:1,backgroundColor:"#fee2c8"}}>
        <View style={{flex:1,marginTop:em(2),marginLeft:em(1),marginRight:em(1)}}>
            <View style={{paddingLeft:30,paddingRight:30,paddingBottom:10}}>
              <Item style={{borderColor:Colors.baseColor}}>
                  <Input style={{fontSize:em(0.8),color:Colors.baseColor}} value={this.state.criterai}  onChangeText={searchtext => this.setState({ searchtext })}  returnKeyType="search"
                    onSubmitEditing={this.onFindPress} onFocus={()=>this.setState({isFocus:true})}/>
                  {!this.state.isFocus && <Icon style={{fontSize:em(1.2),paddingTop:10,paddingRight:5,color:Colors.baseColor}} active name='search' />}
              </Item>
            </View>
            <ScrollView>
            <Loading visible={this.state.isLoading} text="กำลังค้นหาข้อมูล..."/>
            { this.state.friendList.map((val) => {
            return (<CardFriend key={val.EMP_CODE} employee={val}/>);
            })}
          </ScrollView>
        </View>
       </View>
    );
  }

}


