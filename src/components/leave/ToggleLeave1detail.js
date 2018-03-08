import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity,Switch,TouchableHighlight} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../../utils/i18n';
import SwitchSelector from 'react-native-switch-selector'

export default class ToggleLeave1detail extends React.Component {
  constructor(props) {
        super(props);
        this.statusbutton = {allday: true, morning:false, afternoon: false,custom: false};
        this.state = { pressStsus: 0,workStart:"",workEnd:"",statusbutton:this.statusbutton}
        
  }
onClickbutton(index){
    let statButtn = this.statusbutton;
    if(index == 1){
        statButtn.allday = true
    }else{
        statButtn.allday = false
    }
    if(index == 2){
        statButtn.morning = true
    }else{
        statButtn.morning = false
    }
    if(index == 3){
        statButtn.afternoon = true
    }else{
        statButtn.afternoon = false
    }
    if(index == 4){
        statButtn.custom = true
    }else{
        statButtn.custom = false
    }
    this.setState({ pressStsus: index,statusbutton:statButtn})
}
renderWorkTime(shiftData){
    const workStart = shiftData.WORK_START_TM.substring(0,5);
    const workEnd = shiftData.WORK_END_TM.substring(0,5);
    const restStart = shiftData.REST_START_TM.substring(0,5);
    const restEnd = shiftData.REST_END_TM.substring(0,5);
    switch (this.state.pressStsus) {
        case 1:
          return workStart+"-"+workEnd
          break;
        case 2:
          return workStart+"-"+restStart
          break;
        case 3:
          return restEnd+"-"+workEnd
          break;
        default:
        return workStart+"-"+workEnd
      }
}
  render() {
    
    const options = [
        { label: '', value: false },
        { label: '', value: true }
    ];
    return (
        (
           <View style={{flex:1}}>
                <View style={{borderTopWidth:responsiveHeight(0.1),borderColor:'#bdc3c7',marginLeft:responsiveWidth(3),marginRight:responsiveWidth(3),flex:1}}>
                    <View style={{flexDirection: 'row', alignItems:'center',flex:1,marginTop:responsiveHeight(2)}}>
                        {(<Text style={{flex:1,fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2.3),textAlign:'left'}}>{this.props.shiftData.SHFT_NAME_TH}</Text>)}
                        {(<Text style={{flex:1,fontFamily:'Kanit-Medium', color:'#fbaa3e', fontSize:responsiveFontSize(2.3),textAlign:'right'}}>
                        {this.renderWorkTime(this.props.shiftData)}
                        </Text>)}
                    </View>
                    <View style={{flexDirection: 'row', alignItems:'center',flex:1,marginTop:responsiveHeight(2)}}>
                        {(<Text style={{flex:0,fontFamily:'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2),textAlign:'left'}}>{I18n.t('LeaveToggle')}</Text>)}
                        <View style={{width:responsiveWidth(18),marginLeft:10,marginRight:10}}>
                        <SwitchSelector options={options} initial={this.state.localeIndex} borderColor="#333" buttonColor="#fbaa3e" height={25} 
                                fontSize={responsiveFontSize(1)}  onPress={this.onSwitch} backgroundColor="#feddb4" hasPadding={false}/>
                        </View>
                        {(<Text style={{flex:0,fontFamily: 'Kanit-Medium', color:'#7e6560', fontSize:responsiveFontSize(2),textAlign:'center'}}>{I18n.t('notLeaveToggle')}</Text>)}
                        
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems:'center',flex:1}}>
                    <TouchableOpacity style={{flex:1}} onPress={()=> this.onClickbutton(1)}>
                        <View style={ this.state.statusbutton.allday ? styles.buttonTimePress : styles.buttonTime } >
                            {(<Text style={ this.state.statusbutton.allday ? styles.textbuttonTimePress : styles.textbuttonTime }>{I18n.t('Toggle1Allday')}</Text>)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} onPress={()=> this.onClickbutton(2)}>
                        <View style={ this.state.statusbutton.morning ? styles.buttonTimePress : styles.buttonTime } >
                            {(<Text style={ this.state.statusbutton.morning ? styles.textbuttonTimePress : styles.textbuttonTime }>{I18n.t('morning')}</Text>)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} onPress={()=> this.onClickbutton(3)}>
                        <View style={ this.state.statusbutton.afternoon ? styles.buttonTimePress : styles.buttonTime } >
                            {(<Text style={ this.state.statusbutton.afternoon ? styles.textbuttonTimePress : styles.textbuttonTime }>{I18n.t('afternoon')}</Text>)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} onPress={()=> this.onClickbutton(4)}>
                        <View style={ this.state.statusbutton.custom ? styles.buttonTimePress : styles.buttonTime } >
                            {(<Text style={ this.state.statusbutton.custom ? styles.textbuttonTimePress : styles.textbuttonTime }>{I18n.t('custom')}</Text>)}
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
