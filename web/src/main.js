import Vue from 'vue'
import App from './App.vue'
import VueRoute from 'vue-router'
import { routes } from './routes.js'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

import { Rate } from 'element-ui';

import store from './store/store.js'
import axios  from './http.js'
import * as types from './constant/ConstantConfig.js'
import { Cascader} from 'element-ui';
import { Dropdown} from 'element-ui';
import {
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Carousel,
  CarouselItem,
  Radio,
  Collapse,
  CollapseItem,
  Upload,
  Button,
  Dialog,
  Table,
  TableColumn
  }
  from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import websdk from '../node_modules/easemob-websdk';

import 'lib-flexible'

import myUtils from '../static/js/myUtils.js';
import wxapi from '../static/js/wxapi.js'
Vue.prototype.myUtils = myUtils;
Vue.prototype.wxapi = wxapi;

Vue.use(Cascader);
Vue.use(Dropdown);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Radio);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Upload);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Table);
Vue.use(TableColumn);
// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.prototype.$axios = axios;

Vue.use(Rate);

Vue.use(VueRoute);

Vue.use(Mint);
Vue.use(websdk);

// new Vue({
//   el: '#app',
//   render: h => h(App)
// });

//引用webim
let webIM = window.WebIM = websdk
Vue.prototype.$WebIM = webIM

Promise.prototype.finally = function(fn) {
  function finFn(){
    setTimeout(fn)
  }
  this.then(finFn, finFn)
  return this
};

Date.prototype.format = function (format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
};

const createRouter = () => new VueRoute({
  mode: 'history',
  // base: '/wxehealth/',
  routes
});

const router = createRouter();

// const router = new VueRoute({
//   mode: "history",
//   routes
// });

Vue.mixin({
  beforeRouteEnter(to, from, next) {
    if(to.path == '/home' || to.path == '/consultation') {  //机构主页，咨询主页添加缓存
      store.commit("addCache");
    }
    if (to.path !== global.location.pathname) {
      location.assign(to.fullPath);
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.$messagebox.close();
    // const modals = $(".v-modal");
    // if(modals && modals.length > 0) {
    //   this.$messagebox.close();
    //   next(false);
    //   return
    // }
    if ((to.path == '/chat' || to.path == '/focusHospitalList') && from.path == "/home") { //聊天或者关注医院列表进入的医院主页首先清除缓存
       store.commit("clearCache");
    }
    next();
  },
});

router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title;
  }

  // const user = sessionStorage.getItem("user");
  const user = localStorage.getItem("user");
  let userInfo = {};
  if(user) {
     userInfo = JSON.parse(user);
     store.commit("loginSuccess", userInfo);
  }
  if (userInfo) { //如果有就直接到首页咯
    next();
  } else {
    next();

  }

  // if(!userInfo.userObj) { //未登录，则登录
  //   let index = types.PATH_FILTERS.indexOf(to.path);
  //   if(index != -1) {  //不需要登录的页面
  //     next();
  //   } else {
  //     if(to.path != "/") {
  //       next("/?reurl=" + to.path.replace("/", ""));
  //     } else {
  //       next();
  //     }
  //   }
  // } else {
  //   next();
  // }

});

var vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
export default vue
