import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class LeaveCard extends React.Component {
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
                <CardItem style={{paddingLeft:5,paddingRight:5}}>
                    <Left style={{flex:1}}>
                        <Thumbnail source={{uri: 'http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png'}} />
                    </Left>
                    <Body style={{flex:4}}>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            {(<Text ellipsizeMode='tail' numberOfLines={1} style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:2, fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{this.props.info.name}</Text>)}
                            {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:1,textAlign:'center'}}>{this.props.info.empId}</Text>)}
                            {(<Text ellipsizeMode='tail' numberOfLines={1} style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:2,textAlign:'center'}}>{this.props.info.positions}</Text>)}
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                            {(<Text style={{fontFamily: 'Kanit-Medium', color:'#777779',flex:1, fontSize:responsiveFontSize(1.5)}}>ประเภทการลา</Text>)}
                            {(<Text ellipsizeMode='tail' numberOfLines={1} style={{fontFamily: 'Kanit-Medium', color:'#fbaa3e',flex:1, fontSize:responsiveFontSize(1.8)}}>{this.props.info.type}</Text>)}
                            {(<Text style={{fontFamily: 'Kanit-Medium', color:'#fbaa3e',flex:1, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{`${this.props.info.total} วัน`}</Text>)}
                        </View>
                        <View style={{flexDirection: 'row', alignItems:'center',paddingTop:5}}>
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(1.5),textAlign:'center'}}>ตั้งแต่</Text>)}
                            {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:3,textAlign:'center'}}>{this.props.info.startDate}</Text>)}
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:0, fontSize:responsiveFontSize(1.5),textAlign:'center'}}>ถึง</Text>)}
                            {(<Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.5),flex:3,textAlign:'center'}}>{this.props.info.endDate}</Text>)}
                            
                        </View>
                    </Body>
                </CardItem>
            </Card>
        
        )

    );
  }
}

const styles = StyleSheet.create({
   
});
