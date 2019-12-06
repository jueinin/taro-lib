import Taro, {Component} from '@tarojs/taro'
import './test.scss'
import { AtButton } from 'taro-ui';
import { View } from '@tarojs/components';
class Test extends Component{
  static config ={
  }
  render(): any {
    return <View>
      <AtButton>dsds</AtButton>
    </View>;
  }
}

export default Test;
