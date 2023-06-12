<template>
  <!-- <h3>漫画阅读</h3> -->

  <div class="content">
    <!-- 漫画内容 -->
    <ul v-if="picList" class="over" @click.stop="showPopup" ref="ul">
      <!-- <p>往后看吧，前面没有了标签(～￣▽￣)～</p> -->

      <li v-for="(img, index) in picList" :key="index">
        <img :src="img.picUrl" v-lazy="img.picUrl" v-if="picList.length > 1" />
        <LoadingImg v-else></LoadingImg>
      </li>
    </ul>

    <!-- bottom 菜单 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '15%' }" :overlay="false" class="btnBottom"
      :lock-scroll="false">
      <div class="c_top">
        <!-- 上一话 -->
        <span :style="[
          {
            color:
              chapterOrder == 1 ? (color = 'gray') : (color = '#fff')
          }
        ]" @click.stop="beforeChapter">上一话</span>
        <!-- 拖动条/进度条 -->
        <van-slider @change="onChange" @input="onInput" v-model="value" :min="0" :max="100" step="1" button-size="18px"
          bar-height="4px" active-color="skyblue" inactive-color="gray" />

        <!-- 下一话 -->
        <span :style="[
          // {
          //   color:
          //     chapterOrder == this.chapterList.length - 1
          //       ? (color = 'gray')
          //       : (color = '#fff'),
          // },
          {
            color: color = '#fff'
          }
        ]" @click.stop="nextChapter">下一话</span>
      </div>

      <div class="c_bottom">
        <!-- 追漫 -->
        <div @click.stop="chase">
          <div :class="['chase', { yes: flag }, { no: !flag }]"></div>
          <p>
            {{ flag ? "已追" : "追漫" }}
          </p>
        </div>

        <!-- 评论 -->
        <div class="item">
          <van-icon name="chat-o" badge="99+" color="#fff" size="25" />
          <p>评论</p>
        </div>

        <!-- 设置 -->
        <div class="item" @click.stop="showSetup = true">
          <van-icon name="setting-o" color="#fff" size="25" />
          <p>设置</p>
        </div>

        <!-- 章节 -->
        <div class="item" @click.stop="changeChapter">
          <van-icon name="description" color="#fff" size="25" />
          <p>章节</p>
        </div>
      </div>
    </van-popup>

    <!-- top 菜单 -->
    <van-popup v-model="show" position="top" :style="{ height: '7%' }" :overlay="false" class="btnTop"
      :lock-scroll="false">
      <!-- 返回 -->
      <van-icon name="arrow-left" color="#fff" @click.stop="onClickLeft" />

      <!-- 标题 -->
      <p>&nbsp; {{ titleName }}</p>

      <!-- 详情 -->
      <div v-if="goIn == 'home'" class="detail" @click.stop="goTo">详情</div>

      <!-- 分享按钮 -->
      <span class="iconfont icon-fenxiang" @click.stop="btnFen"></span>
    </van-popup>

    <!-- 章节列表 -->
    <van-popup v-model="showChapter" position="bottom" :style="{ height: '60%' }" color="#1F243A" :lock-scroll="false">
      <div class="box" v-if="chapterList">
        <div class="title_top">
          <h3>全部章节({{ chapterList.total }})</h3>
          <span>批量优惠</span>
        </div>
        <div class="money" @click.stop="who = true">
          <img src="@/assets/image/M.png" />
          &nbsp;
          <p>最新2话仅限漫币或通用券解锁</p>
          &nbsp;
          <van-icon name="question-o" size="16" color="#9EA2B5" />
        </div>
        <!-- 章节 -->
        <ul class="chapter">
          <li @click.stop="changeNum(chapter.id)" v-for="chapter in chapterList" :key="chapter.id"
            :class="['zhangjie', { active_red: chapter.id == chapterId }]"
            :ref="chapter.id == chapterId ? 'activeRef' : ''" :tabindex="{ '0': chapter.id == chapterId }">
            <img :src="chapter.coverUrl" />
            <div class="name_text">
              <p :class="{ active_true: chapter.id == chapterId }">
                {{ chapter.chapterName }}
                <van-icon v-show="chapter.id == chapterId" name="location" color="#3AA0EA" />
              </p>
              <span>
                {{ chapter.updatedAt.substr(5, 5) }} &nbsp;
                <van-icon name="comment" color="#42454C" />
                {{ chapter.commentCount }} &nbsp;
                <van-icon name="good-job" color="#42454C" />
                {{ chapter.like }}
              </span>
            </div>
            <van-icon v-show="chapter.change" name="location" class="xz" color="skyblue" size="15" />
          </li>
        </ul>

        <!-- 顺序 -->
        <div :class="['order', { s: orders }, { j: !orders }]" @click.stop="changOrder">
          {{ orders ? "升序" : "降序" }}
        </div>
      </div>
    </van-popup>

    <!-- 设置列表 -->
    <van-popup v-model="showSetup" position="bottom" :style="{ height: '40%' }" class="set-up">
      <div class="item">
        <p>画质</p>
        <div class="change d1">
          <div :class="{ active_item: hua == '超清' }" @click.stop="changeChao">
            超清
          </div>
          <div :class="{ active_item: hua == '高清' }" @click.stop="changeGao">
            高清
          </div>
          <div :class="{ active_item: hua == '流畅' }" @click.stop="changeLiu">
            流畅
          </div>
        </div>
      </div>
      <!-- todo: 横竖屏未实现 -->
      <div class="item">
        <p>横竖屏</p>
        <div class="change d2">
          <div class="active_item">竖屏</div>
          <div>横屏</div>
        </div>
      </div>
      <div class="item">
        <p>允许双击缩放页面</p>
        <van-switch v-model="che1" size="24px" />
      </div>
      <div class="item">
        <p>隐藏弹幕的开关</p>
        <van-switch v-model="che2" size="24px" />
      </div>
    </van-popup>

    <!-- 提示登录 -->
    <van-dialog v-model="showhint" title="请先登录" show-cancel-button @confirm="confirm" @cancel="cancel">
      <!-- <img src="https://img01.yzcdn.cn/vant/apple-3.jpg" /> -->
    </van-dialog>

    <!-- 疑问提示 -->
    <van-dialog v-model="who" showConfirmButton class="hint" confirmButtonText="知道了" confirm-button-color="blue">
      <h3>说明</h3>
      <p>1.应版权方要求，该漫画最新2话仅限漫币或通用券解锁。</p>
      <p>2.最新2话之前的话数支持漫读券或限免卡等阅读道具解锁。</p>
      <p>3.每部漫画可支持的阅读道具不同，以作品购买页面为准，感谢各位对作者大大的支持~</p>
    </van-dialog>

    <!-- 分享列表 -->
    <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
  </div>
