<template>

  <div>
    <div class="cell">

      <div class="box">
        <h3 class="align-center-vertical">{{ title }}</h3>
        <img class="img" :src="consultationImg" >
      </div>

      <div style="padding: 20px;">
        <div class="title">测试结果：{{ report.result }}</div>
        <div class="text">{{ report.resolution }}</div>
        <hr class="full-line">

        <button type="button" class="btn1" @click="save" :style="{width: pcomtId ? '100%' : '44%'}">保存结果</button>
        <button type="button" class="btn2" @click="comment" v-if="!pcomtId">发表评论</button>
      </div>

    </div>

    <div style="background: white; margin-top: 16px;">
      <div class="title" style="display: inline-block;margin-left: 16px; margin-top: 16px;">相关推荐</div>
      <consultation-item v-for="item in recommendEvalList" :key="item.pevalId.value" :consultationItem="item" @click.native="toDetail(item)"></consultation-item>
    </div>

    <div ref="cap" style="background: white; margin: 0 6%;" v-if="showCap">
      <div class="box">
        <h3 class="align-center-vertical">{{ title }}</h3>
        <img class="img" :src="consultationImg">
      </div>

      <div style="padding: 20px;">
        <div class="title">测试结果：{{ report.result }}</div>
        <div class="text">{{ report.resolution }}</div>
      </div>
      <div class="blue">
        <div class="imgewm" id="qrcode"></div>
        <div class="text1">{{ title }}</div>
        <div class="text2">长按二维码快来测试吧</div>
      </div>

    </div>

    <!--<div ref="capDiv" style="background-color: #979797" v-if="showCap">-->
      <!--<button type="button" class="btnn">长按图片保存</button>-->
    <!--</div>-->

    <mt-popup v-model="popupVisible" id="pop" position="bottom">

    </mt-popup>

  </div>

</template>

<script>
    import imgMap from '../../../static/js/imgmap.js';
    import ConsultationItem from './ConsultationItem.vue';
    import html2canvas from 'html2canvas';
    export default {
        data() {
          return {
            prepId: this.$route.query.prepId,  //报告id
            pevalId: this.$route.query.pevalId,  //测评id
            porderId: this.$route.query.porderId,  //订单id
            img: '',   //测评图片
            title: '',  //测评标题
            report: {},
            recommendEvalList: [],
            popupVisible: false,
            showCap: false,
            pcomtId: null
          }
        },

        components: {
          consultationItem: ConsultationItem
        },

        computed: {
          consultationImg() {
            if(this.img) return this.img;
            return imgMap.consultationBigImg;
          },

        },

        methods: {
          toDetail(item) {
            this.$router.push({
              path: "consultationDetail",
              query: {
                pevalId: item.pevalId.value
              }
            });
          },

          reportQuery() {
            const request = {pevalId: this.pevalId, porderId: this.porderId};
            this.$indicator.open();
            this.$store.dispatch("evalInfoQuery", request).then(data => {
              this.img = data.picWide;
              this.title = data.title;
              this.pcomtId = data.jvPsycOrderInfoQueryRspDTO.pcomtId;
              if(data.listReport) {
                for (let i = 0; i < data.listReport.length; i++) {
                  let item = data.listReport[i];
                  if(item.prepId.value == this.prepId) {
                    this.report = item;
                  }
                }
              }
            }).then(error => {
              this.$toast(error.message);
            }).finally(() => {
              this.$indicator.close();
            })
          },

          evalListQuery() {
            const request = {orgId: this.$store.getters.getOrgId, pageNum:1, pageSize:3, sortby: 'order_count desc'};
            this.$store.dispatch("evalListQuery", request).then((data) => {
              if(data.dataList) {
                this.recommendEvalList = data.dataList;
              }
            }).catch(error => {
              this.$toast(error.message);
            })
          },

          save() {
            this.showCap = true;
            this.$indicator.open();
            let vm = this;
            this.$nextTick(function () {
              $('#qrcode').qrcode(
                {
                  width: 80,
                  height: 80,
                  text: 'http://vip.sinoylb.com:9901/consultationDetail?pevalId=' + this.pevalId
                }
                );

              html2canvas(vm.$refs.cap, {useCORS: true, logging: false}).then(function(canvas) {  //,allowTaint: true
                let pop = document.getElementById("pop");
                pop.innerText = "";

                // let div = vm.$refs.capDiv.parentNode.removeChild(vm.$refs.capDiv);
                // console.log(div);

                let width = canvas.style.width;
                let height = canvas.style.height;
                pop.style.width = width;
                pop.style.height = height;
                const img = document.createElement("img");
                img.style.width = width;
                img.style.height = height;
                img.src = canvas.toDataURL();
                pop.appendChild(img);
                // pop.appendChild(div);
                vm.popupVisible = true
              }).catch(err => {
                vm.$toast(err.message);
              }).finally(() => {
                vm.$indicator.close();
                vm.showCap = false;
              });
            });

          },

          comment() {  //发布评论
            this.$router.push({
              path: "consultationCommentAdd",
              query: {
                pevalId: this.pevalId,
                porderId: this.porderId,
              }
            });
          }

        },

        created() {
          this.reportQuery();
          this.evalListQuery();  //推荐测评列表
        }
    }
