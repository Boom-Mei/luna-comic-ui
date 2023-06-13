<template>
  <div class="search-hot">
    <!-- 热门搜索 -->
    <h3>热门搜索</h3>
    <ul v-if="hotSearchBookList" class="hot-word">
      <router-link tag="li" :to="`/details/${hot.id}`" v-for="(hot, index) in hotSearchBookList" :key="hot.id">
        <div class="num">{{ index + 1 }}</div>
        <img :src="hot.coverUrl" />
        <div class="text">
          <p>{{ hot.bookName }}</p>
          <span>{{ hot.tag }}</span>
        </div>
      </router-link>
    </ul>

    <!-- 历史记录 -->
    <h3 v-if="historyArr">搜索历史</h3>
    <ol class="history" v-if="historyArr">
      <li v-for="history in historyArr" :key="history" @click.stop="$emit('search', history)">
        <p>
          {{ history }}
        </p>
        <div class="close" @click.stop="delHistory(history)">
          <van-icon name="delete-o" color="#ccc" />
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotSearchBookList: [],
      historyArr: []
    };
  },
  created() {
    this.getHotWord();
  },
  methods: {
    // 热门搜索
    async getHotWord() {
      await this.$axios.get("/api/book/list", {
        params: {
          top: 1,
          pageNo: 1,
          pageSize: 6
        }
      })
        .then((data) => {
          // data是请求返回
          // data.data是请求返回的数据信息
          this.hotSearchBookList = data.data.data.dataList;
          this.hotSearchBookList = this.hotSearchBookList.slice(0, 6);
          this.getHistory();
        });
    },
    // 获取本地储存的数据
    getHistory() {
      let historyWord = localStorage.getItem("searchHistory");
      if (historyWord) {
        this.historyArr = JSON.parse(historyWord);
      }
    },
    // 删除本地数据
    delHistory(word) {
      let historyWords = localStorage.getItem("searchHistory");
      historyWords = JSON.parse(historyWords).filter((v) => {
        // 过滤掉关键词
        return v != word;
      });
      this.historyArr = historyWords;
      // 在把已经处理好的数据重新储存在本地服务器
      localStorage.setItem("searchHistory", JSON.stringify(historyWords));
    }
  }
};
</script>

<style lang="scss" scoped>
.search-hot {
  h3 {
    font-size: 12px;
    color: #bbbbbb;
    margin: 10px;
  }

  .hot-word {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    li {
      display: flex;
      align-items: center;
      width: 50%;
      height: 60px;
      padding: 10px 0;

      .num {
        font-weight: bold;
        font-size: 25px;
        width: 20px;
        text-align: center;
        color: #ccc;
        margin: 0 3px;
      }

      img {
        width: 50px;
        height: 100%;
      }

      .text {
        padding: 5px;

        p {
          width: 90px;
          font-size: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        span {
          font-size: 12px;
          color: gray;
        }
      }

      &:nth-child(1) {
        .num {
          color: transparent;
          background-image: linear-gradient(to bottom, #f06e6e, #de4645);
          background-clip: text;
        }
      }

      &:nth-child(2) {
        .num {
          color: transparent;
          background-image: linear-gradient(to bottom, #f29865, #e1713f);
          background-clip: text;
        }
      }

      &:nth-child(3) {
        .num {
          color: transparent;
          background-image: linear-gradient(to bottom, #f3c127, #f29f23);
          background-clip: text;
        }
      }
    }
  }

  .history {
    li {
      font-size: 15px;
      color: gray;
      line-height: 20px;
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>