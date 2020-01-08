import { action, computed, observable } from 'mobx';
import { OnGetUserInfoEventDetail } from '@tarojs/components/types/Button';
import { wxRequest } from '../common/utils';
import { apiPrefix } from '../common/constants';

export type UserData = {

}

export class UserStore {

  @observable userInfo: OnGetUserInfoEventDetail['userInfo'] = null;

  @computed get isLogin() {
    return !!this.userData;
  }

  @observable userData: any = null;

  @action
  setUserInfo = (userInfo: OnGetUserInfoEventDetail['userInfo']) => {
    this.userInfo = userInfo;
  };
  @action
  getUserData = () => {
    wxRequest({
      url: `${apiPrefix}/userData`,
    }).then(res => {
      this.userData = res.data;
    });
  };
}

