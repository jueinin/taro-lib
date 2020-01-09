import { action, computed, observable } from 'mobx';
import { OnGetUserInfoEventDetail } from '@tarojs/components/types/Button';
import { isValidResponse, wxRequest } from '../common/utils';
import { apiPrefix } from '../common/constants';
import { showToast } from '@tarojs/taro';
export type ShoppingCartItem = {
  bookId: number;
  title: string;
  price: number;
  count: number;
  smallImage: string;
}
export type UserData = {
  shoppingCart: {
    items: ShoppingCartItem[],
    allPrice: number;
    allCount: number;
  }
}

export class UserStore {

  @observable userInfo: OnGetUserInfoEventDetail['userInfo'] = null;

  @computed get isLogin() {
    console.log('is login', !!this.userData);
    return !!this.userData;
  }

  @observable userData: UserData = null;

  @action
  setUserInfo = (userInfo: OnGetUserInfoEventDetail['userInfo']) => {
    this.userInfo = userInfo;
  };
  @action
  getUserData = () => {
    wxRequest({
      url: `${apiPrefix}/userData`,
    }).then(res => {
      if (!res.data.message) {
        this.userData = res.data;
      }
    });
  };

  @action
  addToShoppingCart=(bookId: number)=>{
    wxRequest({
      url: `${apiPrefix}/addShoppingCart?bookId=${bookId}`,
    }).then(res => {
      if (isValidResponse(res.data)) {
        showToast({
          duration: 2500,
          title: '添加成功，宝贝在购物车里等你哦~',
          icon: 'none',
        });
        this.getUserData();
      }
    });
  }
}

