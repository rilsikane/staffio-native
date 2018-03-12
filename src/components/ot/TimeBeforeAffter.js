import React from 'react';
import RadioButton from 'react-native-radio-button'
import { StyleSheet, View,TextInput, TouchableOpacity,} from 'react-native';
import { Input, Item, Grid, Col, ListItem, CheckBox, Container, Content, Text, Card, CardItem} from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class TimeBeforeAffter extends React.Component {
    state = {
        isDateTimePickerVisible: false,
      };
    
      _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    
      _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
      _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
      };
  render() {
    return (
        <Card style={{paddingBottom: responsiveHeight(2), paddingTop: responsiveHeight(1)}}>

        <Grid>
            <Col >
                <ListItem style={styles.listItemStyle2}>
                    <Text style={styles.textInput}>ก่อน</Text>
                </ListItem>
                <ListItem style={styles.listItemStyle}>
                    <RadioButton size={12} animation={'bounceIn'} isSelected={true} innerColor='#fbaa3e' outerColor='#fbaa3e'/>
                <Item style={{borderColor: '#FFFFFF'}}>
                    <Input style={styles.inputStyle} onFocus={this._showDateTimePicker} placeholder=''/>
                    <Text style={styles.textInput2}>ถึง</Text>
                    <Input style={styles.inputStyle} onFocus={this._showDateTimePicker} placeholder=''/>
                </Item>
                </ListItem>    

                <ListItem style={styles.listItemStyle2}>
                    <Text style={styles.textInput}>หลัง</Text>
                </ListItem>
                <ListItem style={styles.listItemStyle}>
                    <RadioButton size={12} animation={'bounceIn'} isSelected={true} innerColor='#f5f6fa' outerColor='#fbaa3e'/>
                <Item style={{borderColor: '#FFFFFF'}}>
                    <Input style={styles.inputStyle} onFocus={this._showDateTimePicker} placeholder=''/>
                    <Text style={styles.textInput2}>ถึง</Text>
                    <Input style={styles.inputStyle} onFocus={this._showDateTimePicker} placeholder=''/>
                </Item>
                </ListItem>                                                    
            </Col>
        </Grid>
            {/* <View style={{flexDirection:'row',alignItems:'center',marginTop:responsiveHeight(1)}}>
                <View style={{flex:1}}>
                    <RadioButton  animation={'bounceIn'} isSelected={true} innerColor='#fbaa3e' outerColor='#fbaa3e'/>
                </View>
                <View style={{flex:3}}>
                    <Text style={{flex:1,fontFamily:'Kanit', color:'#7e6560',fontSize:responsiveFontSize(1.8)}}>ก่อน</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Input style={styles.inputStyle3} onFocus={this._showDateTimePicker} placeholder=''/>
                        <Text style={{flex:0.5,fontFamily:'Kanit', color:'#fbaa3e',textAlign:'center',fontSize:responsiveFontSize(1.8)}}>ถึง</Text>
                        <Input style={styles.inputStyle3} onFocus={this._showDateTimePicker} placeholder=''/>
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
                        <Input style={styles.inputStyle3} onFocus={this._showDateTimePicker} placeholder=''/>
                        <Text style={{flex:0.5,fontFamily:'Kanit', color:'#fbaa3e',textAlign:'center',fontSize:responsiveFontSize(1.8)}}>ถึง</Text>
                        <Input style={styles.inputStyle3} onFocus={this._showDateTimePicker} placeholder=''/>
                    </View>
                </View>
            </View>   */}
            <DateTimePicker mode='time' isVisible={this.state.isDateTimePickerVisible} onConfirm={this._handleDatePicked} onCancel={this._hideDateTimePicker}/> 
        </Card>
    );
  }
}

const styles = StyleSheet.create({
    listItemStyle: {
        borderColor: '#ffffff', 
        height: responsiveHeight(6),
        marginTop: responsiveHeight(0.5),
        marginBottom: responsiveHeight(0.5),
    },
    listItemStyle2: {
        borderColor: '#ffffff', 
        height: responsiveHeight(1),
        paddingBottom: responsiveHeight(2),
        paddingTop: responsiveHeight(2)
    },
    inputStyle: {
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(5),
        borderRadius: 1,
        borderRadius: 5,
        backgroundColor: "#f5f6fa",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#FAAA3E",
        fontFamily: "Kanit",
        fontSize: responsiveFontSize(1.8),
        height: responsiveHeight(6),
        color: '#FAAA3E',
        paddingLeft: responsiveWidth(5)
    },
    textInput: {
        fontFamily: "Kanit",
        fontSize: responsiveFontSize(1.8),
        color: '#7e6560',
        marginLeft: responsiveWidth(11),
    },
    textInput2: {
        fontFamily: "Kanit",
        fontSize: responsiveFontSize(1.8),
        color: '#FAAA3E'
    }
  });
  