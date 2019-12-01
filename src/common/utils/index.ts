
import {unix} from 'moment'
import { BookItemInfo, BookItemProps } from '../types';
import Taro from '@tarojs/taro';
/**
 *  计算百分比
 * @param {number} smallNum
 * @param {number} bigNum
 * @param {number} digit
 * @returns {string | any}
 */
export function toPercent(smallNum: number, bigNum: number, digit: number) {
  if (bigNum === 0) {
    return "100%";
  }
  let res:any = smallNum / bigNum;
  res = parseFloat((res*100).toFixed(digit))+"%"
  return res;
}


export function formatTime(unixTime: number, format: string="YYYY-MM-DD HH:mm") {
  return unix(unixTime).format(format)
}

export function bookInfoToProps(bookInfos: BookItemInfo[]) {
  return bookInfos.map((value) => {
    // @ts-ignore
    value.onClick = () => Taro.navigateTo({
      url: `/pages/bookDetail/bookDetail?bookId=${value.bookId}`,
    });
    return value;
  }) as unknown as BookItemProps[]
}
