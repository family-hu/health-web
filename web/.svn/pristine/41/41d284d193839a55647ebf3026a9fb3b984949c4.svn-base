<template>
    <div>
      <div class="cell">
        <img :src="consultationImg" width="100px" height="100px;">
        <div style="padding-left: 120px;position: absolute;top: 20px">
          <div class="namecs">{{ orderItem.title }}</div>

          <span class="name0">{{ consultationPrice }}</span>
          <span class="moneyold">¥{{ consultationPriceOld }}</span>

        </div>
        <div class="time">{{ time }}</div>

      </div>
      <div style="background-color: white;height: 48px;padding-left:20px ;padding-right: 20px">
        <div class="full-line"></div>
        <button type="button" class="btn" v-if="orderItem.state.value == '1'" @click="goReport">查看报告</button>
        <button type="button" class="btn1" v-if="orderItem.state.value == '1' && !orderItem.pcomtId" @click="goComment">去评价</button>
        <button type="button" class="btn" v-if="orderItem.state.value == '0'" @click="goTest">去测试</button>
      </div>

      <div style="height: 10px;"></div>

    </div>
</template>

<script>
  import imgMap from "../../../static/js/imgmap";
    export default {
        props: ['orderItem'],

        computed: {
          consultationImg() {
            if(this.orderItem.pic) return this.orderItem.pic;
            return imgMap.consultationSmallImg;
          },

          consultationPrice() {
            let ifPay = this.orderItem.ifPay.value;
            if(ifPay == '0') return '免费';
            return '¥' + this.orderItem.price.value;
          },

          consultationPriceOld() {
            if(this.orderItem.price1) return this.orderItem.price1.value;
            return '';
          },

          time() {
            if(this.orderItem.state.value == '1') {
              return '完成时间：' + this.orderItem.timeDone;
            } else {
              return '购买时间：' + this.orderItem.timeCreate;
            }
          }

        },

        methods: {
          goTest() {
              this.$router.push({
                path: "consultationTest",
                query: {
                  pevalId: this.orderItem.pevalId.value,
                  porderId: this.orderItem.porderId.value,
                }
              });
          },

          goReport() {
            this.$router.push({
              path: "consultationResult",
              query: {
                prepId: this.orderItem.prepId.value,
                porderId: this.orderItem.porderId.value,
                pevalId: this.orderItem.pevalId.value
              }
            })
          },

          goComment() {
            this.$router.push({
              path: "consultationCommentAdd",
              query: {
                pevalId: this.orderItem.pevalId.value,
                porderId: this.orderItem.porderId.value,
              }
            });
          }
        }
    }
</script>

<style scoped>

  .cell{
    background-color:white;
    padding: 20px 20px 16px 20px;
    position: relative;
  }

  .moneyold{
    padding-left: 10px;
    font-size:15px;
    font-weight:600;
    color:#999999;
    line-height:33px;
    text-decoration: line-through;
  }

  .namecs{
    font-size:18px;
    font-weight:600;
    color:rgba(34,34,34,1);
    line-height:25px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .name0{
    font-size: 16px;
    font-weight: 600;
    color: red;
    line-height: 35px;
  }

  .time{
    font-size: 14px;
    font-weight: 600;
    line-height: 30px;
    position: absolute;
    bottom: 20px;
    padding-left: 120px;
  }

  .btn{
    font-size:15px;
    font-weight: 600;
    color: floralwhite;
    background-color: rgba(0,147,255,1);
    height: 28px;
    float: right;
    margin-top: 10px;
    padding: 0 10px;
    border-width: 0; /* 边框宽度 */
    outline: none; /* 不显示轮廓线 */
    border-radius: 22px;
  }

  .btn1{
    font-size:15px;
    font-weight: 600;
    background-color: white;
    height: 28px;
    float: right;
    padding: 0 10px;
    margin-top: 10px;
    border:1px solid rgba(0,147,255,1);
    margin-right: 12px; ;
    color: rgba(0,147,255,1);
    outline: none; /* 不显示轮廓线 */
    border-radius: 22px;
  }

</style>
