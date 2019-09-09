<template>
  <div class="header_box">
    <mt-header fixed :title="title">
      <mt-button slot= "left" icon="back" v-if="showBack" @click.native="back"></mt-button>
      <mt-button slot= "right" v-if="showMenu" @click.native="menu">确定</mt-button>
    </mt-header>
  </div>
</template>

<script>

  export default {
    props: {
      showBack: {
        default: true
      },
      title: {
        default: '在线问诊'
      },
      showMenu: {
        default: false
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      menu() {
        this.$emit("confirm")
      }
    }
  }
</script>

<style>
.header_box,.mint-header{
  background: #fff
}
.mint-header .mint-button .mintui-back{
  color:rgba(4,11,28,.8);
}
.mint-header-title{
  font-size: 15px;
  color: #006DFF;
}
</style>
