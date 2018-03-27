import React from 'react';
import { StyleSheet, View, Image,Platform,Text } from 'react-native';
import { Header,Left, Right, Button,Body,Title} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { observer, inject } from 'mobx-react';
import { ifIphoneX,isIphoneX } from 'react-native-iphone-x-helper'

@inject('naviStore')
@observer
export default class CardHeader extends React.Component {
    constructor(props){
      super(props);
      this.toggleMenu = this.toggleMenu.bind(this);
      this.openNotifications = this.openNotifications.bind(this);
    }
    toggleMenu() {
      this.props.naviStore.navigation.toggleDrawer({
        side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
        animated: true, // does the toggle have transition animation or does it happen immediately (optional)
        to: 'open' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
      });
    }
    openNotifications(){
      this.props.naviStore.navigation.showModal({
        screen: "staffio.NotiModalScreen", // unique ID registered with Navigation.registerScreen
        title: "Modal", // title of the screen as appears in the nav bar (optional)
        passProps: {}, // simple serializable object that will pass as props to the modal (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
      });
    }
    render() {
        return(
            <Header style={styles.headerConatainer}>
              <Left  style={{flex:1,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                {!this.props.isModal && (this.props.goBack ? (
                <Button style={{backgroundColor:"transparent"}} transparent onPress={()=>this.props.goBack()}>
                  <Icon style={styles.HeaderIcon} name='chevron-left'/>
                </Button>): 
                <Button style={{backgroundColor:"transparent"}} transparent onPress={this.toggleMenu}>
                  <Icon style={styles.HeaderIcon} name='bars'/>
                </Button>)}
              </Left>
              <Body style={{flex:2,justifyContent:'center',alignItems:'center',flexDirection:"row"}}>
                <Title style={styles.HeaderFont}>{this.props.title}</Title>
              </Body>
               {!this.props.next ?
                <Right style={{flex:1,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                {this.props.funcSelectAll && (<Button style={{backgroundColor:"transparent",flexDirection:"column",flex:1,justifyContent:"flex-end",paddingRight:5}} transparent onPress={()=> this.props.funcSelectAll()}>
                  <Icon style={styles.HeaderRightIcon} name={this.props.iconRight}/>
                  {/* <Title style={styles.HeaderFont}>{this.props.iconRight}</Title> */}
                </Button>)}
                {/* <Button style={{backgroundColor:"transparent",flexDirection:"column",flex:1,justifyContent:"flex-end",paddingRight:5}} transparent onPress={this.openNotifications}>
                    <Icon style={styles.HeaderRightIcon} name='bell'/>
                </Button> */}
               </Right>:
               <Right style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',alignContent:'flex-end'}}>
                <Button style={{backgroundColor:"transparent",flexDirection:"column",flex:1,justifyContent:"flex-end"}} transparent onPress={()=>this.props.next()}>
                    {!this.props.titleNext ? <Icon style={styles.HeaderRightIcon} name='chevron-right'/>
                    : <Text style={styles.HeaderFontRight}>{this.props.titleNext}</Text>}
                </Button>
               </Right>}
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
  },
  HeaderIcon:{
    color:"#FFFF",
    fontFamily:"Kanit",
    fontSize:responsiveFontSize(3),
    backgroundColor:'transparent',
    fontWeight:'400',
    flex:1,
    justifyContent:'center',alignItems:'center',alignContent:'center',
    marginTop: Platform.OS === 'android' ? 1 : 5,
  },
  HeaderRightIcon:{
    color:"#FFFF",
    fontFamily:"Kanit",
    fontSize:responsiveFontSize(3),
    backgroundColor:'transparent',
    fontWeight:'400',
    flex:1,
    justifyContent:'center',alignItems:'center',alignContent:'center',
    marginTop: Platform.OS === 'android' ? 1 : 8,
  },
  HeaderFontRight:{
    color:"#FFFF",
    fontFamily:"Kanit",
    fontSize:responsiveFontSize(2.4),
    backgroundColor:'transparent',
    fontWeight:'400',
    flex:1,
    justifyContent:'center',alignItems:'center',alignContent:'center',
    marginTop:5,
    marginLeft:responsiveWidth(4)
  },
  headerConatainer:{
    backgroundColor:Colors.baseColor,
    height:responsiveHeight(11),
    ...ifIphoneX({
      paddingTop: 30
    }, {
      paddingTop: 10
    })
  }
});