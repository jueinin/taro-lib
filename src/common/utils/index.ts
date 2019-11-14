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
