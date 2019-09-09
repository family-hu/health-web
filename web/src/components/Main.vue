<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="home">
          <home></home>
        </mt-tab-container-item>
        <mt-tab-container-item id="shopping">
          <!-- <shopping :orgId="orgId"></shopping> -->
        </mt-tab-container-item>
        <mt-tab-container-item id="group">
          <!-- <group :orgId="orgId"></group> -->
        </mt-tab-container-item>
        <mt-tab-container-item id="msg">
          <!-- <msg :orgId="orgId"></msg> -->
        </mt-tab-container-item>
        <mt-tab-container-item id="mine">
          <!-- <mine :orgId="orgId"></mine> -->
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed>
        <mt-tab-item id="home">
          <img slot="icon" :src="homeImg">
          首页
        </mt-tab-item>
        <mt-tab-item id="shopping">
          <img slot="icon" :src="shoppingImg">
          商城
        </mt-tab-item>
        <mt-tab-item id="group">
          <img slot="icon" :src="groupImg">
          小组
        </mt-tab-item>
        <mt-tab-item id="msg">
          <img slot="icon" :src="msgImg">
          消息
        </mt-tab-item>
        <mt-tab-item id="mine">
          <img slot="icon" :src="mineImg">
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
</template>

<script>
  import Home from '../components/home/Home.vue';
  import imgMap from '../../static/js/imgmap.js';
  import { mapGetters } from 'vuex';

    export default {
        name: 'Main',
        data() {
          return {
            selected: "home",
            orgId: this.$route.query.orgId, //this.$route.query.orgId
            focusEnter: true,//this.$route.query.focusEnter,
            orgNames: null,
          }
        },

      components:{
          home: Home,
      },

      computed: {
        ...mapGetters(['loginData', 'loginUrl']),
          homeImg() {
            if(this.selected == 'home') return imgMap.house_s;
            return imgMap.house_n;
          },
          shoppingImg() {
            if(this.selected == 'shopping') return imgMap.shopping_s;
            return imgMap.shopping_n;
          },
          groupImg() {
            if(this.selected == 'group') return imgMap.group_s;
            return imgMap.group_n;
          },
          msgImg() {
            if(this.selected == 'msg') return imgMap.msg_s;
            return imgMap.msg_n;
          },
          doctorImg() {
            return imgMap.doctor;
          },
          serviceImg() {
            return imgMap.service;
          },
          newsImg() {
            return imgMap.news;
          },
          mineImg() {
            if(this.selected == 'mine') return imgMap.my_s;
            return imgMap.my_n;
          },
      },

      methods: {

      },
      created() {
      },


    }
</script>

<style scoped>
  .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }
  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 55px;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
  }
  .mint-tabbar.is-fixed{
    box-shadow:0px 0px 14px 2px rgba(0,0,0,0.08);
  }
  .mint-tab-item-icon{
    width: 26px;
    height: 26px;
  }
  .mint-tabbar > .mint-tab-item{
    background: #fff;
  }
  .mint-tabbar > .mint-tab-item.is-selected{
    background: #fff;
    color: #0076FF
  }
  .mint-tab-item-label{
    font-size: 10px;
    color:rgba(4,11,28,.7);
  }
</style>
