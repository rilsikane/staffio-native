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
//import Progress from '../components/cardProgress/testindex';
import { ScrollView } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
//import { observer, inject } from 'mobx-react';
//import { post } from '../api';
//@inject('searchStore')
//@observer
export default class Overview extends React.Component {
    render() {
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
                   
                    <Progress/>
                </Body>


                <Footer >
                    <FooterTab style={{ backgroundColor: '#FFCCFF' }}>
                        <Button>
                            <Icon name='home' />
                            <Text>Home</Text>
                        </Button>
                        <Button>
                            <Icon name='home' />
                            <Text>inbox</Text>
                        </Button>
                        <Button>
                            <Icon name='calendar' />
                            <Text>summary</Text>
                        </Button>
                        <Button>
                            <Icon name='menu' />
                            <Text>menu</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
     
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
