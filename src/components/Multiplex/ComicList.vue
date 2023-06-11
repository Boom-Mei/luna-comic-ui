<template>
  <div class="comic-list">
    <div class="comic-list-main">
      <ul v-if="bookList" class="hot_main">
        <router-link tag="li" :to="`/details/${book.id}`" v-for="book in bookList" :key="book.id">
          <img :src="book.coverUrl" v-lazy="book.coverUrl" />
          <p>{{ book.bookName }}</p>
          <span>更新至{{ book.chapterCount }}话</span>
        </router-link>
      </ul>
    </div>
    <!-- 换一批 -->
    <div class="iconfont icon-huanyipi" @click.stop="getData()">
      &nbsp;&nbsp;换一批
    </div>
  </div>
</template>

<script>
// 引入lodash库 使用其从数组中随机选取几个数据
import _ from "lodash";

export default {
  components: {},
  props: {},
  data() {
    return {
      bookList: []
    };
  },
  created() {
    this.getData();
  },
  watch: {
    // $route() {
    //   this.$router.go(0);
    // }

    '$route': 'getData'
  },
  mounted() { },
  methods: {
    getData() {
      let num = Math.floor(Math.random() * 8);
      this.$axios.get("/api/book/list", {
        params: {
          pageNo: num == 0 ? 1 : num,
          pageSize: 10
        }
      })
        .then((data) => {
          this.bookList = data.data.data.dataList;
          this.bookList = _.sampleSize(this.bookList, [6]);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.comic-list {
  height: 100%;

  .comic-list-main {
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

  .icon-huanyipi {
    width: 100%;
    text-align: center;
    line-height: 50px;
  }
}
</style>