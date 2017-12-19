import React, { Component } from 'react';
import {Container,Header,Left,Body,Right,Button,Icon,Title,Text,View,Content,List,ListItem,Thumbnail,CardItem,Card,Footer,FooterTab,Badge

} from 'native-base';
import { ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ProgressCircle from 'react-native-progress-circle'
import CardCheckin from './Cardcheckin';
export default class Checkin extends React.Component {
    constructor(props) {
        super(props);
        
        this.checkin = [{name : 'Pramot sudjai', position : '004901  solution specialist', location : 'the mail', checkin : 'true', url : 'www.google.com'},
        {name : 'Anuwat Phetaumphai', position : '004901  solution specialist', location : 'the mail', checkin : 'true'}, 
        {name : 'Preecha Satbut', position : '004901  solution specialist', location : 'the mail', checkin : 'true'},
        {name : 'Sarin  Rubtong', position : '004901  solution specialist', location : 'the mail', checkin : 'false'}, 
        {name : 'Piranan  Naja', position : '004901  solution specialist', location : 'the mail', checkin : 'true'}, 
        {name : 'Worrawat  RO', position : '004901  solution specialist', location : 'the mail', checkin : 'true'}, 
        {name : 'Sittichok  Boom', position : '004901  solution specialist', location : 'the mail', checkin : 'true'}, 
        {name : 'Kritsada  DJ', position : '004901  solution specialist', location : 'the mail', checkin : 'true'}]
        this.onContactSelected = this.onContactSelected.bind(this);
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
        this.props.navigator.handleDeepLink({
            link: url 
          });
    }

    render() {
        return (
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
            <View style={{alignItems : 'center',justifyContent: 'center',}}>
            { this.checkin.map((val) => {
                    return (
                    <CardCheckin key={val.name}  data={val}  onContactSelected={this.onContactSelected} >
                    </CardCheckin>);
                    })} 
            

            </View>
            </Body>
             
        );
    }

}
const styles = ({
    Text1: {
        fontFamily: 'Kanit',
        color: 'brown',
        fontSize: responsiveFontSize(1.5),
        height:responsiveHeight(2)
    },
    Text2: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5),
        height:responsiveHeight(2)
    },
    Text3: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5)
    },
    Text4: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5),
        height:responsiveHeight(2)
    },
    circle : {
        width: 83,
        height: 83,
        borderRadius: 100/2,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#E5E5E5',
    },
    square: {
        height: 4,
        width: 35,
        backgroundColor:'#ffff',
        alignItems: 'center',
        flex:null,
        justifyContent: 'center'
      },
      square2: {
        height: 3,
        width: 60,
        backgroundColor:'#E5E5E5',
        alignItems: 'center',
        flex:null,
        justifyContent: 'center'
      }
});

