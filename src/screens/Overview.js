import React, { Component } from 'react';
import {
    Container,Header,Left,Body, Right,Button,Title,Text,View,Content,List,ListItem,Thumbnail,
    CardItem,Card,Footer,FooterTab,Badge
} from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import CardProgress from '../components/cardProgress/cardprogress';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import fontelloConfig from '../../assets/fonts/config.json';
const IconTello = createIconSetFromFontello(fontelloConfig);

export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.onContactSelected = this.onContactSelected.bind(this);
        this.state = { isLoading: true, data: [], modalVisible: false };
        this.closeDialog = this.closeDialog.bind(this);

    }

    async  componentWillMount() {
        const userData = await store.get("USER");
        const dataperson = await this.dataperson(userData, this.props.data)

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
        //console.log('นี่ day นะ' + day);
        params.currentDate = day;
        var time = new Date();
        time = time.toString();
        time = time.substring(16,21);
        //console.log('นี่ time นะ' + time);
        params.currentTime = time;
        const response = await post("GetDashBoradProjectDetail", params);
        // console.log('นี่response2นะ'+JSON.stringify(response));
        const response2 = response.EmpDetails;
        return response2;

    }
    closeDialog() {
        this.props.navigator.dismissModal({
            animationType: 'slide-down'
        });
    }


    onContactSelected(url) {
        return Linking.openURL(url);
    }

    render() {
        if (this.state.isLoading)
            return <Loading visible={this.state.isLoading} text="Loading..." />;
        else
            return (
                
                <Container style={{flex:1,backgroundColor: '#fee2c8'}}>
                    <Header style={styles.Header}>
                            <Left>
                                <Icon name='chevron-left' style={{ color: 'white'
                                , fontSize: responsiveFontSize(2.5)}} onPress={this.closeDialog} />
                            </Left>
                            <Body>
                                <Text style={styles.Text}>ภาพรวม</Text>
                            </Body>
                            <Right>
                                {/*<Icon name='menu' style={{ color: 'white' }} />*/}
                            </Right>
                        </Header> 
                      <Content style={{flex:1}}>
                        <View style={{paddingTop:5,flex:1}}>
                            <View style={{marginLeft:responsiveWidth(1.5),marginRight:responsiveWidth(1.5)}}>
                                <CardProgress  data={this.props.data}  isProj={true}></CardProgress>
                            </View>
                            <ScrollView>
                                <View style={{ alignItems: 'center', justifyContent: 'center',paddingTop:5}}>
                                    {this.state.data.map((val) => {
                                        return (
                                            <CardCheckin key={val.fullNameTh} data={val} onContactSelected={this.onContactSelected} >
                                            </CardCheckin>);
                                        
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    </Content>
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
        color: 'white',
        backgroundColor:'transparent',
        fontSize: responsiveFontSize(2.5)
    },
    Header: {
        backgroundColor: 'orange'
    },
    Text1: {
        fontFamily: 'Kanit',
        color: 'brown',
        fontSize: responsiveFontSize(1.5),
        backgroundColor:'transparent'
    },
    Text2: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5),
        backgroundColor:'transparent'
    },
    Text3: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5),
        backgroundColor:'transparent'
    },
    Text4: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5),
        backgroundColor:'transparent'
    }
});
