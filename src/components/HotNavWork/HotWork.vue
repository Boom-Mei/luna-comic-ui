<template>
  <div class="hot-work">
    <h3>测试</h3>
    {{ arr }}
    <h3>结果</h3>
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [],
    };
  },
  created() {
    this.getImage();
  },
  methods: {
    async getImage() {
      await this.axios
        .get(
          `
         ImageToken?urls=["https://manga.hdslb.com/bfs/manga/ae3db294143eb62e1628176fa307216e44c96717.jpg@1000w.webp"]
         `
        )
        .then((re) => {
          this.arr = re;
        })
    }
  }
};
</script>

<style></style>