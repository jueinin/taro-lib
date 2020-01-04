import Taro, { Component, Config} from '@tarojs/taro'
import './app.scss'
import './common/style/font-awesome-4.7.0/css/font-awesome.scss'
import '@tarojs/async-await'
import Index from './pages/index';
import { configRequest } from './common/hooks';
import request = Taro.request;
import getStorage = Taro.getStorage;
import getStorageSync = Taro.getStorageSync;
import { apiPrefix } from './common/constants';
import setStorageSync = Taro.setStorageSync;
import login = Taro.login;
import getSetting = Taro.getSetting;
import { get } from 'lodash';
import getUserInfo = Taro.getUserInfo;
import { UserStore } from './store/userStore';
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const store = {
  userStore: new UserStore(),
}
export const StoreContext = Taro.createContext<typeof store>(store);

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/me/me',
      'pages/forum/forum',
      'pages/classificationDetail/classificationDetail',
      'pages/searchInput/searchInput',
      'pages/searchDetail/searchDetail',
      'pages/bookDetail/bookDetail', // bookId
      'pages/postDetail/postDetail',  // postId
      'pages/login/login',
      'pages/signUp/signUp',
      'pages/personalSetting/personalSetting',
      'pages/browsingHistory/browsingHistory',
      'pages/myFavorite/myFavorite',
      'pages/test/test',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeCha1t',
      navigationBarTextStyle: 'black'
    },
    "tabBar": {
      "color": "#6e6d6b",
      "selectedColor": "#3E54D0",
      "borderStyle": "white",
      "backgroundColor": "#fff",
      "list": [
        {
          "pagePath": "pages/index/index",
          "iconPath": "./static/images/home-normal.png",
          "selectedIconPath": "./static/images/home-active.png",
          "text": "首页"
        },
        {
          "pagePath": "pages/forum/forum",
          "iconPath": "./static/images/forum-normal.png",
          "selectedIconPath": "./static/images/forum-active.png",
          "text": "论坛"
        },
        {
          "pagePath": "pages/me/me",
          "iconPath": "./static/images/user-normal.png",
          "selectedIconPath": "./static/images/user-active.png",
          "text": "我的"
        }
      ]
    }
  }

  componentDidMount () {  // 首次打开没有token的时候拿一个token，后面所有需要session的接口都要加个header auth去把token带上
    let sessionId = getStorageSync('sessionId');
    if (!sessionId) {
      // 先拿到code再从服务端用jwt拿到sessionId
      login({
        success: res =>{
          request({
            url: `${apiPrefix}/auth?code=${res.code}`,
          }).then(value => {
            setStorageSync('sessionId', value.data.token);
          });
        },
        fail: err => {
          console.error(err,'登录失败')
        }
      })
    }
    // 有权限就拿一下userInfo，没有拉倒
    getSetting({
      success: (res)=>{
        if (get(res, ['authSetting', 'scope.userInfo'], false)) {
          // 有权限
          getUserInfo({
            lang: 'zh_CN',
            success: res1 => {
              store.userStore.setUserInfo(res1.userInfo);
            },
          });
        }
      }
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <StoreContext.Provider value={store}>
        <Index />
      </StoreContext.Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
