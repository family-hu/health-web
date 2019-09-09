import axios,{ consultationConfig } from '../http.js'
import {config} from "../http";

const state = {
    orgId: '0',
    selected: 'home',
    refreshOrder: false,   //刷新订单
    refreshCollect: false,  //刷新收藏
    comment: {},   //订单已评价id
};

const err = (error) => {
  throw new Error(error.data.rtnMsg);
};

const getters = {
  getOrgId: state => {
    return state.orgId;
  }
};

const mutations = {
  setOrgId: (state, orgId) => {
    state.orgId = orgId;
  },

  setSelected: (state, value) => {
    state.selected = value;
  },

  setRefreshOrder: (state, refresh) => {
    state.refreshOrder = refresh;
  },

  setRefreshCollect: (state, refresh) => {
    state.refreshCollect = refresh;
  },

  setComment: (state, comment) => {
    state.comment = comment;
  }

};

const actions = {
  userLogin:({ commit }, request) => {
    return axios.post("jvUserLogin.mo", request, consultationConfig).then(value => {
      // if(value.data.openId) {
      //   commit("wxData", value.data);
      // }
      if(value.data.userObj) {
        commit("loginSuccess", value.data)
      }
    }).catch(err);
  },

  //获取用户信息
  jvUserInfoGet: ({ commit }, request) => {
    return axios.post("jvUserInfoGet.mo", request, consultationConfig).then(value => {
      if(value.data.userObj) {
        commit("updateUser", value.data.userObj);
      }
      return value.data.userObj;
    }).catch(err);
  },

  //微信公众号主页数据
  homePage:({ commit }, request) => {
    return axios.post("jvPsycHomePage.mo", request, consultationConfig).then(value => {
      return value.data.data;
    }).catch(err);
  },

  //心里测评列表查询接口
  evalListQuery:({ commit }, request) => {
    return axios.post("jvPsycEvalListQuery.mo", request, consultationConfig).then(value => {
      return {dataList: value.data.data, total: parseInt(value.data.total.value)};
    }).catch(err);
  },

  //下订单
  orderCreate:({ commit }, request) => {
    return axios.post("jvPsycOrderCreate.mo", request, consultationConfig).then(value => {
      return value.data.data;
    }).catch(err);
  },

  //下订单检查
  orderCheck:({ commit }, request) => {
    return axios.post("jvPsycOrderCheck.mo", request, consultationConfig).then(value => {
      return value.data.data;
    }).catch(err);
  },

  //测试详情查询
  evalInfoQuery:({ commit }, request) => {
    return axios.post("jvPsycEvalInfoQuery.mo", request, consultationConfig).then(value => {
      return value.data.data;
    }).catch(err);
  },

  //提交答案
  recordeSubmit:({ commit }, request) => {
    return axios.post("jvPsycRecordeSubmit.mo", request, consultationConfig).then(value => {
      return value.data;
    }).catch(err);
  },

  //提交测评
  evalSubmit:({ commit }, request) => {
    return axios.post("jvPsycEvalSubmit.mo", request, consultationConfig).then(value => {
      return value.data.data;
    }).catch(err);
  },

  //订单列表
  orderListQuery:({ commit }, request) => {
    return axios.post("jvPsycOrderListQuery.mo", request, consultationConfig).then(value => {
      return {dataList: value.data.data, total: parseInt(value.data.total.value)};
    }).catch(err);
  },

  //收藏
  favoriteAdd:({ commit }, request) => {
    return axios.post("jvPsycFavoriteAdd.mo", request, consultationConfig).then(value => {
      return value.data.data;
    }).catch(err);
  },

  //取消收藏
  favoriteDel:({ commit }, request) => {
    return axios.post("jvPsycFavoriteDel.mo", request, consultationConfig).then(value => {
      return value.data;
    }).catch(err);
  },

  //收藏查询
  favoriteCheck:({ commit }, request) => {
    return axios.post("jvPsycFavoriteCheck.mo", request, consultationConfig).then(value => {
      return value.data.data;
    }).catch(err);
  },

  //收藏列表
  favoriteList:({ commit }, request) => {
    return axios.post("jvPsycFavoriteList.mo", request, consultationConfig).then(value => {
      return {dataList: value.data.data, total: parseInt(value.data.total.value)};
    }).catch(err);
  },

  //报告详情
  reportInfo:({ commit }, request) => {
    return axios.post("jvPsycReportInfo.mo", request, consultationConfig).then(value => {
      return value.data.data;
    }).catch(err);
  },

  //评论字典获取
  commentKeywordsQuery:({ commit }, request) => {
    return axios.post("jvPsycCommentKeywordsQuery.mo", request, consultationConfig).then(value => {
      return value.data.data;
    }).catch(err);
  },

  //添加评论
  commentAdd:({ commit }, request) => {
    return axios.post("jvPsycCommentAdd.mo", request, consultationConfig).then(value => {
      return value.data.data;
    }).catch(err);
  },

  //评论列表
  commentList:({ commit }, request) => {
    return axios.post("jvPsycCommentList.mo", request, consultationConfig).then(value => {
      return {
        dataList: value.data.data,
        total: parseInt(value.data.total.value),
        keywords: value.data.keywords,
        score: parseInt(value.data.totalScore.value),
        totalMem: value.data.totalMem.value
      };
    }).catch(err);
  },

};

export default {
  state,
  mutations,
  actions,
  getters
}
