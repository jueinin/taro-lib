import Taro from '@tarojs/taro';
import './browsingHistory.scss'
import { View, Image,Text } from '@tarojs/components';
import { useAsync, useToggle } from '../../common/hooks';
import { wxRequest } from '../../common/utils';
import { apiPrefix } from '../../common/constants';
import useEffect = Taro.useEffect;
import useState = Taro.useState;
import { get } from 'lodash';
import showLoading = Taro.showLoading;
import hideLoading = Taro.hideLoading;
import { AtActionSheet,AtActionSheetItem } from 'taro-ui';
import GridIcon from '../../common/components/GridIcon/GridIcon';
import showToast = Taro.showToast;
interface Item {
  id: number;
  bookId: number;
  image: string;
  price: string;
  title: string;
  isFavorite: boolean;
}
interface HistoryLineData {
  time: string;
  items: Item[]
}
const BrowsingHistory = () => {
  const [data, setData] = useState<HistoryLineData[]>([]);
  const request = () => {
    showLoading({
      title: 'loading',
    });
    wxRequest<HistoryLineData[]>({
      url: `${apiPrefix}/browsingHistory`,
    }).then((res) => {
      setData(res.data);
      hideLoading();
    });
  };
  useEffect(() => {
    request();
  }, []);
  const {state: modalOpen,toggle:setModalOpen} = useToggle(false);
  const [currentItem,setCurrentItem]=useState<Item>(null)
  const onOpenOperationModal = (item) => {
    setCurrentItem(item);
    setModalOpen(true)
  };
  const onAddToFavorite = () => {
    wxRequest({
      method: 'POST',
      url: `${apiPrefix}/addToFavorite`,
      data: {
        bookId: currentItem.bookId
      }
    }).then(res=>{
      if (res.data.status === 'ok') {
        showToast({
          title: '添加成功',
          duration: 3000
        });
        request();
        setModalOpen(false);
      }
    })
  };
  const removeFromFavorite = () => {
    wxRequest({
      method:'POST',
      url: `${apiPrefix}/removeFromFavorite`,
      data: {
        id: currentItem.bookId
      }
    }).then(res=>{
      if (res.data.status === 'ok') {
        showToast({
          title: '取消收藏成功',
          duration: 3000
        });
        request();
        setModalOpen(false)
      }
    })
  };
  const removeFromBrowsingHistory = () => {
    wxRequest({
      url: `${apiPrefix}/removeBrowsingHistory`,
      method: 'POST',
      data: {
        id: currentItem.id
      }
    }).then((res)=>{
      if (res.data.status === 'ok') {
        showToast({
          title: '删除成功',
          duration: 3000
        });
        request();
        setModalOpen(false)
      }
    })
  };
  return <View className={'browsingHistory page'}>
    <View className={'tip'}>浏览历史:</View>
    {data.map(value=>{
      return <View>
        <View className={'time'}>{value.time}:</View>
        <View className={'items'}>
          {value.items.map(item=>{
            return <View key={item.id} className={'item'}>
              <Image mode={'widthFix'} className={'img'} src={item.image}/>
              <View className={'title'}>{item.title}</View>
              <View className={'bottom'}>
                <View className={'price'}>￥{item.price}</View>
                <View className={'oper'} onClick={()=>onOpenOperationModal(item)}>
                  <View className={'at-icon at-icon-chevron-down'}/>
                </View>
              </View>
            </View>
          })}
        </View>
        <AtActionSheet isOpened={modalOpen} className={'modal'} onClose={()=>setModalOpen(false)}>
          <View>
            <AtActionSheetItem>
              <View onClick={get(currentItem,'isFavorite',false)?removeFromFavorite:onAddToFavorite}>
                <View className={'at-icon at-icon-star fa-lg icon'}/>
                <Text>{get(currentItem,'isFavorite',false)?"取消收藏":"收藏"}</Text>
              </View>
            </AtActionSheetItem>
            <AtActionSheetItem>
              <View onClick={removeFromBrowsingHistory}>
                <View  className={'fa fa-trash-o fa-lg icon'}/>
                <Text>删除浏览历史</Text>
              </View>
            </AtActionSheetItem>
          </View>
        </AtActionSheet>
      </View>
    })}
  </View>
};

export default BrowsingHistory;
