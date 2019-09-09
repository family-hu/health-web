<template>
    <div>
      <mt-field :placeholder="isUserApp | accountLabel" type="text" v-model="account" @input.native="change($event, 1)"></mt-field>
      <!--<hr class="full-line">-->
      <mt-field placeholder="请输入密码" type="password" v-model="pwd" @input.native="change($event, 2)"></mt-field>
      <hr class="full-line">

      <div style="margin: 30px 16px 16px 16px">
        <mt-button size="large" type="primary" @click.native="login" :disabled="disable">登录</mt-button>
        <div v-if="!isUserApp" style="margin-top: 16px; text-align: center">如忘记了帐号密码，请尝试&nbsp;<a @click="updatePhoneFragment(true)" style="color: #0093ff">手机号登录</a></div>
      </div>

    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { hex_md5 } from '../../assets/md5.js'
  import * as constant from '../../constant/ConstantConfig.js'
    export default {
        data() {
          return {
            account: '',
            pwd: '',
            disable: true
          }
        },
      computed: {
        ...mapGetters(['isUserApp', 'sysType'])
      },

      filters: {
        accountLabel: (value) => {
          if(value) return '请输入帐号';
          return '医联邦帐号 / 手机号'
        }
      },
      // ...mapActions(["decrement"]),
      // ...mapActions({
      //   add: "increment"
      // })

      methods: {
        ...mapActions(['updatePhoneFragment']),
          login() {
            let pwdMd5 = hex_md5(this.pwd + constant.SUFFIX).toLocaleUpperCase();
            const request = {
              account: this.account,
              pwd: pwdMd5,
              loginType: constant.LOGIN_TYPE_ACCOUNT,
              sysType: this.$store.state.sysType
            };
          // this.$emit("login", request);
            this.$store.dispatch('appLogin', request).then(data => {
              if(data.rtnCode == '1'){
                this.$toast('登录成功');
                //focusHospitalList  doctorConsultation
                this.$router.push({
                  path: "focusHospitalList"
                });
              }else{
                this.$toast(data.rtnMsg);
              }

            }).catch(e => {
              this.$toast(e.message);
            }).finally(() => {
              this.$indicator.close();
            });

          },
          change(value,type) {
            if(type == 1) {
              this.account = value.target.value;
            } else if(type == 2) {
              this.pwd = value.target.value;
            }
            this.disable = !this.account || !this.pwd;
          }
      }
    }
</script>

<style scoped>

</style>
