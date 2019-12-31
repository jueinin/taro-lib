import { unix } from 'moment';
import { BookItemInfo, BookItemProps } from '../types';
import Taro,{request} from '@tarojs/taro';
import getStorageSync = Taro.getStorageSync;
import IRequestParam = Taro.cloud.WXNS.IRequestParam;

/**
 *  计算百分比
 * @param {number} smallNum
 * @param {number} bigNum
 * @param {number} digit
 * @returns {string | any}
 */
export function toPercent(smallNum: number, bigNum: number, digit: number) {
  if (bigNum === 0) {
    return '100%';
  }
  let res: any = smallNum / bigNum;
  res = parseFloat((res * 100).toFixed(digit)) + '%';
  return res;
}

export function formatTime(unixTime: number, format: string = 'YYYY-MM-DD HH:mm') {
  return unix(unixTime).format(format);
}

export function bookInfoToProps(bookInfos: BookItemInfo[]) {
  return (bookInfos.map(value => {
    // @ts-ignore
    value.onClick = () =>
      Taro.navigateTo({
        url: `/pages/bookDetail/bookDetail?bookId=${value.bookId}`,
      });
    return value;
  }) as unknown) as BookItemProps[];
}
export const replaceDetail = function(details) { // 处理富文本内容图片用的
  var texts = ''; //待拼接的内容

  while (details.indexOf('<img') != -1) {
    //寻找img 循环

    texts += details.substring('0', details.indexOf('<img') + 4); //截取到<img前面的内容

    details = details.substring(details.indexOf('<img') + 4); //<img 后面的内容

    if (details.indexOf('style=') != -1 && details.indexOf('style=') < details.indexOf('>')) {
      texts +=
        details.substring(0, details.indexOf('style="') + 7) +
        'max-width:100%;height:auto;margin:0 auto;'; //从 <img 后面的内容 截取到style= 加上自己要加的内容

      details = details.substring(details.indexOf('style="') + 7); //style后面的内容拼接
    } else {
      texts += ' style="max-width:100%;height:auto;margin:0 auto;" ';
    }
  }

  texts += details; //最后拼接的内容

  return texts;
};

export const isEmail = (email: string) => {
  let regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(email);
};

export const withToken = () => {
  return {
    header: {
      auth: getStorageSync('sessionId'),
    }
  }
};
export const wxRequest = <T = any, U = any>(config: request.Param<U>): request.requestTask<T> => {
  return request({
    ...withToken(),
    ...config,
  });
};
