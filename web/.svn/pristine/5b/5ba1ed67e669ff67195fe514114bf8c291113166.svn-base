<template>
    <div>
      <app-header></app-header>
      <div class="page-header-main">

        <div style="background-color: white">
          <app-person v-for="person in personList" :person="person" :key="person.ptId.value" :age="request.age" :sex="request.sexType" @checkedChange="updateCheck(person, $event)"></app-person>
        </div>

        <br>

        <mt-navbar v-model="selected">
          <mt-tab-item v-for="person in selectedPerson" :id="person.ptId.value" :key="person.ptId.value">{{ person.ptName }}</mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected" style="background-color: white; margin-bottom: 50px;">
          <mt-tab-container-item v-for="person in selectedPerson" :id="person.ptId.value" :key="person.ptId.value">
            <app-person-list :orgId="request.orgId" :ptId="person.ptId.value" :ptName="person.ptName" @packChecked="updatePackCheck(person, $event)"></app-person-list>
          </mt-tab-container-item>
        </mt-tab-container>

        <div class="bottom">
          <div class="chose-text">
            已选择:
            <span style="color: #0093ff">{{ selectedPacks | filter }}</span>
          </div>
          <button class="commit" @click="commit">提交</button>
        </div>

      </div>

      </div>

</template>

<script>
  import Person from './Person.vue';
  import PersonList from './PersonList.vue';
  import Header from '../Header.vue'
  import * as type from '../../constant/ConstantConfig.js'
    export default {
      data() {
        return {
          request: {},
          selected: '',
          selectedPerson: [],
          selectedPacks: [],
          personList: []
        }
      },
      components: {
        appPerson: Person,
        appPersonList: PersonList,
        appHeader: Header
      },

      created() {
        let vm = this;
        this.$store.dispatch("personList", {}).then((personList) => {
          vm.personList = personList;
        }).catch(error => {
          this.$toast(error.message);
        });
        this.initParams();
      },
      activated() {
        this.initParams();
      },

      methods: {
        //人群组件增删更新
        updateCheck(person, event) {
          let checked = event.target.checked;
          if(checked) {
             this.selectedPerson.push(person);
          } else {
            for (let i = 0; i < this.selectedPerson.length; i++) {
              const selectPerson = this.selectedPerson[i];
              if(selectPerson.ptId.value == person.ptId.value) {
                if(this.selected == person.ptId.value) {
                  this.selected = "";
                }
                this.selectedPerson.splice(i, 1);
                this.removePacks(person.ptId.value);
                break;
              }
            }
          }
        },
        //服务包组件增删更新
        updatePackCheck(person, pack) {
          pack.ptName = person.ptName;
          pack.ptId = person.ptId.value;
          if(pack.checked) {
            this.selectedPacks.push(pack);
          } else {
            for (let i = 0; i < this.selectedPacks.length; i++) {
              const selectPack = this.selectedPacks[i];
              if(selectPack.packId.value == pack.packId.value) {
                this.selectedPacks.splice(i, 1);
                break;
              }
            }
          }
        },
        //人群组件删除人群时删除对应人群选择的服务包
        removePacks(ptId) {
          for (let i = 0; i < this.selectedPacks.length; i++) {
            const pack = this.selectedPacks[i];
            if(ptId == pack.ptId) {
              this.selectedPacks.splice(i, 1);
              i--;
            }
          }
        },
        //初始化前页面传递进来的request
        initParams() {
          const params = sessionStorage.getItem("params");
          if(params) {
            this.request = JSON.parse(params);
            if(this.request.sex == '男') {
              this.request.sexType = type.MALE;
            } else {
              this.request.sexType = type.FEMALE;
            }
          }
          console.log(params);
        },
        //获取选择的服务包id列表
        getSelectIds() {
          const packIds = [];
          for (let i = 0; i < this.selectedPacks.length; i++) {
            let pack = this.selectedPacks[i];
            packIds[i] = pack.packId.value;
          }
          return packIds;
        },
        //提交，下一步
        commit() {
          if(this.selectedPacks.length == 0) {
            this.$toast("请选择服务包");
            return;
          }
          this.request.packIds = this.getSelectIds();
          this.$indicator.open();
          this.$store.dispatch("signAdd", this.request).then((data) => {
            const params = JSON.stringify(data);
            sessionStorage.setItem("signData", params);
            sessionStorage.removeItem("img");
            this.$router.replace("sign");
          }).catch(err => {
              this.$toast(err.message);
          }).finally(() => {
              this.$indicator.close();
          });
        }
      },
      //过滤器
      filters: {
        filter(dataList) {
          if(dataList.length > 0) {
            const values = [];
            for (let i = 0; i < dataList.length; i++) {
              const pack = dataList[i];
              values[i] = pack.ptName + pack.packName;
            }
            return values.join(",");
          }
          return '';
        }
      }
    }
</script>

<style scoped>

    .bottom {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: white;
      font-size: 13px;
    }

  .commit {
    background-color: #0093ff;
    padding: 0;
    margin: 0;
    border: 0;
    color: white;
    width: 50px;
    height: 50px;
    position: fixed;
    right: 0;
    bottom: 0;
  }

  .chose-text {
    padding-left: 16px;
    display: inline-block;
    padding-right: 60px;
    width: auto;
    height: 50px;
    line-height: 50px;
  }

</style>
