<template>
  <div class="comics-list">
    <!-- <h3>搜索列表</h3> -->

    <!-- todo: 这个changes函数没有实现 -->
    <van-dropdown-menu active-color="#1989fa" @change="changes(value)">
      <van-dropdown-item v-model="value1" :options="option1" title="筛选" />
      <van-dropdown-item v-model="value2" :options="option2" title="排序方式" />
    </van-dropdown-menu>
    <ul class="list" v-if="searchResult">
      <router-link tag="li" :to="`/details/${result.id}`" v-for="result in searchResult" :key="result.id">
        <!-- 左边头像 -->
        <div class="avatar">
          <!-- <img :src="result.vertical_cover + '@200w.jpg'" v-lazy="result.vertical_cover + '@200w.jpg'" /> -->
          <img :src="result.coverUrl" v-lazy="result.coverUrl" />
        </div>
        <!-- 右边内容 -->
        <div class="text">
          <p v-html="$options.filters.highLight(result.bookName, keyword)"></p>
          <div class="name">
            <span v-html="result.authorName">
            </span>
          </div>
          <span v-if="result.tag">
            {{ result.tag }}
          </span>
          <span>连载中...</span>
        </div>
      </router-link>
    </ul>

    <!-- 提示信息 -->
    <van-notice-bar v-else color="#1989fa" background="#ecf9ff" left-icon="info-o">
      没有找到想看的漫画？看看更多推荐吧！
    </van-notice-bar>
  </div>
</template>

<script>
export default {
  props: {
    searchResult: {
      type: Array,
      default: () => {
        return null;
      }
    },
    keyword: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      value1: 0,
      value2: 0,
      option1: [
        { text: "全部", value: 0 },
        { text: "大陆", value: 1 },
        { text: "日本", value: 2 },
        { text: "韩国", value: 6 },
        { text: "其他", value: 5 }
      ],
      option2: [
        { text: "默认排行", value: 1 },
        { text: "更新时间", value: 3 },
        { text: "上架时间", value: 2 }
      ]
    };
  },
  created() { },
  watch: {
    value1() {
      this.$emit("changeValue1", this.value1);
    },
    value2() {
      this.$emit("changeValue2", this.value2);
    }
  },
  methods: {
  },
  filters: {
    highLight(value, keyword) {
      // 把字符串里面的 ‘关键字’ 替换成 <i style="color:skyblue">${keyword}</i>
      return value.replace(keyword, `<i style="color:skyblue">${keyword}</i>`);
    }
  }
};
</script>

<style lang="scss" scoped>
.comics-list {
  .list {
    padding: 10px;

    li {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-bottom: 10px;

      .avatar {
        height: 100%;
        width: 20%;
        margin-right: 10px;

        img {
          width: 100%;
          border-radius: 5px;
        }
      }

      .text {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5px;

        .name {
          max-width: 250px;
          display: flex;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;

          span {
            padding: 0 2px;
          }
        }

        p {
          width: 250px;
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
}
</style>