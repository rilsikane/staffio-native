import React from 'react';
import { StyleSheet, Image ,View,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PercentageCircle from 'react-native-percentage-circle';

export default class LeaveStatContent extends React.Component {
  constructor(props){
    super(props);
    this.filter = this.filter.bind(this);
  }
  filter(id){
    if(!this.props.readOnly){
      this.props.filter(id);
    }
  }
  render() {
    return (
        <TouchableOpacity onPress={(e)=>this.filter(this.props.infoHis.id)} style={{flex:1,alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                <PercentageCircle radius={35}>
                <Text style={{fontFamily:'Kanit-Medium', color:'#fbaa3e', fontSize:responsiveFontSize(3),textAlign:'center',backgroundColor:"transparent"}}>{this.props.infoHis.amount}</Text>
                <Text style={{fontFamily: 'Kanit', color:'#7e6560', fontSize:responsiveFontSize(1.5),textAlign:'center',backgroundColor:"transparent"}}>{this.props.infoHis.name}</Text>
                </PercentageCircle>  
        </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
   
});
