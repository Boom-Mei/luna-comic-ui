<template>
  <div class="to_do">
    <!-- <h3>公共组件</h3> -->

    <ul v-if="bookList.length" class="todo">
      <router-link tag="li" :to="`/details/${book.id}`" v-for="book in bookList" :key="book.id">
        <van-image :src="book.coverUrl" fit="cover" radius="5px">
          <!-- <template v-slot:loading>
            <img src="@/assets/image/加载失败.png" />
          </template> -->
        </van-image>
        <p>{{ book.bookName }}</p>
        <span>
          {{
            book.summary || book.summary
            ? "更新至" + book.chapterCount + "话"
            : null || book.summary
          }}
        </span>
      </router-link>
    </ul>

    <!-- 加载中... -->
    <van-loading type="spinner" size="24px" text-size="18px" color="skyblue" class="load" style="textAlign: center"
      v-else>加载中...
    </van-loading>
  </div>
</template>

<script>
export default {
  props: {
    bookList: {
      type: Array,
      default: () => {
        return null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.to_do {
  background-color: #fff;

  .todo {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 10px;
    font-size: 14px;

    li {
      width: 50%;
      padding: 10px 5px;

      p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin: 5px 0;
      }

      span {
        font-size: 13px;
        color: gold;
      }

      img {
        width: 100%;
        height: 138px;
        border-radius: 5px;
      }
    }
  }
}
</style>