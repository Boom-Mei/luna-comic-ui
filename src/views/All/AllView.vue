<template>
  <div class="all">
    <!-- <h3>查看全部</h3> -->
    <van-sticky>
      <van-nav-bar
        :title="allname"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        class="title_top"
        :border="false"
      />
    </van-sticky>
    <ul v-if="alList" class="all_main">
      <router-link
        tag="li"
        :to="`/details/${item.item_id}`"
        v-for="item in alList"
        :key="item.item_id"
      >
        <!-- 左边头像 -->
        <div class="avatar">
          <img :src="item.image" v-lazy="item.image" />
        </div>
        <!-- 右边内容 -->
        <div class="text">
          <p>{{ item.title }}</p>
          <span v-if="item.comic_info.decision">{{
            item.comic_info.decision
          }}</span>
          <span v-if="item.comic_info.lastest_short_title">{{
            "更新至" + item.comic_info.lastest_short_title + "话"
          }}</span>
        </div>
      </router-link>
    </ul>

    <!-- 加载中... -->
    <van-loading
      class="load"
      type="spinner"
      size="24px"
      text-size="18px"
      color="skyblue"
      style="textalign: center"
      v-else
      >加载中...
    </van-loading>
    <div class="bottom_tab">
      <van-pagination
        v-if="alList.length"
        v-model="currentPage"
        :total-items="24"
        :items-per-page="5"
        @change="changeDate"
        @black="'#000'"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allid: {
      type: String,
      default: "0",
    },
    allname: {
      type: String,
      default: "全部",
    },
  },
  data() {
    return {
      alList: [],
      currentPage: 1,
    };
  },
  created() {
    this.getDate();
  },
  mounted() {
    this.getDate(this.currentPage);
    this.currentPage;
  },
  // beforeRouteEnter(){
  // this.getDate()

  // },
  // beforeRouteUpdate() {
  // this.getDate()
  // },
  methods: {
    /* 获取数据 */
    getDate() {
      this.axios
        .get(
          `GetHomeSecondaryComics?moduleId=${this.allid}&pageNum=${this.currentPage}&pageSize=10`
        )
        .then((re) => {
          this.alList = re.comics;
          console.log(this.alList);
        });
    },
    /* 返回 */
    onClickLeft() {
      // window.history.go(-1);
      window.history.back();
    },

    /* 分页 */
    changeDate() {
      this.getDate(this.currentPage);
    },
  },
};
</script>

<style lang="scss" scoped>
.all {
  background-color: #fff;
  position: relative;

  /* 头部 */
  .title_top {
    // background-color: pink;
  }

  /* 加载 */
  .load {
    // background-color: pink;
  }

  /* 内容 */
  .all_main {
    width: 100%;
    display: flex;
    flex-direction: column;

    li {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      font-size: 14px;
      margin-bottom: 5px;

      .avatar {
        height: 100%;
        width: 20%;
        margin-right: 10px;

        img {
          width: 100%;
        }
      }

      .text {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p {
          margin: 5px 0;
        }

        span {
          font-size: 13px;
          color: gray;
        }
      }
    }
  }

  /* 分页 */
  .bottom_tab {
    width: 100%;
    position: absolute;
    bottom: -50px;
    text-align: center;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    .van-pagination {
      width: 100%;
    }
  }
}
</style>