import axios,{ config , shoppingConfig ,shoppingConfigPay} from '../http.js'

const state = {

};

const err = (error) => {
  throw new Error(error.data.rtnMsg);
};
const err2 = (error2) => {
  throw new Error(error2.data.msg);
};

const getters = {

};

const mutations = {

};

const actions = {
  //机构模块消息列表
  sysOrgModeList: ({ commit }, request) => {
    return axios.post("sysOrgModeList.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },
  //消息列表
  sysMesList: ({ commit }, request) => {
    return axios.post("sysMesList.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },
  //商城分销登录
  jvUserLogin: ({ commit }, request) => {
    return axios.post("sk/jvUserLoginSalesUid.mo", request, shoppingConfigPay).then(value => {
      return value.data;
    }).catch(err);
  },
  //分销注册
  jvUserRegister: ({ commit }, request) => {
    return axios.post("sk/jvUserLoginSalesOpenId.mo", request, shoppingConfigPay).then(value => {
      return value.data;
    }).catch(err);
  },
  //分销注册验证码
  jvUserPhoneCode: ({ commit }, request) => {
    return axios.post("sk/jvUserSmsVerify.mo", request, shoppingConfigPay).then(value => {
      return value.data;
    }).catch(err);
  },
  // 商品分销信息查询
  jvFinProdSalesInfo: ({ commit }, request) => {
    return axios.post("sk/jvFinProdSalesInfo.mo", request, shoppingConfigPay).then(value => {
      return value.data.data;
    }).catch(err);
  },
  // 咨询助理
  imhelper: ({ commit }, request) => {
    return axios.post("imhelper.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },
  // 患者开启助理群聊
  imHelperOpen: ({ commit }, request) => {
    return axios.post("imHelperOpen.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },
  // 会话状态
  imStatus: ({ commit }, request) => {
    return axios.post("imStatus.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },
  // 医生评价
  commitBusiEva: ({ commit }, request) => {
    return axios.post("busiEva.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },
  // 服务列表
  serviceList: ({ commit }, request) => {
    return axios.post("serviceList.mo", request, config).then(value => {
      return value.data.goodsSnapList;
    }).catch(err);
  },
  //分享
  busipageshare: ({ commit }, request) => {
    return axios.post("busipageshare.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },
  //发帖2
  fileUploadBatch: ({ commit }, request) => {
    return axios.post("fileUploadBatch.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },
  //发帖子
  addtcontent: ({ commit }, request) => {
    return axios.post("addtcontent.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },
  //关注
  addGroupmem: ({ commit }, request) => {
    return axios.post("addGroupmem.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },
  //点赞
  addsupport: ({ commit }, request) => {
    return axios.post("addsupport.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },
  //评论列表
  bbscommentlist:({ commit }, request) => {
    return axios.post("bbscommentlist.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },
  //评论
  addcomment:({ commit }, request) => {
    return axios.post("addcomment.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },
  //小组成员列表
  bbsgroupmemlist:({ commit }, request) => {
    return axios.post("bbsgroupmemlist.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },
  //话题内容列表
  bbssubjectlist:({ commit }, request) => {
    return axios.post("bbssubjectlist.mo", request, config).then(value => {
      return {data:value.data.data, total: value.data.total.value};
    }).catch(err);
  },
  //小组列表
  bbsgrouplist:({ commit }, request) => {
    return axios.post("bbsgrouplist.mo", request, config).then(value => {
      return value.data.data;
    }).catch(err);
  },
  //小组全部列表
  bbsOrgGroupList: ({ commit }, request) => {
    return axios.post("bbsOrgGroupList.mo", request, config).then(value => {
      return value.data.data;
    }).catch(err);
  },
  //获取服务列表
  servInfoList:({ commit }, request) => {
    return axios.post("servInfoList.mo", request, config).then(value => {
      return value.data.dataList;
    }).catch(err);
  },

  //获取机构详情
  orgDetail:({ commit }, request) => {
    return axios.post("newsAuthorOrgGet.mo", request, config).then(value => {
      return value.data.orgObj;
    }).catch(err);
  },

  //获取服务包详情
  servInfoGet:({ commit }, request) => {
    return axios.post("servInfoGet.mo", request, config).then(value => {
      return value.data.servObj;
    }).catch(err);
  },
  //查询单项目次数列表
  projectAmountList: ({commit}, request) => {
    return axios.post("medical/packages/api/projectAmountList", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //组关联套餐列表
  groupPackagesList: ({commit}, request) => {
    return axios.post("medical/packages/api/groupPackagesList", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //获取套餐列表
  packagesList: ({commit}, request) => {
    return axios.post("medical/packages/api/all", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //获取套餐置顶列表
  packagesTopList: ({commit}, request) => {
    return axios.post("medical/packages/api/topList", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //获取套餐详情
  packagesDetail: ({
    commit
  }, request) => {
    return axios.post("medical/packages/api/info", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //获取服务单位详情
  serviceCompany: ({
    commit
  }, request) => {
    return axios.post("medical/serviceCompany/api/info", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //获取套餐项目列表
  packagesProductList: ({
    commit
  }, request) => {
    return axios.post("medical/packagesProduct/api/productList", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //评价
  shoppingCommentList: ({
    commit
  }, request) => {
    return axios.post("medical/appraisal/api/list", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //套餐加项列表
  addPackagesProductList: ({
    commit
  }, request) => {
    return axios.post("medical/packagesProduct/api/addItemList", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //查询套餐加项列表
  queryAddProductList: ({
    commit
  }, request) => {
    return axios.post("medical/packagesProduct/api/queryByIdList", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //预约信息保存
  userMsgSave: ({
    commit
  }, request) => {
    return axios.post("medical/reservationUser/api/save", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //预约信息列表
  userMsgList: ({
    commit
  }, request) => {
    return axios.post("medical/reservationUser/api/list", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //预约信息更新
  userMsgUpdate: ({
    commit
  }, request) => {
    return axios.post("medical/reservationUser/api/update", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //预约信息删除
  userMsgDelete: ({
    commit
  }, request) => {
    return axios.post("medical/reservationUser/api/delete", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  // //订单列表
  // shopOrderList: ({
  //   commit
  // }, request) => {
  //   return axios.post("/orders/orderUnity/api/list", request, shoppingConfig).then(data => {
  //     return data.data;
  //   }).catch(err2);
  // },
  // //订单详情-确认信息
  // shopConfirmOrderDetail: ({
  //   commit
  // }, request) => {
  //   return axios.post("/orders/serviceOrder/api/confirmInfo", request, shoppingConfig).then(data => {
  //     return data.data;
  //   }).catch(err2);
  // },
  // //取消订单
  // shopCancelOrder: ({
  //   commit
  // }, request) => {
  //   return axios.post("/orders/orderUnity/api/cancel", request, shoppingConfig).then(data => {
  //     return data.data;
  //   }).catch(err2);
  // },
  //筛选分类列表
  queryByType: ({
    commit
  }, request) => {
    return axios.post("mall/category/api/queryByType", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //筛选性别和年龄
  queryByCodeList: ({
    commit
  }, request) => {
    return axios.post("system/dictionary/api/queryByCodeList", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //图片上传
  commentUploadImg: ({
    commit
  }, request) => {
    return axios.post("system/file/api/uploadImg", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //发起评论
  getComment: ({
    commit
  }, request) => {
    return axios.post("medical/appraisal/api/save", request, shoppingConfig).then(data => {
      return data.data;
    }).catch(err);
  },
  //创建订单
  shopOrderCreate: ({
    commit
  }, request) => {
    return axios.post("sk/jvFinOrderCreate.mo", request, shoppingConfigPay).then(data => {
      return data.data;
    }).catch(err);
  },
  //确认订单
  shopOrderConfirm: ({
    commit
  }, request) => {
    return axios.post("sk/jvFinOrderConfirm.mo", request, shoppingConfigPay).then(data => {
      return data;
    }).catch(err);
  },
  //订单列表
  shopOrderList: ({
    commit
  }, request) => {
    return axios.post("sk/jvFinOrderQuery.mo", request, shoppingConfigPay).then(data => {
      return data.data;
    }).catch(err);
  },
  //取消订单-退款
  shopCancelOrder: ({
    commit
  }, request) => {
    return axios.post("sk/jvFinOrderRefound.mo", request, shoppingConfigPay).then(data => {
      return data.data;
    }).catch(err);
  },

};

export default {
  state,
  mutations,
  actions,
  getters
}
