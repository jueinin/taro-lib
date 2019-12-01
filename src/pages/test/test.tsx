import Taro, {Component} from '@tarojs/taro'
import { Input, View } from '@tarojs/components';
import './test.scss'
class Test extends Component{
  render(): any {
    return <View>
      <Input onInput={() => console.log('fff')}/>
    </View>;
  }
}

export default Test;
