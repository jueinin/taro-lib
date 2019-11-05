
import Taro,{Component} from '@tarojs/taro'
import {Icon, Input, View} from "@tarojs/components";
import {SearchBarProps} from "../../types";
import './SearchBar.scss'
class SearchBar extends Component<SearchBarProps> {
  static defaultProps={
    placeholder: '请输入关键字搜索',
    placeholderClass: '',
    onInput: ()=>{},
    onFocus: ()=>{}
  }
  static externalClasses=['outer-class']
  render() {
    let {placeholder,placeholderClass,onFocus,onInput,value} = this.props;
    return (
      <View className={'search-bar '+ "outer-class"}>
        <Icon type={"search"} className={'search-icon'} size={"18px"}/>
        <Input className={'search-input'} placeholder={placeholder}
               placeholderClass={"holder" + " " + placeholderClass}
        confirmType={"search"} onFocus={onFocus} onInput={onInput} value={value}/>
      </View>
    );
  }

}

export default SearchBar;
