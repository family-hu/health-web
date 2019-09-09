<template>
    <div>
      <div style="padding: 18px 20px 14px 20px;font-weight: 600;font-size: 16px">该测评对你有帮助吗？</div>

      <div style="background: white; padding-left: 20px;padding-bottom: 16px;">
        <div style="display: inline-block;padding-top: 16px" v-for="(scoreType,index) in scoreTypes">
          <span style="font-size: 14px;margin-right: 30px">{{ scoreType }}</span>
          <el-rate v-model="scoreList[index]"  allow-half style="display: inline-block"></el-rate>
        </div>
      </div>

      <div style="background-color: white;margin-top: 10px;padding: 0 16px;">
        <div style="display: inline-block;">
          <span class="jibing" v-for="(draw,index) in drawList" @click="changeCheck(index)" :class="[draw.checked ? 'checked': 'unchecked']">{{ draw.key }}</span>
        </div>
        <div  class="full-line" style="margin-top: 20px;"></div>
        <textarea class="textA"  placeholder ="说说你的测试心得，分享给想测的朋友吧" clos="5" rows="5" warp="virtual" v-model="content"></textarea>

      </div>

      <button type="button" class="btn" @click="commentAdd">提交</button>
    </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
    export default {
        data() {
          return {
            pevalId: this.$route.query.pevalId,
            porderId: this.$route.query.porderId,
            scoreTypes: [],
            scoreList:[],
            drawList: [],
            content: ''
          }
        },

        computed: {
          ...mapGetters(['loginData']),
        },

        methods: {
          ...mapMutations(['setComment']),
          changeCheck(index) {
            const draw = this.drawList[index];
            if(draw.checked) {
              draw.checked = !draw.checked;
            } else {
              draw.checked = true;
            }
            this.$set(this.drawList, index, draw);
          },



          commentAdd() {
            let keys = [];
            for (let i = 0; i < this.drawList.length; i++) {
              if(this.drawList[i].checked) keys.push(this.drawList[i].key);
            }
            if(keys.length == 0) {
              this.$toast('请添加关键词!');
              return;
            }
            const request = {
              content: this.content,
              keywordList: keys,
              scoreList: this.scoreList,
              userId: this.loginData.userObj.userId.value,
              pevalId: this.pevalId,
              porderId: this.porderId
            };
            this.$indicator.open();
            this.$store.dispatch("commentAdd", request).then(data => {
              this.$toast("添加成功");
              this.$router.go(-1);
              this.setComment({pcomtId: data.pcomtId.value, porderId: this.porderId});   //评价成功，刷新已评价状态
            }).catch(err => {
              this.$toast(err.message);
            }).finally(() => {
              this.$indicator.close();
            })
          }
        },

        created() {
          this.$store.dispatch("commentKeywordsQuery", {}).then(data => {
             this.scoreTypes = data.scoreTypes;
             if(data.keywords && data.keywords.length > 0) {
               for (let i = 0; i < data.keywords.length; i++) {
                 let key = data.keywords[i];
                 this.drawList[i] = {key: key, checked: false};
               }
             }
             if(data.scoreTypes && data.scoreTypes.length > 0) {
               for (let i = 0; i < data.scoreTypes.length; i++) {
                 this.scoreList[i] = 5;
               }
             }
          }).catch(err => {
            this.$toast(err.message);
          })
        }
    }
</script>

<style scoped>
  input::-webkit-input-placeholder {
    font-size: 15px;
    color: #999999;
  }

  .textA{
    border-width: 0; /* 边框宽度 */
    outline: none; /* 不显示轮廓线 */
    font-size: 15px;
    margin-top: 8px;
    width: 100%;
    color: #222222;
  }

  .checked {
    color: #0093FF;
    border: 1px solid #0093FF;
  }

  .unchecked {
    color: #222222;
    border: 1px solid #cccccc;
  }

  .jibing{
    display: inline-block;
    font-size: 14px;
    padding: 0 9px;
    text-align: center;
    margin-right: 15px;
    line-height: 30px;
    white-space:nowrap;
    margin-top: 16px;
  }

  .btn{
    font-size:20px;
    font-weight: 600;
    color: floralwhite;
    background-color: rgba(0,147,255,1);
    height: 44px;

    margin-top: 25px;
    width: 90%;
    margin-left: 5%;
    border-width: 0; /* 边框宽度 */
    outline: none; /* 不显示轮廓线 */
    border-radius: 22px;
  }

</style>
