import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../../utils/i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../NotificationCard/style';

export default class NotificationCard extends React.Component {
//   constructor(props) {
//         super(props);
//         this.openDetail = this.openDetail.bind(this);
        
//   }
//   openDetail(){
//     this.props.openDetail(this.props.info);
//   }
  
  render() {
    return (
<Card style={{marginBottom:0,}}>
        <View style={{flexDirection: 'row',flex:1,}}>
                <CardItem style={style.cardNotRead}>
                    <Left style={{flex:0.8,backgroundColor:'transparent'}}>
                        <Thumbnail source={{uri: 'http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png'}} />
                    </Left>
                    <Body style={{flex:3, paddingTop: responsiveHeight(1.5)}}>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            {(<Text style={style.textName}>Yunyong Sajjariyakul</Text>)}
                        </View>    
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            {(<Text style={style.textCause}>ส่งเหตุผลการลงเวลานอกสถานที่ ต้องการให้คุณพิจารณา</Text>)}
                        </View>       
                    </Body>
                    <Right style={{flex:0.3}}>
                    <Icon style={{color:'#F99B30', paddingRight: responsiveWidth(2.5)}} name='circle' />
                    </ Right>
                    </CardItem>
                </View>
            </ Card>

    );
  }
}

const styles = StyleSheet.create({
   
});
