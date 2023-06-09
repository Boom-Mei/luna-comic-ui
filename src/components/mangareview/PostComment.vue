<template>
  <div class="post">
    <!-- 发表评论 -->

    <h3>发表评论</h3>
    <div class="box">
      <img :src="$store.state.imgSrc + '@200w.jpg'" alt="" />
      <p>{{ name }}</p>
      <!-- 星星 -->
      <van-rate v-model="value" :size="25" color="#ffd21e" void-icon="star" void-color="#ccc" />
      <span>{{
        value == 1
        ? "非常糟糕"
        : value == 2
          ? "不好看"
          : value == 3
            ? "一般"
            : value == 4
              ? "很好看"
              : value == 0
                ? "点击评分"
                : "非常好看"
      }}</span>
      <van-field v-model="message" rows="1" type="textarea" placeholder="分享一下这部漫画中，你喜欢的和不喜欢的部分吧，可以给小伙伴做参考哦~"
        maxlength="200" show-word-limit size="large" />
      <button class="btn" @click.stop="postcom">发表</button>
      <div class="main">
        <div class="title">
          <van-icon name="bulb-o" color="#1989fa" size="25px" />点评内容该写什么呢？
        </div>
        <p>1.可以向大家安利漫画中喜欢的情节、角色等</p>
        <p>2.可以向大家分享你对这补漫画最深的感情及感想</p>
        <p>3.如果你有其他的点评角度，也可以尽情发挥哦~</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: null,
    },
  },
  components: {},
  data() {
    return {
      value: 0,
      message: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    postcom() {
      if (this.message.length < 10) {
        this.$toast("写满10个字就才可以发布哦~");
        return;
      }
      let obj = {
        face: "https://img.88icon.com/download/jpg/20200806/7f00fd3a5844d4bb277a5a191223ecd4_512_512.jpg!88con",
        nick_name: "仿bilibili漫画",
        score: (this.value * 2),
        content: this.message,
        like_count: 999,
        flag: false
      };
      this.$emit('postText', obj)
      this.value = 0;
      this.message = '';
    }
  },
  created() { },
  mounted() { },
  beforeCreate() { },
  beforeMount() { },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  activated() { }
};
</script>

<style lang='scss' scoped>
.post {
  h3 {
    font-size: 15px;
    height: 50px;
    line-height: 53px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }

  .box {
    display: flex;
    font-size: 15px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 30%;
      margin: 10px 0;
      border-radius: 5px;
    }

    span {
      font-size: 13px;
      color: gray;
      margin: 10px 0;
    }

    p {
      margin: 10px 0;
    }

    .btn {
      margin: 10px 0;
      width: 90%;
      height: 40px;
      border-radius: 20px;
      background-color: #fff;
      color: #1989fa;
      border: 1px solid #1989fa;
    }

    .main {
      width: 100%;
      padding: 15px;

      .title {
        font-size: 14px;
        line-height: 25px;
      }

      p {
        font-size: 12px;
        color: gray;
        margin: 3px 0;
      }
    }
  }
}
</style>