import { useState } from '@tarojs/taro';
import useInterval from '../useInterval';
export interface Options {
  onOver: Function
}

const defaultOptions:Options = {
  onOver: ()=>{}
};
/**
 * @description 倒计时hook
 * @param maxTime
 * @param options
 * @param interval
 */
export const useCountDown = (maxTime: number, options: Options = defaultOptions, interval = 1000) => {
  maxTime = parseInt(maxTime + '');
  let [currentSecond, setCurrentSecond] = useState(maxTime);
  const [processing, setProcessing] = useState(false);
  let [delay, setDelay] = useState(null);
  useInterval(() => {
    setCurrentSecond(currentSecond - 1);
    if (currentSecond === 0) {
      setDelay(null);
      setProcessing(false);
    }
  }, delay);
  let start = () => {
    setCurrentSecond(maxTime);
    setProcessing(true);
    setDelay(interval)
  };
  return {
    currentSecond, processing, start,
  };
};
