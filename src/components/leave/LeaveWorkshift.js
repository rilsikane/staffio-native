import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity,Switch,TouchableHighlight,ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../../utils/i18n';
import ToggleLeave1detail from '../leave/ToggleLeave1detail'
import SwitchSelector from 'react-native-switch-selector'
import {convertByFormatShort} from '../../utils/staffioUtils';
export default class LeaveWorkshift extends React.Component {
  constructor(props) {
        super(props);
        this.state = {custom:false,pressStatus: false}
        this.onSwitch = this.onSwitch.bind(this);
        this.switchShiftDay = this.switchShiftDay.bind(this);

  }
  onSwitch(value){  
    this.setState({custom:value});
  }
  switchShiftDay(shiftData){
      this.props.switchShiftDay(shiftData,this.props.id[0]);
  }
  renderLeaveToggle(leavePattern){
    return leavePattern.shiftData.map(shift=>{
        return (<ToggleLeave1detail shiftData={shift} key={shift.PATTERN_ID} 
            disabled={leavePattern.shiftData.length<2} switchShiftDay={this.switchShiftDay} />)
    });
  }
  render() {
    const options = [
        { label: '', value: false },
        { label: '', value: true }
    ];
   
    const  leavePattern = this.props.leavePattern[this.props.id];
    return (
        
        (
            <View style={{paddingTop:5}}>
            <View style={{padding:responsiveWidth(2),backgroundColor:"#fff"
                ,height:responsiveHeight(13),marginLeft:5,marginRight:5,marginTop:2}}>
                <View style={{marginTop:responsiveHeight(0.5), marginBottom:responsiveHeight(2),marginLeft:responsiveWidth(3),marginRight:responsiveWidth(3),flex:1}}>
                    <View style={{flex:1,flexDirection: 'row' ,alignItems:"center",justifyContent:'flex-end',marginTop:responsiveHeight(2)}}>
                        {(<Text style={{fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(1.5),textAlign:'left',paddingRight:10}}>{I18n.t('Toggle1Allday')}</Text>)}
                        {/* <Switch onTintColor='#feddb4' tintColor='#feddb4' 
                        thumbTintColor='#fbaa3e' value={this.state.custom} onValueChange={this.onSwitch} /> */}
                         <View style={{width:responsiveWidth(20)}}>
                            <SwitchSelector  options={options} initial={this.state.localeIndex} height={26}
                            borderColor="#333" buttonColor="#fbaa3e" ontSize={responsiveFontSize(2)}  onPress={this.onSwitch} backgroundColor="#feddb4" hasPadding={false}/>
                        </View>
                        {(<Text style={{fontFamily: 'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(1.5),textAlign:'center',paddingLeft:10}}>{I18n.t('Toggle1Edit')}</Text>)}
                    </View>
                    <View style={{flexDirection: 'row', alignItems:'center',width:responsiveWidth(65),marginTop:12}}>
                        {(<Text style={{flex:1,fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2.3),textAlign:'left'}}>{I18n.t('dateToggle')}</Text>)}
                        {(<Text style={{flex:2,fontFamily:'Kanit-Medium', color:'#fbaa3e', fontSize:responsiveFontSize(2.3),textAlign:'left'}}>{convertByFormatShort(new Date(this.props.id).getTime(),"DD MMM ")}</Text>)}
                        {(<Text style={{flex:2,fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2.3),textAlign:'left'}}>{`${leavePattern.shiftData.length} ${I18n.t('ga')}`}</Text>)}
                    </View>
                    
                </View>
                
            </View>
            {this.state.custom==true && 
                <View style={{padding:responsiveWidth(2),backgroundColor:"#fff",marginLeft:5,marginRight:5}}>
                    {this.renderLeaveToggle(leavePattern)}
                </View>}
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
   textbuttonTime: {
    fontFamily:'Kanit-Medium', 
    color:'#fbaa3e', 
    fontSize:responsiveFontSize(2),
    textAlign:'left',
   },
   
});
