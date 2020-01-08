import Taro from '@tarojs/taro';
import './me.scss';
import { Button, Text, View } from '@tarojs/components';
import { AtAvatar, AtCard } from 'taro-ui';
import { useAsync, useToggle } from '../../common/hooks';
import { apiPrefix, defaultAvatar, mockPrefix, storage } from '../../common/constants';
import { withToken, wxRequest } from '../../common/utils';
import request = Taro.request;
import useEffect = Taro.useEffect;
import getStorageSync = Taro.getStorageSync;
import navigateTo = Taro.navigateTo;
import useRef = Taro.useRef;
import authorize = Taro.authorize;
import { OnGetUserInfoEventDetail } from '@tarojs/components/types/Button';
import showToast = Taro.showToast;
import useState = Taro.useState;
import { get } from 'lodash';
import { observer } from '@tarojs/mobx';
import useContext = Taro.useContext;
import { StoreContext } from '../../app';
import GridIcon from '../../common/components/GridIcon/GridIcon';
import login = Taro.login;


const Me = () => {
  let userStore = useContext(StoreContext).userStore;
  let { isLogin, userInfo } = userStore;
  const onGetUserInfo = (e) => {
    let detail: OnGetUserInfoEventDetail = e.detail;
    if (!detail.errMsg.includes('ok')) {
      showToast({
        title: '授权失败，您可能有部分功能无法使用！',
        icon: 'none',
        duration: 3000,
      });
    } else {
      userStore.setUserInfo(detail.userInfo);
      login({
        success: res => {
          wxRequest({ // 请求给session加个user
            url: `${apiPrefix}/wechatLogin?code=${res.code}`,
          }).then(res=>{
            userStore.getUserData();
          });
        }
      })
    }
  };
  const authEvent = (callback) => {
    console.log(isLogin, userInfo);
    if (isLogin) {
      callback();
    } else {
      navigateTo({
        url: '/pages/login/login',
      })
    }
  };
  const [nav1Items, setNav1Items] = useState([
    {
      icon: 'fa fa-paper-plane',
      title: '浏览历史',
      onClick: () => {
        authEvent(() => {
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
        authEvent(()=>{
          navigateTo({
            url: '/pages/myFavorite/myFavorite'
          })
        })
      },
    },
    {
      icon: 'fa fa-comments',
      title: '论坛消息',
      onClick: ()=>{}
    },
  ]);
  const [nav2Items, setNav2Items] = useState([
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
  ]);
  console.log(isLogin,userInfo);
  return <View className={'me'}>
    <View className={'avatar'}>
      <View><AtAvatar circle image={get(userInfo, 'avatarUrl', defaultAvatar)} size={'normal'}/></View>
      <View className={'login'}>
        {isLogin ? <Text className={'logined'}>{get(userInfo, 'nickName', '')}</Text> :
          <Button className={'login-btn'} onGetUserInfo={onGetUserInfo} openType={'getUserInfo'}>登录 ></Button>}
      </View>
    </View>
    <View className={'nav'}>
      <View className={'nav-tab-1'}>
        {nav1Items.map(value=>{
          return <GridIcon onClick={value.onClick} outer-class={'grid-icon'} icon={{
            type: 'icon',
            value: value.icon
          }} title={value.title}/>
        })}
      </View>
      <View className={'nav-tab-2'}>
        <AtCard className={'card'}>
          {nav2Items.map(value=>{
            return <GridIcon outer-class={'grid-icon'} icon={{type: 'icon',value: value.icon}} title={value.title}/>
          })}
        </AtCard>
      </View>
    </View>
  </View>;
};
Me.options = {
  addGlobalClass: true,
};
Me.config = {
  navigationBarTitleText: '我的',
  navigationBarBackgroundColor: '#dc3545',
};

export default observer(Me);
