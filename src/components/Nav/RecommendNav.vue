<template>
  <div class="recommend-nav" v-if="bannerList.length">
    <!-- <h2>推荐</h2> -->

    <!-- 轮播图 -->
    <div class="banner" v-if="bannerList">
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        @change="onChange"
      >
        <van-swipe-item
          v-for="b in bannerList"
          :key="b.id"
          :style="{ background: $store.state.recommendColor }"
          class="item"
        >
          <a
            tag="a"
            :href="b.jump_value"
            v-if="b.jump_value.indexOf('.html') != -1"
            class="box"
          >
            <!-- <img :src="b.img || b.img2" class="img" v-lazy="b.img || b.img2" /> -->
            <van-image :src="b.img + '@400w.jpg'" class="img">
              <template v-slot:loading>
                <!-- <van-loading type="spinner" size="20" /> -->
                <img src="@/assets/image/没有.png" />
              </template>
            </van-image>
          </a>
          <router-link
            v-else
            tag="a"
            :to="`/content${b.num2}${b.num1}`"
            class="box"
          >
            <van-image :src="b.img + '@400w.jpg'" class="img">
              <template v-slot:loading>
                <!-- <van-loading type="spinner" size="20" /> -->
                <img src="@/assets/image/没有.png" />
              </template>
            </van-image>
            <!-- <img :src="b.img || b.img2" class="img" v-lazy="b.img || b.img2" /> -->
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="main">
      <!-- 通知 -->
      <van-notice-bar scrollable left-icon="volume-o">
        《我的食物看起来很可爱》2周年庆活动开启！
      </van-notice-bar>

      <!-- 提示登录领礼包 -->
      <div class="ad" v-if="close && !this.$store.state.Login">
        <div class="text">
          <p>登录可获得的〖新人礼包〗</p>
          <p>畅游漫画世界</p>
        </div>
        <div class="dl" @click.stop="$store.commit('changeFlag', true)">
          登录
        </div>
        <div class="close" @click.stop="close = false">X</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    // bannerList: {
    //   type: Object,
    //   default: () => {
    //     return null;
    //   },
    // },
  },
  data() {
    return {
      close: true,
      bannerList: [],
    };
  },
  mounted() {},
  created() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      this.axios.get("https://apis.netstart.cn/bcomic/Banner").then((re) => {
        console.log("首页推荐banner===>", re);
        this.bannerList = re;
        this.bannerList = this.bannerList.map((v) => {
          if (v.jump_value.indexOf("?") != -1) {
            let num = v.jump_value.match(/\/\d*/g);
            // num = num.split("?")[0];
            if (num.length > 2) {
              v.num1 = num[2];
              v.num2 = num[3];
            }
          }
          return v;
        });
        console.log(this.bannerList, "?????????");
      });
    },
    onChange(index) {
      // console.log(index);
      if (this.$store.state.recommendColor === "#F8F9F9") {
        return;
      }
      this.$store.commit("changeColor", this.bannerList[index].bg);
    },
  },
};
</script>


<style lang="scss" scoped>
.recommend-nav {
  .main {
    // margin-top: 5px;
    background-color: #fff;
    .ad {
      background: url("@/assets/image/new(1).png") no-repeat;
      background-size: 70px;
      background-position: 13px -2px;
      width: 90%;
      height: 50px;
      font-size: 12px;
      border-radius: 5px;
      background-color: #f3d7a8;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 auto;
      margin-top: 15px;
      position: relative;
      letter-spacing: 1px; //文字间距

      .text {
        margin-left: 70px;
        color: #845718;
      }

      .dl {
        width: 45px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 5px;
        color: #fff;
        background-color: #c98e66;
      }

      .close {
        width: 15px;
        height: 15px;
        color: #fff;
        background-color: #e2a964;
        position: absolute;
        top: -7px;
        right: -6px;
        text-align: center;
        line-height: 15px;
        border-radius: 50%;
        font-size: 13px;
        border: 1px solid #fff;
      }
    }
  }

  .my-swipe {
    display: flex;
    // justify-content: center;

    .item {
      .box {
        display: flex;
        justify-content: center;

        .img {
          width: 90%;
          z-index: 2;
        }
      }
    }
  }
}

.loading {
  display: flex;
  width: 100vw;
  height: 85vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 20px;
    text-indent: 3px;
    color: white;
  }
}
</style>