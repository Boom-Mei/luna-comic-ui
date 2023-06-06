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
      console.log("执行没");
      await this.axios
        .get(
         `
         ImageToken?urls=["https://manga.hdslb.com/bfs/manga/ae3db294143eb62e1628176fa307216e44c96717.jpg@1000w.webp"]
         `
        )
        .then((re) => {
          console.log("漫画内容===>", re);
          this.arr = re;
        })
        .catch((error) => {
          console.log("请求失败===>", error);
        });
    },
  },
};
</script>

<style>
</style>