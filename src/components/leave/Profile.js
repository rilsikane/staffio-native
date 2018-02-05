import React from 'react';
import { StyleSheet, Image ,View} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export default class Profile extends React.Component {
    state = {
        fontLoaded: false,
      };
  render() {
    return (
        <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
            <Image blurRadius={80} style={{flex:1,width:responsiveWidth(100), height:responsiveHeight(30),opacity:0.7,marginTop:5}} source={this.props.img}/>
            <View style={{position:'absolute',alignItems: 'center'}}>
                <Image style={{width:responsiveWidth(28), height:responsiveWidth(28), borderRadius:responsiveWidth(15), marginTop:responsiveHeight(2),borderWidth:responsiveWidth(1),borderColor:'#e9e8e6'}} source={this.props.img}/>
                <Text style={styles.name}>{this.props.name}</Text>
                <Text style={styles.positions}>{this.props.positions}</Text>
            </View>
        </View>

    );
  }
}

const styles = StyleSheet.create({
    name: {
        fontFamily: 'Kanit-Medium', 
        color:'#5f504b',
        flex:1, 
        fontSize:responsiveFontSize(2.5),
        marginTop:responsiveHeight(2),
        backgroundColor:"transparent"
    },
    positions: {
        fontFamily: 'Kanit-Medium', 
        color:'white',
        flex:1, 
        fontSize:responsiveFontSize(2),
        backgroundColor:"transparent"
    }
});
