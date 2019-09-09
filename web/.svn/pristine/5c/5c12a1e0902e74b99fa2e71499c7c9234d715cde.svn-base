<template>
    <div>
      <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

        <!-- Background of PhotoSwipe.
             It's a separate element as animating opacity is faster than rgba(). -->
        <div class="pswp__bg"></div>

        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">

          <!-- Container that holds slides.
              PhotoSwipe keeps only 3 of them in the DOM to save memory.
              Don't modify these 3 pswp__item elements, data is added later on. -->
          <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
          </div>

          <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
          <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">

              <!--  Controls are self-explanatory. Order can be changed. -->

              <div class="pswp__counter"></div>

              <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

              <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

              <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
              <!-- element will get class pswp__preloader--active when preloader is running -->
              <div class="pswp__preloader">
                <div class="pswp__preloader__icn">
                  <div class="pswp__preloader__cut">
                    <div class="pswp__preloader__donut"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div class="pswp__share-tooltip"></div>
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
              <div class="pswp__caption__center"></div>
            </div>

          </div>

        </div>

      </div>


      <div class="cell" style="height: 86px">
        <div style="display: inline-block;width: 100%">
          <span class="lab0">姓名：{{ detail.userName }}</span>
          <span class="lab0" style="float: right;margin-right: 16px">时间：{{ detail.time }}</span>
        </div>
        <div style="display: inline-block;width: 100%">
          <span class="lab0">性别：{{ detail.gender | genderFilter }}</span>
          <span class="lab0" style="float: right;margin-right: 16px">年龄：{{ age }}岁</span>
        </div>
      </div>

      <div class="cell" style="margin-top: 10px">
        <span class="lab1">患者主述</span>
        <div style="margin: 0px 16px 10px 16px">
          <span class="lab2">{{ detail.userDescribe }}</span>
        </div>
        <span class="lab1">检查指标</span>
        <div style="margin: 0px 16px 10px 16px">
          <div class="lab2" v-for="data in detail.recordsData" :key="data.recordsid.value">
            {{ data.title }}：{{ data.content + data.unit }}
          </div>
        </div>
        <span class="lab1">医生诊断</span>
        <div style="padding: 0px 16px 18px 16px">
          <span class="lab2">{{ detail.result }}</span>
        </div>
      </div>

      <div class=" cell" style="margin-top: 10px">
        <span class="lab1">病情描述</span>
        <div style="margin: 0px 16px 10px 16px">
          <span class="lab2">{{ detail.docDescribe }}</span>
        </div>
        <div>
          <img class="img" ref="imgs" v-for="(url,index) in detail.imgList"  :key="url" :src="url" @click="toGallery(index)">
        </div>
      </div>

      <div class="cell" style="height: 86px;margin-top: 10px">
        <div style="display: inline-block;width: 100%">
          <span class="lab0">医生：{{ detail.docName }}</span>
          <span class="lab0" style="float: right;margin-right: 16px">科室：{{ detail.departmentName }}</span>
        </div>
        <div style="display: inline-block;width: 100%">
          <span class="lab0">医院：{{ detail.hospital }}</span>
          <span class="lab0" style="float: right;margin-right: 16px">录入人：{{ detail.docName }}</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
         return {
           orderId: this.$route.query.orderId,
           recordsid: this.$route.query.recordsid,
           detail: {}
         }
      },

      filters: {
        genderFilter(gender) {
          if(gender) {
            if(gender.value == '1') return '男';
            if(gender.value == '0') return '女';
          }
          return '';
        }
      },

      computed: {
        age() {
          if(this.detail.age) return this.detail.age.value;
          return '';
        }
      },

      methods: {
        toGallery(index) {
            if(this.detail.imgList && this.detail.imgList.length > 0) {
              // require([
              //   '/static/js/photoswipe.min.js',
              //   '/static/js/photoswipe-ui-default.min.js'
              // ], function( PhotoSwipe, PhotoSwipeUI_Default ) {
              //
              // });
                this.initGallery(index);
            }
        },

        initGallery(index) {
          let pswpElement = document.querySelectorAll('.pswp')[0];
          this.parseThumbnailElements().then(items => {
            console.log(items);
            let options = {
              tapToClose: true,
              index: index // start at first slide
            };
            const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
          });
          // let items = this.parseThumbnailElements();

        },

        parseThumbnailElements() {
          let thumbElements = this.$refs.imgs;
          return new Promise(resolve=>{
            let items = [], el, item = {};
            for(let i = 0; i < thumbElements.length; i++) {
              el = thumbElements[i];
              if(el.nodeType !== 1) {
                continue;
              }
              let rw = 0;
              let rh = 0;
              if(typeof el.naturalWidth == "undefined") {　　 // IE 6/7/8
                let i = new Image();
                i.src = el.src;
                rw = i.width;
                rh = i.height;
              } else {　　 // HTML5 browsers
                rw = el.naturalWidth;
                rh = el.naturalHeight;
              }
              getImage(i);
              var count = 0;
              function getImage(index){
                let l= new Image();
                l.src = el.getAttribute('large') ? el.getAttribute('large'):el.getAttribute('src');
                l.text = el.getAttribute('preview-text');
                l.author = el.getAttribute('data-author');
                l.onload=function(){
                  item = {
                    title: l.text,
                    el: el,
                    src: l.src,
                    w: rw,
                    h: rh,
                    author: l.author,
                    o: {
                      src: l.src,
                      w: this.width,
                      h: this.height,
                    },
                    m: {
                      src: l.src,
                      w: this.width,
                      h: this.height,
                    }
                  };
                  items[index]=item
                  count++
                  if(count==thumbElements.length){
                    resolve(items)
                  }
                }
              }


            }
          });
        },

      },

      created() {
        this.$indicator.open();
        let vm = this;
        let request = {orderid: this.orderId, recordsid: this.recordsid};
        this.$store.dispatch("subscribeRecordsQuery", request).then((detail) => {
          vm.detail = detail;
        }).catch(e => {
          this.$toast(e.message);
        }).finally(() => {
          this.$indicator.close();
        });
      }
    }
</script>

<style scoped>
  .cell{
    background-color: white;

  }
  .lab0{
    color: rgba(34,34,34,1);
    font-weight: 400;
    font-size: 14px;
    line-height: 40px;
    margin-left: 16px;
    margin-right: 16px
  }
  .lab1{
    color: #B8B8B8;
    font-weight: 400;
    font-size: 13px;
    margin-left: 16px;
    line-height: 40px;
  }
  .lab2 {
    color: rgba(34, 34, 34, 1);
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
  }
  .img{
    width: 92px;
    height: 92px;
    margin-top: 10px;
    margin-bottom: 16px;
    margin-left: 16px;
  }
</style>
