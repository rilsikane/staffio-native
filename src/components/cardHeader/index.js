import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Header,Left, Right, Button,Body,Title} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';


export default class CardHeader extends React.Component {
    render() {
        return(
            <Header style={{backgroundColor:Colors.baseColor,height:responsiveHeight(8)}}>
              <Left>
                {this.props.goBack && <Button transparent onPress={()=>this.props.goBack()}>
                  <Icon style={styles.HeaderFont} name='chevron-left' size={20}/>
                </Button>}
              </Left>
              <Body>
                <Title style={styles.HeaderFont}>{this.props.title}</Title>
              </Body>
               <Right>

              </Right>
            </Header>
        )
    }

}
const styles = StyleSheet.create({
  HeaderFont:{
    color:"#FFFF",
    fontFamily:"Kanit",
    fontSize:responsiveFontSize(2.5)
  }
});