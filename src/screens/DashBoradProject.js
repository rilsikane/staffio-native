import React, { Component } from 'react';
import {
    StyleProvider,Container, Header, Tabs, Tab, TabHeading, Left, Body, Right, Button, Title, Text, View, Content, List, ListItem, Thumbnail, CardItem, Card, Footer, FooterTab, Badge

} from 'native-base';
import { ScrollView, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ProgressCircle from 'react-native-progress-circle'
import CardProgress from '../components/cardProgress/cardprogress';
import CardNone from '../components/cardProgress/cardNone';
import CardPro from '../components/cardProgress/cardpro';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationActions } from'react-navigation';
import TimerMixin from 'react-timer-mixin';
import Icon from 'react-native-vector-icons/FontAwesome';
import store from 'react-native-simple-store';
import { post, post1 } from '../api';
import Loading from '../components/loading';
import Colors from '../constants/Colors'
import getTheme from '../../native-base-theme/components';


export default class DashBoradProject extends React.Component {
    constructor(props) {
        super(props);
        navigator = this.props.navigator
        this.state = { isLoading: true,users:[],projectView:[],dataperson: [],tabIndex:0,orgView:[]};
        this.progress = [{ location: 'the mail', staffcount: 50 }, { location: 'terminal 21', staffcount: 30 }, { location: 'terminal 22', staffcount: 80 }];
        //this.projectView
        this.cancelDialog = this.cancelDialog.bind(this);
        this.DashBorad = this.DashBorad.bind(this);
        this.changeTab = this.changeTab.bind(this);
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
    async changeTab(i, ref){      
      this.setState({tabIndex:i.i});
      if(i.i == 1){
        if(this.state.orgView.length ==0){
            const userData = await store.get("USER");  
            const data = await this.orgView(userData);
            this.setState({orgView:data});
        }
      }
    }

    cancelDialog() {
        this.props.cancelDialog();
    }

    DashBorad(data){
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
        const response = await post("GetDashBoradProjectDetailsOrg", params);
        const response2 = response.data;
        return response2;
    }
    orgView = async (user) => {
        params = {}
        params.empCode = user.EMP_CODE;
        params.orgCode = user.ORG_CODE;
        //params.shftDate = new Date("2018-01-23T13:00:00Z").toISOString();
        //console.log("GetDashBoradOrgParam",params);
        const response = await post("GetDashBoradOrg", params);
        return response.data;
    }

    render() {
        if (this.state.isLoading)
            return  <Loading visible={this.state.isLoading} text="Loading..."/>
            //return null;
        else
            return (
                <StyleProvider  style={getTheme()}>  
                    <Container style={{paddingTop:22,flex:1, width: responsiveWidth(100), height: responsiveHeight(100), backgroundColor:  '#fee2c8'}}>
                        <Content>
                            <ScrollView>
                                <View style={{ backgroundColor: '#fee2c8' }}>
                                    <Body style={{ backgroundColor: '#fee2c8' }}>
                                        <CardItem style={{ backgroundColor: '#fee2c8', height: responsiveHeight(5),flex:1,paddingLeft:0,paddingRight:0}}>
                                            <CardItem style={{ backgroundColor: '#fee2c8', height: responsiveHeight(5),justifyContent:"flex-start",paddingLeft:10}} >
                                                <Icon name='calendar' style={{color:"#785e52"}}/>
                                                <Text style={styles.headerFont1}>การลงเวลาเข้างาน</Text>
                                            </CardItem>
                                            <CardItem style={{ backgroundColor: '#fee2c8' ,justifyContent:"flex-end",flex:1,paddingRight:10}} >
                                                <Icon name='refresh' style={{color: "#989898"}}/>
                                                <Text style={{ fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit', backgroundColor:'transparent',color: "#989898",paddingLeft:5,fontWeight:"500"}}>ดึงข้อมูลล่าสุด </Text>
                                                <Text style={{ fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit', color: 'orange', backgroundColor:'transparent',fontWeight:"500"}}>: 21 นาทีที่แล้ว </Text>
                                            </CardItem>
                                        </CardItem>

                                        <Tabs onChangeTab={this.changeTab} initialPage={0} tabBarUnderlineStyle={{backgroundColor:"transparent"}}>
                                            <Tab style={{backgroundColor: '#fee2c8',marginTop:15}}  heading={
                                            <TabHeading style={styles.tabHeading}>
                                                <Icon name="building" style={this.state.tabIndex == 0 ? styles.tabIconActive:styles.tabIcon} />
                                                <View style={{flexDirection:"column"}}>
                                                <Text style={[styles.tabLabel,this.state.tabIndex == 0 && {color:"#ffa83e"}]}>  Project View</Text>
                                                <Text style={styles.tabLabel2}>  มุมมองของโครงการ</Text>
                                                </View>
                                            </TabHeading>}>
                                                {(this.state.projectView && this.state.projectView.length > 0) && this.state.projectView.map((val) => {

                                                    return (
                                                        <View key={val.projectName} style={{marginLeft:responsiveWidth(2.5),marginRight:responsiveWidth(2.5)
                                                        ,paddingTop:responsiveHeight(1)}}>
                                                        <CardProgress  data={val} DashBorad={this.DashBorad} isProj={true}>
                                                        </CardProgress>
                                                        </View>
                                                        );
                                                })}
                                                {this.state.projectView.length == 0 && (<View style={{marginLeft:responsiveWidth(2.5),marginRight:responsiveWidth(2.5)
                                                        ,paddingTop:responsiveHeight(1)}}><CardNone /></View>)}
                                            
                                            </Tab>
                                            <Tab   style={{backgroundColor: '#fee2c8',marginTop:15}}  heading={
                                            <TabHeading style={styles.tabHeading2}>
                                                <Icon name="sitemap" style={this.state.tabIndex == 1 ? styles.tabIconActive:styles.tabIcon} />
                                                <View style={{flexDirection:"column"}}>
                                                    <Text style={[styles.tabLabel,this.state.tabIndex == 1 && {color:"#ffa83e"}]}>  Organization</Text>
                                                    <Text style={styles.tabLabel2}>  เรียงตามโครงสร้างองค์กร</Text>
                                                </View>
                                            </TabHeading>}>
                                                {this.state.orgView.length > 0 ? this.state.orgView.map((val) => {
                                                    return (
                                                        <View key={val.projectName} style={{paddingTop:responsiveHeight(1),marginLeft:responsiveWidth(2.5),marginRight:responsiveWidth(2.5)}}>
                                                        <CardProgress  data={val} DashBorad={this.DashBorad} isOrg={true}>
                                                        </CardProgress>
                                                        </View>
                                                        );
                                                }):(<View style={{marginLeft:responsiveWidth(2.5),marginRight:responsiveWidth(2.5)
                                                        ,paddingTop:responsiveHeight(1)}}><CardNone /></View>)}
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
                </StyleProvider>
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
        color: "#989898",
        fontSize: responsiveFontSize(4),
        backgroundColor: "transparent"
    },
    tabIconActive: {
        marginLeft : responsiveWidth(4),
        color: "#ffa83e",
        fontSize: responsiveFontSize(4),
        backgroundColor: "transparent"
    },
    tabLabel: {
        color: "#785e52",
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.7),
        backgroundColor: "transparent",
        fontWeight:"500"
    },
    tabLabel2: {
        color: "#989898",
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.2),
        backgroundColor: "transparent"
    },
    tabHeading: {
        borderRightWidth: 1,
        borderColor: Colors.backgroundColor,
        backgroundColor: '#FFFF',
        width:responsiveWidth(44),
        height:responsiveHeight(10.5),
        marginLeft:responsiveWidth(5),
        marginRight:responsiveWidth(2),
        flex:0,
        borderRadius:5,
        justifyContent:"flex-start"
    },
    tabHeading2: {
        borderRightWidth: 1,
        borderColor: Colors.backgroundColor,
        backgroundColor: '#FFFF',
        width:responsiveWidth(44),
        height:responsiveHeight(10.5),
        marginRight:responsiveWidth(5),
        marginLeft:responsiveWidth(2),
        flex:0,
        borderRadius:5,
        justifyContent:"flex-start"
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
    },
    headerFont1:{ 
        fontSize: responsiveFontSize(1.7), 
        fontFamily: 'Kanit', 
        backgroundColor:'transparent',
        color:"#785e52",
        fontWeight:"500",
        paddingLeft:5
    }
});
