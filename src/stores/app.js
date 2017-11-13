import { observable } from 'mobx';
import store from 'react-native-simple-store';

class AppStore {
  @observable root = undefined; // 'login' / 'after-login'

  constructor() {}

  async appInitialized() {
    const userData = await store.get("USER");
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