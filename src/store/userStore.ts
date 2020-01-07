import { action, computed, observable } from 'mobx';
import { OnGetUserInfoEventDetail } from '@tarojs/components/types/Button';
import { wxRequest } from '../common/utils';
import { apiPrefix } from '../common/constants';

export class UserStore {

  @observable userInfo: OnGetUserInfoEventDetail['userInfo'] = null;
  @computed get isLogin() {
    return !!this.userInfo;
  }

  @action
  setUserInfo = (userInfo: OnGetUserInfoEventDetail['userInfo']) => {
    this.userInfo = userInfo;
  };
  @action
  getUserData = () => {
    wxRequest({
      url: `${apiPrefix}/userData`
    })
  };
}
