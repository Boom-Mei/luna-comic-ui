<template>
  <div class="show-comment">
    <h3>讨论区({{ num }})</h3>
    <h6>热门评论</h6>
    <!-- 评论内容 -->
    <ul v-if="todoList" class="manga">
      <li v-for="user in todoList" :key="user.rpid">
        <!-- 头像 -->
        <img :src="user.member.avatar+ '@100w.jpg'" />

        <div class="right_text">
          <!-- 名字 -->
          <div class="name">
            <p>{{ user.member.uname }}</p>
            <span>{{
              new Date(user.member.vip.vipDueDate).getFullYear() +
              "-" +
              (new Date(user.member.vip.vipDueDate).getMonth() + 1) +
              "-" +
              new Date(user.member.vip.vipDueDate).getDate()
            }}</span>
          </div>
          <!-- 评论内容 -->
          <div class="content">
            <p :class="{'expand':expand}">{{ user.content.message }}</p>
            <!-- 图标 -->
            <div class="tu">
              <span>
                <van-icon name="good-job-o" size="18" />&nbsp;
                <p>{{ user.like }}</p></span
              >
              <span>
                <van-icon name="comment-o" size="18" />&nbsp;
                <p>{{ user.rcount }}</p>
              </span>
              <span><van-icon name="share-o" size="18" /></span>
            </div>
          </div>
          <!-- 回复内容 -->
          <ul class="reply">
            <li v-for="man in user.replies" :key="man.rpid">
              <p>
                <span>{{ man.member.uname }}</span
                >{{ man.content.message }}
                <img
                  src="http://i0.hdslb.com/bfs/emote/6ea59c827c414b4a2955fe79e0f6fd3dcd515e24.png"
                  alt=""
                />
              </p>
            </li>
            <li>
              <span>共{{ user.rcount }}条回复<van-icon name="arrow" /></span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0,
    },
    detailsid: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      todoList: [], //评论列表
      page: 10, //分页大小
      mode: 3, //排序 1-默认，2-最新，3-热门
      expand:false,//展开
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    async getDate() {
      await this.axios
        .get(
          `ReplyMain?oid=${this.detailsid}&mode=${this.mode}&ps=${this.page}`
        )
        .then((re) => {
          //   console.log(re);
          this.todoList = re.replies;
          console.log(this.todoList);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.show-comment {
  h3 {
    font-size: 15px;
    height: 45px;
    line-height: 53px;
    text-align: center;
    font-weight: normal;
    border-bottom: 1px solid #ccc;
  }
  h6 {
    font-size: 13px;
    font-weight: normal;
    margin: 10px;
  }

  .manga {
    width: 100%;
    overflow: auto;
    li {
      flex: 1;
      //   border: 1px solid red;
      display: flex;
      padding: 10px;

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .right_text {
        flex: 1;
        font-size: 14px;
        .name {
          span {
            font-size: 12px;
            color: #ccc;
          }
        }

        .content {
          font-size: 15px;
          color: black;
          margin: 10px 0;
          /* 图标 */
          .tu {
            margin: 10px 0 15px 0;
            display: flex;

            span {
              display: flex;
              margin-right: 20px;
              font-size: 12px;
              color: #90939b;
              text-align: center;
            }
          }
          p {
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
          }

          .expand {
            display: block;
          }
        }

        .reply {
          display: flex;
          flex-direction: column;
          background-color: #f5f6f8;
          span {
            color: skyblue;
            white-space: nowrap;
          }
          p {
            display: -webkit-box;
            width: 298px;
            height: 40px;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;

            img {
              height: 20px;
              width: auto;
            }
          }

          li {
            width: 100%;
            padding: 5px;
          }
        }
      }
    }
  }
}
</style>