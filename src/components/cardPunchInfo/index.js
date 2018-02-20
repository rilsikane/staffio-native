import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Content, Thumbnail, Text, Left, Right, Button, Icon, Title, Body, Card, CardItem, Badge, Form, Item, Input, Label, Footer, FooterTab, ListItem, List } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { em, round } from '../../constants/Layout';
import moment from 'moment';
import app from '../../stores/app';
import { convertByFormat } from '../../utils/staffioUtils';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
//import Image from 'react-native-image-progress';
//import * as Progress from 'react-native-progress';
import Colors from '../../constants/Colors'

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
          <Grid height={70}>
            <Col size={2} style={timeRecord.timeRecordType.indexOf("I") !== -1 ? { backgroundColor: "green" } : { backgroundColor: "red" }}></Col>
            <Col size={20} >
              <View style={{ flex: 1, alignItems: 'flex-start' }}>

                <Image source={{ uri: `${timeRecord.imagepath_tempMobile}` }} style={styles.imageHead}></Image>
              </View>
            </Col>
            <Col size={55} >
              <Row size={30} >
                <Text allowFontScaling={false} style={styles.titleText}>{timeRecord.fullNameTH} </Text>
              </Row>
              <Row size={25} style={{ marginTop: 0, justifyContent: 'flex-start' }}>
                <Text allowFontScaling={false} style={styles.noteText} numberOfLines={1}> {timeRecord.empCode}  {timeRecord.positionName} </Text>
              </Row>
              <Row size={45} style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 0 }}>
                <Col size={30}>
                  <View style={{ flexDirection: 'row', alignItems: "center", borderRightWidth: 0.5, borderRightColor: '#9fa1a3', marginTop: 2, backgroundColor:'transparent' }}>
                    <Text allowFontScaling={false} style={styles.noteTimeText}>•</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail"  allowFontScaling={false} style={styles.noteTimeText}>{moment(timeRecord.dateRecord.replace("00:00:00", timeRecord.timeRecord)).fromNow()}</Text>
                  </View>
                </Col>
                <Col size={70}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                    <Icon name="navigate" style={styles.icon} />
                    <Text numberOfLines={1} ellipsizeMode="tail"  allowFontScaling={false} style={[styles.litelText, this.changcolorborder(timeRecord.area_flag)]} numberOfLines={1}>
                      {timeRecord.branchName}
                    </Text>
                  </View>
                </Col>

              </Row>
            </Col>
            <Col size={25}>
              <Row size={10} style={{ flex: 1, justifyContent: 'center' }}>
                <Icon name="calendar" style={styles.iconCa} />
                <Text  numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false} style={styles.bacisText}>{convertByFormat(timeRecord.dateRecord, "DD MMM ")}</Text>
              </Row>
              <Row size={35} style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: "transparent", marginTop: -responsiveHeight(3), zIndex: 9999 }}>
                <Text  numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false} style={"NM" == timeRecord.status ? styles.numberText : styles.numberLate}>{`${timeRecord.timeRecord.split(":")[0]}:${timeRecord.timeRecord.split(":")[1]}`} </Text>
              </Row>
              <Row size={55} style={{ flex: 1, justifyContent: 'center', marginTop: -responsiveHeight(1) }}>
                <Text numberOfLines={1} ellipsizeMode="tail"  allowFontScaling={false} style={styles.noteText} note> {this.renderWorkTime(timeRecord)} </Text><Text  numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false} style={styles.noteText} note>{`(${timeRecord.shiftNameTH})`}</Text>
              </Row>
            </Col>
          </Grid>
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
    fontSize: responsiveFontSize(1.8),
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
    fontSize: responsiveFontSize(1.5),
   // color: '#ff8c00',
    fontFamily: 'Kanit',
     backgroundColor:'transparent',
     flex:1
  },
  bacisText: {
    fontSize: responsiveFontSize(1.4),
    color: '#818283',
    fontFamily: 'Kanit',
    backgroundColor:'transparent'
  },
  numberText: {
    fontSize: responsiveFontSize(2.5),
    color: '#6d6e71',
    fontFamily: 'Kanit',
    backgroundColor:'transparent'
  },
  numberLate: {
    fontSize: responsiveFontSize(2.5),
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
    fontSize: responsiveFontSize(1.6),
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
