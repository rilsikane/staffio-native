import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,ScrollView
} from 'react-native';
// import LeaveCalendar from '../components/LeaveCalendar'
import { observer, inject } from 'mobx-react';
import Colors from '../../constants/Colors'
import {em} from '../../constants/Layout'
import {Content,Tabs,Tab,TabHeading} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import CardPunchInfo from '../cardPunchInfo'
import CustomMultiPicker from "react-native-multiple-select-list";
import I18n from '../../utils/i18n';

@inject('punchStore')
@observer
export default class Location extends React.Component {
  constructor(props){
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }
  static navigationOptions = {
    header: null,
  };

  onSelect(res){
    res = res.filter(function( element ) {
      return element !== undefined;
    });
    this.props.punchStore.locationSearch = res;
  }

  render() {
    return (
       <View style={{flex:1}}>
           <CustomMultiPicker
            options={this.props.locations}
            search={true} // should show search bar?
            multiple={true} //
            placeholder={`${I18n.t('location')}`}
            placeholderTextColor={'#757575'}
            callback={this.onSelect} // callback, array of selected items
            rowBackgroundColor={"#eee"}
            rowHeight={40}
            iconColor={Colors.baseColor}
            iconSize={30}
            selectedIconName={"ios-checkmark-circle-outline"}
            unselectedIconName={"ios-radio-button-off-outline"}
            selected={this.props.punchStore.locationSearch}
          />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  
});
