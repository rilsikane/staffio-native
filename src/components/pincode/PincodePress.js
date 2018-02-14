import React from 'react';
import { Text, View,TextInput,PixelRatio,Alert,Platform, Image } from 'react-native';
import { Button,Badge,Grid,Col,Row,Body} from 'native-base';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import TouchID from'react-native-touch-id';
import * as Animatable from 'react-native-animatable';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../assets/fonts/config.json';
import Iocon from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import logoImg from '../../../img/key.png';

export default class PincodePress extends React.Component { 
  constructor(props) {
      super(props);
      
      this.onPressNumber = this.onPressNumber.bind(this);
      this.onDelNumber = this.onDelNumber.bind(this);
      this.onDonePress = this.onDonePress.bind(this);
      this.state = {sampleText: "",sampleText1: "",sampleText2: "",sampleText3: "",sampleText4: "",sampleText5: "",pincode:""
      ,touchSupport:false,touchIdFlag:false};
 }
        componentWillMount() {
          if(this.props.isAuthen && Platform.OS === 'ios' ){
              TouchID.isSupported()
              .then(supported => {
                // Success code
                this.setState({touchSupport:true});
                this.onTouchId();
              })
              .catch(error => {
                // Failure code
                console.log(error);
              });
          }
        //  this.setState({sampleText: "",sampleText1: "",sampleText2: "",sampleText3: "",sampleText4: "",sampleText5: ""});
        }
          onPressNumber = (num) => {
            if(this.state.sampleText === ''){
                this.setState({sampleText: num});

              }else if(this.state.sampleText1 === ''){
                this.setState({sampleText1: num});

              }else if(this.state.sampleText2 === ''){
                this.setState({sampleText2: num});

              }else if(this.state.sampleText3 === ''){
                this.setState({sampleText3: num});

              }else if(this.state.sampleText4 === ''){
                this.setState({sampleText4: num});

              }else if(this.state.sampleText5 === ''){
                this.setState({sampleText5: num});
                this.setState({pincode: this.state.sampleText+this.state.sampleText1+this.state.sampleText2+this.state.sampleText3+this.state.sampleText4+num});
                if(this.props.isAuthen){
                   setTimeout(() => {this.onDonePress()}, 100)
                }
              }
          }
          onDelNumber = () => {
            if(this.state.sampleText5 != ''){
                this.setState({sampleText5: ''});

              }else if(this.state.sampleText4 != ''){
                this.setState({sampleText4: ''});

              }else if(this.state.sampleText3 != ''){
                this.setState({sampleText3: ''});

              }else if(this.state.sampleText2 != ''){
                this.setState({sampleText2: ''});

              }else if(this.state.sampleText1 != ''){
                this.setState({sampleText1: ''});

              }else if(this.state.sampleText != ''){
                this.setState({sampleText: ''});
              }
          }
          onBack = () => {
            this.setState({sampleText: "",sampleText1: "",sampleText2: "",sampleText3: "",sampleText4: "",sampleText5: ""});
            this.props.reset();
          }
          renderDelBt = () => {
            if(this.props.isConfirm && this.state.sampleText===''){
               return (<Button bordered style={styles.buttonView} onPress={(e) => this.onBack()}><Icon style={styles.iconStyle} name="reply" /></Button>);
            }else{
              return (<Button bordered style={styles.buttonView} onPress={(e) => this.onDelNumber()}><Iocon  style={styles.iconStyle} name="ios-backspace"/></Button>);
            }
          }
          renderDoneBt = () => {
            const IconTello = createIconSetFromFontello(fontelloConfig);
            if(this.props.isAuthen){
               if(Platform.OS === 'ios' && this.state.touchSupport)
               return <Button bordered style={styles.buttonView} onPress={this.onTouchId}><IconTello style={styles.iconStyleTouch} name="hhmm-14"/></Button>
            }else{
               if(this.state.sampleText5!='')
               return <Button bordered style={styles.buttonView} onPress={this.onDonePress}><Text allowFontScaling={false}style={styles.textCaptionStyle}>OK</Text></Button>
            }
          }

        onTouchId = () =>{
          TouchID.authenticate('Touch เพื่อเข้าสู่ระบบ')
          .then(success => {
            // Success code
           this.onDonePress(true);
          })
          .catch(error => {
            // Failure code
            console.log(error);
          });
        }

        onDonePress = (isTouch) => {
          // const pincode = this.state.sampleText+this.state.sampleText1+this.state.sampleText2+this.state.sampleText3+this.state.sampleText4+this.state.sampleText5;
          if(!this.props.pincode || this.props.pincode === ''){
            this.props.onDonePress(this.state.pincode);
          }else{
            if(this.props.pincode==this.state.pincode){
              this.props.onDonePress(this.state.pincode);
            }else if(isTouch==true){
              this.props.onDonePress(this.state.pincode);
            }else{
              this.setState({sampleText: "",sampleText1: "",sampleText2: "",sampleText3: "",sampleText4: "",sampleText5: "",pincode:""});
              Alert.alert(
                'เกิดข้อผิดพลาด',
                'Pincode does not match',
                [
                {text: 'OK', onPress: () => console.log('OK Pressed!')},
                ]
              )
            }
          }
      }



