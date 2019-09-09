<template>
    <div>
      <div style="background: white;">
        <div class="linecell">
          <span class="title">昵称</span>
          <input placeholder="请输入昵称" class="inputcs" v-model="request.nickName">
        </div>

        <div class="full-line"></div>

        <div class="linecell">
          <span class="title">真实姓名</span>
          <input placeholder="请输入您的真实姓名" class="inputcs" v-model="request.userName">
        </div>

        <div class="full-line"></div>

        <div class="linecell">
          <span class="title">性别</span>
          <img :src="grayArrow" class="imgr">
          <input placeholder="请选择性别" class="inputcs" readonly style="background-color: transparent" @click.stop="showSex = true" v-model="request.gender" >

        </div>
        <div class="full-line"></div>
        <div class="linecell">
          <span class="title">出生</span>
          <img :src="grayArrow" class="imgr">
          <input placeholder="请选择您的生日" class="inputcs" readonly style="background-color: transparent" @click.stop="openDatePicker" v-model="request.birth">
        </div>
        <div class="full-line"></div>
        <div class="linecell">
          <span class="title">手机号</span>
          <input placeholder="请输入手机号" class="inputcs" v-model="request.mobile">
        </div>

      </div>

      <button type="button" class="btn" @click="save">保存</button>
      <button type="button" class="btn1" @click="exit">退出登录</button>


      <mt-datetime-picker
        ref="datePicker"
        type="date"
        v-model="currentDate"
        year-format="{value}年"
        month-format="{value}月"
        date-format="{value}日"
        :startDate="startDate"
        @confirm="handleChange">
      </mt-datetime-picker>

      <mt-actionsheet :actions="sexs" v-model="showSex" cancel-text=""></mt-actionsheet>

    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import imgMap from '../../../static/js/imgmap.js';
    export default {
        data() {
           return {
             request: {userName: '', birth: "", mobile: '',  gender: ''},
             showSex: false,
             sexs: [],
           }
        },

        computed: {
          ...mapGetters(['loginData']),
          grayArrow() {
            return imgMap.arrowRight;
          },
          startDate() {
            return new Date(Date.parse("1910-01-01"));
          },
          currentDate: {
            get() {
              return new Date();
            },
            set(value) {

            }

          }
        },

        methods: {
          choseMale() {
            this.request.gender = '男';
          },

          choseFemale() {
            this.request.gender = '女';
          },

          handleChange(value) {
            this.request.birth = value.format("yyyy-MM-dd");
          },

          openDatePicker() {
            this.$refs.datePicker.open();
          },

          save() {
              if(this.request.gender) {
                if(this.request.gender == "男") {
                  this.request.gender = "1";
                } else if(this.request.gender == "女") {
                  this.request.gender = "0";
                }
              } else {
                this.request.gender = "-1";
              }
              this.$indicator.open();
              this.$store.dispatch("userUpdate", this.request).then(data => {
                if(this.request.gender) {
                  if(this.request.gender == "1") {
                    this.request.gender = "男";
                  } else if(this.request.gender == "0") {
                    this.request.gender = "女";
                  } else {
                    this.request.gender = "";
                  }
                } else {
                  this.request.gender = "";
                }
              }).catch(err => {
                this.$toast(err.message);
              }).finally(() => {
                this.$indicator.close();
              })
          },

          exit() {
            this.$store.commit("clearUser");
            this.$store.commit("clearCache");
            this.$router.replace({
              path: 'consultation',
              query: {orgId: this.$store.getters.getOrgId}
            })
          }

        },

        mounted() {
          this.sexs = [{
            name: '男',
            method: this.choseMale
          }, {
            name: '女',
            method: this.choseFemale
          }];
        },

      created() {
          const user = this.loginData.userObj;
          if(user) {
            this.request.userName = user.userName;
            this.request.nickName = user.nickName;
            this.request.birth = user.birth;
            this.request.mobile = user.mobile;
            if(user.gender.value == "1") {
              this.request.gender = "男";
            } else if(user.gender.value == "0") {
              this.request.gender = "女";
            }
          }
      }

    }
</script>

<style scoped>

  .linecell{
      padding: 16px;
  }

  .title{
    font-weight: 400;
    font-size: 16px;
    color: black;
  }
  .inputcs{
    float: right;
    text-align: right;
    font-size: 16px;
    color: black;
    border-width: 0; /* 边框宽度 */
    outline: none; /* 不显示轮廓线 */
  }
  .btn{
    font-size:20px;
    font-weight: 600;
    color: floralwhite;
    background-color: rgba(0,147,255,1);
    height: 44px;
    border-radius: 22px;
    margin-top: 25px;
    width: 90%;
    margin-left: 5%;
    border-width: 0; /* 边框宽度 */
    outline: none; /* 不显示轮廓线 */
  }
  .btn1{
    font-size:20px;
    font-weight: 600;
    background-color: white;
    height: 44px;
    margin-top: 10px;
    border:1px solid rgba(151,151,151,1);
    width: 90%;
    margin-left: 5%;
    color: #FF0000;
    outline: none; /* 不显示轮廓线 */
    border-radius: 22px;
  }

  .imgr{
    width: 10px;
    margin-top: 2px;
    float: right;
    margin-left: 4px;
  }
</style>
