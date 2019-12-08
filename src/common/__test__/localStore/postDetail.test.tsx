import { PostDetailLocalStore } from '../../../pages/postDetail/postDetail.store';
describe('postDetail', () => {
  const postDetailLocalStore = new PostDetailLocalStore();
  it('should request postDetailInfo', function() {
    expect.assertions(1);
    expect(postDetailLocalStore.postDetailInfo).toEqual(null);
    return postDetailLocalStore.getPostInfo(555).then(()=>{
      expect(postDetailLocalStore.postDetailInfo).not.toEqual(null);
    })
  });
});
