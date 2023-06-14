<template>
  <div class="reviews-d">
    <!-- <h3>漫画点评</h3> -->

    <div class="header">
      <h3>
        {{ name }}
      </h3>
      <div class="top">
        <div class="left">
          <span> {{ score }}</span>
          <div class="xx">
            <p>综合评分</p>
            <van-rate v-model="num" allow-half color="#ffd21e" void-icon="star" :size="15" readonly />
          </div>
        </div>

        <div class="com" @click.stop="showDian = true">
          <span class="iconfont icon-bianji"></span>
          评价
        </div>
      </div>
    </div>

    <div class="mycom" v-if="mycomment.nick_name">
      <div class="item">
        <!-- 头像 -->
        <div class="image">
          <img src="@/assets/image/头像.gif" />
        </div>
        <!-- 内容列表 -->
        <div class="text">
          <div class="star">
            <span>
              {{ mycomment.nick_name }}
            </span>
            <!-- 星星 -->
            <van-rate :value="mycomment.score / 2" allow-half color="#ffd21e" void-icon="star" :size="15" readonly />
          </div>
          <!-- 评论内容 -->
          <p>
            {{ mycomment.content }}
          </p>
          <!-- 点赞 -->
          <div class="dian" @click.stop="mycomment.flag = !mycomment.flag">
            <!-- <van-icon name="good-job" class="d" /> -->
            <van-icon name="good-job-o" size="18" :class="{ red: mycomment.flag }" />
            {{
              mycomment.flag ? mycomment.like_count + 1 : mycomment.like_count
            }}
          </div>
        </div>
      </div>
    </div>

    <!-- 发表评论 -->
    <van-popup v-model="showDian" closeable position="bottom" :style="{ height: '100%' }" title="发表评论"
      close-icon="arrow-left" close-icon-position="top-left">
      <PostComment :name="name" @postText="postText"></PostComment>
    </van-popup>

    <div class="main">
      <!-- 评论内容 -->
      <CommentMain :bookId="bookId" :review="review"></CommentMain>
    </div>
  </div>
</template>

<script>
import CommentMain from "./CommentMain.vue";
import PostComment from "./PostComment.vue";

// ListReviews?comicId=
export default {
  components: {
    CommentMain,
    PostComment
  },
  props: {
    bookId: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    value: {
      type: Number,
      default: 3
    },
    score: {
      default: 7
    }
  },
  data() {
    return {
      commentList: [],
      num: this.value,
      // 评分
      // score: 7,
      // 排序：0-热度，1-时间
      // sort: 1,
      review: true,
      // 发表评论
      showDian: false,
      // 我的评论
      mycomment: []
    };
  },
  created() {
    // this.getData();
  },
  watch: {
    postText() {
      this.getData();
    }
  },
  methods: {
    async getData() {
      await this.$axios.get("/api/comment/list", {
        params: {
          bookId: this.bookId,
          type: 1,
          pageNo: 1,
          pageSize: 20
        }
      })
        .then((data) => {
          this.commentList = data.data.data.dataList;
        });
    },
    postText(obj) {
      this.mycomment = obj;
      this.showDian = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.reviews-d {
  .header {
    height: 130px;
    font-size: 14px;
    background-color: #41334a;
    color: #fff;
    margin-bottom: 10px;

    h3 {
      height: 45px;
      line-height: 53px;
      text-align: center;
      font-weight: normal;
    }

    .top {
      margin: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: flex;

        span {
          font-size: 40px;
        }

        .xx {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 15px;
        }
      }

      .com {
        width: 85px;
        height: 36px;
        font-size: 16px;
        line-height: 36px;
        color: #fff;
        border: 1px solid;
        border-radius: 20px;
        text-align: center;
        background-color: #695c6d;
      }
    }
  }

  .main {
    padding: 0 10px;
  }

  .mycom {
    padding: 0 10px;
    width: 100%;
    display: flex;
    flex-direction: column;

    .item {
      width: 100%;
      // height: 90px;
      display: flex;
      font-size: 13px;

      // border: 1px solid red;
      .image {
        width: 35px;
        height: 100%;

        img {
          width: 100%;
          border-radius: 50%;
        }
      }

      .text {
        flex: 1;
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        letter-spacing: 1px; //文字间距
        background-color: rgba(0, 0, 0, .2);
        border-radius: 5px;

        .star {
          height: 15px;
          margin: 3px 0;
        }

        p {
          width: 300px;
          margin: 5px 0;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .dian {
          height: 15px;
          margin: 3px 0;

          .d {
            color: skyblue;
          }
        }

        .red {
          color: red;
        }
      }
    }
  }
}
</style>