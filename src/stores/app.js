import { observable } from 'mobx';
import store from 'react-native-simple-store';
import I18n from '../utils/i18n';

class AppStore {
  @observable root = undefined; // 'login' / 'after-login'
  @observable locale = 'th';
  @observable isLoading = false;
  constructor() {}

  async appInitialized() {
    let userData = await store.get("USER");
    let localeStore = await store.get("locale");
    if(!localeStore){
      localeStore = 'th';
    }
    I18n.locale = localeStore;
    this.locale = localeStore;

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