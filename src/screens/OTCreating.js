import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  I18nManager
} from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Text } from 'native-base';
// import LeaveCalendar from '../components/LeaveCalendar'
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react';
import {post,get} from '../api';
import Loading from '../components/loading';
import CardHeader from '../components/cardHeader';
import store from 'react-native-simple-store';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {convertByFormat} from '../utils/staffioUtils';
import ActionButton from '../components/stffioActionButton/ActionButton';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../assets/fonts/config.json';
import I18n from '../utils/i18n';
import OTForm from '../components/ot/OTForm'
import TimeBeforeAffter from '../components/ot/TimeBeforeAffter'
export default class OTCreating extends React.Component {
  
  constructor(props){
    
    super(props);
  }
 
  render() {
    return (
      <Container style={{backgroundColor: '#ffe9d4'}}>
        <CardHeader title='' goBack={this.goBack}/>
        <Content>
            <OTForm/>
            <TimeBeforeAffter/>
        </Content>
      </Container>
    );
  }

}
const styles = StyleSheet.create({
  
});
