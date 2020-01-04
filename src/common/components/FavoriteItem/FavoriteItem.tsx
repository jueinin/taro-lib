import { View,Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtButton } from 'taro-ui';
import './FavoriteItem.scss'
export interface FavoriteData {
  image: string,
  bookId: number;
  title: string;
  price: string;
  favorites: number;
}
interface Props extends FavoriteData{
  onSimilarClick: Function;
  onClick:Function,
}
const FavoriteItem:Taro.FC<Props> = (props) => {

  return <View className={'FavoriteItem outer-class'} onClick={()=>props.onClick()}>
    <View className={'img-wrapper'}>
      <Image src={props.image} className={'img'}/>
    </View>
    <View className={'right'}>
      <View className={'title'}>{props.title}</View>
      <View className={'fav'}>{props.favorites}人收藏</View>
      <View className={'bottom'}>
        <View className={'price'}>{props.price}</View>
        <View className={'same'}>
          <AtButton size={'small'} onClick={()=>props.onSimilarClick()}>
            <View className={'at-icon at-icon-search'}/>找相似
          </AtButton>
        </View>
      </View>
    </View>
  </View>;
};
FavoriteItem.defaultProps = {
  image: '',
  onClick: () => {
  },
  onSimilarClick: () => {
  },
  title: '',
  price: '',
  favorites: 1,
};
// @ts-ignore
FavoriteItem.externalClasses = ['outer-class'];

export default FavoriteItem;
