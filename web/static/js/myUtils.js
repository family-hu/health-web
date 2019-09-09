import Vue from 'vue';
import Vuex from 'vuex';
import context from '../../src/main.js'
Vue.use(Vuex);
export default {
  getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  //微信授权登录
  wxLogin: function () {
      let code = this.getQueryString("code");
      if (code) { //获取到code传后台登录
        const request = {
          loginType: '4',
          // account: "1",
          sysType: '1003104',
          code: code
        };
        let isConsultation = this.getQueryString("isConsultation");
        let method = "appLogin";
        if (isConsultation) {
          method = "userLogin";
        }
        context.$store.dispatch(method, request).then(data => {
          if (data.rtnCode == '1') {
            context.$router.go(-1); //跳过授权回调页面
          }else{
            context.$toast('登录失败，请重试');
            context.$router.push({
              path: "login"
            })
          }
        }).catch(e => {
          context.$toast(e.message);
          context.$router.push({
            path: "login"
          })
        })
      } else { //获取code
        console.log('获取code');
        const local = encodeURIComponent(
           window.location.href
        );
        console.log(local);
        const appId = 'wx923325685a35b7d4';
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          appId +
          "&redirect_uri=" +
          local +
          "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";

      }
  },
  /**
 * 时间格式化
 * @param number  时间戳 ms
 * @param format  返回格式
 */
  formatTime: function(date, format) {
    var formateArr = ['yyyy', 'MM', 'dd', 'hh', 'mm', 'ss'];
    var returnArr = [];

    var date = new Date(date);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
  }

}
