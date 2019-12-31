import Taro, {Component} from '@tarojs/taro'
import { RichText, Text, View, WebView } from '@tarojs/components';
import {BookDetailDetailsProps, BookDetailDetailsType} from "../../../../common/types";
import {observable} from "mobx";
import classNames from "classnames";
import './BookDetailDetails.scss'
import {observer} from "@tarojs/mobx";
@observer
class BookDetailDetails extends Component<BookDetailDetailsProps>{   // 书籍详情的详情图文部分
  static externalClasses = ['outer-class'];
  static defaultProps = {
    publishInfo: {
      title: '',
      ISBN: '',
      author: '',
      publishTime: '',
      publisher: '',
    },
    details: ''
  };
  @observable currentTab = BookDetailDetailsType.图书详情;

  render(): any {
    let { title, ISBN, author, publisher, publishTime } = this.props.publishInfo;
    return <View>
      <View className={'top-bar'}>
        <View onClick={() => this.currentTab = BookDetailDetailsType.图书详情}
              className={classNames('left', { active: this.currentTab === BookDetailDetailsType.图书详情 })}>
          <Text className={'inner'}>图书详情</Text></View>
        <View onClick={() => this.currentTab = BookDetailDetailsType.出版信息}
              className={classNames('right', { active: this.currentTab === BookDetailDetailsType.出版信息 })}>
          <Text className={'inner'}>出版信息</Text></View>
      </View>
      <View className={classNames('book-details', { hidden: this.currentTab !== BookDetailDetailsType.图书详情 })}>
        <RichText nodes={this.props.details}/>
      </View>
      <View className={classNames('publish-details page', { hidden: this.currentTab !== BookDetailDetailsType.出版信息 })}>
        <View className={'item'}>
          <View className={'item-left'}>书名</View>
          <View className={'item-right'}>{title}</View>
        </View>
        <View className={'item'}>
          <View className={'item-left'}>ISBN</View>
          <View className={'item-right'}>{ISBN}</View>
        </View>
        <View className={'item'}>
          <View className={'item-left'}>作者</View>
          <View className={'item-right'}>{author}</View>
        </View>
        <View className={'item'}>
          <View className={'item-left'}>出版社</View>
          <View className={'item-right'}>{publisher}</View>
        </View>
        <View className={'item'}>
          <View className={'item-left'}>出版时间</View>
          <View className={'item-right'}>{publishTime}</View>
        </View>
      </View>
    </View>;
  }
}

export default BookDetailDetails;
