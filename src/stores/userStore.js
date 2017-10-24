/* @flow */

import { observable } from 'mobx';
import { Alert } from 'react-native';

const API_URL: string = 'http://mobile.optimussoft.com';

export default class UserStore {
  @observable isLongin = false;
  @observable users = {};
  @observable userLogin = {username: "",password: ""};
  @observable pincode = "";

}
