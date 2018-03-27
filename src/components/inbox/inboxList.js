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
import Swipeable from 'react-native-swipeable';
import I18n from '../../utils/i18n'

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

               <OptimizedFlatList
                data={this.props.listTimeReocords}
                renderItem={ ({item}) => 
                // <Swipeable rightButtons={[
                //   <TouchableOpacity>
                //     <View style={[styles.rightSwipeItem]}>
                //       <Icon name="clock-o" size={responsiveFontSize(2)} style={{ color: 'white' ,backgroundColor:'transparent'}} />
                //       {this.app && this.app.locale=='en'?<Text style={{fontFamily:'Kanit',fontSize:responsiveFontSize(1.5),color:'white'}}>{I18n.t('editReq')}</Text>:<Text style={{fontFamily:'Kanit',fontSize:responsiveFontSize(1.5),color:'white'}}>OT Request</Text>}
                //     </View>
                //   </TouchableOpacity>,
          
                //   <TouchableOpacity>
                //     <View style={[styles.rightSwipeItem]}>
                //       <Icon name="calendar" size={responsiveFontSize(2)} style={{ color: 'white',backgroundColor:'transparent' }} />
                //       {this.app && this.app.locale=='en'?<Text style={{fontFamily:'Kanit',fontSize:responsiveFontSize(1.5),color:'white'}}>{I18n.t('canreq')}</Text>:<Text style={{fontFamily:'Kanit',fontSize:responsiveFontSize(1.3),color:'white'}}>Adjust Time</Text>}
                //     </View>
                //   </TouchableOpacity>,  
                // ]}>
                // <TouchableOpacity onPress={this.onPress}>  
                //   <CardPunchInfo key={item.temp_mobile_id}  timeRecord={item}>
                //   </CardPunchInfo>
                // </TouchableOpacity>
                // </Swipeable>
                                // <TouchableOpacity onPress={this.onPress}>  
                  <CardPunchInfo key={item.temp_mobile_id}  timeRecord={item} onPress={this.onPress}>
                  </CardPunchInfo>
                  // </TouchableOpacity>
                }
                 keyExtractor={item => item.temp_mobile_id}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.5}
                />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  rightSwipeItem: {
    justifyContent: 'center',
    backgroundColor: '#fbaa3e',
    borderWidth:responsiveWidth(1),
    borderColor: 'white',
    borderRadius:responsiveWidth(3),
    alignItems: 'center',
    width: responsiveWidth(17.5),
    height: responsiveWidth(17.5),
    marginTop:responsiveHeight(0.7),
  },
});
