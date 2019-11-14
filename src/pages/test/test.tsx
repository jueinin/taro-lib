import Taro, {Component} from '@tarojs/taro'
import {Text, View} from "@tarojs/components";
import './test.scss'
class Test extends Component{
  render(): any {
    return <View className={'ellipsis box'}>
      iiiiiiiii iiiiiiiiiii iiiiiiiiiiiii iiiiiiiiiiiiiiiiiiii iiiiiiiiiiiiiiiiiii iiiiiiii iiiii iiiiiiiiiiiiiiiiiii
      iiiiiiiii iiiiiiiiiii iiiiiiiiiiiii iiiiiiiiiiiiiiiiiiii iiiiiiiiiiiiiiiiiii iiiiiiii iiiii iiiiiiiiiiiiiiiiiii
      <Text className={'icon'}>全部展示</Text>
    </View>;
  }
}

export default Test;
