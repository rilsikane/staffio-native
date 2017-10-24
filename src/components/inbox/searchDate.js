import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,ScrollView,Alert
} from 'react-native';
// import LeaveCalendar from '../components/LeaveCalendar'
import { observer, inject } from 'mobx-react';
import Colors from '../../constants/Colors'
import {em} from '../../constants/Layout'
import {Content,Tabs,Tab,TabHeading} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import CardPunchInfo from '../cardPunchInfo'
import CustomCalendar from '../customCalendar'

@inject('punchStore')
@observer
export default class Staff extends React.Component {
  constructor(props){
    super(props);
    this.state = {color:Colors.baseColor,markedDates:{},tmpMarkeds:this.props.punchStore.dateSearch};
    this.onDayPress = this.onDayPress.bind(this);
   
  }
  static navigationOptions = {
    header: null,
  };
  
  componentDidMount(){
    if(this.props.punchStore.dateSearch && this.props.punchStore.dateSearch.length >0){
        if(this.props.punchStore.dateSearch.length>1){
              this.buildDate(this.props.punchStore.dateSearch[0],this.props.punchStore.dateSearch[this.props.punchStore.dateSearch.length-1]);
        }else{
              let dayLabel =  this.props.punchStore.dateSearch[0].dateString;
              const oneDay = [{startingDay: true, color: this.state.color,textColor:"#fff"}, {endingDay: true, color: this.state.color,textColor:"#fff"}];
              this.setState({markedDates:{[dayLabel]:oneDay}});
        }
    }else{
        this.setState({markedDates:{},tmpMarkeds:[]});
    }
  }

  onDayPress(day) {
        let dayLabel =  day.dateString;
        const oneDay = [{startingDay: true, color: this.state.color,textColor:"#fff"}, {endingDay: true, color: this.state.color,textColor:"#fff"}];
        if(this.state.tmpMarkeds.length >1){
           let tmpMarkeds = [];
           tmpMarkeds.push(day);
           //this.setState({tmpMarkeds:tmpMarkeds});
           //this.setState({markedDates:{...{}, [dayLabel]:oneDay}});
           this.setState({markedDates:{...{}, [dayLabel]:oneDay},tmpMarkeds:tmpMarkeds});
           this.props.punchStore.dateSearch = tmpMarkeds;
        }else{
            this.setState({tmpMarkeds:[...this.state.tmpMarkeds,day]});
           
            if(this.state.tmpMarkeds.length ==0){
                //this.setState({markedDates:{[dayLabel]:oneDay}});
                  this.setState({markedDates:{[dayLabel]:oneDay}});
            }else{
                this.buildDate(this.state.tmpMarkeds[0],day);
                
            }
            //this.setState({tmpMarkeds:[...this.state.tmpMarkeds,day]});
         
        }
         
    }
   compareDate = (startDate,endDate) =>{
        let timeDiff = startDate - endDate;
        if(timeDiff <0){
            return timeDiff;
        }
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        return diffDays
    }
    buildDate=(startDate,endDate) =>{
        const oneDay = [{startingDay: true, color: this.state.color,textColor:"#fff"}, {endingDay: true, color: this.state.color,textColor:"#fff"}];
        const startDay = [{startingDay: true, color: this.state.color,textColor:"#fff"}];
        const endDay = [{endingDay: true, color: this.state.color,textColor:"#fff"}];
        const betweenDay = [{color: this.state.color,textColor:"#fff"}];
        let diffDay = this.compareDate(endDate.timestamp,startDate.timestamp);
        if(diffDay>0){
            let markedDates = {};
            for(let i=0;i<=diffDay;i++){
                if(i==0){
                   markedDates= {...markedDates,[startDate.dateString]:startDay};
                }else if(i==diffDay){
                   markedDates= {...markedDates,[endDate.dateString]:endDay};
                }else{
                   markedDates= {...markedDates,[this.findNextDay(startDate.timestamp,i)]:betweenDay}; 
                }
            }
            //this.setState({markedDates:markedDates});
            this.setState({markedDates:markedDates});
            if(Object.getOwnPropertyNames(this.state.markedDates).length > 0){
                this.props.punchStore.dateSearch = [...this.state.tmpMarkeds,endDate];
            }
        }else if(diffDay==0){
            // this.setState({markedDates:{...{}, [endDate.dateString]:oneDay}});
            this.setState({markedDates:{}});
             this.props.punchStore.dateSearch = [];
        }else{
            // this.setState({markedDates:{...{}, [endDate.dateString]:oneDay}});
            this.setState({markedDates:{...{}, [endDate.dateString]:oneDay}});
             this.props.punchStore.dateSearch = [endDate];
        }
    }
    findNextDay=(timestamp,i) =>{
        var dateFormat = require('dateformat');
        let date = new Date(timestamp);
        
        return dateFormat(date.setDate(date.getDate() + i),"yyyy-mm-dd");
    }

  render() {
    return (
       <Content style={{backgroundColor:Colors.backgroundColor}}>
         <CustomCalendar onDayPress={this.onDayPress}  markedDates={this.state.markedDates} markingType={'interactive'}/>
        </Content>
    );
  }

}

const styles = StyleSheet.create({
  
});
