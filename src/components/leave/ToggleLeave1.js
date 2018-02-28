import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity,Switch,TouchableHighlight} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../../utils/i18n';
import ToggleLeave1detail from '../leave/ToggleLeave1detail'
export default class ToggleLeave1 extends React.Component {
  constructor(props) {
        super(props);
        this.state = {custom:false,pressStatus: false}
        this.onSwitch = this.onSwitch.bind(this);

  }
  onSwitch(value){  
    this.setState({custom:value});
}

  render() {
    return (
        (
            <Card style={{flex:1,padding:responsiveWidth(2)}}>
                <View style={{marginTop:responsiveHeight(1), marginBottom:responsiveHeight(2),marginLeft:responsiveWidth(3),marginRight:responsiveWidth(3)}}>
                    <View style={{flex:1,flexDirection: 'row' ,alignItems:"center",justifyContent:'flex-end'}}>
                        {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2),textAlign:'left'}}>{I18n.t('Toggle1Allday')}</Text>)}
                        <Switch onTintColor='#feddb4' tintColor='#feddb4' thumbTintColor='#fbaa3e' value={this.state.custom} onValueChange={this.onSwitch} />
                        {(<Text style={{fontFamily: 'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2),textAlign:'center'}}>{I18n.t('Toggle1Edit')}</Text>)}
                    </View>
                    <View style={{flexDirection: 'row', alignItems:'center',flex:1}}>
                        {(<Text style={{flex:1,fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2.3),textAlign:'left'}}>{I18n.t('dateToggle')}</Text>)}
                        {(<Text style={{flex:2,fontFamily:'Kanit-Medium', color:'#fbaa3e', fontSize:responsiveFontSize(2.3),textAlign:'left'}}>02 ก.พ. 2561</Text>)}
                        {(<Text style={{flex:2,fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2.3),textAlign:'left'}}>{`2 ${I18n.t('ga')}`}</Text>)}
                    </View>
                </View>
                {this.state.custom==true && <ToggleLeave1detail/>}
            </Card>
        
        )

    );
  }
}

const styles = StyleSheet.create({
   buttonTime: {
    alignItems: 'center',
    flex:1,
    borderWidth:responsiveWidth(0.5),
    borderRadius:responsiveWidth(2.3),
    borderColor:'#fbaa3e',
    height:responsiveHeight(6),
    margin:responsiveWidth(2),
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f1f2f6'
   },
   textbuttonTime: {
    fontFamily:'Kanit-Medium', 
    color:'#fbaa3e', 
    fontSize:responsiveFontSize(2),
    textAlign:'left',
   },
   
});
