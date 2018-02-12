import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';

export default class LeaveApproverCardCancel extends React.Component {
//   constructor(props) {
//         super(props);
//         this.openDetail = this.openDetail.bind(this);
        
//   }
//   openDetail(){
//     this.props.openDetail(this.props.info);
//   }
  
  render() {
    return (
        // this.props.info.total && 
        // (        
            <View style={{backgroundColor:'transparent'}}>
                <View style={{backgroundColor:'transparent', alignItems:'center', paddingTop: responsiveHeight(1)}}>
                    <CardItem style={{backgroundColor: '#FBCB8D', height: responsiveHeight(2),flex:3, width: responsiveWidth(50)}}>
                        <Body style={{flex:4}}>
                            <View style={{flexDirection: 'row', alignItems:'center'}}>
                                {(<Text style={{paddingBottom: 2, fontFamily:'Kanit-Medium', color:'#7e6560',flex:4, fontSize:responsiveFontSize(2),textAlign:'center'}}>{I18n.t('Cancel')}</Text>)}
                        </View>
                        </Body>
                    </CardItem>
                </View>
                <View style={{flexDirection: 'row',flex:1}}>
                <View style={{flex:0,width:responsiveWidth(2.5),backgroundColor:'#BECC9A',borderTopLeftRadius:responsiveWidth(0.5),borderBottomLeftRadius:responsiveWidth(0.5)}}/>
                <CardItem style={{paddingLeft:responsiveWidth(1.5),paddingRight:responsiveWidth(1.5), borderLeftWidth:responsiveWidth(2.5),flex:3}}>
                    <Left style={{flex:1,backgroundColor:'transparent'}}>
                        <Thumbnail source={{uri: 'http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png'}} />
                    </Left>
                    <Body style={{flex:4}}>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:4, fontSize:responsiveFontSize(1.8),textAlign:'left'}}>JUTHA SUBHAMA</Text>)}
                            {(<Text ellipsizeMode='tail' numberOfLines={1} style={{fontFamily: 'Kanit-Medium', color:'#BECC9A',flex:1.5, fontSize:responsiveFontSize(1.8)}}>ลาป่วย</Text>)}
                            {(<Text style={{fontFamily: 'Kanit-Medium',backgroundColor:'#BECC9A',borderRadius: responsiveWidth(2), color:'white',flex:1, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{`2 ${I18n.t('Day')}`}</Text>)}
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                            {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:0,textAlign:'center'}}>ID: 004901</Text>)}
                            {(<Text style={{fontFamily:'Kanit', color:'#777779',flex:1.5, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>Post. Solution Specialist</Text>)}
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{I18n.t('Since')}</Text>)}
                            {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:3,textAlign:'center'}}>05 กันยายน 2017</Text>)}
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{I18n.t('To')}</Text>)}
                            {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:3,textAlign:'center'}}>06 กันยายน 2017</Text>)}
                            
                        </View>
                    </Body>
                </CardItem>
                </View>
            </View>
        // )

    );
  }
}

const styles = StyleSheet.create({
   
});

I18n.fallbacks = true;

I18n.translations = {
  en: {
    Cancel: 'Cancel',
    Since: 'Since',
    To: 'To',
    Day: 'Day'
  },
  th: {
    Cancel: 'ขอยกเลิกรายการ',
    Since: 'ตั้งแต่',
    To: 'ถึง',
    Day: 'วัน'
  },
};