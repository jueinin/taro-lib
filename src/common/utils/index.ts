
import {unix} from 'moment'
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
