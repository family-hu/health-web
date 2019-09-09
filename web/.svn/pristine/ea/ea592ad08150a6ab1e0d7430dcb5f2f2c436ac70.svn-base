<template>
    <div class="cell">
      <div style="padding-top: 10px;text-align: center;">
        <span style="font-weight: 600;font-size: 16px;line-height: 30px;margin-top: 20px">预约单</span>
        <br>
        <span style="font-weight: 400;font-size: 15px;line-height: 20px">{{ appointItem.hospital }}</span>
      </div>
      <hr class="line01" align= center size="1 ">
      <hr class="line00" align= center size="1 ">
      <div style="display: inline-block;padding-top: 5px;width: 100%">
        <span class="lab">预约单号</span>
        <span class="lab1" >{{ appointItem.orderId }}</span>
      </div>
      <div style="display: inline-block;padding-top: 5px;width: 100%">
        <span class="lab">预约医生</span>
        <span class="lab1" >{{ appointItem.userName }}</span>
      </div>
      <div style="display: inline-block;padding-top: 5px;width: 100%">
        <span class="lab">就诊科室</span>
        <span class="lab1" >{{ departName }}</span>
      </div>
      <div style="display: inline-block;padding-top: 5px;width: 100%">
        <span class="lab">预约时间</span>
        <span class="lab1" >{{appointItem.date}} {{ appointItem.subscribeMa | maText }} {{ appointItem.workTime}}</span>
      </div>
      <div style="display: inline-block;padding-top: 5px;width: 100%">
        <span class="lab">就诊人</span>
        <span class="lab1" style="margin-left: 38px;" >{{ appointItem.subscribeName }}</span>
      </div>
      <div style="display: inline-block;padding-top: 5px;width: 100%">
        <span class="lab">手机号</span>
        <span class="lab1" style="margin-left: 38px;">{{ appointItem.phone }}</span>
      </div>
      <div style="display: inline-block;padding-top: 5px;width: 100%">
        <span class="lab">下单时间</span>
        <span class="lab1" >{{ appointItem.timeCreate }}</span>
      </div>
      <div style="display: inline-block;padding-top: 5px;width: 100%">
        <span class="lab">预约状态</span>
        <span class="lab1" >{{ statusName }}</span>
      </div>
      <div style="display: inline-block;padding-top: 5px;padding-bottom: 20px;width: 100%">
        <span class="lab">预约费用</span>
        <span class="lab1" style="color: red">{{ appointItem.price | losslessNumberValue }}元</span>
      </div>
    </div>
</template>

<script>
  import * as type from '../../constant/ConstantConfig.js'
  import { mapGetters } from 'vuex'
    export default {
      data() {
          return {
            appointItem: {},
            orderId: this.$route.query.orderId,
          }
      },
      filters: {
        maText(subscribeMa) {
          if(subscribeMa.value == "0") return "上午";
          return '下午';
        },
        losslessNumberValue(value) {
          if(value) return value.value;
          return '';
        }
      },

      computed: {
        ...mapGetters(['loginData']),
        departName() {
          let title = "";
          if (this.appointItem.department && this.appointItem.department.value == type.COUNTRY_ALL_DEPART) {  //乡村全科
            if (this.appointItem.deptDesp) {
              title = this.appointItem.deptDesp;
            } else {
              if (this.appointItem.departmentName) {
                title = this.appointItem.departmentName;
              }
            }
          } else {
            if (this.appointItem.departmentName) {
              title = this.appointItem.departmentName;
            }
          }
          return title;
        },
        statusName() {
          let status = this.appointItem.status;
          if(status == "0") return '待确认';
          if(status == "1") return '已预约';
          if(status == "2") return '已完成';
          if(status == "3") return '已过期';
          if(status == "4") return '已取消';
          if(status == "5") return '未付款';
          return '';
        },
      },

      methods: {
        controlData(data) {
          this.appointItem = data;
          this.appointItem.date = data.subscribe_day;
          this.appointItem.subscribeMa = data.subscribe_am;
          this.appointItem.userName = data.docName;
          this.appointItem.workTime = data.subscribe_work_time;
          this.appointItem.orderId = this.orderId;
        }
      },

      created() {
          const json = sessionStorage.getItem("appointOrder");
          if(json) {
            this.appointItem = JSON.parse(json);
            console.log(this.appointItem);
          } else {
            let vm = this;
            if(this.orderId) {
              let request = {orderId: this.orderId};
              this.$store.dispatch("userOderInfo", request).then((data) => {
                 vm.controlData(data);
              }).catch(error => {
                this.$toast(error.message);
              });
            }
          }
      }
    }
</script>

<style scoped>
  .cell{
    margin: 20px 16px 20px 16px;
    background-color: white;
    border-radius: 4px;
  }
  .line01{
    margin-top: 6px;
    margin-bottom: 1px;
    margin-left: 27px;
    margin-right: 27px;
    color: #B8B8B8;
  }
  .line00{
    margin-top: 1px;
    margin-left: 24px;
    margin-right: 24px;
    color: #B8B8B8;
  }
  .lab{
    margin-left: 30px;
    font-size: 14px;
    font-weight: 400;
    color: #B8B8B8;
  }
  .lab1{
    font-size: 14px;
    font-weight: 400;
    color: black;
    margin-left: 24px;
  }

</style>
