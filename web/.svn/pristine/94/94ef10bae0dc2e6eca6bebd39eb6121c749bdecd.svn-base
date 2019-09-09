<template>
  <div style="background: white;">

    <div style="text-align: center; padding-top: 20px;">
      <div class="text">{{ score }}</div>
      <el-rate v-model="score" disabled text-color="#ff9900" score-template="{value}" allow-half style="margin-top: 10px;"></el-rate>
      <div class="num">（{{ totalMem }}人评价）</div>
    </div>
    <div style="padding-left: 16px; padding-bottom: 16px;">
      <span class="jibing" v-for="key in keywords">{{ key[0] }}&nbsp;&nbsp;{{ key[1] }}</span>
    </div>

    <hr class="full-line" />

    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
      <consultation-eva-item v-for="item in evaList" :key="item.pcomtId.value" :evaItem="item" ></consultation-eva-item>
    </ul>
  </div>
</template>

<script>
  import ConsultationEvaItem from './ConsultationEvaItem.vue';
    export default {
      data() {
        return {
          pevalId: this.$route.query.pevalId,
          evaList: [],
          keywords: [],
          loading: false,
          page: 1,
          loaded: false,   //是否加载完成
          score: 0,
          totalMem: ''
        }
      },
      components: {
        consultationEvaItem: ConsultationEvaItem
      },


      methods:{
        loadMore() {
          if(!this.loaded) {
            this.requestEvaList();
          }
        },

        requestEvaList() {
          this.loading = true;
          const request = {
            pageNum: this.page,
            pageSize: this.pageSize,
            pevalId: this.pevalId
          };
          this.$store.dispatch("commentList", request).then((data) => {
            this.keywords = data.keywords;
            this.score = data.score;
            this.totalMem = data.totalMem;
            this.page++;
            if(data.dataList) {
              for(let i = 0; i < data.dataList.length; i++) {
                this.evaList.push(data.dataList[i]);
              }
            }
            this.loaded = (this.evaList.length == data.total);
            this.loading = false;
          }).catch(error => {
            this.loading = false;
            this.loaded = true;
            this.$toast(error.message);
          });
        }
      },
      created() {
        this.requestEvaList();
      }
    }
</script>

<style scoped>
  ul,li{ padding:0;list-style:none; margin: 0}

  .jibing{
    display: inline-block;
    font-size: 14px;
    padding: 0 9px;
    text-align: center;
    margin-right: 16px;
    border: 1px solid #cccccc;
    line-height: 30px;
    color: #222222;
    white-space:nowrap;
    margin-top: 16px;
  }

  .text{
    color: #0093FF;
    font-size: 16px;
    font-weight: 600;
  }

  .num{
    color: #999999;
    font-size: 14px;
    line-height: 20px;
    padding-top: 11px;

  }


</style>
