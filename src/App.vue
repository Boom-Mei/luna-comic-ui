<template>
  <div id="app">
    <div class="video" v-if="$store.state.showVideo">
      <a href="https://www.bilibili.com/blackboard/manga/activity-2jXY8p7LYv.html">
        <!-- <video src="@/assets/video/advertise.mp4" autoplay loop muted></video> -->
        <img v-if="this.$store.state.showVideo" src="@/assets/image/advertise_.gif" />
        <!-- <video src="https://i0.hdslb.com/bfs/manga-static/82bb46c85d950f8675efb523ddc453fe57e8198c.mp4" autoplay loop muted></video> -->
      </a>
      <div class="clear" @click.stop="btn">跳过&nbsp;{{ timeNum }}</div>
    </div>

    <login-page v-if="$store.state.flag"></login-page>
    <!-- include和exclude指定是否缓存某些组件 -->
    <!-- include 指定多个组件缓存，语法是用逗号隔开  <keep-alive include="home,about" > -->
    <!-- exclude相当于include的反义词 -->
    <!-- 除了home组件和about组件别的都缓存  <keep-alive exclude="home,about" > -->
    <div class="app" v-else>
      <!-- <keep-alive include="home,my,bookshelf,details,sort" v-if="showNav"> -->
      <keep-alive v-if="showNav">
        <router-view v-if="$route.meta.keepAlive && showNav">
          <slot></slot>
        </router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive && showNav">
        <slot></slot>
      </router-view>
      <tab-nav v-if="!$route.meta.hideNav && showNav"></tab-nav>
      <div style="height: 50px" v-if="!$route.meta.hideNav"></div>
    </div>
  </div>
</template>

<script>
import TabNav from "@/components/TabNav.vue";
import LoginPage from "@/components/Login/LoginPage.vue";

export default {
  components: {
    TabNav,
    LoginPage
  },
  data() {
    return {
      timeNum: 5,
      showNav: false
    };
  },
  created() {
    this.advertise();
  },
  methods: {
    btn() {
      this.$store.commit("changeVideo", false);
      this.showNav = true;
    },
    advertise() {
      if (this.$store.state.showVideo) {
        // 倒计时关闭
        setInterval(() => {
          this.timeNum--;
          if (this.timeNum == 0) {
            this.showNav = true;
            this.$store.commit("changeVideo", false);
            this.timeNum = 5;
          }
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#app {

  // min-height: 100vh;
  // overflow-x: hidden;
  // background: url(@/assets/image/背景.jpg) no-repeat center;
  .app {
    min-height: 100vh;
  }
}

.video {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    width: 100vw;
  }

  img {
    width: 100vw;
  }

  .clear {
    font-size: 13px;
    color: #fff;
    width: 75px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    position: absolute;
    top: 3vw;
    right: 3vh;
  }
}
</style>