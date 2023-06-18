<template>
  <div class="not_found">

    <!-- 头部 -->
    <van-sticky>
      <van-nav-bar title="" left-text="" left-arrow class="tab_main" :fixed="true" @click-left="onClickLeft"
        :border="false">
        <!-- <template #right>
          <span class="iconfont icon-fenxiang" @click.stop="showShare = true"></span>
        </template> -->
      </van-nav-bar>
    </van-sticky>

    <div class="show_img">
      <img src="@/assets/image/登录头像2.jpg" alt="">
      <p>哦，页面走丢了。૮꒰ ˶• ༝ •˶꒱ა</p>
      <div v-if="!login" class="login_btn">
        <div class="login_text" @click.stop="showLogin">账号登录</div>
      </div>
    </div>

    <van-dialog v-model="show" title="请先登录" show-cancel-button @confirm="confirm" @cancel="cancel">
      <img src="@/assets/image/背景.jpg" class="login_back">
    </van-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      login: false,
      show: false
    }
  },
  created() {
    this.login = this.$store.state.Login;
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.back()
    },
    showLogin() {
      this.show = true;
    },
    cancel() {
      this.$store.commit('changeFlag', false);
    },
    confirm() {
      this.$store.commit('changeFlag', true);
    }
  }
}
</script>

<style lang="scss" scoped>
.not_found {
  width: 100vw;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .tab_main {
    background-color: rgba(255, 255, 255, 0.1);

    .icon-fenxiang {
      color: gray;
      font-size: 18px;
    }
  }

  .show_img {
    text-align: center;

    img {
      width: 60%;
    }

    p {
      font-size: 14px;
    }

    .login_btn {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      // border: 1px solid red;

      .login_text {
        width: 106px;
        height: 30px;
        font-size: 14px;
        padding-left: 34px;
        border-radius: 20px;
        color: #fff;
        background: url(@/assets/image/bilibili.png) no-repeat;
        background-color: #32AAFF;
        background-size: 31px 17px;
        text-align: center;
        line-height: 30px;
        background-position: 8px center;
      }
    }

  }

  .login_back {
    width: 100%;
    margin-top: 10px;
  }
}
</style>