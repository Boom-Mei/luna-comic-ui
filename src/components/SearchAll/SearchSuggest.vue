<template>
  <div class="search-suggest">
    <!-- <h3>搜索建议</h3> -->

    <ul v-if="suggest" class="sug">
      <li v-for="(s, index) in suggest" :key="index" @click.stop="change">
        <van-icon name="search" color="#ccc" size="18px" />
        <p v-html="$options.filters.highLight(s, keyword)"></p>
      </li>
    </ul>
  </div>
</template>

<script>
// 引入lodash库 使用其防抖函数
import _ from "lodash";

export default {
  props: {
    keyword: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      suggest: []
    };
  },
  created() {
    this.getSuggest();
  },
  methods: {
    async getSuggest() {
      await this.axios.get("SearchSug?term=" + this.keyword).then((data) => {
        // console.log(re);
        this.suggest = data;
      });
    },
    change(event) {
      this.$emit("search", event.target.innerText);
    }
  },
  watch: {
    // keyword() {
    //   this.getSuggest();
    // },
    // 侦听关键词的时候用防抖函数，节约网络资源
    keyword: _.debounce(function () {
      this.getSuggest();
    }, 200)
  },
  filters: {
    highLight(value, keyword) {
      return value.replace(keyword, `<i style="color:skyblue">${keyword}</i>`);
    },
  }
};
</script>

<style lang="scss" scoped>
.search-suggest {
  .sug {
    li {
      height: 50px;
      margin: 0 10px;
      display: flex;
      align-items: center;

      p {
        font-size: 14px;
        margin: 0 10px;
      }
    }
  }
}
</style>