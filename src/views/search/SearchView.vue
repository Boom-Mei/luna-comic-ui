<template>
  <div class="search">
    <!-- <h1>搜索组件</h1> -->

    <form action="/">
      <van-search placeholder="请输入搜索关键词" show-action v-model="keyword" :keyword="keyword" @search="onSearch"
        @cancel="onCancel" @input="inputing" @clear="clearing" />
    </form>
    <component :is="componentName" :keyword="keyword" @search="search"></component>
  </div>
</template>

<script>
import SearchHot from "@/components/SearchAll/SearchHot";
import SearchResult from "@/components/SearchAll/SearchResult";
import SearchSuggest from "@/components/SearchAll/SearchSuggest";

export default {
  components: {
    SearchHot,
    SearchResult,
    SearchSuggest
  },
  data() {
    return {
      date: "",
      show: false,
      keyword: "",
      componentName: "SearchHot",
    };
  },
  created() {
    // this.getHistory()
  },
  methods: {
    // 按下回车时，显示搜索结果
    onSearch(val) {
      this.$toast(val);
      this.keyword = val;
      this.componentName = "SearchResult";
      // localStorage.setItem("searchName", this.componentName);
    },
    // 返回首页
    onCancel() {
      // this.$toast("取消");
      // history.back();
      this.$router.push("/");
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
    },
    // 输入的时候，如果输入值不为空，显示搜索提示
    inputing() {
      if (this.keyword != "" || this.keyword.length > 0) {
        this.componentName = "SearchSuggest";
        // localStorage.setItem("searchName", this.componentName);
      } else {
        this.componentName = "SearchHot";
        // localStorage.setItem("searchName", this.componentName);
      }
    },
    // 清空关键字时，显示搜索热门
    clearing() {
      this.componentName = "SearchHot";
    },
    search(value) {
      this.keyword = value;
      this.componentName = "SearchResult";
    },
    // 获取本地储存的数据
    // getHistory() {
    //   let historyWord = localStorage.getItem("searchName");
    //   console.log(historyWord);
    //   if (historyWord) {
    //     this.componentName = historyWord;
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.search {
  .top {
    width: 100%;
    display: flex;

    input {
      border-radius: 20px;
    }
  }
}
</style>