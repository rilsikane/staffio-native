import SearchStore from './searchStore';
import UserStore from './userStore';
import LeaveStore from './leaveStore';
import PunchStore from './punchStore';
import NaviStore from './naviStore';

export default {
  searchStore: new SearchStore(),
  userStore: new UserStore(),
  leaveStore: new LeaveStore(),
  punchStore: new PunchStore(),
  naviStore: new NaviStore()
};
