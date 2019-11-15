import Taro, { Component } from '@tarojs/taro';
import { Image, ScrollView, Swiper, SwiperItem, Text, View } from '@tarojs/components';
import { BookDetailItemProps } from '../../../../common/types';
import { toPercent } from '../../../../common/utils';
import PromotionProductItem from "../../../../common/components/PromotionProductItem/PromotionProductItem";


class BookDetailItem extends Component<BookDetailItemProps> {
  static defaultProps= {
    images: [],
    price: 0,
    title: "",
    description: "",
    author: "",
    publisher: "",
    AdGoods: [],
    comment: {
      commentList: [],
      comments: 0,
      tags: [],
      goodComments: 0
    }
  }
  descriptionRef;
  onToBookDetail = (bookId: string) => {
    Taro.navigateTo({
      url: `/pages/bookDetail/bookDetail?bookId=${bookId}`
    })
  };
  render(): any {
    let { images, price, title, author, publisher, description, comment,AdGoods } = this.props;
    return (
      <View className={'container'}>
        <View className={'top-container'}>
          <Swiper
            indicatorDots
            indicatorColor={'#495057'}
            indicatorActiveColor={'#fff'}
            autoplay
            circular
            className={'swiper'}
          >
            {images.map((image, index) => {
              return (
                <SwiperItem key={index}>
                  <Image mode={"widthFix"} className={'swiper-img'} src={image} />
                </SwiperItem>
              );
            })}
          </Swiper>
          <View className={'price'}>¥{price}</View>
          <View className={'title'}>{title}</View>

          <View ref={(node)=>this.descriptionRef=node} className={'description'}>{description}</View>
          <View className={'author-publisher'}>
            <View className={'author'}>{author}</View>
            <View className={'publisher'}>
              {publisher || '暂无出版社信息'}
              <Text className={'arrow'}>></Text>
            </View>
          </View>
        </View>
        {
          <View className={'comments'}>
            <View className={'top-comment-bar'}>
              <Text className={'comment-title'}>评论</Text>{toPercent(comment.goodComments, comment.comments, 2)}好评
              <Text className={'comment-subtitle'}> (共{comment.comments}条评价) </Text>
              <Text className={'view-more'}>查看更多<Text className={'fade-text'}>></Text></Text>
            </View>
            <ScrollView scrollX className={'tags'}>
              {comment.tags.map(value => (
                <View className={'tag-item'}>
                  {value.title}({value.amount})
                </View>
              ))}
            </ScrollView>
            <ScrollView scrollX className={'comment-preview'}>
              {comment.commentList.map((value) => {
                return (
                  <View className={'comment-preview-item'} key={value.id}>
                    <View className={'comment-preview-left'}>
                      <View className={'comment-preview-header'}>
                        <Image src={value.avatar} className={'comment-preview-avatar'}/>
                        <Text className={'comment-preview-title'}>{value.name}</Text>
                      </View>
                      <Text className={'comment-preview-text'}>{value.commentText}</Text>
                    </View>
                    {value.commentImg.length!==0 && <View className={'comment-preview-img'}>
                      <Image src={value.commentImg[0]} mode={"center"}/>
                    </View>}
                  </View>
                );
              })}
              {/*<View className={'view-more'}>*/}
              {/*  查看更多*/}
              {/*</View>*/}
            </ScrollView>
          </View>
        }
        <View className={'promote'}>
          <View className={'promote-header'}>
            <Text className={'promote-title'}>推广商品</Text><Text className={'promote-ad'}>广告</Text>
          </View>
          <ScrollView className={'promote-scroll'} scrollX>
            {AdGoods.map((value) => {
              return <PromotionProductItem key={value.bookId} imgUrl={value.imgUrl} title={value.title}  price={value.price} bookId={value.bookId} onClick={this.onToBookDetail}/>
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default BookDetailItem;
