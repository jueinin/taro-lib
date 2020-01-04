import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import FunctionComponent = Taro.FunctionComponent;
import useState = Taro.useState;
import './DropDown.scss';
import classNames from 'classnames';
import useCallback = Taro.useCallback;
import useEffect = Taro.useEffect;
export interface DropDownProps{
  renderOverlay: any;
}

/**
 * @description 一个简易的dropdown 那个mask似乎只能覆盖一个屏幕的高度，问题不大应该
 * @param props
 * @constructor
 */
const DropDown:Taro.FC<DropDownProps> = (props) => {
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    console.log('open', open);
  },[open])
  const onContainerClick = () => {
    setOpen(!open);
  };
  const onMaskClick=useCallback(()=>{
    setOpen(!open)
  },[])
  return <View className={'dropdown outer-class'} onClick={onContainerClick}>
    {props.children}
    <View onClick={onMaskClick} className={classNames({
      mask: open
    })}/>
    <View className={'overlay '+ classNames({
      close: !open
    })}>{props.renderOverlay}</View>
  </View>
};
export default DropDown;
