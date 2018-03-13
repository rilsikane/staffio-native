import React from 'react';
import { StyleSheet ,View,Platform,TouchableOpacity,ActivityIndicator,
    NativeAppEventEmitter,
    DeviceEventEmitter,
    NativeModules,
    NativeEventEmitter,} from 'react-native';
import { Container, Card, CardItem, Text, Body } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from '../../utils/i18n';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OpenFile from 'react-native-doc-viewer';
import Loading from '../loading'
var RNFS = require('react-native-fs');
var SavePath = Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;

export default class DetailLeave extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            animating: false,
            progress: "",
            donebuttonclicked: false,
            isLoading:false
          }
        this.openFile = this.openFile.bind(this);
        this.eventEmitter = new NativeEventEmitter(NativeModules.RNReactNativeDocViewer);
            this.eventEmitter.addListener('DoneButtonEvent', (data) => {
            /*
            *Done Button Clicked
            * return true
            */
            console.log(data.close);
            this.setState({donebuttonclicked: data.close,isLoading:false});
        })

    }
    componentDidMount(){
        // download progress
        this.eventEmitter.addListener(
          'RNDownloaderProgress',
          (Event) => {
            if(this.state.progress > 95){
                this.setState({isLoading:false});
            }
          } 
          
        );
    }
    openFile(){
        this.setState({isLoading:true});
        if(Platform.OS === 'ios'){
            //IOS
            OpenFile.openDoc([{
              url:this.props.AttachUrl,
              fileNameOptional:"เอกสารประกอบ"
            }], (error, url) => {
               if (error) {
                 console.error(error);
               } else {
                 console.log(url)
               }
             })
          }else{
            //Android
            OpenFile.openDoc([{
              url:this.props.AttachUrl,
              fileName:this.props.AttachUrl,
              cache:false,
              fileType:'jpg'
            }], (error, url) => {
               if (error) {
                 console.error(error);
               } else {
                 console.log(url)
                 this.setState({isLoading:false});
               }
             })
          }
    }
  render() {
    return (
        <Card style={this.props.isAppr ? {height:responsiveHeight(29)} : {height:responsiveHeight(35)}}>
            <CardItem>
                <Body style={{flex:4}}>
                    <View style={{flexDirection: 'row', alignItems:'center' }}>
                            {this.props.isCancel && <View style={{flex:1,flexDirection: 'row', alignItems:'center',backgroundColor:'red',borderRadius:responsiveWidth(1),marginRight:responsiveWidth(2)}}>
                            <FontAwesome name='circle' size={responsiveWidth(2)} color='white' style={{flex:1,marginLeft:responsiveWidth(0.5)}}/>
                            {(<Text style={{fontFamily:'Kanit-Medium',backgroundColor:"transparent", color:'white',flex:4,marginRight:2, fontSize:responsiveFontSize(1.8),textAlign:'center'}}>{I18n.t('cancelLeavePer')}</Text>)}
                            </View>}
                        <Text style={{fontFamily: 'Kanit-Medium',backgroundColor:"transparent", color:'#777779',flex:1.5, fontSize:responsiveFontSize(2.2),textAlign:'left'}}>{I18n.t('TypeLeve')}</Text>
                        <Text style={{fontFamily: 'Kanit-Medium',backgroundColor:"transparent", color:'#fbaa3e',flex:2, fontSize:responsiveFontSize(2.2)}}>{this.props.type}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems:'center', marginTop:responsiveHeight(2)}}>
                        <Text style={{fontFamily:'Kanit-Medium',backgroundColor:"transparent", color:'#7e6560',flex:1, fontSize:responsiveFontSize(2.2)}}>{I18n.t('Cause')}</Text>
                        <Text style={{fontFamily: 'Kanit', color:'#a9a9a9', fontSize:responsiveFontSize(1.7),flex:3,}}>{this.props.cause||'-'}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems:'center', marginTop:responsiveHeight(2)}}>
                        <Text style={{fontFamily:'Kanit-Medium',backgroundColor:"transparent", color:'#7e6560',flex:0, fontSize:responsiveFontSize(2.2),textAlign:'center'}}>{I18n.t('Since')}</Text>
                        <Text style={{fontFamily: 'Kanit',backgroundColor:"transparent", color:'#a9a9a9', fontSize:responsiveFontSize(1.7),flex:3,textAlign:'center'}}>{this.props.start}</Text>
                        <Text style={{fontFamily:'Kanit-Medium',backgroundColor:"transparent", color:'#7e6560',flex:0, fontSize:responsiveFontSize(2.2),textAlign:'center'}}>{I18n.t('To')}</Text>
                        <Text style={{fontFamily: 'Kanit',backgroundColor:"transparent", color:'#a9a9a9', fontSize:responsiveFontSize(1.7),flex:3,textAlign:'center'}}>{this.props.end}</Text>
                        <Text style={{fontFamily: 'Kanit-Medium',backgroundColor:"transparent", color:'#fbaa3e',flex:0, fontSize:responsiveFontSize(2.2),textAlign:'center'}}>{`${this.props.total} ${I18n.t('Day')}`}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems:'center', marginTop:responsiveHeight(2)}}>
                        <Text style={{fontFamily:'Kanit-Medium',backgroundColor:"transparent", color:'#7e6560',flex:1, fontSize:responsiveFontSize(2.2)}}>{I18n.t('Balance')}</Text>
                        <Text style={{fontFamily: 'Kanit',backgroundColor:"transparent", color:'#a9a9a9', fontSize:responsiveFontSize(1.7),flex:2}}>{`${this.props.remain||0} ${I18n.t('From')} ${this.props.max} ${I18n.t('Day')}`}</Text>
                    </View>
                    {this.props.isAppr && <View style={{flexDirection: 'row', alignItems:'center', marginTop:responsiveHeight(2)}}>
                        {!this.props.isAppr && <Text style={{fontFamily:'Kanit-Medium',backgroundColor:"transparent", color:'#7e6560',flex:1, fontSize:responsiveFontSize(2.2)}}>{I18n.t('Status')}</Text>}
                        {this.props.isAppr && <Text style={{fontFamily:'Kanit-Medium',backgroundColor:"transparent", color:'#7e6560',flex:1.5, fontSize:responsiveFontSize(2.2)}}>{I18n.t('ReqType')}</Text>}
                        <Text style={{fontFamily: 'Kanit', color:'#fbaa3e', fontSize:responsiveFontSize(1.7),flex:2.5,}}>{this.props.requestStatus}</Text>
                        {/* <Text style={{fontFamily: 'Kanit-Medium', color:'#777779',flex:1, fontSize:responsiveFontSize(2.2)}}>{I18n.t('Status')}</Text>
                        <Text style={{fontFamily: 'Kanit-Medium', color:'#fbaa3e',flex:3, fontSize:responsiveFontSize(2.2)}}>{this.props.requestStatus}</Text> */}
                    </View>}
                    
                    {this.props.AttachUrl && <View style={{flexDirection: 'row', alignItems:'center', marginTop:responsiveHeight(2)}}>
                        <Text style={{fontFamily:'Kanit-Medium',backgroundColor:"transparent", color:'#7e6560',flex:0.3, fontSize:responsiveFontSize(2.2)}}>เอกสารแนบ</Text>
                        <TouchableOpacity onPress={this.openFile}>
                            <Icon style={{flex:1,color:'#fbaa3e',fontSize:20}} name='file-archive-o' size={responsiveFontSize(2)} />
                        </TouchableOpacity>
                    </View>}
                </Body>
            </CardItem>
            <Loading visible={this.state.isLoading}/>
        </Card>
        

    );
  }
}

const styles = StyleSheet.create({
   
});
