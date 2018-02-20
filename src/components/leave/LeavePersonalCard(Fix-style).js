import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../../utils/i18n';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class LeavePersonalCard extends React.Component {
  constructor(props) {
        super(props);
        this.openDetail = this.openDetail.bind(this);
        
  }
  openDetail(){
    this.props.openDetail(this.props.info);
  }
 
  render() {
    return (
        this.props.info.total && 
        (
            <Card style={{marginBottom:0}}>
            <View style={{flexDirection: 'row',flex:1}}>
            <View style={{flex:0,width:responsiveWidth(2.5),backgroundColor:this.props.info.color,borderTopLeftRadius:responsiveWidth(0.5),borderBottomLeftRadius:responsiveWidth(0.5)}}/>
            <CardItem style={{paddingLeft:responsiveWidth(1.5),paddingRight:responsiveWidth(1.5),flex:3}}>
                <Body style={{flex:4}}>
                   <View style={{flexDirection: 'row', alignItems:'center'}}>
                    {this.props.info.flag=='2' && <View style={{flex:0.7,flexDirection: 'row', alignItems:'center',backgroundColor:'red',borderRadius:responsiveWidth(1),}}>
                        <FontAwesome name='circle' size={responsiveWidth(2)} color='white' style={{flex:1,marginLeft:responsiveWidth(0.5)}}/>
                        {(<Text style={{fontFamily:'Kanit-Medium', color:'white',flex:4, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{I18n.t('cancelLeavePer')}</Text>)}
                    </View>}
                  
                    {(<Text ellipsizeMode='tail' numberOfLines={1} style={{fontFamily:'Kanit-Medium', color:this.props.info.color,flex:0.8, fontSize:responsiveFontSize(1.8),textAlign:'left',paddingLeft:5}}>{this.props.info.type}</Text>)}
                    {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:0.5, fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{I18n.t('Status')}</Text>)}
                    {(<Text ellipsizeMode='tail' numberOfLines={1} style={{fontFamily:'Kanit-Medium', color:'#fbaa3e',flex:1, fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{this.props.info.requestStatus}</Text>)}
                    <View style={{flex:1,flexDirection: 'row', alignItems:'center'}}>
                        <FontAwesome name='calendar' color='#fbaa3e' style={{flex:1,textAlign: 'right', paddingRight: responsiveWidth(2)}}/>
                        {(<Text style={{fontFamily:'Kanit-Medium', color:'#fbaa3e',flex:-2.5, fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{this.props.info.createDate}</Text>)}
                    </View>
                   </View>
                   <View style={{flexDirection: 'row', alignItems:'center'}}>
                    {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{I18n.t('Since')}</Text>)}
                    {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:3,textAlign:'center'}}>{this.props.info.startDate}</Text>)}
                    {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{I18n.t('To')}</Text>)}
                    {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:3,textAlign:'center'}}>{this.props.info.endDate}</Text>)}
                    {(<Text style={{fontFamily: 'Kanit-Medium',borderRadius: responsiveWidth(2), color:'gray',flex:0, fontSize:responsiveFontSize(3),textAlign:'center'}}>{`${this.props.info.total}`}</Text>)}
                    {(<Text style={{fontFamily: 'Kanit-Medium',borderRadius: responsiveWidth(2), color:'gray',flex:1, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{I18n.t('Day')}</Text>)}
                   </View>
                </Body>
            </CardItem>
            </View>
        </ Card>
        )

    );
  }
}

const styles = StyleSheet.create({
   
});
