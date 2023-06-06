<template>
  <div class="to_do">
    <!-- <h3>公共组件</h3> -->
    <ul v-if="todoList.length" class="todo">
      <router-link
        tag="li"
        :to="`/details/${item.parent_id}`"
        v-for="item in todoList"
        :key="item.parent_id"
      >
        <van-image :src="item.image + '@200w.jpg'" fit="cover" radius="5px">
          <template v-slot:loading>
            <!-- <van-loading type="spinner" size="20" /> -->
            <img src="@/assets/image/加载失败.png" />
          </template>
        </van-image>
        <!-- <img :src="item.image" /> -->
        <p>{{ item.title }}</p>
        <span>
          {{
            item.comic_info.decision || item.comic_info.lastest_short_title
              ? "更新至" + item.comic_info.lastest_short_title + "话"
              : null || item.comic_info.main_style_name
          }}
        </span>
      </router-link>
    </ul>

    <!-- 加载中... -->
    <van-loading
      type="spinner"
      size="24px"
      text-size="18px"
      color="skyblue"
      class="load"
      style="textAlign: center"
      v-else
      >加载中...
    </van-loading>
  </div>
</template>

<script>
export default {
  props: {
    todoList: {
      type: Array,
      default: () => {
        return null;
      },
    },
  },
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