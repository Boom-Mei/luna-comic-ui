<template>
  <div class="comment-main">
    <!-- <h3>漫画评论</h3> -->

    <ul v-if="commentList" class="all">
      <li v-for="comment in commentList" :key="comment.id">
        <!-- 头像 -->
        <div class="image">
          <!-- todo: 这个头像怎么办 -->
          <img :src="comment.face" />
        </div>

        <!-- 内容 -->
        <div class="text">
          <div class="star">
            <span>
              {{ comment.userName }}
            </span>
            <!-- 星星 -->
            <van-rate :value="comment.score / 2" allow-half color="#ffd21e" void-icon="star" :size="15" readonly />
          </div>

          <p>
            {{ comment.content }}
          </p>
          <!-- 点赞 -->
          <div class="dian" @click.stop="comment.flag = !comment.flag">
            <!-- <van-icon name="good-job" class="d" /> -->
            <van-icon name="good-job-o" size="18" :class="{ red: comment.flag }" />
            {{ comment.flag ? comment.like + 1 : comment.like }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    bookId: {
      type: String,
      default: "1"
    },
    review: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      commentList: [],
      // 控制点赞
      flag: false,
      // 排序：0-热度，1-时间
      sort: 1,
      // 评论长短：0-短评，1-长评
      type: 0
    };
  },
  created() {
    this.getData();
  },
  computed: {},
  methods: {
    async getData() {
      await this.$axios.get("/comment/list", {
        params: {
          bookId: this.bookId,
          type: 1,
          pageNo: 1,
          pageSize: this.review ? 20 : 2
        }
      })
        .then((data) => {
          // data是请求返回
          // data.data是请求返回的数据信息
          this.commentList = data.data.data.dataList;
          this.commentList = this.commentList.map((v) => {
            v.face = "http://i0.hdslb.com/bfs/emote/6ea59c827c414b4a2955fe79e0f6fd3dcd515e24.png";
            v.score = 9.2;
            v.flag = false;
            return v;
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-main {
  .all {
    width: 100%;
    display: flex;
    flex-direction: column;

    li {
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