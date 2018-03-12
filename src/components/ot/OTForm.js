import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity} from 'react-native';
import { Input, Item, Grid, Col, ListItem, CheckBox, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import I18n from '../../utils/i18n';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class OTForm extends React.Component {
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
                <ListItem style={styles.listItemStyle}>
                    <Text style={styles.textInput}>ระบุวัน :</Text>
                </ListItem>
                <Item style={{borderColor: '#FFFFFF'}}>
                    <Input style={styles.inputStyle1} />
                    <FontAwesome name='calendar' size={responsiveWidth(5)} color='#FAAA3E' style={{marginRight: responsiveWidth(5)}}/>
                </Item>

                <ListItem style={styles.listItemStyle}>
                    <Text style={styles.textInput}>ระบุกะ :</Text>
                </ListItem>
                <Item style={{borderColor: '#FFFFFF'}}>
                    <Input style={styles.inputStyle2} />
                </Item>   

                <ListItem style={styles.listItemStyle}>
                    <Text style={styles.textInput}>เวลามาตรฐาน</Text>
                </ListItem>
                <Item style={{borderColor: '#FFFFFF'}}>
                    <Input style={styles.inputStyle3} onFocus={this._showDateTimePicker} placeholder=''/>
                    {/* <DateTimePicker mode='time' isVisible={this.state.isDateTimePickerVisible} onConfirm={this._handleDatePicked} onCancel={this._hideDateTimePicker}/> */}
                    <Text style={styles.textInput2} >ถึง</Text>
                    <Input style={styles.inputStyle3} onFocus={this._showDateTimePicker} placeholder=''/>
                </Item>   

                <ListItem style={styles.listItemStyle}>
                    <Text style={styles.textInput}>Master กะ</Text>
                </ListItem>
                <Item style={{borderColor: '#FFFFFF',marginBottom:responsiveHeight(1)}}>
                    <Input style={styles.inputStyle3} onFocus={this._showDateTimePicker} placeholder=''/>
                    <Text style={styles.textInput2}>ถึง</Text>
                    <Input style={styles.inputStyle3} onFocus={this._showDateTimePicker} placeholder=''/>
                </Item>                                                           
            </Col>
        </Grid>
        <DateTimePicker mode='time' isVisible={this.state.isDateTimePickerVisible} onConfirm={this._handleDatePicked} onCancel={this._hideDateTimePicker}/>
        </Card>
            );
        }
        }

const styles = StyleSheet.create({
    listItemStyle: {
        borderColor: '#ffffff', 
        height: responsiveHeight(0.2),
        marginTop: responsiveHeight(0.5),
        marginBottom: responsiveHeight(0.5),
        
    },
    inputStyle1: {
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
        paddingLeft: responsiveWidth(5)
    },
    inputStyle2: {
        marginLeft: responsiveWidth(5),
        marginRight: responsiveWidth(15),
        borderRadius: 1,
        borderRadius: 5,
        backgroundColor: "#f5f6fa",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#FAAA3E",
        fontFamily: "Kanit",
        fontSize: responsiveFontSize(1.8),
        height: responsiveHeight(6),
        paddingLeft: responsiveWidth(5)
    },
    inputStyle3: {
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
        marginLeft: responsiveWidth(2),
    },
    textInput2: {
        fontFamily: "Kanit",
        fontSize: responsiveFontSize(1.8),
        color: '#FAAA3E'
    }
});