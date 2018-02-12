import React from 'react';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {
    Modal,
    Platform,
    StyleSheet,
    View,
    Text,Alert,
    AppState,NativeAppEventEmitter,DeviceEventEmitter,ScrollView,Image,TouchableOpacity
  } from 'react-native';
  import {Card,CardItem,Thumbnail,Button}from 'native-base'
  import store from 'react-native-simple-store';
  import app  from '../stores/app';
  import I18n from '../utils/i18n';
  
  export default class Provacypolicy extends React.Component {
    constructor(props) {
        super(props);
        this.closeDialog = this.closeDialog.bind(this);
        this.logOutPress = this.logOutPress.bind(this);
        this.app = app;
    }
  
    closeDialog(){
        this.props.close();
      }
    
    
      logOutPress(){
        Alert.alert(
          `${I18n.t('Warning')}`,
          `${I18n.t('Message')}`,
           [
             {text: `${I18n.t('Confirm')}`, onPress: () => this.logOut()},
             {text: `${I18n.t('Cancel')}`},
           ],
           { cancelable: false }
         )
    }
    logOut(){
        this.setState({loading:true});
        store.delete("USER");
        this.app.appInitialized();
      }

    render() {
        return (
            <View style={{flex:1,backgroundColor:"#fee2c8",alignItems : 'center'}}>
            <Card style={{ height: responsiveHeight(50),width: responsiveWidth(100),alignItems : 'center',backgroundColor:"orange"}}>
           
            <Card style={{ height: responsiveHeight(49),width: responsiveWidth(98),	alignItems: 'center',justifyContent : 'center'}}>
            <View style={{height:responsiveHeight(5)}}/>

            <View 	style={{alignItems: 'center',justifyContent: 'center'}}>
            <Image source={require('../../img/1510652332811.jpg')}/>
           <Text style={{color :'orange', fontSize: responsiveFontSize(3), fontFamily: 'Kanit', alignItems: 'center'}}>privacy policy</Text>
           </View>
       
           <Card style ={{ height: responsiveHeight(30),width: responsiveWidth(90),	alignItems: 'center'}}>
              <ScrollView>
                  
              <View style={{paddingLeft : (5),paddingRight : (5)}}>
              <Text style={{color : 'black', fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit'}}>This privacy policy has been compiled to better serve those who are concerned with how their ‘Personally Identifiable Information’ (PII) is being used online. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.</Text>
              <Text/>
              <Text/>
              <Text style={{color : 'red', fontSize: responsiveFontSize(2), fontFamily: 'Kanit'}}>What personal information do we collect from the people that visit our blog, website or app? </Text>
              <Text style={{color : 'black', fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit'}}>When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, phone number or other details to help you with your experience.</Text>
              <Text/>
              <Text/>
              <Text style={{color : 'red', fontSize: responsiveFontSize(2), fontFamily: 'Kanit'}}>When do we collect information?</Text>
              <Text style={{color : 'black', fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit'}}>We collect information from you when you register on our site, subscribe to a newsletter, fill out a form, Use Live Chat or enter information on our site.</Text>
              <Text/>
              <Text/>
              <Text style={{color : 'red', fontSize: responsiveFontSize(2), fontFamily: 'Kanit'}}>How do we use your information?</Text>
              <Text style={{color : 'black', fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit'}}>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:</Text>
              <Text style={{color : 'black', fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit'}}> • To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.</Text>
              <Text style={{color : 'black', fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit'}}> • To improve our website in order to better serve you.</Text>
              <Text style={{color : 'black', fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit'}}> • To send periodic emails regarding your order or other products and services.</Text>
              <Text style={{color : 'black', fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit'}}> • To follow up with them after correspondence (live chat, email or phone inquiries)</Text>
              <Text/>
              <Text/>
              <Text style={{color : 'red', fontSize: responsiveFontSize(2), fontFamily: 'Kanit'}}>How do we protect your information?</Text>
              <Text style={{color : 'black', fontSize: responsiveFontSize(1.5), fontFamily: 'Kanit'}}>We do not use vulnerability scanning and/or scanning to PCI standards.
We only provide articles and information. We never ask for credit card numbers.
We use regular Malware Scanning.
Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.
We implement a variety of security measures when a user enters, submits, or accesses their information to maintain the safety of your personal information.
All transactions are processed through a gateway provider and are not stored or processed on our servers.</Text>
                </View>
                
              </ScrollView>
              </Card>
            
                <CardItem 	style={{alignItems: 'center',justifyContent: 'center'}}>
              <Button  onPress={this.closeDialog}  style={{backgroundColor:"orange",justifyContent: 'center',alignItems : 'center',width : responsiveWidth(40),height : responsiveHeight(6) ,borderRadius: responsiveWidth(50/2)}}>
              <Text style={{color : 'white'}}> accept </Text>
             </Button>
             <Text>    </Text>
             <Button  onPress={this.logOutPress}  style={{backgroundColor:"orange",justifyContent: 'center',alignItems : 'center',width : responsiveWidth(40),height : responsiveHeight(6) ,borderRadius: responsiveWidth(50/2)}}>
              <Text style={{color : 'white'}}> Do not accept </Text>
             </Button>

             </CardItem>
             </Card>
            
              </Card>
            </View>
           
        );
    }
}
