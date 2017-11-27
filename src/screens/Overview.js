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
//import Progress from '../components/cardProgress/testindex';
import { ScrollView , Linking} from 'react-native';
import CardCheckin from '../components/cardCheckin/Cardcheckin';

//import Icon from 'react-native-vector-icons/FontAwesome';
//import { observer, inject } from 'mobx-react';
//import { post } from '../api';
//@inject('searchStore')
//@observer
export default class Overview extends React.Component {
    constructor(props) {
        super(props);
       
        
        this.checkin = [{name : 'Pramot sudjai', position : '004901  solution specialist', location : 'the mail', checkin : 'true', url : 'https://wix.github.io/react-native-navigation/#/deep-links'},
        {name : 'Anuwat Phetaum', position : '004901  solution specialist', location : 'the mail', checkin : 'true'}, 
        {name : 'Preecha Satbut', position : '004901  solution specialist', location : 'the mail', checkin : 'true'},
        {name : 'Sarin  Rubtong', position : '004901  solution specialist', location : 'the mail', checkin : 'false'}, 
        {name : 'Piranan  Naja', position : '004901  solution specialist', location : 'the mail', checkin : 'true'}, 
        {name : 'Worrawat  RO', position : '004901  solution specialist', location : 'the mail', checkin : 'true'}, 
        {name : 'Sittichok  Boom', position : '004901  solution specialist', location : 'the mail', checkin : 'true'}, 
        {name : 'Kritsada  DJ', position : '004901  solution specialist', location : 'the mail', checkin : 'true'}]
        this.onContactSelected = this.onContactSelected.bind(this);
        // this.changcolorborder = this.changcolorborder.bind(this);
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
            if(checkin[i].checkin == 'true'){
                a = a + 1
            }
        }
        return a
    }

    onContactSelected(url) {
        return Linking.openURL(url);
    }

    
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
                <CardItem style={{height: responsiveHeight(15), width:  responsiveWidth(95) }}>
                <View style={{alignItems : 'center' }}>
                <View style={styles.circle}>
                <ProgressCircle
                 
                    percent  = {this.check(this.checkin) *100 / this.checkin.length}
                    radius={40}
                    borderWidth={6}
                    color= {this.changcolor(this.check(this.checkin) *100 / this.checkin.length)}
                    shadowColor="#999"
                    bgColor="#fff"
                    
                >
                <Text style={this.color(this.checkin.length * 10)}>{this.check(this.checkin) *100 / this.checkin.length +'%'}</Text>
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
                    <Text style={styles.Text4}> {this.check(this.checkin)} / {this.checkin.length} </Text>
                    <Text style={styles.Text4}>พนักงานที่ลงเวลา</Text>
                    </CardItem>
                </Body>
            </CardItem>
            <Text />
            <ScrollView>
            <View style={{alignItems : 'center',justifyContent: 'center',}}>
            { this.checkin.map((val) => {
                    return (
                    <CardCheckin key={val.name}  data={val}  onContactSelected={this.onContactSelected} >
                    </CardCheckin>);
                    })} 
            

            </View>
            </ScrollView>
            </Body>
            

     
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
