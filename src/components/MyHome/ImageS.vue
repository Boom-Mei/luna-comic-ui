<template>
  <div class="image-s">
    <img src="@/assets/image/没有.png" />
    <p v-if="skin">暂时还没有背景装扮哦~</p>
    <p v-else>没有新的系统通知哦~</p>
  </div>
</template>

<script>
export default {
  props: {
    // 默认不是皮肤的，也就是消息的
    skin: {
      type: Boolean,
      default: false
    },
  }
};
</script>

<style lang="scss" scoped>
.image-s {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 80%;
  }

  p {
    font-size: 15px;
  }
}
</style>