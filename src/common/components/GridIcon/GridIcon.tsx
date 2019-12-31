import Taro from '@tarojs/taro';
import { View,Image } from '@tarojs/components';
import './GridIcon.scss';
interface GridIconProps {
  icon: {
    type: 'image' | 'icon',
    value: string;
  },
  title: string;
  tips?: number;
  onClick?: any
}
const GridIcon = (props:GridIconProps) => {

  return <View className={'body outer-class'} onClick={props.onClick}>
    {props.icon.type==='icon'?<View className={'icon '+props.icon.value}/>:<Image src={props.icon.value} className={'icon img-class'}/>}
    <View className={'title'}>{props.title}</View>
    {props.tips && <View className={'tips'}>{props.tips}</View>}
  </View>
};

GridIcon.options = {
  addGlobalClass: true,
};
GridIcon.defaultProps = {
  onClick: () => {
  },

};
GridIcon.externalClasses=['outer-class','img-class']
export default GridIcon;
