import Taro,{useEffect,useRouter} from "@tarojs/taro"
import './postDetail.scss'
import { View,Text } from '@tarojs/components';
import { observer, useLocalStore } from '@tarojs/mobx';
import {AtIcon} from 'taro-ui'
import localStoreFun from './postDetail.store';

const PostDetail = () => {
  const { postDetailInfo, getPostInfo, sortType } = useLocalStore(localStoreFun());
  // @ts-ignore
  // const postId = useRouter().params.query.postId;
  const postId = 11;
  useEffect(() => {
    getPostInfo(postId);
  }, []);
  if (!postDetailInfo) {
    return 'no';
  }
  return <View className={'post-detail'}>
    <View className={'title'}>
      {postDetailInfo.title}
    </View>
    <View className={'content'}>
      {postDetailInfo.content}
    </View>
    <View className={'comment-bar'}>
      <View className={'comment-bar-left'}>这些回复亮了</View>
      <View className={'sort-type'}>
        {sortType} <AtIcon prefixClass={'fa'} value={'arrows-v'}/>
      </View>
    </View>

  </View>;
}
export default observer(PostDetail);
