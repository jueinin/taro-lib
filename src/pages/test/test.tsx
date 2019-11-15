import Taro, {Component} from '@tarojs/taro'
import {View} from "@tarojs/components";
import './test.scss'
class Test extends Component{
  render(): any {
    return <View className={'ellipsis'}>
      一直都很喜欢周国平的文章，优美的文字当中饱含人生的哲理。此书从哲学的角度提出人生的三个觉醒：生命的觉醒、自我的觉醒、灵魂的觉醒，然后从多方面阐述这三个觉醒。虽是饱含哲理，但读来如朋友之间的谈话，清楚易明。文中的插画也值得一赞。
    </View>;
  }
}

export default Test;
