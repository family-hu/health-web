<template>
    <div class="page-popup">
      <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="mint-popup-1">
        <span style="font-size: 16px;font-weight:500;text-align: center;display:block;">预约规则</span>

        <span class="lab">·预约订单支付成功后，需医生确认接单才生效，医生可选择接单和拒单；</span>
        <br>
        <span class="lab">·预约成功后，请按照预约信息按时前往医生坐诊医院就诊；如在预约时段内未前往就诊，则订单过期作废；</span>
        <br>
        <span class="lab">·医生接单前，用户可自主选择取消此次预约；</span>
        <br>
        <span class="lab">·订单预约成功后不可退订，请合理分配时间下单。</span>
        <br>
        <button type="button" class="btn" @click="popupVisible = false">知道了</button>
      </mt-popup>

      <div class="bgm">
        <img :src="appointBg" alt="" style="position: absolute; left: 0;" width="100%">
        <img class="photo" :src="docImg">
        <img  class="ruleBtn" :src="rulePhoto" @click="popupVisible = !popupVisible">
        <p class="wlab" style="font-size: 14px">{{ doctorName }}</p>
        <p class="wlab" style="font-size: 12px">{{ doctorTitle }}</p>
        <p class="wlab" style="font-size: 12px; margin-top:0px;">{{ docInfo.orgNames }} &nbsp;&nbsp;{{ docInfo.entTypeName }}</p>
      </div>

      <div style="background: white; padding: 10px;position: relative;">
        <div class="blab"><strong>擅长：</strong>{{ docInfo.despSkill }}</div>
        <div class="blab" style="margin-top: 6px;"><strong>简介：</strong>{{ docInfo.despPerson }}</div>
      </div>

      <div style="background:rgba(240, 240, 240, 1);padding: 10px;font-size: 12px;color: rgba(179, 179, 179, 1);font-weight: 300">执业地点</div>

      <appoint-item v-for="(item, index) in appoints" :key="index" :appointItem="item" :docInfo="docInfo"></appoint-item>

    </div>
</template>

<script>
  import imgMap from '../../../static/js/imgmap.js';
  import * as type from '../../constant/ConstantConfig.js'
  import AppointItem from './AppointItem.vue';
    export default {
        data() {
          return {
            docInfo: {},
            appoints:[],
            popupVisible: false,
          }
        },
      components:{
        appointItem: AppointItem,
      },
        computed: {
          appointBg() {
            return imgMap.appointBg;
          },
          rulePhoto() {
            return imgMap.rulePhoto;
          },
          doctorName() {
            if(this.docInfo.userName) return this.docInfo.userName;
            return ''
          },
          doctorTitle() {
            let title = "";
            if (this.docInfo.department && this.docInfo.department.value == type.COUNTRY_ALL_DEPART) {  //乡村全科
              if (this.docInfo.deptDesp) {
                title += this.docInfo.deptDesp;
              } else {
                if (this.docInfo.departmentName) {
                  title += this.docInfo.departmentName;
                }
              }
            } else {
              if (this.docInfo.departmentName) {
                title += this.docInfo.departmentName;
              }
            }
            if(this.docInfo.titlesName) {
              title += (" | " + this.docInfo.titlesName);
            }
            return title;
          },
          docImg() {
            let imgUrl = imgMap.docRectMale;
            if(this.docInfo.photoUrl) {
              imgUrl = this.docInfo.photoUrl;
            } else {
              if(this.docInfo.gender) {
                let gender = this.docInfo.gender.value;
                if(gender == "0") {
                  imgUrl = imgMap.docRectFeMale;
                }
              }
            }
            return imgUrl;
          },
        },

        created() {
          let vm = this;
          let drId = this.$route.query.userId;
          this.$store.dispatch("subscribeDocInfo", {docid: drId}).then((docInfo) => {
            if (docInfo) {
              vm.docInfo = docInfo;
              if(docInfo.dataList) {
                vm.appoints = docInfo.dataList;
              }
            }
          }).catch(error => {
            this.$toast(error.message);
          });
        }
    }
</script>

<style scoped>
  .bgm{
    width: 100%;
    height: 180px;
    text-align: center;
    position: relative;
  }

  .mint-popup-1{
    border-radius: 10px;
    width: 260px;
    height: 260px;
    padding: 10px;
    transform: translate(-50%,-50%);
  }

  .mint-popup-1::before {
    content: '';
    position: absolute;
    top: -20px;
    right: 50px;
  }

  .lab{
    font-weight: 400;
    font-size: 12px;
    float: left;
    padding-top: 10px;
  }
  .btn{
    border-radius: 20px;
    text-align: center;
    font-size:12px;
    font-weight: 300;
    color: floralwhite;
    background-color: rgba(0,147,255,1);
    height: 40px;
    margin: 15px 10%;
    margin-bottom: 5px;
    width: 80%;
    border-width: 0px; /* 边框宽度 */
    outline: none; /* 不显示轮廓线 */
  }

  .wlab{
    color: white;
    font-weight:300;
    margin-top: 8px;
    margin-bottom: 0px;
    position: relative;
  }
  .blab {
    color: rgba(34, 34, 34, 1);
    font-size: 13px;
    font-weight:300;
  }
  .photo{
    width: 52px;
    height: 52px;
    background-color: red;
    margin-top: 30px;
    border-radius: 26px;
    position: relative;

  }
  .ruleBtn{
    width: 76px;
    height: 35px;
    margin-top: 66px;
    position: absolute;
    right: 0;
  }

</style>
