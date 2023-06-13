<template>
  <div class="serach-result">
    <!-- <h3>搜索结果</h3> -->

    <CartoonList :searchResult="searchResult" :keyword="keyword" @changeValue1="changeValue1"
      @changeValue2="changeValue2"></CartoonList>

    <!-- 加载中... -->
    <van-loading v-if="showLoading" type="spinner" size="24px" text-size="18px" color="skyblue" class="vanlog"
      style="textAlign:center">加载中...
    </van-loading>

    <van-divider v-if="!showLoading" dashed :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      到底了
    </van-divider>
    <div style="height: 5px" ref="load"></div>
  </div>
</template>

<script>
import _ from "lodash";
import CartoonList from "../Multiplex/CartoonList.vue";

export default {
  components: {
    CartoonList
  },
  props: {
    keyword: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchResult: [],
      page: 1,
      showLoading: false,
      flag: true,
      // 对应CartoonList的两个值
      // 地区
      value1: 0,
      // 排序方式
      value2: -1
    };
  },
  created() {
    this.getResult();
    this.setHistory();
  },
  mounted() {
    window.addEventListener("scroll", this.scrollEvent);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollEvent);
  },
  watch: {
    value1() {
      this.getResult();
    },
    value2() {
      this.getResult();
    }
  },
  methods: {
    async getResult() {
      await this.$axios.get("/api/book/list", {
        params: {
          bookName: this.keyword,
          sortType: this.value2,
          pageNo: this.page,
          pageSize: 10
        }
      })
        .then((data) => {
          this.searchResult = data.data.data.dataList;
        })
        .catch((error) => {
          this.showLoading = false;
          this.flag = false;
          console.log(error);
        });
    },
    scrollEvent: _.debounce(function () {
      // 获取卷去的高度
      let Top = document.documentElement.scrollTop || document.body.scrollTop;
      // 获取窗口高度
      let windowHeight = window.innerHeight;
      // 获取最底部的dom元素到顶部的高度
      if (this.$refs.load) {
        let loading = this.$refs.load.offsetTop;
        // 5 是dom元素的 height (高度)
        if (Top + windowHeight >= loading + 5) {
          if (this.flag) {
            this.loadMore();
            this.showLoading = true;
          }
          // console.log("触底了！！");
        }
      }
    }, 300),
    loadMore() {
      this.page++;
      this.$axios.get("/api/book/list", {
        params: {
          bookName: this.keyword,
          sortType: this.value2,
          pageNo: this.page,
          pageSize: 10
        }
      })
        .then((data) => {
          let arr = data.data.data.dataList;
          if (arr.length == 0) {
            this.showLoading = false;
            this.flag = false;
            return;
          }
          this.searchResult.push(...arr);
        })
        .catch((error) => {
          this.showLoading = false;
          this.flag = false;
          console.log(error);
        });
    },
    // 把搜索的关键字存储在本地服务器
    setHistory() {
      if (!this.keyword || this.keyword == "" || this.keyword.length < 1) {
        return;
      }
      // 先取出history里面的结果
      let historyDate = localStorage.getItem("searchHistory");
      let historyArr = [];
      if (historyDate) {
        // 还原localStorage数据
        historyArr = JSON.parse(historyDate);
      }
      // 把关键词存储到数组里
      historyArr.unshift(this.keyword);
      // 用lodash去重
      historyArr = _.uniq(historyArr);
      // 把最新的搜索关键词存储到localStorage数据中
      localStorage.setItem("searchHistory", JSON.stringify(historyArr));
    },
    changeValue1(value) {
      this.value1 = value;
    },
    changeValue2(value) {
      this.value2 = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.serach-result {}
</style>