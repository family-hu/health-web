<template>
  <div>

    <ul v-if="orderList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check="false">
      <consultation-order-item v-for="item in orderList" :orderItem="item" :key="item.porderId.value"></consultation-order-item>
    </ul>

    <div class="empty" v-if="orderList.length == 0">
      <img :src="consultationEmpty" width="150px" height="150px">
      <div style="font-size: 15px;margin-top: 10px">您还没有{{ state == '0' ? '未完成测试' : '已完成测评'}}</div>
      <button type="button" class="btn" @click="setSelected('home')">去看看</button>
    </div>

  </div>

</template>

<script>
    import ConsultationOrderItem from './ConsultationOrderItem.vue';
    import { mapGetters, mapMutations } from 'vuex'
    import imgMap from '../../../static/js/imgmap.js';
    export default {
        data() {
           return {
             orderList: [],
             loading: false,
             page: 1,
             loaded: false,   //是否加载完成
           }
        },

        props: ['state'],

        components: {
           consultationOrderItem: ConsultationOrderItem
        },

        watch: {
          'refreshState': function (newVal, oldVal) {
            if(newVal && !oldVal) {
              this.orderList = [];
              this.page = 1;
              this.orderListQuery();
              let vm = this;
              this.$nextTick(function () {
                vm.setRefreshOrder(false);
              });

            }
          },

          'refreshComment': function (newVal, oldVal) {
            this.refreshOrderComment(newVal);
          }

        },

        computed: {
          ...mapGetters(['loginData']),
          consultationEmpty() {
            return imgMap.consultationEmpty;
          },
          refreshState() {
            return this.$store.state.consultation.refreshOrder;
          },
          refreshComment() {
            return this.$store.state.consultation.comment;
          }
        },

        methods: {
          ...mapMutations(['setSelected', 'setRefreshOrder']),
          loadMore() {
            if (!this.loaded) {
              this.orderListQuery();
            }
          },

          refreshOrderComment(val) {
            for (let i = 0; i < this.orderList.length; i++) {
              let orderItem = this.orderList[i];
              if(orderItem.porderId.value == val.porderId) {
                 orderItem.pcomtId = val.pcomtId;
              }
            }
          },

          orderListQuery() {
            this.loading = true;
            const request = {orgId: this.$store.getters.getOrgId, pageNum:this.page, pageSize:10, userId: this.loginData.userObj.userId.value, state: this.state, sortby: "time_create desc"}; //
            this.$store.dispatch("orderListQuery", request).then((data) => {
              this.page++;
              if(data.dataList) {
                this.orderList = this.orderList.concat(data.dataList);
              }
              this.loaded = (this.orderList.length >= data.total);
              this.loading = false;
            }).catch(error => {
              this.loading = false;
              this.loaded = true;
              this.$toast(error.message);
            })
          },

          toDetail(item) {
            this.$router.push({
              path: "consultationDetail",
              query: {
                pevalId: item.pevalId.value
              }
            });
          },
        },

        created() {
          this.orderListQuery();
        }

    }
</script>

<style scoped>
  ul,li{ padding:0;list-style:none; margin: 0;}

  .empty {
    padding: 20px 40px;
    text-align: center;
  }

  .empty-div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    height: 100%;
  }

  .btn{
    font-size:20px;
    font-weight: 600;
    color: floralwhite;
    background-color: rgba(0,147,255,1);
    height: 44px;
    border-radius: 22px;
    margin-top: 30px;
    width: 70%;
    border-width: 0; /* 边框宽度 */
    outline: none; /* 不显示轮廓线 */
  }

</style>
