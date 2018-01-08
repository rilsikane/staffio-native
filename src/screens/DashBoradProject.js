import React, { Component } from 'react';
import {
    Container, Header, Tabs, Tab, TabHeading, Left, Body, Right, Button, Title, Text, View, Content, List, ListItem, Thumbnail, CardItem, Card, Footer, FooterTab, Badge

} from 'native-base';
import { ScrollView, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ProgressCircle from 'react-native-progress-circle'
import CardProgress from '../components/cardProgress/cardprogress';
import CardPro from '../components/cardProgress/cardpro';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationActions } from'react-navigation';
import TimerMixin from 'react-timer-mixin';
import Icon from 'react-native-vector-icons/FontAwesome';
import store from 'react-native-simple-store';
import { post, post1 } from '../api';
import Loading from '../components/loading';
import Colors from '../constants/Colors'


export default class DashBoradProject extends React.Component {
    constructor(props) {
        super(props);
        navigator = this.props.navigator
        this.state = { isLoading: true,users:[],projectView:[],dataperson: []};
        this.progress = [{ location: 'the mail', staffcount: 50 }, { location: 'terminal 21', staffcount: 30 }, { location: 'terminal 22', staffcount: 80 }];
        //this.projectView
        this.cancelDialog = this.cancelDialog.bind(this);
        this.DashBorad = this.DashBorad.bind(this);
        
        //this.changDialog = this.changDialog.bind(this);
        // this.checkin = [{projectName : "staffio1",empStatus : 4,empAmount:6,projectCode:"PJ_00428_002",orgCode: "01344"},
        // {projectName : "staffio2",empStatus : 1,empAmount:6,projectCode:"PJ_00428_002",orgCode: "01344"},
        // {projectName : "staffio3",empStatus : 6,empAmount:6,projectCode:"PJ_00428_002",orgCode: "01344"},
        // {projectName : "staffio4",empStatus : 5,empAmount:6,projectCode:"PJ_00428_002",orgCode: "01344"},
        // {projectName : "staffio5",empStatus : 5,empAmount:6,projectCode:"PJ_00428_002",orgCode: "01344"},
        // {projectName : "staffio6",empStatus : 5,empAmount:6,projectCode:"PJ_00428_002",orgCode: "01344"}]
    }

    async  componentWillMount() {
        const userData = await store.get("USER");
        const projectView = await this.projectView(userData)
  

    
        this.setState({projectView : projectView})
        this.setState({ user: userData });
        if (userData) {
            TimerMixin.setTimeout(() => {
                this.setState({ isLoading: false });
            }, 1000);
        }
    }

    cancelDialog() {
        this.props.cancelDialog();
    }

    DashBorad(data){
        //  this.setState({isLoading:true});
        //  this.setState({modalVisible:true});
        //  setTimeout(()=>{
        //    this.setState({isLoading:false});
        //  },500);
         //this.setState({modalVisible:true});
          this.props.navigator.showModal({
            screen: "staffio.Overview", // unique ID registered with Navigation.registerScreen
            title: "Modal", // title of the screen as appears in the nav bar (optional)
            passProps: {data:data,projectView : this.state.projectView,cancelDialog:this.cancelDialog,onDoneDialog:this.onDoneDialog,closeDialog:this.closeDialog,
            DashBorad:this.DashBorad,navigation: this.props.navigator.setOnNavigatorEvent,locations:this.state.locations,statuses:this.state.statuses,users:this.state.users}, // simple serializable object that will pass as props to the modal (optional)
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
          });
      }
    
    

    projectView = async (user) => {
        params = {}
        params.empCode = user.EMP_CODE;
        params.orgCode = user.ORG_CODE;
        //params.shftDate = new Date();
        console.log('นีนะครัช' + params.orgCode);
        const response = await post("GetDashBoradProjectDetailsOrg", params);
        const response2 = response.data;
        //console.log('นี่นะ response2' + response2);
        return response2;

        // const state = response.data;
        // Object.keys(this.state).forEach(key => { projectName[key] = this.state[key]; });
        // this.setState({ state })

    }

