import axios,{ config , shoppingConfigPay} from '../http.js'
import * as type from '../constant/ConstantConfig.js'

const state = {
  loginData: {},
  teamList: [],
  phoneFragment: false,
  nationList: [],
  relationList: [],
  otherSysUserId: null
};

const err = (error) => {
  throw new Error(error.data.rtnMsg);
};

const getters = {
  phoneFragment: state => {
    return state.phoneFragment;
  },
  loginData: state => {
    // let obj = {};
    // obj.tid = '877788291275988992'
    // obj.userObj = {};
    // obj.userObj.userId = {};
    // obj.userObj.userId.value = "877788291275988992";
    // //1098738383691227136
    // return obj;
    return state.loginData;
  },

  teamData: state => {
    return state.teamList;
  },

  nationList: state => {
    return state.nationList;
  },

  otherSysUserId: state => {
    // return "877788291275988992";
    return state.otherSysUserId;
  },

  relationList: state => {
    return state.relationList;
  }
};

const mutations = {
  updatePhoneFragment: (state,phoneFragment) => {
    state.phoneFragment = phoneFragment;
  },
  loginSuccess: (state, loginData) => {
    state.loginData = loginData;
    // sessionStorage.setItem("user", JSON.stringify(loginData));
    localStorage.setItem("user", JSON.stringify(loginData));
  },
  teamDataUpdate: (state, teamList) => {
    state.teamList = teamList;
  },
  nationList: (state, nationList) => {
    state.nationList = nationList;
  },
  otherSysUserId: (state, otherSysUserId) => {
    state.otherSysUserId = otherSysUserId;
  },
  relationList: (state, relationList) => {
    state.relationList = relationList;
  },
  wxData: (state, data) => {
    state.loginData = data;
  },
  updateUser: (state, data) => {
    state.loginData.userObj = data;
    localStorage.setItem("user", JSON.stringify(state.loginData));
  },
  clearUser: (state) => {
    state.loginData = {};
    localStorage.clear();
  }
};

const actions = {
  updatePhoneFragment: ({ commit }, phoneFragment) => {
    commit("updatePhoneFragment", phoneFragment);
  },

  //app/微信登录
  appLogin: ({ commit }, request) => {
    return axios.post("userLogin.mo", request, config).then(value => {
        if(value.data.openId) {
          commit("wxData", value.data);
        }
        if(value.data.userObj) {
          commit("loginSuccess", value.data)
        }
        return value.data;
    }).catch(err);
  },
  //获取团队列表
  teamListGet: ({ commit }, request) => {
    return axios.post("teamList.mo", request, config).then(value => {
      commit("teamDataUpdate", value.data.dataList)
    }).catch(err);
  },

  //发送验证码
  phoneCode: ({ commit }, request) => {
    return axios.post("verifyCodeSend.mo", request, config).then(value => {
      return value.data.key;
    }).catch(err);
  },

  //获取医生二维码
  doctorCode: ({ commit }, request) => {
    return axios.post("doctorCode.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },

  //获取用户信息
  userInfoGet: ({ commit }, request) => {
    return axios.post("userInfoGet.mo", request, config).then(value => {
      if(value.data.userObj) {
        commit("updateUser", value.data.userObj);
      }
      return value.data.userObj;
    }).catch(err);
  },

  //修改用户信息
  userUpdate: ({ commit }, request) => {
    return axios.post("userUpdate.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },

  //获取民族字典
  dictList: ({ commit }, request) => {
    return axios.post("dictList.mo", request, config).then(value => {
      if (request.dictType == type.DICT_NATION) {
        commit("nationList", value.data.dictList);
        return value.data.dictList;
      } else if (request.dictType == type.DICT_RELATION) {
        commit("relationList", value.data.dictList);
      } else {
        return value.data;
      }
    }).catch(error => {
      throw new Error(error.data.rtnMsg);
    })
  },

  //新增患者报到
  imNewPatientAdd: ({ commit }, request) => {
    return axios.post("imnewpatientadd.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },

  //报到列表查询
  imnewpatientlist: ({ commit }, request) => {
    return axios.post("imnewpatientlist.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },

  //报到查询
  imnewpatientquery: ({ commit }, request) => {
    return axios.post("imnewpatientquery.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },

  //关注
  busiLog: ({ commit }, request) => {
    return axios.post("busiLog.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}
