import React, { Component } from 'react';
import {StyleSheet,View,ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import PunchIn from '../punchIn/punchIn';
import CardHoliday from '../cardHoliday';
import CardTimeRecord from '../cardTimeRecord';
import CardPunch from '../cardPunch';
import Wallpaper from '../Wallpaper';
import bgSrc from '../../../img/homeBG.png';
import {convertDate} from '../../utils/staffioUtils';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {isLoadCardPunch:false,isLoadPunchIn:false,shiftList:[],isLoadHoliday:false}
  }
  render() {
    return (
       <Wallpaper bgSrc={bgSrc}>
            {this.state.isLoadPunchIn && this.rendePunchIn()}
             {this.state.isLoadHoliday && this.rendePunchHoliday()}
            {this.state.isLoadCardPunch && this.renderDetail()}
      </Wallpaper>
    );
  }
  rendePunchIn(){
    if(this.state.isLoadPunchIn)
    return  (<PunchIn punchPress={this.props.punchPress} user={this.props.user} 
      shiftData={this.props.shiftData} app={this.props.app}/>)
  }
  rendePunchHoliday(){
    return  (<PunchIn isHoliDay={true} user={this.props.user} shiftData={this.props.shiftData}/>)
  }
  renderDetail(){
    if(this.state.isLoadCardPunch)
    return  (<ScrollView>
        <CardHoliday style={{marginTop:5}} holiday={this.props.holidays}/>
        <CardTimeRecord gotoInbox={this.props.gotoInbox} style={{marginTop:2}} record={this.props.statusAmount}/>
        { this.state.shiftList.map((val) => {
            if(val.time_out)
            return (<CardPunch key={val.temp_mobile_id} shift={val}/>);
          })}
      </ScrollView>)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.shiftList){
      this.setState({isLoadCardPunch:true,shiftList:nextProps.shiftList});
      if(!(nextProps.shiftData && Object.getOwnPropertyNames(nextProps.shiftData).length > 0)){
         this.setState({isLoadHoliday:true});
      }
    }
    if(nextProps.shiftData && Object.getOwnPropertyNames(nextProps.shiftData).length > 0){
      this.setState({isLoadPunchIn:true});
    }
 }
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:"transparent"
    }
})