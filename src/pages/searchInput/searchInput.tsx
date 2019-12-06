import Taro, {Component} from '@tarojs/taro'
import {Text, View} from "@tarojs/components";
// import SearchBar from "../../common/components/SearchBar/SearchBar";
import {mockPrefix, storage} from "../../common/constants";
import {observer} from "@tarojs/mobx";
import {observable} from "mobx";
import {SearchCandidateItem, SearchItem} from "../../common/types";
import './searchInput.scss'
import {BaseEventOrig, CommonEventFunction} from "@tarojs/components/types/common";
import classNames from "classnames";
// import SearchCandidateList from "../../common/components/SearchCandidateList/SearchCandidateList";
import SearchBarWithTips from "../../composeComponents/SearchBarWithTips/SearchBarWithTips";
import debounce from 'lodash/debounce';
import {searchTips} from "../../common/interceptor";
const partUrl = "/pages/searchDetail/searchDetail?keyword=";
@observer
class SearchInput extends Component<{},any> {
  @observable hotSearch: SearchItem[] = [];
  @observable recentSearch: SearchItem[] = [];
  @observable searchString = "";
  @observable candidateList: SearchCandidateItem[] = [];
  cancel = () => {
    Taro.navigateBack();
  };
  getHotSearch = () => {
    Taro.request({
      url: `${mockPrefix}/hotSearchKeyword`,
      success: res => {
        this.hotSearch = this.hotSearch.concat(res.data.keywords);
      }
    })
  };
  onSearch=(e:BaseEventOrig<{value:string}>)=>{
    this.navigateTo(partUrl + e.detail.value,e.detail.value)
  }
  navigateTo=(url:string,title:string,save:boolean=true)=>{ //title用来方便处理而已
    Taro.navigateTo({
      url: url,
      success: () => {
        if (title && save) {
          let arr = Taro.getStorageSync(storage.keywords) || [];
          arr.unshift(title);
          Taro.setStorageSync(storage.keywords, arr);
        }
      }
    })
  }
  onRequestSearchTip = debounce((title: string) => {
    if (title === "") {
      this.candidateList = [];
      return; // 防止异步造成candidate list一直不为空
    }
    Taro.addInterceptor(searchTips);
    Taro.request({
      url: `${mockPrefix}/searchTips?title=${title}`,
    }).then(res => {
      this.candidateList = res.data;
    })
  }, 500);
  onSearchStringChange:CommonEventFunction<{ value: string, }>=(e)=>{
    this.searchString = e.detail.value;
    this.onRequestSearchTip(e.detail.value);

  }
  onSearchListClick=(title:string)=>{
    this.navigateTo(partUrl + title, title);
  }
  componentDidMount(): void {
    this.getHotSearch();
    this.recentSearch = (Taro.getStorageSync(storage.keywords) as Array<any> || []).slice(0,10);
    this.searchString = this.$router.params.keyword || "";
  }

  render() {
    let emptyString = this.searchString.length === 0;
    return (
      <View className={'search-input'}>
        <SearchBarWithTips searchCandidateProps={{
          list: this.candidateList,
          onClick: this.onSearchListClick
        }} searchBarProps={{
          onConfirm: this.onSearch,
          value: this.searchString,
          onInput: this.onSearchStringChange
        }} searchButtonProps={{
          onClick: emptyString ? this.cancel : () => this.navigateTo(partUrl + this.searchString, this.searchString),
          text: emptyString ? "取消" : "搜索"
        }} button-class={classNames('cancel', {'not-empty': !emptyString})}/>
        <View className={'tab'}>
          <Text>热门搜索</Text>
          <View className={'content'}>
            {this.hotSearch.map((value, index) => {
              return <View className={'item'} key={index}
                           onClick={() => this.navigateTo(partUrl + value, value)}>{value}</View>
            })}
          </View>
        </View>
        <View className={'tab'}>
          <Text>最近搜索</Text>
          <View className={'content'}>
            {this.recentSearch.length !== 0 ? this.recentSearch.map((value, index) => {
              return <View className={'item'} onClick={() => this.navigateTo(partUrl + value, value, false)}
                           key={index}>{value}</View>;
            }) : <View className={'not'}>还没有搜索记录,快去搜索喜爱的书籍吧!</View>}
          </View>
        </View>
      </View>
    );
  }
}


export default SearchInput;
