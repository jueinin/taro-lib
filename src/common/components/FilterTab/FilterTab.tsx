import Taro, {Component} from '@tarojs/taro'
import {Button, View} from "@tarojs/components";
import {FilterTabProps, FilterTabType} from "../../types";
import './FilterTab.scss'
class FilterTab extends Component<FilterTabProps>{  // 带有顶部筛选
  static defaultProps={
    currentTab: FilterTabType.默认
  }
  render(): any {
    let {currentTab,onChange} = this.props;
    let priceClass = "";
    if (currentTab === FilterTabType.价格升序) {
      priceClass = "price-top";
    }else if (currentTab === FilterTabType.价格降序) {
      priceClass = "price-down";
    }
    return <View>
      <Button className={'btn '+currentTab===FilterTabType.默认?'active':""}>默认</Button>
      <Button className={'btn '+currentTab===FilterTabType.销量?'active':""}>销量</Button>
      <Button className={'btn '+priceClass}>价格</Button>
      <Button className={'btn '+currentTab===FilterTabType.好评?'active':""}>好评</Button>
      <Button className={'btn '+currentTab===FilterTabType.出版时间?'active':""}>出版时间</Button>
    </View>;
  }
}

export default FilterTab;
