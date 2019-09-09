<template>
  <div>
    <div style="background: white; padding: 16px;position: relative;">
      <div class="box">
        <img :src="consultationImg" width="100px" height="100px">
        <span class="num">{{ consultationItem.orderCount.value }}人已测</span>
      </div>
      <div style="margin-left: 16px; display: inline-block;position: absolute;top: 50%; transform: translateY(-50%);">
        <span class="namecs">{{ consultationItem.title }}</span>
        <div class="textdiv">{{ consultationItem.introduce }}<br><br></div>
        <span class="name0">{{ consultationPrice }}</span>
        <span class="moneyold">¥{{ consultationPriceOld }}</span>
      </div>
    </div>

    <hr class="full-line" />

  </div>

</template>

<script>
  import imgMap from "../../../static/js/imgmap";
  export default {
    props: ['consultationItem'],
    computed: {
      consultationImg() {
        if(this.consultationItem.pic) return this.consultationItem.pic;
        return imgMap.consultationSmallImg;
      },

      consultationPrice() {
        let ifPay = this.consultationItem.ifPay.value;
        if(ifPay == '0') return '免费';
        return '¥' + this.consultationItem.price.value;
      },

      consultationPriceOld() {
        if(this.consultationItem.price1) return this.consultationItem.price1.value;
        return '';
      }

    }
  }
</script>

<style scoped>

  .box {
    width: 29%;
    position: relative;
    display: inline-block;
  }

  .box:before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .box img {
    position:  absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .num{
    position: absolute;
    color: #ffffff;
    font-size: 13px;
    font-weight: 300;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.8) 100%);
  }

  .namecs{
    font-size:18px;
    font-weight:bold;
    color:black;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .textdiv {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 7px 0;
    color: #666666;
    font-size: 14px;
  }

  .moneyold{
    font-size:15px;
    font-weight: 500;
    color:#999999;
    text-decoration: line-through;
  }

  .name0{
    font-size: 15px;
    font-weight: bold;
    color: red;
  }

</style>
