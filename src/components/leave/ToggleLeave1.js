import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity,Switch} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../../utils/i18n';

export default class ToggleLeave1 extends React.Component {
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
            <Card style={{flex:1,padding:responsiveWidth(2)}}>
                <View style={{marginTop:responsiveHeight(1), marginBottom:responsiveHeight(2),marginLeft:responsiveWidth(3),marginRight:responsiveWidth(3)}}>
                    <View style={{flex:1,flexDirection: 'row' ,alignItems:"center",justifyContent:'flex-end'}}>
                        {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2),textAlign:'left'}}>{I18n.t('Toggle1Allday')}</Text>)}
                        <Switch onTintColor='#feddb4' tintColor='#feddb4' thumbTintColor='#fbaa3e' />
                        {(<Text style={{fontFamily: 'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2),textAlign:'center'}}>{I18n.t('Toggle1Edit')}</Text>)}
                    </View>
                    <View style={{flexDirection: 'row', alignItems:'center',flex:1}}>
                        {(<Text style={{flex:1,fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2.3),textAlign:'left'}}>{I18n.t('Day')}</Text>)}
                        {(<Text style={{flex:2,fontFamily:'Kanit-Medium', color:'#fbaa3e', fontSize:responsiveFontSize(2.3),textAlign:'left'}}>02 ก.พ. 2561</Text>)}
                        {(<Text style={{flex:2,fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2.3),textAlign:'left'}}>{`2 ${I18n.t('ga')}`}</Text>)}
                    </View>
                </View>
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
                    <TouchableOpacity style={{flex:1}}>
                        <View style={styles.buttonTime}>
                            {(<Text style={styles.textbuttonTime}>{I18n.t('Toggle1Allday')}</Text>)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}}>
                        <View style={styles.buttonTime}>
                            {(<Text style={styles.textbuttonTime}>{I18n.t('morning')}</Text>)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}}>
                        <View style={styles.buttonTime}>
                            {(<Text style={styles.textbuttonTime}>{I18n.t('afternoon')}</Text>)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}}>
                        <View style={styles.buttonTime}>
                            {(<Text style={styles.textbuttonTime}>{I18n.t('custom')}</Text>)}
                        </View>
                    </TouchableOpacity>
                </View>
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
    justifyContent: 'center'
   },
   textbuttonTime: {
    fontFamily:'Kanit-Medium', 
    color:'#fbaa3e', 
    fontSize:responsiveFontSize(2),
    textAlign:'left',
   }
});
