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
import { ScrollView, Linking } from 'react-native';
import { post, post1 } from '../api';
import Loading from '../components/loading';
import CardCheckin from '../components/cardCheckin/Cardcheckin';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/fonts/config.json';
const IconTello = createIconSetFromFontello(fontelloConfig);
//import Icon from 'react-native-vector-icons/FontAwesome';
//import { observer, inject } from 'mobx-react';
//import { post } from '../api';
//@inject('searchStore')
//@observer
export default class Overview extends React.Component {
    constructor(props) {
        super(props);

        data = this.props.data;
        console.log('นี่dataนะ' + JSON.stringify(data));
        // this.checkin = [{fullNameTh : 'Pramot sudjai',imagePathPersonal:"https://staffio.g-able.com/Staffio_GABLE_API/Attachments/applicant_pics/dummy_user.png", position : '004901 solution specialist', location : 'the mail', checkin : 'false', facebook : 'https://www.google.co.th/?gws_rd=cr&dcr=0&ei=sNpNWtWwDIflvAS8saGQAw',mobileNo:'06-5553-1229'},
        // {fullNameTh : 'Anuwat Phetaum',imagePathPersonal:"https://staffio.g-able.com/Staffio_GABLE_API/Attachments/applicant_pics/dummy_user.png", position : '004901 solution specialist', location : 'the mail', checkin : 'true', mobileNo:'0655531229',lineid:'http://line.me/ti/p/9lw72vkPpq'}, 
        // {fullNameTh : 'Preecha Satbut',imagePathPersonal:"https://staffio.g-able.com/Staffio_GABLE_API/Attachments/applicant_pics/dummy_user.png", position : '004901 solution specialist', location : 'the mail', checkin : 'true', facebook : 'https://wix.github.io/react-native-navigation/#/deep-links',mobileNo:'0655531229'},
        // {fullNameTh : 'Sarin  Rubtong',imagePathPersonal:"https://staffio.g-able.com/Staffio_GABLE_API/Attachments/applicant_pics/dummy_user.png", position : '004901 solution specialist', location : 'the mail', checkin : 'true', facebook : 'https://wix.github.io/react-native-navigation/#/deep-links',mobileNo:'0655531229'}, 
        // {fullNameTh : 'Piranan  Naja',imagePathPersonal:"https://staffio.g-able.com/Staffio_GABLE_API/Attachments/applicant_pics/dummy_user.png", position : '004901 solution specialist', location : 'the mail', checkin : 'true', facebook : 'https://wix.github.io/react-native-navigation/#/deep-links',mobileNo:'0655531229'}, 
        // {fullNameTh : 'Worrawat  RO',imagePathPersonal:"https://staffio.g-able.com/Staffio_GABLE_API/Attachments/applicant_pics/dummy_user.png", position : '004901 solution specialist', location : 'the mail', checkin : 'true', facebook : 'https://wix.github.io/react-native-navigation/#/deep-links',mobileNo:'0655531229'}, 
        // {fullNameTh : 'Sittichok  Boom', imagePathPersonal:"https://staffio.g-able.com/Staffio_GABLE_API/Attachments/applicant_pics/dummy_user.png",position : '004901 solution specialist', location : 'the mail', checkin : 'true', facebook : 'https://wix.github.io/react-native-navigation/#/deep-links',mobileNo:'0655531229'}, 
        // {fullNameTh : 'Kritsada  DJ',imagePathPersonal:"https://staffio.g-able.com/Staffio_GABLE_API/Attachments/applicant_pics/dummy_user.png", position : '004901 solution specialist', location : 'the mail', checkin : 'true', facebook : 'https://wix.github.io/react-native-navigation/#/deep-links',mobileNo:'0655531229'}]
        this.onContactSelected = this.onContactSelected.bind(this);
        this.state = { isLoading: true, data: [], modalVisible: false };
        this.closeDialog = this.closeDialog.bind(this);

    }

    async  componentWillMount() {
        const userData = await store.get("USER");
        console.log('นี่ user นะ' + JSON.stringify(userData));
        const dataperson = await this.dataperson(userData, data)

        this.setState({ data: dataperson })
        this.setState({ user: userData });
        console.log('นี่this.state.data' + JSON.stringify(this.state.data));
        if (userData) {
            TimerMixin.setTimeout(() => {
                this.setState({ isLoading: false });
            }, 1000);
        }
    }

