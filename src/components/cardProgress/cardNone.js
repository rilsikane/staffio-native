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
import I18n from 'react-native-i18n';

const IconTello = createIconSetFromFontello(fontelloConfig);

export default class CardProgress extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        I18n.locale = 'en';
        return (

            <View style={{flex:1}}>
                    <CardItem style={styles.cardContainer}>
                        <Body style={{ justifyContent: 'center',alignItems:'center'}}>
                            <Text style={styles.Text1}>{I18n.t('NoItems')}</Text>
                        </Body>
                    </CardItem>
            </View>
        );
    }
}
const styles = ({
    Text1: {
        fontFamily: 'Kanit',
        color: '#989898',
        fontSize: responsiveFontSize(2.5),
        backgroundColor:'transparent',
        fontWeight:'500'
    },
    Text2: {
        fontFamily: 'Kanit',
    },
    cardContainer:{
        flex:1,
        height:responsiveHeight(14),
        backgroundColor:'#fff',
        borderRadius:5,
        justifyContent:"center"
    }
});

I18n.fallbacks = true;

I18n.translations = {
  en: {
    NoItems:'No items',
  },
  th: {
    NoItems:'ไม่มีรายการ',
  },
};