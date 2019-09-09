<template>
  <div>
    <app-header :showBack="false"></app-header>
    <div class="page-header-main">
      <br>
      <mt-cell title="签约团队" is-link @click.native="popupVisible = true">
        <span>{{ teamInfo.teamName }}</span>
      </mt-cell>
      <hr class="line">
      <mt-cell title="联系电话">
        <span>{{ teamInfo.tel }}</span>
      </mt-cell>
      <hr class="line">
      <mt-cell title="机构名称">
        <span>{{ teamInfo.orgNames }}</span>
      </mt-cell>
      <hr class="line">
      <mt-cell title="机构电话">
        <span>{{ teamInfo.orgTel }}</span>
      </mt-cell>
      <hr class="line">

      <div style="margin: 20px 16px 0 11px;">
        <mt-button type="primary" size="large" @click.native="next">下一步</mt-button>
      </div>

      <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
        <mt-picker :slots="dateSlots" @change="onChange" :visible-item-count="5" :show-toolbar="true">
          <div class="toolbar">
            <mt-button type="default" size="small" class="toolbar-left" @click.native="popupVisible = false">取消</mt-button>
            <mt-button type="default" size="small" class="toolbar-right" @click.native="confirm">确认</mt-button>
          </div>
        </mt-picker>
      </mt-popup>

    </div>
  </div>
</template>

<script>
  import Header from '../Header.vue';
  import * as type from '../../constant/ConstantConfig.js'
    export default {
      data() {
        return {
          popupVisible: false,
          dateSlots: [],
          values: [],
          teamInfo: {teamName: '', tel: "", orgNames: "", orgTel: ""},
          userId: this.$store.getters.loginData.userObj.userId.value,
          selectPosition: -1
        }
      },
      components: {
        appHeader: Header
      },
      methods: {
        //获取默认团队
        initDefaultTeam(teamList) {
          let maxSignNumber = 0;
          if (teamList != null && teamList.length > 0) {
            for (let i = 0; i < teamList.length; i++) {
              let tInfo = teamList[i];
              let leaderId = tInfo.leaderId.value;
              if (tInfo.numSign >= maxSignNumber) {
                maxSignNumber = tInfo.numSign;
                this.teamInfo = tInfo;
                this.selectPosition = i;
              }
              if (leaderId == this.userId) {
                this.teamInfo = tInfo;
                this.selectPosition = i;
                break;
              }
            }
          }
        },
        initValues(teamList) {
          let contents = [];
          if (teamList != null && teamList.length > 0) {
            for (let i = 0; i < teamList.length; i++) {
              let tInfo = teamList[i];
              contents[i] = tInfo.teamName;
            }
          }
          return contents;
        },
        onChange(picker, values) {
          const value = values[0];
          let position = this.values.indexOf(value);
          if (position >= 0) {
            this.selectPosition = position;
          }
        },
        confirm() {
          if (this.selectPosition >= 0) {
            this.teamInfo = this.$store.getters.teamData[this.selectPosition];
            this.popupVisible = false;
          }
        },
        next() {
          if (this.teamInfo.teamId) {
            const teamId = this.teamInfo.teamId.value;
            const registTp = this.$store.getters.userApp ? type.USER_TYPE_CUSTOM : this.getType(teamId);
            this.$router.push({path: "user", query: { orgId: this.teamInfo.orgId.value, teamId: teamId, registTp: registTp }})
          }
        },

        getType(teamId) {
          const teamList = this.$store.getters.teamData;
          if (teamList.length > 0) {
            for (let i = 0; i < teamList.length; i++) {
              const info = teamList[i];
              if (info.teamId.value == teamId) {
                const userList = info.userList;
                if (userList.length > 0) {
                  for (let j = 0; j < userList.length; j++) {
                    const user = userList[j];
                    if (user.userId.value == this.userId) {
                      return user.teamUserType.value;
                    }
                  }
                }
              }
            }
          }
          return 0;
        }
      },

      //获取团队数据
      created() {
          console.log("机构信息页面加载")
          const request = {
              userId: this.userId,
              pageNum: 1,
              pageSize: 100
          };
          this.$store.dispatch("teamListGet", request).then(() => {
              this.initDefaultTeam(this.$store.getters.teamData);
              this.values = this.initValues(this.$store.getters.teamData);
              this.dateSlots = [{
                flex: 1,
                className: "slot1",
                textAlign: 'center',
                values: this.values,
                defaultIndex: this.selectPosition
              }];
          }).catch(error => {
            this.$toast(error.message);
          });
      }
    }
</script>

<style scoped>

</style>
