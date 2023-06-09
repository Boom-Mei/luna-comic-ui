<template>
  <div class="news">
    <h3>我的消息</h3>
    <van-tabs v-model="active" animated>
      <van-tab title="回复我的">
        <ImageS></ImageS>
      </van-tab>
      <van-tab title="收到的点赞">
        <ImageS></ImageS>
      </van-tab>
      <van-tab title="系统通知">
        <ImageS></ImageS>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ImageS from "./ImageS.vue";

export default {
  components: {
    ImageS
  },
  data() {
    return {
      active: "回复我的",
    };
  }
};
</script>

<style lang="scss" scoped>
.news {
  h3 {
    text-align: center;
    font-size: 18px;
    height: 50px;
    line-height: 60px;
    font-weight: normal;
  }
}
</style>