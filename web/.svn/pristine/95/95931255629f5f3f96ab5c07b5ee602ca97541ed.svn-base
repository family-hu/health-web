<template>
    <div>
      <ul v-if="orderList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check="false">
        <appoint-order-item ref="oItem" v-for="(item,index) in orderList" :key="index" :orderItem="item" @cancelOrder="cancelOrder" @click.native="goDetail(index)"></appoint-order-item>
      </ul>
      <div class="empty" v-if="orderList.length == 0">
        <img :src="consultationEmpty" width="144px" height="136px">
        <div style="font-size: 15px;margin-top: 10px;color:#b3b3b3">暂无此类订单</div>
    </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppointOrderItem from "./AppointOrderItem.vue";
import imgMap from '../../../static/js/imgmap.js';
export default {
  data() {
    return {
      orderList: [],
      loading: false,
      orgId: this.$route.query.orgId,
      page: 1,
      loaded: false //是否加载完成
    };
  },

  components: {
    appointOrderItem: AppointOrderItem
  },

  computed: {
    ...mapGetters(["loginData"]),
    consultationEmpty() {
      return imgMap.consultationEmpty;
    },
  },

  methods: {
    loadMore() {
      if (!this.loaded) {
        this.requestOrderList();
      }
    },

    goDetail(index) {
      this.$refs.oItem[index].goDetail();
    },

    cancelOrder(request) {
      let vm = this;
      this.$indicator.open();
      this.$store
        .dispatch("docorderstepop", request)
        .then(() => {
          this.$toast("取消成功");
          vm.updateOrderItem(request);
        })
        .catch(e => {
          this.$toast(e.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    },

    updateOrderItem(request) {
      for (let i = 0; i < this.orderList.length; i++) {
        let orderItem = this.orderList[i];
        if (orderItem.orderid.value == request.orderId) {
          orderItem.status.value = "4";
          break;
        }
      }
    },

    requestOrderList() {
      this.loading = true;
      let userId = this.loginData.userObj.userId.value;
      let request = {
        userid: userId,
        pageNum: this.page,
        pageSize: 10,
        orgId: this.orgId
      };
      let vm = this;
      this.$store
        .dispatch("userOderList", request)
        .then(data => {
          vm.page++;
          if (data.orderList) {
            for (let i = 0; i < data.orderList.length; i++) {
              vm.orderList.push(data.orderList[i]);
            }
          }
          vm.loaded = vm.orderList.length == data.total;
          vm.loading = false;
        })
        .catch(error => {
          vm.loading = false;
          vm.loaded = true;
          this.$toast(error.message);
        });
    }
  },

  created() {
    this.requestOrderList();
  }
};
</script>

<style scoped>
ul,
li {
  padding: 0;
  list-style: none;
  margin: 0;
}
.empty {
  padding: 50px 40px;
  text-align: center;
}
</style>
