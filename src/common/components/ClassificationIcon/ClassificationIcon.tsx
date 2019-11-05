
import Taro,{Component} from '@tarojs/taro';
import {Image, Text, View} from "@tarojs/components";
import {ClassificationIconProps} from "../../types";
import './ClassificationIcon.scss'
class ClassificationIcon extends Component<ClassificationIconProps> {
  static externalClass = ['outer-class'];
  render() {
    let {title,imgUrl,onClick} = this.props;
    return (
      <View className={'classification-icon outer-class'} onClick={()=>onClick(title)}>
        <Image className={'img'} src={imgUrl}/>
        <Text className={'text'}>{title}</Text>
      </View>
    );
  }
}

export default ClassificationIcon;
