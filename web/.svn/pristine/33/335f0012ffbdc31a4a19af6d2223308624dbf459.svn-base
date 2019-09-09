<template>
    <div style="background: white;margin: 0 15px;">
      <div style="padding: 12px 16px;">
        <span class="titlecs">{{ orderItem.orgNames}}</span>
        <span class="state">{{ statusName }}</span>
      </div>

      <hr style="margin: 0px 16px;" class="full-line" size="1 ">

      <div style="padding: 12px 16px;height: 80px; position: relative;">
        <img width="80px" height="80px" :src="docImg" style="float: left">

        <div style="margin-left: 96px; position: absolute;top: 50%; transform: translateY(-50%)">
          <div>
            <span class="namecs">{{ orderItem.docName }}</span>
            <span class="titlecs" style="padding-left: 4px; font-weight: bold;">{{ deptName }}</span>
            <span class="titlecs" style="padding-left: 4px; font-weight: bold;">{{ orderItem.titlesName }}</span>
          </div>
          <div class="titlecs" style="margin-top: 10px;">{{ orderItem.subscribe_day }} {{ orderItem.subscribe_am | maText }}{{ orderItem.subscribe_work_time }}</div>
        </div>

      </div>

      <div class="money">¥{{ orderItem.price.value }}</div>

      <div style="display: inline-block;padding-top: 10px;padding-bottom: 10px;width: 100%">
        <button type="button" class="btn1" v-if="orderItem.status.value == '2'" @click.stop="documentDetail">诊疗详情</button>
        <button type="button" class="btn1" v-if="orderItem.status.value == '0'" @click.stop="cancelOrder">取消订单</button>
        <button type="button" class="btn1" v-if="orderItem.status.value == '5'" @click.stop="goPay">去支付</button>
      </div>

      <div style="height: 10px; background: #f7f7f7"></div>
    </div>
</template>

<script>
    import imgMap from '../../../static/js/imgmap.js';
    import * as types from '../../constant/ConstantConfig.js';
    export default {
        props: ['orderItem'],

        filters: {
          maText(subscribeMa) {
            if(subscribeMa.value == "0") return "上午";
            return '下午';
          }
        },

        computed: {
          docImg() {
            let imgUrl = imgMap.docMale;
            if (this.orderItem.photoUrl) {
              imgUrl = this.orderItem.photoUrl;
            } else {
              if(this.orderItem.gender) {
                let gender = this.orderItem.gender.value;
                if(gender == "0") {
                  imgUrl = imgMap.docFeMale;
                }
              }
            }
            return imgUrl;
          },
          statusName() {
            let status = this.orderItem.status.value;
            if(status == "0") return '待确认';
            if(status == "1") return '已预约';
            if(status == "2") return '已完成';
            if(status == "3") return '已过期';
            if(status == "4") return '已取消';
            if(status == "5") return '未付款';
            return '';
          },

          deptName() {
            if (this.orderItem.department && this.orderItem.department.value == types.COUNTRY_ALL_DEPART) {  //乡村全科
              if (this.orderItem.deptDesp) {
                return this.orderItem.deptDesp;
              } else {
                if (this.orderItem.departmentName) {
                  return this.orderItem.departmentName;
                }
              }
            } else {
              if (this.orderItem.departmentName) {
                return this.orderItem.departmentName;
              }
            }
            return '';
          }
        },
        methods: {
          createItem() {
            let item = {subscribeMa: this.orderItem.subscribe_am, date: this.orderItem.subscribe_day, price: this.orderItem.price,
              workTime: this.orderItem.subscribe_work_time};
            item.hospital = this.orderItem.hospital;
            item.userName = this.orderItem.docName;
            item.titlesName = this.orderItem.titlesName;
            item.department = this.orderItem.department;
            item.departmentName = this.orderItem.departmentName;
            item.deptDesp = this.orderItem.deptDesp;
            item.docid = this.orderItem.docid;
            item.orgId = this.orderItem.orgId;
            item.orderId = this.orderItem.orderid.value;
            item.subscribeName = this.orderItem.subscribeName;
            item.phone = this.orderItem.phone;
            item.status = this.orderItem.status.value;
            item.timeCreate = this.orderItem.timeCreate;
            return item;
          },

          goDetail() {
            sessionStorage.setItem("appointOrder", JSON.stringify(this.createItem()));
            this.$router.push("/appointOrderDetail");
          },

          //跳转诊疗详情
          documentDetail() {
            this.$router.push({path: "documentDetail", query: {orderId: this.orderItem.orderid.value}});
          },

          //取消订单
          cancelOrder() {
            let request = {orderId: this.orderItem.orderid.value, opType: 1};
            this.$emit("cancelOrder", request);
          },

          goPay() {
            const item = this.createItem();
            sessionStorage.setItem("appointItem", JSON.stringify(item));
            this.$router.push({path: "appointSubmit", query:{orderId: item.orderId}})
          }
        }
    }
</script>

<style scoped>

  .namecs{
    font-size:18px;
    font-weight:bold;
    color:#222222;
  }

  .titlecs{
    font-size:15px;
    font-weight:normal;
    color:#222222;
  }

  .money{
    font-size:15px;
    font-weight:bold;
    color: #222222;
    margin-right: 16px;
    float: right;
  }

  .btn1{
    border-radius: 4px;
    text-align: center;
    font-size:12px;
    font-weight: 400;
    color: rgba(0,147,255,1);
    border: 1px solid rgba(0,147,255,1);
    background-color:white;
    height: 29px;
    float: right;
    margin-right: 13px;
  }


  .state{
    font-size:15px;
    font-weight:bold;
    color:#FF4343;
    float: right;
  }

</style>
