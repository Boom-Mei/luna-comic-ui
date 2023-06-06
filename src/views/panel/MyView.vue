<template>
  <div class="my">
    <!-- <h1>我的</h1> -->
    <div class="top">
      <span class="iconfont icon-shezhi" @click.stop="seting"></span>
      <span class="iconfont icon-youxiang" @click.stop="showNew = true"></span>
      <span class="iconfont icon-clothes" @click.stop="showPP = true"></span>
    </div>

    <div class="avatar" @click.stop="changeLog">
      <div class="a_top">
        
        <img v-if="this.$store.state.Login" src="@/assets/image/登录头像2.jpg" />
        <img v-else src="@/assets/image/头像.webp" />
        <div class="text" v-if="!this.$store.state.Login">账号登录</div>
        <div class="white" v-else>加油！不忘初心！！</div>
      </div>

      <div class="a_main">
        <div>
          <p>卡券包</p>
          <span class="lo" v-if="!this.$store.state.Login">登录领券</span>
          <span class="los" v-else>
            6<van-tag color="#FFE2E6" text-color="#F95C85">临期</van-tag>
          </span>
        </div>

        <div>
          <p>月票</p>
          <span>0</span>
        </div>

        <div>
          <p>漫币</p>
          <span>
            <a
              v-if="this.$store.state.Login"
              href="https://big.bilibili.com/mobile/index"
            >
              <van-tag color="#FE9D10" style="borderradius: 20px" size="medium"
                >首充奖励
                <van-icon name="arrow" />
              </van-tag>
            </a>
            <van-tag
              v-else
              color="#FE9D10"
              style="borderradius: 20px"
              size="medium"
              >首充奖励
              <van-icon name="arrow" />
            </van-tag>
          </span>
        </div>
      </div>

      <img src="@/assets/image/开通.png" class="a_bottom" />
    </div>

    <div class="action">
      <div>
        <!-- <img src="@/assets/image/礼包.png" /> -->
        <img src="@/assets/image/礼物.gif" alt="">
        <div class="t">
          <p>
            福利中心<van-tag color="#FFE2E6" text-color="#F95C85"
              >去签到</van-tag
            >
          </p>
          <span v-if="!this.$store.state.Login">解锁进度：--/--</span>
          <span v-else>解锁进度：00/28</span>
        </div>
      </div>

      <div>
        <img src="@/assets/image/积分.png" class="jifen" />
        <div class="b">
          <p>赛季积分商城</p>
          <span v-if="!this.$store.state.Login">剩余赛季积分：--/--</span>
          <span v-else>剩余赛季积分：140</span>
        </div>
      </div>
    </div>

    <ul v-if="activityArr" class="activity">
      <li v-for="(ac, index) in activityArr" :key="index">
        <a :href="ac.jump_url">
          <img :src="ac.icon" />
          <p>{{ ac.title }}</p>
        </a>
      </li>
    </ul>

    <ul v-if="arr" class="arr">
      <li v-for="(item, index) in arr" :key="index">
        <a :href="item.jump_url">
          <img :src="item.icon" />
          <p>{{ item.title }}</p>
        </a>
      </li>
    </ul>
    <!-- 提示登录 -->
    <van-dialog
      v-model="show"
      title="请先登录"
      show-cancel-button
      @confirm="confirm"
      @cancel="cancel"
    >
      <!-- <img src="https://img01.yzcdn.cn/vant/apple-3.jpg" /> -->
    </van-dialog>

    <!-- 设置 -->
    <SetUp ref="sss"></SetUp>

    <!-- 消息 -->
    <van-popup
      v-model="showNew"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <NewS></NewS>
    </van-popup>

    <!-- 皮肤 -->
    <van-popup
      v-model="showPP"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <SkinS></SkinS>
    </van-popup>

    <div class="bottom"></div>
  </div>
</template>

