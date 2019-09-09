<template>
    <div>
      <app-header title="签约成功"></app-header>
      <div class="page-header-main" style="text-align: center">
        <div style="margin-top: 160px;">
          <img src="/static/img/ic_sign_success.png" alt="">
        </div>
        <h4>{{ tipText }}</h4>
        <mt-button type="primary" size="normal"  @click.native="continueSign" style="margin: 10px auto;">继续签约</mt-button>
      </div>
    </div>
</template>

<script>
  import Header from '../Header'
    export default {
        data() {
          return {
            price: this.$route.query.price
          }
        },
      components: {
          appHeader: Header
      },
      computed: {
        tipText() {
          let price = this.price;
          let priceNumber = Number.parseFloat(price);
          if(priceNumber == 0) {
            return "您的家庭医生签约已成功提交";
          } else {
            return "签约成功，请尽快登录医联邦APP进行支付";
          }
        }
      },
      methods: {
        continueSign() {
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped>

</style>
