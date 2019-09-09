<template>
    <div>
      <div class="cell0">
        <div class="cell">
          <div class="title">{{ currentIndex }}. {{ title }}</div>
          <consultation-answer-item class="answer"
                                    v-for="(answer,index) in listAnswer"
                                    :key="index"
                                    :answer="answer"
                                    :answerId="currentAnswerId"
                                    :index="index"
                                    @choseAnswer="choseAnswer">
          </consultation-answer-item>
          <div style="margin-top: 5%;width: 100%;">
            <button type="button" class="btn fl" :class="showCommit ? 'half' : 'full'" v-if="recordList.length > 0" @click="toBefore">上一题</button>
            <button type="button" class="btn fr half" v-if="showCommit" @click="commit">提交</button>
          </div>

        </div>
      </div>

      <div class="bottom">
        <span class="num">{{ currentIndex }}</span>
        <span class="num1">/{{totalIndex}}</span>
      </div>

    </div>
</template>

<script>
    import ConsultationAnswerItem from './ConsultationAnswerItem.vue';
    import { mapGetters, mapMutations } from 'vuex'
    export default {
        data() {
           return {
             pevalId: this.$route.query.pevalId,   //题目id
             porderId: this.$route.query.porderId,  //订单id
             totalIndex: 0,   //总题目数量
             current:{},  //当前题目
             recordList: [],  //做题记录列表
             listSubject: [],     //题目列表
             listRecorde: [],    //答案列表
             showCommit: false,  //显示提交按钮
             type: "0"  //类型 0 分数测评，1 问题跳转测评
           }
        },

        components: {
          consultationAnswerItem: ConsultationAnswerItem
        },

        watch: {
          "current.answerId": function (newVal, oldVal) {
            console.log(newVal + "--" + oldVal);
          }
        },

        computed: {
          ...mapGetters(['loginData']),
           title() {
              return this.current.title;
           },

          listAnswer() {
            return this.current.listAnswer;
          },

          currentIndex() {
             if(this.current.orderNum) {
               return this.current.orderNum.value;
             }
          },

          currentAnswerId() {
            return this.current.answerId;
          }
        },

        methods: {
          ...mapMutations(['setRefreshOrder']),
          evalInfoQuery() {
            const request = {pevalId: this.pevalId, porderId: this.porderId};
            this.$indicator.open();
            this.$store.dispatch("evalInfoQuery", request).then(data => {
              this.type = data.type.value;
              if(data.listSubject) {
                this.listSubject = data.listSubject;
              }
              if(data.jvPsycOrderInfoQueryRspDTO && data.jvPsycOrderInfoQueryRspDTO.listRecorde) {
                this.listRecorde = data.jvPsycOrderInfoQueryRspDTO.listRecorde;
              }
              this.initData();
            }).then(error => {
              this.$toast(error.message);
            }).finally(() => {
              this.$indicator.close();
            })
          },

          //选择答案
          choseAnswer(answer) {
            //提交答案
            const request = {
              panswId: answer.panswId.value,
              porderId: this.porderId,
              psubId: this.current.psubId.value,
              userId: this.loginData.userObj.userId.value
            };
            this.$indicator.open();
            this.$store.dispatch("recordeSubmit", request).then(data => {
              this.$set(this.current, 'answerId', request.panswId);
              this.toNext(answer);
            }).then(err => {
              this.$toast(err.message);
            }).finally(() => {
              this.$indicator.close();
            })
          },

          showDialog() {
            this.$messagebox({
              cancelButtonText: '重做',
              confirmButtonText: '继续答题',
              message: '是否从上次中断的位置继续答题',
              showCancelButton: true,
              showCancelButton: true
            }).then(action => {
              if(action == 'cancel') {  //重做，是否给题目填充之前做过的答案?

              } else if(action == 'confirm') {  //跳转到之前做过的最后一题
                for (let i = 0; i < this.listRecorde.length; i++) {
                  const record = this.listRecorde[i];
                  const answer = this.findAnswerByRecord(record);
                  if(answer) {
                    this.toNext(answer);
                  }
                }
              }
            });
          },

          findAnswerByRecord(record) {
            for (let i = 0; i < this.listSubject.length; i++) {
              let subject = this.listSubject[i];
              if(subject.psubId.value == record.psubId.value) {
                let answerList = subject.listAnswer;
                for (let j = 0; j < answerList.length; j++) {
                  let answer = answerList[j];
                  if(answer.panswId.value == record.panswId.value) return answer;
                }
              }
            }
          },

          initData() {
            if(this.listSubject.length > 0) {
              this.totalIndex = this.listSubject.length;
              this.current = this.listSubject[0];
              if(this.listRecorde.length > 0) {  //有做题记录,显示弹窗
                this.fillAnswer();
                this.showDialog();
              }
            }
          },

          fillAnswer() {
            for (let i = 0; i < this.listSubject.length; i++) {
              const subject = this.listSubject[i];
              for (let j = 0; j < this.listRecorde.length; j++) {
                const record = this.listRecorde[j];
                if(subject.psubId.value == record.psubId.value) {
                  this.$set(subject, 'answerId', record.panswId.value);  //新增属性没有get,set 无法computed
                  // subject.answerId = record.panswId.value;
                  break;
                }
              }
            }
          },

          //下一题
          toNext(answer) {
            if(this.type == "1") {
              let value = answer.nextPsubOrderNum.value;
              if(value == '0') {  //最后一题了
                this.showCommit = true;
              } else {  //查找下一题
                this.showCommit = false;
                for (let i = 0; i < this.listSubject.length; i++) {
                  let subject = this.listSubject[i];
                  if(subject.orderNum.value == value) {
                    this.recordList.push(this.current);
                    this.current = subject;
                    if(subject.answerId && this.listAnswer && this.listAnswer.length > 0) {
                      for (let j = 0; j < this.listAnswer.length; j++) {
                        let answer = this.listAnswer[j];
                        if(answer.panswId.value == subject.answerId) {  //当前选择的答案，看这个答案对应的后面有没有题，
                          if(answer.nextPsubOrderNum.value == '0') {
                            this.showCommit = true;
                            break;
                          }
                        }
                      }
                    }
                    break;
                  }
                }
              }
            } else {
                 this.showCommit = (this.currentIndex == this.totalIndex.toString());
                 if(!this.showCommit) {  //不是最后一题
                   this.recordList.push(this.current);
                   this.current = this.listSubject[this.currentIndex];
                   //判断这题是否是最后一题并且已答
                   if(this.currentIndex == this.totalIndex.toString() && this.currentAnswerId) {
                     this.showCommit = true;
                   }
                 }
            }
          },

          toBefore() {
              this.current = this.recordList.pop();
              this.showCommit = false;
          },

          commit() {
            this.$indicator.open();
            this.$store.dispatch("evalSubmit", {porderId: this.porderId, pevalId: this.$route.query.pevalId}).then(data => {
                let prepId = data.prepId.value;
                this.$router.replace({
                  path: "consultationResult",
                  query: {...this.$route.query, prepId: prepId}
                });
               this.setRefreshOrder(true);  //测试完成，刷新订单列表
            }).catch(err => {
               this.$toast(err.message);
            }).finally(() => {
               this.$indicator.close();
            })
          }
        },

        created() {
          this.evalInfoQuery();
        }
    }
</script>

<style scoped>

  .cell{
    height: 100%;
    background-color: white;
    box-shadow:0 2px 4px 0 rgba(0,0,0,0.3);
    border-radius:4px;
    margin-left: 28px;
    margin-right: 28px;
    padding: 30px 20px 0 20px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .answer {
    padding-top: 20px;
    display: inline-block;
    width: 100%
  }

  .cell0{
    position: absolute;
    top: 5%;
    bottom: 20%;
    left: 0;
    right: 0;
    /*padding-top: 5%;*/
    /*height: 70%;*/

  }
  .title{
    font-weight: bold;
    font-size: 18px;
  }


  .btn{
    font-size:20px;
    font-weight: 500;
    color: floralwhite;
    background-color: rgba(0,147,255,1);
    height: 44px;
    border-radius: 22px;
    margin: 30px 0;
    border-width: 0; /* 边框宽度 */
    outline: none; /* 不显示轮廓线 */
  }

  .half {
    width: 42%;
  }

  .full {
    width: 100%;
  }

  .bottom{
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 2%
  }

  .num{
    color: #019AFF;
    font-size: 30px;
    font-weight: 800;
  }

  .num1{
    font-size: 18px;
  }

</style>
