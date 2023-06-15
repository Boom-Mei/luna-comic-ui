<template>
  <div class="sort-list">
    <!-- {{ styleId }}
    {{ areaId }}
    {{ orderId }}
    {{ isFreeId }}
    {{ isFinishId }} -->

    <ul v-if="bookList.length" class="todo">
      <router-link tag="li" :to="`/details/${book.id}`" v-for="book in bookList" :key="book.id">
        <van-image :src="book.coverUrl" fit="cover" radius="5px" width="120" height="138">
          <template v-slot:loading>
            <img src="@/assets/image/没有.png" class="loadImg" />
          </template>
        </van-image>
        <!-- <img
          :src="book.coverUrl"
          v-lazy="book.coverUrl"
        /> -->
        <p>
          {{ book.bookName }}
        </p>
        <span>
          {{
            book.end == 1
            ? `[完结]共${book.chapterCount}话`
            : `更新至${book.chapterCount}话`
          }}
        </span>
      </router-link>
    </ul>
    <ul v-else class="todo">
      <li v-for="(item, index) in 9" :key="index">
        <img src="@/assets/image/玩命加载中.png" />
      </li>
    </ul>

    <div class="more" @click.stop="addMore">加载更多...</div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    styleId: {
      type: Number,
      default: -1
    },
    areaId: {
      type: Number,
      default: -1
    },
    orderId: {
      type: Number,
      default: 0
    },
    isFreeId: {
      type: Number,
      default: -1
    },
    isFinishId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      bookList: [],
      page: 1
    };
  },
  created() {
    this.getData();
  },
  watch: {
    styleId: _.debounce(function () {
      this.getData();
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    }, 200),
    areaId: _.debounce(function () {
      this.getData();
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    }, 200),
    orderId: _.debounce(function () {
      this.getData();
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    }, 200),
    isFreeId: _.debounce(function () {
      this.getData();
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    }, 200),
    isFinishId: _.debounce(function () {
      this.getData();
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    }, 200)
  },
  methods: {
    getData() {
      this.$axios.get("/book/list", {
        params: {
          pageNo: 1,
          pageSize: 9
        }
      })
        .then((data) => {
          this.bookList = data.data.data.dataList;
          if (this.bookList.length == 0) {
            this.$toast("没有更多了~");
            return;
          }
        });
    },
    addMore() {
      if (this.page >= 3) {
        this.$toast("没有更多了~");
        return;
      }
      this.page++;
      this.$axios.get("/book/list", {
        params: {
          pageNo: this.page,
          pageSize: 9
        }
      })
        .then((data) => {
          let arr = data.data.data.dataList;
          if (arr.length == 0) {
            this.$toast("没有更多了~");
            return;
          }
          this.bookList.push(...arr);
        });
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.sort-list {
  .more {
    text-align: center;
    font-size: 14px;
    color: gray;
    height: 40px;
  }

  .bookList {
    width: 100%;
    // padding: 0 7px;
    display: flex;
    flex-wrap: wrap;

    li {
      width: 33%;
      padding: 8px;
      // width: 120px;
      // height: 197px;
      display: flex;
      flex-direction: column;

      .img {
        width: 120px;
        height: 143px;
      }
    }
  }

  .todo {
    width: 100%;
    // padding: 0 7px;
    display: flex;
    flex-wrap: wrap;

    li {
      width: 33%;
      padding: 8px;
      // width: 120px;
      // height: 197px;
      display: flex;
      flex-direction: column;

      img {
        width: 100%;
        // width: 120px;
        // height: 138px;
        border-radius: 5px;
      }

      p {
        height: 20px;
        font-size: 14px;
        margin: 8px 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #222;
      }

      span {
        height: 16px;
        font-size: 12px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>