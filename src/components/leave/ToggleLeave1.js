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
                <View style={{flex:1,flexDirection: 'row' ,alignItems:"center",justifyContent:'flex-end'}}>
                    {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2),textAlign:'left'}}>{I18n.t('Toggle1Allday')}</Text>)}
                    <Switch onTintColor='#feddb4' tintColor='#feddb4' thumbTintColor='#fbaa3e' />
                    {(<Text style={{fontFamily: 'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2),textAlign:'center'}}>{I18n.t('Toggle1Edit')}</Text>)}
                </View>
                <View style={{flexDirection: 'row', alignItems:'center',flex:1,borderBottomColor:'gray',borderBottomWidth:responsiveWidth(0.3)}}>
                    {(<Text style={{flex:1,fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2),textAlign:'left'}}>{I18n.t('Day')}</Text>)}
                    {(<Text style={{flex:2,fontFamily:'Kanit-Medium', color:'#fbaa3e', fontSize:responsiveFontSize(2),textAlign:'left'}}>02 ก.พ. 2561</Text>)}
                    {(<Text style={{flex:2,fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2),textAlign:'left'}}>{`2 ${I18n.t('ga')}`}</Text>)}
                </View>
                <View style={{flexDirection: 'row', alignItems:'center',flex:1}}>
                    {(<Text style={{flex:1,fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2),textAlign:'left'}}>{I18n.t('LeaveToggle')}</Text>)}
                    <Switch onTintColor='#feddb4' tintColor='#feddb4' thumbTintColor='#fbaa3e'/>
                    {(<Text style={{flex:1,fontFamily: 'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2),textAlign:'center'}}>{I18n.t('notLeaveToggle')}</Text>)}
                    {(<Text style={{flex:3,fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2),textAlign:'center'}}>กะปกติ</Text>)}
                    {(<Text style={{flex:3,fontFamily:'Kanit-Medium', color:'#fbaa3e', fontSize:responsiveFontSize(2),textAlign:'left'}}>9.00-12.00</Text>)}
                </View>
                <View style={{flexDirection: 'row', alignItems:'center',flex:1}}>
                    <TouchableOpacity style={{flex:1}}>
                        <View style={{alignItems: 'center',flex:1,borderWidth:responsiveWidth(0.5),borderRadius:responsiveWidth(2),borderColor:'#fbaa3e',height:responsiveHeight(6),margin:responsiveWidth(2)}}>
                            {(<Text style={{flex:3,fontFamily:'Kanit-Medium', color:'#fbaa3e', fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{I18n.t('Toggle1Allday')}</Text>)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}}>
                        <View style={{alignItems: 'center',flex:1,borderWidth:responsiveWidth(0.5),borderRadius:responsiveWidth(2),borderColor:'#fbaa3e',height:responsiveHeight(6),margin:responsiveWidth(2)}}>
                            {(<Text style={{flex:3,fontFamily:'Kanit-Medium', color:'#fbaa3e', fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{I18n.t('Toggle1Allday')}</Text>)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}}>
                        <View style={{alignItems: 'center',flex:1,borderWidth:responsiveWidth(0.5),borderRadius:responsiveWidth(2),borderColor:'#fbaa3e',height:responsiveHeight(6),margin:responsiveWidth(2)}}>
                            {(<Text style={{flex:3,fontFamily:'Kanit-Medium', color:'#fbaa3e', fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{I18n.t('Toggle1Allday')}</Text>)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}}>
                        <View style={{alignItems: 'center',flex:1,borderWidth:responsiveWidth(0.5),borderRadius:responsiveWidth(2),borderColor:'#fbaa3e',height:responsiveHeight(6),margin:responsiveWidth(2)}}>
                            {(<Text style={{flex:3,fontFamily:'Kanit-Medium', color:'#fbaa3e', fontSize:responsiveFontSize(1.8),textAlign:'left'}}>{I18n.t('Toggle1Allday')}</Text>)}
                        </View>
                    </TouchableOpacity>
                </View>
            </Card>
        
        )

    );
  }
}

const styles = StyleSheet.create({
   
});
