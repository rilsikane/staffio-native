import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title, Text, View, Content, List, ListItem, Thumbnail, CardItem, Card, Footer, FooterTab, Badge

} from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ProgressCircle from 'react-native-progress-circle'
import { ScrollView } from 'react-native';
import { NavigationActions } from'react-navigation';
import store from 'react-native-simple-store';
import { post } from '../../api';
import Overview from'../../screens/Overview';
import I18n from 'react-native-i18n';

export default class CardPro extends React.Component {
    constructor(props) {
        super(props);
        this.DashBorad = this.DashBorad.bind(this);
        
    }



    changcolor(progress) {
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

    DashBorad(data) {
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
        I18n.locale = 'en';        
        return (

            <View>
                <Button style={{ height: responsiveHeight(20), width: responsiveWidth(100) ,backgroundColor:'white'}} onPress={(e)=>this.DashBorad(this.props.data)}>
                    <CardItem style={{ height: responsiveHeight(20), width: responsiveWidth(100) }}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.circle}>
                                <ProgressCircle

                                    percent={((this.props.data.empStatus * 100) / this.props.data.empAmount )}
                                    radius={40}
                                    borderWidth={6}
                                    color={this.changcolor((this.props.data.empStatus * 100) / this.props.data.empAmount )}
                                    shadowColor={this.bgColor(this.props.data.empStatus)}
                                    bgColor="#ffff"

                                >
                                <Text style={this.color((this.props.data.empStatus * 100) / this.props.data.empAmount )}>{this.checkpercent((this.props.data.empStatus * 100) / this.props.data.empAmount ) + '%'}</Text>
                                </ProgressCircle>
                            </View>
                            <View style={styles.square} />
                            <View style={styles.square2} />
                        </View>
                        <Body>
                            <Text style={styles.Text1}>    {this.props.data.orgName}</Text>
                            <CardItem>
                            </CardItem>
                            <CardItem style={{ height: responsiveHeight(0.1) }}>
                                <Icon name='person' />
                                <Text style={styles.Text4}>{this.props.data.empStatus} / {this.props.data.empAmount}   </Text>
                                <Text style={styles.Text4}>{I18n.t('DeptTime')}</Text>
                            </CardItem>
                        </Body>
                    </CardItem>
                </Button>
                <Text />
            </View>
        );
    }
}

const styles = ({
    Text1: {
        fontFamily: 'Kanit',
        color: 'brown',
        fontSize: responsiveFontSize(1.5),
        height: responsiveHeight(2)
    },
    Text2: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5),
        height: responsiveHeight(2)
    },
    Text3: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5),
        height: responsiveHeight(2)
    },
    Text4: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5),
        height: responsiveHeight(2)
    },
    circle: {
        width: 83,
        height: 83,
        borderRadius: 100 / 2,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5E5E5',
    },
    square: {
        height: 4,
        width: 35,
        backgroundColor: '#ffff',
        alignItems: 'center',
        flex: null,
        justifyContent: 'center'
    },
    square2: {
        height: 3,
        width: 60,
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
        flex: null,
        justifyContent: 'center'
    }
});

I18n.fallbacks = true;

I18n.translations = {
  en: {
    DeptTime: 'Staff enter time',
  },
  th: {
    DeptTime: 'พนักงานที่ลงเวลา',
  },
};