    dataperson = async (user, data) => {
        params = {}
        params.orgCode = user.ORG_CODE;
        params.projectCode = data.projectCode;
        var day = new Date();
        day = day.toISOString();
        day = day.substring(0,10);
        console.log('นี่ day นะ' + day);
        params.currentDate = "2018-01-05";
        var time = new Date();
        time = time.toString();
        time = time.substring(16,21);
        console.log('นี่ time นะ' + time);
        params.currentTime = time;
        const response = await post("GetDashBoradProjectDetail", params);
         console.log('นี่response2นะ'+JSON.stringify(response));
        const response2 = response.EmpDetails;
        return response2;


        // const state = response.data;
        // Object.keys(this.state).forEach(key => { projectName[key] = this.state[key]; });
        // this.setState({ state })

    }
    closeDialog() {
        this.props.navigator.dismissModal({
            //screen: 'staffio.DashBoradProject', 
            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
    }



    changcolor(progress) { //เปลี่ยนสี
        if (progress < 31) {
            color = "#f16061"
            return color
        } else if (progress <= 79) {
            color = "#fdbd3a"
            return color
        } else if (progress >= 80) {
            color = "#229d9e"
            return color
        }
    }

    color(color) {
        if (color < 31) {
            return { color: "#f16061", fontSize: 18 }
        } else if (color <= 79) {
            return { color: "#fdbd3a", fontSize: 18 }
        } else if (color >= 80) {
            return { color: "#229d9e", fontSize: 18 }
        }
    }
    bgColor(percent){
        if(percent == 0){
            color = "red"
            return color
        }else if(percent == 'Nan'){
            color = "#red"
            return color
        }else {
            color = "#999"
            return color
        }
    }   

    check(checkin) {
        var a = 0
        for (i = 0; i < checkin.length; i++) {
            if (checkin[i].timeRecord != null && checkin[i].timeRecord != "") {
                a = a + 1
            }
        }
        return parseInt(a);
    }

    onContactSelected(url) {
        return Linking.openURL(url);
    }

    checkpercent(percent){
        return  parseInt(percent) 
    }

    render() {
        if (this.state.isLoading)
            //return (<View style={styles.container}>{this.loading()}</View>)
            return <Loading visible={this.state.isLoading} text="Loading..." />;
        else
            return (

                <Container style={{paddingTop:22,flex:1, backgroundColor: '#fee2c8' }}>
                    <Header style={styles.Header}>
                        <Icon name='home' style={{ color: 'white' }} onPress={this.closeDialog} />
                        <Body style={{ alignItems: "center" }}>
                            <Title style={styles.Text}>ภาพรวม...</Title>
                        </Body>
                        <Icon name='menu' style={{ color: 'white' }} />
                    </Header>


                    <Body>
                        <CardItem style={{ height: responsiveHeight(18), width: responsiveWidth(98) }}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.circle}>
                                    <ProgressCircle

                                        percent={this.check(this.state.data) * 100 / this.state.data.length}
                                        radius={40}
                                        borderWidth={6}
                                        color={this.changcolor(this.check(this.state.data) * 100 / this.state.data.length)}
                                        shadowColor={this.bgColor(this.state.data)}
                                        bgColor="#fff"

                                    >
                                        <Text style={this.color(this.check((this.state.data * 100) / this.state.data.length))}>{this.checkpercent(this.check(this.state.data) * 100 / this.state.data.length) + '%'}</Text>
                                    </ProgressCircle>
                                </View>
                                <View style={styles.square} />
                                <View style={styles.square2} />
                            </View>
                            <Body>
                                <Text style={styles.Text1}>    {data.projectName}</Text>
                                <CardItem>
                                    <Text style={styles.Text2}>สถานที่เข้างาน </Text>
                                    <IconTello  name="hhmm-15" style={{fontSize : responsiveFontSize(3.5)}}>
                                    </IconTello>
                                    <Text style={styles.Text3}>{data.branchName}</Text>
                                </CardItem>
                                <CardItem style={{ height: responsiveHeight(0.1) }}>
                                    <Icon name='person' />
                                    <Text style={styles.Text4}> {this.check(this.state.data)} / {this.state.data.length} </Text>
                                    <Text style={styles.Text4}>พนักงานที่ลงเวลา</Text>
                                </CardItem>
                            </Body>
                        </CardItem>
                        <Text />
                        <ScrollView>
                            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                 {this.state.data.map((val) => {
                                                return (
                                                    <CardCheckin key={val.fullNameTh} data={val} onContactSelected={this.onContactSelected} >
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
