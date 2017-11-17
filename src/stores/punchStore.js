/* @flow */

import { observable } from 'mobx';
import { Alert } from 'react-native';


export default class PunchStore {
  @observable selfiePath = "";
  @observable puchRecordData = {};
  @observable locationSearch = [];
  @observable statusSearch = [];
  @observable dateSearch = [];
  @observable staffSearch = [];
  @observable statusForm=undefined;
  @observable startDateFrom={};
  @observable endDateFrom={};


}
