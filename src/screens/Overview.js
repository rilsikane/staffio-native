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
import {disbackButton} from '../utils/staffioUtils'
import I18n from '../utils/i18n'

const IconTello = createIconSetFromFontello(fontelloConfig);

export default class Overview extends React.Component {
    componentWillMount(){
		disbackButton();
	}
    constructor(props) {
        super(props);
        this.onContactSelected = this.onContactSelected.bind(this);
        this.state = { isLoading: false, data: [], modalVisible: false };
        this.closeDialog = this.closeDialog.bind(this);

    }

    async  componentDidMount() {
        const userData = await store.get("USER");
        if(this.props.isProj){
            let dataperson = await this.dataperson(userData, this.props.data)
            this.setState({ data: dataperson })
        }else{
            let dataperson = await this.datapersonOrg(userData, this.props.data)
            this.setState({ data: dataperson })
        }    
       
        this.setState({ user: userData });
        if (userData) {
            TimerMixin.setTimeout(() => {
                this.setState({ isLoading: false });
            }, 1000);
        }
    }

    async dataperson(user, data){
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
        this.setState({isLoading:false})
        if(response){
        // console.log('นี่response2นะ'+JSON.stringify(response));
        const response2 = response.EmpDetails;
        return response2;
        }else{
            this.setState({isLoading:false})
            return null;
        }
        

    }
    async datapersonOrg(user, data){
        params = {}
        params.orgCode = user.ORG_CODE;
        params.unitCode = data.orgCode;
        params.shftDate = new Date().toISOString();

        const response = await post("GetDashBoradOrgDetail", params);
        if(!response){
            this.setState({isLoading:false})
        }
        return response.empDetail
    }
    closeDialog() {
        this.props.navigator.pop({
            animated: true, // does the pop have transition animation or does it happen immediately (optional)
            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
          });
    }


    onContactSelected(url) {
        return Linking.openURL(url);
    }

    render() {
            return (
                
                <Container style={{flex:1,backgroundColor: '#fee2c8'}}>
                    <Header style={styles.Header}>
                            <Left>
                                <Icon name='chevron-left' style={{ color: 'white'
                                , fontSize: responsiveFontSize(2.5)}} onPress={this.closeDialog} />
                            </Left>
                            <Body>
                                <Text style={styles.Text}>{I18n.t('overViewOverView')}</Text>
                            </Body>
                            <Right>
                                {/*<Icon name='menu' style={{ color: 'white' }} />*/}
                            </Right>
                        </Header> 
                      <Content style={{flex:1}}>
                        <View style={{paddingTop:5,flex:1}}>
                            <View style={{marginLeft:responsiveWidth(1.5),marginRight:responsiveWidth(1.5)}}>
                                <CardProgress  data={this.props.data}  isProj={this.props.isProj}></CardProgress>
                            </View>
                            <ScrollView>
                                <View style={{ alignItems: 'center', justifyContent: 'center',paddingTop:5}}>
                                    {this.state.data && this.state.data.length>0 && this.state.data.map((val) => {
                                        return (
                                            <CardCheckin key={val.empCode} data={val} onContactSelected={this.onContactSelected} >
                                            </CardCheckin>);
                                        
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    </Content>
                    <Loading visible={this.state.isLoading} text="Loading..." />
                </Container>

            );
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
