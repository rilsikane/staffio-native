import React from 'react';
import { View } from 'react-native';
import { Content } from 'native-base';
import ImageCard from './ImageCard';
import ContentCard from './ContentCard'

export default class ProfileCard extends React.Component {
 
  render() {
    return (      
        <View style={{flex:1,backgroundColor:"#fee2c8"}}>
            <Content>
                <ImageCard />
                <ContentCard />
            </Content>
       </View>
    );
  }
}