import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from 'react-native-i18n';

export default class LeavePersonalCard extends React.Component {
  constructor(props) {
        super(props);
        this.openDetail = this.openDetail.bind(this);
        
  }
  openDetail(){
    this.props.openDetail(this.props.info);
  }
 
  render() {
    // I18n.locale = 'th'    
    return (
        this.props.info.total && 
        (
        
            <Card style={{marginBottom:0}}>
                {/* <View style={{flexDirection: 'row',flex:1}}> */}
                {/* <View style={{flex:0,width:responsiveWidth(2.5),backgroundColor:'#f4a692',borderTopLeftRadius:responsiveWidth(0.5),borderBottomLeftRadius:responsiveWidth(0.5)}}/> */}
                <CardItem style={{paddingLeft:responsiveWidth(1.5),paddingRight:responsiveWidth(1.5), borderLeftWidth:responsiveWidth(2.5),flex:3}}>
                    {/* <Left style={{flex:1,backgroundColor:'transparent'}}>
                        <Thumbnail source={{uri: 'http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png'}} />
                    </Left> */}
                    <Body style={{flex:4}}>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:2, fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{I18n.t('TransactionDate')}</Text>)}
                            {(<Text ellipsizeMode='tail' numberOfLines={1} style={{fontFamily: 'Kanit-Medium', color:'#fbaa3e',flex:2, fontSize:responsiveFontSize(1.8)}}>05 ก.ย. 2557</Text>)}
                            {(<Text ellipsizeMode='tail' numberOfLines={1} style={{fontFamily: 'Kanit-Medium', color:'#f4a692',flex:1.3, fontSize:responsiveFontSize(1.8)}}>{this.props.info.type}</Text>)}
                            {(<Text style={{fontFamily: 'Kanit-Medium',backgroundColor:'#f4a692',borderRadius: responsiveWidth(2), color:'white',flex:1, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{`${this.props.info.total} ${I18n.t('Day')}`}</Text>)}
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{I18n.t('Since')}</Text>)}
                            {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:3,textAlign:'center'}}>{this.props.info.startDate}</Text>)}
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{I18n.t('To')}</Text>)}
                            {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:3,textAlign:'center'}}>{this.props.info.endDate}</Text>)}
                            
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:1, fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{I18n.t('Status')}</Text>)}   
                            {(<Text ellipsizeMode='tail' numberOfLines={1} style={{fontFamily: 'Kanit-Medium', color:'#fbaa3e',flex:2, fontSize:responsiveFontSize(1.8)}}>{I18n.t('Waiting')}</Text>)}                         
                        </View>
                    </Body>
                </CardItem>
                {/* </View> */}
            </Card>
        
        )

    );
  }
}

const styles = StyleSheet.create({
   
});

I18n.fallbacks = true;

I18n.translations = {
  en: {
    TransactionDate: 'Transaction Date',
    Day: 'Day(s)',
    Since: 'Since',
    To: 'To',
    Status: 'Status',
    Waiting: 'Wait consider'
  },
  th: {
    TransactionDate: 'วันที่ทำรายการ',
    Day: 'วัน',
    Since: 'ตั้งแต่',
    To: 'ถึง',
    Status: 'สถานะรายการ',
    Waiting: 'รอพิจารณา'
  },
};