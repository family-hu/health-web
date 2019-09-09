<template>
  <div>
    <div class="item">
      <img :src="img" alt="" width="52px" height="52px">
      <span class="right">{{ sendTime }}</span>
      <div class="middle">
        <div style="font-size: 15px; font-weight: bold; color: #222222;">{{ conversationItem.nick}}</div>
        <div style="font-size: 12px; margin-top: 6px; color: #666666;"> {{ showText }}</div>
      </div>
    </div>

    <hr class="line">

  </div>

</template>

<script>
  import imgMap from '../../../static/js/imgmap.js'
    export default {
        props: ['conversationItem'],

        computed: {
          img() {
            if(this.conversationItem.faceUrl) return this.conversationItem.faceUrl;

            if(this.conversationItem.groupType.value != '0') {
              let img = imgMap.groupUser;
              if(this.conversationItem.groupType.value == "2") {
                img = imgMap.groupDoc;
              } else if(this.conversationItem.groupType.value == "3") {
                img = imgMap.groupDocPatient;
              }
              return img;
            } else {
              if(this.conversationItem.sysType.value == '1003104') {  //对方是用户
                return imgMap.defaultAva;
              } else {
                let img = imgMap.docMale;
                if(this.conversationItem.gender && this.conversationItem.gender.value == "0") {
                  img = imgMap.docFeMale;
                }
                return img;
              }
            }
          },

          showText() {
            if(this.conversationItem.conversation) {
              return this.conversationItem.conversation.MsgShow;
            }
          },

          sendTime() {
            if(this.conversationItem.conversation) {
              let time = this.conversationItem.conversation.MsgTimeStamp;
              if(time) {
                let date = new Date(Date.parse(time.replace(/-/g,"/"))).format('MM-dd hh:mm');
                return date;
              }
            }
          }
        }
    }
</script>

<style scoped>
    .item {
      background: white;
      padding: 10px 16px;
      position: relative;
    }

    .middle {
      width: 100%;
      display: inline-block;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      margin: auto 10px;
    }

  .right {
    float: right;
    font-size: 12px;
    margin-top: 6px;
    color: #666666;
  }

</style>
