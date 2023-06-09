<template>
  <div class="comic-list">
    <ul v-if="comList" class="hot_main">
      <router-link tag="li" :to="`/details/${item.id}`" v-for="item in comList" :key="item.id">
        <img :src="item.vertical_cover + '@200w.jpg'" v-lazy="item.vertical_cover + '@200w.jpg'" />
        <p>{{ item.title }}</p>
        <span>更新至{{ item.last_ord }}话</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 引入lodash库 使用其从数组中随机选取几个数据
import _ from "lodash";

export default {
  components: {},
  props: {
    detailsid: {
      type: String,
      default: "31351"
    }
  },
  data() {
    return {
      comList: []
    };
  },
  created() {
    this.getDate();
  },
  watch: {
    $route() {
      this.$router.go(0);
    }
  },
  mounted() { },
  methods: {
    getDate() {
      this.axios.get("MoreRecommend?comicId=" + this.detailsid).then((data) => {
        // this.comList = data.recommend_comics.splice(0, 6);
        this.comList = data.recommend_comics;
        this.comList = _.sampleSize(this.comList, [6]);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.comic-list {
  .hot_main {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    li {
      width: 30%;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      padding: 10px 5px;
      overflow: hidden;

      img {
        width: 100%;
      }

      p {
        width: 100%;
        line-height: 20px;
        padding: 3px 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      span {
        font-size: 13px;
        color: gray;
      }
    }
  }
}
</style>