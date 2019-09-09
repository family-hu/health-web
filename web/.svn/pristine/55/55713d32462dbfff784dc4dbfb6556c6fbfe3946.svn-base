<template>
    <div>
      <div style="position: fixed;left: 0; top: 0;z-index: 99;">
        <div style="height: 112px;position: relative;">
          <img :src="arrowImg" class="img" @click="goInfo">
          <img :src="userImg" class="icon" @click="goInfo">
          <span class="name" @click="goInfo">欢迎你，{{ userName }}</span>
          <img :src="mineBg" height="112px" width="100%">
        </div>

        <div style="height: 10px;background: #f7f7f7;"></div>

        <!--<mt-navbar v-model="selected" :fixed="true" style="margin-top: 122px;">-->
        <mt-navbar v-model="selected" v-if="isLogin">
          <mt-tab-item id="1">未完成</mt-tab-item>
          <mt-tab-item id="2">已完成</mt-tab-item>
          <mt-tab-item id="3">想测</mt-tab-item>
        </mt-navbar>

      </div>


      <!--<mt-tab-container v-model="selected" style="margin-top: 60px;">-->
      <mt-tab-container v-model="selected" style="margin-top: 172px;" v-if="isLogin">

        <mt-tab-container-item id="1">
          <consultation-order-list :state="0"></consultation-order-list>
        </mt-tab-container-item>

        <mt-tab-container-item id="2">
          <consultation-order-list :state="1"></consultation-order-list>
        </mt-tab-container-item>

        <mt-tab-container-item id="3">
          <consultation-list :isFav="1"></consultation-list>
        </mt-tab-container-item>

      </mt-tab-container>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import imgMap from '../../../static/js/imgmap.js';
    import ConsultationOrderList from './ConsultationOrderList.vue';
    import ConsultationList from './ConsultationList.vue';
    export default {
        data() {
          return {
            selected: "1"
          }
        },

        components: {
          consultationOrderList: ConsultationOrderList,
          consultationList: ConsultationList
        },

        computed: {
          ...mapGetters(['loginData']),
          userImg() {
            let imgUrl = imgMap.defaultAva;
            const userInfo = this.loginData.userObj;
            if(userInfo && userInfo.photoUrl) {
              imgUrl = userInfo.photoUrl;
            }
            return imgUrl;
          },
          userName() {
            const userInfo = this.loginData.userObj;
            if(userInfo) {
              if(userInfo.nickName) return userInfo.nickName;
              if(userInfo.userName) return userInfo.userName;
            }
            return '';
          },
          arrowImg() {
            return imgMap.arrowWhiteRight;
          },
          mineBg() {
            return imgMap.consultationMineBg;
          },

          isLogin() {
            return this.loginData.userObj;
          }

        },

        methods: {
          goInfo() {
            this.$router.push("/consultationUserInfo");
          }
        }
    }
</script>

<style scoped>

  .icon{
    width: 72px;
    height: 72px;
    border-radius: 50%;
    position: absolute;
    left: 20px;
    top: 20px;
  }

  .img{
    width: 17px;
    height: 17px;
    position: absolute;
    right: 20px;
    top: 48px;
  }

  .name{
    font-size: 18px;
    font-weight: 600;
    color: white;
    position: absolute;
    left: 107px;
    top: 44px;
  }

</style>
