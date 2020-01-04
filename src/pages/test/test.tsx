import Taro, {Component} from '@tarojs/taro'
import './test.scss'
import { AtButton } from 'taro-ui';
import { View } from '@tarojs/components';
import DropDown from '../../common/components/DropDown/DropDown';
class Test extends Component{
  static config ={
  }
  render(): any {
    return <View>
      <View className={'container'}>
        <DropDown renderOverlay={<AtButton onClick={()=>console.log('overlay clicked')}>overlay</AtButton>}><AtButton onClick={()=>console.log('container clicked')} size={'small'}>container</AtButton></DropDown>
      </View>
    </View>;
  }
}

export default Test;
