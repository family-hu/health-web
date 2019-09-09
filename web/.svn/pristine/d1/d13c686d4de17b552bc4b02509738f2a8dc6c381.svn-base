<template>
    <div class="item">
      <div class="box" style="position: relative;">
        <img :src="consultationImg">
        <span class="num">{{ consultationItem.orderCount.value }}人已测</span>
      </div>

      <div class="name">{{ consultationItem.title }}</div>
      <div class="name0">{{ consultationPrice }}</div>
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
          }

        }
    }
</script>

<style scoped>

  .item{
    width: 29%;
    text-align: left;
    display: inline-block;
    margin-top: 16px;
    margin-right: 10px;
  }

  .box {
    width: 100%;
    position: relative;
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

  .name{
    color: black;
    font-size: 14px;
    font-weight: bold;
    margin-top: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
    height: 40px;
  }

  .name0{
    font-size: 14px;
    font-weight: 600;
    color: red;
    line-height: 25px;
  }

  .num{
    position: absolute;
    color: #ffffff;
    font-size: 13px;
    font-weight: 300;
    line-height: 20px;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.8) 100%);
  }

</style>
