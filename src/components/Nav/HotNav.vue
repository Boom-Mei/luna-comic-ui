<template>
  <div class="hot-nav">
    <!-- <h3>热门</h3> -->

    <!-- 轮播图 -->
    <div style="height: 1px"></div>
    <div
      class="banner"
      v-if="slides"
      :style="{ '--background': 'url(' + imageUrl + ')' }"
    >
      <carousel-3d
        :autoplayTimeout="3000"
        :perspective="20"
        :animationSpeed="500"
        autoplay
        width="230"
        height="310"
        startIndex="3"
        @before-slide-change="onSlideChange"
        ref="carouser"
      >
        <slide
          v-for="(item, i) in slides"
          :index="i"
          :key="item.id"
          class="item3d"
        >
          <router-link :to="`/details/${item.numID}`">
            <img
              :src="item.image_url + '@200w.jpg'"
              class="img"
              v-lazy="item.image_url + '@200w.jpg'"
            />
          </router-link>
        </slide>
      </carousel-3d>
    </div>
    <!-- 今日热门速递 -->
    <div class="hot">
      <h3>今日热门速递</h3>
      <router-link tag="p" to="/all/1012/今日热门速递">查看全部>></router-link>
    </div>
    <ul v-if="mainlist.length" class="hot_main">
      <router-link
        tag="li"
        :to="`/details/${hot.item_id}`"
        v-for="hot in mainlist"
        :key="hot.item_id"
      >
        <van-image :src="hot.image + '@200w.jpg'" radius="5px">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <!-- <img :src="hot.image" v-lazy="hot.image" /> -->
        <p>{{ hot.title }}</p>
        <span>{{ hot.comic_info.decision }}</span>
      </router-link>

      <!-- 换一批 -->
      <div
        class="iconfont icon-huanyipi"
        @click.stop="getDate(Math.floor(Math.random() * 8))"
      >
        &nbsp;&nbsp;换一批
      </div>
    </ul>

    <LoadingImg v-else></LoadingImg>

    <!-- 新作飙升榜 -->
    <div class="hot">
      <h3>新作飙升榜</h3>
      <p></p>
    </div>

    <ul v-if="newlist.length" class="new_main">
      <router-link
        tag="li"
        :to="`/details/${newitem.item_id}`"
        v-for="(newitem, index) in newlist"
        :key="newitem.item_id"
      >
        <div class="num">No.{{ index + 1 }}</div>
        <div class="img">
          <van-image :src="newitem.image + '@400w.jpg'" radius="5px">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <!-- <img :src="newitem.image" v-lazy="newitem.image" /> -->
        </div>
        <p>{{ newitem.title }}</p>
        <span>{{
          newitem.comic_info.decision
            ? newitem.comic_info.decision
            : "更新至" + newitem.comic_info.lastest_short_title + "话"
        }}</span>
      </router-link>
    </ul>

    <LoadingImg v-else></LoadingImg>

    <div style="height: 50px"></div>

    <!-- 1v1超甜狗粮 -->
    <div class="hot">
      <h3>1v1超甜狗粮</h3>
      <router-link tag="p" to="/all/1065/1V1超甜狗粮">查看全部>></router-link>
    </div>

    <ul v-if="onelist" class="hot_main">
      <router-link
        tag="li"
        :to="`/details/${one.item_id}`"
        v-for="one in onelist"
        :key="one.item_id"
      >
        <van-image :src="one.image + '@200w.jpg'" radius="5px">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <!-- <img :src="one.image" v-lazy="one.image" /> -->
        <p>{{ one.title }}</p>
        <span>{{ one.comic_info.decision }}</span>
      </router-link>

      <!-- 换一批 -->
      <div
        class="iconfont icon-huanyipi"
        @click.stop="getOne(Math.floor(Math.random() * 8))"
      >
        &nbsp;&nbsp;换一批
      </div>
    </ul>
    <LoadingImg v-else></LoadingImg>
  </div>
</template>

<script>
//引入3D轮播图
import { Carousel3d, Slide } from "vue-carousel-3d";
import LoadingImg from "@/components/Lading/LoadingImg.vue";

