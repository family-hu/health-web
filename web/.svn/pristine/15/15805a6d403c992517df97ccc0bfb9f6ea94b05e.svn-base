<template>
  <div>
    <app-header></app-header>
    <div class="page-header-main">
      <br>
      <div style="background-color: white; padding: 10px;">
        <label class="mint-radiolist-label" v-for="item in options" style="display: inline-block">
        <span class="mint-radio">
          <input
            class="mint-radio-input"
            type="radio"
            v-model="option"
            :value="item"
          >
          <span class="mint-radio-core"></span>
        </span>
          <span class="mint-radio-label" v-text="item"></span>
        </label>
      </div>

      <h4 style="margin-left: 10px">签约人信息</h4>

      <mt-field label="身份证号" placeholder="请输入您的身份证号" v-model="idcard" @input.native="cardListener($event)"></mt-field>
      <mt-field label="姓名" placeholder="请输入您的姓名" v-model="name"></mt-field>
      <mt-cell class="mint-field" title="性别">
        <span class="mint-field-core">{{ sex }}</span>
      </mt-cell>
      <mt-cell class="mint-field" title="年龄">
        <span class="mint-field-core">{{ age }}</span>
      </mt-cell>
      <mt-cell class="mint-field" title="民族" is-link @click.native="showDialog(1)">
        <span class="mint-field-core">{{ nation }}</span>
      </mt-cell>

      <br v-show="option != '未成年人'">

      <div v-show="option == '未成年人'">
        <h4 style="margin-left: 10px">监护人信息</h4>
        <mt-field label="身份证号" placeholder="请输入监护人的身份证号" v-model="guardianIdcard"></mt-field>
        <mt-field label="姓名" placeholder="请输入监护人的姓名" v-model="guardianName"></mt-field>
        <mt-cell class="mint-field" title="关系" is-link @click.native="showDialog(2)">
          <span style="color: gray" v-if="relationId == 0">请选择您与签约人的关系</span>
          <span class="mint-field-core">{{ relation }}</span>
        </mt-cell>
      </div>

      <mt-field label="联系电话" :placeholder="phoneLabel" v-model="phone"></mt-field>
      <mt-field label="联系地址" :placeholder="addressLabel" v-model="address"></mt-field>

      <div style="margin: 20px 16px 0 11px;">
        <mt-button type="primary" size="large" @click.native="next">下一步</mt-button>
      </div>

      <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
        <mt-picker :slots="dateSlots" @change="onChange" :visible-item-count="5" :show-toolbar="true">
          <div class="toolbar">
            <mt-button type="default" size="small" class="toolbar-left" @click.native="popupVisible = false">取消</mt-button>
            <mt-button type="default" size="small" class="toolbar-right" @click.native="confirm">确认</mt-button>
          </div>
        </mt-picker>
      </mt-popup>

    </div>
  </div>
</template>