    render() {
        if (this.state.isLoading)
            return  <Loading visible={this.state.isLoading} text="Loading..."/>
            //return null;
        else
            return (
                <Container style={{paddingTop:22,flex:1, width: responsiveWidth(100), height: responsiveHeight(100), backgroundColor:  '#fee2c8'}}>
                    <Content>
                        <ScrollView>
                            <View style={{ backgroundColor: '#fee2c8' }}>
                                <Body style={{ backgroundColor: '#fee2c8' }}>
                                    <CardItem style={{ backgroundColor: '#fee2c8', height: responsiveHeight(5) }}>
                                        <CardItem style={{ backgroundColor: '#fee2c8', height: responsiveHeight(5) }} >
                                            <Icon name='calendar' />
                                            <Text style={{ fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit' }}>การลงเวลาเข้างาน</Text>
                                        </CardItem>
                                        <CardItem style={{ backgroundColor: '#fee2c8' }} >
                                            <Icon name='refresh' />
                                            <Text style={{ fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit' }}>ดึงข้อมูล </Text>
                                            <Text style={{ fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit', color: 'orange' }}>: 21 นาทีที่แล้ว </Text>
                                        </CardItem>
                                    </CardItem>

                                    <Tabs  initialPage={0} tabBarUnderlineStyle={{ backgroundColor: Colors.baseColor }}>
                                        <Tab  style={{backgroundColor: '#fee2c8'}}  heading={<TabHeading style={styles.tabHeading}>
                                        <Icon name="building" style={styles.tabIcon} />
                                        <Tab style={{alignItems:'center',justifyContent:'center'}}>
                                        <Text style={styles.tabLabel}>  Project View</Text>
                                        <Text style={styles.tabLabel}>  มุมมองของโครงการ</Text>
                                        </Tab>
                                        </TabHeading>}>
                                            {this.state.projectView.map((val) => {

                                                return (
                                                    <CardProgress key={val.projectName} data={val} DashBorad={this.DashBorad} >
                                                    </CardProgress>);
                                            })}
                                          
                                        </Tab>
                                        <Tab   style={{backgroundColor: '#fee2c8'}}  heading={<TabHeading style={styles.tabHeading}>
                                        <Icon name="sitemap" style={styles.tabIcon} />
                                        <Tab style={{alignItems:'center',justifyContent:'center'}}>
                                        <Text style={styles.tabLabel}>  Organization</Text>
                                        <Text style={styles.tabLabel}>  เรียงตามโครงสร้างองค์กร</Text>
                                        </Tab>
                                        </TabHeading>}>
                                            {this.state.projectView.map((val) => {
                                                return (
                                                    <CardPro key={val.projectName} data={val} DashBorad={this.DashBorad} >
                                                    </CardPro>);
                                            })}
                                        </Tab>
                                    </Tabs>
                                   
                                </Body>
                            </View>
                        </ScrollView>
                    </Content>
                    <Footer style={{ backgroundColor: '#fee2c8', borderColor: '#fee2c8' }}>
                        <View >
                            <Button style={{ backgroundColor: '#f58020', alignItems: 'center', justifyContent: 'center', marginTop: 5, width: responsiveWidth(40), height: responsiveHeight(8) }} onPress={this.cancelDialog}>
                                <Icon style={{ color: "#ffff", backgroundColor: "transparent" }} name="times" /><Text style={{ color: "#ffff" }}>  ยกเลิก</Text>
                            </Button>
                        </View>
                    </Footer>
                </Container>

            );
    }


    loading() {
        if (this.state.isLoading)
            return (<Spinner animation="fade" visible={this.state.isLoading} overlayColor="rgba(0, 0, 0, 0.4)">
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: -50 }}>
                    <SpinnerKit size={80} type={"WanderingCubes"} color="#f58020" />
                </View>
            </Spinner>);
    }
}

const styles = StyleSheet.create({
    tabIcon: {
        marginLeft : responsiveWidth(4),
        color: Colors.baseColor,
        fontSize: responsiveFontSize(4),
        backgroundColor: "transparent"
    },
    tabLabel: {
        color: Colors.baseColor,
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5),
        backgroundColor: "transparent"
    },
    tabHeading: {
        borderRightWidth: 1,
        borderColor: Colors.backgroundColor,
        backgroundColor: '#FFFF'

    },
    HeaderFont: {
        color: "#FFFF",
        fontFamily: "Kanit",
        fontSize: responsiveFontSize(2),
        backgroundColor: 'transparent'
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
