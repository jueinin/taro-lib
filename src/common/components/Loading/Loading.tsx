import Taro, {Component} from '@tarojs/taro'
import {View,Text} from "@tarojs/components";
import './Loading.scss'
import {SpinProps} from "../../types";
import {ITouchEvent} from "@tarojs/components/types/common";
import classNames from "classnames";
class Loading extends Component<SpinProps>{
  onMaskClick=(e:ITouchEvent)=>{
    e.stopPropagation();
    e.preventDefault();
  }
  render(): any {
    let {spining = true, tips} = this.props;
    return <View className={classNames('container',{spining: spining})}>
      {spining ? <View onClick={this.onMaskClick} className={'spin-container'}>
        <Text className={'spin'}>
          <Text className={'dot'}></Text>
          <Text className={'dot'}></Text>
          <Text className={'dot'}></Text>
          <Text className={'dot'}></Text>
        </Text>
        {tips && <View className={'tip'}>{tips}</View>}
      </View> : null}
      <View>
        {this.props.children}
      </View>
    </View>;
  }
}

export default Loading;
