import Taro from '@tarojs/taro';
import './me.scss';
import { Button, Text, View } from '@tarojs/components';
import { AtAvatar, AtCard } from 'taro-ui';
import { apiPrefix, defaultAvatar, mockPrefix, storage } from '../../common/constants';
import { withToken, wxRequest } from '../../common/utils';
import navigateTo = Taro.navigateTo;
import { OnGetUserInfoEventDetail } from '@tarojs/components/types/Button';
import showToast = Taro.showToast;
import useState = Taro.useState;
import { get } from 'lodash';
import { observer } from '@tarojs/mobx';
import { StoreContext } from '../../app';
import GridIcon from '../../common/components/GridIcon/GridIcon';
import login = Taro.login;
import Component = Taro.Component;
import { UserStore } from '../../store/userStore';
import { observable } from 'mobx';
@observer
class Me extends Component {
  static contextType = StoreContext;
  @observable userStore: UserStore;
  static config = {
    navigationBarTitleText: '我的',
    navigationBarBackgroundColor: '#dc3545',
  };
  componentDidMount(): void {
    this.userStore = this.context.userStore;
  }

  @observable nav1Items = [
    {
      icon: 'fa fa-paper-plane',
      title: '浏览历史',
      onClick: () => {
        this.authEvent(() => {
          navigateTo({
            url: '/pages/browsingHistory/browsingHistory',
          });
        });
      },
    },
    {
      icon: 'fa fa-star',
      title: '我的收藏',
      onClick: () => {
        this.authEvent(() => {
          navigateTo({
            url: '/pages/myFavorite/myFavorite',
          });
        });
      },
    },
    {
      icon: 'fa fa-comments',
      title: '论坛消息',
      onClick: () => {},
    },
    {
      icon: 'fa fa-cart',
      title: '购物车',
      onClick: () => {
        navigateTo({
          url: `/pages/shoppingCart/shoppingCart`,
        });
      },
    },
  ];
  @observable nav2Items = [
    {
      icon: 'fa fa-minus-square-o',
      title: '待付款',
      onClick: () => {
      },
    },
    {
      icon: 'fa fa-motorcycle',
      title: '待收货',
      onClick: () => {
      },
    },
    {
      icon: 'at-icon at-icon-message',
      title: '待评价',
      onClick: () => {
      },
    },
    {
      icon: 'at-icon at-icon-close-circle ',
      title: '退款/售后',
      onClick: () => {
      },
    },
    {
      icon: 'at-icon at-icon-numbered-list',
      title: '全部订单',
      onClick: () => {
      },
    },
  ];
  authEvent = callback => {
    if (this.userStore.isLogin) {
      callback();
    } else {
      navigateTo({
        url: '/pages/login/login',
      });
    }
  };
  onGetUserInfo = e => {
    let detail: OnGetUserInfoEventDetail = e.detail;
    if (!detail.errMsg.includes('ok')) {
      showToast({
        title: '授权失败，您可能有部分功能无法使用！',
        icon: 'none',
        duration: 3000,
      });
    } else {
      this.userStore.setUserInfo(detail.userInfo);
      login({
        success: res => {
          wxRequest({
            // 请求给session加个user
            url: `${apiPrefix}/wechatLogin?code=${res.code}`,
          }).then(() => {
            this.userStore.getUserData();
          });
        },
      });
    }
  };
  render() {
    if (!this.userStore) {
      return null;
    }
    console.log('me.tsx', this.userStore.userInfo, this.userStore.isLogin);
    return (
      <View className={'me'}>
        <View className={'avatar'}>
          <View>
            <AtAvatar circle image={get(this.userStore.userInfo, 'avatarUrl', defaultAvatar)} size={'normal'}/>
          </View>
          <View className={'login'}>
            {this.userStore.isLogin ? (
              <Text className={'logined'}>{get(this.userStore.userInfo, 'nickName', '.') + 'dsds'}</Text>
            ) : (
              <Button
                className={'login-btn'}
                onGetUserInfo={this.onGetUserInfo}
                openType={'getUserInfo'}
              >
                登录 >{this.userStore.isLogin.toString()} 这玩意儿有bug
              </Button>
            )}
          </View>
        </View>
        <View className={'nav'}>
          <View className={'nav-tab-1'}>
            {this.nav1Items.map(value => {
              return (
                <GridIcon
                  onClick={value.onClick}
                  outer-class={'grid-icon'}
                  icon={{
                    type: 'icon',
                    value: value.icon,
                  }}
                  title={value.title}
                />
              );
            })}
          </View>
          <View className={'nav-tab-2'}>
            <AtCard className={'card'}>
              {this.nav2Items.map(value => {
                return (
                  <GridIcon
                    outer-class={'grid-icon'}
                    icon={{ type: 'icon', value: value.icon }}
                    title={value.title}
                  />
                );
              })}
            </AtCard>
          </View>
        </View>
      </View>
    );
  }
}

export default Me;
