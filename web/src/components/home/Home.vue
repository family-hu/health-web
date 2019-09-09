<template>
    <div class="mian_box">
      <health-service-item v-for="(item , index) in serviceList" :key="index" :healthServiceItem="item"></health-service-item>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import imgMap from "../../../static/js/imgmap.js";
import HealthServiceItem from "../shop/HealthServiceItem.vue";
export default {
  data() {
    return {
      serviceList:[],
      orgId:'1087171373522001920'
    };
  },

  components: {
    healthServiceItem: HealthServiceItem,
  },


  computed: {
    ...mapGetters(["loginData"]),
  },



  methods: {
    //健康服务--套餐列表
    getPackagesList() {
      this.$indicator.open();
      let vm = this;
      const request = {
        pageParam: {
          pageSize: 10,
          pageNum: this.page
        },
        packages: {
          orgId: '933916890231775232',
        },
        sortType: "sales", //排序类型
      };
      this.$store
        .dispatch("packagesList", request)
        .then(data => {
          if (data.data) {
            this.serviceList = data.data.list;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    },


  },

  created() {
    this.getPackagesList(); //健康服务
    if(this.orgId){
      localStorage.setItem('orgId',this.orgId);
    }
  },

};
</script>

<style scoped>
  .mian_box{
    overflow: hidden;
    margin-left: -4%;
    padding: 16px;
  }
</style>
