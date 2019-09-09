<template>
    <div>
      <app-header title="服务包详情"></app-header>
      <div class="page-header-main">
        <div style="padding: 16px">
          <span style="font-weight: bold; margin-right: 10px;">适宜对象:</span>{{ ptName }}
          <br>
          <br>
          <span style="font-weight: bold; margin-right: 10px;">价格:</span> <span style="color: #0093ff"> ￥{{ packInfo.price }}</span>
          <br>
          <br>
          <span style="font-weight: bold;">服务内容:</span>
          <br>
          <div v-html="packInfo.content"></div>
        </div>
      </div>
    </div>
</template>

<script>
  import Header from '../Header.vue';
    export default {
      data() {
        return {
          packInfo: null,
          ptName: this.$route.query.ptName
        }
      },
      components: {
        appHeader: Header
      },
      created() {
        const packdetail = sessionStorage.getItem("packdetail");
        if(packdetail) {
          this.packInfo = JSON.parse(packdetail);
        }
      }
    }
</script>

<style scoped>

</style>
