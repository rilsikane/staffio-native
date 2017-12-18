import React, { Component } from 'react';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Text,
    View,
    Content,
    List,
    ListItem,
    Thumbnail,
    CardItem,
    Card,
    Footer,
    FooterTab,
    Badge

} from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Progress from '../components/cardProgress/index';
import ProgressCircle from 'react-native-progress-circle'
import store from 'react-native-simple-store';
import TimerMixin from 'react-timer-mixin';
import Spinner from 'react-native-loading-spinner-overlay';
//import Progress from '../components/cardProgress/testindex';
import { ScrollView , Linking} from 'react-native';
import { post, post1 } from '../api';
import CardCheckin from '../components/cardCheckin/Cardcheckin';

//import Icon from 'react-native-vector-icons/FontAwesome';
//import { observer, inject } from 'mobx-react';
//import { post } from '../api';
//@inject('searchStore')
//@observer
export default class Overview extends React.Component {
    constructor(props) {
        super(props);
       
        data = this.props.data;
       
        //console.log('นี่   this.projectView นะครับ' +   JSON.stringify( data)); 
        this.checkin = [{name : 'Pramot sudjai', position : '004901 solution specialist', location : 'the mail', checkin : 'false', url : 'https://wix.github.io/react-native-navigation/#/deep-links'},
        {name : 'Anuwat Phetaum', position : '004901 solution specialist', location : 'the mail', checkin : 'true', url : 'https://wix.github.io/react-native-navigation/#/deep-links'}, 
        {name : 'Preecha Satbut', position : '004901 solution specialist', location : 'the mail', checkin : 'true', url : 'https://wix.github.io/react-native-navigation/#/deep-links'},
        {name : 'Sarin  Rubtong', position : '004901 solution specialist', location : 'the mail', checkin : 'true', url : 'https://wix.github.io/react-native-navigation/#/deep-links'}, 
        {name : 'Piranan  Naja', position : '004901 solution specialist', location : 'the mail', checkin : 'true', url : 'https://wix.github.io/react-native-navigation/#/deep-links'}, 
        {name : 'Worrawat  RO', position : '004901 solution specialist', location : 'the mail', checkin : 'true', url : 'https://wix.github.io/react-native-navigation/#/deep-links'}, 
        {name : 'Sittichok  Boom', position : '004901 solution specialist', location : 'the mail', checkin : 'true', url : 'https://wix.github.io/react-native-navigation/#/deep-links'}, 
        {name : 'Kritsada  DJ', position : '004901 solution specialist', location : 'the mail', checkin : 'true', url : 'https://wix.github.io/react-native-navigation/#/deep-links'}]
        this.onContactSelected = this.onContactSelected.bind(this);
        this.state = { isLoading: true, data :[] };
       
    }

    async  componentDidMount() {
        const userData = await store.get("USER");
        //console.log('User นะครัช ' + JSON.stringify(JSON.stringify(userData) + "นี่ข้อมูล" + JSON.stringify(data)))
        const dataperson = await this.dataperson(userData,data)

        this.setState({data : dataperson})
        this.setState({ user: userData });
        if (userData) {
            TimerMixin.setTimeout(() => {
                this.setState({ isLoading: false });
            }, 1000);
        }
    }

    dataperson = async (user,data) => {
        //console.log('ถึงนี่ละสาส')
        params = {}
        params.orgCode = user.ORG_CODE;
        params.projectCode = data.projectCode;
        params.currentDate = '2017-11-15';
        params.currentTime = '12:30';
        const response = await post("GetDashBoradProjectDetail", params);
        //console.log('response นะจ๊ะ' + JSON.stringify(response));
        const response2 = response.EmpDetails;
        //console.log('response นะจ๊ะ2' + JSON.stringify(response2));
        return response2;

        // const state = response.data;
        // Object.keys(this.state).forEach(key => { projectName[key] = this.state[key]; });
        // this.setState({ state })

        // console.log('นี่ this.State' + JSON.stringify(this.state))

    }



    changcolor(progress){ //เปลี่ยนสี
        if (progress < 31 ) {
            color="#f16061"
            return color   
        }else if (progress <= 79){
            color="#fdbd3a" 
            return color
        }else if (progress >= 80){
            color = "#229d9e"
            return color
        }
    }

    color(color){
        if (color <31){
            return   {color:"#f16061",fontSize: 18}
        }else if (color <= 79){
            return   {color:"#fdbd3a",fontSize: 18}
        }else if (color >= 80){
            return   {color:"#229d9e",fontSize: 18}
        }
    }

    check(checkin){
        var a = 0
        for(i = 0 ; i < checkin.length ; i++){
            if(checkin[i].timeRecord != null && checkin[i].timeRecord != "" ){
                a = a + 1
            }
        }
        return a
    }

    onContactSelected(url) {
        return Linking.openURL(url);
    }

    
    render() {
        if (this.state.isLoading)
        //return (<View style={styles.container}>{this.loading()}</View>)
        return null;
    else
        return (
          
            <Container style={{ backgroundColor: '#FFCCFF' }}>
                <Header style={styles.Header}>
                    <Icon name='home' style={{ color: 'white' }} />
                    <Body style={{ alignItems: "center" }}>
                        <Title style={styles.Text}>ภาพรวม...</Title>
                    </Body>
                    <Icon name='menu' style={{ color: 'white' }} />
                </Header>
               
                   
                <Body>
                <CardItem style={{height: responsiveHeight(18), width:  responsiveWidth(95) }}>
                <View style={{alignItems : 'center' }}>
                <View style={styles.circle}>
                <ProgressCircle
                 
                    percent  = {this.check(this.state.data) *100 / this.state.data.length}
                    radius={40}
                    borderWidth={6}
                    color= {this.changcolor(this.check(this.state.data) *100 / this.state.data.length)}
                    shadowColor="#999"
                    bgColor="#fff"
                    
                >
                <Text style={this.color(this.state.data.length * 10)}>{this.check(this.state.data) *100 / this.state.data.length +'%'}</Text>
                </ProgressCircle>
                </View>
                <View style={styles.square}/>
                <View style={styles.square2}/>
                </View>
                <Body>
                    <Text style={styles.Text1}>    งานแสดงสินค้า  Mega sell 2017</Text>
                    <CardItem>
                        <Text style={styles.Text2}>สถานที่เข้างาน </Text>
                        <Badge danger >
                            <Text>1</Text>
                        </Badge>
                        <Text style={styles.Text3}> เดอะมอลล์ท่าพระ</Text>
                    </CardItem>
                    <CardItem style={{ height:responsiveHeight(0.1)}}>
                    <Icon name='person'/>
                    <Text style={styles.Text4}> {this.check(this.state.data)} / {this.state.data.length} </Text>
                    <Text style={styles.Text4}>พนักงานที่ลงเวลา</Text>
                    </CardItem>
                </Body>
            </CardItem>
            <Text />
            <ScrollView>
            <View style={{alignItems : 'center',justifyContent: 'center',}}>
            { this.state.data.map((val) => {
                    return (
                    <CardCheckin key={val.fullNameTh}  data={val}  onContactSelected={this.onContactSelected} >
                    </CardCheckin>);
                    })} 
            

            </View>
            </ScrollView>
            </Body>
            

     
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
const styles = ({
    Text: {
        fontFamily: 'Kanit',
        color: 'white'
    },
    Header: {
        backgroundColor: 'orange',
        height: 33
    },
    Text1: {
        fontFamily: 'Kanit',
        color: 'brown',
        fontSize: responsiveFontSize(1.5)
    },
    Text2: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5)
    },
    Text3: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5)
    },
    Text4: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5)
    }
});
