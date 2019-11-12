
import Taro,{Component} from '@tarojs/taro';
import {Image, Text, View} from "@tarojs/components";
import {BookItemProps} from "../../types";
import './BookItem.scss'
class BookItem extends Component<BookItemProps> {
  static defaultProps = {
    price: 0,
    imgUrl: "",
    title: "",
    author: "",
    bookId: "",
    goodComments: 0,
    comments: 0
  };
  static externalClass = ['outer-class'];
  toPercentage=(goodComments:number,comments:number)=>{
    if (comments === 0) {
      return "100%"
    }
    let res = goodComments / comments;
    return (res * 100).toPrecision(3) + "%";
  }
  render() {
    let {imgUrl,title,author,price, comments,goodComments} = this.props;
    return (
      <View className={'book-item outer-class'}>
        <View className={'img'}>
          <Image src={imgUrl}/>
        </View>
        <View className={'right'}>
          <View className={'title van-multi-ellipsis--l2'}>
            <Text className={'van-multi-ellipsis--l2'}>{title}</Text>
          </View>
          <View className={'author'}>
            <Text>{author}</Text>
          </View>
          <View className={'price'}>
            <Text>¥{price.toPrecision(3)}</Text>
          </View>
          <View className={'comments'}>
            <Text>{this.toPercentage(goodComments,comments)}好评</Text>
            <Text className={'person'}>({comments}人)</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default BookItem;
