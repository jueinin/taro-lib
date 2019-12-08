import { mockPrefix } from '../../common/constants';
import { PostDetailInfo, PostDetailSortType } from '../../common/types';
import Taro from '@tarojs/taro';
import { observable } from 'mobx';
class PostDetailLocalStore {

}

export { PostDetailLocalStore };
export default () => () => ({
  postDetailInfo: null,
  sortType: PostDetailSortType.最早回复,
  getPostInfo: function(postId: number) {
    return Taro.request<PostDetailInfo>({
      url: `${mockPrefix}/postDetail?postId=${postId}`,
    }).then(value => {
      this.postDetailInfo = value.data;
    });
  },
});
