/* @flow */

import { observable } from 'mobx';
import { Alert } from 'react-native';


export default class LeaveStore {
  @observable leaveType = {type: "",color: ""};
  @observable markedDates={};
  @observable tmpMarkeds = [];
}
