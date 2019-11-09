import Chain = Taro.Chain;


// 拦截器模型是个洋葱模型,它底层源码依赖于promise,所以请求时必须用promise才能正确使用拦截器, 这个跟koa的实现几乎一样
// 洋葱模型简单的来说就是一个拦截器分为两个部分, 拦截前和拦截后, 一般只用一个拦截器即可, 所以不用考虑这一层

/**
 *  /searchTips
 * @param {Taro.Chain} chain
 * @returns {PromiseLike<void>}
 */
export const searchTips = (chain: Chain) => {
  return chain.proceed(chain.requestParams).then((res)=>{
    res.data = res.data.map(value => {
      value.subTitle = `约${(value as any).resultCount}个结果`;
      delete (value as any).resultCount;
      return value
    });
    return res;
  })
};
