<template>
    <div>
      <div style="background: white; padding: 15px">
        <img class="icon" :src="userImg">
        <div style="padding-left: 50px;">
          <div>
            <span class="namecs">{{ userName }}</span>
            <span class="titlecs" style="float: right">{{ evaItem.timeCreate | dataFormat }}</span>
            <el-rate v-model="rateScore" disabled text-color="#ff9900" score-template="{value}" allow-half></el-rate>
            <span class="jibing" v-for="key in evaItem.keywords">{{ key }}</span>
          </div>

          <div class="titlecs" style="margin-top: 10px;">{{ evaItem.content | commentFilter }} </div>
        </div>

      </div>
      <hr class="full-line">
    </div>
</template>

<script>
   import imgMap from '../../../static/js/imgmap.js';
    export default {
        data() {
          return {
            rateScore: 0
          }
        },

        props: ['evaItem'],

        computed: {
          userImg() {
            if(this.evaItem.photoUrl) {
              return this.evaItem.photoUrl;
            }
            return imgMap.defaultAva
          },
          userName() {
            if(this.evaItem) {
              if (this.evaItem.nickName) return this.evaItem.nickName;
              if (this.evaItem.userName) return this.evaItem.userName;
            }
            return '-'
          },

          // rateScore() {
          //   console.log(this.evaItem);
          //   console.log(typeof parseFloat(this.evaItem.score.value));
          //   return parseFloat(this.evaItem.score.value);
          // }

        },

      filters: {
        dataFormat(str) {
          let date = new Date(Date.parse(str.replace(/-/g,"/"))).format('MM-dd');
          return date;
        },
        commentFilter(comment) {
          if(!comment) return "无评价内容";
          return comment;
        }
      },

      methods: {
        average(...arr)  {
          const nums = [].concat(...arr);
          return nums.reduce((acc, val) => acc + val, 0) / nums.length;
        }
      },

      mounted() {
          // this.rateScore = parseFloat(this.evaItem.score.value);
         this.rateScore = this.average(this.evaItem.scoreList);
      }

    }
</script>

<style scoped>
  .icon{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    float: left;
  }

  .titlecs{
    font-size:14px;
    font-weight:normal;
    color:rgba(34,34,34,1);
    line-height:14px;
  }

  .namecs{
    font-size:15px;
    font-weight:bold;
    color:rgba(34,34,34,1);
    line-height:25px;
  }

  .jibing{
    display: inline-block;
    font-size: 14px;
    padding: 0 9px;
    text-align: center;
    margin-right: 15px;
    border: 1px solid #cccccc;
    line-height: 30px;
    color: #222222;
    white-space:nowrap;
    margin-top: 10px;
  }
</style>
