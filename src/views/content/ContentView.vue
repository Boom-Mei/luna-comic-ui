<template>
  <!-- <h3>漫画阅读</h3> -->
  <!-- {{ contentid }} -->
  <div class="content">
    <!-- 漫画内容 -->
    <ul v-if="mainList" class="over" @click.stop="showPopup" ref="ul">
      <p>往后看吧，前面没有了标签(～￣▽￣)～</p>

      <li v-for="(img, index) in mainList" :key="index">
        <img :src="img" v-lazy="img" v-if="mainList.length > 1" />
        <LoadingImg v-else></LoadingImg>
      </li>
    </ul>

    <!-- bottom 菜单 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '15%' }"
      :overlay="false"
      class="btnBottom"
    >
      <div class="c_top">
        <!-- 上一话 -->
        <span
          :style="[
            {
              color:
                page == 0 || page == 1 ? (color = 'gray') : (color = '#fff'),
            },
          ]"
          @click.stop="beforeChapter"
          >上一话</span
        >
        <!-- 拖动条/进度条 -->
        <van-slider
          @change="onChange"
          @input="onInput"
          v-model="value"
          :min="0"
          :max="100"
          step="1"
          button-size="18px"
          bar-height="4px"
          active-color="skyblue"
          inactive-color="gray"
        />

        <!-- 下一话 -->
        <span
          :style="[
            {
              color:
                page == this.chapter.length - 1
                  ? (color = 'gray')
                  : (color = '#fff'),
            },
          ]"
          @click.stop="nextChapter"
          >下一话</span
        >
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
    <van-popup
      v-model="show"
      position="top"
      :style="{ height: '7%' }"
      :overlay="false"
      class="btnTop"
    >
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
    <van-popup
      v-model="showChapter"
      position="bottom"
      :style="{ height: '60%' }"
      color="#1F243A"
    >
      <div class="box" v-if="todoList">
        <div class="title_top">
          <h3>全部章节({{ todoList.total }})</h3>
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
        <ul class="chapter" v-if="chapter">
          <li
            @click.stop="changeNum(cha.id)"
            v-for="cha in chapter"
            :key="cha.id"
            :class="['zhangjie', { active_red: cha.id == contentid }]"
            :ref="cha.id == contentid ? 'activeRef' : ''"
            :tabindex="{ '0': cha.id == contentid }"
          >
            <img :src="cha.cover" />
            <div class="name_text">
              <p :class="{ active_true: cha.id == contentid }">
                {{ cha.ord }} &nbsp; {{ cha.title }}&nbsp;&nbsp;&nbsp;
                <van-icon
                  v-show="cha.id == contentid"
                  name="location"
                  color="#3AA0EA"
                />
              </p>
              <span>
                {{ cha.pub_time.substr(5, 5) }} &nbsp;
                <van-icon name="comment" color="#42454C" />
                {{ cha.comments }} &nbsp;
                <van-icon name="good-job" color="#42454C" />
                {{ cha.like_count }}
              </span>
            </div>
            <van-icon
              v-show="cha.change"
              name="location"
              class="xz"
              color="skyblue"
              size="15"
            />
          </li>
          <!-- <router-link
            tag="li"
            :to="`/content/${cha.id}/${detailsid}`"
            v-for="cha in chapter"
            :key="cha.id"
            class="zhangjie"
          >
            <img :src="cha.cover" />
            <div class="name_text">
              <p :class="{ active_true: cha.id == contentid }">
                {{ cha.ord }} &nbsp; {{ cha.title }}&nbsp;&nbsp;&nbsp;
                <van-icon
                  v-show="cha.id == contentid"
                  name="location"
                  color="#3AA0EA"
                />
              </p>
              <span>
                {{ cha.pub_time.substr(5, 5) }} &nbsp;
                <van-icon name="comment" color="#42454C" />
                {{ cha.comments }} &nbsp;
                <van-icon name="good-job" color="#42454C" />
                {{ cha.like_count }}
              </span>
            </div>
            <van-icon
              v-show="cha.change"
              name="location"
              class="xz"
              color="skyblue"
              size="15"
            />
          </router-link> -->
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

    <!-- 设置列表 -->
    <van-popup
      v-model="showSetup"
      position="bottom"
      :style="{ height: '40%' }"
      class="set-up"
    >
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

    <!-- 疑问提示 -->
    <van-dialog
      v-model="who"
      showConfirmButton
      class="hint"
      confirmButtonText="知道了"
      confirm-button-color="blue"
    >
      <h3>说明</h3>
      <p>1.应版权方要求，该漫画最新2话仅限漫币或 通用券解锁。</p>
      <p>2.最新2话之前的话数支持漫读券或限免卡等 阅读道具解锁。</p>
      <p>
        3.每部漫画可支持的阅读道具不同，以作品
        购买页面为准，感谢各位对作者大大的支持~
      </p>
    </van-dialog>

    <!-- 分享列表 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import _ from "lodash";
