import React, { Component } from 'react';
import {
    Container, Header, Left, Body, Right, Button, Title, Text,  Content, List, ListItem, Thumbnail, CardItem, Card, Footer, FooterTab, Badge

} from 'native-base';
import { ScrollView,View, Image } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ProgressCircle from 'react-native-progress-circle'
import CardCheckin from './Cardcheckin';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import Communications from 'react-native-communications';
import fontelloConfig from '../../../assets/fonts/config.json'
import { em } from '../../constants/Layout'
import Icon from 'react-native-vector-icons/FontAwesome';
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
            return { borderTopColor: '#bf1e2d' }
        } else {
            return { borderTopColor: '#2bb673' }
        }
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

    render() {
      var data =  this.props.data
        return (            
                <View style={{flex:1}}>
                    <Card style={{ height: responsiveHeight(11), width: responsiveWidth(98),borderRadius:2,marginTop:2,marginBottom:2 }}>
                        <View style={{ width :responsiveWidth(17)}}>
                            {( data.imagePathPersonal && data.imagePathPersonal!= "") && <Image source={{uri:data.imagePathPersonal}} style={styles.image}></Image>}
                            <View style={[styles.box1, this.changcolorborder( data.timeRecord)]} /> 
                        </View>  
                        <View style={{marginTop : responsiveHeight(2) , width :responsiveWidth(60)}}>
                            <Text style={styles.Text1}>    { data.fullNameTh}</Text>
                            <Text note style={styles.Text2}>     { data.empCode}  { data.positionNameTh}</Text>
                            <View style={{flexDirection:"row",paddingLeft:responsiveWidth(4),paddingTop:1}}>
                                <Icon style={{color:"#989898"}}  name="clock-o"/>
                                <Text note style={[styles.Text2,{paddingLeft:responsiveWidth(2)}]}>{data.timeRecord ? `${data.timeRecord}` :'ยังไม่ได้ลงเวลา' }</Text>
                             </View>
                        </View>

                        <View style={{marginTop : responsiveHeight(2),marginRight:responsiveWidth(-1) }}>
                        <CardItem style={{marginRight : responsiveWidth(2) }}>
                           {(data.mobileNo && data.mobileNo !="") && <Button style={[styles.icon]} onPress={() => Communications.phonecall(data.mobileNo.replace(/-/g,""), true)} >
                                <IconTello style={{ color: "#fbaa3e" }} size={responsiveFontSize(3.5)} name="hhmm-17" />
                            </Button>}
                            {(data.facebook && data.facebook !="") &&  <Button style={styles.icon}  onPress={(e) => this.onContactSelected(data.facebook)}>
                                <IconTello style={{ color: "#3c5b9a" }} size={responsiveFontSize(3.5)} name="hhmm-18" />
                            </Button>}
                            {(data.lineid && data.lineid !="") &&  <Button style={styles.icon}  onPress={(e) => this.onContactSelected(data.lineid)} >
                                <IconTello style={{ color: "#37b54a" }} size={responsiveFontSize(3.5)} name="hhmm-20" />
                            </Button>}
                        </CardItem>
                        </View>
                    </Card>
                </View>
         
          
            


        );
    }

}
const styles = ({
    Text: {
        fontFamily: 'Kanit',
        color: 'white',
        backgroundColor: 'transparent',
    },
    Header: {
        backgroundColor: 'orange',
        height: 33
    },
    Text1: {
        fontFamily: 'Kanit',
        color: 'brown',
        fontSize: responsiveFontSize(1.5),
        backgroundColor: 'transparent'
    },
    Text2: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.2),
        backgroundColor: 'transparent',
        width:responsiveWidth(60)
    },
    Text3: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5),
        backgroundColor: 'transparent'
    },
    Text4: {
        fontFamily: 'Kanit',
        fontSize: responsiveFontSize(1.5),
        backgroundColor: 'transparent'
    },
    icon: {
        height: responsiveHeight(4),
        width: responsiveWidth(8),
        borderRadius: responsiveWidth(8 / 2),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'transparent'
    },
    box1: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: responsiveWidth(13),
        borderTopWidth: responsiveWidth(9.5),
        borderRightColor: 'transparent',
        borderRadius:1
    },
    container: {
        flex: 1
    },
    image : {
        height: responsiveHeight(8), 
        width: responsiveWidth(12),
        borderRadius:2,
        borderRightWidth:1,
        marginTop:responsiveHeight(1),
        marginLeft : responsiveWidth(2)
    }
});


