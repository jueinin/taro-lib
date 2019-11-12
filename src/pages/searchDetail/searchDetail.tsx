import Taro, {Component} from '@tarojs/taro'
import {View} from "@tarojs/components";
import SortTab from "../../common/components/SortTab/SortTab";
import {BookListProps, FilterTabType} from "../../common/types";
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
  reaction = reaction(() => this.currentTab, () => this.reachToMaxPage = false);
  componentDidMount(): void {
    this.searchString = this.$router.params.keyword;
    this.onRequestBookList(this.searchString, this.currentTab,this.currentPage);
  }

  navigateToSearchInputPage = () => {
    // Taro.navigateBack();
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
    Taro.request({
      url: `${mockPrefix}/bookSearch?keyword=${keyword}&sortType=${sortType}?page=${page}`
    }).then(callBack?callBack:(res) => {
      this.bookList = res.data;
    }).finally(() => Taro.hideLoading());
  };
  onReachBottom(): void {
    this.currentPage++;
    this.onRequestBookList(this.searchString, this.currentTab, this.currentPage, (res) => this.bookList = this.bookList.concat(res.data));
  }

  render(): any {
    return <View>
      <View>
        <SearchBar value={this.searchString} onFocus={this.navigateToSearchInputPage}/>
        <SortTab currentTab={this.currentTab} onChange={this.onSortChange}/>
        <View>
          <BookList bookList={this.bookList}/>
        </View>
      </View>
    </View>
  }
}

export default SearchDetail;
