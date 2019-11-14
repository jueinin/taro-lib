import Taro, {Component} from '@tarojs/taro';

interface Props {
  [key: string]: any;
  [keys: number]: any;
}
function withMobx(injectFunction:(props:Props)=>any) {
  console.warn("这个函数taro下似乎不可用")
  return function (WrapperComponent:any) {
    return class extends Component{
      injectedProps:Props;
      constructor(props:Props) {
        super(props);
        this.injectedProps = injectFunction(this.props);
      }
      render() {
        return <WrapperComponent {...this.props} {...this.injectedProps}/>
      }
    }
  }
}

export default withMobx;
