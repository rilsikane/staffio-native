import React from 'react';
import RadioButton from 'react-native-radio-button'
import { StyleSheet, View,TextInput, TouchableOpacity,} from 'react-native';
import { Container, Content, Text, Card,CardItem} from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class TimeBeforeAffter extends React.Component {
 
  render() {
    return (
        <Card>
            <View style={{flexDirection:'row',alignItems:'center',marginTop:responsiveHeight(1)}}>
                <View style={{flex:1}}>
                    <RadioButton  animation={'bounceIn'} isSelected={true} innerColor='#fbaa3e' outerColor='#fbaa3e'/>
                </View>
                <View style={{flex:3}}>
                    <Text style={{flex:1,fontFamily:'Kanit-Medium', color:'#7e6560',fontSize:responsiveFontSize(2)}}>ก่อน</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TextInput style={[styles.textAreaStyle]} editable = {true} maxLength = {100} multiline = {true} numberOfLines = {1} 
                        underlineColorAndroid='transparent' />
                        <Text style={{flex:1,fontFamily:'Kanit-Medium', color:'#fbaa3e',textAlign:'center',fontSize:responsiveFontSize(2)}}>ถึง</Text>
                        <TextInput style={[styles.textAreaStyle]} editable = {true} maxLength = {100} multiline = {true} numberOfLines = {1} 
                        underlineColorAndroid='transparent' />
                    </View>
                </View>
            </View>

            <View style={{flexDirection:'row',alignItems:'center',marginBottom:responsiveHeight(1)}}>
                <View style={{flex:1}}>
                    <RadioButton  animation={'bounceIn'} isSelected={true} innerColor='#fbaa3e' outerColor='#fbaa3e'/>
                </View>
                <View style={{flex:3}}>
                    <Text style={{flex:1,fontFamily:'Kanit-Medium', color:'#7e6560',fontSize:responsiveFontSize(2)}}>หลัง</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TextInput style={[styles.textAreaStyle]} editable = {true} maxLength = {100} multiline = {true} numberOfLines = {1} 
                        underlineColorAndroid='transparent' />
                        <Text style={{flex:1,fontFamily:'Kanit-Medium', color:'#fbaa3e',textAlign:'center',fontSize:responsiveFontSize(2)}}>ถึง</Text>
                        <TextInput style={[styles.textAreaStyle]} editable = {true} maxLength = {100} multiline = {true} numberOfLines = {1} 
                        underlineColorAndroid='transparent' />
                    </View>
                </View>
            </View>   
        </Card>
    );
  }
}

const styles = StyleSheet.create({
    textAreaStyle: {
        fontFamily: "Kanit",
        fontSize: responsiveFontSize(1.8),
        height:80,
        marginTop:5,
        borderRadius: responsiveWidth(1.5),
        backgroundColor:'#f5f6fa',
        borderWidth: responsiveWidth(0.5),
        flex:2,
        borderColor:'#fbaa3e',
        height:responsiveHeight(5),
        marginLeft: responsiveWidth(1),
        marginRight: responsiveWidth(1)
      }
  });
  