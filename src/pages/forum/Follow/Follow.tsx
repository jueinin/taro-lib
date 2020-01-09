import Taro, {Component} from '@tarojs/taro';
import { FollowProps } from '../../../common/types';
import { ScrollView, View } from '@tarojs/components';
import { AtAvatar } from 'taro-ui';
import './Follow.scss'
// 关注页面
class Follow extends Component<FollowProps>{
  static defaultProps= {
    data: [],
  }
  render() {
    return (
      <ScrollView className={'follow'}>
        {this.props.data.map((value) => {
          return <View onClick={value.onClick} className={'item'} key={value.id}>
            <View className={'top-follow'}>
              <AtAvatar size={'small'} circle image={value.avatar}/>
              <View className={'at-col-offset-3'}>{value.authorName}</View>
            </View>
            <View className={'title'}>{value.title}</View>
            <View className={'bottom'}>
              {value.comments !== 0 &&
              <View className={'tag'}><View className={'at-icon at-icon-message'}/>{value.comments}</View>}
              {value.likes !== 0 &&
              <View className={'tag'}><View className={'fa fa-thumbs-up'}/>{value.likes}</View>}
              {value.lights !== 0 &&
              <View className={'tag'}><View className={'fa fa-lightbulb-o'}/>{value.lights}</View>}
            </View>
          </View>;
        })}
      </ScrollView>
    );
  }
}

export default Follow;
