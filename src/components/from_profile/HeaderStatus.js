import React from 'react';
import {View,Text,Image} from 'react-native';
import {Grid,Row,Col,Body,Button,Badge,CardItem} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import {em} from '../../constants/Layout' 

const HeaderStatus = ({user,statusAmount}) => {
  console.log(user);
  const year = new Date().getFullYear()+543;
  return(

        <Grid >
          <Row size={20}>
            <Col size={100} style={{alignItems:"center",justifyContent:"center"}}>
            <View style={styles.ViewStylePosition}>
              <Badge style={styles.BadgeStyleBackground} />
            </View>
            <View style={styles.ViewStylePosition1}>
              {/*<Badge style={styles.BadgeStyleBackground1} />*/}
            </View>
              <View style={styles.ViewStylePosition2}>
                <Image  source={{uri:`data:image/jpeg;base64,${user.IMG_BASE}`}} style={styles.ImageStyle} />
              </View>
              {/*<View >
                  <View style={styles.ViewStyle}>
                    <Badge style={styles.BadgeStyle0} ><Text allowFontScaling={false}style={styles.TextStyle}><Icon name="paint-brush"  color='white' size={23} /></Text></Badge>
                  </View>
              </View>*/}
               
            </Col>
          </Row>
          <Row size={10} >
            <Col size={100}>
              <Row top={2} style={{alignItems:"center",justifyContent:"center"}}>
                  <View style={styles.ViewStyleFlex}>
                    <View>
                    <Text allowFontScaling={false}style={styles.TextStyle1}>{user.FULL_NAME_TH}</Text>
                      <Text allowFontScaling={false}style={styles.TextStyle2}>{user.POSITION_NAME}</Text>
                    </View>
                  </View>
              </Row>
            </Col>
          </Row>
          {/*<Row size={15} top={5}>
              <Col size={20} />
                <Col size={8}>
                  <Badge style={styles.BadgeStyle1} ><Text allowFontScaling={false}style={styles.TextStyle3}><Icon name="phone"  color='white' size={23} /></Text></Badge>
                </Col ><Col size={8}>
                  <Badge style={styles.BadgeStyle2} ><Text allowFontScaling={false}style={styles.TextStyle3}><Icon name="facebook"  color='white' size={23}/></Text></Badge>
                </Col ><Col size={8}>
                  <Badge style={styles.BadgeStyle3} ><Text allowFontScaling={false}style={styles.TextStyle4}><Icon name="google-plus"  color='white' size={15} /></Text></Badge>
                </Col ><Col size={8}>
                  <Badge style={styles.BadgeStyle4} ><Text allowFontScaling={false}style={styles.TextStyle5}>LINE</Text></Badge>
                </Col>
              <Col size={20}/>
          </Row>*/}
          <Row size={8}>
            <View style={styles.ViewStyleFlex}>
              <Icon name="clock-o" size={20}/>
              <Text allowFontScaling={false}style={styles.TextStyle6}>{`สรุปสถานะการมาทำงาน ${year}`}</Text>
            </View>
          </Row>
          <Row size={15}>
              <Col size={2}/>
              <Col size={30} style={styles.ViewColStyle}>
                <Text allowFontScaling={false}style={styles.TextStyle7}>{statusAmount.amount_ab}</Text>
                <Text allowFontScaling={false}style={styles.TextStyle8}>ขาด</Text>
              </Col>
              <Col size={30} style={styles.ViewColStyle}>
                  <Text allowFontScaling={false}style={styles.TextStyle7}>{statusAmount.amount_lt}</Text>
                  <Text allowFontScaling={false}style={styles.TextStyle8}>สาย</Text>
              </Col>
              <Col size={30}>
              <Text allowFontScaling={false}style={styles.TextStyle7}>{statusAmount.amount_el}</Text>
              <Text allowFontScaling={false}style={styles.TextStyle8}>กลับก่อน</Text>
              </Col>
              <Col size={2}/>
          </Row>
          <Row size={2} />
        </Grid>



  );
}
const styles={
  TextHeader:{
    fontWeight: '500',
    color:'#ff7f50',
    fontSize:25,
    fontFamily: 'Kanit',
  },
  ImageStyle:{
    width:em(6.9),
    height:em(6.9),
    borderRadius:em(3.6),
  },
  ViewStylePosition:{
    position:'absolute',
  },
  ViewStylePosition1:{
    marginLeft:83,
    marginTop:63,
    width:60,
    position:'absolute',
  },
  ViewStylePosition2:{
    position:'absolute',
    marginLeft:2,
    marginTop:2
  },
  ViewStyleFlex:{
    flexDirection:'row'
  },
  ViewStyle:{
    position:'absolute',
    marginLeft:85,
    marginTop:65,
    width:60
  },
  TextStyle:{
    marginTop:8,
    marginLeft:1
  },
  TextStyle1:{
    textAlign: 'center',
    fontSize:18,
    fontFamily: 'Kanit',
    marginTop:8
  },
  TextStyle2:{
  textAlign: 'center',
    fontSize:15,
    color:'#a9a9a9'
  },
  TextStyle3:{
    marginTop:5,
    marginLeft:2
  },
  TextStyle4:{
    marginTop:10
  },
  TextStyle5:{
    marginTop:10,
    marginLeft:1,
    fontSize:9,
    color:'white',
    fontWeight: '600',
    fontFamily: 'Kanit',
  },
  TextStyle6:{
    marginLeft:7,
    fontFamily: 'Kanit',
  },
  TextStyle7:{
    color:'#f58020',
    fontSize:40,
    textAlign: 'center',
    fontFamily: 'Kanit',
  },
  TextStyle8:{
    color:'#a9a9a9',
    textAlign: 'center',
    fontFamily: 'Kanit',
  },
  BadgeStyleBackground:{
    borderRadius:em(4),
    width:em(7.2),
    height:em(7.2),
    backgroundColor:'#c0c0c0'
  },
  BadgeStyleBackground1:{
    borderRadius:50,
    height:45,
    width:45,
    backgroundColor:'#faebd7'
  },
  BadgeStyle0:{
    borderRadius:50,
    height:40,
    width:40,
    backgroundColor:'#f58020'
  },
  BadgeStyle1:{
    borderRadius:50,
    height:35,
    width:35,
    backgroundColor:'#f58020'
  },
  BadgeStyle2:{
    borderRadius:50,
    height:35,
    width:35,
    backgroundColor:'blue'
  },
  BadgeStyle3:{
    borderRadius:50,
    height:35,
    width:35,
    backgroundColor:'red'
  },
  BadgeStyle4:{
    borderRadius:50,
    height:35,
    width:35,
    backgroundColor:'green'
  },
  ViewColStyle:{
    borderRightWidth:1,
    borderColor:'#a9a9a9'
  }
}
export default HeaderStatus;
