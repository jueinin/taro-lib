import Taro, {Component} from '@tarojs/taro'
import {Button, View} from "@tarojs/components";
import {FilterTabProps, FilterTabType} from "../../types";
import './SortTab.scss'
import classNames from "classnames";

function decidePriceStatus(currentTab: FilterTabType) {
  if ((currentTab !== FilterTabType.价格升序 && currentTab !== FilterTabType.价格降序) || currentTab === FilterTabType.价格降序) {
    return FilterTabType.价格升序;
  } else {
    return FilterTabType.价格降序
  }
}
class SortTab extends Component<FilterTabProps>{  // 带有顶部筛选
  static defaultProps={
    currentTab: FilterTabType.默认,
    onChange: _tab => {}
  }
  static externalClasses = ['outer-class'];
  render(): any {
    let {currentTab,onChange} = this.props;
    return <View className={'outer-class container'}>
      <Button onClick={()=>onChange(FilterTabType.默认)} className={classNames('transparent-button',{active: currentTab===FilterTabType.默认})}>默认</Button>
      <Button onClick={()=>onChange(FilterTabType.销量)} className={classNames('transparent-button',{active: currentTab===FilterTabType.销量})}>销量</Button>
      <Button onClick={()=>onChange(decidePriceStatus(currentTab))} className={classNames('transparent-button',{
        active: currentTab===FilterTabType.价格降序 || currentTab===FilterTabType.价格升序
      })}>价格<View className={classNames({
        "price-down": currentTab === FilterTabType.价格降序,
        "price-top": currentTab===FilterTabType.价格升序
      })}></View></Button>
      <Button onClick={()=>onChange(FilterTabType.好评)} className={classNames('transparent-button',{active: currentTab===FilterTabType.好评})}>好评</Button>
      <Button onClick={()=>onChange(FilterTabType.出版时间)} className={classNames('transparent-button',{active: currentTab===FilterTabType.出版时间})}>出版时间</Button>
    </View>;
  }
}

export default SortTab;
