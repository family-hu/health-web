<template>
    <div style="display: inline-block">
      <div style="margin-left: 16px;margin-top: 10px;width: 100px;text-align: center">
        <img width="100px" height="100px" :src="docImg">
        <span class="name">{{ doctorDetail.userName | textFilter }}</span><br>
        <span class="name0">{{ doctorDetail.titlesName | textFilter }}</span>
      </div>
    </div>
</template>

<script>
  import imgMap from '../../../static/js/imgmap.js';
    export default {
        props: {
          doctorDetail: {}
        },

        filters: {
          textFilter(value) {
            if(!value) return '-';
            return value;
          }
        },

        computed: {
          docImg() {
            let imgUrl = imgMap.docRectMale;
            if(this.doctorDetail.photoUrl) {
              imgUrl = this.doctorDetail.photoUrl;
            } else {
              let gender = this.doctorDetail.gender.value;
              if(gender == "0") {
                imgUrl = imgMap.docRectFeMale;
              }
            }
            return imgUrl;
          }
      }
    }
</script>

<style scoped>
  .name{
    color: #222222;
    font-size: 16px;
    font-weight: bold;
    line-height: 25px;
  }
  .name0{
    font-size: 13px;
    font-weight: 400;
    color: #999999;
    line-height: 25px;
  }
</style>
