import Taro, { Component, Config } from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image} from '@tarojs/components'

import './index.scss'
import SearchBar from "../../common/components/SearchBar/SearchBar";
import { BookItemInfo, IndexState } from '../../common/types';
import icon from '../../static/images/icons/icon.png';
import { apiPrefix, mockPrefix } from '../../common/constants';
import ClassificationIcon from "../../common/components/ClassificationIcon/ClassificationIcon";
import BookItem from '../../common/components/BookItem/BookItem';
import { wxRequest } from '../../common/utils';
class Index extends Component<any,IndexState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  state={
    classifications: [
      [{
        imgUrl: icon,
        title: "小说",

      },
        {
          imgUrl: icon,
          title: "传记",

        },
        {
          imgUrl: icon,
          title: "艺术",

        },
        {
          imgUrl: icon,
          title: "励志",

        },
      ],
      [{
        imgUrl: icon,
        title: "哲学",

      },
        {
          imgUrl: icon,
          title: "计算机",

        },
        {
          imgUrl: icon,
          title: "经济",

        },
        {
          imgUrl: icon,
          title: "历史",

        },
      ]
    ],
    books: []
  }

  config: Config = {
    navigationBarTitleText: '首页'
  }
  onToSearchInput=()=>{
    Taro.navigateTo({
      url: "/pages/searchInput/searchInput"
    })
  }
  onIconClick = (title: string) => {
    Taro.navigateTo({
      url: title
    })
  };
  onRequest=()=>{
    wxRequest({
      url: `${apiPrefix}/recommends`,
      success: res => {
        this.setState({
          books: this.state.books.concat(res.data),
        })
      }
    })
  }
  componentDidMount(): void {
    this.onRequest()
  }
  onReachBottom(): void {
    this.onRequest();
  }

  render () {
    let {books=[],classifications=[]} = this.state;
    return (
      <View className={'index'}>
        <SearchBar outer-class={'search-bar1'} onFocus={this.onToSearchInput}/>
        <View className={'top-swiper'}>
          <Swiper className={'swiper'} indicatorDots autoplay indicatorColor={'#B0B0A8'}>
            <SwiperItem>
              <Image src={'https://jueinin.oss-cn-hongkong.aliyuncs.com/%E5%B0%8F%E7%A8%8B%E5%BA%8F/swiper-image1.jpg'} className={'swiper-item'} mode={'scaleToFill'}/>
            </SwiperItem>
            <SwiperItem>
              <Image src={'https://jueinin.oss-cn-hongkong.aliyuncs.com/%E5%B0%8F%E7%A8%8B%E5%BA%8F/swiper-image2.jpg'} className={'swiper-item'} mode={'scaleToFill'}/>
            </SwiperItem>
            <SwiperItem>
              <Image src={'https://jueinin.oss-cn-hongkong.aliyuncs.com/%E5%B0%8F%E7%A8%8B%E5%BA%8F/swiper-image3.jpg'} className={'swiper-item'} mode={'scaleToFill'}/>
            </SwiperItem>
          </Swiper>
        </View>
        <View className={'classifications'}>
          {classifications.map((_row, index) => {
            return <View className={'row'} key={index}>
              {classifications[index].map((item, _indexs) => {
                return <View className={'item'}>
                  <ClassificationIcon key={_indexs} title={item.title} imgUrl={item.imgUrl}
                                      onClick={() => this.onIconClick(item.title)}/>
                </View>;
              })}
            </View>;
          })}
        </View>
        <View className={'recommend'}>
          <View className={'for-you'}>为您推荐</View>
          <View>
            {
              books.map((value: BookItemInfo) => {
                return <BookItem key={value.bookId} author={value.author} bookId={value.bookId}
                                 comments={value.comments} goodComments={value.goodComments} imgUrl={value.imgUrl}
                                 price={value.price} title={value.title} onClick={(bookId) => Taro.navigateTo({
                  url: `/pages/bookDetail/bookDetail?bookId=${bookId}`,
                })}/>;
              })
            }
          </View>
        </View>
      </View>
    );
  }
}

export default Index
