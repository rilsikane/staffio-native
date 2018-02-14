import React from 'react';
import { View } from 'react-native';
import { CardItem, Text, Button, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

export default class ContentCard extends React.Component {

  render() {
    return (
        <View>     
            <CardItem style={{backgroundColor: '#FDDBAD'}}>
                <Body style={{flex:4}}>  
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Text style={styles.topic1}>บริษัท</Text>
                    <Text style={styles.content}>The Face Shop (Thailand)</Text>
                    </View>
                </ Body>
            </ CardItem>
            <CardItem style={{backgroundColor: '#ffff'}}>
                <Body style={{flex:4}}>  
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Text style={styles.topic2}>รหัสพนักงาน</Text>
                    <Text style={styles.content}>P49-613445</Text>
                    </View>
                </ Body>
            </ CardItem>
            <CardItem style={{backgroundColor: '#FDDBAD'}}>
                <Body style={{flex:4}}>  
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Text style={styles.topic1}>แผนก</Text>
                    <Text style={styles.content}>การตลาด</Text>
                    </View>
                </ Body>
            </ CardItem>
            <CardItem style={{backgroundColor: '#ffff'}}>
                <Body style={{flex:4}}>  
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Text style={styles.topic2}>โทรศัพท์</Text>
                    <Text style={styles.content}>02-712-7000</Text>
                    <Button bordered style={styles.buttonView}><Icon style={styles.iconStyle} name='phone' /></ Button>
                    </View>
                </ Body>
            </ CardItem>
            <CardItem style={{backgroundColor: '#FDDBAD'}}>
                <Body style={{flex:4}}>  
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Text style={styles.topic1}>มือถือ</Text>
                    <Text style={styles.content}>081-272-6432</Text>
                    <Button bordered style={styles.buttonView}><Icon style={styles.iconStyle} name='phone' /></ Button>
                    </View>
                </ Body>
            </ CardItem>
            <CardItem style={{backgroundColor: '#ffff'}}>
                <Body style={{flex:4}}>  
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Text style={styles.topic2}>อีเมล์</Text>
                    <Text style={styles.content}>mail@company.com</Text>
                    </View>
                </ Body>
            </ CardItem>
            <CardItem style={{backgroundColor: '#FDDBAD'}}>
                <Body style={{flex:4}}>  
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Text style={styles.topic1}>Social Profile</Text>
                    <Button bordered style={styles.buttonView}><Icon style={styles.iconStyle} name='phone' /></ Button>
                    <Button bordered style={styles.buttonView}><Icon style={styles.iconStyle} name='phone' /></ Button>
                    <Button bordered style={styles.buttonView}><Icon style={styles.iconStyle} name='phone' /></ Button>
                    </View>
                </ Body>
            </ CardItem>
        </View>
    );
  }
}