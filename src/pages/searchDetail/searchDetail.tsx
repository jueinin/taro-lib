import Taro, {Component} from '@tarojs/taro'
import {View} from "@tarojs/components";
import FilterTab from "../../common/components/FilterTab/FilterTab";
import {FilterTabType} from "../../common/types";

class SearchDetail extends Component{

  render(): any {
    return <View>
      detail{this.$router.params.keyword}
      <View>
        <FilterTab currentTab={FilterTabType.好评} onChange={(_tab)=>{}}/>
      </View>
    </View>
  }
}

export default SearchDetail;
