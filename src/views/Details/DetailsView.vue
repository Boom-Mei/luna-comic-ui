<template>
  <div class="details" v-if="mainList.horizontal_cover">
    <!-- <h3>内容详情</h3> -->
    <!-- 头部 -->
    <van-sticky>
      <van-nav-bar
        title=""
        left-text=""
        left-arrow
        class="tab_main"
        :fixed="true"
        @click-left="onClickLeft"
        :border="false"
      >
        <template #right>
          <span
            class="iconfont icon-fenxiang"
            @click.stop="showShare = true"
          ></span>
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- banner图 -->
    <div class="banner">
      <van-image :src="mainList.horizontal_cover">
        <template v-slot:loading>
          <!-- <van-loading type="spinner" size="20" /> -->
          <img
            src="@/assets/image/加载失败.png"
            style="width: 375px,height: 200px"
          />
        </template>
      </van-image>
      <!-- <img :src="mainList.horizontal_cover" alt="" /> -->
      <!-- 追漫按钮 -->
      <div
        :class="['chase', { yes: flag }, { no: !flag }]"
        @click.stop="chase(mainList)"
      >
        {{ flag ? "已追" : "追漫" }}
      </div>
    </div>

    <!-- 漫画名 -->
    <h3>
      {{ name }}
    </h3>

    <!-- 评分星星 -->
    <div class="star">
      <span> {{ score }}</span>
      <van-rate
        v-model="value"
        allow-half
        color="#ffd21e"
        void-icon="star"
        :size="15"
        readonly
      />
      <em>阅读指数：</em>
      <span>{{ watch }}</span>
    </div>

    <!-- 连载中 -->
    <h6>连载中 &nbsp; {{ mainList.renewal_time }}</h6>

    <!-- 简介 -->
    <div :class="['text', { text_1: dow }, { text_2: !dow }]">
      <div class="header" v-if="mainList.author_name">
        <span>
          {{ mainList.author_name[0] }} ·
          {{ mainList.styles[0] || mainList.styles2[0] }} &nbsp; | &nbsp;
          已更新{{ mainList.last_short_title }}话
        </span>

        <span @click.stop="dow = !dow">
          {{ dow ? "查看简介" : "收起" }}
          <van-icon v-if="dow" name="arrow-down" />
          <van-icon v-else name="arrow-up" />
        </span>
      </div>

      <div class="worker">
        作者：<span v-for="(work, index) in mainList.author_name" :key="index">
          {{ work }} 、</span
        >
      </div>

      <div class="text_main">简介：{{ mainList.classic_lines }}</div>
    </div>

    <!-- 评论和推荐 -->
    <div class="comment" v-if="comList">
      <van-tabs scrollspy sticky>
        <van-tab title="互动点评">
          <div style="height: 10px"></div>
          <hr />
          <div class="c_top">
            <h3>漫画点评</h3>
            <span @click.stop="showDian = true">
              查看全部
              <van-icon name="arrow" />
            </span>
          </div>
          <comment-main :detailsid="detailsid"></comment-main>
          <!-- 讨论区 -->
          <div class="forum" v-if="num" @click.stop="showComment = true">
            <p>漫画讨论区</p>
            <span
              >{{ num }}条评论等你来看
              <van-icon name="arrow" />
            </span>
          </div>
          <div style="height: 10px"></div>
          <hr />
        </van-tab>
        <van-tab title="推荐漫画">
          <div class="c_top">
            <h3>更多推荐</h3>
          </div>
          <comic-list :page="page"></comic-list>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 开始阅读 -->
    <div class="read">
      <!-- 目录 -->
      <div class="left" @click.stop="showPopup">
        <van-icon name="description" color="gray" size="25" />
        <span>目录</span>
      </div>

      <ul class="top_all" v-if="mainList">
        <router-link
          tag="li"
          :to="`/content/${item.id}/${detailsid}`"
          v-for="(item, index) in chapter"
          :key="item.id"
        >
          {{
            index + 1 < 10
              ? "0" + "0" + (index + 1)
              : index + 1 && index + 1 < 100
              ? "0" + (index + 1)
              : index + 1
          }}
        </router-link>
      </ul>
      <router-link :to="`/content/${gainId}/${detailsid}`" v-if="gainId">
        <div class="right">{{ text }}</div>
      </router-link>
    </div>

    <!-- 目录列表 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
      <div class="box" v-if="mainList">
        <div class="title_top">
          <h3>全部章节({{ mainList.total }})</h3>
          <span>批量优惠</span>
        </div>
        <div class="money" @click.stop="who = true">
          <img src="@/assets/image/M.png" />
          &nbsp;
          <p>最新2话仅限漫币或通用券解锁</p>
          &nbsp;
          <van-icon name="question-o" size="16" />
        </div>
        <!-- 章节 -->
        <ul class="chapter" v-if="chapter">
          <router-link
            tag="li"
            :to="`/content/${cha.id}/${detailsid}`"
            v-for="cha in chapter"
            :key="cha.id"
            @click.stop="moveIn(cha)"
          >
            <img :src="cha.cover +'@200w.jpg'" />
            <div class="name_text">
              <p :class="{ active_true: cha.change }">
                {{ cha.ord }} &nbsp; {{ cha.title }}
              </p>
              <span>
                {{ cha.pub_time.substr(5, 5) }} &nbsp;
                <van-icon name="comment" /> {{ cha.comments }} &nbsp;
                <van-icon name="good-job" /> {{ cha.like_count }}
              </span>
            </div>
            <van-icon
              v-show="cha.change"
              name="location"
              class="xz"
              color="skyblue"
              size="15"
            />
          </router-link>
        </ul>

        <!-- 顺序 -->
        <div
          :class="['order', { s: orders }, { j: !orders }]"
          @click.stop="changOrder"
        >
          {{ orders ? "升序" : "降序" }}
        </div>
      </div>
    </van-popup>

    <!-- 疑问提示 -->
    <van-dialog
      v-model="who"
      showConfirmButton
      class="hint"
      confirmButtonText="知道了"
      confirm-button-color="blue"
    >
      <h3 style="textalign: center">说明</h3>
      <p>1.应版权方要求，该漫画最新2话仅限漫币或 通用券解锁。</p>
      <p>2.最新2话之前的话数支持漫读券或限免卡等 阅读道具解锁。</p>
      <p>
        3.每部漫画可支持的阅读道具不同，以作品
        购买页面为准，感谢各位对作者大大的支持~
      </p>
    </van-dialog>

    <!-- 提示登录 -->
    <van-dialog
      v-model="showhint"
      title="请先登录"
      show-cancel-button
      @confirm="confirm"
      @cancel="cancel"
    >
      <!-- <img src="https://img01.yzcdn.cn/vant/apple-3.jpg" /> -->
    </van-dialog>

    <!-- 分享 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />

    <!-- 漫画点评 -->
    <van-popup
      v-model="showDian"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      title="漫画点评"
      close-icon-position="top-left"
    >
      <ReviewsD
        :detailsid="detailsid"
        :value="value"
        :score="score"
        :name="name"
      ></ReviewsD>
    </van-popup>

    <!-- 讨论区列表 -->
    <van-popup
      v-model="showComment"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ShowComment :num="num" :detailsid="detailsid"></ShowComment>
    </van-popup>
    <!-- 底部 -->
  </div>
  <LoadingImg v-else></LoadingImg>
