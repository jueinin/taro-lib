import Taro,{Component} from '@tarojs/taro'
import {View} from "@tarojs/components";

class SearchDetail extends Component{

  render(): any {
    return <View>
      detail{this.$router.params.keyword}
    </View>
  }
}

export default SearchDetail;
