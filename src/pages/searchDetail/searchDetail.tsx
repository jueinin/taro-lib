import Taro, {Component} from '@tarojs/taro'
import {View} from "@tarojs/components";
import SortTab from "../../common/components/SortTab/SortTab";
import {BookListProps, BookSearchType, FilterTabType} from "../../common/types";
import './searchDetail.scss';
import SearchBar from "../../common/components/SearchBar/SearchBar";
import {observer} from "@tarojs/mobx";
import {observable, reaction} from "mobx";
import {mockPrefix} from "../../common/constants";
import BookList from "../../common/components/BookList/BookList";

@observer
class SearchDetail extends Component{
  @observable searchString: string = "";
  @observable currentTab: FilterTabType = FilterTabType.默认;
  @observable bookList: BookListProps = [];
  @observable currentPage: number = 1;
  reachToMaxPage: boolean = false;
  @observable maxPage:number|string="";
  reaction = reaction(() => this.currentTab, () => { // 切换tab后重置这几个数据
    this.reachToMaxPage = false;
    this.currentPage = 1;
    this.maxPage = "";
  });
  componentDidMount(): void {
    this.searchString = this.$router.params.keyword;
    this.onRequestBookList(this.searchString, this.currentTab,this.currentPage);
  }

  navigateToSearchInputPage = () => {
    Taro.navigateTo({
      url: "/pages/searchInput/searchInput?keyword=" + this.searchString
    })
  };
  onSortChange=(tab:FilterTabType)=>{
    this.currentTab = tab;
    this.currentPage = 1;
    this.onRequestBookList(this.searchString, this.currentTab,this.currentPage);
  }
  onRequestBookList = (keyword:string,sortType: FilterTabType,page:number,callBack?:any) => {
    Taro.showLoading({
      title: '加载中'
    })
    Taro.request<BookSearchType,any>({
      url: `${mockPrefix}/bookSearch?keyword=${keyword}&sortType=${sortType}?page=${page}`
    }).then(callBack?callBack:(res) => {
      this.bookList = res.data.bookData;
      this.maxPage=res.data.maxPage
    }).finally(() => Taro.hideLoading());
  };
  onReachBottom(): void {
    if (!this.reachToMaxPage) {
      this.onRequestBookList(this.searchString, this.currentTab, this.currentPage, (res) => {
        this.bookList = this.bookList.concat(res.data.bookData)
        this.maxPage=res.data.maxPage
        this.currentPage++
        if (this.currentPage===res.data.maxPage){
          this.reachToMaxPage = true;
        }
      });
    }
  }

  render(): any {
    return <View>
      <View>
        <SearchBar value={this.searchString} onFocus={this.navigateToSearchInputPage}/>
        <SortTab currentTab={this.currentTab} onChange={this.onSortChange}/>
        <View className={'book-list-container'}>
          <View className={'page-hint'}>{this.currentPage}/{this.maxPage}</View>
          <BookList bookList={this.bookList}/>
        </View>
      </View>
    </View>
  }
}

export default SearchDetail;