<script>
import SetUp from "@/components/MyHome/SetUp.vue";
import NewS from "@/components/MyHome/NewS.vue";
import SkinS from "../../components/MyHome/SkinS.vue";
export default {
  data() {
    return {
      activityArr: [],
      arr: [],
      show: false,
      showNew: false,
      showPP: false,
    };
  },
  created() {
    this.getUser();
    this.getIn();
  },
  methods: {
    async getUser() {
      await this.axios.get("UCenterConf").then((re) => {
        // console.log(re);
        this.activityArr = re.confs.slice(0, 4);
        this.arr = re.confs.slice(4, re.confs.length);
        this.arr = this.arr.map((v) => {
          if (v.title == "帮助中心") {
            v.jump_url =
              "https://www.bilibili.com/blackboard/topic/activity-help.html";
          }
          if (v.title == "青少年模式") {
            (v.text1 =
              "在青少年模式中，我们精选了一批教育类、知识类内容呈现在首页，且部分功能无法使用，每日晚22时至次日早6时期间无法使用哔哩哔哩漫画。\n开启青少年模式后，将自动开启时间锁，时间锁为40分钟。单日使用时长超过触发时间，需输入密码才能继续使用\n开启青少年模式，需先设置独立密码，如忘记密码可通过申诉重置密码\n青少年模式是哔哩哔哩漫画为促进青少年健康成长做出的一次尝试，我们优先针对核心场景进行了优化，也将继续致力于优化更多场景。"),
              (v.text2 =
                "在青少年模式中，我们精选了一批教育类、知识类内容呈现在首页，且部分功能无法使用，每日晚22时至次日早6时期间无法使用哔哩哔哩漫画。\n青少年模式是哔哩哔哩漫画为促进青少年健康成长做出的一次尝试，我们优先针对核心场景进行了优化，也将继续致力于优化更多场景。"),
              (v.text3 =
                "若您需要重置青少年模式的密码，请您发送邮件至help@bilibili.com，主题命名为【您的哔哩哔哩漫画账号UID+漫画青少年模式密码重置】。\n邮件中请您上传本人手持身份证和写有“仅用于哔哩哔哩漫画青少年模式密码重置”纸张的照片，要求本人、身份证和纸张在同一照片中，且字迹清晰可辨。\n您的资料仅用于密码重置申诉，哔哩哔哩漫画不会泄露您的个人信息，并会尽快为您处理。");
          }
          return v;
        });
      });
    },

    getIn() {
      console.log(this.$store.state.Login);
      // this.log = this.$store.state.Login;
    },
    changeLog() {
      if (!this.$store.state.Login) {
        this.show = true;
      }
    },
    cancel() {
      console.log("取消！！");
    },
    confirm() {
      console.log("确定~");
      this.$store.commit("changeFlag", true);
    },
    seting() {
      // console.log(this.$refs.sss.name);
      //设置子组件的数据
      this.$refs.sss.show = true;
    },
  },
  components: { SetUp, NewS, SkinS },
};
</script>


<style lang="scss" scoped>
.my {
  height: 93vh;
  background: url(@/assets/image/top.png) no-repeat;
  background-size: 100vw 45px;
  background-position: center bottom;

  .top {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    span {
      font-size: 20px;
      margin-right: 20px;
      color: #6c6f79;
    }
  }

  .avatar {
    width: 95%;
    height: 180px;
    // border: 1px solid red;
    margin: 10px auto;
    border-radius: 5px;
    box-shadow: 0px 1px 10px 0px skyblue;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .a_top {
      display: flex;
      position: relative;
      // border: 1px solid red;
      height: 70px;

      img {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        border: 1px solid #fff;
        position: absolute;
        top: -8px;
        left: 8px;
      }

      .text {
        margin-left: 80px;
        margin-top: 12px;
        width: 106px;
        height: 26px;
        font-size: 14px;
        text-align: center;
        line-height: 26px;
        padding-left: 34px;
        border-radius: 20px;
        color: #fff;
        background: url(@/assets/image/bilibili.png) no-repeat;
        background-color: #32aaff;
        background-size: 31px 17px;
        background-position: 8px center;
      }

      .white {
        margin-left: 80px;
        margin-top: 12px;
        height: 26px;
        font-size: 15px;
        text-align: center;
        line-height: 26px;
        color: gold;
      }
    }

    .a_main {
      display: flex;
      font-size: 13px;
      color: #6c6f7e;
      margin-left: 8px;
      height: 40px;

      div {
        width: 80px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border-right: 1px solid #ccc;
        padding-left: 5px;

        &:last-child {
          border-right: none;
        }

        p {
          width: 100%;
        }

        .lo {
          font-size: 14px;
          color: #42a6e9;
        }

        .los {
          font-size: 14px;
        }
      }
    }

    .a_bottom {
      width: 90%;
      height: 45px;
      margin: 20px auto;
    }
  }

  .action {
    display: flex;
    font-size: 13px;
    height: 40px;
    width: 100%;
    padding: 0 10px;
    margin-top: 5px;

    div {
      width: 50%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:first-child {
        border-right: 1px solid #ccc;
      }

      .t,
      .b {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        margin-left: 10px;

        span {
          font-size: 12px;
          color: #8f929b;
          margin-top: 3px;
        }
      }

      img {
        width: 45px;
        height: 45px;
        margin: 0 3px 0 15px;
      }
      .jifen{
        width: 30px;
        height: 30px;
      }
    }
  }

  .activity {
    margin: 10px;
    height: 80px;
    display: flex;
    justify-content: space-around;
    font-size: 13px;
    border-bottom: 1px solid #ccc;

    p {
      color: #6c6f7e;
    }

    img {
      width: 50px;
      height: 50px;
    }
  }

  .arr {
    margin: 20px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    li {
      width: 25%;
      height: 80px;

      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        p {
          color: #6c6f7e;
          font-size: 12px;
          white-space: nowrap;
          padding-top: 8px;
        }

        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>