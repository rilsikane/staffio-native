import React from 'react';
import {View,Text} from 'react-native';
import {Container,Card,CardItem,Grid,Row,Col,ScrollableTab,Thumbnail,Tabs,Tab,Body} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
const BodyStatus = (props) =>{
  return(

          <Grid>
            <Row size={20}>
              <Col size={80}>
                <View style={styles.ViewStyle}>
                  <Icon name="user" size={20}/>
                  <Text allowFontScaling={false}style={{marginLeft:5,fontFamily: 'Kanit'}}> พนักงานที่รับผิดชอบ</Text>
                </View>
              </Col>
              <Col size={20} >
                <View style={styles.ViewStyle}>
                  <Text allowFontScaling={false}style={styles.TextStyle4}>View All</Text>
                  <Icon style={styles.IconStyle1} name="angle-right" size={20}/>
                </View>
              </Col>
            </Row>
            <Row size={70}>
            <Tabs renderTabBar={()=> <ScrollableTab style={{height:180}} />} >
              <Tab heading={<Grid style={styles.contain}>
                <Col style={styles.bodyCol}>
                  <Row size={30}>
                    <Thumbnail large source={require('./1.jpg')} style={styles.bodyImage}/>
                  </Row><Row size={10}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle1}>Sasi</Text>
                      </Body>
                    </Row><Row size={5}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle1}>Sanharn..</Text>
                      </Body>
                    </Row><Row size={10}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle2}>004957</Text>
                      </Body>
                  </Row>
                  <Row size={5}/>
                </Col>
              </Grid>
              }>
              </Tab>
              <Tab heading={<Grid style={styles.contain}>
                <Col style={styles.bodyCol}>
                  <Row size={30}>
                    <Thumbnail large source={require('./1.jpg')} style={styles.bodyImage}/>
                  </Row><Row size={10}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle1}>Sasi</Text>
                      </Body>
                    </Row><Row size={5}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle1}>Sanharn..</Text>
                      </Body>
                    </Row><Row size={10}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle2}>004957</Text>
                      </Body>
                  </Row>
                  <Row size={5}/>
                </Col>
              </Grid>
              }>
              </Tab>
              <Tab heading={<Grid style={styles.contain}>
                <Col style={styles.bodyCol}>
                  <Row size={30}>
                    <Thumbnail large source={require('./1.jpg')} style={styles.bodyImage}/>
                  </Row><Row size={10}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle1}>Sasi</Text>
                      </Body>
                    </Row><Row size={5}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle1}>Sanharn..</Text>
                      </Body>
                    </Row><Row size={10}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle2}>004957</Text>
                      </Body>
                  </Row>
                  <Row size={5}/>
                </Col>
              </Grid>
              }>
              </Tab>
              <Tab heading={<Grid style={styles.contain}>
                <Col style={styles.bodyCol}>
                  <Row size={30}>
                    <Thumbnail large source={require('./1.jpg')} style={styles.bodyImage}/>
                  </Row><Row size={10}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle1}>Sasi</Text>
                      </Body>
                    </Row><Row size={5}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle1}>Sanharn..</Text>
                      </Body>
                    </Row><Row size={10}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle2}>004957</Text>
                      </Body>
                  </Row>
                  <Row size={5}/>
                </Col>
              </Grid>
              }>
              </Tab>
              <Tab heading={<Grid style={styles.contain}>
                <Col style={styles.bodyCol}>
                  <Row size={30}>
                    <Thumbnail large source={require('./1.jpg')} style={styles.bodyImage}/>
                  </Row><Row size={10}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle1}>Sasi</Text>
                      </Body>
                    </Row><Row size={5}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle1}>Sanharn..</Text>
                      </Body>
                    </Row><Row size={10}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle2}>004957</Text>
                      </Body>
                  </Row>
                  <Row size={5}/>
                </Col>
              </Grid>
              }>
              </Tab>
              <Tab heading={<Grid style={styles.contain}>
                <Col style={styles.bodyCol}>
                  <Row size={30}>
                    <Thumbnail large source={require('./1.jpg')} style={styles.bodyImage}/>
                  </Row><Row size={10}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle1}>Sasi</Text>
                      </Body>
                    </Row><Row size={5}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle1}>Sanharn..</Text>
                      </Body>
                    </Row><Row size={10}>
                      <Body>
                        <Text allowFontScaling={false}style={styles.TextStyle2}>004957</Text>
                      </Body>
                  </Row>
                  <Row size={5}/>
                </Col>
              </Grid>
              }>
              </Tab>

            </Tabs>
            </Row>
            <Row size={15}>
              <Col />
              <Col >
                <Text allowFontScaling={false}style={styles.TextStyle3}>View All</Text>
                <Icon style={styles.IconStyle2} name="angle-down" size={20}/>
              </Col>
              <Col />
            </Row>
          </Grid>
  );
}
const styles ={
  contain: {
    flex:1,
    backgroundColor: 'white',
    width:120
  },
  textContent: {
    fontSize: 12
  },
  bodyCol:{
    width: 110,
    backgroundColor: '#ffdead'
  },
  bodyImage:{
    height: 60,
    width: 60,
    marginTop: 15,
    marginLeft:20
  },
  ViewStyle:{
    flexDirection:'row',
    marginLeft:15,
    marginLeft:10,
    marginTop:10
  },
  TextStyle1:{
    textAlign: 'center',
    color:'#f58020',
    fontFamily: 'Kanit'
  },
  TextStyle2:{
    textAlign: 'center',
    fontFamily: 'Kanit'
  },
  TextStyle3:{
    color:'#f58020',
    textAlign: 'center',
    fontFamily: 'Kanit'
  },
  TextStyle4:{
    color:'#f58020',
    fontFamily: 'Kanit'
  },
  IconStyle1:{
    marginLeft:5,
    color:'#f58020',
    fontFamily: 'Kanit'
  },
  IconStyle2:{
    justifyContent:'flex-end',
    color:'#f58020',
    textAlign: 'center',
    fontFamily: 'Kanit'
  }
};
export default BodyStatus;
