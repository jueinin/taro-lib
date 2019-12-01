import Taro, { Component, Config } from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image} from '@tarojs/components'

import './index.scss'
import SearchBar from "../../common/components/SearchBar/SearchBar";
import {IndexState} from "../../common/types";
import icon from '../../static/images/icons/icon.png';
import img1 from '../../static/images/swiper/swiper-image1.jpg';
import img2 from '../../static/images/swiper/swiper-image2.jpg';
import img3 from '../../static/images/swiper/swiper-image3.jpg';
import BookList from "../../common/components/BookList/BookList";
import {mockPrefix} from "../../common/constants";
import ClassificationIcon from "../../common/components/ClassificationIcon/ClassificationIcon";
import { bookInfoToProps } from '../../common/utils';

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
    Taro.request({
      url: `${mockPrefix}/recommends`,
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
    let {books,classifications=[]} = this.state;
    let bookListProps = bookInfoToProps(books);
    return (
      <View className={'index'}>
        <SearchBar outer-class={'search-bar1'} onFocus={this.onToSearchInput}/>
        <View className={'top-swiper'}>
          <Swiper className={'swiper'} indicatorDots autoplay indicatorColor={'#B0B0A8'}>
            <SwiperItem>
              <Image src={img1} className={'swiper-item'} mode={"scaleToFill"}/>
            </SwiperItem>
            <SwiperItem>
              <Image src={img2} className={'swiper-item'} mode={"scaleToFill"}/>
            </SwiperItem>
            <SwiperItem>
              <Image src={img3} className={'swiper-item'} mode={"scaleToFill"}/>
            </SwiperItem>
          </Swiper>
        </View>
        <View className={'classifications'}>
          {classifications.map((_row,index)=>{
            return <View className={'row'}>
              {classifications[index].map((item,_indexs)=>{
                return <View className={'item'}>
                  <ClassificationIcon key={_indexs} title={item.title} imgUrl={item.imgUrl}
                                      onClick={() => this.onIconClick(item.title)}/>
                </View>
              })}
            </View>
          })}
        </View>
        <View className={'recommend'}>
            <View className={'for-you'}>为您推荐</View>
            <View>
              <BookList bookList={bookListProps} />
            </View>
          </View>
      </View>
    );
  }
}

export default Index
