import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';


import Camera from 'react-native-camera';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { NavigationActions } from'react-navigation';
import RNFS from 'react-native-fs'
import ImageResizer from 'react-native-image-resizer';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../../assets/fonts/config.json'
const IconTello = createIconSetFromFontello(fontelloConfig);
import app  from '../../stores/app';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    paddingTop: 15,
    backgroundColor: 'transparent',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
  cancelButton:{
    padding: 15,
    backgroundColor: 'transparent',
    borderRadius: 40,
    right:0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  bottomRightOverlay: {
    position: 'absolute',
    right:5,
    bottom: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }
});
@inject('punchStore')
@observer
export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.camera = null;
    this.app = app;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.disk,
        type: Camera.constants.Type.front,
        orientation: Camera.constants.Orientation.portrait,
        flashMode: Camera.constants.FlashMode.auto,
        captureQuality:"low"
      },
      isRecording: false
    };
    this.gotoConfirm = this.gotoConfirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  async gotoConfirm(path){
    const response = await this.resize(path);
    console.log(response);
    let base64Img = await RNFS.readFile(response, "base64")  
    this.props.punchStore.selfiePath = base64Img;
    let success = await RNFS.unlink(path)

    this.props.navigator.push({
			screen: 'staffio.ConfirmPunchScreen', // unique ID registered with Navigation.registerScreen
			title: undefined, // navigation bar title of the pushed screen (optional)
			titleImage: undefined, // iOS only. navigation bar title image instead of the title text of the pushed screen (optional)
			passProps: {}, // Object that will be passed as props to the pushed screen (optional)
			animated: false, // does the push have transition animation or does it happen immediately (optional)
			backButtonTitle: undefined, // override the back button title (optional)
			backButtonHidden: false, // hide the back button altogether (optional)
		});
          
   }
  cancel(){
    //  const resetAction = NavigationActions.reset({
		// index: 0,
		// actions: [
		// 	NavigationActions.navigate({ routeName: 'Main'})
		// ]
		// })
		// this.props.navigator.pop({
    //   animated: true, // does the pop have transition animation or does it happen immediately (optional)
    //   animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    // });
    this.app.login();
  }

  takePicture = (func) => {
    if (this.camera) {
      this.camera.capture()
        .then(function(data){
          console.log("Take picture");
          console.log(data);
          func(data.path);
        }) 
        .catch(err => console.error(err));
    }
  }
  async resize(imageUri){
   const response = await ImageResizer.createResizedImage(`file://${imageUri}`, 720, 960, "JPEG",60);
   return response.path;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }
  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require('../../../img/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('../../../img/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('../../../img/ic_flash_off_white.png');
    }

    return icon;
  }
  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('../../../img/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('../../../img/ic_camera_front_white.png');
    }

    return icon;
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar 
          animated
          hidden
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          defaultTouchToFocus
          mirrorImage={false}
          orientation={this.state.camera.orientation}
          
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={this.switchType}
          >
            <IconTello style={{color:"#ffff"}} size={18} name="hhmm-30"/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.switchFlash}
          >
            <Image
              source={this.flashIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
                style={styles.cancelButton}
                onPress={(e) => this.cancel()}
            >
             <IconTello style={{color:"#ffff"}} size={18} name="hhmm-26"/>
            </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          {
            !this.state.isRecording
            &&
            <TouchableOpacity
                style={styles.captureButton}
                onPress={(e) => this.takePicture(this.gotoConfirm)}
            >
             <IconTello style={{color:"#ffff"}} size={50} name="hhmm-14"/>
            </TouchableOpacity>
            ||
            null
          }
        </View>
      </View>
    );
  }
}
