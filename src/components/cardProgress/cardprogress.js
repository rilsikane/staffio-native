import React, { Component } from 'react';
import {
    Container, Header, Left, Body, Right, Button, Title, Text, View, Content, List, ListItem, Thumbnail, CardItem, Card, Footer, FooterTab, Badge

} from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ProgressCircle from 'react-native-progress-circle'
import { ScrollView,TouchableOpacity } from 'react-native';
import store from 'react-native-simple-store';
import { post } from '../../api';
import Overview from'../../screens/Overview';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import fontelloConfig from '../../../assets/fonts/config.json';
import I18n from '../../utils/i18n';

const IconTello = createIconSetFromFontello(fontelloConfig);

export default class CardProgress extends React.Component {
    constructor(props) {
        super(props);
        this.DashBorad = this.DashBorad.bind(this);
       
       
    }



    changcolor(progress) {
        if (progress < 31) {
            color = "#ad262b"
            return color
        } else if (progress <= 79) {
            color = "#f8c618"
            return color
        } else if (progress >= 80) {
            color = "#37b078"
            return color
        }
    }

    color(color) {
        if (color < 31) {
            return { color: "#ad262b", fontSize: responsiveFontSize(2.2) ,fontWeight:"500",backgroundColor:"transparent"}
        } else if (color <= 79) {
            return { color: "#f8c618", fontSize: responsiveFontSize(2.2) ,fontWeight:"500",backgroundColor:"transparent"}
        } else if (color >= 80) {
            return { color: "#37b078", fontSize: responsiveFontSize(2.2) ,fontWeight:"500",backgroundColor:"transparent"}
        }
    }
    DashBorad(data) {
        if(!this.props.DashBorad){
            return;
        }
        this.props.DashBorad(data);
    }

    bgColor(percent){
        if(percent == 0){
            color = "red"
            return color
        }else {
            color = "#999"
            return color
        }
    }   

    checkpercent(percent){
        return  parseInt(percent) 
    }
    render() {
        return (

            <View style={{flex:1}}>
                <TouchableOpacity  onPress={(e)=>this.DashBorad(this.props.data)}>
                    <CardItem style={styles.cardContainer}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.circle}>
                            {/* percent={((this.props.data.empStatus * 100) / this.props.data.empAmount ) */}
                                <ProgressCircle percent={this.props.data.empStatus}
                                    radius={30}
                                    borderWidth={3}
                                    color={this.changcolor(this.props.data.empStatus )}
                                    shadowColor={this.bgColor(this.props.data.empStatus)}
                                    bgColor="#fff" >
                                    <Text style={this.color(this.props.data.empStatus)}>{this.checkpercent(this.props.data.empStatus) + '%'}</Text>
                                </ProgressCircle>
                            </View>
                            <View style={styles.square2} />
                        </View>
                        <Body style={{ justifyContent: 'center' }}>
                            <Text style={styles.Text1}>    {this.props.isProj ? this.props.data.projectName : this.props.data.orgName}</Text>
                            {this.props.isProj && (<CardItem style={{paddingTop:6,backgroundColor:'transparent'}}>
                                {/* <Text style={styles.Text2}>{I18n.t('PlaceWork')}</Text> */}
                                <IconTello  name="hhmm-15" style={{fontSize : responsiveFontSize(1.6),color:"#ffa83e"}}>
                                </IconTello>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.Text3}> {this.props.data.branchName}</Text>
                            </CardItem>)}
                            <CardItem style={this.props.isProj ? { height: responsiveHeight(0.1) ,paddingTop:6} :{ height: responsiveHeight(0.1) ,paddingTop:20}}>
                                <Icon name='user' style={styles.Text1}/>
                                <Text style={styles.Text4}>{this.props.data.empAmountDesc} </Text>
                                <Text style={styles.Text5}>{I18n.t('DeptTime')}</Text>
                            </CardItem>
                        </Body>
                    </CardItem>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = ({
    Text1: {
        fontFamily: 'Kanit',
        color: '#785a4f',
        fontSize: responsiveFontSize(1.9),
        backgroundColor:'transparent',
        fontWeight:'500'
    },
    Text2: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5),
        backgroundColor:'transparent',
        color:"#989898",
        fontWeight:'500'
        
    },
    Text3: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5),
        backgroundColor:'transparent',
        color:"#ffa83e",
        flex:1
       
    },
    Text4: {
        paddingLeft:5,
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.7),
        color:"#785a4f",
        backgroundColor:'transparent',
        fontWeight:'500'
    },
     Text5: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.6),
        color:"#989898",
        backgroundColor:'transparent',
        fontWeight:'500'
    },
    circle: {
        width: 65,
        height: 65,
        borderRadius: 70 / 2,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5E5E5',
    },
    square: {
        height: 3,
        width: 35,
        backgroundColor: '#ffff',
        alignItems: 'center',
        flex: null,
        justifyContent: 'center'
    },
    square2: {
        marginTop:4,
        height: 3,
        width: 26,
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
        flex: null,
        justifyContent: 'center'
    },
    card:{
         height: responsiveHeight(14), 
         width: responsiveWidth(90),
         paddingLeft:responsiveWidth(2),
         paddingRight:responsiveWidth(2),
         paddingTop:5,
         justifyContent:"center"
    },
    cardContainer:{
        flex:1,
        height:responsiveHeight(14),
        backgroundColor:'#fff',
        borderRadius:5,
        justifyContent:"center"
    }
});
