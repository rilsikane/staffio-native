import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,ScrollView,TouchableOpacity,ListView
} from 'react-native';
// import LeaveCalendar from '../components/LeaveCalendar'
import Colors from '../../constants/Colors'
import {em} from '../../constants/Layout'
import {Content,Tabs,Tab,TabHeading} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import CardPunchInfo from '../cardPunchInfo'
import SGListView from 'react-native-sglistview';

export default class InboxList extends React.Component {
  constructor(props){
    super(props);
    this.onPress = this.onPress.bind(this);
  }
  static navigationOptions = {
    header: null,
  };
  onPress(data){
    this.props.onPressItem(data);
  }
   getDataSource() {
    const dataSource = new ListView.DataSource(
      { rowHasChanged: (r1, r2) => r1.uuid !== r2.uuid });

    const deals =this.props.listTimeReocords.length > 0;
    return deals ? dataSource.cloneWithRows(this.props.listTimeReocords) : dataSource;
  }
  render() {
    return (
       <Content style={{backgroundColor:Colors.backgroundColor,marginTop:5}}>
               {/*{ this.props.listTimeReocords.map((val) => {
                  return (
                    <CardPunchInfo key={val.temp_mobile_id} onPress={this.onPress} timeRecord={val}>
                    </CardPunchInfo>);
                })}
            */}
             <SGListView
                  dataSource={this.getDataSource() } //data source
                  ref={'listview'}
                  initialListSize={1}
                  stickyHeaderIndices={[]}
                  onEndReachedThreshold={1}
                  scrollRenderAheadDistance={1}
                  pageSize={1}
                  renderRow={(item) =>
                    <CardPunchInfo key={item.temp_mobile_id} onPress={this.onPress} timeRecord={item}>
                    </CardPunchInfo>
                  }
                />
        </Content>
    );
  }

}

const styles = StyleSheet.create({
  
});
