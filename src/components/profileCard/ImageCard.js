import React from 'react';
import { Image ,View, Text } from 'react-native';
import styles from './style';

export default class ImageCard extends React.Component {

  render() {
    return (  
        <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
            <Image blurRadius={20} style={styles.imageBg} source={{uri: 'http://data.named.com/data/file/photo/editor/1712/9f95a04042dd42948a7463ed2ff023c8_oPh62DpW4Zp82g8v9lrHc6BNw.jpg'}}/>
            <View style={{position:'absolute',alignItems: 'center'}}>
                <Image style={styles.imageStyle} source={{uri: 'http://data.named.com/data/file/photo/editor/1712/9f95a04042dd42948a7463ed2ff023c8_oPh62DpW4Zp82g8v9lrHc6BNw.jpg'}}/>
                <Text style={styles.textName}>SASI RASITIKHETRAWIT</Text>
                <Text style={styles.textPosition}>Beauty Advisor</Text>
            </View>
        </View>
    );
  }
}