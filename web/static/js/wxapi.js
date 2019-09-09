/**
 * 微信js-sdk
 * 参考文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
import Vue from 'vue';
import Vuex from 'vuex';
import wx from 'weixin-js-sdk'
import context from '../../src/main.js'
Vue.use(Vuex);
export default {
  wxShare(shareUrl, dataForWeixin) {
    let request = {
      shareurl: shareUrl
    };
    context.$store.dispatch("busipageshare", request).then(data => {
      if (data) {
        // let data = JSON.parse(data) // PS: 这里根据你接口的返回值来使用
        wx.config({
          debug: false, // 开启调试模式
          appId: data.appId, //, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
          ] // 必填，需要使用的JS接口列表
        })
        wx.ready(function () {
          //分享给微信朋友
          wx.onMenuShareAppMessage({
            title: dataForWeixin.title,
            desc: dataForWeixin.desc,
            link: dataForWeixin.link,
            imgUrl: dataForWeixin.imgUrl,
            success: function success(res) {
              console.log('已分享');
            },
            cancel: function cancel(res) {
              console.log('已取消');
            },
            fail: function fail(res) {
              alert(JSON.stringify(res));
            }
          });
          // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
          wx.onMenuShareTimeline({
            title: dataForWeixin.title,
            link: dataForWeixin.link,
            imgUrl: dataForWeixin.imgUrl,
            success: function success(res) {
              //alert('已分享');
            },
            cancel: function cancel(res) {
              //alert('已取消');
            },
            fail: function fail(res) {
              alert(JSON.stringify(res));
            }
          });
          // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareQQ({
              title: dataForWeixin.title,
              desc: dataForWeixin.desc,
              link: dataForWeixin.link,
              imgUrl: dataForWeixin.imgUrl,
              trigger: function trigger(res) {
                //alert('用户点击分享到QQ');
              },
              complete: function complete(res) {
                alert(JSON.stringify(res));
              },
              success: function success(res) {
                //alert('已分享');
              },
              cancel: function cancel(res) {
                //alert('已取消');
              },
              fail: function fail(res) {
                //alert(JSON.stringify(res));
              }
            });
          // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareWeibo({
              title: dataForWeixin.title,
              desc: dataForWeixin.desc,
              link: dataForWeixin.link,
              imgUrl: dataForWeixin.imgUrl,
              trigger: function trigger(res) {
                //alert('用户点击分享到微博');
              },
              complete: function complete(res) {
                // alert(JSON.stringify(res));
              },
              success: function success(res) {
                //alert('已分享');
              },
              cancel: function cancel(res) {
                // alert('已取消');
              },
              fail: function fail(res) {
              // alert(JSON.stringify(res));
              }
            });
        })
        wx.error(function (res) {
          console.log("微信验证失败", res);
        });
      }
    }).catch(error => {
      context.$toast(error.message);
    });

  }
}
