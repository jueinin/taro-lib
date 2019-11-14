import Taro, { Component } from '@tarojs/taro';
import { Image, ScrollView, Swiper, SwiperItem, Text, View } from '@tarojs/components';
import { BookDetailItemProps, CommentPreview } from '../../../../common/types';
import { toPercent } from '../../../../common/utils';
import {ViewProps} from "@tarojs/components/types/View";

function Tag(props: CommentPreview['tags'][0]) {
  return (
    <View className={'tag-item'}>
      {props.title}({props.amount})
    </View>
  );
}
function CommentPreview(props: CommentPreview['commentList'][0]) {
  return <View className={'preview'}>{props.name}</View>;
}

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
  componentDidUpdate(prevProps: Readonly<BookDetailItemProps>, prevState: Readonly<{}>, snapshot?: any): void {
    console.log(this.descriptionRef);
  }
  componentDidMount(): void {
    console.log(this.descriptionRef);
  }

  render(): any {
    let { images, price, title, author, publisher, description, comment } = this.props;
    return (
      <View className={'container page'}>
        <View>
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
              {publisher}
              <Text>></Text>
            </View>
          </View>
        </View>
        {
          <View className={'comments'}>
            <View className={'top-comment-bar'}>
              <Text>评论</Text> {toPercent(comment.goodComments, comment.comments, 2)}{' '}
              <Text>(共{comment.comments}条评价)</Text>
            </View>
            <ScrollView scrollX className={'tags'}>
              {comment.tags.map(value => (
                <Tag title={value.title} amount={value.amount} />
              ))}
            </ScrollView>
            <ScrollView scrollX className={'comment-preview'}>
              {comment.commentList.map((value, index) => {
                return (
                  <CommentPreview
                    commentText={value.commentText}
                    commentImg={value.commentImg}
                    avatar={value.avatar}
                    name={value.name}
                    key={index}
                  />
                );
              })}
            </ScrollView>
            <View>

            </View>
          </View>
        }
      </View>
    );
  }
}

export default BookDetailItem;
