import Taro, { useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import SearchBar from '../../common/components/SearchBar/SearchBar';
import './forum.scss';
import { AtAvatar, AtTabs, AtTabsPane } from 'taro-ui';
import { FollowItem, FollowItemRes, ForumTab, HotBooksRes } from '../../common/types';
import { mockPrefix } from '../../common/constants';
import useLoadMore from '../../common/hooks/useLoadMore';
import useReachBottom = Taro.useReachBottom;
import useMemo = Taro.useMemo;
import useEffect = Taro.useEffect;


const tabList:any = [
  {
    title: '关注',
  },
  {
    title: '热门图书',
  },
];
const Forum = () => {
  const [currentTab, setCurrentTab] = useState(ForumTab.关注);
  const {data: followData=[],loadMore} = useLoadMore<any,FollowItemRes>(params => {
    return Taro.request({
      url: `${mockPrefix}/followFlow?page=${params.page}`,
    });
  }, [currentTab], {});
  useReachBottom(()=>{
    if (currentTab === ForumTab.关注) {
      loadMore();
    }
  });
  const [hotBooksRes, setHotBooksRes] = useState<HotBooksRes>();
  useEffect(() => {
    Taro.request({
      url: `${mockPrefix}/hotBooks`,
    }).then(res => setHotBooksRes(res.data));
  });
  const flowParse = useMemo(()=>followData.map(value => {
    // @ts-ignore
    value.onClick = () => Taro.navigateTo({
      url: '/pages', // todo dd
    });
    return value;
  }) as unknown as FollowItem[], [followData]);
  return <View className={'forum'}>
    <View className={'top-search'}>
      <View className={'search'}><SearchBar placeholder={'请输入关键字搜索'}/></View>
      <View className={'publish'}>
       <View className={'at-icon at-icon-tag'}/>
       <View className={'pub-text'}>发布</View>
      </View>
    </View>
    <View className={'main'}>
      <AtTabs current={currentTab} tabList={tabList} onClick={setCurrentTab}>
        <AtTabsPane current={ForumTab.关注} index={0}>
          {flowParse.length!==0 && <View className={'follow'}>
            {flowParse.map((value) => {
              return <View onClick={value.onClick} className={'item'} key={value.id}>
                <View className={'top-follow'}>
                  <AtAvatar size={'small'} circle image={value.avatar}/>
                  <View className={'at-col-offset-3'}>{value.authorName}</View>
                </View>
                <View className={'title'}>{value.title}</View>
                <View className={'bottom'}>
                  {value.comments !== 0 &&
                  <View className={'tag'}><View className={'fa fa-comment-o'}/>{value.comments}</View>}
                  {value.likes !== 0 &&
                  <View className={'tag'}><View className={'fa fa-thumbs-o-up'}/>{value.likes}</View>}
                  {value.lights !== 0 &&
                  <View className={'tag'}><View className={'fa fa-lightbulb-o'}/>{value.lights}</View>}
                </View>
              </View>;
            })}
          </View>}
        </AtTabsPane>
        <AtTabsPane current={ForumTab.话题} index={1}>
          <View className={'hot-books'}>
            {hotBooksRes && <AtTabs current={hotBooksRes[0].classificationId} tabList={hotBooksRes.map(value=>{
              return {
                title: value.classification
              }
            })} onClick={()=>{}}>

            </AtTabs>}
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  </View>
};

export default Forum;
