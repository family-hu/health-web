import Vue from 'vue';
import Vuex from 'vuex';
import * as types from '../constant/ConstantConfig.js'

import userinfo from './userinfo.js';
import pack from './pack.js';
import doctor from './doctor.js';
import order from './order.js';
import service from './service.js';
import news from './news.js';
import consultation from './consultation.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // userApp: false,  //医生版本
    // sysType: types.SYS_TYPE_DOC,
    // appType: types.APP_TYPE_DOCTOR

    userApp: true,  //用户版本
    sysType: types.SYS_TYPE_USER,
    appType: types.APP_TYPE_USER,
    cacheName: ['Main', 'ConsultationMain'],
    appCode: '1', //1正式，3测试
    loginUrl: 'http://vip.sinoylb.com/wxreload.aspx?appCode=',
    appId: 'wx923325685a35b7d4',
    //  wx3bbbb5ec55d100c4
    getQueryString(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },

  },
  getters: {

    isUserApp: (state) => {
      return state.userApp;
    },
    cacheName: (state) => {
      return state.cacheName;
    },
    loginUrl: (state) => {
      return state.loginUrl + state.appCode + "&reurl=";
    },
    appCode: (state) => {
      return state.appCode;
    },
    appId: (state) => {
      return state.appId;
    }
  },
   mutations: {
    clearCache: (state) => {
      state.cacheName = [];
    },

     addCache: (state) => {
      state.cacheName = ['Main', 'ConsultationMain'];
     }
  },

  modules: {
    userinfo,
    pack,
    doctor,
    order,
    service,
    news,
    consultation
  }
});