export default {
  components: {
    Carousel3d,
    Slide,
    LoadingImg,
  },
  props: {
    slides: {
      type: Array,
      default: () => {
        return null;
      },
    },
    sex: {
      type: String,
      default: "热门",
    },
  },
  data() {
    return {
      mainlist: [],
      newlist: [],
      onelist: [],
      imageUrl: this.$store.state.hotColor,
      name: null,
    };
  },
  created() {
    this.getDate();
    this.getOne();
  },
  watch: {
    "$store.state.hotColor"(n) {
      // console.log(o,'old');
      // console.log(n, "new");
      this.imageUrl = n;
    },
  },

  methods: {
    onSlideChange(e) {
      // console.log(e, "--", this.$refs.carouser,this.slides[e].image_url);
      let hotColor = this.slides[e].image_url;
      if (hotColor !== undefined) {
        hotColor = "https://images.weserv.nl/?url=" + hotColor;
        this.$store.commit("changeHotColor", hotColor);
      }
    },
    async getDate(num = 1) {
      console.log(window.localStorage.getItem('homeActive'));
      await this.axios
        .get(`GetHomeSecondaryComics?moduleId=1012&pageNum=${num}&pageSize=6`)
        .then((re) => {
          // console.log("热门===>", re);
          this.mainlist = re.comics;
        });
      await this.axios
        .get("GetHomeSecondaryComics?moduleId=1018&pageNum=1&pageSize=9")
        .then((re) => {
          this.newlist = re.comics;
          // console.log(this.newlist);
        });
    },

    async getOne(num = 1) {
      await this.axios
        .get(`GetHomeSecondaryComics?moduleId=1065&pageNum=${num}&pageSize=6`)
        .then((re) => {
          this.onelist = re.comics;
        });
    },
    imgClick(obj) {
      console.log("img", obj);
    },
  },
  destroyed() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
  },
};
</script>

<style lang="scss" scoped>
.hot-nav {
  background-color: #fff;
  height: 100%;

  /* 轮播图 */
  .banner {
    width: 100%;
    height: 100%;
    position: relative;
    top: -41px;
    border:none;

    &::before {
      content: "";
      position: absolute;
      width: 98%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      top: -20px;
      // left: 50%;
      // transform: translateX(-50%);
      filter: blur(30px);
      background-image: var(--background);
      background-repeat: no-repeat;
      background-size: cover;
    }
    .carousel-3d-container {
      top: 20px;

      .carousel-3d-slide {
        border: none;
        outline: none;
        border-radius: 10px;
      }
      .item3d {
        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          top: 0;
          z-index: 1;
        }
      }

      .carousel-3d-slide.current {
        position: absolute;
        &::before {
          content: none;
        }
      }
    }
  }

  .hot {
    width: 100%;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    h3 {
      font-size: 15px;
    }

    p {
      color: gray;
      font-size: 12px;
      padding: 5px 0px;
    }
  }

  /* 今日热门速递 */
  .hot_main {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    li {
      width: 30%;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      padding: 10px 5px;
      overflow: hidden;

      img {
        width: 100%;
      }

      p {
        width: 100%;
        line-height: 20px;
        padding: 3px 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      span {
        font-size: 13px;
        color: gray;
      }
    }
  }

  .icon-huanyipi {
    width: 100%;
    text-align: center;
    line-height: 50px;
  }

  /* 新作飙升榜 */
  .new_main {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    li {
      width: 25%;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      padding: 10px 5px;
      position: relative;

      &:nth-child(1) {
        width: 100%;

        .img {
          width: 100%;
          height: 50vh;

          img {
            width: 100%;
          }
        }

        .num {
          width: 50px;
          font-size: 16px;
        }
      }

      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4),
      &:nth-child(5) {
        width: 50%;

        .num {
          width: 45px;
          font-size: 15px;
        }
      }

      .img {
        border-radius: 5px 0;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      p {
        width: 100%;
        line-height: 20px;
        padding: 3px 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      span {
        font-size: 13px;
        color: gray;
      }

      .num {
        width: 40px;
        line-height: 20px;
        font-size: 12px;
        text-align: center;
        background-color: #ec3a3e;
        color: #fff;
        border-radius: 5px;
        position: absolute;
        top: 10px;
        left: 5px;
        z-index: 8;
      }
    }
  }

  .load {
    // background-color: pink;
  }
}
</style>