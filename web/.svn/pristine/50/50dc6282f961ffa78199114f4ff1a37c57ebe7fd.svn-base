<template>
  <div>
    <ul v-if="consultationList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check="false">
      <consultation-item v-for="item in consultationList" :key="item.pevalId.value" :consultationItem="item" @click.native="toDetail(item)"></consultation-item>
    </ul>

    <!--<div class="empty-div" >-->
      <div class="empty" v-if="consultationList.length == 0 && isFav">
        <img :src="consultationEmpty" width="150px" height="150px">
        <div style="font-size: 15px;margin-top: 10px">您还没有任何收藏</div>
        <button type="button" class="btn" @click="setSelected('home')">去看看</button>
      </div>
    <!--</div>-->

  </div>

</template>

<script>
    import ConsultationItem from './ConsultationItem.vue';
    import { mapGetters, mapMutations } from 'vuex';
    import imgMap from '../../../static/js/imgmap.js';
    export default {
        data() {
            return {
              sortBy: this.$route.query.sortBy,
              consultationList: [],
              loading: false,
              page: 1,
              loaded: false,   //是否加载完成
            }
        },

        props: {
          isFav: {
            default: 0
          }
        },

        components: {
          consultationItem: ConsultationItem
        },

        watch: {
          'refreshState': function (newVal, oldVal) {
            if(newVal && !oldVal && this.isFav) {
              this.consultationList = [];
              this.page = 1;
              this.evalListQuery();
              this.$nextTick(function () {
                this.setRefreshCollect(false);
              });

            }
          }

        },

        computed: {
          ...mapGetters(['loginData']),
          consultationEmpty() {
            return imgMap.consultationEmpty;
          },
          refreshState() {
            return this.$store.state.consultation.refreshCollect;
          },
        },

        methods: {
          ...mapMutations(['setSelected', 'setRefreshCollect']),
          loadMore() {
            if(!this.loaded) {
              this.evalListQuery();
            }
          },

          evalListQuery() {
               this.loading = true;
              let method = '';
              let request = '';
              if(this.isFav) {
                method = 'favoriteList';
                request = {pageNum:this.page, pageSize:10};
                if(this.loginData.userObj) {
                  request.userId = this.loginData.userObj.userId.value;
                }
              } else {
                request = {orgId: this.$store.getters.getOrgId, pageNum:this.page, pageSize:10};
                if(this.sortBy) {
                  request.sortby = this.sortBy + " desc";
                }
                method = 'evalListQuery';
              }
              this.$store.dispatch(method, request).then((data) => {
                this.page++;
                  if(data.dataList) {
                    this.consultationList = this.consultationList.concat(data.dataList);
                  }
                this.loaded = (this.consultationList.length >= data.total);
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
          this.evalListQuery();
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
