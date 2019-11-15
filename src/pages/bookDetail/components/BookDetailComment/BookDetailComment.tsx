import Taro, {Component} from '@tarojs/taro'
import {Image, Text, View} from "@tarojs/components";
import {BookDetailCommentProps} from "../../../../common/types";
import {AtRate} from "taro-ui";
import './BookDetailComment.scss'
import {formatTime} from "../../../../common/utils";
import {observer} from "@tarojs/mobx";
@observer
class BookDetailComment extends Component<BookDetailCommentProps>{
  static externalClasses = ['outer-class'];
  static defaultProps= {
    comments: []
  }
  render(): any {
    return <View className={'container'}>
      {this.props.comments.map((value) => {
        return <View key={value.id} className={'comment-item'}>
          <View className={'header'}>
            <Text className={'name'}>{value.name}</Text>
            <Text className={'time'}>{formatTime(value.time)}</Text>
          </View>
          <View className={'star'}>
            <AtRate size={14} value={value.star} max={5}/>
          </View>
          <View className={'text'}>
            {value.commentText}
          </View>
          <View className={'imgs'}>
            {value.commentImg.map(imgUrl => {
              return <Image className={'img'} src={imgUrl}/>
            })}
          </View>
          <View className={'line'}/>
        </View>;
      })}
    </View>
  }
}

export default BookDetailComment;
