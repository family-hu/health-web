<template>
    <div>
        <app-header title="签名" :showMenu="true" @confirm="save"></app-header>
        <div class="page-header-main">
          <div class="signature-pad">
            <div class="signature-pad--body">
              <canvas id="signature-pad"></canvas>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
  import Signature from 'signature_pad'
  import Header from '../Header'
    export default {
        data() {
          return {
            sig:()=>{},
          }
        },
        components: {
          appHeader: Header
        },
      methods: {
        init() {
          let vm = this;
          const canvas = document.getElementById("signature-pad");
          this.sig =  new Signature(canvas, {
            backgroundColor: 'rgb(255, 255, 255)'
          });
          function resizeCanvas() {
            const ratio =  Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
            vm.clear();
          }
          window.addEventListener("resize", resizeCanvas);
          resizeCanvas();
        },
        clear() {
          this.sig.clear();
        },
        save() {
          if(this.sig.isEmpty()) {
            this.$toast("请先签名后再提交");
            return;
          }
          const img = this.sig.toDataURL();
          sessionStorage.setItem("img", img);
          this.clear();
          this.$router.go(-1);
        }
      },
      mounted() {
          let vm = this;
          this.$nextTick(() => {
            vm.init();
          });
      }
    }
</script>

<style scoped>
  .signature-pad {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    font-size: 10px;
    width: 100%;
    height: 100%;
    max-width: 700px;
    max-height: 460px;
    border: 1px solid #e8e8e8;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
    border-radius: 4px;
    padding: 16px;
    top: 50px;
  }

  .signature-pad--body {
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    border: 1px solid #f4f4f4;
  }

  canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.02) inset;
  }

  .signature-pad {
    margin: auto;
    height: auto;
  }

  .signature-pad--body {
    min-height: 360px;
  }
</style>
