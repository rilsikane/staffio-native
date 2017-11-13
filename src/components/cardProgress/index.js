import React, { Component } from 'react';
import {Container,Header,Left,Body,Right,Button,Icon,Title,Text,View,Content,List,ListItem,Thumbnail,CardItem,Card,Footer,FooterTab,Badge

} from 'native-base';
import { ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ProgressCircle from 'react-native-progress-circle'
import CardProgress from './cardprogress';
export default class Progress extends React.Component {
    constructor(props) {
        super(props);
        

        this.progress = [{location : 'the mail',staffcount : 50},{location : 'terminal 21',staffcount : 30},{location : 'terminal 22',staffcount : 80}];
        
    }
    render() {
        return (
            <ScrollView>
            <Body>
                 <CardItem style={{ backgroundColor: '#FFCCFF', height: 30 }}>
                        <CardItem style={{ backgroundColor: '#FFCCFF', height: 30 }} >
                            <Icon name='calendar' />
                            <Text style={{ fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit' }}>การลงเวลาเข้างาน</Text>
                        </CardItem>
                        <CardItem style={{ backgroundColor: '#FFCCFF' }} >
                            <Icon name='refresh' />
                            <Text style={{ fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit' }}>ดึงข้อมูล </Text>
                            <Text style={{ fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit',color : 'orange' }}>: 21 นาทีที่แล้ว </Text>
                        </CardItem>
                    </CardItem>
                    
                    <CardItem style={{ backgroundColor: '#FFCCFF' }}>
                        <Left style={{ backgroundColor: '#ffff', width: 400, height: 80 }}>
                            <Text/>
                            <Icon name='calendar' />
                            <Body>
                                <Text style={{ fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit',color :'orange' }}>Project View</Text>
                                <Text style={{ fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit' }}>มุมมองของโครงการ</Text>
                            </Body>
                        </Left>
                        
                        <CardItem style={{ backgroundColor: '#FFCCFF' }} />
                        <Left style={{ backgroundColor: '#ffff', width: 400, height: 80 }}>
                        <Text/>
                            <Icon name='calendar' />
                            <Body>
                                <Text style={{ fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit',color : 'brown' }}>Organization</Text>
                                <Text style={{ fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit' }}>เรียงตามโครงสร้างองค์กร</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    { this.progress.map((val) => {
                    return (
                    <CardProgress key={val.location}  data={val} >
                    </CardProgress>);
                    })} 
                </Body>   
                </ScrollView>
             
        );
    }

}

