<template>
  <div class="sort-list">
    <!-- {{ styleId }}
    {{ areaId }}
    {{ orderId }}
    {{ isFreeId }}
    {{ isFinishId }} -->

    <ul v-if="todoList.length" class="todo">
      <router-link
        tag="li"
        :to="`/details/${to.season_id}`"
        v-for="to in todoList"
        :key="to.season_id"
      >
        <van-image
          :src="to.vertical_cover + '@200w.jpg'"
          fit="cover"
          radius="5px"
          width="120"
          height="138"
        >
          <template v-slot:loading>
            <img src="@/assets/image/没有.png" class="loadImg" />
          </template>
        </van-image>
        <!-- <img
          :src="to.vertical_cover + '@200w.jpg'"
          v-lazy="to.vertical_cover + '@200w.jpg'"
        /> -->
        <p>
          {{ to.title }}
        </p>
        <span>
          {{
            to.total == to.last_ord
              ? `[完结]共${to.total}话`
              : `更新至${to.last_short_title}话`
          }}
        </span>
      </router-link>
    </ul>
    <ul v-else class="todo">
      <li v-for="(item, index) in 21" :key="index">
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
      default: -1,
    },
    areaId: {
      type: Number,
      default: -1,
    },
    orderId: {
      type: Number,
      default: 0,
    },
    isFreeId: {
      type: Number,
      default: -1,
    },
    isFinishId: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      todoList: [],
      page: 2,
    };
  },
  created() {
    this.getSort();
  },
  watch: {
    styleId: _.debounce(function () {
      console.log("分类切换??");
      this.getSort();
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    }, 200),
    areaId: _.debounce(function () {
      console.log("分类切换??");
      this.getSort();
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    }, 200),
    orderId: _.debounce(function () {
      console.log("分类切换??");
      this.getSort();
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    }, 200),
    isFreeId: _.debounce(function () {
      console.log("分类切换??");
      this.getSort();
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    }, 200),
    isFinishId: _.debounce(function () {
      console.log("分类切换??");
      this.getSort();
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    }, 200),
  },
  methods: {
    async getSort(offset = 21) {
      await this.axios
        .get(
          `ClassPage?styleId=${this.styleId}&areaId=${this.areaId}&isFinish=${this.isFinishId}&order=${this.orderId}&pageNum=1&pageSize=300&isFree=${this.isFreeId}`
        )
        .then((re) => {
          console.log("fenlei===", re);
          this.todoList = re;
          this.todoList = this.todoList.slice(0, offset);
        });
    },
    addMore() {
      this.page++;
      let offset = 21 * (this.page - 1);
      console.log(offset);
      this.getSort(offset);
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    },
  },
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
  .todoList {
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