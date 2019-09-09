<template>
    <div>
      <app-header title="家庭医生服务合同"></app-header>
      <div class="page-header-main">
        <iframe ref="iframe" :src="contUrl" frameborder="0" width="100%" class="sign" scrolling="no" id="iframe" ></iframe>
        <div class="to-sign">
          <div :style="{display: confirmDisplay}" class="confirm-sign">
            <mt-button size="large" type="primary" @click.native="confirm" style="">确认签名</mt-button>
          </div>
          <div :style="{width: signDivWidth}" class="sign-div">
            <mt-button size="large" type="primary" @click.native="goSign">{{ signText }}</mt-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Header from '../Header'
  import VueRoute from 'vue-router'
  import { routes } from '../../routes.js'
  export default {
      data() {
        return {
          signId: '',
          contUrl: '',
          img: ''
        }
      },
      components: {
        appHeader: Header
      },
    computed: {
      confirmDisplay() {
        if(this.img) return 'inline-block';
        return 'none';
      },
      signDivWidth() {
        if(this.img) return '48%';
        return '100%'
      },
      signText() {
        if(this.img) return '修改签名';
        return '去签名';
      }
    },
      methods: {
        // resetRouter () {
        //   const newRouter = new VueRoute({
        //     mode: 'history',
        //     routes
        //   });
        //   this.$router.matcher = newRouter.matcher // the relevant part
        // },
        goSign() {
          this.$router.push("/signature");
        },
        confirm() {
          //data:image/png;base64,
          const imgData = this.img.substring(22, this.img.length);
          const request = {
            signId: this.signId,
            signImg: imgData
          };
          this.$indicator.open();
          this.$store.dispatch("signImgCommit", request).then(data => {
            this.$router.replace({path: "success", query: {price: data.price}});
          }).catch(err => {
            this.$toast(err.message);
          }).finally(() => {
            this.$indicator.close();
          })
        },
        initImg() {
          if(sessionStorage.getItem("img")) {
            this.img = sessionStorage.getItem("img");
            this.$refs.iframe.contentWindow.postMessage(this.img,'*');
          }
        },
        changeFrameHeight() {
          this.$refs.iframe.height = document.documentElement.clientHeight * 2;
        }
      },
      created() {
        const params = sessionStorage.getItem("signData");
        if(params) {
          const data = JSON.parse(params);
          this.signId = data.signId.value;
          this.contUrl = data.contUrl;
        }
      },
      mounted() {
        let vm = this;
        let iframe = document.getElementById('iframe');
        if (iframe.attachEvent){
          iframe.attachEvent("onload", function() { // IE
            vm.initImg();
            vm.changeFrameHeight();
          });
        } else {
          iframe.onload = function(){ // 非IE
            vm.initImg();
            vm.changeFrameHeight();
          };
        }
      }
    }
</script>

<style scoped>

  .to-sign {
    position: fixed;
    background-color: #f7f7f7;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
  }

  .sign {
    position: absolute;
    left: 0;
    top: 40px;
    bottom: 0;;
  }

  .confirm-sign {
    box-sizing: border-box;
    width: 48%;
  }

  .sign-div {
    box-sizing: border-box;
    display: inline-block;
    float: right
  }

</style>
