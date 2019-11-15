import Taro, {Component} from '@tarojs/taro'
import {Image, View} from "@tarojs/components";
import {PromotionProductItemProps} from "../../types";
import './PromotionProductItem.scss'
class PromotionProductItem extends Component<PromotionProductItemProps>{
  static externalClasses = ['outer-class'];
  render(): any {
    let {title,onClick,imgUrl,price,bookId} = this.props;
    return <View className={'container outer-class'} onClick={()=>onClick(bookId)}>
      <Image src={imgUrl} className={'img'}/>
      <View className={'title'}>{title}</View>
      <View className={'price'}>¥{price}</View>
    </View>
  }
}

export default PromotionProductItem;
