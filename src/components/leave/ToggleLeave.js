import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity,Switch} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../../utils/i18n';

export default class ToggleLeave extends React.Component {
  constructor(props) {
        super(props);
        this.state = {listType:false}
        this.onSwitch = this.onSwitch.bind(this);
        
  }
  onSwitch(value){
      
      this.setState({listType:value});
      this.props.onSwitch(value);
  }
  render() {
    return (
        (
            <Card style={{flex:1,flexWrap:"nowrap"}}>
                <View style={{paddingLeft:5,paddingRight:5,flexDirection:"row",paddingTop:5,paddingBottom:5,flex:1}}>
                    <View style={{flex:1}}>
                        <View style={{flexDirection: 'row', alignItems:'center',flex:1}}>
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{I18n.t('Type')}</Text>)}
                        </View>
                    </View>
                    <View style={{flex:2 ,alignItems:"flex-end"}}>
                        <View style={{flexDirection: 'row', alignItems:'center',flex:1}}>
                            {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(1.8),textAlign:'left',paddingRight:5}}>{I18n.t('ToggleApprove')}</Text>)}
                            <Switch onTintColor='#feddb4' tintColor='#feddb4' thumbTintColor='#fbaa3e' value={this.state.listType} onValueChange={this.onSwitch}/>
                            {(<Text style={{fontFamily: 'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(1.8),textAlign:'center',paddingLeft:5}}>{I18n.t('ToggleCancel')}</Text>)}
                        </View>
                    </View>
                </View>
            </Card>
        
        )

    );
  }
}

const styles = StyleSheet.create({
   
});
