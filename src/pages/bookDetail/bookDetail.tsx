import Taro, { Component } from '@tarojs/taro';
import { Button, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import { observable } from 'mobx';
import { BookDetailTabType, ProductInfo } from '../../common/types';
import classNames from 'classnames';
import BookDetailItem from './components/BookDetailItem/BookDetailItem';
import { mockPrefix } from '../../common/constants';
import './bookDetail.scss'
@observer
class BookDetail extends Component {
  @observable currentTab = BookDetailTabType.商品;
  @observable productInfo: ProductInfo;
  componentDidMount(): void {
    // 请求商品页接口
    this.onRequestProductInfo(this.$router.params.bookId);
  }

  onRequestProductInfo = (
    bookId: string,
    callback?: (res: Taro.request.Promised<ProductInfo>) => any,
  ) => {
    Taro.request<ProductInfo>({
      url: `${mockPrefix}/bookDetail/product?bookId=${bookId}`,
    }).then(
      callback
        ? callback
        : res => {
            this.productInfo = res.data;
          },
    );
  };

  render(): any {
    return (
      <View>
        <View className={'top-nav-bar'}>
          <Button
            className={classNames('transparent-button',{active: this.currentTab === BookDetailTabType.商品})}
            onClick={() => (this.currentTab = BookDetailTabType.商品)}
          >
            商品
          </Button>
          <Button
            className={classNames('transparent-button',{active: this.currentTab === BookDetailTabType.详情})}
            onClick={() => (this.currentTab = BookDetailTabType.详情)}
          >
            详情
          </Button>
          <Button
            className={classNames('transparent-button',{active: this.currentTab === BookDetailTabType.评论})}
            onClick={() => (this.currentTab = BookDetailTabType.评论)}
          >
            评论
          </Button>
          <Button
            className={classNames('transparent-button',{active: this.currentTab === BookDetailTabType.相关})}
            onClick={() => (this.currentTab = BookDetailTabType.相关)}
          >
            相关
          </Button>
        </View>
        <View>
          <View className={classNames({ hidden: this.currentTab !== BookDetailTabType.商品 })}>
            {this.productInfo && <BookDetailItem
              images={this.productInfo.images}
              price={this.productInfo.price}
              title={this.productInfo.title}
              description={this.productInfo.description}
              author={this.productInfo.author}
              publisher={this.productInfo.publisher}
              AdGoods={this.productInfo.AdGoods}
              comment={this.productInfo.comment}
            />}
          </View>
        </View>
      </View>
    );
  }
}

export default BookDetail;
