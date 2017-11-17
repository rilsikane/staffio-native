import React from 'react';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {
    Modal,
    Platform,
    StyleSheet,
    View,
    Text,
    AppState,NativeAppEventEmitter,DeviceEventEmitter,ScrollView,Image,TouchableOpacity
  } from 'react-native';
import {Content,Tabs,Tab,TabHeading,Container,Footer,Button} from 'native-base'
import Location from '../components/inbox/location'
import Status from '../components/inbox/status'
import Staff from '../components/inbox/staff'
import SearchDate from '../components/inbox/searchDate'
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors'

  export default class InqInboxCriteria extends React.Component {
    constructor(props) {
        super(props);
        this.onDoneDialog = this.onDoneDialog.bind(this);
        this.cancelDialog = this.cancelDialog.bind(this);
    }
  
     onDoneDialog(){
        this.props.closeDialog();
        setTimeout(() => {
            this.props.onDoneDialog();
        }, 50);
        
      }
      cancelDialog(){
        this.props.cancelDialog();
      }
    render() {
        return (
            <Container style={{paddingTop:22,flex:1,backgroundColor:Colors.backgroundColor}}>
                 <Content>
                    <Tabs   initialPage={0} tabBarUnderlineStyle={{backgroundColor:Colors.baseColor}}>
                      <Tab heading={ <TabHeading style={styles.tabHeading}><Icon name="map-marker" style={styles.tabIcon}/><Text style={styles.tabLabel}>  สถานที่</Text></TabHeading>}>
                        <Location locations={this.props.locations} />
                      </Tab>
                      <Tab  heading={ <TabHeading style={styles.tabHeading}><Icon name="clock-o"  style={styles.tabIcon}/><Text  style={styles.tabLabel}>  สถานะ</Text></TabHeading>}>
                        <Status statusList={this.props.statuses}/>
                      </Tab>
                      <Tab heading={ <TabHeading style={styles.tabHeading}><Icon name="calendar"  style={styles.tabIcon}/><Text  style={styles.tabLabel}>  วันที่</Text></TabHeading>}>
                        <SearchDate />
                      </Tab>
                      <Tab heading={ <TabHeading style={styles.tabHeading}><Icon name="user"  style={styles.tabIcon}/><Text  style={styles.tabLabel}>  พนักงาน</Text></TabHeading>}>
                          <Staff users={this.props.users}/>
                      </Tab>
                    
                    </Tabs>
                   </Content>
                    <Footer style={{backgroundColor:"transparent",borderColor:"transparent"}}>
                         <View>
                          <Button style={{backgroundColor:Colors.baseColor,marginTop:5}} rounded onPress={this.onDoneDialog}>
                            <Icon style={{color:"#ffff"}} name="search"/><Text style={{color:"#ffff"}}>  ค้นหา</Text>
                          </Button>
                        </View>
                         <View style={{borderLeftColor:Colors.baseColor,marginLeft:5}}>
                          <Button style={{backgroundColor:Colors.baseColor,marginTop:5}} rounded onPress={this.cancelDialog}>
                            <Icon style={{color:"#ffff"}} name="times"/><Text style={{color:"#ffff"}}>  ยกเลิก</Text>
                          </Button>
                        </View>
                    </Footer>
                </Container>
           
        );
    }
}
const styles = StyleSheet.create({
  tabIcon:{
    color:Colors.baseColor,
    fontSize:responsiveFontSize(2)
  },
  tabLabel:{
    color:Colors.baseColor,
    fontFamily:'Kanit',
    fontSize:responsiveFontSize(1.5)
  },
  tabHeading:{
    borderRightWidth: 1,
    borderColor:Colors.backgroundColor
  },
  HeaderFont:{
    color:"#FFFF",
    fontFamily:"Kanit",
    fontSize:responsiveFontSize(2)
  },
  buttonStyle: {
    position: "absolute",
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "blue"
  }
});