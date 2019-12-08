import PostDetail from './postDetail';

class Index {
  postDetail:PostDetail;
  constructor() {
    this.postDetail = new PostDetail(this);
  }
}

export default Index;
