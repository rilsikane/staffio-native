import React, { Component } from 'react';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title, Text,  Content, List, ListItem, Thumbnail, CardItem, Card, Footer, FooterTab, Badge

} from 'native-base';
import { ScrollView,View, Image } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ProgressCircle from 'react-native-progress-circle'
import CardCheckin from './Cardcheckin';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../assets/fonts/config.json'
import { em } from '../../constants/Layout'
const IconTello = createIconSetFromFontello(fontelloConfig);
export default class Checkin extends React.Component {
    constructor(props) {
        super(props);
        this.onContactSelected = this.onContactSelected.bind(this);
        
        //console.log('นี imagePathPersonal' + JSON.stringify(imagePathPersonal))
    }


    onContactSelected(url) {
        this.props.onContactSelected(url);
    }

    changcolorborder(checkin) {
        if (checkin == null) {
            return { borderTopColor: 'red' }
        } else {
            return { borderTopColor: 'green' }
        }

    }


    render() {
      const data =  this.props.data
        return (
            <Content style={{ flex: 1 }}>
                <ScrollView>

                    <Card style={{ height: responsiveHeight(11), width: responsiveWidth(98), flex: 1 }}>
                        <View>
                            { data.imagePathPersonal && <Image source={{ uri: data.imagePathPersonal }} style={{ height: responsiveHeight(11), width: responsiveWidth(18)}}></Image>}
                            <View style={[styles.box1, this.changcolorborder( data.timeRecord)]} />
                        </View>
                        <View style={{marginTop : responsiveHeight(4) , width :responsiveWidth(50)}}>
                            <Text style={styles.Text1}>    { data.fullNameTh}</Text>
                            <Text note style={styles.Text2}>     { data.empCode}  { data.positionNameTh}</Text>
                        </View>

                        <View style={{marginTop : responsiveHeight(2) }}>
                        <CardItem style={{marginRight : responsiveWidth(2) }}>
                            <Button style={styles.icon}>
                                <IconTello style={{ color: "yellow" }} size={em(2)} name="hhmm-17" />
                            </Button>
                            <Button style={styles.icon}>
                                <IconTello style={{ color: "blue" }} size={em(2)} name="hhmm-18" />
                            </Button>
                            <Button style={styles.icon} onPress={(e) => this.onContactSelected( data.lineID)}>
                                <IconTello style={{ color: "green" }} size={em(2)} name="hhmm-20" />
                            </Button>
                        </CardItem>
                        </View>




                    </Card>
                </ScrollView>
            </Content>


        );
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
        fontSize: responsiveFontSize(1.2)
    },
    Text3: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5)
    },
    Text4: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5)
    },
    icon: {
        height: responsiveHeight(4),
        width: responsiveWidth(8),
        borderRadius: responsiveWidth(8 / 2),
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box1: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: responsiveWidth(8),
        borderTopWidth: responsiveWidth(8),
        borderRightColor: 'transparent'
    },
    container: {
        flex: 1
    }
});

