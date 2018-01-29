import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, CardItem, Thumbnail, Container, Image } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const menus = [
    {name: "หน้าแรก", icon: "home"},
    {name: "สถิติทั้งหมด", icon: "bar-chart"},
    {name: "ลงเวลาเข้างาน", icon: "calendar"},
    {name: "การลางาน", icon: "desktop"},
    {name: "ทำงานล่วงเวลา", icon: "clock-o"},
    {name: "สลับกะทำงาน", icon: "exchange"},
    {name: "วิธีใช้งาน", icon: "question-circle"},
    {name: "ค้นหาเพื่อน", icon: "book"},
    {name: "ตั้งค่า", icon: "gear"},
    {name: "ออกจากระบบ", icon: "sign-out"}
  ];

export default class MenuScreen extends React.Component {
    
    state = {
        fontLoaded: false,
    }

    render() {
    return (
        <Container style={{backgroundColor: '#ffe9d4',flex:1,paddingTop:10}}>
        <Thumbnail small style={styles.imageStyle} source={{uri: 'http://data.named.com/data/file/photo/editor/1712/9f95a04042dd42948a7463ed2ff023c8_oPh62DpW4Zp82g8v9lrHc6BNw.jpg'}}/>
                    <Text style={styles.textName}>SASI RASITIKHETRAWIT</Text>
                    <Text style={styles.textPosition}>Beauty Advisor</Text>
            <Card style={styles.cardStyle} dataArray={menus} renderRow={menuName =>            
                <CardItem style={styles.containerStyle}>
                    <View style={{flexDirection: 'row', alignItems:'center',flex:1}}>
                    <FontAwesome name={menuName.icon} style={styles.iconStyle}/>
                    <Text style={styles.textMenuStyle}>{menuName.name}</Text>
                    </View>
            </CardItem>}
            />
        </Container>
    );
  }
}

const styles = {
    textMenuStyle: {
        fontFamily:'Kanit-Medium',
        color:'#7e6560',
        fontSize: 14,
    },
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#ffe9d4',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ffe9d4',
        position: 'relative'
    },
    cardStyle: {
        backgroundColor: '#ffe9d4', 
        paddingTop: 3, 
        paddingBottom: 3,
        borderColor: '#ffe9d4',
        flex:1
    },
    imageStyle: {
        width:responsiveWidth(20), 
        height:responsiveWidth(20), 
        borderRadius:responsiveWidth(10), 
        marginTop:responsiveHeight(2),
        marginLeft:responsiveWidth(9),
        marginBottom: responsiveHeight(1),
        borderWidth:responsiveWidth(1),
        borderColor:'#e9e8e6',
        paddingTop: 20,
    },
    iconStyle: {
        color:'#7e6560',
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 20
    },
    textPosition: {
        color: '#fbaa3e', 
        paddingLeft: 15, 
        fontSize: 10,
        fontFamily:'Kanit-Medium', 
        paddingBottom:10
    },
    textName: {
        color: 'black', 
        paddingLeft: 15,
        fontSize: 11,
        fontFamily:'Kanit-Medium'
    }
  };