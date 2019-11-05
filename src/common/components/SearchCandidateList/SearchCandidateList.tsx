import Taro,{Component} from '@tarojs/taro'
import './SearchCandidateList.scss';
import {Text, View} from "@tarojs/components";
import {SearchCandidateListProps} from "../../types";

class SearchCandidateList extends Component<SearchCandidateListProps>{
  static externalClasses=['outer-class']
  static defaultProps = {
    list: [],
    onClick: ()=>{}
  };
  render() {
    let {list,onClick} = this.props;
    return (
     <View className={'outer-class'}>
       {list.map((value, _index) => {
         return <View className={'item'} onClick={()=>onClick(value.title)}>
           <Text className={'left'}>{value.title}</Text>
           <Text className={'right'}>{value.resultCount}</Text>
         </View>
       })}
     </View>
    );
  }
}

export default SearchCandidateList;
