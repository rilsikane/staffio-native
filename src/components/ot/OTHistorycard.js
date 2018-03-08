import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../../utils/i18n';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class OTHistorycard extends React.Component {
  render() {
    return (      
            <Card style={{marginBottom:0}}>
            <View>
                <View style={{flexDirection: 'row', alignItems:'center',marginTop:responsiveHeight(2)}}>
                    <View style={{flex:1,backgroundColor:'black',height:responsiveHeight(0.2),marginLeft:responsiveWidth(2)}}/>
                    {(<Text ellipsizeMode='tail' numberOfLines={1} style={{flex:1,backgroundColor:'transparent',fontFamily:'Kanit-Medium', color:'#7e6560',flex:1, fontSize:responsiveFontSize(2.3),textAlign:'center',marginLeft:responsiveWidth(1),marginRight:responsiveWidth(1)}}>ประวัติการอนุมัติ</Text>)}
                    <View style={{flex:1,backgroundColor:'black',height:responsiveHeight(0.2),marginRight:responsiveWidth(2)}}/>
                </View>
                <CardItem style={{paddingRight:responsiveWidth(1.5)}}>
                    <Left style={{backgroundColor:'transparent',alignItems:'center',flex:1}}>
                        <Thumbnail source={{uri: 'http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png'}} />
                    </Left>
                    <Body style={{flex:3}}>
                       
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            {(<Text ellipsizeMode='tail' numberOfLines={1} style={{backgroundColor:'transparent',fontFamily:'Kanit-Medium', color:'#7e6560',flex:1, fontSize:responsiveFontSize(1.8),textAlign:'left'}}>YUNYONG SAJJARIYAKUL</Text>)}
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                            <View style={{flex:2,flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                                {(<Text style={{backgroundColor:'transparent',fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(2),textAlign:'center'}}>อนุญาติวันที่</Text>)}
                                {(<Text style={{backgroundColor:'transparent',fontFamily: 'Kanit', color:'#fbaa3e', fontSize:responsiveFontSize(1.5),flex:3,textAlign:'center'}}>06 กันยายน 2017</Text>)}
                            </View>
                            <View style={{flex:1,flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                                {(<Text style={{backgroundColor:'transparent',fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>เวลา</Text>)}
                                {(<Text style={{backgroundColor:'transparent',fontFamily: 'Kanit', color:'#fbaa3e', fontSize:responsiveFontSize(1.5),flex:3,textAlign:'center'}}>14:00:21</Text>)}
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                            {(<Text style={{backgroundColor:'transparent',fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>หมายเหตุ</Text>)}
                            {(<Text style={{backgroundColor:'transparent',fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:3,textAlign:'center'}}>ไม่ให้ตรวจสอบการทำงานใหม่</Text>)}
                        </View>
                    </Body>
                    
                </CardItem>
                </View>
            </Card>
    );
  }
}

const styles = StyleSheet.create({
   
});
