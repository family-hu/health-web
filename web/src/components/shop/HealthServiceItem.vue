<template>
  <div v-if="healthServiceItem" class="list" @click="goodsDetail(healthServiceItem)">
    <img class="image" v-lazy.container="healthServiceItem.imagePath" :src="healthServiceItem.imagePath"/>
    <div class="flex-b">
      <div class="namecs">{{healthServiceItem.name}}</div>
      <!-- <div class="people">{{healthServiceItem.reservationNumber.value}}人已约</div> -->
    </div>
    <div class="flex-b">
      <div class="money">￥{{healthServiceItem.sellPrice.value}}</div>
      <div class="moneyold">￥{{healthServiceItem.crossLinePrice.value}}</div>
    </div>
  </div>

</template>

<script>
import * as types from "../../constant/ConstantConfig.js";
import imgMap from "../../../static/js/imgmap.js";

export default {
  props: {
    healthServiceItem: {},
    orgId: null,
    orgNames: null
  },

  computed: {},

  methods: {
    goodsDetail(healthServiceItem) {
      this.$router.push({
        path: "healthServiceDetail",
        query: {
          packDetailsId: healthServiceItem.packDetailsId.value,
          serviceCompanyId: healthServiceItem.serviceCompanyId.value,
          orgId: this.orgId,
          orgNames: this.orgNames
        }
      });
    }
  },

  created() {
    // console.log(this.adList,'==this.adList');
  }
};
</script>
<style>
  .list .image[lazy="loading"] {
    width: 40px;
    height: 122px;
    margin: 0 auto;
    color: #333;
  }
</style>
<style scoped>
.box {
  width: 44%;
  min-height: 122px;
}
.list {
  float: left;
  width: 44%;
  margin-left: 5%;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}
.list img {
  border-radius: 4px;
  width: 100%;
  height: 122px;
}
.namecs {
  width: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: #222222;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.money {
  font-size: 13px;
  font-weight: 500;
  color: #ff0000;
}

.moneyold {
  padding-left: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #7a8093;
  text-decoration: line-through;
}
.people {
  font-size: 11px;
  font-weight: 400;
  color: #7a8093;
}
</style>
