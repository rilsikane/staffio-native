import React,{Component} from 'react';
import {Text,View} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PTRView from 'react-native-pull-to-refresh';
import I18n from '../utils/i18n';

import store from 'react-native-simple-store';
import {post,get} from '../api';
import { observer, inject } from 'mobx-react';

import Loading from '../components/loading';
import CardHeader from '../components/cardHeader';

@inject('leaveStore')
@observer
export default class LeaveListScreen extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return(
            <View style={styles.LeaveListScreenContainerStyle}>
                <CardHeader title={'HEADER'}/>
         
            </View>
        )
    }
}

const styles={
    LeaveListScreenContainerStyle:{
        flex: 1,
        backgroundColor: '#ffe9d4',
    },
}