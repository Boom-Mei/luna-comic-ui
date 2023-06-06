<template>
  <div class="login">
    <!-- <h3>登录</h3> -->
    <div class="top">
      <van-icon name="cross" @click.stop="close" />
      <p>bilibili登录</p>
      <a href="https://www.bilibili.com/protocal/licence.html">
        <van-icon name="chat-o" color="#ee0a24" />
      </a>
    </div>

    <div :class="className"></div>

    <!-- form表单 -->
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="账号" label="账号" placeholder="请填写bilibili账号"
        :rules="[{ required: true, message: '' }]" />
      <van-field v-model="password" type="password" name="pattern" label="密码" placeholder="请输入密码" @focus="inputing"
        @blur="outing" :rules="[{ pattern, message: '请输入6位数的密码' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      pattern: /^[A-Za-z0-9]{6}/,

      className: 'banner'
    };
  },
  methods: {
    //关闭
    close() {
      this.$store.commit('changeFlag', false)
    },
    //提交
    onSubmit(values) {
      console.log('submit', values);
      if (values) {
        //退出登录页面
        this.$store.commit('changeFlag', false)
        //已登录
        this.$store.commit('changeLogin', true)
        
      }

    },
    //密码框获取焦点
    inputing() {
      this.className = "bannerTo"
    },
    //密码框失去焦点
    outing() {
      this.className = "banner"
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 8;
  background-color: #fff;
  background: url(@/assets/image/背景2.jpg) no-repeat;
    background-size: 433px auto;
    background-position: center 359px;

  .top {
    height: 50px;
    font-size: 20px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .banner {
    height: 120px;
    margin-bottom: 20px;
    // border: 1px solid red;
    background: url(@/assets/image/left.png) no-repeat, url(@/assets/image/center.png) no-repeat, url(@/assets/image/right.png) no-repeat;
    background-position: 0 100%, 50% 50%, 100% 100%;
    background-size: 25%, 35%, 25%;
  }

  .bannerTo {
    height: 120px;
    margin-bottom: 20px;
    // border: 1px solid red;
    background: url(@/assets/image/left_b.png) no-repeat, url(@/assets/image/center.png) no-repeat, url(@/assets/image/right_b.png) no-repeat;
    background-position: 0 100%, 50% 50%, 100% 100%;
    background-size: 25%, 35%, 25%;
  }
}
</style>