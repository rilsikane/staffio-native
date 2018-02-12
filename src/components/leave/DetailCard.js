import React from 'react';
import { StyleSheet ,View} from 'react-native';
import { Container, Card, CardItem, Text, Body } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';

export default class DetailLeave extends React.Component {

  render() {
    return (
        <Card style={{height:responsiveHeight(30)}}>
            <CardItem>
                <Body style={{flex:4}}>
                    <View style={{flexDirection: 'row', alignItems:'center' }}>
                        <Text style={{fontFamily: 'Kanit-Medium', color:'#777779',flex:1, fontSize:responsiveFontSize(2.2)}}>{I18n.t('Type')}</Text>
                        <Text style={{fontFamily: 'Kanit-Medium', color:'#fbaa3e',flex:2, fontSize:responsiveFontSize(2.2)}}>{this.props.type}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems:'center', marginTop:responsiveHeight(2)}}>
                        <Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:1, fontSize:responsiveFontSize(2.2)}}>{I18n.t('Cause')}</Text>
                        <Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.7),flex:3,}}>{this.props.cause||'ไม่ระบุ'}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems:'center', marginTop:responsiveHeight(2)}}>
                        <Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(2.2),textAlign:'center'}}>{I18n.t('Since')}</Text>
                        <Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.7),flex:3,textAlign:'center'}}>{this.props.start}</Text>
                        <Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(2.2),textAlign:'center'}}>{I18n.t('To')}</Text>
                        <Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.7),flex:3,textAlign:'center'}}>{this.props.end}</Text>
                        <Text style={{fontFamily: 'Kanit-Medium', color:'#fbaa3e',flex:0, fontSize:responsiveFontSize(2.2),textAlign:'center'}}>{`${this.props.total} ${I18n.t('Day')}`}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems:'center', marginTop:responsiveHeight(2)}}>
                        <Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:1, fontSize:responsiveFontSize(2.2)}}>{I18n.t('Balance')}</Text>
                        <Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.7),flex:2}}>{`${this.props.remain||0} ${I18n.t('From')} ${this.props.max} ${I18n.t('Day')}`}</Text>
                    </View>
                    {/*<View style={{flexDirection: 'row', alignItems:'center', marginTop:responsiveHeight(2)}}>
                        <Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:2, fontSize:responsiveFontSize(2.2)}}>เอกสารแนบ</Text>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.7),flex:3}}>{this.props.docRef}</Text>
                        <Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.7),flex:1,textAlign:'center'}}>{this.props.typedoc}</Text>
                        <Icon name="eye" size={25} style={{ color: '#fbaa3e',flex:0 }} />
                    </View>*/}
                </Body>
            </CardItem>
        </Card>

    );
  }
}

const styles = StyleSheet.create({
   
});

I18n.fallbacks = true;

I18n.translations = {
  en: {
    Type: 'Type of leave',
    Cause: 'Cause',
    Specify: 'Not specify',
    Since: 'Since',
    To: 'To',
    Day: 'Day',
    Balance: 'Balance',
    From: 'From'
  },
  th: {
    Type: 'ประเภทการลา',
    Cause: 'สาเหตุ',
    Specify: 'ไม่ระบุ',
    Since: 'ตั้งแต่',
    To: 'ถึง',
    Day: 'วัน',
    Balance: 'วันลาคงเหลือ',
    From: 'จาก'
  },
};