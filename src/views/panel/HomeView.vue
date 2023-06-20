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
      <van-tabs @scroll="scrollTop" v-model="active" sticky animated :background="active == '推荐'
        ? $store.state.recommendColor
        : active == '热门' && scrolltop < 100
          ? 'rgba(0,0,0,0)'
          : '#F8F9F9'
        " :color="'rgba(0,0,0,0)'" title-active-color="skyblue" title-inactive-color="#303133" :border="false"
        @click="onClick" ref="tab">
        <van-tab title="热门" name="热门" class="reMen">
          <hot-nav :bannerList="bannerList" :sex="sex"></hot-nav>
        </van-tab>
        <van-tab title="推荐" name="推荐">
          <recommend-nav></recommend-nav>
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

export default {
  name: "HomeView",
  components: {
    HotNav,
    RecommendNav,
    SexNav,
  },
  props: {},
  data() {
    return {
      active: "",
      // 热门轮播图地址
      bannerList: null,
      // 男生
      boy: 263,
      // 女生
      girl: 262,
      sex: "",
      scrolltop: 0
    };
  },
  // mounted可以访问DOM元素，适合DOM完全加载后的所有操作
  // mounted() {
  //   this.getData();
  // },
  // created不可以访问DOM元素，适合访问API
  created() {
    this.getData();
  },
  watch: {
    active() {
      let name = window.localStorage.getItem("homeActive");
      if (name) {
        this.active = name;
        if (name == "男生" || name == "女生") {
          this.sex = name;
        }
      }
    },
  },
  methods: {
    async getData() {
      // this.$axios.post("/banner/list", {
      //   type: 1,
      //   pageNo: 1,
      //   pageSize: 3
      // })

      // this.$axios({
      //   url: "/banner/list",
      //   method: "get",
      //   params: {
      //     type: 1,
      //     pageNo: 1,
      //     pageSize: 3
      //   }
      // })

      await this.$axios.get("/banner/list", {
        params: {
          type: 1,
          pageNo: 1,
          pageSize: 3
        }
      })
        .then((data) => {
          // data是请求返回
          // data.data是请求返回的数据信息
          this.bannerList = data.data.data.dataList;
        })
    },
    onClick(name, title) {
      // this.$toast(title);
      localStorage.setItem("homeActive", name);
      this.sex = title;
    },
    scrollTop(e) {
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
    }
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