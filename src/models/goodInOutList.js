import _ from 'lodash';
export default {
  namespace: 'goodInOutList',
  state: {
    listData: [
      { id: 0, text: '1', completed: false },
      { id: 1, text: '31', completed: false },
      { id: 2, text: '331', completed: false },
    ],
    showListData: [
      { id: 0, text: '1', completed: false },
      { id: 1, text: '31', completed: false },
      { id: 2, text: '331', completed: false },
    ],
    isShowAll: 0,
    isSearchVal: false,
  },
  effects: {
    //   增加一个list
    *addListEffect({ param, success, error }, { call, put, select }) {
      const listData = yield select(state => {
        return state.goodInOutList.listData;
      });
      const isShowAll = yield select(state => {
        return state.goodInOutList.isShowAll;
      });
      var id = 0;
      if (listData.length > 0) {
        id = listData[listData.length - 1].id + 1;
      }
      listData.push({
        id: id,
        text: param,
        completed: false,
      });
      yield put({
        type: 'save',
        list: listData,
      });
      yield put({
        type: 'changeShowListEffect',
        param: isShowAll,
      });
    },
    // 完成一个list
    *completedListEffect({ param, success, error }, { call, put, select }) {
      const listData = yield select(state => {
        return state.goodInOutList.listData;
      });
      const isShowAll = yield select(state => {
        return state.goodInOutList.isShowAll;
      });
      const n = _.findIndex(listData, ['id', param]);
      const isComplete = listData[n].completed;
      const data = {
        ...listData[n],
        completed: !isComplete,
      };
      listData.splice(n, 1, data);
      yield put({
        type: 'save',
        list: listData,
      });
      yield put({
        type: 'changeShowListEffect',
        param: isShowAll,
      });
    },
    // 删除一个list
    *deleteListEffect({ param, success, error }, { call, put, select }) {
      const listData = yield select(state => {
        return state.goodInOutList.listData;
      });
      const isShowAll = yield select(state => {
        return state.goodInOutList.isShowAll;
      });
      const n = _.findIndex(listData, ['id', param]);
      listData.splice(n, 1);
      yield put({
        type: 'save',
        list: listData,
      });
      yield put({
        type: 'changeShowListEffect',
        param: isShowAll,
      });
    },
    // 编辑一个list
    *changeListEffect({ param, success, error }, { call, put, select }) {
      const listData = yield select(state => {
        return state.goodInOutList.listData;
      });
      const isShowAll = yield select(state => {
        return state.goodInOutList.isShowAll;
      });
      console.log(isShowAll, 'isShowAll');
      const n = _.findIndex(listData, ['id', param.id]);
      const data = {
        ...listData[n],
        text: param.value,
      };
      listData.splice(n, 1, data);
      yield put({
        type: 'save',
        list: listData,
      });
      yield put({
        type: 'changeShowListEffect',
        param: isShowAll,
      });
    },
    // 查找一个list
    *searchListEffect({ param, success, error }, { call, put, select }) {
      const listData = yield select(state => {
        return state.goodInOutList.listData;
      });
      const isShowAll = yield select(state => {
        return state.goodInOutList.isShowAll;
      });
      var arr = listData.filter(val => {
        return new RegExp(param, 'i').test(val.text);
      });
      if (arr.length === 0) {
        yield put({
          type: 'isSearchVal',
          list: true,
        });
      } else {
        yield put({
          type: 'isSearchVal',
          list: false,
        });
      }
      yield put({
        type: 'show',
        list: arr,
      });
      yield put({
        type: 'isShowAll',
        list: 4,
      });
    },

    //   显示全部0/完成1/未完成2
    *changeShowListEffect({ param, success, error }, { call, put, select }) {
      const listData = yield select(state => {
        return state.goodInOutList.listData;
      });
      yield put({
        type: 'isShowAll',
        list: param,
      });
      if (param === 0) {
        yield put({
          type: 'show',
          list: listData,
        });
      } else if (param === 2) {
        var completedFalseData = _.reject(listData, ['completed', false]);
        yield put({
          type: 'show',
          list: completedFalseData,
        });
      } else if (param === 1) {
        var completedTrueData = _.reject(listData, ['completed', true]);
        yield put({
          type: 'show',
          list: completedTrueData,
        });
      }
    },
  },
  reducers: {
    save(state, { list }) {
      return {
        ...state,
        listData: list,
      };
    },
    show(state, { list }) {
      return {
        ...state,
        showListData: list,
      };
    },
    isShowAll(state, { list }) {
      return {
        ...state,
        isShowAll: list,
      };
    },
    isSearchVal(state, { list }) {
      return {
        ...state,
        isSearchVal: list,
      };
    },
  },
};
