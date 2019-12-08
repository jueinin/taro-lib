import Taro, { useState } from '@tarojs/taro';
import { View } from '@tarojs/components';
import SearchBar from '../../common/components/SearchBar/SearchBar';
import './forum.scss';
import { AtAvatar, AtGrid, AtTabs, AtTabsPane } from 'taro-ui';
import { FollowItem, FollowItemRes, ForumTab, HotBooksRes } from '../../common/types';
import { mockPrefix } from '../../common/constants';
import useLoadMore from '../../common/hooks/useLoadMore';
import useReachBottom = Taro.useReachBottom;
import useMemo = Taro.useMemo;
import useEffect = Taro.useEffect;
import { Item } from 'taro-ui/@types/grid';


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
  const [currentHotBookTab, setCurrentHotBookTab] = useState(0);
  const [hotBooksRes, setHotBooksRes]  = useState<HotBooksRes>([]);
  useEffect(() => {
    Taro.request({
      url: `${mockPrefix}/hotBooks`,
    }).then(res => setHotBooksRes(res.data.data));
  }, []);
  const onHotBookClick = (item:Item,index) => {
    console.log(item);
  };
  return <View className={'forum'}>
    <View className={'top-search'}>
      <View className={'search'}><SearchBar placeholder={'请输入关键字搜索'}/></View>
      <View className={'publish'}>
       <View className={'at-icon at-icon-tag'}/>
       <View className={'pub-text'}>发布</View>
      </View>
    </View>
    <View className={'main'}>
      <AtTabs current={currentTab} className={'main-tab'} tabList={tabList} onClick={setCurrentTab}>
        <AtTabsPane current={ForumTab.关注} index={0}>
          {followData.length && <View className={'follow'}>
            {followData.map((value) => {
              return <View onClick={()=>Taro.navigateTo({
                url: '/pages/postDetail/postDetail?postId=' + value.id,
              })} className={'item'} key={value.id}>
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
        <AtTabsPane current={ForumTab.热门图书} index={1}>
          <View className={'hot-books'}>
            {hotBooksRes.length &&
            <AtTabs height={"calc(100vh - 82px)"} tabDirection={'vertical'} current={currentHotBookTab} tabList={hotBooksRes.map(value=>{
              return {
                title: value.classification
              }
            })} onClick={(index:number)=>{
              setCurrentHotBookTab(index)
            }}>
              {hotBooksRes.map((value, index) => {
                return <AtTabsPane key={value.classificationId} tabDirection={'vertical'} current={currentHotBookTab} index={index}>
                  <View className={'grid'}>
                    <AtGrid className={'grid-component'} hasBorder={false} columnNum={3} data={value.data.map(value1 => ({
                      value: value1.title,
                      image: value1.icon
                    }))} onClick={onHotBookClick}/>
                  </View>
                </AtTabsPane>
              })}
            </AtTabs>}
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  </View>
};
Forum.options = {
  addGlobalClass: true,
};
export default Forum;
