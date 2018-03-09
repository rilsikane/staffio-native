import React from 'react';
import RadioButton from 'react-native-radio-button'
import { StyleSheet, View,TextInput, TouchableOpacity,} from 'react-native';
import { Container, Content, Text, Card,CardItem,Input} from 'native-base';
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
                    <Text style={{flex:1,fontFamily:'Kanit', color:'#7e6560',fontSize:responsiveFontSize(1.8)}}>ก่อน</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Input style={styles.inputStyle3} placeholder=''/>
                        <Text style={{flex:0.5,fontFamily:'Kanit', color:'#fbaa3e',textAlign:'center',fontSize:responsiveFontSize(1.8)}}>ถึง</Text>
                        <Input style={styles.inputStyle3} placeholder=''/>
                    </View>
                </View>
            </View>

            <View style={{flexDirection:'row',alignItems:'center',marginBottom:responsiveHeight(1)}}>
                <View style={{flex:1}}>
                    <RadioButton  animation={'bounceIn'} isSelected={true} innerColor='#fbaa3e' outerColor='#fbaa3e'/>
                </View>
                <View style={{flex:3}}>
                    <Text style={{flex:1,fontFamily:'Kanit', color:'#7e6560',fontSize:responsiveFontSize(1.8)}}>หลัง</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Input style={styles.inputStyle3} placeholder=''/>
                        <Text style={{flex:0.5,fontFamily:'Kanit', color:'#fbaa3e',textAlign:'center',fontSize:responsiveFontSize(1.8)}}>ถึง</Text>
                        <Input style={styles.inputStyle3} placeholder=''/>
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
      },
      inputStyle3: {
        // marginLeft: responsiveWidth(2),
        // marginRight: responsiveWidth(2),
        borderRadius: 1,
        borderRadius: 5,
        backgroundColor: "#F2F2F2",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#FAAA3E",
        fontFamily: "Kanit",
        fontSize: responsiveFontSize(1.8),
        height: responsiveHeight(6),
        color: '#FAAA3E',
        paddingLeft: responsiveWidth(5)
    },
  });
  