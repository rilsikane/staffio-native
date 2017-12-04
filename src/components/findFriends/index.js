import React from 'react';
import {View,Text,TextInput,Image,KeyboardAvoidingView} from 'react-native';
import {Grid,Row,Body,Button,Item,Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {em,x,y} from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class FindFriends extends React.Component {
 constructor(props){
    super(props);
    this.state = {isFocus:false};
  }
render() {
  const props = this.props;
  return(
      <KeyboardAvoidingView behavior='padding' style={styles.workShiftContainerStyle}>
        <Grid>
          <Row size={responsiveHeight(1.5)}>
            <Body>
              <HideWithKeyboard>
                <Text allowFontScaling={false}style={styles.TextHeader}>Find Friends</Text>
              </HideWithKeyboard>
            </Body>
          </Row>
          <Row style={styles.RowStyle} size={responsiveHeight(5.5)}>
            <Body>
              <HideWithKeyboard>
              <Image source={require('../../../img/team.png')} style={{height: responsiveHeight(36),width: responsiveWidth(64),}} />
               </HideWithKeyboard>
            </Body>
          </Row>
         
          <Row size={responsiveHeight(2.5)}>
            <Body>
              <Text allowFontScaling={false}style={styles.TextStyle1}>ระบุข้อมูลของเพื่อนคุณที่ต้องการค้นหา</Text>
              <Text allowFontScaling={false}style={styles.TextStyle2}>โดยค้นหาจาก ID, ชื่อ, นามสกุล, ชื่อเล่น, แผนก</Text>
              <Text allowFontScaling={false}style={styles.TextStyle3}>เบอร์ติดต่อ, มือถือ, อีเมล์ และ Social Account</Text>
            </Body>
          </Row>
          <Row size={responsiveHeight(1.5)}>
            <Body style={{flex:1}}>
                <View style={{width:x,paddingLeft:50,paddingRight:50,paddingBottom:10}}>
                  <Item style={{borderColor:Colors.baseColor}}>
                      <Input style={{fontSize:responsiveFontSize(1.8),color:Colors.baseColor}} value={props.value} onChangeText={props.onChangeText} returnKeyType="search"
                    onSubmitEditing={props.onSubmitEditing} onFocus={()=>this.setState({isFocus:true})}/>
                      {!this.state.isFocus && <Icon style={{fontSize:em(1.2),paddingTop:10,paddingRight:5,color:Colors.baseColor}} active name='search' />}
                  </Item>
                </View>
            </Body>
          </Row>
          <Row size={responsiveHeight(4)}>
          <Body>
            <View style={{width: x-100}}>
              <Button block style={styles.buttonStyle1} onPress={props.onPress}>
                <Text allowFontScaling={false}style={styles.TextStyleButton}>Find Friends</Text>
                </Button>
            </View>
          </Body>
          </Row>

        </Grid>
      </KeyboardAvoidingView>
  );
  }
}
const styles={
  workShiftContainerStyle:{
      backgroundColor: '#FFF',
      flexDirection: 'row',
      paddingTop: 3,
      paddingBottom: 20,
      backgroundColor: 'white',
      height:responsiveHeight(85)
  },
  TextHeader:{
    fontWeight: '500',
    color:'#f58020',
    fontSize:responsiveFontSize(3),
    fontFamily:'Kanit',
    backgroundColor:"transparent"
  },
  TextStyle1:{
    fontSize:responsiveFontSize(2.2),
    fontFamily:'Kanit',
    backgroundColor:"transparent"
  },
  TextStyle2:{
    marginTop:10,
    fontSize:responsiveFontSize(1.8),
    color:'#a9a9a9',
    fontFamily:'Kanit',
    backgroundColor:"transparent"
  },
  TextStyle3:{
    fontSize:responsiveFontSize(1.8),
    color:'#a9a9a9',
    fontFamily:'Kanit',
    backgroundColor:"transparent"
  },
  buttonStyle1:{
    borderRadius: 5,
    height: em(2.8),
    backgroundColor: '#f58020'
  },
  buttonStyle2:{
    borderRadius: 5,
    height: em(2.8),
    marginTop:5,
    backgroundColor: '#a9a9a9'
  },
  TextStyleButton:{
    fontSize:responsiveFontSize(2.2),
    color:'white',
    fontFamily:'Kanit',
    backgroundColor:"transparent"
  },
  RowStyle:{
    borderTopWidth:1,
    borderColor:'#dcdcdc'
  },
}
