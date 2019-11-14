import {toPercent} from "../utils";

describe("测试工具函数",()=>{
  it('should correct to percision', function () {
    expect(toPercent(33, 0,3)).toEqual("100%");
    expect(toPercent(2,4,2)).toEqual("50%")
    expect(toPercent(2,6,2)).toEqual("33.33%")
  });
})
