<template>
  <div class="recommend-nav" v-if="bannerList.length">
    <!-- <h2>推荐</h2> -->

    <!-- 轮播图 -->
    <div class="banner" v-if="bannerList">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="onChange">
        <van-swipe-item v-for="banner in bannerList" :key="banner.id" :style="{ background: $store.state.recommendColor }"
          class="item">
          <a tag="a" :href="banner.jumpUrl" v-if="banner.jumpUrl" class="box">
            <van-image :src="banner.picUrl" class="img">
              <template v-slot:loading>
                <!-- <van-loading type="spinner" size="20" /> -->
                <img src="@/assets/image/没有.png" />
              </template>
            </van-image>
          </a>
          <router-link v-else tag="a" :to="`/details/${banner.bookId}`" class="box">
            <van-image :src="banner.picUrl" class="img">
              <template v-slot:loading>
                <!-- <van-loading type="spinner" size="20" /> -->
                <img src="@/assets/image/没有.png" />
              </template>
            </van-image>
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

    <!-- 书籍列表 -->
    <ToDo v-if="bookList.length" :bookList="bookList"></ToDo>
    <LoadingImg v-else></LoadingImg>
    <div class="more" @click.stop="addMore">加载更多...</div>
  </div>
</template>

<script>
import ToDo from "@/components/Multiplex/ToDo.vue";
import LoadingImg from "@/components/Lading/LoadingImg.vue";

export default {
  components: {
    ToDo,
    LoadingImg
  },
  props: {},
  data() {
    return {
      close: true,
      bannerList: [],
      bookList: [],
      page: 1
    };
  },
  mounted() { },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      await this.$axios.get("/api/banner/list", {
        params: {
          type: 2,
          pageNo: 1,
          pageSize: 3
        }
      })
        .then((data) => {
          this.bannerList = data.data.data.dataList;
        });
      await this.$axios.get("/api/book/list", {
        params: {
          pageNo: this.page,
          pageSize: 10
        }
      })
        .then((data) => {
          this.bookList = data.data.data.dataList;
          if (this.bookList.length == 0) {
            this.$toast("没有更多了~");
            return;
          }
        });
    },
    addMore() {
      if (this.page >= 3) {
        this.$toast("没有更多了~");
        return;
      }
      this.page++;
      this.$axios.get("/api/book/list", {
        params: {
          pageNo: this.page,
          pageSize: 10
        }
      })
        .then((data) => {
          let arr = data.data.data.dataList;
          if (arr.length == 0) {
            this.$toast("没有更多了~");
            return;
          }
          this.bookList.push(...arr);
        });
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    },
    onChange(index) {
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
      // 文字间距
      letter-spacing: 1px;

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

  .more {
    background-color: #fff;
    text-align: center;
    font-size: 14px;
    color: gray;
    height: 40px;
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