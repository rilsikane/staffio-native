import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../../utils/i18n';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class OTPersonalCard extends React.Component {
 
  render() {
    return (
        <Card style={{marginBottom:0}}>
        <View style={{flexDirection: 'row',flex:1}}>
        <View style={{flex:0,width:responsiveWidth(2.5),backgroundColor:'#ED5565',borderTopLeftRadius:responsiveWidth(0.5),borderBottomLeftRadius:responsiveWidth(0.5)}}/>
        <CardItem style={{paddingLeft:responsiveWidth(1.5),paddingRight:responsiveWidth(1.5), borderLeftWidth:responsiveWidth(2.5),flex:3}}>
            <Body style={{flex:4}}>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Text style={{flex:1.2,fontFamily:'Kanit-Medium',color:'#7e6560',fontSize:responsiveFontSize(1.8),textAlign:'left'}}>OT. ก่อนทำงาน</Text>
                    <Text style={{flex:1,fontFamily:'Kanit',color:'#f58020',fontSize:responsiveFontSize(1.8),textAlign:'left'}}>กะปกติ</Text>
                    <Text style={{flex:1.2,fontFamily:'Kanit-Medium',color:'#7e6560',fontSize:responsiveFontSize(1.8),textAlign:'left'}}>ทำรายการวันที่</Text>
                    <Text style={{flex:1.4,fontFamily:'Kanit',color:'#f58020',fontSize:responsiveFontSize(1.8),textAlign:'left'}}>05 กันยายน 2017</Text>    
                </View>
                <View style={{flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                    <Text style={{flex:0.5,fontFamily:'Kanit-Medium',color:'#7e6560',fontSize:responsiveFontSize(1.8),textAlign:'left'}}>เวลากะ</Text>
                    <Text style={{flex:1.2,fontFamily:'Kanit',color:'#a9a9a9',fontSize:responsiveFontSize(1.8),textAlign:'left'}}>09.00 - 18.00</Text>
                    <Text style={{flex:1,fontFamily:'Kanit-Medium',color:'#7e6560',fontSize:responsiveFontSize(1.8),textAlign:'left'}}>สถานะรายการ</Text>
                    <Text style={{flex:1,fontFamily:'Kanit',color:'#f58020',fontSize:responsiveFontSize(1.8),textAlign:'left'}}>รอพิจารณา</Text>                 
                </View>
                <View style={{flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                    <Text style={{flex:1,fontFamily:'Kanit-Medium',color:'#7e6560',fontSize:responsiveFontSize(1.8),textAlign:'left'}}>วันที่ทำ</Text>
                    <Text style={{flex:2,fontFamily:'Kanit',color:'#a9a9a9',fontSize:responsiveFontSize(1.8),textAlign:'left'}}>17 กันยายน 2017</Text>
                    <Text style={{flex:1.5,fontFamily:'Kanit-Medium',color:'#7e6560',fontSize:responsiveFontSize(1.8),textAlign:'left'}}>จำนวน</Text>
                    <Text style={{flex:1,fontFamily:'Kanit',color:'#f58020',fontSize:responsiveFontSize(1.8),textAlign:'left'}}>1</Text> 
                    <Text style={{flex:1,fontFamily:'Kanit-Medium',color:'#7e6560',fontSize:responsiveFontSize(1.8),textAlign:'left'}}>แรง</Text>                    
                </View>
            </Body>
        </CardItem>
        </View>
    </ Card>
    );
  }
}