<template>
    <div>
      <div v-html="newsDetail.htmlContent"></div>
    </div>
</template>

<script>
    export default {
        data() {
          return {
            newsDetail: {}
          }
        },

        created() {
          const newsDetail = sessionStorage.getItem("newsDetail");
          if(newsDetail) {
            this.newsDetail = JSON.parse(newsDetail);
          }
        }
    }
</script>

<style scoped>

</style>
