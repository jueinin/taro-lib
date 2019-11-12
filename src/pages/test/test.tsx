import Taro, {Component} from '@tarojs/taro'
import {View} from "@tarojs/components";
import Loading from "../../common/components/Loading/Loading";
import './test.scss'
class Test extends Component{
  render(): any {
    return <Loading spining={false}>
      <View className={'dd'}>dddd</View>
    </Loading>;
  }
}

export default Test;
