import React from 'react';
import { StyleSheet, View, Image,Platform } from 'react-native';
import { Header,Left, Right, Button,Body,Title} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { observer, inject } from 'mobx-react';

@inject('naviStore')
@observer
export default class CardHeader extends React.Component {
    constructor(props){
      super(props);
      this.toggleMenu = this.toggleMenu.bind(this);
    }
    toggleMenu() {
      this.props.naviStore.navigation.toggleDrawer({
        side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
        animated: true, // does the toggle have transition animation or does it happen immediately (optional)
        to: 'open' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
      });
    }
    render() {
        return(
            <Header style={{backgroundColor:Colors.baseColor,height:responsiveHeight(8)}}>
              <Left  style={{flex:1,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                {this.props.goBack ? (
                <Button style={{backgroundColor:"transparent"}} transparent onPress={()=>this.props.goBack()}>
                  <Icon style={styles.HeaderIcon} name='chevron-left'/>
                </Button>): 
                <Button style={{backgroundColor:"transparent"}} transparent onPress={this.toggleMenu}>
                  <Icon style={styles.HeaderIcon} name='bars'/>
                </Button>}
              </Left>
              <Body style={{flex:5,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                <Title style={styles.HeaderFont}>{this.props.title}</Title>
              </Body>
               <Right>
                <Button style={{flex:1,backgroundColor:"transparent"}} transparent onPress={()=> this.props.funcSelectAll()}>
                  <Icon style={styles.HeaderIcon} name={this.props.iconRight}/>
                  {/* <Title style={styles.HeaderFont}>{this.props.iconRight}</Title> */}
                </Button>
              </Right>
            </Header>
        )
    }

}
const styles = StyleSheet.create({
  HeaderFont:{
    color:"#FFFF",
    fontFamily:"Kanit",
    fontSize:responsiveFontSize(2.5),
    backgroundColor:'transparent',
    fontWeight:'400',
    flex:1,
    justifyContent:'center',alignItems:'center',alignContent:'center',
    marginTop: Platform.OS === 'android' ? responsiveHeight(1.5) : 1,
  },
  HeaderIcon:{
    color:"#FFFF",
    fontFamily:"Kanit",
    fontSize:responsiveFontSize(3.5),
    backgroundColor:'transparent',
    fontWeight:'400',
    flex:1,
    justifyContent:'center',alignItems:'center',alignContent:'center',
    marginTop: Platform.OS === 'android' ? 1 : 2,
  }
});