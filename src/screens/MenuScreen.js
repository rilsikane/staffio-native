import React, { Component } from 'react';
import { Text, View,TouchableOpacity,ScrollView,Alert } from 'react-native';
import { Card, CardItem, Thumbnail, Container, Image } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react';
import store from 'react-native-simple-store';
import app  from '../stores/app';
import Wallpaper from '../components/Wallpaper';
import bgSrc from '../../img/homeBG.png';

let menus = [
    {name: "ลงเวลาเข้างาน", icon: "calendar",link:"staffio.HomeScreen",active:true},
    {name: "Inbox", icon: "inbox",link:"staffio.InqInboxScreen",active:false},
    {name: "สถิติการลา", icon: "bar-chart",link:"staffio.PersonalStatScreen",active:false},
    {name: "ค้นหาเพื่อน", icon: "book",link:"staffio.FindFriendScreen",active:false}
  ];
let menuAppr = [
     {name: "Dashboard เข้างาน", icon: "pie-chart",link:"staffio.DashBoradProject",active:false},
     {name: "พิจารณาการลา", icon: "gavel",link:"staffio.LeaveApprScreen",active:false}
  ];
const menuEtc = [
    // {name: "วิธีใช้งาน", icon: "question-circle"},
    {name: "ออกจากระบบ", icon: "sign-out",active:false}
];


@inject('naviStore')
@observer 
export default class MenuScreen extends React.Component {
    constructor(props){
        super(props);
        this.navigateTo = this.navigateTo.bind(this);
        this.state = {userData:{},menus:menus,menuAppr:menuAppr};
        this.app = app;
        this.logOutPress = this.logOutPress.bind(this);
    }
    async componentDidMount(){
         const userData = await store.get("USER");
         this.setState({userData:userData});
    }
    navigateTo(link){
         menus.map(menu => menu.active = menu.link == link);
         menuAppr.map(menu => menu.active = menu.link == link);
         this.setState({menus:menus,menuAppr:menuAppr});
         this.props.naviStore.navigation.resetTo({
			screen: link, // unique ID registered with Navigation.registerScreen
			title: undefined, // navigation bar title of the pushed screen (optional)
			titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
			animated: false, // does the push have transition animation or does it happen immediately (optional)
			backButtonTitle: undefined, // override the back button title (optional)
			backButtonHidden: false, // hide the back button altogether (optional)
		});
    this.props.naviStore.navigation.toggleDrawer({
        side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
        animated: true, // does the toggle have transition animation or does it happen immediately (optional)
        to: 'close' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
      });
    }
     logOutPress(){
        Alert.alert(
            'คำเตือน',
            'คุณต้องการยืนยันที่จะออกจากระบบ ใช่หรือไม่ ?',
            [
            {text: 'ยืนยัน', onPress: () => this.logOut()},
            {text: 'ยกเลิก'},
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
         <Wallpaper bgSrc={bgSrc} style={{width:responsiveWidth(50)}}>
        <Container style={{flex:1,paddingTop:10}}>
        <Thumbnail small style={styles.imageStyle} source={{uri:`data:image/jpeg;base64,${this.state.userData.IMG_BASE}`}}/>
                    <Text style={styles.textName}>{this.state.userData.FULL_NAME_TH}</Text>
                    <Text style={styles.textPosition}>{this.state.userData.POSITION_NAME}</Text>

                <ScrollView style={[styles.cardStyle]}>           
                     { this.state.menus.map((menuName) => {
                        return (
                        <CardItem style={!menuName.active ? styles.containerStyle : styles.highlight} key={menuName.name} >
                            <TouchableOpacity style={{flexDirection: 'row', alignItems:'center',flex:1}} onPress={(e)=>this.navigateTo(menuName.link)}>
                                <FontAwesome name={menuName.icon} style={!menuName.active ? styles.iconStyle:styles.iconHighlight}/>
                                <Text style={!menuName.active ? styles.textMenuStyle : styles.textMenuHighlight}>{menuName.name}</Text>
                            </TouchableOpacity>
                        </CardItem>);
                    })}
                    {this.state.userData.isApprover  == 'Y'  && <View style={{marginTop:responsiveHeight(3)}}>
                     { this.state.menuAppr.map((menuName) => {
                        return (<CardItem style={!menuName.active ? styles.containerStyle : styles.highlight} key={menuName.name}>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems:'center',flex:1}} onPress={(e)=>this.navigateTo(menuName.link)}>
                                <FontAwesome name={menuName.icon} style={!menuName.active ? styles.iconStyle:styles.iconHighlight}/>
                                <Text style={!menuName.active ? styles.textMenuStyle : styles.textMenuHighlight}>{menuName.name}</Text>
                            </TouchableOpacity>
                        </CardItem>);
                    })}
                    </View>}
                    
                </ScrollView>
                <View style={{position:'absolute',bottom:0}}>
                     { menuEtc.map((menuName) => {
                        return (<CardItem style={styles.containerStyle} key={menuName.name}>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems:'center'}} onPress={this.logOutPress}>
                                <FontAwesome name={menuName.icon} style={styles.iconStyle}/>
                                <Text style={styles.textMenuStyle}>{menuName.name}</Text>
                            </TouchableOpacity>
                        </CardItem>);
                    })}
                    </View>
        </Container>
        </Wallpaper>
    );
  }
}

const styles = {
    textMenuStyle: {
        fontFamily:'Kanit',
        color:'#7e6560',
        fontSize: 14,
        fontWeight: '300',
        backgroundColor:"transparent"
    },
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#ffe9d4',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ffe9d4',
        position: 'relative'
    },
    cardStyle: {
        backgroundColor: '#ffe9d4', 
        paddingTop: 3,
        borderColor: '#ffe9d4',
        flex:1
    },
    imageStyle: {
        width:responsiveWidth(20), 
        height:responsiveWidth(20), 
        borderRadius:responsiveWidth(10), 
        marginTop:responsiveHeight(2),
        marginLeft:responsiveWidth(9),
        marginBottom: responsiveHeight(1),
        borderWidth:responsiveWidth(1),
        borderColor:'#e9e8e6',
        paddingTop: 20,
    },
    iconStyle: {
        color:'#7e6560',
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 20
    },
    textPosition: {
        color: '#fbaa3e', 
        paddingLeft: 15, 
        fontSize: responsiveFontSize(1.6),
        fontFamily:'Kanit', 
        paddingBottom:10,
        fontWeight: '300',
        backgroundColor:"transparent"
    },
    textName: {
        color: 'black', 
        paddingLeft: 15,
        fontSize: responsiveFontSize(2),
        fontFamily:'Kanit',
        fontWeight: '300',
        backgroundColor:"transparent"
    },
    highlight: {
        borderBottomWidth: 1,
        padding: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ffe9d4',
        position: 'relative',
       flex:1,
       backgroundColor: '#fbaa3e',
       width:responsiveWidth(100)
    },
    iconHighlight: {
        color:'#fff',
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 20
    },
    textMenuHighlight: {
        fontFamily:'Kanit',
        color:'#fff',
        fontSize: 14,
        fontWeight: '300',
        backgroundColor:"transparent"
    },
     hilightContainerStyle: {
        flex:1,
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fbaa3e',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#fbaa3e',
        position: 'relative'
    }

  };