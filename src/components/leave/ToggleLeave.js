import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity,Switch} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../../utils/i18n';

export default class ToggleLeave extends React.Component {
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
                    <Left style={{flex:2}}>
                        {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:2, fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{I18n.t('Type')}</Text>)}
                    </Left>
                    <Body style={{flex:2}}>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560',flex:2, fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{I18n.t('Approve')}</Text>)}
                            <Switch onTintColor='#fbaa3e' tintColor='#feddb4' thumbTintColor='#fbaa3e'/>
                            {(<Text style={{fontFamily: 'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(1.8),flex:2,textAlign:'center'}}>{I18n.t('Cancel')}</Text>)}
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
