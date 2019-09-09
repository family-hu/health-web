import axios,{ config } from '../http.js'

const state = {

};

const err = (error) => {
  throw new Error(error.data.rtnMsg);
};

const getters = {

};

const mutations = {

};

const actions = {
  //获取人群列表
  personList: ({ commit }, request) => {
    return axios.post("personList.mo", request, config).then(value => {
      return value.data.dataList;
    }).catch(err);
  },

  //获取服务包列表
  packList: ({ commit }, request) => {
    return axios.post("packList.mo", request, config).then(value => {
      return value.data.dataList;
    }).catch(err);
  },

  //新增签约
  signAdd: ({ commit }, request) => {
    return axios.post("signAdd.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },

  //提交签名
  signImgCommit: ({ commit }, request) => {
    return axios.post("signImgCommit.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
