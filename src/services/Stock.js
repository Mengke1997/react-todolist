import request from '../utils/request';

const queryString = {
  parse(url) {
    const parseObj = {};
    if (!url) {
      return false;
    }
    let argStr = '';
    if (url.split('?').length > 1) {
      argStr = url.split('?')[1];
      const argArr = argStr.split('&');
      argArr.forEach(val => {
        const args = val.split('=');
        if (args.length > 1) {
          parseObj[args[0]] = args[1];
        }
      });
    }
    return parseObj;
  },
  toQueryString(params) {
    console.log('参数params:', Object.prototype.toString.call(params), params);
    if (Object.prototype.toString.call(params) !== '[object Object]') {
      // throw new Error('toString方法传参必须是一个JSON');
      return '';
    }
    let queryStr = '';
    Object.keys(params).forEach(key => {
      queryStr += `${key}=${params[key] || ''}&`;
    });
    //   console.log('queryString---', queryStr);
    return queryStr.substring(0, queryStr.length - 1);
  },
};
// 获取商品库存列表
export async function queryGoodsStockList({ params, offset = 0, limit = 10 }) {
  return request(
    `//testapi.robo2025.com/stock/v1/inventory?offset=${offset}&limit=${limit}&${queryString.toQueryString(
      params
    )}`
  );
}