</template>

<script>
import _ from "lodash";
import LoadingImg from "@/components/Lading/LoadingImg.vue";

export default {
  components: {
    LoadingImg
  },
  props: {
    bookId: {
      // 漫画id
      type: String,
      default: "31351"
    },
    chapterId: {
      // 章节id
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // 存放图片
      picList: [],
      // 存放漫画
      comicsList: [],
      // 章节列表
      chapterList: [],
      // 显示章节
      showChapter: false,
      // 显示 top 菜单
      show: false,
      // 显示分享列表
      showShare: false,
      // 显示设置
      showSetup: false,
      // 显示登录
      showhint: false,
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
        ]
      ],
      value: 0,
      // 疑问
      who: false,
      // 显示追漫
      flag: false,
      // 章节名称
      titleName: "",
      // 章节序
      chapterOrder: 0,
      // 滚动距离
      cm: 0,
      // 顺序
      orders: true,
      che1: false,
      che2: true,
      hua: "流畅",
      goIn: window.localStorage.getItem("afterName")
    };
  },
  beforeRouteEnter(to, from, next) {
    let name = from.name;
    localStorage.setItem("afterName", name);
    next();
  },
  created() {
    this.getData();
    // this.$nextTick(() => {
    //   console.log(this.$refs.activeRef,'activeRef');
    // });
  },
  mounted() {
    window.addEventListener("scroll", this.scrollShow, true);
    // document.addEventListener("scroll", this.scrollShow, true);
  },
  destroyed() {
    window.addEventListener("scroll", this.scrollShow, false);
    // document.addEventListener("scroll", this.scrollShow, false);
  },
  watch: {
    // $route() {
    //   this.$router.go(0);
    // }

    // 监听页面路由有没有变化，有变化就执行后面的方法
    // '$route.query.monthPlanId': 'initData'
    // 解决跳转相同路由时页面不刷新问题，不调用created和mounted
    '$route': 'getData'
  },
  methods: {
    async getData() {
      // 章节图片列表
      await this.$axios.get("/api/picture/list", {
        params: {
          chapterId: this.chapterId,
          pageNo: 1,
          pageSize: 30
        }
      })
        .then((data) => {
          this.picList = data.data.data.dataList;
        });
      // 章节详情
      await this.$axios.get("/api/chapter/detail", {
        params: {
          id: this.chapterId
        }
      })
        .then((data) => {
          let chapterDetail = data.data.data;
          this.titleName = chapterDetail.chapterName;
          this.chapterOrder = chapterDetail.chapterOrder;
          // 添加历史记录
          let obj = data;
          obj.bookId = chapterDetail.bookId;
          obj.chapterID = chapterDetail.id;
          obj.chapterNum = chapterDetail.chapterOrder;
          this.$store.commit("addHistory", data);
        });
      // 章节列表
      this.$axios.get("/api/chapter/list", {
        params: {
          bookId: this.bookId,
          pageNo: 1,
          pageSize: 50
        }
      })
        .then((data) => {
          this.chapterList = data.data.data.dataList;
          // this.chapterList = _.reverse(
          this.chapterList = this.chapterList.map((v) => {
            // todo: 章节没有做付费控制
            v.change = false;
            v.commentCount = 101;
            v.like = 365;
            v.updatedAt = "2023-06-11 12:21:35"
            return v;
          });
        })
      this.changeColor();
    },
    onClose() {
      this.show = false;
    },
    showPopup() {
      this.show = !this.show;
    },
    // 返回
    onClickLeft() {
      // window.history.go(-1);
      // window.history.back(-1);

      // let name = localStorage.getItem("afterName");
      // if (name == "home") {
      //   this.$router.push({ name: "home" });
      //   return;
      // }
      // this.$router.push({ name: "details" });
      this.$router.back();
    },
    // 显示章节按钮
    changeChapter() {
      this.showChapter = !this.showChapter;
    },
    // 选择章节
    changeNum(id) {
      this.$router.replace({
        name: "content",
        params: {
          bookId: this.bookId.toString(),
          chapterId: id.toString()
        }
      });
      this.showChapter = false;
      this.show = false;
    },
    // 详情
    goTo() {
      this.$router.replace({
        name: "details",
        params: {
          bookId: this.bookId.toString(),
        }
      });
    },
    // 滚动事件
    scrollShow() {
      // this.show = false;
      // console.log("滚动事件", this.$refs.ul.scrollHeight,this.$refs.ul.offsetHeight);
      if (this.$refs.ul) {
        let scrollY = document.documentElement.scrollTop;
        let move = (scrollY * 100) / this.$refs.ul.offsetHeight;
        // let heightMove = document.documentElement.clientHeight;
        if (scrollY == 0) {
          this.value = 0;
        } else {
          // this.value = Math.ceil(move);
          this.value = move;
        }
      }
      // console.log("可视化窗口高度==>", heightMove);
      // console.log("卷去高度==>", scrollY, e.target);
      // console.log("可视化窗口高度+卷去高度==>", heightMove + scrollY);
      // console.log("到底部==>", this.$refs.ul.offsetHeight + 50);
    },
    // 分享
    onSelect(option) {
      this.$toast(option.name);
      this.showShare = false;
    },
    btnFen() {
      this.showShare = true;
      this.show = false;
    },
    onChange(value) {
      console.log("拖动滑块结束后~~", value);
    },
    onInput(e) {
      let ulHeight = this.$refs.ul.offsetHeight;
      let top = (ulHeight * e) / 100;
      // this.$refs.ul.offsetTop = top + "px";

      document.documentElement.scrollTop = top;
    },
    // 追漫
    chase() {
      // 判读是否已经登录
      if (!this.$store.state.Login) {
        this.showhint = true;
        return;
      }
      // 当高亮时点击删除漫画
      if (this.flag) {
        this.$store.commit("removeBook", this.bookId);
      } else {
        // 当未高亮时点击添加漫画
        this.$store.commit("addBook", this.chapterList);
      }
      this.flag = !this.flag;
    },
    // 修改追漫高亮
    changeColor() {
      this.$store.state.bookList.forEach((item) => {
        if (item.id == this.bookId) {
          this.flag = true;
        }
      });
    },
    // 取消登录
    cancel() {
    },
    confirm() {
      this.$store.commit("changeFlag", true);
    },
    // 顺序
    changOrder() {
      this.orders = !this.orders;
      if (!this.orders) {
        this.chapterList = _.reverse(this.chapterList);
      } else {
        this.chapterList = _.reverse(this.chapterList);
      }
    },
    // 上一话
    beforeChapter() {
      if (this.chapterOrder == 1 || this.chapterList.length == 0) {
        this.$toast("已经是第一章哦~");
        return;
      }
      this.chapterList.forEach((item) => {
        // 上一章节
        if (item.chapterOrder == this.chapterOrder - 1) {
          // 跳转到上一章节
          this.$router.replace({
            name: "content",
            params: {
              bookId: this.bookId.toString(),
              chapterId: item.id.toString()
            }
          });
        }
      });
      this.show = false;
    },
    // 下一话
    nextChapter() {
      // todo: 下一话如何跳转
      if (this.chapterList.length == 0) {
        this.$toast("已经是最后一章哦~");
        return;
      }
      this.chapterList.forEach((item) => {
        // 下一章节
        if (item.chapterOrder == this.chapterOrder + 1) {
          // 跳转到下一章节
          this.$router.replace({
            name: "content",
            params: {
              bookId: this.bookId.toString(),
              chapterId: item.id.toString()
            }
          });
        }
      });
      this.show = false;
    },
    // 超清
    changeChao() {
      this.hua = "超清";
      this.getData();
    },
    // 高清
    changeGao() {
      this.hua = "高清";
      this.getData();
    },
    // 流畅
    changeLiu() {
      this.hua = "流畅";
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  .set-up {
    background-color: #1c1e2a;
    color: #ffffff;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      font-size: 14px;

      .change {
        display: flex;
        justify-content: space-between;

        div {
          width: 60px;
          height: 34px;
          border: 1px solid #fff;
          color: #fff;
          text-align: center;
          line-height: 34px;
          border-radius: 10px;
        }

        .active_item {
          border: 1px solid #34a3ef;
          color: #34a3ef;
        }
      }

      .d1 {
        width: 208px;
      }

      .d2 {
        width: 135px;
      }
    }
  }

  .hint {
    h3 {
      text-align: center;
    }

    p {
      font-size: 12px;
      padding: 1px 10px;
    }
  }

  .over {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    p {
      width: 100%;
      margin: 10px auto;
      font-size: 15px;
      white-space: normal;
      text-align: center;
    }

    li {
      width: 100%;

      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }

  .btnTop {
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    color: #fff;

    span {
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      text-align: center;
    }

    p {
      flex: 1;
      font-size: 15px;
      margin-left: 10px;
    }

    .detail {
      width: 40px;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      border-radius: 20px;
      border: 1px solid #429dde;
      color: #429dde;
    }
  }

  .btnBottom {
    background-color: rgba(0, 0, 0, 0.8);

    .c_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      color: #fff;

      .van-slider {
        flex: 1;
      }

      span {
        font-size: 13px;
        width: 50px;
        margin: 0 10px;
      }
    }

    .c_bottom {
      display: flex;
      justify-content: space-around;
      font-size: 13px;
      color: #fff;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .chase {
        width: 25px;
        height: 25px;
        border-radius: 20px 5px 20px 5px;
      }

      .yes {
        background: url(@/assets/image/星星.png) no-repeat;
        background-size: cover;
      }

      .no {
        background: url(@/assets/image/黑星星.png) no-repeat;
        background-size: cover;
      }
    }
  }

  .box {
    background-color: #1f253b;
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
        margin-left: 10px;
        font-weight: normal;
        color: #fff;
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

    // M
    .money {
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;
      margin: 10px;

      img {
        width: 16px;
      }

      p {
        font-size: 13px;
        color: #9ea2b5;
      }
    }

    .order {
      width: 50px;
      height: 50px;
      border: 1px solid #3c5978;
      border-radius: 50%;
      font-size: 12px;
      line-height: 70px;
      text-align: center;
      color: #d3d6e7;
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #2b3151;
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
      width: 100%;
      padding: 10px;

      li {
        width: 100%;
        height: 80px;
        margin: 5px;
        // border: 1px solid skyblue;
        display: flex;

        img {
          flex: 1;
          height: 100%;
          margin-right: 5px;
        }

        .name_text {
          flex: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 5px;
          overflow: hidden;
          text-overflow: ellipsis;

          p {
            width: 100%;
            font-size: 14px;
            color: #c8cbdc;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }

          span {
            font-size: 13px;
            color: #6f7382;
          }

          .active_true {
            color: #3aa0ea;
            transform: translateY(25%);
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

  .zhangjie {
    background-color: #1f253b;
  }

  .active_red {
    // border: 1px solid red;
    // transform: translateY(50%);
  }
}
</style>