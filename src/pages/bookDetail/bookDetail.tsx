import Taro, { Component } from '@tarojs/taro';
import { Button, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import { computed, observable} from 'mobx';
import {
  BookDetailCommentRes,
  BookDetailDetailsRes,
  BookDetailTabType,
  CommentItem,
  ProductInfoRes,
} from '../../common/types';
import classNames from 'classnames';
import BookDetailItem from './components/BookDetailItem/BookDetailItem';
import { apiPrefix, mockPrefix } from '../../common/constants';
import './bookDetail.scss';
import BookDetailComment from './components/BookDetailComment/BookDetailComment';
import BookDetailDetails from './components/BookDetailDetails/BookDetailDetails';
import {
  addToFavorite,
  removeFromFavorite,
  replaceDetail,
  wxRequest,
} from '../../common/utils';
import { AtButton } from 'taro-ui';
import redirectTo = Taro.redirectTo;
import GridIcon from '../../common/components/GridIcon/GridIcon';
import { get } from 'lodash';
import showLoading = Taro.showLoading;
import showToast = Taro.showToast;
import hideLoading = Taro.hideLoading;
import { StoreContext } from '../../app';
import navigateTo = Taro.navigateTo;

@observer
class BookDetail extends Component {
  @observable currentTab = BookDetailTabType.商品;
  @observable productInfo: ProductInfoRes; // 商品信息
  @observable comments: CommentItem[]; // 这个评论目测后续可能会加东西进来
  @observable commentPage = 1;
  @observable details: BookDetailDetailsRes; // 详情d
  private readonly bookId = parseInt(this.$router.params.bookId);
  static contextType = StoreContext;

  @computed get isFavorited() {
    return get(this.productInfo, 'isFavorited', false);
  }

  getBottomBarItems = () => {
    return [
      {
        icon: ' fa fa-home',
        title: '首页',
        tips: null,
        onClick: () => {
          redirectTo({
            url: 'pages/index/index',
          });
        },
      },
      {
        icon: `fa fa-star ${this.isFavorited ? 'favorited' : 'notFavorited'}`,
        title: this.isFavorited ? '取消收藏' : '收藏',
        onClick: () => {
          this.isFavorited ? this.onRemoveFavo() : this.onAddFavo();
        },
      },
      {
        icon: 'fa fa-shopping-cart',
        title: '购物车',
        tips: get(this, ['context', 'userStore', 'userData', 'shoppingCart', 'allCount'], 0),
        onClick: () => {
          navigateTo({
            url: `/pages/shoppingCart/shoppingCart`,
          });
        },
      },
    ];
  };

  onAddShoppingCart = () => {
    this.context.userStore.addToShoppingCart(this.bookId)
  };

  onAddFavo = () => {
    showLoading();
    addToFavorite(this.bookId)
      .then(() => {
        showToast({
          title: '添加收藏成功',
          duration: 3000,
        });
      })
      .finally(() => {
        hideLoading();
        this.onRequestProductInfo(this.bookId);
      });
  };
  onRemoveFavo = () => {
    showLoading();
    removeFromFavorite(this.bookId)
      .then(() => {
        showToast({
          title: '移除收藏',
          icon: 'none',
          duration: 3000,
        });
      })
      .finally(() => {
        hideLoading();
        this.onRequestProductInfo(this.bookId);
      });
  };
  componentDidMount(): void {
    // 请求商品页接口
    this.onRequestProductInfo(this.bookId);
  }
  onRequestProductInfo = (
    bookId: number,
    callback?: (res: Taro.request.Promised<ProductInfoRes>) => any,
  ) => {
    wxRequest<ProductInfoRes>({
      url: `${apiPrefix}/bookDetail/product?bookId=${bookId}`,
    }).then(
      callback
        ? callback
        : res => {
            this.productInfo = res.data;
          },
    );
  };
  onRequestCommentInfo = (
    bookId: number,
    page: number,
    callback?: (res: Taro.request.Promised<BookDetailCommentRes>) => any,
  ) => {
    Taro.showLoading();
    wxRequest<BookDetailCommentRes>({
      url: `${mockPrefix}/commentList?bookId=${bookId}&page=${page}`,
    })
      .then(
        callback
          ? callback
          : res => {
              this.comments = res.data.comments;
            },
      )
      .finally(() => Taro.hideLoading());
  };
  onReachBottom(): void {
    if (this.currentTab === BookDetailTabType.评论) {
      // 评论页底部加载
      this.commentPage++;
      Taro.showLoading();
      this.onRequestCommentInfo(this.bookId, this.commentPage, res => {
        this.comments = this.comments.concat(res.data.comments); // 目测还得加个最后一页的提示和判断
        Taro.hideLoading();
      });
    }
  }

  onRequestDetails = (bookId: number) => {
    // 请求详情 tab
    wxRequest<BookDetailDetailsRes>({
      url: `${apiPrefix}/bookDetail/details?bookId=${bookId}`,
    }).then(res => {
      res.data.details = replaceDetail(res.data.details);
      this.details = res.data;
    });
  };
  onTabChange = (targetTab: BookDetailTabType) => {
    this.currentTab = targetTab;
    if (targetTab === BookDetailTabType.详情 && !this.details) {
      this.onRequestDetails(this.bookId);
    } else if (targetTab === BookDetailTabType.评论 && !this.comments) {
      this.onRequestCommentInfo(this.bookId, 1);
    }
  };

  render(): any {
    let bottomBarItem = this.getBottomBarItems();
    return (
      <View className={'book-detail-container'}>
        <View className={'top-nav-bar'}>
          <Button
            className={classNames('transparent-button', {
              active: this.currentTab === BookDetailTabType.商品,
            })}
            onClick={() => this.onTabChange(BookDetailTabType.商品)}
          >
            商品
          </Button>
          <Button
            className={classNames('transparent-button', {
              active: this.currentTab === BookDetailTabType.详情,
            })}
            onClick={() => this.onTabChange(BookDetailTabType.详情)}
          >
            详情
          </Button>
          <Button
            className={classNames('transparent-button', {
              active: this.currentTab === BookDetailTabType.评论,
            })}
            onClick={() => this.onTabChange(BookDetailTabType.评论)}
          >
            评论
          </Button>
          <Button
            className={classNames('transparent-button', {
              active: this.currentTab === BookDetailTabType.相关,
            })}
            onClick={() => this.onTabChange(BookDetailTabType.相关)}
          >
            相关
          </Button>
        </View>
        <View className={'content'}>
          <View className={classNames({ hidden: this.currentTab !== BookDetailTabType.商品 })}>
            {this.productInfo && (
              <BookDetailItem
                images={this.productInfo.images}
                price={this.productInfo.price}
                title={this.productInfo.title}
                description={this.productInfo.description}
                author={this.productInfo.author}
                publisher={this.productInfo.publisher}
                AdGoods={this.productInfo.AdGoods}
                comment={this.productInfo.comment}
              />
            )}
          </View>
          <View className={classNames({ hidden: this.currentTab !== BookDetailTabType.详情 })}>
            {this.details && (
              <BookDetailDetails
                details={this.details.details}
                publishInfo={this.details.publishInfo}
              />
            )}
          </View>
          <View className={classNames({ hidden: this.currentTab !== BookDetailTabType.评论 })}>
            {this.comments && <BookDetailComment comments={this.comments} />}
          </View>
          <View className={classNames({ hidden: this.currentTab !== BookDetailTabType.相关 })}>
            我是相关
          </View>
        </View>
        <View className={'bottom-bar'}>
          <View className={'icons'}>
            {bottomBarItem.map(value => {
              return (
                <GridIcon
                  title={value.title}
                  icon={{
                    type: 'icon',
                    value: value.icon,
                  }}
                  tips={value.tips}
                  onClick={value.onClick}
                />
              );
            })}
          </View>
          <View className={'buys'}>
            <AtButton className={'buy-instant btn'}>立即购买</AtButton>
            <AtButton className={'add-to-cart btn'} onClick={this.onAddShoppingCart}>加入购物车</AtButton>
          </View>
        </View>
      </View>
    );
  }
}

export default BookDetail;