<script>
  import Header from '../Header.vue';
  import * as type from '../../constant/ConstantConfig.js'
  import { cardUtil } from '../../assets/idcard.js'

    export default {
      data() {
        return {
          options: ['成年人', '未成年人'],
          option: '成年人',
          idcard: '',
          name: '',
          sex: '',
          birth: '',
          age: '',
          nation: '',
          nationId: 0,
          phone: '',
          address: '',
          guardianIdcard: '',
          guardianName: '',
          relation: '',
          relationId: 0,

          popupVisible: false,
          dateSlots:[],
          values: [],
          selectPosition: 0,

          dialogType: 1,

          teamId: this.$route.query.teamId,
          orgId: this.$route.query.orgId,
          registTp: this.$route.query.registTp
        }
      },
      components: {
        appHeader: Header
      },
      computed: {
        phoneLabel() {
          if(this.option == '成年人') return '请输入您的联系电话';
          return '请输入监护人的联系电话';
        },
        addressLabel() {
          if(this.option == '成年人') return '请输入您的住址';
          return '请输入监护人的联系地址';
        }
      },
      methods: {
        //下一步
        next() {
          const request = {
            registTp: this.registTp,
            orgId: this.orgId,
            teamId: this.teamId
          };

          if(!cardUtil.validateIdCard(this.idcard)) {
            this.$toast("请输入正确的身份证号");
            return
          }
          if(!this.name) {
            this.$toast("请输入您的姓名");
            return
          }
          if(this.nationId == 0) {
            this.$toast("获取民族失败，请稍后再试");
            return
          }
          if(this.option == '未成年人') {
            if(!cardUtil.validateIdCard(this.guardianIdcard)) {
              this.$toast("请输入正确的监护人身份证号");
              return
            }
            if(!this.guardianName) {
              this.$toast("请输入监护人姓名");
              return
            }
            if(this.relationId == 0) {
              this.$toast("请选择您与签约人的关系");
              return
            }

            request.guardianRelation = this.relationId;
            request.guardianIdCard = this.guardianIdCard;
            request.guardianName = this.guardianName;
          }
          if(!this.phone) {
            this.$toast("请输入您的联系电话");
            return
          }
          if(!this.address) {
            this.$toast("请输入您的联系地址");
            return
          }
          request.idCard = this.idcard;
          request.name = this.name;
          request.sex = this.sex;
          request.birth = this.birth;
          request.age = this.age;
          request.nationId = this.nationId;
          request.linkTel = this.phone;
          request.linkAddress = this.address;
          if(this.relationId != 0) {
            request.guardianTel = this.phone;
            request.guardianAddress = this.address;
          }
          const params = JSON.stringify(request);
          sessionStorage.setItem("params", params);
          this.$router.replace("pack");
        },

        //弹窗变动
        onChange(picker, values) {
          const value = values[0];
          let position = this.values.indexOf(value);
          if(position >= 0) {
            this.selectPosition = position;
          }
        },

        //弹窗确认按钮
        confirm() {
          if(this.selectPosition >= 0) {
            if(this.dialogType == 1) {
              const dict = this.$store.getters.nationList[this.selectPosition];
              this.nationId = dict.dictId.value;
              this.nation = dict.dictName;
            } else if(this.dialogType == 2) {
              const dict = this.$store.getters.relationList[this.selectPosition];
              this.relationId = dict.dictId.value;
              this.relation = dict.dictName;
            }
            this.popupVisible = false;
          }
        },

        startShowDialog(dataList) {
          this.values = this.initDictValues(dataList);
          this.dateSlots = [{
            flex: 1,
            className: "slot1",
            textAlign: 'center',
            values: this.values,
          }];
          this.popupVisible = true;
        },

        //点击item显示弹窗
        showDialog(type) {
          this.dialogType = type;
          if(type == 1) {
            const nationList = this.$store.getters.nationList;
            if(nationList.length == 0) {
              this.$toast("正在获取数据");
              this.requestNationData();
            } else {
              this.startShowDialog(nationList);
            }
          } else if(type == 2) {
              const relationList = this.$store.getters.relationList;
              if(relationList.length == 0) {
                this.$toast("正在获取数据");
                this.requestRelationData();
              } else {
                this.startShowDialog(relationList);
              }
          }
        },

        //获取民族信息
        requestNationData() {
          const request = { dictType: type.DICT_NATION };
          let vm = this;
          this.$store.dispatch("dictList", request).then((nationList) => {
            if(nationList.length > 0) {
              vm.nationId = nationList[0].dictId.value;
              vm.nation = nationList[0].dictName;
            }
          }).catch(error => {
            this.$toast(error.message);
          });
        },

        //获取关系信息
        requestRelationData() {
          const request = { dictType: type.DICT_RELATION };
          this.$store.dispatch("dictList", request).then(() => {
          }).catch(error => {
            this.$toast(error.message);
          });
        },

        //初始化弹窗的值
        initDictValues(dictList) {
          let contents = [];
          if(dictList.length > 0) {
            for (let i = 0; i < dictList.length; i++) {
              contents[i] = dictList[i].dictName;
            }
          }
          return contents;
        },

        //监听身份证的变化
        cardListener(value) {
          this.idcard = value.target.value;
          if(cardUtil.validateIdCard(this.idcard)) {
            this.birth = cardUtil.bir;
            const nowDateTime = new Date();
            var age = nowDateTime.getFullYear() - cardUtil.birthday.getFullYear();
            //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
            if (nowDateTime.getMonth() < cardUtil.birthday.getMonth() || (nowDateTime.getMonth() == cardUtil.birthday.getMonth() && nowDateTime.getDate() < cardUtil.birthday.getDate())) {
              age--;
            }
            this.age = age;
            if(cardUtil.sex == 1) {
              this.sex = "男";
            } else {
              this.sex = "女";
            }
          }
        }

      },

      created() {
        this.requestNationData();
        this.requestRelationData();
      }
    }
</script>

<style scoped>


</style>
