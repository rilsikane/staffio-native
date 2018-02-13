import { observable } from 'mobx';
import store from 'react-native-simple-store';
import I18n from '../utils/i18n';

class AppStore {
  @observable root = undefined; // 'login' / 'after-login'

  constructor() {}

  async appInitialized() {
    let userData = await store.get("USER");
    let locale = await store.get("locale");
    I18n.locale = locale;
    if (userData == null || userData.pincode==null) {
      this.root = 'login';
    }else{
       this.root = 'authen-pin';
    }
  }

  login() {
    this.root = 'after-login';
  }
  punchIn() {
    this.root = 'punch-in';
  }
  authePinCode(){
    this.root = 'authen-pin'
  }
}

export default new AppStore();