  render(){
  return (

    <View style={styles.pinCodeContainer}>
      <View style={styles.viewHeader}>
        <Image style={styles.thumbnailStyle} source={logoImg} />
        <Text allowFontScaling={false}style={styles.textHeader}>{this.props.titileTxt}</Text>
      </View >
        <View style={styles.passText}>
            <TextInput secureTextEntry={true} style={styles.TextPut} editable={false} 
            selectTextOnFocus={false} placeholder='○' value={this.state.sampleText ? '●':''}  underlineColorAndroid={'rgba(0,0,0,0)'}></TextInput>
            <TextInput secureTextEntry={true} style={styles.TextPut} editable={false} 
            selectTextOnFocus={false} placeholder='○' value={this.state.sampleText1 ? '●':''}  underlineColorAndroid={'rgba(0,0,0,0)'}></TextInput>
            <TextInput secureTextEntry={true} style={styles.TextPut} editable={false} 
            selectTextOnFocus={false} placeholder='○' value={this.state.sampleText2 ? '●':''}  underlineColorAndroid={'rgba(0,0,0,0)'}></TextInput>
            <TextInput secureTextEntry={true} style={styles.TextPut} editable={false} 
            selectTextOnFocus={false} placeholder='○' value={this.state.sampleText3 ? '●':''}  underlineColorAndroid={'rgba(0,0,0,0)'}></TextInput>
            <TextInput secureTextEntry={true} style={styles.TextPut} editable={false} 
            selectTextOnFocus={false} placeholder='○' value={this.state.sampleText4 ? '●':''}  underlineColorAndroid={'rgba(0,0,0,0)'}></TextInput>
            <TextInput secureTextEntry={true} style={styles.TextPut} editable={false} 
            selectTextOnFocus={false} placeholder='○' value={this.state.sampleText5 ? '●':''}  underlineColorAndroid={'rgba(0,0,0,0)'}></TextInput>
        </View>
      <Grid style={styles.gridStyles}>
      <Row >
       
        <Col >
          <Button bordered style={styles.buttonView} onPress={(e) => this.onPressNumber("1")}  ><Text allowFontScaling={false}style={styles.textStyle}>1</Text></Button>
        </Col>
        <Col >
          <Button bordered style={styles.buttonView} onPress={(e) =>this.onPressNumber("2")}><Text allowFontScaling={false}style={styles.textStyle}>2</Text></Button>
        </Col>
        <Col >
          <Button bordered  style={styles.buttonView}  onPress={(e) =>this.onPressNumber("3")}><Text allowFontScaling={false}style={styles.textStyle}>3</Text></Button>
        </Col>
         
      </Row>
      <Row style={styles.rowStyle}>
        <Col >
          <Button bordered style={styles.buttonView} onPress={(e) => this.onPressNumber("4")}><Text allowFontScaling={false}style={styles.textStyle}>4</Text></Button>
        </Col>
        <Col >
          <Button bordered style={styles.buttonView} onPress={(e) => this.onPressNumber("5")} ><Text allowFontScaling={false}style={styles.textStyle}>5</Text></Button>
        </Col>
        <Col >
          <Button bordered style={styles.buttonView} onPress={(e) => this.onPressNumber("6")}><Text allowFontScaling={false}style={styles.textStyle}>6</Text></Button>
        </Col>
      </Row>
      <Row style={styles.rowStyle}>
       
        <Col>
          <Button bordered style={styles.buttonView} onPress={(e) => this.onPressNumber("7")} ><Text allowFontScaling={false}style={styles.textStyle}>7</Text></Button>
        </Col>
        <Col>
          <Button bordered style={styles.buttonView} onPress={(e) => this.onPressNumber("8")}><Text allowFontScaling={false}style={styles.textStyle}>8</Text></Button>
        </Col>
        <Col>
          <Button bordered style={styles.buttonView} onPress={(e) => this.onPressNumber("9")}><Text allowFontScaling={false}style={styles.textStyle}>9</Text></Button>
        </Col>
         
      </Row>
      <Row style={[styles.rowStyle,{flex:0}]}>
       
        <Col >
          {this.renderDelBt()}
        </Col>
        <Col>
          <Button bordered style={styles.buttonView} onPress={(e) => this.onPressNumber("0")}><Text allowFontScaling={false}style={styles.textStyle}>0</Text></Button>
        </Col>
        <Col>
          {this.renderDoneBt()}
        </Col>
         
      </Row>
      </Grid>


    </View>

  );
}
}

