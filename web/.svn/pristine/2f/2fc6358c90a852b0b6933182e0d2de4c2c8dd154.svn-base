<template>
    <div>
      <div style="line-height: 50px;background: white; position: relative;">
        <span style="padding-left: 10px;font-size:14px; font-weight: bold; ">{{ appointItem.hospital }}</span>
        <img class="imgR" :src="arrowDown" @click="expand = !expand" :width="width" :height="height">
      </div>
      <hr class="full-line" align= center  size="1 ">
      <appoint-date-item v-for="(item, index) in appointItem.setList" :key="index" :appointDateItem="item" v-if="expand" @submitData="submitOrder(item)"></appoint-date-item>
    </div>
</template>

<script>
    import AppointDateItem from './AppointDateItem.vue';
    import imgMap from '../../../static/js/imgmap.js';
    export default {
        data() {
          return {
            expand: true
          }
        },
        props: ['appointItem', 'docInfo'],
        components: {
          appointDateItem: AppointDateItem,
        },
        methods: {
          submitOrder(item) {
              item.hospital = this.appointItem.hospital;
              item.userName = this.docInfo.userName;
              item.titlesName = this.docInfo.titlesName;
              item.department = this.docInfo.department;
              item.departmentName = this.docInfo.departmentName;
              item.deptDesp = this.docInfo.deptDesp;
              item.docid = this.docInfo.docId;
              item.orgId = this.docInfo.orgId;
              sessionStorage.setItem("appointItem", JSON.stringify(item));
              this.$router.push("/appointSubmit")
          }
        },
        computed: {
          arrowDown() {
            if(this.expand) return imgMap.arrowDown;
            return imgMap.arrowR;
          },

          width() {
            if(this.expand) return '12px;'
          },

          height() {
            if(!this.expand) return '12px;'
          }
        }
    }
</script>

<style scoped>
  .imgR{
    position: absolute;
    right: 16px;
    margin: auto 0;
    top: 0;
    bottom: 0;
  }


</style>