</template>

<script>
//https://apis.netstart.cn/bcomic/ComicDetail?comicId=31033

import CommentMain from "../../components/mangareview/CommentMain.vue";
import ComicList from "../../components/Multiplex/ComicList.vue";
//引入lodash库 使用其从数组中倒转
import _ from "lodash";
import ReviewsD from "../../components/mangareview/ReviewsD.vue";
import ShowComment from "../../components/mangareview/ShowComment.vue";
import LoadingImg from "@/components/Lading/LoadingImg.vue";

export default {
  components: { CommentMain, ComicList, ReviewsD, ShowComment, LoadingImg },
  props: {
    detailsid: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      mainList: [], //漫画内容
      comList: [], //漫画评论
      flag: false,
      dow: true,
      value: 3, //星星个数
      watch: 35, //阅读指数
      score: 7, //评分
      num: 0, //评论个数
      page: 0, //换一换
      show: false, //目录
      showComment: false, //讨论区
      chapter: [], //章节
      orders: true, //顺序
      who: false,
      showhint: false, //提示登录
      showShare: false, //分享
      name: "", //漫画名字
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
      showDian: false,
      gainId: 0, //默认开始阅读第一章
      jumpName: "home",
      text: "开始阅读",
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log("------");
  //   console.log(to, from);
  //   let name = from.name;
  //   if (name == "content") {
  //     next();
  //     return;
  //   }
  //   localStorage.setItem("beforeName", name);
  //   console.log("------");
  //   next();
  // },
  created() {
    this.getDate();
    this.check();
    this.changeColor();
  },
  mounted() {
    this.getDate();
    this.changeColor();
  },
  afterEach() {
    this.changeColor();
  },
  watch: {
    // "$store.state.bookList"() {},
    // "$store.state.Login"(){
    // }
    flag() {
      console.log(this.flag, "this.flag");
    },
    "$store.state.historyList"() {
      this.check();
    },
  },
  methods: {
    async getDate() {
      await this.axios
        .get("ComicDetail?comicId=" + this.detailsid)
        .then((re) => {
          console.log("漫画详情===>", re);
          this.$store.commit("addImgSrc", re.vertical_cover);
          this.mainList = re;
          //添加历史记录
          // this.$store.commit("addHistory", re);
          this.name = this.mainList.title;
          this.chapter = _.reverse(
            re.ep_list.map((v) => {
              v.change = false;

              return v;
            })
          );

          //默认第一章
          this.gainId = this.chapter[0].id;
          this.check();
        });
      await this.axios
        .get("GetReviewDetailByComicID?comicId=" + this.detailsid)
        .then((re) => {
          this.comList = re;
          this.score = re.score.toFixed(1);
          this.value = this.score / 2;
          this.watch = (re.watch / 10000).toFixed(1) + "万";
          //   Number.toFixed(1)  四舍五入后，保留小数点后一位
          //   console.log("漫画评论===>", this.comList);
        });
      await this.axios.get("ReplyMain?oid=" + this.detailsid).then((re) => {
        console.log("11111", re);
        let num = re;
        if (num.cursor.all_count != undefined) {
          this.num = re.cursor.all_count;
        }
      });
    },
    //判断是否看过这本书
    check() {
      let arr = this.$store.state.historyList;
      arr.forEach((i) => {
        if (i.id == this.detailsid) {
          console.log(i.chapterID, i.title);
          this.gainId = i.chapterID;
          this.text = "继续观看";
        }
      });
    },
    /* 返回 */
    onClickLeft() {
      // let name = window.localStorage.getItem("beforeName");
      // if (name == "null") {
      //   // window.history.back(-1);
      //   window.history.go(-1);
      //   return;
      // }
      // this.$router.push({ name: name });
      this.$router.back() 
    },

    /* 追漫 */
    chase(obj) {
      //判读是否已经登录
      if (!this.$store.state.Login) {
        this.showhint = true;
        return;
      }

      //当高亮时点击删除漫画
      if (this.flag) {
        this.removeList();
      } else {
        //当未高亮时点击添加漫画

        this.addList(obj);
      }
      this.flag = !this.flag;
    },
    addList(obj) {
      this.$store.commit("addBook", obj);
    },
    removeList() {
      this.$store.commit("removeBook", this.detailsid);
    },
    /* 修改追漫高亮 */
    changeColor() {
      this.$store.state.bookList.forEach((item) => {
        if (item.id == this.detailsid) {
          this.flag = true;
          console.log(item.id, this.detailsid, this.flag);
        }
      });
      console.log(
        this.$store.state.bookList,
        "--------bookList--------",
        this.flag
      );
    },

    onClose() {
      this.show = false;
    },
    showPopup() {
      this.show = true;
      console.log("???");
    },
    changOrder() {
      this.orders = !this.orders;
      if (!this.orders) {
        this.chapter = _.reverse(this.chapter);
      } else {
        this.chapter = _.reverse(this.chapter);
      }
      console.log("顺序==》", this.chapter);
    },

    /* 点击目录按钮 */
    moveIn(value) {
      value.change = true;
      console.log("点击了没", value);
      // this.gainId = value.id;
      console.log(this.chapter);
    },
    /* 提示登录 */
    cancel() {
      console.log("取消！！");
    },
    confirm() {
      console.log("确定~");
      this.$store.commit("changeFlag", true);
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
.details {
  background-color: #fff;

  /* 提示 */
  .hint {
    p {
      font-size: 12px;
      padding: 1px 10px;
    }
  }

  .tab_main {
    background-color: rgba(255, 255, 255, 0.1);

    .icon-fenxiang {
      color: gray;
      font-size: 18px;
    }
  }

  .banner {
    position: relative;

    img {
      width: 100%;
    }

    .chase {
      position: absolute;
      bottom: -5px;
      right: 20px;
      height: 40px;
      line-height: 43px;
      width: 80px;
      font-size: 16px;
      padding-left: 35px;
      color: #fff;
      border-radius: 20px 5px 20px 5px;
    }

    .yes {
      background: url(@/assets/image/亮星星.png) no-repeat;
      background-size: 25px;
      background-position: 8px center;
      background-color: #fd9c0f;
    }

    .no {
      background: url(@/assets/image/黑星星.png) no-repeat;
      background-size: 25px;
      background-position: 8px center;
      background-color: #fd9c0f;
    }
  }

  h3 {
    font-size: 18px;
    margin: 10px 10px;
    font-weight: normal;
  }

  h6 {
    font-size: 13px;
    margin: 10px 10px;
    font-weight: normal;
  }

  /* 星星 */
  .star {
    margin-left: 10px;
    line-height: 15px;

    span {
      font-size: 12px;
      margin-right: 3px;
    }

    em {
      font-size: 12px;
      margin-left: 20px;
      color: gray;
    }
  }

  /* 简介 */
  .text {
    margin: 10px;
    font-size: 12px;
    color: gray;
    overflow: hidden;

    .header {
      display: flex;
      justify-content: space-between;
      margin: 5px 0;
    }

    .worker {
      margin: 10px 0;
    }

    .text_main {
      padding-left: 36px;
      text-indent: -36px; //文字缩进
      letter-spacing: 2px; //文字间距
    }
  }

  .text_1 {
    height: 20px;
  }

  .text_2 {
    height: auto !important;
  }

  /* 漫画点评 */
  .comment {
    margin: 10px;

    .van-tabs__line {
      z-index: 0 !important;
      color: skyblue;
    }

    .c_top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 12px;
        color: gray;
        padding-right: 8px;
      }
    }

    h3 {
      font-size: 16px;
    }

    /* 讨论区 */
    .forum {
      background-color: #f5f6f8;
      width: 98%;
      margin: 0 auto;
      font-size: 16px;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-radius: 10px;
      margin: 10px auto;

      span {
        font-size: 12px;
        color: gray;
      }
    }
  }

  /* 开始阅读 */
  .read {
    height: 50px;
    width: 100vw;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0px 0px 5px 1px grey;
    display: flex;
    justify-content: space-between;

    .left {
      width: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 1px 0px 5px 2px #f5f6f8;

      span {
        font-size: 12px;
      }
    }

    .top_all {
      height: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      overflow-x: auto;
      margin-left: 3px;

      li {
        width: 80px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        text-align: center;
        background-color: #f5f6f8;
        margin: 0 10px;
        padding: 0 20px;
      }
    }

    .right {
      width: 100px !important;
      height: 100%;
      color: white;
      background-color: #31a9fe;
      text-align: center;
      line-height: 50px;
      font-size: 13px;
    }
  }

  .box {
    background-color: #fff;
    width: 100vw;
    overflow-y: auto;
    overflow-x: hidden;

    // position: relative;
    .title_top {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;

      h3 {
        font-size: 16px;
        text-align: center;
      }

      span {
        width: 60px;
        height: 25px;
        line-height: 25px;
        background-color: #fe9d10;
        color: #fff;
        border-radius: 18px;
        font-size: 11px;
        margin-left: 10px;
        text-align: center;
      }
    }

    /* M */
    .money {
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;
      margin-left: 10px;

      img {
        width: 16px;
      }

      p {
        font-size: 13px;
      }
    }

    .order {
      width: 50px;
      height: 50px;
      border: 1px solid skyblue;
      border-radius: 50%;
      font-size: 12px;
      line-height: 70px;
      text-align: center;
      color: gray;
      position: fixed;
      bottom: 20px;
      right: 20px;
    }

    .s {
      background: url(@/assets/image/升序.png) no-repeat;
      background-size: 20px 15px;
      background-position: center 10px;
    }

    .j {
      background: url(@/assets/image/降序.png) no-repeat;
      background-size: 20px 15px;
      background-position: center 10px;
    }

    .chapter {
      // width: 100%;
      margin-left: 10px;

      li {
        // width: 100%;
        height: 80px;
        margin: 5px;
        // border: 1px solid skyblue;
        display: flex;

        img {
          height: 100%;
          margin-right: 5px;
        }

        .name_text {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 5px;

          p {
            font-size: 14px;
          }

          span {
            font-size: 13px;
            color: #ccc;
          }

          .active_true {
            color: skyblue;
          }
        }

        .xz {
          padding-top: 10px;
          width: 20px;
          // border: 1px solid red;
        }
      }
    }
  }
}
</style>