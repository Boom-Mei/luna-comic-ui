<template>
  <div class="skin-s">
    <h3>背景装扮</h3>
    <ImageS :skin="skin"></ImageS>
  </div>
</template>

<script>
import ImageS from './ImageS.vue';
export default {
    data() {
        return {
            skin: true,
        };
    },
    components: { ImageS }
};
</script>

<style lang="scss" scoped>
.skin-s {
  h3 {
    text-align: center;
    font-size: 18px;
    height: 50px;
    line-height: 60px;
    font-weight: normal;
  }
}
</style>