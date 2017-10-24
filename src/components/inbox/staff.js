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
import CustomMultiPicker from "react-native-multiple-select-list";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { observer, inject } from 'mobx-react';

@inject('punchStore')
@observer
export default class Staff extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }
  onSelect(res){
    res = res.filter(function( element ) {
      return element !== undefined;
    });
    this.props.punchStore.staffSearch = res;
  }
  render() {
   
    return (
       <View style={{flex:1}}>
           <CustomMultiPicker
            options={this.props.users}
            search={true} // should show search bar?
            multiple={true} //
            placeholder={"ค้นหาพนักงาน"}
            placeholderTextColor={'#757575'}
            callback={this.onSelect} // callback, array of selected items
            rowBackgroundColor={"#eee"}
            rowHeight={40}
            iconColor={Colors.baseColor}
            iconSize={30}
            selectedIconName={"ios-checkmark-circle-outline"}
            unselectedIconName={"ios-radio-button-off-outline"}
            scrollViewHeight={responsiveHeight(73)}
            selected={this.props.punchStore.staffSearch}
          />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  
});
