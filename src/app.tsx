import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'

import counterStore from './store/counter'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore
}

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
      "pages/me/me",
      "pages/forum/forum",
      "pages/classificationDetail/classificationDetail",
      "pages/searchInput/searchInput",
      "pages/searchDetail/searchDetail",
      "pages/bookDetail/bookDetail", // bookId
      "pages/test/test"
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

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
