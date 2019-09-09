<template>
    <div>
      <img class="img" :src="radioImg" @click="choseAnswer(answer)">
      <div class="text">{{ String.fromCharCode(65 + index) }} {{ answer.title }}</div>  <!--A--65 -->
      <div class="line"></div>
    </div>
</template>

<script>
  import imgMap from '../../../static/js/imgmap.js';
    export default {
        props: ['answer', "answerId", "index"],

        computed: {
          radioImg() {
            if(!this.answerId) return imgMap.choose;
            if(this.answerId == this.answer.panswId.value) return imgMap.chosen;
            return imgMap.choose;
          }
        },

        methods: {
          choseAnswer(item) {
            this.$emit('choseAnswer', item);
          }
        }
    }
</script>

<style scoped>

  .line{
    background-color: #CCCCCC;
    height: 1px;
    margin-top: 20px;
  }

  .img{
    width: 18px;
    height: 18px;
    float: right;
  }

  .text{
    font-size: 18px;
    color: #333333;
    line-height: 25px;
    padding-right: 40px;
  }

</style>
