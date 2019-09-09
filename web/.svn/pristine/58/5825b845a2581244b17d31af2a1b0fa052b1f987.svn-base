<template>
    <div>
      <div style="height: 180px;position: relative;">
        <mt-swipe :auto="5000" @change="handleChange">
          <mt-swipe-item  v-for="ad in bannerEvalList" :key="ad.pevalId.value">
            <img :src="adImg(ad)" height="180px" width="100%" alt="" @click="toDetail(ad)">
          </mt-swipe-item>
        </mt-swipe>
        <div class="bottom">{{ title }}</div>
      </div>

      <div class="cell" style="padding-right: 0;">
        <div class="title">精选测试</div>
        <div class="slide-box" >
          <consultation-grid-item v-for="item in choiceEvalList" :key="item.pevalId.value" :consultationItem="item" @click.native="toDetail(item)"></consultation-grid-item>
        </div>
      </div>

      <div class="cell" style="padding-right: 0;">
        <div class="title" style="display: inline-block;">新品首发</div>
        <span class="btn" style="padding-right: 16px;" @click="toList('time_create')">更多</span>
        <div class="slide-box" >
          <consultation-grid-item v-for="item in newEvalList" :key="item.pevalId.value" :consultationItem="item" @click.native="toDetail(item)"></consultation-grid-item>
        </div>
      </div>

      <div class="cell" style="padding: 0;">
        <div class="title" style="display: inline-block;margin-left: 16px; margin-top: 16px;">推荐测试</div>
        <span class="btn" style="margin-right: 16px;margin-top: 16px;" @click="toList('order_count')">更多</span>
        <consultation-item v-for="item in recommendEvalList" :key="item.pevalId.value" :consultationItem="item" @click.native="toDetail(item)"></consultation-item>
      </div>

    </div>
</template>

<script>
    import ConsultationGridItem from './ConsultationGridItem.vue';
    import ConsultationItem from './ConsultationItem.vue';
    import imgMap from '../../../static/js/imgmap.js';
    export default {
        data() {
          return {
            orgId: this.$store.getters.getOrgId,
            bannerEvalList: [],   //广告
            choiceEvalList: [],  //精选
            newEvalList: [],  //首发新品
            recommendEvalList: [], //推荐测评
            title: ''
          }
        },

        components: {
           consultationGridItem: ConsultationGridItem,
           consultationItem: ConsultationItem
        },

        methods: {
            handleChange(index) {
              if(this.bannerEvalList && this.bannerEvalList.length > index) {
                this.title = this.bannerEvalList[index].title;
              }
            },

            adImg(item) {
              if(item.picWide) return item.picWide;
              return imgMap.consultationBigImg;
            },

            toList(value) {
                this.$router.push({
                  path: 'consultationList',
                  query: {sortBy: value}
                })
            },

            homePage() {
              const request = {orgId: this.$store.getters.getOrgId};
              this.$store.dispatch("homePage", request).then((data) => {
                if(data) {
                  this.bannerEvalList = data.bannerEvalList;
                  this.choiceEvalList = data.choiceEvalList;
                  this.newEvalList = data.newEvalList;
                  this.recommendEvalList = data.recommendEvalList;
                  if(this.bannerEvalList && this.bannerEvalList.length > 0) {
                    this.title = this.bannerEvalList[0].title;
                  }
                }
              }).catch(error => {
                this.$toast(error.message)
              })
            },

            toDetail(item) {
                this.$router.push({
                  path: "consultationDetail",
                  query: {
                    pevalId: item.pevalId.value
                  }
                });
            }
        },

        created() {
          this.homePage();
        }
    }
</script>

<style scoped>

  .cell {
     background: white;
     margin-top: 10px;
     padding: 16px;
  }

  .title{
    font-size: 18px;
    font-weight: bold;
    color: black;
  }

  .slide-box{
    overflow-x: scroll;
    /* 内容会被裁剪，会以滚动条显示 */
    overflow-y: hidden;  /* 超出内容不可见 */
    white-space: nowrap;  /* 不换行 */
    /* 文本不会换行，会在同一行上继续，直到遇到<br>为止 */
  }

  .btn{
    color: #666666;
    float: right;
    font-size: 13px;
  }

  .bottom {
    position: absolute;
    padding: 10px 0;
    bottom: 0;
    font-size: 16px;
    color: white;
    font-weight: 500;
    text-align: center;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.3);;
  }

</style>