import LoadingImg from "@/components/Lading/LoadingImg.vue";

export default {
  components: { LoadingImg },
  props: {
    contentid: {
      //章节id
      type: String,
      default: "",
    },
    detailsid: {
      //漫画id
      type: String,
      default: "31351",
    },
  },
  data() {
    return {
      mainList: [], //存放图片
      comicsList: [], //存放漫画
      todoList: [], //
      chapter: [], //章节
      showChapter: false, //显示章节
      show: false, //显示 top 菜单
      showShare: false, //显示分享列表
      showSetup: false, //显示设置
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
      value: 0,
      who: false, //疑问
      flag: false, //显示追漫
      titleName: "", //漫画名字
      page: 0, //第几话
      cm: 0, //滚动距离
      orders: true, //顺序
      che1: false,
      che2: true,
      hua: "流畅",
      goIn: window.localStorage.getItem("afterName"),
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(from, "next");
    let name = from.name;

    // if (name == "details") {
    //   console.log("-------详情------------");
    //   next();
    //   return;
    // }
    localStorage.setItem("afterName", name);
    next();
  },
  created() {
    this.getDate();
    this.changeColor();
    // this.$nextTick(() => {
    //   console.log(this.$refs.activeRef,'activeRef');
      

    // });
  },
  mounted() {
    this.getDate();
    window.addEventListener("scroll", this.scrollShow, true);
    // document.addEventListener("scroll", this.scrollShow, true);
  },
  destroyed() {
    window.addEventListener("scroll", this.scrollShow, false);
    // document.addEventListener("scroll", this.scrollShow, false);
  },
  watch: {
    $route() {
      console.log("反应？");
      this.$router.go(0);
    },
  },
  methods: {
    async getDate() {
      await this.axios
        .get("GetImageIndex?epId=" + this.contentid)
        .then((re) => {
          // console.log(re,'re');
          let arr = re.images.map((v) => {
            let host = "https://manga.hdslb.com";
            v.path =
              this.hua == "超清"
                ? "%22" + host + v.path + "@1000w.webp%22"
                : this.hua == "高清"
                ? (v.path = "%22" + host + v.path + "@1000w.jpg%22")
                : (v.path = "%22" + host + v.path + "@660w.webp%22");
            // v.path = "%22" + host + v.path + "@1000w.webp%22";
            // v.path = "%22" + host + v.path + "@1000w.jpg%22";
            // v.path = "%22" + host + v.path + "@660w.webp%22";
            return v.path;
          });

          // console.log("阅读漫画===>", arr);
          this.mainList = new Array(arr);
          // console.log(this.mainList);
          this.axios
            .get("ImageToken?urls=[" + this.mainList + "]")
            .then((item) => {
              // console.log("漫画内容===>", item);
              this.mainList = item.map((v) => {
                v.main = v.url + "?token=" + v.token;
                return v.main;
              });
              // console.log(this.mainList);
            })
            .catch((error) => {
              console.log("请求失败===>", error);
            });
        });
      this.axios.get("ComicDetail?comicId=" + this.detailsid).then((re) => {
        console.log("漫画详情<===>", re);
        let obj = re;

        this.todoList = re;
        this.chapter = _.reverse(
          re.ep_list.map((v) => {
            v.change = false;

            return v;
          })
        );

        this.chapter.forEach((v) => {
          if (this.contentid == v.id) {
            this.titleName = v.title;
            this.page = v.ord;
            //添加章节id
            obj.chapterID = this.contentid;
            //添加第几话
            obj.chapterNum = v.short_title;
            //添加历史记录
            this.$store.commit("addHistory", re);
          }
        });

        console.log("this", this.chapter);
      });
    },
    onClose() {
      this.show = false;
    },
    showPopup() {
      // this.show = true;
      this.show = !this.show;
      console.log("???");
    },
    /* 返回 */
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
    //显示章节按钮
    changeChapter() {
      console.log(this.$refs.activeRef,'activeRef');

      this.showChapter = !this.showChapter;
    },
    //选择章节
    changeNum(id) {
      this.$router.replace({
        name: "content",
        params: {
          contentid: id,
          detailsid: this.detailsid,
        },
      });
    },
    //详情
    goTo() {
      // let name = localStorage.getItem("afterName");
      // if (name == "home") {
      //   this.$router.push({ name: "details" });
      //   return;
      // }
      this.$router.replace({
        name: "details",
        params: {
          detailsid: this.detailsid,
        },
      });
    },
    /* 滚动事件 */
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
    /* 分享 */
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

    /* 追漫 */
    chase() {
      //判读是否已经登录
      if (!this.$store.state.Login) {
        this.showhint = true;
        return;
      }

      //当高亮时点击删除漫画
      if (this.flag) {
        this.$store.commit("removeBook", this.detailsid);
      } else {
        //当未高亮时点击添加漫画

        this.$store.commit("addBook", this.todoList);
      }
      this.flag = !this.flag;
    },

    /* 修改追漫高亮 */
    changeColor() {
      this.$store.state.bookList.forEach((item) => {
        if (item.id == this.detailsid) {
          this.flag = true;
        }
      });
    },
    /* 顺序 */
    changOrder() {
      this.orders = !this.orders;
      if (!this.orders) {
        this.chapter = _.reverse(this.chapter);
      } else {
        this.chapter = _.reverse(this.chapter);
      }
      console.log("顺序==》", this.chapter);
    },
    /* 上一话 */
    beforeChapter() {
      this.chapter.forEach((item, index) => {
        /* 获取数组被选中的index下标 */
        if (this.contentid == item.id) {
          if (index == 0) {
            return;
          }
          console.log(this.chapter[index - 1]);
          /* 上一章漫画的id */
          let num = this.chapter[index - 1].id;
          console.log(num, this.detailsid, this.chapter.length);
          /* 跳转到上一章节 */
          this.$router.replace({
            name: "content",
            params: {
              contentid: num,
              detailsid: this.detailsid,
            },
          });
        }
      });
    },
    /* 下一话 */
    nextChapter() {
      this.chapter.forEach((item, index) => {
        /* 获取数组被选中的index下标 */
        if (this.contentid == item.id) {
          if (index == this.chapter.length - 1) {
            return;
          }
          // console.log(index, "index", this.chapter.length, "length");
          // console.log(this.chapter[index + 1]);
          /* 下一章漫画的id */
          let num = String(this.chapter[index + 1].id);
          // console.log(num, "num", this.chapter.length, "length");
          /* 跳转到下一章节 */
          this.$router.replace({
            name: "content",
            params: {
              contentid: num,
              detailsid: this.detailsid,
            },
          });
        }
      });
    },
    /* 超清 */
    changeChao() {
      this.hua = "超清";
      this.getDate();
    },
    /* 高清 */
    changeGao() {
      this.hua = "高清";
      this.getDate();
    },
    /* 流畅 */
    changeLiu() {
      this.hua = "流畅";
      this.getDate();
    },
  },
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

    /* M */
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