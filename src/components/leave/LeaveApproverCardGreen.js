import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../../utils/i18n';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
                <CardItem style={{paddingRight:responsiveWidth(1.5),flex:3}}>
                    <Left style={{flex:0.7,backgroundColor:'transparent',alignItems:'center',marginLeft:-responsiveWidth(2),marginRight:responsiveWidth(2)}}>
                        <Thumbnail source={{uri: 'http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png'}} />
                        {/* <View style={styles.CheckSelected}>
                            <FontAwesome name="check" size={responsiveWidth(5)} color='#FBAB3E' />
                        </View> */}
                        <View style={styles.CheckSelect}>
                            <FontAwesome name="check" size={responsiveWidth(5)} color='#BCBEC0' />
                        </View>
                    </Left>
                    <Body style={{flex:4}}>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            {(<Text ellipsizeMode='tail' numberOfLines={1} style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:1, fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{this.props.info.name}</Text>)}
                            {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9',flex:1, fontSize:responsiveFontSize(1.5),textAlign:'left'}}>ID: {this.props.info.empId}</Text>)}
                            {/* {(<Text ellipsizeMode='tail' numberOfLines={1} style={{fontFamily:'Kanit', color:'#777779',flex:3, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{this.props.info.positions}</Text>)} */}
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                            <View style={{flex:1,flexDirection: 'row', alignItems:'center'}}>
                                {this.props.info.requestStatusCode!='L' && <View style={{flex:1,flexDirection: 'row', alignItems:'center',backgroundColor:'red',borderRadius:responsiveWidth(1),marginRight:responsiveWidth(2)}}>
                                    <FontAwesome name='circle' size={responsiveWidth(2)} color='white' style={{flex:0.5,marginLeft:responsiveWidth(0.5)}}/>
                                    {(<Text style={{fontFamily:'Kanit-Medium', color:'white',flex:2, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{I18n.t('cancelLeavePer')}</Text>)}
                                </View>}
                                {(<Text ellipsizeMode='tail' numberOfLines={1} style={{fontFamily: 'Kanit-Medium', color:this.props.info.color,flex:1.5, fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{this.props.info.type}</Text>)}
                            </View>
                            <View style={{flex:1,flexDirection: 'row', alignItems:'center'}}>
                                <FontAwesome name='calendar' color='#fbaa3e'/>
                                {(<Text style={{fontFamily:'Kanit-Medium', color:'#fbaa3e',flex:2,paddingLeft:5, fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{this.props.info.createDate}</Text>)}
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{I18n.t('Since')}</Text>)}
                            {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:3,textAlign:'center'}}>{this.props.info.startDate}</Text>)}
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{I18n.t('To')}</Text>)}
                            {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:3,textAlign:'center'}}>{this.props.info.endDate}</Text>)}
                            {(<Text style={{fontFamily: 'Kanit-Medium',borderRadius: responsiveWidth(2), color:'gray',flex:3, fontSize:responsiveFontSize(2.3),textAlign:'center'}}>{`${this.props.info.total} ${I18n.t('LeaveDay')}`}</Text>)}
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
   CheckSelected : {
    position: 'absolute',
    alignSelf:'flex-start',
    backgroundColor:'#FECA89',
    width:responsiveWidth(7),
    height:responsiveWidth(7),
    borderWidth:responsiveWidth(0.7),
    borderColor:'#FBAB3E',
    borderRadius:responsiveWidth(3.5)
   },
   CheckSelect : {
    position: 'absolute',
    alignSelf:'flex-start',
    backgroundColor:'#FFF',
    width:responsiveWidth(7),
    height:responsiveWidth(7),
    borderWidth:responsiveWidth(0.7),
    borderColor:'#BCBEC0',
    borderRadius:responsiveWidth(3.5)
   }
});
