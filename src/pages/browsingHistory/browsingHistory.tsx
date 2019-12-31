import Taro from '@tarojs/taro';
import './browsingHistory.scss'
import { View, Image } from '@tarojs/components';
import { useAsync } from '../../common/hooks';
import { wxRequest } from '../../common/utils';
import { apiPrefix } from '../../common/constants';
import useEffect = Taro.useEffect;
import useState = Taro.useState;
interface HistoryLineData {
  time: string;
  items: {
    id: number;
    bookId: number;
    image: string;
    price: string;
    title: string;
  }[]
}
const BrowsingHistory = () => {
  const [data, setData] = useState<HistoryLineData[]>([]);
  useEffect(()=>{
   wxRequest<HistoryLineData[]>({
     url: `${apiPrefix}/browsingHistory`
   }).then((res)=>{
     res.data
   })
  },[])
  return <View className={'browsingHistory'}>
    <View className={'tip'}>浏览历史:</View>
    {data.map(value=>{
      return <View>
        <View className={'time'}>{value.time}</View>
        <View className={'items'}>
          {value.items.map(item=>{
            return <View className={'item'}>
              <Image className={'img'} src={item.image}/>
              <View className={'title'}>{item.title}</View>

            </View>
          })}
        </View>
      </View>
    })}
  </View>
};

export default BrowsingHistory;
