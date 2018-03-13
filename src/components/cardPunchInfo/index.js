import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Content, Thumbnail, Text, Left, Right, Button, Title, Body, Card, CardItem, Badge, Form, Item, Input, Label, Footer, FooterTab, ListItem, List } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { em, round } from '../../constants/Layout';
import moment from 'moment';
import app from '../../stores/app';
import { convertByFormat } from '../../utils/staffioUtils';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
//import Image from 'react-native-image-progress';
//import * as Progress from 'react-native-progress';
import Colors from '../../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CardPunchInfo extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.app = app;
    moment.locale(this.app.locale)
  }
  onPress() {
    this.props.onPress(this.props.timeRecord);
  }
  renderWorkTime(timeRecord) {
    if (timeRecord.timeRecordType.indexOf("I") !== -1) {
      return `${timeRecord.workStartTM.split(":")[0]}:${timeRecord.workStartTM.split(":")[1]}`;
    } else {
      return `${timeRecord.workEndTM.split(":")[0]}:${timeRecord.workEndTM.split(":")[1]}`;
    }
  }

  changcolorborder(flag) {
    if (flag == 'Y') {
      return { color: '#ff8c00' }
    } else {
      return { color: 'red' }
    }
  }


  render() {
    const { timeRecord } = this.props;
    return (

      <TouchableOpacity onPress={this.onPress}>
        <Card style={{ marginTop: 2 }}>
          <View style={{flexDirection:'row',alignItems:'center',margin:responsiveWidth(3)}}>
            <View style={{flex:1.5}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Icon name="calendar" style={styles.iconCa} />
                  <Text  numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false} style={styles.bacisText}>{convertByFormat(timeRecord.dateRecord, "DD MMM ")}</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Icon name="location-arrow" style={[styles.icon,{fontSize:responsiveFontSize(2)}]} />
                  <Text numberOfLines={1} ellipsizeMode="tail"  allowFontScaling={false} style={[styles.litelText, this.changcolorborder(timeRecord.area_flag)]} numberOfLines={1}>
                  {`  ${timeRecord.branchName}`}
                  </Text>
              </View>
            </View>

            <View style={{flex:1}}>
              <View style={{flexDirection:'row',alignItems:'center',marginLeft:responsiveWidth(4)}}>
                <Text  numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false} style={"NM" == timeRecord.status ? styles.numberText : styles.numberLate}>{`${timeRecord.timeRecord.split(":")[0]}:${timeRecord.timeRecord.split(":")[1]}`} </Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',marginLeft:responsiveWidth(4)}}>
                  <Icon name="chevron-up" style={[styles.icon,{color:'#9fa1a3'}]} />
                  <Text numberOfLines={1} ellipsizeMode="tail"  allowFontScaling={false} style={styles.noteText} note> {this.renderWorkTime(timeRecord)} </Text>
              </View>
            </View>

            <View style={{flex:1,borderLeftWidth:responsiveWidth(0.5),borderColor:'gray'}}>
              <View style={{flexDirection:'row',alignItems:'center',marginLeft:responsiveWidth(4)}}>
                <Text  numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false} style={"NM" == timeRecord.status ? styles.numberText : styles.numberLate}>{`${timeRecord.timeRecord.split(":")[0]}:${timeRecord.timeRecord.split(":")[1]}`} </Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',marginLeft:responsiveWidth(4)}}>
                  <Icon name="chevron-down" style={[styles.icon,{color:'#9fa1a3'}]} />
                  <Text numberOfLines={1} ellipsizeMode="tail"  allowFontScaling={false} style={styles.noteText} note> {this.renderWorkTime(timeRecord)} </Text>
              </View>
            </View>

            <View style={{flex:0.7}}>
              <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'red',height:responsiveHeight(5),borderRadius:responsiveWidth(3)}}>
                <Text style={{flex:0,fontSize:responsiveFontSize(5),color:'white',textAlign:'center'}}>•</Text>
                <Text style={{flex:1,fontSize:responsiveFontSize(2),color:'white',textAlign:'center',fontFamily: 'Kanit'}}>Late</Text>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    color: '#545254',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Kanit',
    backgroundColor:'transparent'
  },
  headText: {
    color: '#ff8c00',
    fontSize: responsiveFontSize(2),
    fontFamily: 'Kanit',
    backgroundColor:'transparent'
  },
  noteText: {
    color: '#9fa1a3',
    fontSize: responsiveFontSize(1.5),
    fontFamily: 'Kanit',
    backgroundColor:'transparent',
  },
  noteTimeText: {
    color: '#9fa1a3',
    fontSize: responsiveFontSize(1.1),
    fontFamily: 'Kanit',
    backgroundColor:'transparent'
  },
  litelText: {
    fontSize: responsiveFontSize(2),
   // color: '#ff8c00',
    fontFamily: 'Kanit',
     backgroundColor:'transparent',
     flex:1
  },
  bacisText: {
    fontSize: responsiveFontSize(2),
    color: '#818283',
    fontFamily: 'Kanit',
    backgroundColor:'transparent'
  },
  numberText: {
    fontSize: responsiveFontSize(3),
    color: '#6d6e71',
    fontFamily: 'Kanit',
    backgroundColor:'transparent'
  },
  numberLate: {
    fontSize: responsiveFontSize(3),
    color: 'red',
    fontFamily: 'Kanit',
    backgroundColor:'transparent'
  },
  imageHead: {
    height: responsiveHeight(8),
    width: responsiveWidth(15),
    borderRadius: responsiveWidth(1),
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 5,
    borderRightWidth: 1

  },
  image: {
    height: 4,
    width: 4,
    borderRadius: 2
  },
  iconCa: {
    marginRight: 3,
    fontSize: responsiveFontSize(2),
    color: '#818283',
    justifyContent: 'center',
    backgroundColor:'transparent'

  },
  icon: {
    fontSize: responsiveFontSize(1.6),
    color: '#ff8c00',
    backgroundColor:'transparent'
  },
  content: {
    alignItems: 'flex-start'
  }
});
