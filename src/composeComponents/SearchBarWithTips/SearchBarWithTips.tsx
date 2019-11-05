import Taro, {Component} from '@tarojs/taro';
import {Button, View} from "@tarojs/components";
import SearchBar from "../../common/components/SearchBar/SearchBar";
import SearchCandidateList from "../../common/components/SearchCandidateList/SearchCandidateList";
import {SearchBarWithTipsProps} from "../../common/types";
import './SearchWithTips.scss'
import classNames from "classnames";
class SearchBarWithTips extends Component<SearchBarWithTipsProps>{
  static externalClasses = ['outer-class','button-class','candidate-class'];

  render() {
    let {searchBarProps,searchButtonProps,searchCandidateProps} = this.props;
    return (
      <View className={'outer-class container'}>
        <View className={'search'}>
          <SearchBar outer-class={'search-vv'} {...searchBarProps}/><Button className={classNames('button-class button')} size={"mini"}
                                                 onClick={() => searchButtonProps.onClick(searchButtonProps.text)}>{searchButtonProps.text}</Button>
        </View>
        <View className={'candidate'}>
          <SearchCandidateList outer-class={'candidate-class'} {...searchCandidateProps}/>
        </View>
      </View>
    );
  }
}

export default SearchBarWithTips;
