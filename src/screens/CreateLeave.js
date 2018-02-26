import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Text } from 'native-base';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react';
import {post,get} from '../api';
import Loading from '../components/loading';
import CardHeader from '../components/cardHeader';
import store from 'react-native-simple-store';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {convertByFormatShort, disbackButton} from '../utils/staffioUtils';
import PTRView from 'react-native-pull-to-refresh';
import I18n from '../utils/i18n';

@inject('leaveStore')
@observer

export default class CreateLeave extends React.Component {
  componentWillMount(){
		disbackButton();
	}
  constructor(props){
    super(props);
    this.state={color:'#1abbbd'}

  }
  static navigationOptions = {
    header: null,
  };
  
  onPressButton(color){
    this.setState({color:color})
  }

  render() {
    const color ={sickL:'#1abbbd',errandL:'#8BC34C',vacationL:'#fa6575',otherL:'#f5dc0f'};
    return (
      
      <Container style={{backgroundColor: '#ffe9d4'}}>
          <CardHeader title={`${I18n.t('titleCreate')}`}/>
          <View style={{flexDirection: 'row', alignItems:'center', height:responsiveHeight(10),marginBottom:responsiveHeight(2),marginTop:responsiveHeight(1)}}>
            <TouchableOpacity style={{flex:1}} onPress={(e) => this.onPressButton(color.sickL)}>
              <View style={[styles.buttonstyle,{borderColor:color.sickL}]}>
                <Text style={[styles.textStyle,{color:color.sickL}]}>{I18n.t('sickLeave')}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex:1}} onPress={(e) => this.onPressButton(color.errandL)}>
              <View style={[styles.buttonstyle,{borderColor:color.errandL}]}>
                <Text style={[styles.textStyle,{color:color.errandL}]}>{I18n.t('errandLeave')}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex:1}} onPress={(e) => this.onPressButton(color.vacationL)}>
              <View style={[styles.buttonstyle,{borderColor:color.vacationL}]}>
                <Text style={[styles.textStyle,{color:color.vacationL}]}>{I18n.t('vacationLeave')}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flex:1}} onPress={(e) => this.onPressButton(color.otherL)}>
              <View style={[styles.buttonstyle,{borderColor:color.otherL}]}>
                <Text style={[styles.textStyle,{color:color.otherL}]}>{I18n.t('otherLeave')}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <TouchableOpacity style={{flex:1}} onPress={(e) => this.onPressButton(color.otherL)}>
              <View style={[styles.btn,{backgroundColor:'white'}]}>
                <Text style={[styles.textStyle,{fontSize:responsiveFontSize(2.2)}]}>{I18n.t('backCreate')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1}} onPress={(e) => this.onPressButton(color.otherL)}>
              <View style={[styles.btn,{backgroundColor:Colors.baseColor}]}>
                <Text style={[styles.textStyle,{color:'white',fontSize:responsiveFontSize(2.2)}]}>{I18n.t('nextCreate')}</Text>
              </View>
            </TouchableOpacity>
          </View>

      </Container>
    );
  }

}
const styles = StyleSheet.create({
  buttonstyle: {
    flex:1,
    backgroundColor:'white',
    height:responsiveHeight(10),
    margin:2.5,
    // borderRadius: responsiveWidth(1),
    borderBottomWidth:responsiveHeight(1),
    justifyContent: 'center',
  },
  textStyle: {
    textAlign:'center',
    fontFamily:'Kanit-Medium',
  },
  btn: {
    borderRadius: responsiveWidth(7),
    borderWidth:responsiveWidth(1),
    borderColor: Colors.baseColor,
    height: responsiveHeight(9),
    margin:responsiveWidth(4),
    justifyContent: 'center',
  }
});
