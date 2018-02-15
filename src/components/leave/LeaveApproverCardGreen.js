import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../../utils/i18n';

export default class LeaveApproverCardGreen extends React.Component {
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
            <Card style={{marginBottom:0}}>
                <View style={{flexDirection: 'row',flex:1}}>
                <View style={{flex:0,width:responsiveWidth(2.5),backgroundColor:this.props.info.color,borderTopLeftRadius:responsiveWidth(0.5),borderBottomLeftRadius:responsiveWidth(0.5)}}/>
                <CardItem style={{paddingLeft:responsiveWidth(1.5),paddingRight:responsiveWidth(1.5),flex:3}}>
                    <Left style={{flex:1,backgroundColor:'transparent'}}>
                        <Thumbnail source={{uri: 'http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png'}} />
                    </Left>
                    <Body style={{flex:4}}>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:4, fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{this.props.info.name}</Text>)}
                            {(<Text ellipsizeMode='tail' numberOfLines={1} style={{fontFamily: 'Kanit-Medium', color:this.props.info.color,flex:2, fontSize:responsiveFontSize(1.8)}}>{this.props.info.type}</Text>)}
                            {(<Text style={{fontFamily: 'Kanit-Medium',backgroundColor:this.props.info.color,borderRadius: responsiveWidth(2), color:'white',flex:2, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{`${this.props.info.total} ${I18n.t('LeaveDay')}`}</Text>)}
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                            {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:0,textAlign:'center'}}>ID: {this.props.info.empId}</Text>)}
                            {(<Text style={{fontFamily:'Kanit', color:'#777779',flex:1, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>Post. {this.props.info.positions}</Text>)}
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{I18n.t('Since')}</Text>)}
                            {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:3,textAlign:'center'}}>{this.props.info.startDate}</Text>)}
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{I18n.t('To')}</Text>)}
                            {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:3,textAlign:'center'}}>{this.props.info.endDate}</Text>)}
                            
                        </View>
                    </Body>
                </CardItem>
                </View>
            </Card>
        // )

    );
  }
}

const styles = StyleSheet.create({
   
});
