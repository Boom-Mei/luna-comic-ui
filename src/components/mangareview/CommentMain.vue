<template>
  <div class="comment-main">
    <!-- <h3>漫画评论</h3> -->
    <!-- {{ detailsid }} -->

    <ul v-if="comList" class="all">
      <li v-for="com in comList" :key="com.id">
        <!-- 头像 -->
        <div class="image">
          <img :src="com.face+ '@200w.jpg'" />
        </div>

        <!-- 内容 -->
        <div class="text">
          <div class="star">
            <span>
              {{ com.nick_name }}
            </span>
            <!-- 星星 -->
            <van-rate
              :value="com.score / 2"
              allow-half
              color="#ffd21e"
              void-icon="star"
              :size="15"
              readonly
            />
          </div>

          <p>
            {{ com.content }}
          </p>
          <!-- 点赞 -->
          <div class="dian" @click.stop="com.flag = !com.flag">
            <!-- <van-icon name="good-job" class="d" /> -->
            <van-icon name="good-job-o" size="18" :class="{ red: com.flag }" />

            {{ com.flag ? com.like_count + 1 : com.like_count }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    detailsid: {
      type: String,
      default: "31351",
    },
    review: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      comList: [],
      flag: false, //控制点赞
      sort: 1, //排序  1-时间 0-热度
      type: 0, //评论长短 0-短评 1-长评
    };
  },
  created() {
    this.getDate();
  },
  computed: {},
  methods: {
    async getDate() {
      if (this.review) {
        await this.axios
          .get(`ListReviews?sort=${this.sort}&comicId=${this.detailsid}`)
          .then((re) => {
            console.log("漫画点评========》", re);
            this.comList = re.reviews.map((v) => {
              v.flag = false;
              return v;
            });
          });
      } else {
        await this.axios
          .get("GetReviewDetailByComicID?comicId=" + this.detailsid)
          .then((re) => {
            this.comList = re.short_reviews.map((v) => {
              v.flag = false;
              return v;
            });
            //   Number.toFixed(1)  四舍五入后，保留小数点后一位
            console.log("漫画评论===>", this.comList);
          });
      }
    },
  },
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