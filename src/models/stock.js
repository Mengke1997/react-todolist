import { queryGoodsStockList } from '../services/Stock';
export default {
  namespace: 'stock',
  state: {
    goodsStockList: [],
    stockRecord: [],
    total: 0,
    recordTotal: 0,
  },
  effects: {
    *fetch({ offset, limit, params, success, error }, { call, put }) {
      console.log(12);
      const res = yield call(queryGoodsStockList, { offset, limit, params });
      // if (res.rescode >> 0 === 10000) {
      //   if (typeof success === 'function') {
      //     success(res);
      //   }
      // } else if (typeof error === 'function') {
      //   error(res);
      // }
      console.log(res);
      // const { headers } = res;
      // yield put({
      //   type: 'save',
      //   payload: res.data,
      //   headers,
      // });
    },
  },
  reducers: {},
};
