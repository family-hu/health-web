<template>
    <div>
      <div style="padding: 10px;vertical-align: middle;background:rgba(240, 240, 240, 1);position: relative; ">

        <div style="position: absolute;right: 16px;text-align: center; vertical-align: middle">
          <button type="button" :disabled="!appointDateItem.isopen" class="yuyueBtn" @click.stop="submitData">{{ appointText }}</button>
          <div v-if="appointDateItem.isopen" style="padding: 0;margin-top: 4px;color: rgba(255,87,59,1);font-size: 12px"> 剩{{ appointDateItem.surplusNum.value }}个</div>
        </div>
        <div style="line-height: 25px">
          <span class="text" style="font-size: 14px">{{ appointDateItem.date }}&nbsp;&nbsp;{{ appointDateItem.weekName }}</span>
          <span class="daylab">{{ appointDateItem.surplusDay }}</span>
        </div>
        <div style="line-height: 25px">
          <span class="text" style="font-size: 13px;color: rgba(102,102,102,1)">{{ appointDateItem.workTime }}&nbsp;({{ appointDateItem.subscribeMa | maText }})</span>
          <span class="text" style="font-size: 13px;color: rgba(255,87,59,1);margin-left: 10px">{{ appointDateItem.price.value }}元</span>
        </div>
      </div>
      <hr class="full-line" align= center size="1">
    </div>
</template>

<script>
    export default {
        props: ['appointDateItem'],

        filters: {
          maText(subscribeMa) {
            if(subscribeMa.value == "0") return "上午";
            return '下午';
          }
        },

      computed: {
          appointText() {
            if(this.appointDateItem.isopen) return '预约';
            return '约满';
          }
      },

      methods: {
        submitData() {
          this.$emit("submitData")
        }
      }
    }
</script>

<style scoped>
  .text{
    font-weight: 300;
  }
  .daylab {
    padding: 0 5px;
    text-align: center;
    color: rgba(0, 147, 255, 1);
    font-weight: 200;
    font-size: 8px;
    border: 1px solid rgba(0, 147, 255, 1);
    border-radius: 8px;
    margin-left: 10px;

  }
  .yuyueBtn{
    color: white;
    width: 50px;
    height: 26px;
    border-radius: 13px;
    background-color: rgba(0, 147, 255, 1);
    font-size: 12px;
    font-weight: 300;
    border-width: 0; /* 边框宽度 */
    outline: none; /* 不显示轮廓线 */
  }

  button:disabled {
    background:rgba(179,179,179,1)
  }
</style>
