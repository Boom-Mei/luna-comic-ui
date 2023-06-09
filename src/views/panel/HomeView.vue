<template>
  <div class="home" ref="home" :style="{
    backgroundColor:
      active == '推荐'
        ? $store.state.recommendColor
        : active == '热门'
          ? 'rgba(0,0,0,0)'
          : '#fff',

    '--backgroundImage':
      active == '热门' ? `url(${$store.state.hotColor})` : null,
  }">
    <div class="header" :style="{
      backgroundColor:
        active == '推荐'
          ? $store.state.recommendColor
          : active == '热门'
            ? 'rgba(0,0,0,0)'
            : null,

      '--backgroundImage':
        active == '热门' ? `url(${$store.state.hotColor})` : null,
      paddingTop: '10px',
      paddingBottom: '5px',
    }">
      <div class="top_h">
        <img class="logo" src="@/assets/image/logo.png" />
        <!-- 搜索按钮 -->
        <router-link tag="div" to="/search" class="ss"> </router-link>
      </div>
    </div>

    <!-- 头部导航 -->
    <div class="tablist">
      <van-tabs @scroll="scrollTop" v-model="active" sticky animated :background="
        active == '推荐'
          ? $store.state.recommendColor
          : active == '热门' && scrolltop < 100
            ? 'rgba(0,0,0,0)'
            : '#F8F9F9'
      " :color="'rgba(0,0,0,0)'" title-active-color="skyblue" title-inactive-color="#303133" :border="false"
        @click="onClick" ref="tab">
        <van-tab title="热门" name="热门" class="reMen">
          <hot-nav :slides="slides" :sex="sex"></hot-nav>
        </van-tab>
        <van-tab title="推荐" name="推荐">
          <recommend-nav></recommend-nav>
          <ToDo v-if="todoList.length" :todoList="todoList"></ToDo>
          <LoadingImg v-else></LoadingImg>
          <div class="more" @click.stop="addMore">加载更多...</div>
        </van-tab>
        <van-tab title="男生" name="男生">
          <sex-nav :sex="sex"></sex-nav>
        </van-tab>
        <van-tab title="女生" name="女生">
          <sex-nav :sex="sex"></sex-nav>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import HotNav from "@/components/Nav/HotNav.vue";
import RecommendNav from "@/components/Nav/RecommendNav.vue";
import SexNav from "@/components/Nav/SexNav.vue";
import ToDo from "@/components/Multiplex/ToDo.vue";
import LoadingImg from "@/components/Lading/LoadingImg.vue";

export default {
  name: "HomeView",
  components: {
    HotNav,
    RecommendNav,
    SexNav,
    ToDo,
    LoadingImg,
  },
  props: {},
  data() {
    return {
      active: "",
      // 热门轮播图地址
      slides: null,
      // 推荐轮播图
      bannerList: null,
      // 男生
      boy: 263,
      // 女生
      girl: 262,
      sex: "",
      todoList: [],
      page: 2,
      scrolltop: 0
    };
  },
  mounted() {
    this.getDate();
  },
  created() {
    this.getDate();
  },
  watch: {
    active() {
      let name = window.localStorage.getItem("homeActive");
      if (name) {
        console.log("监听active", name);
        this.active = name;
        if (name == "男生" || name == "女生") {
          this.sex = name;
        }
      }
    },
  },
  methods: {
    async getDate(offset = 10) {
      await this.axios.get("GetClassPageHomeBanner?id=1145").then((data) => {
        // this.slides = data.banner;
        this.slides = data.banner.map((v) => {
          if (v.jump_url.indexOf("detail" != -1)) {
            v.numID = v.jump_url.match(/\d+/g)[0];
          }
          return v;
        });
        console.log("热门banner===>", this.slides);
      });
      this.axios.get("HomeFeed?pageNum=1&pageSize=10").then((data) => {
        this.todoList = data.feeds;
        this.todoList = this.todoList.slice(0, offset);
      });
    },
    onClick(name, title) {
      // this.$toast(title);
      localStorage.setItem("homeActive", name);
      console.log(name);
      this.sex = title;
    },
    addMore() {
      this.page++;
      let offset = 10 * (this.page - 1);
      this.getDate(offset);
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    },
    scrollTop(e) {
      console.log(e);
      let top = e.scrollTop;
      this.scrolltop = top;
      if (top > 100) {
        this.$store.commit("changeColor", "#F8F9F9");
        if (this.active == "热门") {
          this.$refs.home.style.backgroundColor = "#fff";
        }
      } else {
        this.$store.commit("changeColor", "#fff");
        if (this.active == "热门") {
          this.$refs.home.style.backgroundColor = "rgba(0,0,0,0)";
        }
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.home {
  // background-color: white;

  .tablist {
    .van-tab--active {
      background-color: red;
    }
  }

  .whiteBox {
    filter: blur(30px);
  }

  .more {
    background-color: #fff;
    text-align: center;
    font-size: 14px;
    color: gray;
    height: 40px;
  }

  .header {
    width: 100%;
    height: 100%;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      // background-color: red;
      background-image: var(--backgroundImage);
      background-repeat: no-repeat;
      background-size: cover;
      z-index: -1;
      filter: blur(30px);
    }

    .top_h {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 26px;
        margin-right: 10px;
      }

      .ss {
        width: 80%;
        height: 26px;
        border: 1px solid rgba(223, 217, 217, 0.3);
        background-image: url(@/assets/image/搜索.png) !important;
        background-position: 98% center;
        background-repeat: no-repeat;
        background-size: 25px;
        border-radius: 10px;
        background-color: rgba(191, 185, 185, 0.1);
        // opacity: .3;
      }
    }
  }
}
</style>