</script>

<style scoped>

  .cell{
    background-color: white;
    box-shadow:0 2px 4px 0 rgba(0,0,0,0.3);
    border-radius:4px;
    margin-left: 28px;
    margin-right: 28px;
    margin-top: 5%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .box{
    position: relative; /**/
    display: table;
    width: 100%;
    height: auto;
  }

  .align-center-vertical{
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    position: absolute;/**/
    font-size: 26px;
    font-weight: 600;
    color: white;
    text-align: center;
    width: 100%;
    margin-top: 0;
    height:100%;
    background: rgba(0,0,0,0.2);;
  }

  .title{
    font-weight: 600;
    font-size: 20px;
  }
  .text{
    font-size: 15px;
    color: #333333;
    line-height: 25px;
    margin: 30px 0;
  }

  .img{
    width: 100%;
    height: auto;
    vertical-align: top;
  }

  .btn1{
    font-size:20px;
    font-weight: 500;
    color: floralwhite;
    background-color: rgba(0,147,255,1);
    height: 44px;
    border-radius: 22px;
    margin-top: 20px;
    width: 44%;
    border-width: 0; /* 边框宽度 */
    outline: none; /* 不显示轮廓线 */
  }

  .btn2{
    font-size:20px;
    font-weight: 500;
    color: floralwhite;
    background-color: #FFB154;
    height: 44px;
    border-radius: 22px;
    margin-top: 20px;
    width: 44%;
    margin-left: 10%;
    border-width: 0; /* 边框宽度 */
    outline: none; /* 不显示轮廓线 */
  }

  .blue{
    background-color: #0093FF;
    height: 80px;
    padding: 20px;
  }

  .imgewm{
    width: 80px;
    height: 80px;
    float: left;
    padding-bottom: 20px;
  }
  .text1{
    font-weight: 600;
    font-size: 18px;
    color: white;
    margin-left: 80px;
    text-align: left;
    padding-left: 12px;
    height: 50px;
    display: flex;
    align-items: left;
    justify-content: space-around;
    flex-direction: column;
  }
  .text2{
    font-weight: 600;
    font-size: 16px;
    color: black;
    margin-left: 92px;
    padding-top: 3px;
    padding-bottom: 3px;
    margin-top: 2px;
    background-color: white;
    text-align: center;
  }
  .btnn{
    color: white;
    font-size: 20px;
    height: 44px;
    border:1px solid rgba(255,255,255,1);
    width: 100%;
    border-radius: 22px;
    background-color: transparent;
    margin-top: 10px;
    margin-bottom: 13px;
    outline: transparent;
  }

</style>
