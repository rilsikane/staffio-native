import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,ScrollView,TouchableOpacity,ListView,FlatList
} from 'react-native';
// import LeaveCalendar from '../components/LeaveCalendar'
import Colors from '../../constants/Colors'
import {em} from '../../constants/Layout'
import {Content,Tabs,Tab,TabHeading} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import CardPunchInfo from '../cardPunchInfo'
import SGListView from 'react-native-sglistview';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class InboxList extends React.Component {
  constructor(props){
    super(props);
    this.onPress = this.onPress.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    
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
  onEndReached(){
    //console.log("onEndReached");
   this.props.onEndReached();
  }
  render() {
    return (
       <View style={{backgroundColor:Colors.backgroundColor,marginTop:5}}>
               {/*{ this.props.listTimeReocords.map((val) => {
                  return (
                    <CardPunchInfo key={val.temp_mobile_id} onPress={this.onPress} timeRecord={val}>
                    </CardPunchInfo>);
                })}
            */}
             {/* <SGListView
                  dataSource={this.getDataSource()} //data source
                  ref={'listview'}
                  initialListSize={100}
                  stickyHeaderIndices={[]}
                  onEndReachedThreshold={500}
                  scrollRenderAheadDistance={1}
                  //onEndReached={this.props.onEndReached}
                  pageSize={1}
                  renderRow={(item) =>
                    <CardPunchInfo key={item.temp_mobile_id} onPress={this.onPress} timeRecord={item}>
                    </CardPunchInfo>
                  }
                /> */}
               <FlatList
                data={this.props.listTimeReocords}
                renderItem={ ({item}) =>  <CardPunchInfo key={item.temp_mobile_id} onPress={this.onPress} timeRecord={item}>
                </CardPunchInfo>}
                 keyExtractor={item => item.temp_mobile_id}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0}
                />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  
});
