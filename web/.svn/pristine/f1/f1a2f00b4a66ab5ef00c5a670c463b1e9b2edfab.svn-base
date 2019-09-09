<template>
    <div>
      <a v-for="pack in packList" :key="pack.packId.value" class="mint-cell">
        <span class="mint-cell-mask" @click.stop="toDetail(pack)"></span>
        <label class="mint-cell-wrapper">
          <span class="mint-radio">
            <input
              class="mint-radio-input"
              type="checkbox"
              :value="pack.packId.value"
              @change="packChecked(pack, $event)"
            >
            <span class="mint-radio-core"></span>
          </span>
          <span class="mint-radio-label" v-text="pack.packName"></span>
          <span style="color: #0093ff; position: absolute; right: 30px;">￥{{ pack.price }}</span>
          <i class="mint-cell-allow-right"></i>
        </label>
      </a>
    </div>
</template>

<script>
    export default {
      props:['ptId', 'orgId', 'ptName'],
      data() {
        return {
          packList: [],
          userApp: this.$store.state.userApp
        }
      },
      methods: {
        controlData(packList) {
          if(packList.length > 0) {
            for (let i = 0; i < packList.length; i++) {
              let pack = packList[i];
              let price = Number.parseFloat(pack.price);
              if(price > 0) {
                packList.splice(i, 1);
                i--;
              }
            }
          }
          return packList;
        },
        packChecked(pack, event) {
          pack.checked = event.target.checked;
          this.$emit('packChecked', pack);
        },
        toDetail(packInfo) {
          const json = JSON.stringify(packInfo);
          sessionStorage.setItem("packdetail", json);
          this.$router.push({path: 'packdetail', query: {ptName: this.ptName}});
        }
      },
      created() {
        const request = {
          orgId: this.orgId,
          ptId: this.ptId
        };
        let vm = this;
        this.$store.dispatch("packList", request).then((packList) => {
          if(!vm.userApp) {  //医生端只能签免费的
            vm.packList = vm.controlData(packList);
          }
        }).catch(error => {
          this.$toast(error.message);
        });
      }
    }
</script>

<style scoped>

</style>
