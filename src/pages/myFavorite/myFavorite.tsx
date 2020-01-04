import Taro from '@tarojs/taro';
import { View,Image } from '@tarojs/components';
import './myFavorite.scss'
import useEffect = Taro.useEffect;
import { wxRequest } from '../../common/utils';
import { apiPrefix } from '../../common/constants';
import useState = Taro.useState;
import showLoading = Taro.showLoading;
import hideLoading = Taro.hideLoading;
import empty from '../../static/images/empty.png';
import FavoriteItem, { FavoriteData } from '../../common/components/FavoriteItem/FavoriteItem';
import navigateTo = Taro.navigateTo;
const MyFavorite:Taro.FC<any> = () => {
  const [data, setData] = useState<FavoriteData[]>(null);
  const request = () => {
    showLoading()
    wxRequest<FavoriteData[]>({
      url: `${apiPrefix}/favorites`
    }).then(res=>{
      setData(res.data);
      hideLoading()
    })
  };
  useEffect(() => {
    request();
  }, []);

  const navigateToBook = (bookId:number) => {
    navigateTo({
      url: `/pages/bookDetail/bookDetail?bookId=${bookId}`,
    });
  };
  if (data && data.length === 0) {
    return <View className={'my-favorite'}>
      <View className={'none'}>
        <View className={'content'}>
          <Image src={empty} className={'img'}/>
          <View> 还没有收藏过书籍哦</View>
          <View>快去寻找你喜欢的书籍吧！</View>
        </View>
      </View>
    </View>
  }
  return <View className={'my-favorite page'}>
    {data && data.map(value => {
      return <FavoriteItem bookId={value.bookId} price={value.price} title={value.title} image={value.image} favorites={value.favorites}
                           onClick={() => navigateToBook(value.bookId)} onSimilarClick={() => {
      }}/>;
    })}
  </View>;
};
MyFavorite.config={
  navigationBarTitleText: '收藏的宝贝',
}
export default MyFavorite;
