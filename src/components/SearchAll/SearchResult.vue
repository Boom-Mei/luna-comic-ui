<template>
  <div class="serach-result">
    <!-- <h3>搜索结果</h3> -->
    <CartoonList
      :searchResult="searchResult"
      :keyword="keyword"
      @changeValue1="changeValue1"
      @changeValue2="changeValue2"
    ></CartoonList>

    <!-- 加载中... -->
    <van-loading
      v-if="showLoading"
      type="spinner"
      size="24px"
      text-size="18px"
      color="skyblue"
      class="vanlog"
      style="textAlign:center"
      >加载中...
    </van-loading>

    <van-divider
      v-if="!showLoading"
      dashed
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      到底了
    </van-divider>
    <div style="height: 5px" ref="load"></div>
  </div>
</template>

<script>
import CartoonList from "../Multiplex/CartoonList.vue";
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
      searchResult: [],
      page: 2,
      showLoading: false,
      flag: true,
      value1: 0,
      value2: -1,
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
    },
  },
  methods: {
    async getResult(offset = 20) {
      await this.axios
        .get(
          `Search?styleId=-1&areaId=${this.value2}&isFinish=-1&order=${this.value2}&pageNum=1&pageSize=${offset}&isFree=-1&keyWord=
          ${this.keyword}`
        )
        .then((re) => {
          console.log(re);

          this.searchResult = re.list;
        })
        .catch((error) => {
          this.showLoading = false;
          this.flag = false;
          console.log(error);
        });
    },
    scrollEvent: _.debounce(function () {
      //获取卷去的高度
      let Top = document.documentElement.scrollTop || document.body.scrollTop;
      //获取窗口高度
      let windowHeight = window.innerHeight;
      //获取最底部的dom元素到顶部的高度
      if (this.$refs.load) {
        let loading = this.$refs.load.offsetTop;
        // 5 是dom元素的 height (高度)
        if (Top + windowHeight >= loading + 5) {
          if (this.flag) {
            this.loadMore();
            this.showLoading = true;
            console.log(
              "Top",
              Top,
              "windowHeight",
              windowHeight,
              "loadingOffsetTop==>",
              loading
            );
          }

          console.log("触底了！！");
        }
      }
    }, 300),
    loadMore() {
      this.page++;
      let offset = 20 * (this.page - 1);
      this.getResult(offset);
    },
    //把搜索的关键字存储在本地服务器
    setHistory() {
      if (!this.keyword || this.keyword == "" || this.keyword.length < 1) {
        return;
      }
      //先取出history里面的结果
      let historyDate = localStorage.getItem("searchHistory");
      let historyArr = [];
      if (historyDate) {
        //还原localStorage数据
        historyArr = JSON.parse(historyDate);
      }
      //把关键词存储到数组里
      historyArr.unshift(this.keyword);
      //用lodash去重
      historyArr = _.uniq(historyArr);
      //把最新的搜索关键词存储到localStorage数据中
      localStorage.setItem("searchHistory", JSON.stringify(historyArr));
    },
    changeValue1(value) {
      this.value1 = value;
    },
    changeValue2(value) {
      this.value2 = value;
    },
  },

  components: { CartoonList },
};
</script>

<style lang="scss" scoped>
.serach-result {

}
</style>