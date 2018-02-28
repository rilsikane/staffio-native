import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity,Switch,TouchableHighlight} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../../utils/i18n';
statusbutton = {allday: false, morning:false, afternoon: false,custom: false}
export default class ToggleLeave1detail extends React.Component {
  constructor(props) {
        super(props);
        this.state = { pressStsus: false}
  }
onClickbutton(index){
    this.setState({ pressStsus: true})
    if(index == 1){
        statusbutton.allday = true
    }if(index == 2){
        statusbutton.morning = true
    }
    if(index == 3){
        statusbutton.afternoon = true
    }
    if(index == 4){
        statusbutton.custom = true
    }
}
  render() {
    return (
        (
           <View>
                <View style={{borderTopWidth:responsiveHeight(0.1),borderColor:'#bdc3c7',marginLeft:responsiveWidth(3),marginRight:responsiveWidth(3)}}>
                    <View style={{flexDirection: 'row', alignItems:'center',flex:1,marginTop:responsiveHeight(2)}}>
                        {(<Text style={{flex:0,fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2),textAlign:'left'}}>{I18n.t('LeaveToggle')}</Text>)}
                        <Switch onTintColor='#feddb4' tintColor='#feddb4' thumbTintColor='#fbaa3e'/>
                        {(<Text style={{flex:0,fontFamily: 'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2),textAlign:'center'}}>{I18n.t('notLeaveToggle')}</Text>)}
                        {(<Text style={{flex:3,fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2.3),textAlign:'center'}}>กะปกติ</Text>)}
                        {(<Text style={{flex:0,fontFamily:'Kanit-Medium', color:'#fbaa3e', fontSize:responsiveFontSize(2.3),textAlign:'right'}}>9.00-12.00</Text>)}
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems:'center',flex:1}}>
                    <TouchableOpacity style={{flex:1}} onPress={()=> this.onClickbutton(1)}>
                        <View style={ statusbutton.allday ? styles.buttonTimePress : styles.buttonTime } >
                            {(<Text style={ statusbutton.allday ? styles.textbuttonTimePress : styles.textbuttonTime }>{I18n.t('Toggle1Allday')}</Text>)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} onPress={()=> this.onClickbutton(2)}>
                        <View style={ statusbutton.morning ? styles.buttonTimePress : styles.buttonTime } >
                            {(<Text style={ statusbutton.morning ? styles.textbuttonTimePress : styles.textbuttonTime }>{I18n.t('morning')}</Text>)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} onPress={()=> this.onClickbutton(3)}>
                        <View style={ statusbutton.afternoon ? styles.buttonTimePress : styles.buttonTime } >
                            {(<Text style={ statusbutton.afternoon ? styles.textbuttonTimePress : styles.textbuttonTime }>{I18n.t('afternoon')}</Text>)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} onPress={()=> this.onClickbutton(4)}>
                        <View style={ statusbutton.custom ? styles.buttonTimePress : styles.buttonTime } >
                            {(<Text style={ statusbutton.custom ? styles.textbuttonTimePress : styles.textbuttonTime }>{I18n.t('custom')}</Text>)}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        
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
   buttonTimePress: {
    alignItems: 'center',
    flex:1,
    borderWidth:responsiveWidth(0.5),
    borderRadius:responsiveWidth(2.3),
    borderColor:'#fbaa3e',
    height:responsiveHeight(6),
    margin:responsiveWidth(2),
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fbaa3e'
   },
   textbuttonTime: {
    fontFamily:'Kanit-Medium', 
    color: '#fbaa3e', 
    fontSize:responsiveFontSize(2),
    textAlign:'left',
   },
   textbuttonTimePress: {
    fontFamily:'Kanit-Medium', 
    color: 'white', 
    fontSize:responsiveFontSize(2),
    textAlign:'left',
   },
});
