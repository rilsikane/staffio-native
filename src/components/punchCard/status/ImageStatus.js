import React from 'react';
import {View,Image} from 'react-native';
import {Body} from 'native-base';
const ImageStatus = () => {
  return(
    <View style={styles.workShiftContainerStyle}>
      <Body>
        <Image source={require('./women1.jpg')} style={{height: 420,width: 380,}} />
      </Body>
    </View>
  );
}
const styles={
workShiftContainerStyle:{
    backgroundColor: '#FFF',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
  },
}
export default ImageStatus;
