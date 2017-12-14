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

    DashBorad() {
        this.props.DashBorad();
    }

    render() {
        return (

            <View>
                <Button style={{ height: 120, width: 390 }} onPress={(e)=>this.DashBorad()}>
                    <CardItem style={{ height: 120, width: 390 }}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.circle}>
                                <ProgressCircle

                                    percent={this.props.data.empAmount}
                                    radius={40}
                                    borderWidth={6}
                                    color={this.changcolor(this.props.data.empAmount)}
                                    shadowColor="#999"
                                    bgColor="#fff"

                                >
                                    <Text style={this.color(this.props.data.empAmount)}>{this.props.data.empAmount + '%'}</Text>
                                </ProgressCircle>
                            </View>
                            <View style={styles.square} />
                            <View style={styles.square2} />
                        </View>
                        <Body>
                            <Text style={styles.Text1}>    {this.props.data.projectName}</Text>
                            <CardItem>
                            </CardItem>
                            <CardItem style={{ height: responsiveHeight(0.1) }}>
                                <Icon name='person' />
                                <Text style={styles.Text4}>{this.props.data.empAmount * 10 / 100} / 10    </Text>
                                <Text style={styles.Text4}>พนักงานที่ลงเวลา</Text>
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