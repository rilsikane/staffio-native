/* @flow */

import { observable } from 'mobx';


export default class LeaveStore {
  @observable leaveData={};
  @observable leaveReqLeaveType={};
  @observable leaveReqData={};
}
